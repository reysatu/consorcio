<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Movimiento_cierre\Movimiento_cierreTrait;
use App\Http\Recopro\View_movimiento_cierre\View_movimiento_cierreTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\Movimiento_cierre\Movimiento_cierreInterface;
use App\Http\Recopro\Register_movement\Register_movementInterface;
use App\Http\Recopro\View_movimiento_cierre\View_movimiento_cierreInterface;
use App\Http\Recopro\Movimiento_Articulo_cierre\Movimiento_Articulo_cierreInterface;
use App\Http\Recopro\Movimiento_Detalle_cierre\Movimiento_Detalle_cierreInterface;
use App\Http\Requests\Movimiento_cierreRequest;
use DB;
class Movimiento_cierreController extends Controller
{
     use View_movimiento_cierreTrait;

    public function __construct() 
    {
//        $this->middleware('json');
    }
    public function findMov($id, Movimiento_cierreInterface $repo)
    {
        try {
          
            $data = $repo->find_moviCierre($id);
            return response()->json([
                'status' => true,
                'data' => $data,
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
    public function list_movimientosCerrados(Request $request, Register_movementInterface $repo,Movimiento_cierreInterface $repoCi)
    {
        $s = $request->input('search', '');
        $perido_busquedad = $request->input('perido_busquedad');
        $estado_busquedad = $request->input('estado_busquedad');
        $idMovimientoBusquedad = $request->input('idMovimientoBusquedad');
        $params = ['idTipoOperacion','idUsuario','estado','idMovimiento','fecha_registro'];
        if($estado_busquedad==''){

            return parseList($repo->searchMovCierre($s,$perido_busquedad), $request, 'idMovimiento', $params);
        }else{
             return parseList($repoCi->search($s,$perido_busquedad), $request, 'idMovimiento', $params);
        }
       
    }
    public function all(Request $request, View_movimiento_cierreInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['idUsuario','estado','periodo'];
        return parseList($repo->search($s), $request, 'periodo', $params);
    }
    public function createUpdate($id, Movimiento_cierreInterface $repo, Request $request, View_movimiento_cierreInterface $repoView,Movimiento_Articulo_cierreInterface $repoArCie,Movimiento_Detalle_cierreInterface $repoArDetalle  )
    {
       
        try {
            $data = $request->all();
            $periodo = $data['periodo'];
            $estado = $data['estado'];
            if($estado==''){
                $movimiento=$repo->getMovimientosCierre($periodo);
                $w = $repoView->findByCode($periodo);
                if ($w) {
                    throw new \Exception('Ya existe un cierre en ese periodo. Por favor ingrese otro periodo.');
                }
                foreach($movimiento as $row){
                 $movimiento_articulo=$repo->getMovimientosCierreArticulo($row->idMovimiento);
                foreach($movimiento_articulo as $rowArt){
                     $datoAr=[];   
                     $datoAr['idMovimiento'] = $rowArt->idMovimiento;
                     $datoAr['idArticulo'] = $rowArt->idArticulo;
                     $datoAr['idAlmacen'] = $rowArt->idAlmacen;
                     $datoAr['idLocalizacion'] = $rowArt->idLocalizacion;
                     $datoAr['idLote'] = $rowArt->idLote;
                     $datoAr['cantidad'] = $rowArt->cantidad;
                     $datoAr['costo'] = $rowArt->costo;
                     $datoAr['costo_total'] = $rowArt->costo_total;
                     $datoAr['consecutivo'] = $rowArt->consecutivo;
                     $datoAr['precio'] = $rowArt->precio;
                     $datoAr['precio_total'] = $rowArt->precio_total;
                     $datoAr['periodo'] = $periodo;
                     $repoArCie->create($datoAr);
                 }
                $movimiento_articulo_detalle=$repo->getMovimientosCierreArticuloDetalle($row->idMovimiento);
                foreach($movimiento_articulo_detalle as $rowArtDet){
                     $datoArDet=[];   
                     $datoArDet['idMovimiento'] = $rowArtDet->idMovimiento;
                     $datoArDet['idArticulo'] = $rowArtDet->idArticulo;
                     $datoArDet['consecutivo'] = $rowArtDet->consecutivo;
                     $datoArDet['serie'] = $rowArtDet->serie;
                     $datoArDet['periodo'] = $periodo;
                     $repoArDetalle->create($datoArDet);
                 }      
                 $dato=[];   
                 $dato['idMovimiento'] = $row->idMovimiento;
                 $dato['idTipoOperacion'] = $row->idTipoOperacion;
                 $dato['fecha_registro'] = $row->fecha_registro;
                 $dato['fecha_proceso'] = $row->fecha_proceso;
                 $dato['idUsuario'] = $row->idUsuario;
                 $dato['naturaleza'] = $row->naturaleza;
                 $dato['observaciones'] = $row->observaciones;
                 $dato['idMoneda'] = $row->idMoneda;
                 $dato['cCodConsecutivo'] = $row->cCodConsecutivo;
                 $dato['nConsecutivo'] = $row->nConsecutivo;
                 $dato['periodo'] = $periodo;
                 $dato['estado'] = 'C';
                 $repo->create($dato);
                };
            }else if($estado=='P'){
                 $repo->update_mc($periodo);
            };
           
            DB::commit();
            return response()->json([
                'status' => true,
                // 'code' => $idMovimiento
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    } 
    public function reversarCierre($id, Movimiento_cierreInterface $repo, Request $request, View_movimiento_cierreInterface $repoView)
    {
       
        try {
            $data = $request->all();
            $reversar=$repo->reversarMovimientos($id);
            DB::commit();
            return response()->json([
                'status' => true,
                // 'code' => $idMovimiento
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    } 
     public function createUpdatePreCierre($id, Movimiento_cierreInterface $repo, Request $request,View_movimiento_cierreInterface $repoView,Movimiento_Articulo_cierreInterface $repoArCie,Movimiento_Detalle_cierreInterface $repoArDetalle)
    {
       
        try {
            $data = $request->all();
            $periodo = $data['periodo'];
            $estado = $data['estado'];
            if($estado==''){
                $movimiento=$repo->getMovimientosCierre($periodo);
                $w = $repoView->findByCode($periodo);
                if ($w) {
                    throw new \Exception('Ya existe un cierre en ese periodo. Por favor ingrese otro periodo.');
                }
                foreach($movimiento as $row){
                $movimiento_articulo=$repo->getMovimientosCierreArticulo($row->idMovimiento);
                foreach($movimiento_articulo as $rowArt){
                     $datoAr=[];   
                     $datoAr['idMovimiento'] = $rowArt->idMovimiento;
                     $datoAr['idArticulo'] = $rowArt->idArticulo;
                     $datoAr['idAlmacen'] = $rowArt->idAlmacen;
                     $datoAr['idLocalizacion'] = $rowArt->idLocalizacion;
                     $datoAr['idLote'] = $rowArt->idLote;
                     $datoAr['cantidad'] = $rowArt->cantidad;
                     $datoAr['costo'] = $rowArt->costo;
                     $datoAr['costo_total'] = $rowArt->costo_total;
                     $datoAr['consecutivo'] = $rowArt->consecutivo;
                     $datoAr['precio'] = $rowArt->precio;
                     $datoAr['precio_total'] = $rowArt->precio_total;
                     $datoAr['periodo'] = $periodo;
                     $repoArCie->create($datoAr);
                 }
                $movimiento_articulo_detalle=$repo->getMovimientosCierreArticuloDetalle($row->idMovimiento);
                foreach($movimiento_articulo_detalle as $rowArtDet){
                     $datoArDet=[];   
                     $datoArDet['idMovimiento'] = $rowArtDet->idMovimiento;
                     $datoArDet['idArticulo'] = $rowArtDet->idArticulo;
                     $datoArDet['consecutivo'] = $rowArtDet->consecutivo;
                     $datoArDet['serie'] = $rowArtDet->serie;
                     $datoArDet['periodo'] = $periodo;
                     $repoArDetalle->create($datoArDet);
                 }     
                 $dato=[];   
                 $dato['idMovimiento'] = $row->idMovimiento;
                 $dato['idTipoOperacion'] = $row->idTipoOperacion;
                 $dato['fecha_registro'] = $row->fecha_registro;
                 $dato['fecha_proceso'] = $row->fecha_proceso;
                 $dato['idUsuario'] = $row->idUsuario;
                 $dato['naturaleza'] = $row->naturaleza;
                 $dato['observaciones'] = $row->observaciones;
                 $dato['idMoneda'] = $row->idMoneda;
                 $dato['cCodConsecutivo'] = $row->cCodConsecutivo;
                 $dato['nConsecutivo'] = $row->nConsecutivo;
                 $dato['periodo'] = $periodo;
                 $dato['estado'] = 'P';
                 $repo->create($dato);
                };
            }
           
            DB::commit();
            return response()->json([
                'status' => true,
                // 'code' => $idMovimiento
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    } 
    public function data_form (Movimiento_cierreInterface $Repo)
    {
        
        $periodos = $Repo->getPeriodos();
       
        // print_r($dataredondeo); exit;
        return response()->json([
            'status' => true,
            'periodos' => $periodos,
        ]);
    }
    public function create(Movimiento_cierreInterface $repo, Request $request)
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
    public function getMovimientos($id, Movimiento_cierreInterface $repo)
    {
       try {
            $data = $repo->getMovimientosCierre($id);
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

    public function update(Movimiento_cierreInterface $repo, Request $request)
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

    public function destroy(Movimiento_cierreInterface $repo, Request $request)
    {
        $id = $request->input('idCategoria');
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    }

    // // public function getAll(BrandInterface $repo)
    // // {
    // //     return parseSelect($repo->all(), 'id', 'description');
    // // }

    public function excel(View_movimiento_cierreInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE CIERRE DE MOVIMIENTOS CERRADOS', 'Cierre');
    }
}
