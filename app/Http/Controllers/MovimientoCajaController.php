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
use DB;
class MovimientoCajaController extends Controller
{
     use CajaDiariaDetalleTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }
    public function createUpdate($id, CajaDiariaDetalleInterface $repo,request $request ,CajaDiariaInterface $recaj)
    {
        DB::beginTransaction();
        try {
            $data = $request->all();
            $dataCaja = $recaj->find($id);
            $datoDet = [];
            $total=0;
            $totalEgre=0;
            $totalOtrosI=0;
            $dataCajadia=[];
            if($data['idMonedaAdd']=='1'){
                if($data['tipoMovimientoAdd']=='ING'){
                    $total=floatval($dataCaja->totalEfectivo)+floatval($data['montoAdd']);
                    $totalEgre=floatval($dataCaja->totalEgresos);
                    $totalOtrosI=floatval($dataCaja->totalOtrosIngresos)+floatval($data['montoAdd']);
                }else{
                    $total=floatval($dataCaja->totalEfectivo)-floatval($data['montoAdd']);
                    $totalEgre=floatval($dataCaja->totalEgresos)+floatval($data['montoAdd']);
                    $totalOtrosI=floatval($dataCaja->totalOtrosIngresos);

                }
                $dataCajadia['totalOtrosIngresos'] =  $totalOtrosI;
                $dataCajadia['totalEfectivo'] =  $total;
                $dataCajadia['totalEgresos'] =  $totalEgre;
            }else{
                 if($data['tipoMovimientoAdd']=='ING'){
                    $total=floatval($dataCaja->totalEfectivoDol)+floatval($data['montoAdd']);
                    $totalEgre=floatval($dataCaja->totalEgresosDol);
                    $totalOtrosI=floatval($dataCaja->totalOtrosIngresosDol)+floatval($data['montoAdd']);
                }else{
                    $total=floatval($dataCaja->totalEfectivoDol)-floatval($data['montoAdd']);
                    $totalEgre=floatval($dataCaja->totalEgresosDol)+floatval($data['montoAdd']);
                    $totalOtrosI=floatval($dataCaja->totalOtrosIngresosDol);
                }
                $dataCajadia['totalOtrosIngresosDol'] =  $totalOtrosI;
                $dataCajadia['totalEfectivoDol'] =  $total;
                $dataCajadia['totalEgresosDol'] =  $totalEgre;
            }
            

            
            $recaj->update($id, $dataCajadia); 

            $iddet = 'consecutivo';
            $tabledet = "ERP_CajaDiariaDetalle";
            $datoDet['codigoTipo'] =strtoupper($data['tipoMovimientoAdd']);
            $datoDet['codigoFormaPago'] =strtoupper($data['formaPagoAdd']);
            $datoDet['idMoneda'] =strtoupper($data['idMonedaAdd']);
            $datoDet['monto'] =strtoupper($data['montoAdd']);
            $datoDet['descripcion'] =strtoupper($data['conceptoAdd']);
            $datoDet['idCajaDiaria'] =$id;
            
            $datoDet['consecutivo'] = $repo->get_consecutivo($tabledet, $iddet);
            $repo->create($datoDet);

            DB::commit();
            return response()->json([
                'status' => true,
            ]);



        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage(),
            ]);
        }
    }
    public function pdf(Request $request, CajaDiariaDetalleInterface $repo,CajaDiariaInterface $recaj)
    {          
           
            $usuario=auth()->id();
            date_default_timezone_set('UTC');
            $fechacA= date("Y-m-d");
            $fechacAc= date("d/m/Y H:i:s");
            $dataMc = $recaj->get_cajaActual($fechacA,$usuario);
            $dataCaDet = $recaj->getCajaDetalle($fechacA,$usuario);
            $dataCajaDetForSol = $recaj->getCajaDetForSol($fechacA,$usuario);
            $dataCajaDetEfeSol = $recaj->getCajaDetEfeSol($fechacA,$usuario);
            $dataCajaDetForDol = $recaj->getCajaDetForDol($fechacA,$usuario);
            $dataCajaDetEfeDol = $recaj->getCajaDetEfeDol($fechacA,$usuario);
            $dataCajaDetEfeSolAper = $recaj->getCajaDetEfeSolAper($fechacA,$usuario);
            $dataCajaDetEfeDolAper = $recaj->getCajaDetEfeDolAper($fechacA,$usuario);

            $feca=date("d/m/Y", strtotime($dataCaDet[0]->fechaCaja));
            return response()->json([
                'status' => true,
                'dataCaDet'=>$dataCaDet,
                'feca'=> $feca,
                'fechacA'=>$fechacAc,
                'dataCajaDetForSol'=>$dataCajaDetForSol,
                'dataCajaDetEfeSol'=>$dataCajaDetEfeSol,
                'dataCajaDetForDol'=>$dataCajaDetForDol,
                'dataCajaDetEfeDol'=>$dataCajaDetEfeDol,
                 'dataCajaDetEfeSolAper'=>$dataCajaDetEfeSolAper,
                'dataCajaDetEfeDolAper'=>$dataCajaDetEfeDolAper,
                 'dataMc'=>$dataMc,
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
        $dataCajaDetForSol = $recaj->getCajaDetForSol($date,$usuario);
        $dataCajaDetEfeSol = $recaj->getCajaDetEfeSol($date,$usuario);
        $dataCajaDetEfeSolAper = $recaj->getCajaDetEfeSolAper($date,$usuario);
            $dataCajaDetForDol = $recaj->getCajaDetForDol($date,$usuario);
            $dataCajaDetEfeDol = $recaj->getCajaDetEfeDol($date,$usuario);
        $dataCajaDetEfeDolAper = $recaj->getCajaDetEfeDolAper($date,$usuario);

        $fechacA= date("Y-m-d H:i:s");

        return response()->json([
            'status' => true,
            'data' => $id,
            'dataMc'=>$dataMc,
            'dataCA'=>$dataCA,
            'dataCaDet'=>$dataCaDet,
            'fechacA'=>$fechacA,
            'data_tipo'=>$data_tipo,
            'data_moneda'=>$data_moneda,
             'dataCajaDetForSol'=>$dataCajaDetForSol,
                'dataCajaDetEfeSol'=>$dataCajaDetEfeSol,
                'dataCajaDetForDol'=>$dataCajaDetForDol,
                'dataCajaDetEfeDol'=>$dataCajaDetEfeDol,
                'dataCajaDetEfeSolAper'=>$dataCajaDetEfeSolAper,
                'dataCajaDetEfeDolAper'=>$dataCajaDetEfeDolAper,
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
