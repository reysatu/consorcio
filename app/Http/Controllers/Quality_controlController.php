<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Quality_control\Quality_controlTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\Quality_control\Quality_controlInterface;
use App\Http\Recopro\QualitycontrolRevision\QualitycontrolRevisionInterface;
use App\Http\Requests\Quality_controlRequest;
use DB;
class Quality_controlController extends Controller
{
     use Quality_controlTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function createUpdate($id, Quality_controlInterface $repo,QualitycontrolRevisionInterface $repoDet, Request $request)
    {
        DB::beginTransaction();
        try {
             $data = $request->all();
            
            $data['cCodConsecutivoOS']=strtoupper($data['cCodConsecutivoOS']);
            $data['nConsecutivoOS']=strtoupper($data['nConsecutivoOS']);
            $data['dFechaRegistro']=$data['dFechaRegistro'];
            $data['cOtros']=strtoupper($data['cOtros']);
            $data['iEstado']=0;

            $id_Revision=$data['id_Revision'];
            $id_Revision=explode(',', $id_Revision);

            $id_RevisionDet=$data['id_RevisionDet'];
            $id_RevisionDet=explode(',', $id_RevisionDet);
            
            $valcheck=$data['valcheck'];
            $valcheck=explode(',', $valcheck);
             if ($id != 0) {
                $res=$repo->update($id,$data);
            } else {
                $table="ERP_ControlCalidad";
                $idta='id';
                      
                $data['id']=$repo->get_consecutivo($table,$idta);
               $res=$repo->create($data);
               $id=$res->id;
            }
            for ($i=0; $i < count($id_Revision) ; $i++) {
              
                $data['idControlCalidad']=$id;
                $data['idrevision']=$id_Revision[$i];
                $data['iRevisado']=$valcheck[$i];
                if ($id_RevisionDet[$i] != 0) {
                    $repoDet->update($id_RevisionDet[$i],$data);
                } else {
                      $table="ERP_ControlCalidadRevision";
                        $idta='id';
                        $data['id']=$repoDet->get_consecutivo($table,$idta);
                    $repoDet->create($data);
                }
            }
            DB::commit();
            return response()->json([
                'status' => true,
               
              
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage(),
            ]);
        }
    }
    public function all(Request $request, Quality_controlInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['id', 'cCodConsecutivoOS','nConsecutivoOS','dFechaRegistro','iEstado','cOtros'];
        return parseList($repo->search($s), $request, 'id', $params);
    }
    public function data_form (Quality_controlInterface $Repo)
    {
        $data_grupos = $Repo->getGrupos();
        return response()->json([
            'status' => true,
            'data_grupos'=>$data_grupos,
        ]);
    }
   

    public function destroy(Quality_controlInterface $repo, Request $request)
    {
        $id = $request->input('id');
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    }

    // // public function getAll(BrandInterface $repo)
    // // {
    // //     return parseSelect($repo->all(), 'id', 'description');
    // // } 

    public function excel(Quality_controlInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE CONTROL DE CALIDAD', 'Calidad');
    }
     public function find($id, Quality_controlInterface $repo)
    {
        try {

            $data = $repo->find($id);
            $detalle= $repo->find_Detalle($id);
            $data['dFechaRegistro2']=date("Y-m-d", strtotime($data[0]->dFechaRegistro));
            return response()->json([
                'status' => true,
                'data' => $data,
                 'detalle' => $detalle,
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
}
