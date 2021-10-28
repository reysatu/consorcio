<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Query_stock\Query_stockTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\Query_stock\Query_stockInterface;
use App\Http\Requests\Query_stockRequest;
class Query_stockController extends Controller
{
     use Query_stockTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, Query_stockInterface $repo)
    {
        $s = $request->input('search', '');
        $filtro_art = $request->input('filtro_art');
        $filtro_idAlm = $request->input('filtro_idAlm');
        $filtro_idLoc = $request->input('filtro_idLoc');
        $filtro_cate = $request->input('filtro_cate');
        $params = ['id','Articulo','Categoria','Unidad','Almacen','Localizacion','Lote','Serie','Disponible','Remitido','Total','Transito','Costo_Promedio_Unitario','Costo_Total'];
        return parseList($repo->search($s,$filtro_art,$filtro_idAlm,$filtro_idLoc,$filtro_cate), $request, 'id', $params);
    }
    //  public function all(Request $request, Query_stockInterface $repo)
    // {
    //     $s = $request->input('search', '');
    //     $params = ['id','Articulo','Categoria','Unidad','Almacen','Localizacion','Lote','Serie','Disponible','Remitido','Total','Transito','Costo_Promedio_Unitario','Costo_Total'];
    //     return parseList($repo->search($s), $request, 'id', $params);
    // }

    public function excel(Query_stockInterface $repo, Request $request)
    {   $s = $request->input('search', '');
        $filtro_art =  $request->input('filtro_art');
        $filtro_idAlm =  $request->input('filtro_idAlm');
        $filtro_idLoc =  $request->input('filtro_idLoc');
        $filtro_cate =  $request->input('filtro_cate');
        return generateExcel($this->generateDataExcel($repo->allFiltro($s,$filtro_art,$filtro_idAlm,$filtro_idLoc,$filtro_cate)), 'LISTA DE ARTICULOS CON STOCK', 'Articulo');
    }
     public function getDataFiltro(Query_stockInterface $repo)
    {
        try {
            $data_almacen=$repo->get_almacen();
            $data_localizacion=$repo->get_localizacion();
            $data_categoria=$repo->get_categoria();
            $data_articulo=$repo->get_articulo();
            // $data_complete=$repo->get_data_complete();
            return response()->json([
                'status' => true,
                'd_Almacen' => $data_almacen,
                'd_localizacion'=>$data_localizacion,
                'd_categoria'=>$data_categoria,
                'd_articulo'=>$data_articulo,
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
