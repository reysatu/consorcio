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
use App\Http\Recopro\Solicitud\SolicitudInterface;
use App\Http\Recopro\Solicitud\SolicitudRepository;
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
        $params = ['idventa','anulado','serie_comprobante', 'numero_comprobante', 'fecha_emision', 'tipo_documento', 'numero_documento', 'moneda', 't_monto_total', 'pagado', 'saldo', 'cCodConsecutivo_solicitud', 'nConsecutivo_solicitud', 'tipo_solicitud', "estado", 'IdTipoDocumento', 'anticipo', 'idventa_referencia', 'tipo_comprobante'];
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

    public function excel_lista_cobranza_cuotas(VentasInterface $repo, Request $request, SolicitudInterface $solicitud_repositorio)
    {
       
        // echo "<pre>";
        $data = $request->all();    
        // print_r($data);
        // // print_r($repo->all()); 
        // exit;

        $where = "";

        if(!empty($data["idcobrador"])) {
            $where .= " AND s.idCobrador={$data["idcobrador"]}";
        }

        if(!empty($data["idtienda"])) {
            $where .= " AND v.idtienda={$data["idtienda"]}";
        }

        if(!empty($data["tipo_solicitud"])) {
            $where .= " AND s.tipo_solicitud={$data["tipo_solicitud"]}";
        }

        if(!empty($data["idconvenio"])) {
            $where .= " AND s.idconvenio={$data["idconvenio"]}";
        }

        if(!empty($data["idconvenio"])) {
            $where .= " AND s.idconvenio={$data["idconvenio"]}";
        }

        if(!empty($data["ubigeo"])) {
            $where .= " AND cl.ubigeo={$data["ubigeo"]}";
        }

        // $sql_cobradores = "SELECT s.idCobrador, c.descripcion AS cobrador  
        // FROM ERP_Venta AS v
        // INNER JOIN ERP_Solicitud AS s ON(v.cCodConsecutivo_solicitud=s.cCodConsecutivo AND v.nConsecutivo_solicitud=s.nConsecutivo)
        // INNER JOIN ERP_Cobrador AS c ON(s.idCobrador=c.id)
        // INNER JOIN ERP_Clientes AS cc ON(cc.id=s.idcliente)
        // WHERE v.fecha_emision BETWEEN '{$data["fecha_inicio"]}' AND '{$data["fecha_fin"]}' AND s.idCobrador IS NOT NULL {$where}
        // GROUP BY s.idCobrador, c.descripcion";

        // $cobradores = DB::select($sql_cobradores);
        $vacios = 0;
        // foreach ($cobradores as $key => $value) {
            $sql = "SELECT c.descripcion AS cobrador, c.id AS idcobrador, FORMAT(v.fecha_emision, 'dd/MM/yyyy') AS fecha_emision, cl.razonsocial_cliente, v.serie_comprobante, v.numero_comprobante, FORMAT(sc.fecha_vencimiento, 'dd/MM/yyyy') AS fecha_vencimiento, m.Descripcion AS moneda, v.t_monto_total,DATEDIFF(DAY, sc.fecha_vencimiento, GETDATE())  AS dias_mora, CASE WHEN sc.saldo_cuota=0 THEN 'Cobrado' ELSE 'Pendiente' END AS estado, vd.int_moratorio_pagado, ISNULL(vd.nrocuota, 0) AS nrocuota, vd.valor_cuota_pagada, s.cCodConsecutivo, s.nConsecutivo
            FROM ERP_Venta AS v
            INNER JOIN ERP_VentaDetalle AS vd ON(vd.idventa=v.idventa)
            INNER JOIN ERP_Solicitud AS s ON(v.cCodConsecutivo_solicitud=s.cCodConsecutivo AND v.nConsecutivo_solicitud=s.nConsecutivo)
            INNER JOIN ERP_Cobrador AS c ON(s.idCobrador=c.id)
            INNER JOIN ERP_Clientes AS cl ON(cl.id=v.idcliente)
            INNER JOIN ERP_SolicitudCronograma AS sc ON(sc.cCodConsecutivo=s.cCodConsecutivo AND sc.nConsecutivo=s.nConsecutivo AND vd.nrocuota=sc.nrocuota)
            INNER JOIN ERP_Moneda AS m ON(m.IdMoneda=v.idmoneda)
            WHERE v.fecha_emision BETWEEN '{$data["fecha_inicio"]}' AND '{$data["fecha_fin"]}' {$where}
            ORDER BY c.descripcion ASC";
           
            $pagos = DB::select($sql);
            
            if(count($pagos) <= 0) {
                $vacios ++;
            }

            foreach ($pagos as $kp => $vp) {
                $cuotas = $solicitud_repositorio->get_solicitud_cronograma($vp->cCodConsecutivo, $vp->nConsecutivo);
                $pagos[$kp]->nrocuotas = count($cuotas);
            }
           
        
        // }


        // echo "<pre>";
        // print_r($cobradores);
        // exit;

        if($vacios > 0) {
            echo '<script>alert("No hay Datos"); window.close(); </script>';
            exit;
        }
        return generateExcel($this->generateDataExcelListaCobranzaCuotas($pagos), 'LISTA DE COBRANZA DE CUOTAS', 'Ventas');
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

    public function devolver_dinero($caja_diaria_detalle_repo, $caja_diaria_repositorio, $data) {
        $data_caja_detalle = array();
        $data_caja_detalle["idCajaDiaria"] = $caja_diaria_detalle_repo->get_caja_diaria()[0]->idCajaDiaria; 
        $data_caja_detalle["consecutivo"] = $caja_diaria_detalle_repo->get_consecutivo("ERP_CajaDiariaDetalle", "consecutivo");
        $data_caja_detalle["codigoTipo"] = "VTA";
        $data_caja_detalle["codigoFormaPago"] = "EFE";
        $data_caja_detalle["idMoneda"] = $data["idmoneda"];
        $data_caja_detalle["monto"] = $data["monto"];
        $data_caja_detalle["descripcion"] = "Devolución de dinero por aplicación de nota de Crédtio";
        $data_caja_detalle["nroTarjeta"] = "";
        $data_caja_detalle["nroOperacion"] = "";
        $data_caja_detalle["naturaleza"] = "S";
        
        $this->base_model->insertar($this->preparar_datos("dbo.ERP_CajaDiariaDetalle", $data_caja_detalle));

        //ACTUALIZAMOS MONTOS EN CAJA DIARIA
        $update_caja_diaria                 = array();
        $update_caja_diaria["idCajaDiaria"] = $caja_diaria_detalle_repo->get_caja_diaria()[0]->idCajaDiaria;

        $update_caja_diaria["totalNoEfectivo"] = 0;

        $update_caja_diaria["totalNoEfectivoDol"] = 0;

        if ($data["idmoneda"] == "1") {
            $update_caja_diaria["totalEfectivo"] = $data["monto"] * (-1);
        } else {
            $update_caja_diaria["totalEfectivo"] = 0;
        }

        if ($data["idmoneda"] == "") {
            $update_caja_diaria["totalEfectivoDol"] = $data["monto"] * (-1);

        } else {
            $update_caja_diaria["totalEfectivoDol"] = 0;
        }
        $caja_diaria_repositorio->update_totales($update_caja_diaria);
    }

    

    public function guardar_venta(VentasInterface $Repo, Request $request, CajaDiariaDetalleInterface $caja_diaria_detalle_repo, CajaDiariaInterface $caja_diaria_repositorio, ConsecutivosComprobantesInterface $repoCC)
    {

        $data = $request->all();

        $result = array();

        try {
            DB::beginTransaction();
            // $venta = $caja_diaria_detalle_repo->get_venta();
            
            $result = $this->emitir_nota($data, $caja_diaria_detalle_repo, $caja_diaria_repositorio, $Repo, $repoCC);
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

    public function get_venta_detalle_devolucion($id, VentasInterface $repo, Request $request)
    {
        try {
            $arr = explode("*", $id);
            $serie_comprobante = $arr[0];
            $numero_comprobante = $arr[1];
            $val = $repo->get_venta_detalle_devolucion($serie_comprobante, $numero_comprobante);

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

    public function anularventa($id, VentasInterface $repo, Request $request)
    {
        try {
           $response = $repo->anular_venta($id);
            return response()->json([
                'status' => true,
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

    public function get_venta_nota(VentasInterface $repo, Request $request) {
        $data = $request->all();    

        $result = $repo->get_venta_nota($data["idcliente"]);

        return response()->json($result);
        
    }


    public function imprimir_lista_cobraza_cuotas(Request $request, CajaDiariaDetalleInterface $repo_caja, SolicitudInterface $solicitud_repositorio) {
        $data = $request->all();    
        
        $datos = array();

        // $solicitudes = $repo->get_visita_solicitudes($id);
        $datos["empresa"] = $repo_caja->get_empresa(); 

        $where = "";

        if(!empty($data["idcobrador"])) {
            $where .= " AND s.idCobrador={$data["idcobrador"]}";
        }

        if(!empty($data["idtienda"])) {
            $where .= " AND v.idtienda={$data["idtienda"]}";
        }

        if(!empty($data["tipo_solicitud"])) {
            $where .= " AND s.tipo_solicitud={$data["tipo_solicitud"]}";
        }

        if(!empty($data["idconvenio"])) {
            $where .= " AND s.idconvenio={$data["idconvenio"]}";
        }

        if(!empty($data["idconvenio"])) {
            $where .= " AND s.idconvenio={$data["idconvenio"]}";
        }

        if(!empty($data["ubigeo"])) {
            $where .= " AND cc.ubigeo={$data["ubigeo"]}";
        }

        $sql_cobradores = "SELECT s.idCobrador, c.descripcion AS cobrador  
        FROM ERP_Venta AS v
        INNER JOIN ERP_Solicitud AS s ON(v.cCodConsecutivo_solicitud=s.cCodConsecutivo AND v.nConsecutivo_solicitud=s.nConsecutivo)
        INNER JOIN ERP_Cobrador AS c ON(s.idCobrador=c.id)
        INNER JOIN ERP_Clientes AS cc ON(cc.id=s.idcliente)
        WHERE v.fecha_emision BETWEEN '{$data["fecha_inicio"]}' AND '{$data["fecha_fin"]}' AND s.idCobrador IS NOT NULL {$where}
        GROUP BY s.idCobrador, c.descripcion";

        $cobradores = DB::select($sql_cobradores);
        $vacios = 0;
        foreach ($cobradores as $key => $value) {
            $sql = "SELECT c.id AS idcobrador, FORMAT(v.fecha_emision, 'dd/MM/yyyy') AS fecha_emision, cl.razonsocial_cliente, v.serie_comprobante, v.numero_comprobante, FORMAT(sc.fecha_vencimiento, 'dd/MM/yyyy') AS fecha_vencimiento, m.Descripcion AS moneda, v.t_monto_total,DATEDIFF(DAY, sc.fecha_vencimiento, GETDATE())  AS dias_mora, CASE WHEN sc.saldo_cuota=0 THEN 'Cobrado' ELSE 'Pendiente' END AS estado, vd.int_moratorio_pagado, ISNULL(vd.nrocuota, 0) AS nrocuota, vd.valor_cuota_pagada, s.cCodConsecutivo, s.nConsecutivo
            FROM ERP_Venta AS v
            INNER JOIN ERP_VentaDetalle AS vd ON(vd.idventa=v.idventa)
            INNER JOIN ERP_Solicitud AS s ON(v.cCodConsecutivo_solicitud=s.cCodConsecutivo AND v.nConsecutivo_solicitud=s.nConsecutivo)
            INNER JOIN ERP_Cobrador AS c ON(s.idCobrador=c.id)
            INNER JOIN ERP_Clientes AS cl ON(cl.id=v.idcliente)
            INNER JOIN ERP_SolicitudCronograma AS sc ON(sc.cCodConsecutivo=s.cCodConsecutivo AND sc.nConsecutivo=s.nConsecutivo AND vd.nrocuota=sc.nrocuota)
            INNER JOIN ERP_Moneda AS m ON(m.IdMoneda=v.idmoneda)
            WHERE v.fecha_emision BETWEEN '{$data["fecha_inicio"]}' AND '{$data["fecha_fin"]}' AND s.idCobrador={$value->idCobrador}";
           
            $pagos = DB::select($sql);
            
            if(count($pagos) <= 0) {
                $vacios ++;
            }

            foreach ($pagos as $kp => $vp) {
                $cuotas = $solicitud_repositorio->get_solicitud_cronograma($vp->cCodConsecutivo, $vp->nConsecutivo);
                $pagos[$kp]->nrocuotas = count($cuotas);
            }
            $cobradores[$key]->pagos = $pagos;
        
        }

        $datos["cobradores"] = $cobradores;
        // echo "<pre>";
        // print_r($datos);
        // exit;

        if($vacios > 0) {
            echo '<script>alert("No hay Datos"); window.close(); </script>';
            exit;
        }

        
        $pdf = PDF::loadView("reportes.lista_cobranza_cuotas", $datos)->setPaper('A4', "landscape");
        return $pdf->stream("lista_cobranza_cuotas.pdf"); // ver
        // return $pdf->stream("credito_directo.pdf"); // ver
        // print_r($data);
    }

    public function validar_venta_anticipo(CajaDiariaDetalleInterface $repo, Request $request) {
        $data = $request->all();
        $result = $repo->get_segunda_venta_credito($data["cCodConsecutivo"], $data["nConsecutivo"]);
        return response()->json($result);
    }
  
}
