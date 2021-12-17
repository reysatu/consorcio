<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\ConsecutivosComprobantes\ConsecutivosComprobantesInterface;
use App\Http\Recopro\ConsecutivosComprobantes\ConsecutivosComprobantesTrait;
use App\Http\Requests\ConsecutivosComprobantesRequest;
use Illuminate\Http\Request;

class ConsecutivosComprobantesController extends Controller
{
    use ConsecutivosComprobantesTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, ConsecutivosComprobantesInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['id_consecutivo', 'numero', 'serie', 'actual', 'ultimo', 'longitud', 'idtienda'];
        // print_r($repo->search($s)); exit;
        return parseList($repo->search($s), $request, 'id_consecutivo', $params);
    }

    public function create(ConsecutivosComprobantesInterface $repo, ConsecutivosComprobantesRequest $request)
    {
        $data = $request->all();

        $table="ERP_ConsecutivosComprobantes";
        $id='id_consecutivo';
        $data['id_consecutivo'] = $repo->get_consecutivo($table,$id);
        // $data['id_consecutivo'] = $data['id_consecutivo'];
        // $data['nombre_caja'] = $data['convenio'];
        // print_r($data);
        $repo->create($data);

        return response()->json([
            'Result' => 'OK',
            'Record' => []
        ]);
    }

    public function update(ConsecutivosComprobantesInterface $repo, ConsecutivosComprobantesRequest $request)
    {
        $data = $request->all();
        // print_r($data);
        $id_consecutivo = $data['id_consecutivo'];
        // $data['nombre_caja'] = $data['convenio'];
        $repo->update($id_consecutivo, $data);

        return response()->json(['Result' => 'OK']);
    }

    public function destroy(ConsecutivosComprobantesInterface $repo, Request $request)
    {
        $id_consecutivo = $request->input('id_consecutivo');
        $repo->destroy($id_consecutivo);
        return response()->json(['Result' => 'OK']);
    }

    public function getAll(ConsecutivosComprobantesInterface $repo)
    {
        return parseSelect($repo->all(), 'id_consecutivo', 'nombre_caja');
    }

    public function excel(ConsecutivosComprobantesInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE CONSECUTIVOS COMPROBANTES', 'ConsecutivosComprobantes');
    }
}
