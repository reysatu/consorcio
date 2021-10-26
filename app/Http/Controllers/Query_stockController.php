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
        $params = ['id','Articulo','Categoria','Unidad','Almacen','Localizacion','Lote','Serie','Disponible','Remitido','Total','Transito','Costo_Promedio_Unitario','Costo_Total'];
        return parseList($repo->search($s), $request, 'id', $params);
    }

    public function excel(Query_stockInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE ARTICULOS CON STOCK', 'Articulo');
    }
}
