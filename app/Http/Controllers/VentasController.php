<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\CajaDiariaDetalle\CajaDiariaDetalleInterface;
use App\Http\Recopro\CajaDiaria\CajaDiariaInterface;
use App\Http\Recopro\ConsecutivosComprobantes\ConsecutivosComprobantesInterface;
use App\Http\Recopro\Ventas\VentasInterface;
use App\Http\Recopro\Ventas\VentasTrait;
use App\Http\Requests\VentasRequest;
use App\Models\BaseModel;
use DB;
use PDF;
use Illuminate\Http\Request;

class VentasController extends Controller
{
    use VentasTrait;

    public function __construct()
    {
        $this->base_model = new BaseModel();
//        $this->middleware('json');
    }

    public function all(Request $request, VentasInterface $repo)
    {

        $s      = $request->input('search', '');
        $params = ['idventa', 'serie_comprobante', 'numero_comprobante', 'fecha_emision', 'tipo_documento', 'numero_documento', 'moneda', 't_monto_total', 'pagado', 'saldo', 'cCodConsecutivo_solicitud', 'nConsecutivo_solicitud', 'tipo_solicitud', "estado", 'IdTipoDocumento', 'anticipo', 'idventa_referencia'];
        // print_r($repo->search($s)); exit;
        return parseList($repo->search_documentos($s), $request, 'idventa', $params);
    }

    public function create(VentasInterface $repo, VentasRequest $request)
    {
        $data                = $request->all();
        $table               = "ERP_Venta";
        $id                  = 'idbanco';
        $data['idbanco']     = $repo->get_consecutivo($table, $id);
        $data['descripcion'] = $data['banco'];

        $repo->create($data);

        return response()->json([
            'Result' => 'OK',
            'Record' => [],
        ]);
    }

    public function update(VentasInterface $repo, VentasRequest $request)
    {
        $data = $request->all();
        // print_r($data);
        $idbanco             = $data['idbanco'];
        $data['descripcion'] = $data['banco'];
        $repo->update($idbanco, $data);

        return response()->json(['Result' => 'OK']);
    }

    public function destroy(VentasInterface $repo, Request $request)
    {
        $idbanco = $request->input('idbanco');
        $repo->destroy($idbanco);
        return response()->json(['Result' => 'OK']);
    }

    public function getAll(VentasInterface $repo)
    {
        return parseSelect($repo->all(), 'idbanco', 'descripcion');
    }

    public function excel(VentasInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE DOCUMENTOS EMITIDOS', 'Ventas');
    }

    public function find_documento(VentasInterface $Repo, Request $request)
    {
        $data = $request->all();

        $response["documento"] = $Repo->find_documento($data["idventa"]);

        return response()->json($response);
    }

    public function data_form(VentasInterface $Repo)
    {

        $motivos = $Repo->get_motivos();

        // $cambio_tipo = $repo_orden->cambio_tipo(2, date("Y-m-d"));

        return response()->json([
            'status'  => true,

            'motivos' => $motivos,

        ]);
    }

