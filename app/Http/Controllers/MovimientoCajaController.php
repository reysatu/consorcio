<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\CajaDiariaDetalle\CajaDiariaDetalleTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\CajaDiariaDetalle\CajaDiariaDetalleInterface;
use App\Http\Recopro\CajaDiaria\CajaDiariaInterface;
use App\Http\Requests\MovimientoCajaRequest;
use DateTime;
use DateTimeZone;
class MovimientoCajaController extends Controller
{
     use CajaDiariaDetalleTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }
    public function pdf(Request $request, CajaDiariaDetalleInterface $repo,CajaDiariaInterface $recaj)
    {          
           
            $usuario=auth()->id();
            date_default_timezone_set('UTC');
            $fechacA= date("Y-m-d");
            $dataCaDet = $recaj->getCajaDetalle($fechacA,$usuario);
            return response()->json([
                'status' => true,
                'dataCaDet'=>$dataCaDet,
            ]);
    }
 
    public function all(Request $request, CajaDiariaDetalleInterface $repo)
    {
        $s = $request->input('search', '');
        $filtro_tipoMovi = $request->input('filtro_tipoMovi');
        $filtro_monedaMovi = $request->input('filtro_monedaMovi');
        $params = ['consecutivo', 'descripcion','codigoTipo','codigoFormaPago','idMoneda','created_at','nroOperacion','monto'];
        return parseList($repo->search_movimiento_diario($s,$filtro_tipoMovi,$filtro_monedaMovi), $request, 'consecutivo', $params);
    }

    public function create(CajaDiariaDetalleInterface $repo, CajaDiariaDetalleRequest $request)
    {
        $data = $request->all();
        $table="ERP_Categoria";
        $id='idCategoria';
        $data['idCategoria'] = $repo->get_consecutivo($table,$id);
        $data['descripcion'] = strtoupper($data['Categoria']);
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
     public function data_form ($id,CajaDiariaDetalleInterface $repo,CajaDiariaInterface $recaj)
    {   
        $date=$id;
        $usuario=auth()->id();
        date_default_timezone_set('UTC');
        $dataMc = $recaj->get_cajaActual($date,$usuario);
        $dataCA = $recaj->getCajaAbierta($date,$usuario);
        $dataCaDet = $recaj->getCajaDetalle($date,$usuario);
        $data_tipo=$recaj->getDataTipo();
        $data_moneda=$recaj->getDataMoneda();
        $fechacA= date("Y-m-d H:i:s");

        return response()->json([
            'status' => true,
            'data' => $id,
            'dataMc'=>$dataMc,
            'dataCA'=>$dataCA,
            'dataCaDet'=>$dataCaDet,
            'fechacA'=>$fechacA,
            'data_tipo'=>$data_tipo,
            'data_moneda'=>$data_moneda
        ]);
    }

    public function update(CajaDiariaDetalleInterface $repo, CajaDiariaDetalleRequest $request)
    {
        $data = $request->all();
        $id = $data['idCategoria'];
        $data['descripcion'] = strtoupper($data['Categoria']);
        $estado='A';
        if(!isset($data['estado'])){
            $estado='I';
        };
        $data['estado'] =  $estado;
        $repo->update($id, $data); 

        return response()->json(['Result' => 'OK']);
    }

    public function destroy(CajaDiariaDetalleInterface $repo, Request $request)
    {
        $id = $request->input('idCategoria');
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    }

    // // public function getAll(BrandInterface $repo)
    // // {
    // //     return parseSelect($repo->all(), 'id', 'description');
    // // }

    public function excel(CajaDiariaDetalleInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->allExcel()), 'LISTA DE MOVIMIENTOS DE CAJA', 'Movimientos de caja');
    }
}
