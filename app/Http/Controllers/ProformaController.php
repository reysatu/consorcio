<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Proforma\ProformaTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\Proforma\ProformaInterface;
use App\Http\Requests\ProformaRequest;
use DB;
class ProformaController extends Controller
{
     use ProformaTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, ProformaInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['cCodConsecutivo', 'nConsecutivo','cCodConsecutivoOS','nConsecutivoOS','dFechaRegistro','iEstado'];
        return parseList($repo->search($s), $request, 'cCodConsecutivo', $params);
    }
     public function deleteDetalleMO($id, ProformaInterface $repo, Request $request)
    {

        DB::beginTransaction();
        try {
            $data = $request->all();
            $valtodo=explode("_", $id);
            
            $id_revision_array=$data['id_revision_array'];
            $id_revision_array=explode(',', $id_revision_array);

            $idDetalleRepuestoGrup=$data['idDetalleRepuestoGrup'];
            $idDetalleRepuestoGrup=explode(',', $idDetalleRepuestoGrup);

            for ($i=0; $i < count($id_revision_array) ; $i++) {
               $val=$repo->destroy_proforma_servicio($valtodo[0],$valtodo[1],$id_revision_array[$i]);
               if($val[0]->Mensaje!=''){
                break;
               }
            };
            for ($i=0; $i < count($idDetalleRepuestoGrup) ; $i++) {
               $val2=$repo->destroy_proforma_repuesto($valtodo[0],$valtodo[1],$idDetalleRepuestoGrup[$i]);
               if($val2[0]->Mensaje!=''){
                break;
               }
            };
            DB::commit();
            return response()->json([
                'status' => true,
                'data'=>$id_revision_array,
                'dato'=>$val,
                'dato2'=>$val2,
                'datad'=>$id,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

   public function createUpdate($id, ProformaInterface $repo, Request $request)
    {
        DB::beginTransaction();
        try {

            $data = $request->all();

            $cCod=strtoupper($data['cCod']);
            $nCons=strtoupper($data['nCons']);
            $cCodOS=strtoupper($data['cCodOS']);
            $nConsOS=strtoupper($data['nConsOS']);
            $cMoneda=strtoupper($data['cMoneda']);
            $nidCliente=strtoupper($data['nidCliente']);
            $nidAsesor=strtoupper($data['nidAsesor']);
            $cPlacaVeh=strtoupper($data['cPlacaVeh']);
            $dFecRec=strtoupper($data['dFecRec']);
            $nEstimado=strtoupper($data['nEstimado']);
            $modo_array_repuesto=$data['modo_array_repuesto'];
            $modo_array_repuesto=explode(',', $modo_array_repuesto);

            $id_revision_array=$data['id_revision_array'];
            $id_revision_array=explode(',', $id_revision_array);

            $id_tipo_array=$data['id_tipo_array'];
            $id_tipo_array=explode(',', $id_tipo_array);

            $id_repuesto_tipoTotal=$data['id_repuesto_tipoTotal'];
            $id_repuesto_tipoTotal=explode(',', $id_repuesto_tipoTotal);

            $id_repuesto_array=$data['id_repuesto_array'];
            $id_repuesto_array=explode(',', $id_repuesto_array);

            $id_repuesto_cantidad=$data['id_repuesto_cantidad'];
            $id_repuesto_cantidad=explode(',', $id_repuesto_cantidad);

            $id_repuesto_precio=$data['id_repuesto_precio'];
            $id_repuesto_precio=explode(',', $id_repuesto_precio);

            $precio_array_servicio=$data['precio_array_servicio'];
            $precio_array_servicio=explode(',', $precio_array_servicio);

            $id_repuesto_impuesto=$data['id_repuesto_impuesto'];
            $id_repuesto_impuesto=explode(',', $id_repuesto_impuesto);

            $modo_array_servicio=$data['modo_array_servicio'];
            $modo_array_servicio=explode(',', $modo_array_servicio);

            $idDetalleGrup=$data['idDetalleGrup'];
            $idDetalleGrup=explode(',', $idDetalleGrup);
          
            $impuesto_servicio=$data['impuesto_servicio'];
            $impuesto_servicio=explode(',', $impuesto_servicio);
            
            $idDetalleRepuestoGrup=$data['idDetalleRepuestoGrup'];
            $idDetalleRepuestoGrup=explode(',', $idDetalleRepuestoGrup);

            $totalmo=0;
            $totaldetalle=0;
            $impuesto=0;
            for ($i=0; $i < count($precio_array_servicio) ; $i++) {
                $totalmo=$totalmo+floatval($precio_array_servicio[$i]);
            }
            for ($i=0; $i < count($id_repuesto_cantidad) ; $i++) {
                $totaldetalle=$totaldetalle+(floatval($id_repuesto_cantidad[$i])*floatval($id_repuesto_precio[$i]));
            }
            $subtotal=floatval($totalmo)+floatval($totaldetalle);

            for ($i=0; $i < count($id_repuesto_impuesto) ; $i++) {
                $impuesto=$impuesto+floatval($id_repuesto_impuesto[$i]);
            }
             for ($i=0; $i < count($impuesto_servicio) ; $i++) {
                $impuesto=$impuesto+floatval($impuesto_servicio[$i]);
            }
            $total=floatval($subtotal)+floatval($impuesto);

            $val=1;
            if($data['nCons']==0){
                $val=0;
            };
            $modo=$val;
            $usuario=auth()->id();

            $res=$repo->actualizar_proforma(
                $cCod,
                $nCons,
                $cCodOS,
                $nConsOS,
                $cMoneda,
                $nidCliente,
                $nidAsesor,
                $cPlacaVeh,
                $dFecRec,
                $nEstimado,
                $totalmo,
                $totaldetalle,
                $subtotal,
                $impuesto,
                $total,
                $modo,
                $usuario
            );
        if(intval($res[0]->Mensaje)){
          for ($i=0; $i < count($id_repuesto_array) ; $i++) {
                $total=floatval($id_repuesto_cantidad[$i])*floatval($id_repuesto_precio[$i]);
                 $repo->actualizar_Proforma_detalle($cCod,$res[0]->Mensaje,$idDetalleRepuestoGrup[$i],$id_repuesto_array[$i],$id_repuesto_cantidad[$i],$id_repuesto_precio[$i],$total,$id_repuesto_impuesto[$i],$id_repuesto_tipoTotal[$i],$modo_array_repuesto[$i],$usuario);
           };
            for ($i=0; $i < count($id_revision_array) ; $i++) {
                 $repo->actualizar_Proforma_MO($cCod,$res[0]->Mensaje,$idDetalleGrup[$i],$id_revision_array[$i],$precio_array_servicio[$i],$impuesto_servicio[$i],$id_tipo_array[$i],$modo_array_servicio[$i],$usuario);
           };
        };  
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
    }
    public function destroy($id, ProformaInterface $repo, Request $request)
    {   try {
            $valtodo=explode("_", $id);
            $val=$repo->destroy_Proforma($valtodo[0],$valtodo[1]);
            return response()->json([
                'status' => true,
                'data'=>$val,
            ]);

    }catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function excel(ProformaInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE PROFORMAS', 'Proforma');
    }
     public function data_form (ProformaInterface $Repo)
    {
        $codigo_proforma = $Repo->getTotal_Orden();
        $articulos_repuestos=$Repo->get_articuloRepuestos();
         $igv=$Repo->get_igv();
        return response()->json([
            'status' => true,
            'codigo_proforma'=>$codigo_proforma,
            'articulos_repuestos'=>$articulos_repuestos,
            'igv'=>$igv,
        ]);
    }
    public function deleteDetalleServicio($id, ProformaInterface $repo, Request $request)
    {   try {
            $valtodo=explode("_", $id);
            $val=$repo->destroy_Proforma_detalleSer($valtodo[0],$valtodo[1],$valtodo[2]);
            return response()->json([
                'status' => true,
                'data'=>$val,
            ]);

    }catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
    public function deleteDetalleRepuesto($id, ProformaInterface $repo, Request $request)
    {   try {
            $valtodo=explode("_", $id);
            $val=$repo->destroy_Proforma_detalleRepuesto($valtodo[0],$valtodo[1],$valtodo[2]);
            return response()->json([
                'status' => true,
                'data'=>$val,
            ]);

    }catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
    public function cambiar_estado($id, ProformaInterface $repo, Request $request)
    {

        DB::beginTransaction();
        try {
            $data = $request->all();
            $valtodo=explode("_", $id);
            $usuario=auth()->id();
            $val=$repo->cambiar_estado($valtodo[0],$valtodo[1],$data['estado'],$usuario);
            DB::commit();
            return response()->json([
                'status' => true,
                'data'=>$val,
                
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
    public function find($id, ProformaInterface $repo)
    {
        try {
            $valtodo=explode("_", $id);
            $data = $repo->find_proforma($valtodo[0],$valtodo[1]);
            $data_repuesto = $repo->find_proforma_repuestos($valtodo[0],$valtodo[1]);
            $data['dFechaRegistro2']=date("Y-m-d", strtotime($data[0]->dFechaRegistro));
            $data_servicio=$repo->find_proforma_servicios($valtodo[0],$valtodo[1]);
            return response()->json([
                'status' => true,
                'data' => $data,
                'data_repuesto'=>$data_repuesto,
                'data_servicio'=>$data_servicio,
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

}