    public function guardar_venta(VentasInterface $Repo, Request $request, CajaDiariaDetalleInterface $caja_diaria_detalle_repo, CajaDiariaInterface $caja_diaria_repositorio, ConsecutivosComprobantesInterface $repoCC)
    {

        $data = $request->all();

        $result = array();

        try {
            DB::beginTransaction();
            // $venta = $caja_diaria_detalle_repo->get_venta();
            $data_venta                        = $data;
            $data_venta["idventa_referencia"]  = $data["idventa"];
            $data_venta["devolucion_producto"] = 0;
            //si son iguales
            if ($data["t_monto_total"] == $data["monto"]) {
                if ($data["tipo_comprobante"] == "1") {

                    //ACTUALIZAMOS MONTOS EN CAJA DIARIA
                    $update_caja_diaria                 = array();
                    $update_caja_diaria["idCajaDiaria"] = $caja_diaria_detalle_repo->get_caja_diaria()[0]->idCajaDiaria;

                    $update_caja_diaria["totalNoEfectivo"] = 0;

                    $update_caja_diaria["totalNoEfectivoDol"] = 0;

                    if ($data["idmoneda"] == "1") {
                        $update_caja_diaria["totalEfectivo"] = $data["monto"];
                    } else {
                        $update_caja_diaria["totalEfectivo"] = 0;
                    }

                    if ($data["idmoneda"] == "") {
                        $update_caja_diaria["totalEfectivoDol"] = $data["monto"];

                    } else {
                        $update_caja_diaria["totalEfectivoDol"] = 0;
                    }
                    $caja_diaria_repositorio->update_totales($update_caja_diaria);
                    $data_venta["devolucion_producto"] = 0;
                }

                if ($data["tipo_comprobante"] == "0" && $data["anticipo"] > 0) {

                    $data_venta["devolucion_producto"] = 1;
                }

                if ($data["condicion_pago"] == "1") {

                    $data_venta["devolucion_producto"] = 1;
                }

            }

            $data_venta["idventa"]                   = $Repo->get_consecutivo("ERP_Venta", "idventa");
            $data_venta["cCodConsecutivo_solicitud"] = $data["cCodConsecutivo"];
            $data_venta["nConsecutivo_solicitud"]    = $data["nConsecutivo"];
            $data_venta["condicion_pago"]            = 1;
            $data_venta["fecha_emision"]             = date("Y-m-d H:i:s");

            $data_venta["tipo_comprobante"] = "0";

            $data_venta["IdTipoDocumento"] = "07";

            $data_venta["t_monto_subtotal"] = $data["monto"];

            $data_venta["t_monto_total"] = $data["monto"];

            $data_venta["saldo"]  = "0";
            $data_venta["pagado"] = $data["monto"];
            $data["anticipo"]     = 0;

            $data_venta["idcajero"] = auth()->id();
            $data_venta["idtienda"] = $caja_diaria_detalle_repo->get_caja_diaria()[0]->idtienda;
            $data_venta["idcaja"]   = $caja_diaria_detalle_repo->get_caja_diaria()[0]->idcaja;

            $result = $this->base_model->insertar($this->preparar_datos("dbo.ERP_Venta", $data_venta));

            $venta_detalle = $caja_diaria_detalle_repo->get_venta_detalle($data["idventa"]);

            foreach ($venta_detalle as $key => $value) {
                $data_detalle_venta            = (array) $value;
                $data_detalle_venta["idventa"] = $data_venta["idventa"];
                $this->base_model->insertar($this->preparar_datos("dbo.ERP_VentaDetalle", $data_detalle_venta));

            }

            //ACTUALIZAR SALDOS EN LA SEGUNDA VENTA POR EL SALDO
            $update_venta                    = array();
            $update_venta["cCodConsecutivo"] = $data["cCodConsecutivo"];
            $update_venta["nConsecutivo"]    = $data["nConsecutivo"];
            $update_venta["monto"]           = $data["monto"];
            $Repo->update_saldos_venta($update_venta);

            $repoCC->actualizar_correlativo($data["serie_comprobante"], $data["numero_comprobante"]);

            DB::commit();
            return response()->json($result);
        } catch (\Exception $e) {
            DB::rollBack();
            $response["status"] = "ei";
            $response["msg"]    = $e->getMessage();
            return response()->json($response);
        }
    }

    public function get_notas_devolucion(VentasInterface $Repo, Request $request)
    {

        $response = $Repo->get_notas_devolucion();
        return response()->json($response);

    }

    public function get_venta_detalle($id, VentasInterface $repo, Request $request)
    {
        try {

            $val = $repo->get_venta_detalle($id);

            return response()->json([
                'status' => true,
                'data'   => $val,
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status'  => false,
                'message' => $e->getMessage(),
            ]);
        }
    }

