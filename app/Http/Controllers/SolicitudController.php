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
use App\Http\Recopro\Solicitud\SolicitudRepository;
use App\Http\Recopro\Solicitud\SolicitudTrait;
use App\Http\Recopro\Warehouse\WarehouseInterface;
use App\Http\Requests\SolicitudRequest;
use App\Models\BaseModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SolicitudController extends Controller
{
    use SolicitudTrait;

    public function __construct()
    {
//        $this->middleware('json');
        $this->base_model = new BaseModel();
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

        // print_r($data); exit;
        $response = array();

        try {
            DB::beginTransaction();

            $desc = explode("*", $data["descuento_id"]);
            $descuento_id = $desc[0];
            $data["descuento_id"] = $descuento_id;
            $data["IdTipoDocumento"] = $data["id_tipoDoc_Venta_or"];
        
            if($data["nConsecutivo"] == "") {
                $data["nConsecutivo"] = $repo->get_consecutivo($data["cCodConsecutivo"]);
                $data["fecha_solicitud"] = date("Y-m-d H:i:s");
                $data["origen"] = "O";
                $data["estado"] = "1";

                // print_r($this->preparar_datos("dbo.ERP_Solicitud", $data));
                // exit;
               
                $result = $this->base_model->insertar($this->preparar_datos("dbo.ERP_Solicitud", $data));
                $this->base_model->insertar($this->preparar_datos("dbo.ERP_SolicitudCredito", $data));
                $repo->actualizar_correlativo($data["cCodConsecutivo"], $data["nConsecutivo"]);
            } else {
                $result = $this->base_model->modificar($this->preparar_datos("dbo.ERP_Solicitud", $data));
                $this->base_model->modificar($this->preparar_datos("dbo.ERP_SolicitudCredito", $data));
            }   

            
            

   

            if(count($data["idarticulo"]) > 0) {

                DB::table("ERP_SolicitudArticulo")->where("cCodConsecutivo", $data["cCodConsecutivo"])->where("nConsecutivo",  $data["nConsecutivo"])->delete();
                $data_articulo = $data;
                for ($i=0; $i < count($data["idarticulo"]); $i++) { 
                    if($i == 0) {

                        $data_articulo["id"][$i] = $repo->get_consecutivo_detalle("ERP_SolicitudArticulo", "id");
                    } else {
                        $data_articulo["id"][$i] = $data_articulo["id"][$i-1] + 1;
                    }
                }
               
                $this->base_model->insertar($this->preparar_datos("dbo.ERP_SolicitudArticulo", $data_articulo));
             
              
                
               
            }
          
            if(isset($data["series_id"])) {
                $idSeries = explode(",", $data["series_id"]);
                $idarticulos = explode(",", $data["articulos_id"]);
                
                if(count($idSeries) >  0) {
                    DB::table("ERP_SolicitudDetalle")->where("cCodConsecutivo", $data["cCodConsecutivo"])->where("nConsecutivo",  $data["nConsecutivo"])->delete();
                   
                    
                    $data_detalle = $data;
                  
                    for ($i=0; $i < count($idSeries); $i++) { 
                        if($i == 0) {
    
                            $data_detalle["id"][$i] = $repo->get_consecutivo_detalle("ERP_SolicitudDetalle", "id");
                        } else {
                            $data_detalle["id"][$i] = $data_detalle["id"][$i-1] + 1;
                        }
                        $data_detalle["idSerie"] = $idSeries[$i];
                        $data_detalle["idarticulo"] = $idarticulos[$i];
                    }
                    // print_r($this->preparar_datos("dbo.ERP_SolicitudDetalle", $data_detalle));
                    $this->base_model->insertar($this->preparar_datos("dbo.ERP_SolicitudDetalle", $data_detalle));
                   
                }
            }

            
          
            DB::commit();
            return response()->json($result);
        } catch (\Exception $e) {
            DB::rollBack();
            $response["status"] = "ei"; 
            $response["msg"] = $e->getMessage(); 
            return response()->json($response);
        }
        
       
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
        $tipo_document_venta=$repo_orden->gettipo_document_venta();
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
        $personas = $Repo->obtener_personas($usuario);
     

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
            'tipo_document_venta'=>$tipo_document_venta,
            'usuario'=>$usuario,
            'almacen_usuario'=>$almacen_usuario,
            'lotes'=>$lotes,
            'convenios'=>$convenios,
            'vendedores'=>$vendedores,
            'personas'=>$personas,
        ]);
    }

    public function factor_credito(SolicitudInterface $Repo, Request $request) {
        $param_nro_cuotas = $Repo->get_parametro_cuotas();
        $nro_cuotas = $request->input("nro_cuotas");

        $factor_credito = $Repo->get_factor_credito($nro_cuotas, $param_nro_cuotas);


        echo json_encode($factor_credito);


    }

    

 
}
