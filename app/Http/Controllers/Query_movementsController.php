<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Query_movements\Query_movementsTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\Query_movements\Query_movementsInterface;
use App\Http\Requests\Query_movementsRequest;
class Query_movementsController extends Controller
{
     use Query_movementsTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, Query_movementsInterface $repo)
    {
        $s = $request->input('search', '');
        $filtro_art = $request->input('filtro_art');
        $filtro_idAlm = $request->input('filtro_idAlm');
        $filtro_idLoc = $request->input('filtro_idLoc');
        $filtro_cate = $request->input('filtro_cate');
        $filtro_nat = $request->input('filtro_nat');
        $filtro_oper = $request->input('filtro_oper');
        $n_movimiento = $request->input('n_movimiento');
        $cod_lote = $request->input('cod_lote');
        $cod_serie = $request->input('cod_serie');
        $fecha_inicio = $request->input('fecha_inicio');
        $fecha_fin = $request->input('fecha_fin');

        $params = ['idTransaccion','id','fecha_registro','fecha_proceso_s','fecha_registro_s','idArticulo','Articulo','Unidad','Categoria','Tipo_Operacion','Naturaleza','Origen','idOrigen','Almacen','Localizacion','Cantidad','Costo_Unitario','Precio_Unitario','Costo_Total','Precio_Total','Lote','Serie'];
        return parseList($repo->search($s,$filtro_art,$filtro_idAlm,$filtro_idLoc,$filtro_cate,$filtro_nat,$filtro_oper,$n_movimiento,$cod_lote,$cod_serie,$fecha_inicio,$fecha_fin), $request, 'id', $params);
    }

    public function excel(Query_movementsInterface $repo,Request $request)
    {
        $s = $request->input('search', '');
        $filtro_art =  $request->input('filtro_art');
        $filtro_idAlm =  $request->input('filtro_idAlm');
        $filtro_idLoc =  $request->input('filtro_idLoc');
        $filtro_cate =  $request->input('filtro_cate');
        $filtro_nat= $request->input('filtro_nat');
        $filtro_oper= $request->input('filtro_oper');
        $n_movimiento=$request->input('n_movimiento');
        $cod_lote=$request->input('cod_lote');
        $cod_serie=$request->input('cod_serie');
        $fecha_inicio=$request->input('fecha_inicio');
        $fecha_fin=$request->input('fecha_fin');

        return generateExcel($this->generateDataExcel($repo->allFiltro($s,$filtro_art,$filtro_idAlm,$filtro_idLoc,$filtro_cate,$filtro_nat,$filtro_oper,$n_movimiento,$cod_lote,$cod_serie,$fecha_inicio,$fecha_fin)), 'LISTA DE MOVIMIENTOS POR ARTICULOS', 'Articulo');
    }
     public function getDataFiltro(Query_movementsInterface $repo)
    {
        try {
            $data_almacen=$repo->get_almacen();
            $data_localizacion=$repo->get_localizacion();
            $data_categoria=$repo->get_categoria();
            $data_articulo=$repo->get_articulo();
            // $data_complete=$repo->get_data_complete();
            $data_tipoOperacion=$repo->get_tipoOperacion();
            $data_naturaleza=$repo->get_naturaleza();
            return response()->json([
                'status' => true,
                'd_Almacen' => $data_almacen,
                'd_localizacion'=>$data_localizacion,
                'd_categoria'=>$data_categoria,
                'd_articulo'=>$data_articulo,
                'd_tipoOperacion'=>$data_tipoOperacion,
                'd_naturaleza'=>$data_naturaleza,
                // 'data_complete'=>$data_complete,
            ]);
        } catch (\Exception $e) {
//            throw new \Exception($e);
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
}