    public function get_venta_separacion(VentasInterface $repo, Request $request) {
        $data = $request->all();    

        $result = $repo->get_venta_separacion($data["idcliente"]);

        return response()->json($result);
        
    }


    public function imprimir_lista_cobraza_cuotas(Request $request, CajaDiariaDetalleInterface $repo_caja) {
        $data = $request->all();    
        
        $datos = array();

        // $solicitudes = $repo->get_visita_solicitudes($id);
        $datos["empresa"] = $repo_caja->get_empresa(); 

        $where = "1=1";

        if(!empty($data["idcobrador"])) {
            $where = " AND s.idCobrador={$data["idcobrador"]}";
        }

        if(!empty($data["idtienda"])) {
            $where = " AND v.idtienda={$data["idtienda"]}";
        }

        $sql_cobradores = "SELECT s.idCobrador, c.descripcion AS cobrador  
        FROM ERP_Venta AS v
        INNER JOIN ERP_Solicitud AS s ON(v.cCodConsecutivo_solicitud=s.cCodConsecutivo AND v.nConsecutivo_solicitud=s.nConsecutivo)
        INNER JOIN ERP_Cobrador AS c ON(s.idCobrador=c.id)
      
        WHERE v.fecha_emision BETWEEN '{$data["fecha_inicio"]}' AND '{$data["fecha_fin"]}' AND s.idCobrador IS NOT NULL {$where}
        GROUP BY s.idCobrador, c.descripcion";

        $cobradores = DB::select($sql_cobradores);

        foreach ($cobradores as $key => $value) {
            $sql = "SELECT c.id AS idcobrador, FORMAT(v.fecha_emision, 'dd/MM/yyyy') AS fecha_emision, cl.razonsocial_cliente, v.serie_comprobante, v.numero_comprobante, FORMAT(sc.fecha_vencimiento, 'dd/MM/yyyy') AS fecha_vencimiento, m.Descripcion AS moneda, v.t_monto_total,DATEDIFF(DAY, sc.fecha_vencimiento, GETDATE())  AS dias_mora, CASE WHEN sc.saldo_cuota=0 THEN 'Cobrado' ELSE 'Pendiente' END AS estado, vd.int_moratorio_pagado, ISNULL(vd.nrocuota, 0) AS nrocuota
            FROM ERP_Venta AS v
            INNER JOIN ERP_VentaDetalle AS vd ON(vd.idventa=v.idventa)
            INNER JOIN ERP_Solicitud AS s ON(v.cCodConsecutivo_solicitud=s.cCodConsecutivo AND v.nConsecutivo_solicitud=s.nConsecutivo)
            INNER JOIN ERP_Cobrador AS c ON(s.idCobrador=c.id)
            INNER JOIN ERP_Clientes AS cl ON(cl.id=v.idcliente)
            INNER JOIN ERP_SolicitudCronograma AS sc ON(sc.cCodConsecutivo=s.cCodConsecutivo AND sc.nConsecutivo=s.nConsecutivo)
            INNER JOIN ERP_Moneda AS m ON(m.IdMoneda=v.idmoneda)
            WHERE v.fecha_emision BETWEEN '{$data["fecha_inicio"]}' AND '{$data["fecha_fin"]}' AND s.idCobrador={$value->idCobrador}";
           
            $pagos = DB::select($sql);

            $cobradores[$key]->pagos = $pagos;
        }

        $datos["cobradores"] = $cobradores;
        // echo "<pre>";
        // print_r($datos);
        // exit;

        
        $pdf = PDF::loadView("reportes.lista_cobranza_cuotas", $datos)->setPaper('A4', "landscape");
        return $pdf->stream("lista_cobranza_cuotas.pdf"); // ver
        // return $pdf->stream("credito_directo.pdf"); // ver
        // print_r($data);
    }
  
}
