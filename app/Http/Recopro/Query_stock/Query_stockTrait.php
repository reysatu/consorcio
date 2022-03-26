<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/12/2017
 * Time: 11:36 AM
 */

namespace App\Http\Recopro\Query_stock;

use Carbon\Carbon;

trait Query_stockTrait
{
    public function generateDataExcel($info)
    {
        $columns[] = ['Cod. Artículo','Articulo','Categoria','Unidad','Almacen','Localizacion','Lote','Serie','Disponible','Remitido','Total','Transito','Costo_Promedio_Unitario','Costo_Total'];

        foreach ($info as $i) {
            $columns[] = [
                ['left', $i->code_article],
                ['left', $i->Articulo],
                ['left', $i->Categoria],
                ['left', $i->Unidad],
                ['left', $i->Almacen],
                ['left', $i->Localizacion],
                ['left', $i->Lote],
                ['left', $i->Serie],
                ['right', $i->Disponible],
                ['right', $i->Remitido],
                ['right', $i->Total],
                ['right', $i->Transito],
                ['right', $i->Costo_Promedio_Unitario],
                ['right', $i->Costo_Total]
            ];
        }

        $data = [
            'data' => $columns,
            'title' => 'LISTA DE ARTICULOS CON STOCK'
        ];

        return $data;
    }
}