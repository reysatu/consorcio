<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Solicitud\SolicitudInterface;
use App\Http\Recopro\Solicitud\SolicitudTrait;
use App\Http\Requests\SolicitudRequest;
use Illuminate\Http\Request;

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
        $params = ['idcaja', 'nombre_caja', 'usuario', 'activo', 'idtienda'];
        // print_r($repo->search($s)); exit;
        return parseList($repo->search($s), $request, 'idcaja', $params);
    }

    public function create(SolicitudInterface $repo, SolicitudRequest $request)
    {
        $data = $request->all();
        // $data['idcaja'] = $data['idcaja'];
        // $data['nombre_caja'] = $data['convenio'];
        // print_r($data);
        
        $repo->create($data);

        return response()->json([
            'Result' => 'OK',
            'Record' => []
        ]);
    }

    public function update(SolicitudInterface $repo, SolicitudRequest $request)
    {
        $data = $request->all();
        // print_r($data);
        $idcaja = $data['idcaja'];
        // $data['nombre_caja'] = $data['convenio'];
        $repo->update($idcaja, $data);

        return response()->json(['Result' => 'OK']);
    }

    public function destroy(SolicitudInterface $repo, Request $request)
    {
        $idcaja = $request->input('idcaja');
        $repo->destroy($idcaja);
        return response()->json(['Result' => 'OK']);
    }

    public function getAll(SolicitudInterface $repo)
    {
        return parseSelect($repo->all(), 'idcaja', 'nombre_caja');
    }

    public function excel(SolicitudInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE Solicitud', 'Solicitud');
    }
}
