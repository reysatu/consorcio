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
        $params = ['idTransaccion','id','fecha_registro','fecha_proceso_s','fecha_registro_s','idArticulo','Articulo','Unidad','Categoria','Tipo_Operacion','Naturaleza','Origen','idOrigen','Almacen','Localizacion','Cantidad','Costo_Unitario','Precio_Unitario','Costo_Total','Precio_Total','Lote','Serie'];
        return parseList($repo->search($s), $request, 'id', $params);
    }

    public function excel(Query_movementsInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE MOVIMIENTOS POR ARTICULOS', 'Articulo');
    }
}
