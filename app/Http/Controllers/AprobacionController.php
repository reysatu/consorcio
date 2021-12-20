<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Aprobacion\AprobacionInterface;
use App\Http\Recopro\Aprobacion\AprobacionTrait;
use App\Http\Requests\AprobacionRequest;
use Illuminate\Http\Request;

class AprobacionController extends Controller
{
    use AprobacionTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, AprobacionInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['idaprobacion', 'nombre_aprobacion', 'idtienda'];
        // print_r($repo->search($s)); exit;
        return parseList($repo->search($s), $request, 'idaprobacion', $params);
    }

    public function create(AprobacionInterface $repo, AprobacionRequest $request)
    {
        $data = $request->all();
        // $data['idaprobacion'] = $data['idaprobacion'];
        // $data['nombre_aprobacion'] = $data['convenio'];
        // print_r($data);
        $table="ERP_Aprobacion";
        $id='idaprobacion';
        $data['idaprobacion'] = $repo->get_consecutivo($table,$id);
        $repo->create($data);

        return response()->json([
            'Result' => 'OK',
            'Record' => []
        ]);
    }

    public function update(AprobacionInterface $repo, AprobacionRequest $request)
    {
        $data = $request->all();
        // print_r($data);
        $idaprobacion = $data['idaprobacion'];
        // $data['nombre_aprobacion'] = $data['convenio'];
        $repo->update($idaprobacion, $data);

        return response()->json(['Result' => 'OK']);
    }

    public function destroy(AprobacionInterface $repo, Request $request)
    {
        $idaprobacion = $request->input('idaprobacion');
        $repo->destroy($idaprobacion);
        return response()->json(['Result' => 'OK']);
    }

    public function getAll(AprobacionInterface $repo)
    {
        return parseSelect($repo->all(), 'idaprobacion', 'nombre_aprobacion');
    }

    public function excel(AprobacionInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE APROBACION', 'Aprobacion');
    }
}
