<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\AprobacionSolicitud\AprobacionSolicitudTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\AprobacionSolicitud\AprobacionSolicitudInterface;
use App\Http\Requests\AprobacionSolicitudRequest;
use DB;
class AprobacionSolicitudController extends Controller
{
     use AprobacionSolicitudTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function AprobarRechazarSolicitud($id, AprobacionSolicitudInterface $repo,Request $request)
    {
       
        try {
            $data = $request->all();
            $res = array("status" => "i");
            $data_update = array();
            $data_update["nCodConformidad"] = $data["nCodConformidad"];
            $data_update['aprobaComentario'] =$data['aprobaComentario'];
            if(empty($data['aprobaComentario'])){
                $data_update['aprobaComentario']=null;
            }
            $data_update['iEstado'] = $data['iEstado'];
            $res = $repo->aprobarRechazar($data_update);
            $val=$res[0]->msg;
            DB::commit();
            return response()->json([
                'status' => true,
                'msg'=>$val,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    } 
         public function getVentas($id, AprobacionSolicitudInterface $repo)
    {
        try {
            $todo=explode("*", $id);
            $data = $repo->getVentasAproba($todo[0],$todo[1]);
            return response()->json([
                'status' => true,
                'data' => $data
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
          public function getAprobadores($id, AprobacionSolicitudInterface $repo)
    {
        try {
            $todo=explode("*", $id);
            $data = $repo->getAprobadores($todo[0],$todo[1]);
            return response()->json([
                'status' => true,
                'data' => $data
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }  

    public function all(Request $request, AprobacionSolicitudInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['Conformidad','Codigo','Consecutivo','IdUsuario','Usuario','EstadoAprob','Fecha','FechaVenc','EstadoSol','Saldo','Total','Moneda','Cliente','NumeroDoc','TipoDoc','TipoSolicitud'];
        return parseList($repo->search($s), $request, 'Conformidad', $params);
    }

    public function create(AprobacionSolicitudInterface $repo, AprobacionSolicitudRequest $request)
    {
        $data = $request->all();
        $table="ERP_Categoria";
        $id='idCategoria';
        $data['idCategoria'] = $repo->get_consecutivo($table,$id);
        $data['descripcion'] = strtoupper($data['Categoria']);
        $estado='A';
        if(!isset($data['estado'])){
            $estado='I';
        };
        $data['estado'] =  $estado;
        $repo->create($data);

        return response()->json([
            'Result' => 'OK',
            'Record' => []
        ]);
    }

    public function update(AprobacionSolicitudInterface $repo, AprobacionSolicitudRequest $request)
    {
        $data = $request->all();
        $id = $data['idCategoria'];
        $data['descripcion'] = strtoupper($data['Categoria']);
        $estado='A';
        if(!isset($data['estado'])){
            $estado='I';
        };
        $data['estado'] =  $estado;
        $repo->update($id, $data);

        return response()->json(['Result' => 'OK']);
    }

    public function destroy(AprobacionSolicitudInterface $repo, Request $request)
    {
        $id = $request->input('idCategoria');
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    }

    // // public function getAll(BrandInterface $repo)
    // // {
    // //     return parseSelect($repo->all(), 'id', 'description');
    // // }

    public function excel(AprobacionSolicitudInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE CATEGORÍAS', 'Categoría');
    }
}
