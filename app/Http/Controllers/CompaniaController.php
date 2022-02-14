<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Compania\CompaniaTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\Compania\CompaniaInterface;
use App\Http\Requests\CompaniaRequest;
use DB;
class CompaniaController extends Controller
{
     use CompaniaTrait;

    public function __construct()
    {
//        $this->middleware('json'); 
    }

    public function all(Request $request, CompaniaInterface $repo)
    {

        $s = $request->input('search', '');
        $params = ['IdCompania', 'RutaData','RutaLog','FechaUltBackup','Estado','Base','Correo','Contacto','Telefono4','Telefono3','Telefono2','RazonSocial','NombreComercial','Direccion','Ruc','Telefono1'];
        return parseList($repo->search($s), $request, 'IdCompania', $params);
    }
    public function createUpdate($id, CompaniaInterface $repo, Request $request)
    {
        DB::beginTransaction();
        try {
            $data = $request->all();
            $nombre = $data["RazonSocial"];
            $nombre = str_replace(" ", "_",  $nombre);
            $nombre = str_replace(".", "_",  $nombre);

            $response = $this->SubirArchivo($data["file"],  base_path("public/logos/"), $nombre);

            $table="ERP_Compania";
            $idt='IdCompania';
            $data['Ruc'] = $data['Ruc'];
            $data['NombreComercial'] = $data['NombreComercial'];
            $data['Direccion'] = $data['Direccion'];
            $data['Telefono1'] = $data['Telefono1'];
            $data['Telefono2'] = $data['Telefono2'];
            $data['Telefono3'] = $data['Telefono3'];
            $data['Telefono4'] = $data['Telefono4'];
            $data['Estado'] =$data['Estado'];
            $data['Contacto'] =$data['Contacto'];
            $data['Correo'] = $data['Correo'];
            $w = $repo->findByCode($data['Ruc']);
            if ($id !== '0') { 
                if ($w && $w->IdCompania != $id) {
                    throw new \Exception('Ya existe un documento con este Ruc. Por favor ingrese otro documento.');
                }
                $repo->update($id, $data); 
            } else {

                if ($w) {
                    throw new \Exception('Ya existe un documento con este Ruc. Por favor ingrese otro documento.');
                }
                $data['IdCompania'] = $repo->get_consecutivo($table,$idt);
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

    public function create(CompaniaInterface $repo, Request $request)
    {
        $data = $request->all();
        $table="ERP_Compania";
        $id='IdCompania';
        $data['IdCompania'] = $repo->get_consecutivo($table,$id);
        $data['RazonSocial'] = strtoupper($data['RazonSocial']);
        $data['NombreComercial'] = strtoupper($data['NombreComercial']);
        $data['Direccion'] = strtoupper($data['Direccion']);
       if(isset($data['FechaUltBackup'])){
                $fecha = strval($data["FechaUltBackup"]);
                $valores = explode("/", $fecha);
                $fecha=$valores[2].'-'.$valores[1].'-'.$valores[0];
                $data['FechaUltBackup'] =$fecha;
        }
        $estado='1';
        if(!isset($data['Estado'])){
            $estado='0';
        };
        $data['Estado'] =  $estado;
        $repo->create($data);

        return response()->json([
            'Result' => 'OK',
            'Record' => []
        ]);
    }
     public function find($id, CompaniaInterface $repo)
    {
        try {
            $data = $repo->find($id);
            // $data['dFechacaducidad2']='';
          
            // if($data[0]->dFechacaducidad!=null){
            //     $data['dFechacaducidad2']=date("Y-m-d", strtotime($data[0]->dFechacaducidad));
            // }
           
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

    public function update(CompaniaInterface $repo, Request $request)
    {
        $data = $request->all();
        $id = $data['IdCompania'];
        $data['RazonSocial'] = strtoupper($data['RazonSocial']);
        $data['NombreComercial'] = strtoupper($data['NombreComercial']);
        $data['Direccion'] = strtoupper($data['Direccion']);
        if(isset($data['FechaUltBackup'])){
                $fecha = strval($data["FechaUltBackup"]);
                $valores = explode("/", $fecha);
                $fecha=$valores[2].'-'.$valores[1].'-'.$valores[0];
                $data['FechaUltBackup'] =$fecha;
        }
      
        $estado='1';
        if(!isset($data['Estado'])){
            $estado='0';
        };
        $data['Estado'] =  $estado;

        $repo->update($id, $data);
        return response()->json(['Result' => 'OK']);
    }

    public function destroy(CompaniaInterface $repo, Request $request)
    {
        $id = $request->input('IdCompania');
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    }

    // // public function getAll(BrandInterface $repo)
    // // {
    // //     return parseSelect($repo->all(), 'id', 'description');
    // // }

    public function excel(CompaniaInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE COMPANIAS', 'COMPANIAS');
    }
}
