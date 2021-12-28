<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Orden_servicio\Orden_servicioInterface;
use App\Http\Recopro\Solicitud\SolicitudInterface;
use App\Http\Recopro\Solicitud\SolicitudTrait;
use App\Http\Recopro\Warehouse\WarehouseInterface;
use App\Http\Requests\SolicitudRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SolicitudController extends Controller
{
    use SolicitudTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, SolicitudInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['cCodConsecutivo', 'nConsecutivo', 'fecha_solicitud', 'tipo_solicitud', 'idconvenio'];
        // print_r($repo->search($s)); exit;
        return parseList($repo->search($s), $request, 'cCodConsecutivo', $params);
    }

    public function create(SolicitudInterface $repo, SolicitudRequest $request)
    {
        $data = $request->all();
        // $data['cCodConsecutivo'] = $data['cCodConsecutivo'];
        // $data['nombre_caja'] = $data['convenio'];
        // print_r($data);
        
        $repo->create($data);

        return response()->json([
            'Result' => 'OK',
            'Record' => []
        ]);

        
    }

    public function guardar_solicitud(SolicitudInterface $repo, SolicitudRequest $request)
    {
        $data = $request->all();
        // $data['cCodConsecutivo'] = $data['cCodConsecutivo'];
        // $data['nombre_caja'] = $data['convenio'];
        // print_r($data);

        DB::beginTransaction();
        try {

            // $data_solicitud = $this->preparar_datos("dbo.ERP_Solicitud", $data);
            $data_solicitud = array();
            // print_r($data_solicitud); exit;
            $desc = explode("*", $data["descuento_id"]);
            $descuento_id = $desc[0];
            $data_solicitud["cCodConsecutivo"] = $data["cCodConsecutivo"];
            $data_solicitud["nConsecutivo"] = $repo->get_consecutivo($data["cCodConsecutivo"]);
            $data_solicitud["fecha_solicitud"] = date("Y-m-d H:i:s");
            $data_solicitud["tipo_solicitud"] = $data["tipo_solicitud"];

            $data_solicitud["origen"] = "O";
            $data_solicitud["idconvenio"] = $data["idconvenio"];
            $data_solicitud["idvendedor"] = $data["idvendedor"];
            $data_solicitud["idcliente"] = $data["idcliente"];
            $data_solicitud["idmoneda"] = $data["idmoneda"];
            $data_solicitud["estado"] = "1";
            $data_solicitud["fecha_vencimiento"] = $data["fecha_vencimiento"];
            $data_solicitud["iddescuento"] = $descuento_id;
            $data_solicitud["porcentaje_descuento"] = $data["porcentaje_descuento_total"];
            $data_solicitud["monto_descuento"] = $data["monto_descuento_total"];
            $data_solicitud["subtotal"] = $data["t_monto_subtotal"];
            $data_solicitud["monto_exonerado"] = $data["t_monto_exonerado"];
            $data_solicitud["monto_afecto"] = $data["t_monto_afecto"];
            $data_solicitud["monto_inafecto"] = $data["t_monto_inafecto"];
            $data_solicitud["impuestos"] = $data["t_impuestos"];
            $data_solicitud["monto_total"] = $data["t_total"];
            $data_solicitud["monto_descuento_detalle"] = $data["t_monto_descuento"];

            $res = $repo->create($data_solicitud);
            // print_r($res);
            $repo->actualizar_correlativo($data["cCodConsecutivo"], $data_solicitud["nConsecutivo"]);

            // echo count($data["idarticulo"]); exit;

            if(count($data["idarticulo"]) > 0) {

                DB::table("ERP_SolicitudArticulo")->where("cCodConsecutivo", $data["cCodConsecutivo"])->where("nConsecutivo",  $data_solicitud["nConsecutivo"])->delete();

                for ($i=0; $i < count($data["idarticulo"]); $i++) { 
                    $detalle_articulo = array();
                    $detalle_articulo["id"] = $repo->get_consecutivo_detalle("ERP_SolicitudArticulo", "id");
                    $detalle_articulo["cCodConsecutivo"] = $data_solicitud["cCodConsecutivo"];
                    $detalle_articulo["nConsecutivo"] = $data_solicitud["nConsecutivo"];
                    $detalle_articulo["idarticulo"] = $data["idarticulo"][$i];
                    $detalle_articulo["cantidad"] = $data["cantidad"][$i];
                    $detalle_articulo["idalmacen"] = $data["idalmacen"][$i];
                    $detalle_articulo["idlocalizacion"] = $data["idlocalizacion"][$i];
                    $detalle_articulo["idlote"] = $data["idlote"][$i];
                    $detalle_articulo["precio_unitario"] = $data["precio"][$i];
                    $detalle_articulo["iddescuento"] = $data["iddescuento"][$i];
                    $detalle_articulo["porcentaje_descuento"] = $data["porcentaje_descuento"][$i];
                    $detalle_articulo["precio_total"] = $data["precio_total"][$i];
                    $detalle_articulo["monto_descuento"] = $data["monto_descuento"][$i];
                    $detalle_articulo["subtotal"] = $data["monto_subtotal"][$i];
                    $detalle_articulo["monto_exonerado"] = $data["monto_exonerado"][$i];
                    $detalle_articulo["monto_afecto"] = $data["monto_afecto"][$i];
                    $detalle_articulo["monto_inafecto"] = $data["monto_inafecto"][$i];
                    $detalle_articulo["impuestos"] = $data["impuestos"][$i];
                    $detalle_articulo["monto_total"] = $data["total"][$i];
                    DB::table("ERP_SolicitudArticulo")->insert($detalle_articulo);
                }
            }


            $idSeries = explode(",", $data["series_id"]);

            if(count($idSeries) >  0) {
                DB::table("ERP_SolicitudDetalle")->where("cCodConsecutivo", $data["cCodConsecutivo"])->where("nConsecutivo",  $data_solicitud["nConsecutivo"])->delete();
                for ($s=0; $s < count($idSeries); $s++) { 
                    # code...
                    $detalle = array();
                    $detalle["id"] = $repo->get_consecutivo_detalle("ERP_SolicitudDetalle", "id");
                    $detalle["cCodConsecutivo"] = $data_solicitud["cCodConsecutivo"];
                    $detalle["nConsecutivo"] = $data_solicitud["nConsecutivo"];
                    $detalle["idarticulo"] = $data["idarticulo"][$s];
                    $detalle["idSerie"] = $idSeries[$s];
                    DB::table("ERP_SolicitudDetalle")->insert($detalle);
                }
               
            }
            DB::commit();
            return response()->json([
                'status' => true,
                'res'=>$res,
                
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
        
        // $repo->create($data);

        return response()->json([
            'Result' => 'OK',
            'Record' => []
        ]);
    }
    public function update(SolicitudInterface $repo, SolicitudRequest $request)
    {
        $data = $request->all();
        // print_r($data);
        $cCodConsecutivo = $data['cCodConsecutivo'];
        // $data['nombre_caja'] = $data['convenio'];
        $repo->update($cCodConsecutivo, $data);

        return response()->json(['Result' => 'OK']);
    }

    public function destroy(SolicitudInterface $repo, Request $request)
    {
        $cCodConsecutivo = $request->input('cCodConsecutivo');
        $repo->destroy($cCodConsecutivo);
        return response()->json(['Result' => 'OK']);
    }

    public function getAll(SolicitudInterface $repo)
    {
        return parseSelect($repo->all(), 'cCodConsecutivo', 'nombre_caja');
    }

    public function excel(SolicitudInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE Solicitud', 'Solicitud');
    }

    public function data_form (SolicitudInterface $Repo, Orden_servicioInterface $repo_orden, WarehouseInterface $WareRepo)
    {
        
        $codigo = $Repo->getcodigo();
        // $codigo_proforma = $Repo->getcodigo_proforma();
        $condicion_pago = $repo_orden->getcondicion_pago();
        // $tipo_servicio = $repo_orden->gettipo_servicio();
        $tipo_document = $repo_orden->gettipo_document();
        // $tipo_document_venta=$repo_orden->gettipo_document_venta();
        // $revisiones = $repo_orden->getrevisiones();
        // $tecnico = $repo_orden->gettecnico();
        // $asesor = $repo_orden->getasesor();
        $moneda = $repo_orden->getmoneda();
        // $servicios = $repo_orden->get_servicios(); 
        // $tipoMantenimiento = $repo_orden->get_Tipomantenimientos(); 
        // $totales = $repo_orden->get_totales();
        $usuario=auth()->id();
        $descuentos=$repo_orden->get_descuentos($usuario);
        $almacen_usuario = $WareRepo->getAlmacen_usuario($usuario);
        $lotes = $Repo->obtener_lotes($usuario);
        $convenios = $Repo->obtener_convenios($usuario);
        $vendedores = $Repo->obtener_vendedores($usuario);
     

        return response()->json([
            'status' => true,
            'codigo' => $codigo,
            // 'codigo_proforma'=>$codigo_proforma,
            'condicion_pago' => $condicion_pago,
            // 'tipo_servicio' => $tipo_servicio,
            'tipo_document'=> $tipo_document,
            // 'revisiones'=>$revisiones,
            // 'tecnico'=>$tecnico,
            'moneda'=>$moneda,
            // 'asesor'=>$asesor,
            'descuentos'=>$descuentos,
            // 'servicios'=>$servicios,
            // 'totales'=>$totales,
            // 'tipoMantenimiento'=>$tipoMantenimiento,
            // 'tipo_document_venta'=>$tipo_document_venta,
            'usuario'=>$usuario,
            'almacen_usuario'=>$almacen_usuario,
            'lotes'=>$lotes,
            'convenios'=>$convenios,
            'vendedores'=>$vendedores,
        ]);
    }
}
