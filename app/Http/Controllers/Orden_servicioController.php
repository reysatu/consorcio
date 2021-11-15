<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Orden_servicio\Orden_servicioTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\Orden_servicio\Orden_servicioInterface;
use App\Http\Requests\Orden_servicioRequest;
use App\Http\Recopro\Customer\CustomerInterface;
use DB;
class Orden_servicioController extends Controller
{
     use Orden_servicioTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, Orden_servicioInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['cCodConsecutivo', 'nConsecutivo','dFecRec','cPlacaVeh','idCliente','iEstado'];
        return parseList($repo->search($s), $request, 'cCodConsecutivo', $params);
    }
 
     public function deleteDetalleChangue($id, Orden_servicioInterface $repo, Request $request)
    {

        DB::beginTransaction();
        try {
            $data = $request->all();
            $valtodo=explode("_", $id);
            
            $id_revision_array=$data['id_revision_array'];
            $id_revision_array=explode(',', $id_revision_array);
            for ($i=0; $i < count($id_revision_array) ; $i++) {
               $val=$repo->destroy_orden_detalle($valtodo[0],$valtodo[1],$id_revision_array[$i]);
               if($val[0]->Mensaje!=''){
                break;
               }
            };
            DB::commit();
            return response()->json([
                'status' => true,
                'data'=>$id_revision_array,
                'dato'=>$val,
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
    public function createUpdate($id, Orden_servicioInterface $repo, Request $request)
    {
        DB::beginTransaction();
        try {
            $data = $request->all();

            $cCodConsecutivo=strtoupper($data['cCodConsecutivo']);
            $nConsecutivo=strtoupper($data['nConsecutivo']);
            $id_tipo=strtoupper($data['id_tipo']);
            $id_tipomant=strtoupper($data['id_tipomant']);
            $IdMoneda=strtoupper($data['IdMoneda']);
            $dFecRec=strtoupper($data['dFecRec']);
            $horaRec=strtoupper($data['horaRec']);
            $dFecEntrega=strtoupper($data['dFecEntrega']);
            $horaEnt=strtoupper($data['horaEnt']);
            $id_tipoveh=strtoupper($data['id_tipoveh']);
            $cPlacaVeh=strtoupper($data['cPlacaVeh']);
            $cMotor=strtoupper($data['cMotor']);
            $cChasis=strtoupper($data['cChasis']);
            $iAnioFab=strtoupper($data['iAnioFab']);
            $cColor=strtoupper($data['cColor']);
            $nKilometraje=strtoupper($data['nKilometraje']);
            $idCliente=strtoupper($data['idCliente']);
            $idTecnico=strtoupper($data['idTecnico']);
            $idAsesor=strtoupper($data['idAsesor']);
            $idcCondicionPago=strtoupper($data['idcCondicionPago']);
            $cObservaciones=strtoupper($data['cObservaciones']);
           
            $mo_revision=strtoupper($data['mo_revision']);
            $mo_mecanica=strtoupper($data['mo_mecanica']);
            $terceros=strtoupper($data['terceros']);
            $otros_mo=strtoupper($data['otros_mo']);
            $respuestos=strtoupper($data['respuestos']);
            $accesorios=strtoupper($data['accesorios']);
            $lubricantes=strtoupper($data['lubricantes']);
            $otros_rep=strtoupper($data['otros_rep']);
            if($mo_revision==''){
                $mo_revision=0;
            };
            if($mo_mecanica==''){
                $mo_mecanica=0;
            };
            if($terceros==''){
                $terceros=0;
            };
            if($otros_mo==''){
                $otros_mo=0;
            };
            if($respuestos==''){
                $respuestos=0;
            };
            if($accesorios==''){
                $accesorios=0;
            };
            if($lubricantes==''){
                $lubricantes=0;
            };
            if($otros_rep==''){
                $otros_rep=0;
            };
            $total=strtoupper($data['total']);
            $val=1;
            if($data['nConsecutivo']==0){
                $val=0;
            };
            $modo=$val;
            $usuario=auth()->id();
            $res=$repo->actualizar_orden(
                $cCodConsecutivo,
                $nConsecutivo,
                $id_tipo,
                $id_tipomant,
                $IdMoneda,
                $dFecRec,
                $horaRec,
                $dFecEntrega,
                $horaEnt,
                $id_tipoveh,
                $cPlacaVeh,
                $cMotor,
                $cChasis,
                $iAnioFab,
                $cColor,
                $nKilometraje,
                $idCliente,
                $idTecnico,
                $idAsesor,
                $idcCondicionPago,
                $cObservaciones,
                $mo_revision,
                $mo_mecanica,
                $terceros,
                $otros_mo,
                $respuestos,
                $accesorios,
                $lubricantes,
                $otros_rep,
                $total,
                $modo,
                $usuario
            );
            if(intval($res[0]->Mensaje)){
                $id_mantenimiento_array=$data['id_mantenimiento_array'];
            $id_mantenimiento_array=explode(',', $id_mantenimiento_array);

            $id_revision_array=$data['id_revision_array'];
            $id_revision_array=explode(',', $id_revision_array);

            $id_tipo_array=$data['id_tipo_array'];
            $id_tipo_array=explode(',', $id_tipo_array);

            

            $precio_array=$data['precio_array'];
            $precio_array=explode(',', $precio_array);

            $modo_array_serv=$data['modo_array_serv'];
            $modo_array_serv=explode(',', $modo_array_serv);

            $modo_array_mant=$data['modo_array_mant'];
            $modo_array_mant=explode(',', $modo_array_mant);
             for ($i=0; $i < count($id_mantenimiento_array) ; $i++) {
                $repo->actualizar_orden_mantenimiento($cCodConsecutivo,$res[0]->Mensaje,$id_mantenimiento_array[$i],$modo_array_mant[$i],$usuario);
             };
             $cont=0;
             for ($i=0; $i < count($id_revision_array) ; $i++) {
                 $repo->actualizar_orden_detalle($cCodConsecutivo,$res[0]->Mensaje,$cont,$id_revision_array[$i],$precio_array[$i],$id_tipo_array[$i],$modo_array_serv[$i],$usuario);
             };
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
    }
      public function getCliente(CustomerInterface $repo)
    {
        return parseSelect($repo->all(), 'id', 'razonsocial_cliente');
    }
     public function data_form (Orden_servicioInterface $Repo)
    {
        
        $codigo = $Repo->getcodigo();
        $condicion_pago = $Repo->getcondicion_pago();
        $tipo_servicio = $Repo->gettipo_servicio();
        $tipo_document = $Repo->gettipo_document();
        $revisiones = $Repo->getrevisiones();
        $tecnico = $Repo->gettecnico();
        $asesor = $Repo->getasesor();
        $moneda = $Repo->getmoneda();
        $servicios = $Repo->get_servicios(); 
        $tipoMantenimiento = $Repo->get_Tipomantenimientos(); 
        $totales = $Repo->get_totales();  
        return response()->json([
            'status' => true,
            'codigo' => $codigo,
            'condicion_pago' => $condicion_pago,
            'tipo_servicio' => $tipo_servicio,
            'tipo_document'=> $tipo_document,
            'revisiones'=>$revisiones,
            'tecnico'=>$tecnico,
            'moneda'=>$moneda,
            'asesor'=>$asesor,
            'servicios'=>$servicios,
            'totales'=>$totales,
            'tipoMantenimiento'=>$tipoMantenimiento,
        ]);
    }

    public function destroy($id, Orden_servicioInterface $repo, Request $request)
    {   try {
            $valtodo=explode("_", $id);
            $val=$repo->destroy_orden($valtodo[0],$valtodo[1]);
        // throw new \Exception('Ya existe un almacen con este código interno. Por favor ingrese otro código.');
        //     DB::commit();
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
    public function deleteDetalle($id, Orden_servicioInterface $repo, Request $request)
    {   try {
            $valtodo=explode("_", $id);
            $val=$repo->destroy_orden_detalle($valtodo[0],$valtodo[1],$valtodo[2]);
        // throw new \Exception('Ya existe un almacen con este código interno. Por favor ingrese otro código.');
        //     DB::commit();
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
      public function delete_movimiento($id, Orden_servicioInterface $repo, Request $request)
    {   try {
            $valtodo=explode("_", $id);
            $val=$repo->destroy_orden_mantenimiento($valtodo[0],$valtodo[1],$valtodo[2]);
        // throw new \Exception('Ya existe un almacen con este código interno. Por favor ingrese otro código.');
        //     DB::commit();
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

    // // public function getAll(BrandInterface $repo)
    // // {
    // //     return parseSelect($repo->all(), 'id', 'description');
    // // }

    public function excel(Orden_servicioInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE ORDENES DE SERVICIOS', 'Ordenes');
    }
    public function find($id, Orden_servicioInterface $repo)
    {
        try {
            $valtodo=explode("_", $id);
            $data = $repo->find_orden($valtodo[0],$valtodo[1]);
            $data_matenimiento = $repo->find_orden_mantenimiento($valtodo[0],$valtodo[1]);
            $data['dFecEntrega2']=date("Y-m-d", strtotime($data[0]->dFecEntrega));
            $data['dFecRec2']=date("Y-m-d", strtotime($data[0]->dFecRec));
            $data_cliente=$repo->find_orden_cliente($data[0]->idCliente);
            $data_detalle=$repo->find_orden_detalle($valtodo[0],$valtodo[1]);
            // $users = [];
            // foreach ($data->warehouseUser as $bp) {
            //     $users[] = [
            //         'id' => $bp->user->id,
            //         'username' => $bp->user->username,
            //         'name' => $bp->user->name,
            //     ];
            // }
            // $data['users'] = $users;
            // $info=$repo->getlocalizacione($id);
            // $Localizacion = [];
            // foreach ($info as $bp) {
            //         $Localizacion[] = [
            //         'idLocalizacion' => $bp->idLocalizacion,
            //         'codigo' => $bp->codigo,
            //         'descripcion' => $bp->descripcion,
            //         'estado' => $bp->estado,
            //     ];
            // }
            // $data['localizacion'] = $Localizacion;
            // $data['idTienda'] = $data->Shop_u->idTienda;
            // $data['Tienda'] = $data->Shop_u->descripcion;
            return response()->json([
                'status' => true,
                'data' => $data,
                'data_cliente'=>$data_cliente,
                'data_matenimiento'=>$data_matenimiento,
                'data_detalle'=>$data_detalle,
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
}
