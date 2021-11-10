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
use App\Http\Recopro\TablaSunat\TablaSunatInterface;
use App\Http\Recopro\TypeCostumer\TypeCostumerInterface;
use Carbon\Carbon;
use DB;
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
        $params = ['id', 'tipodoc','documento','razonsocial_cliente','contacto','direccion','correo_electronico','celular','ubigeo','id_tipocli'];
        return parseList($repo->search($s), $request, 'id', $params);
    }
    public function createUpdate($id, CustomerInterface $repo, Request $request)
    {
        DB::beginTransaction();
        try {
            $data = $request->all();
            $table="ERP_Clientes";
            $idt='id';
            $data['tipodoc'] = strtoupper($data['tipodoc']);
            $data['documento'] = strtoupper($data['documento']);
            $data['razonsocial_cliente'] = strtoupper($data['razonsocial_cliente']);
            $data['contacto'] = strtoupper($data['contacto']);
            $data['direccion'] = strtoupper($data['direccion']);
            $data['correo_electronico'] = strtoupper($data['correo_electronico']);
            $data['celular'] = strtoupper($data['celular']);
            $data['telefono'] = strtoupper($data['telefono']);
            $data['ubigeo'] = $data['distrito'];
            $w = $repo->findByCode($data['documento']);
            if ($id != 0) {
                if ($w && $w->id != $id) {
                    throw new \Exception('Ya existe un documento con este código. Por favor ingrese otro código.');
                }
                $repo->update($id, $data);
            } else {
                if ($w) {
                    throw new \Exception('Ya existe un documento con este código. Por favor ingrese otro código.');
                }
                $data['id'] = $repo->get_consecutivo($table,$idt);
                $repo->create($data);
            };
            DB::commit();
            return response()->json([
                'status' => true,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
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
    public function data_form (CustomerInterface $tipodoc)
    {
       
        $tipo_doc = $tipodoc->gte_tipo_doc();
        $tipo_clie = $tipodoc->tipo_clie();
        return response()->json([
            'status' => true,
            'tipoc_doc' => $tipo_doc,
            'tipo_clie' => $tipo_clie,
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
     public function getTipoDocumento(TablaSunatInterface $repo)
    {
        return parseSelect($repo->allTipoDocumento(), 'cCodigo', 'cDescripcion');
    }
     public function getTipoCliente(TypeCostumerInterface $repo)
    {
        return parseSelect($repo->allActive(), 'id', 'descripcion');
    }

    public function excel(CustomerInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE CLIENTES', 'Clientes');
    }
    public function find($id, CustomerInterface $repo)
    {
        try {
            $data = $repo->find($id);
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
    public function get_cliente_documento($id, CustomerInterface $repo)
    {
        try {
            $data = $repo->get_cliente_document($id);
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
}
