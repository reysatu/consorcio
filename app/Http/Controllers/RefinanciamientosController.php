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

 



    public function guardar_renegociacion_mora(Request $request, SolicitudInterface $solicitud_repositorio)
    {

        $data = $request->all();

        $result = array();

        // print_r($data); exit;

        try {
            DB::beginTransaction();
            
            // echo  $solicitud_repositorio->get_consecutivo("ERP_SolicitudNegociaMora", "idsolicitudmora");
            for ($i=0; $i < count($data["monto"]); $i++) { 
                if($data["monto"][$i] == "" || $data["monto"][$i] == 0) {
                    continue;
                }
                $detalle_mora = array();
               
                $detalle_mora["idsolicitudmora"] = $solicitud_repositorio->get_consecutivo("ERP_SolicitudNegociaMora", "idsolicitudmora");
                
                $detalle_mora["cCodConsecutivo"] = $data["cCodConsecutivo_credito"];
                $detalle_mora["nConsecutivo"] = $data["nConsecutivo_credito"];
                $detalle_mora["nrocuota"] = $data["nrocuota"][$i];
                $detalle_mora["fechareg"] = date("Y-m-d H:i:s");
                $detalle_mora["monto"] = $data["monto"][$i];
                $detalle_mora["motivo"] = $data["motivo"][$i];
              
                // print_r($this->preparar_datos("dbo.ERP_SolicitudNegociaMora", $detalle_mora));
                $result = $this->base_model->insertar($this->preparar_datos("dbo.ERP_SolicitudNegociaMora", $detalle_mora));

                 //ACTUALIZAR MONTOS EN solicitud cronograma
                $update_montos_mora = array();
                $update_montos_mora["cCodConsecutivo"] = $data["cCodConsecutivo_credito"];
                $update_montos_mora["nConsecutivo"] = $data["nConsecutivo_credito"];
                $update_montos_mora["nrocuota"] = $data["nrocuota"][$i];
                $update_montos_mora["monto"] = $data["monto"][$i];
                $solicitud_repositorio->update_montos_mora($update_montos_mora);

            }

            
            $sql_update = "UPDATE ERP_Solicitud SET nomora = {$data["nomora"]}       
            WHERE cCodConsecutivo='{$data["cCodConsecutivo_credito"]}' AND nConsecutivo={$data["nConsecutivo_credito"]}";
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
