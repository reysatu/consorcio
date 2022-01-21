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
