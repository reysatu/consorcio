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
// use App\Http\Recopro\Refinanciamientos\RefinanciamientosInterface;
// use App\Http\Recopro\Refinanciamientos\RefinanciamientosTrait;
// use App\Http\Requests\RefinanciamientosRequest;
use App\Models\BaseModel;
use DB;
use Illuminate\Http\Request;

class RefinanciamientosController extends Controller
{
    // use RefinanciamientosTrait;

    public function __construct()
    {
        $this->base_model = new BaseModel();
//        $this->middleware('json');
    }

 



    public function generar_refinanciamiento(Request $request, SolicitudInterface $solicitud_repositorio)
    {

        $data = $request->all();

        $result = array();

        // print_r($data); exit;

        try {
            DB::beginTransaction();

            $sql_solicitud = "SELECT * FROM ERP_Solicitud WHERE cCodConsecutivo='{$data["cCodConsecutivo"]}' AND nConsecutivo={$data["nConsecutivo"]}";
            $solicitud = DB::select($sql_solicitud);

            $sql_solicitud_articulo = "SELECT * FROM ERP_SolicitudArticulo WHERE cCodConsecutivo='{$data["cCodConsecutivo"]}' AND nConsecutivo={$data["nConsecutivo"]}";
            $solicitud_articulo = DB::select($sql_solicitud_articulo);

            

            $sql_solicitud_credito = "SELECT * FROM ERP_SolicitudCredito WHERE cCodConsecutivo='{$data["cCodConsecutivo"]}' AND nConsecutivo={$data["nConsecutivo"]}";
            $solicitud_credito = DB::select($sql_solicitud_credito);
           
            if(count($solicitud) > 0) {
                foreach ($solicitud as $ks => $vs) {
                    $data_solicitud = (array) $vs;
                    $data_solicitud["nConsecutivo"] = $solicitud_repositorio->get_consecutivo($data["cCodConsecutivo"]);
                    $data_solicitud["tipo"] = "R";
                    $data_solicitud["cCodConsecutivoO"] = $data["cCodConsecutivo"]; 
                    $data_solicitud["nConsecutivoO"] = $data["nConsecutivo"]; 
                    $data_solicitud["fecha_solicitud"] = $data["fecha_refinanciamiento"]." ".date("H:i:s");
                    // print_r($data_solicitud);
                    $result = $this->base_model->insertar($this->preparar_datos("dbo.ERP_Solicitud", $data_solicitud));
                    $solicitud_repositorio->actualizar_correlativo($data_solicitud["cCodConsecutivo"], $data_solicitud["nConsecutivo"]);
                }
    
            }
 
            
            if(count($solicitud_articulo) > 0) {
                foreach ($solicitud_articulo as $ksa => $vsa) {
                    $data_solicitud_articulo = (array) $vsa;
                    $data_solicitud_articulo["id"] = $solicitud_repositorio->get_consecutivo_detalle("ERP_SolicitudArticulo", "id");
                    $data_solicitud_articulo["cCodConsecutivo"] = $data_solicitud["cCodConsecutivo"];
                    $data_solicitud_articulo["nConsecutivo"] = $data_solicitud["nConsecutivo"];
    
                    $result = $this->base_model->insertar($this->preparar_datos("dbo.ERP_SolicitudArticulo", $data_solicitud_articulo));

                    $sql_solicitud_detalle = "SELECT * FROM ERP_SolicitudDetalle WHERE cCodConsecutivo='{$data["cCodConsecutivo"]}' AND nConsecutivo={$data["nConsecutivo"]} AND id_solicitud_articulo={$vsa->id}";
                    $solicitud_detalle = DB::select($sql_solicitud_detalle);

                    if(count($solicitud_detalle) > 0) {
                        foreach ($solicitud_detalle as $ksd => $vsd) {
                            $data_solicitud_detalle = (array) $vsd;
                            $data_solicitud_detalle["id"] = $solicitud_repositorio->get_consecutivo_detalle("ERP_SolicitudDetalle", "id");
                            $data_solicitud_detalle["cCodConsecutivo"] = $data_solicitud["cCodConsecutivo"];
                            $data_solicitud_detalle["nConsecutivo"] = $data_solicitud["nConsecutivo"];
                            $data_solicitud_detalle["id_solicitud_articulo"] = $data_solicitud_articulo["id"];
            
                            $result = $this->base_model->insertar($this->preparar_datos("dbo.ERP_SolicitudDetalle", $data_solicitud_detalle));
                        }
                    }
                }
            }
      
            
           

           
           

            if(count($solicitud_credito) > 0) {  
                foreach ($solicitud_credito as $ksc => $vsc) {
                    $data_solicitud_credito = (array) $vsc;
                    $data_solicitud_credito["cCodConsecutivo"] = $data_solicitud["cCodConsecutivo"];
                    $data_solicitud_credito["nConsecutivo"] = $data_solicitud["nConsecutivo"];
    
                    $result = $this->base_model->insertar($this->preparar_datos("dbo.ERP_SolicitudCredito", $data_solicitud_credito));
                }
    
            }
            
            
            $fecha = $data["fecha_refinanciamiento"];
            $valor_cuota = (float) $data["monto_refinanciamiento"] / (int) $data["nrocuotas_refinanciamiento"];
            $valor_cuota = round($valor_cuota, 2);
            for ($c=1; $c <= $data["nrocuotas_refinanciamiento"]; $c++) { 

                $fecha = $this->sumar_restar_dias($fecha, "+", 30);
                $data_cronograma = array();
                $data_cronograma["cCodConsecutivo"] = $data_solicitud["cCodConsecutivo"];
                $data_cronograma["nConsecutivo"] = $data_solicitud["nConsecutivo"];
                $data_cronograma["nrocuota"] = $c;
                $data_cronograma["fecha_vencimiento"] = $fecha;
                $data_cronograma["valor_cuota"] =  $valor_cuota;
                $data_cronograma["int_moratorio"] = "0";
                $data_cronograma["saldo_cuota"] =  $valor_cuota;
                $data_cronograma["monto_pago"] = "0";
                // print_r($this->preparar_datos("dbo.ERP_SolicitudCronograma", $data_cronograma));
                $res = $this->base_model->insertar($this->preparar_datos("dbo.ERP_SolicitudCronograma", $data_cronograma));
                // print_r($res);   
            }


           

            //CAMBIAMOS LA solicitud origen a estado refinanciado
            $sql_update = "UPDATE ERP_Solicitud SET estado = 9       
            WHERE cCodConsecutivo='{$data["cCodConsecutivo"]}' AND nConsecutivo={$data["nConsecutivo"]}";
            DB::statement($sql_update);
           


            DB::commit();
            return response()->json($result);
        } catch (\Exception $e) {
            DB::rollBack();
            $response["status"] = "ei";
            $response["msg"]    = $e->getMessage();
            return response()->json($response);
        }
    }

    
}
