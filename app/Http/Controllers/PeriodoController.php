<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Periodo\PeriodoTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\Periodo\PeriodoInterface;
use App\Http\Requests\PeriodoRequest;
class PeriodoController extends Controller
{
     use PeriodoTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, PeriodoInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['periodo', 'estado'];
        return parseList($repo->search($s), $request, 'periodo', $params);
    }

    public function create(PeriodoInterface $repo, Request $request)
    {
        $data = $request->all();
        $table="ERP_Periodo";
        $data['periodo'] = strtoupper($data['periodo']);
        $estado='A';
        if(!isset($data['estado'])){
            $estado='I';
        };
        $data['estado'] =  $estado;
        $b = $repo->findByCode($data['periodo']);
        $data_ide='A';
        if ($b) {
             $data_ide='B';
        };
        if($data_ide=='A'){
            $repo->create($data);
        }
        return response()->json([
            'Result' => 'OK',
            'Record' => [],
            'data_ide'=>$data_ide,

        ]);
    }

    public function update(PeriodoInterface $repo, Request $request)
    {
        $data = $request->all();
        $id = $data['periodo'];
        $estado='A';
        if(!isset($data['estado'])){
            $estado='I';
        };
        $data['estado'] =  $estado;

        $b = $repo->findByCode($data['periodo']);
        $data_ide='A';
        if ($b && $b->periodo != $id) {
             $data_ide='B';
        };
        if($data_ide=='A'){
         $repo->update($id, $data);
        }
        

        return response()->json(['Result' => 'OK','data_ide'=>$data_ide]);
    }

    public function destroy(PeriodoInterface $repo, Request $request)
    {
        $id = $request->input('periodo');
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    }

    // // public function getAll(BrandInterface $repo)
    // // {
    // //     return parseSelect($repo->all(), 'id', 'description');
    // // }

    public function excel(PeriodoInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE PERIODOS', 'Peridos');
    }
}
