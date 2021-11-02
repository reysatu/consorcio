<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Customer\CustomerTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\Customer\CustomerInterface;
use App\Http\Requests\CustomerRequest;
class CustomerController extends Controller
{
     use CustomerTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, CustomerInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['id', 'tipodoc','documento','razonsocial_cliente','contacto','direccion','correo_electronico','celular'];
        return parseList($repo->search($s), $request, 'id', $params);
    }

    public function create(CustomerInterface $repo, Request $request)
    {
        $data = $request->all();
        $table="ERP_Clientes";
        $id='id';
        $data['id'] = $repo->get_consecutivo($table,$id);
        $data['tipodoc'] = strtoupper($data['tipodoc']);
        $data['documento'] = strtoupper($data['documento']);
        $data['razonsocial_cliente'] = strtoupper($data['razonsocial_cliente']);
        $data['contacto'] = strtoupper($data['contacto']);
        $data['direccion'] = strtoupper($data['direccion']);
        $data['correo_electronico'] = strtoupper($data['correo_electronico']);
        $data['celular'] = strtoupper($data['celular']);
        $repo->create($data);
        return response()->json([
            'Result' => 'OK',
            'Record' => []
        ]);
    }

    public function update(CustomerInterface $repo, Request $request)
    {
        $data = $request->all();
        $id = $data['id'];
        $data['tipodoc'] = strtoupper($data['tipodoc']);
        $data['documento'] = strtoupper($data['documento']);
        $data['razonsocial_cliente'] = strtoupper($data['razonsocial_cliente']);
        $data['contacto'] = strtoupper($data['contacto']);
        $data['direccion'] = strtoupper($data['direccion']);
        $data['correo_electronico'] = strtoupper($data['correo_electronico']);
        $data['celular'] = strtoupper($data['celular']);
        $repo->update($id, $data);

        return response()->json(['Result' => 'OK']);
    }

    public function destroy(CustomerInterface $repo, Request $request)
    {
        $id = $request->input('id');
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    }

    // // public function getAll(BrandInterface $repo)
    // // {
    // //     return parseSelect($repo->all(), 'id', 'description');
    // // }

    public function excel(CustomerInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE CLIENTES', 'Clientes');
    }
}
