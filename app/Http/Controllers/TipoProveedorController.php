<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\TipoProveedor\TipoProveedorTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\TipoProveedor\TipoProveedorInterface;
use App\Http\Requests\TipoProveedorRequest;
class TipoProveedorController extends Controller
{
     use TipoProveedorTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, TipoProveedorInterface $repo)
    {
        $s = $request->input('search', '');
        $params =['id', 'descripcion','cuentaPagar','cuentaCierreDevito','cuentaCierreCredito','estado','cIdUsuCre','cIdUsuMod'];
        return parseList($repo->search($s), $request, 'id', $params);
    }

    public function create(TipoProveedorInterface $repo, Request $request)
    {
        $data = $request->all();
        $table="ERP_TipoProveedor";
        $id='id';
        $data['id'] = $repo->get_consecutivo($table,$id);
        $data['descripcion'] = strtoupper($data['descripcion']);
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

    public function update(TipoProveedorInterface $repo, Request $request)
    {
        $data = $request->all();
        $id = $data['id'];
        $data['descripcion'] = strtoupper($data['descripcion']);
        $estado='A';
        if(!isset($data['estado'])){
            $estado='I';
        };
        $data['estado'] =  $estado;
        $repo->update($id, $data);

        return response()->json(['Result' => 'OK']);
    }

    public function destroy(TipoProveedorInterface $repo, Request $request)
    {
        $id = $request->input('id');
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    }

    // // public function getAll(BrandInterface $repo)
    // // {
    // //     return parseSelect($repo->all(), 'id', 'description');
    // // }

    public function excel(TipoProveedorInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE TIPOS DE PROVEEDORES', 'Tipo proveedores');
    }
}
