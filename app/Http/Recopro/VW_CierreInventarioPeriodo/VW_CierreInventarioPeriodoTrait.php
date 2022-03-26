<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/12/2017
 * Time: 11:36 AM
 */

namespace App\Http\Recopro\VW_CierreInventarioPeriodo;

use Carbon\Carbon;

trait VW_CierreInventarioPeriodoTrait
{
    public function generateDataExcel($info)
    {
        $columns[] = ['ID','COD. ARTÍCULO','ARTÍCULO','CATEGORÍA','UNID','ALM','LOC','LOTE','SERIE','DISPONIBLE','REMITIDO','TRÁNSITO','S.TOTAL','COSTO','COSTO TOTAL'];
        $cont=0;
        foreach ($info as $i) {
            $cont=$cont+ $i->Costo_Total;
            $columns[] = [
                ['left', $i->id,''],
                ['left', $i->code_article,''],
                ['left', $i->Articulo,''],
                ['left', $i->Categoria,''],
                ['left', $i->Unidad,''],
                ['left', $i->Almacen,''],
                ['left', $i->Localizacion,''],
                ['left', $i->Lote,''],
                ['left', $i->Serie,''],
                ['left', $i->Disponible,''],
                ['left', $i->Remitido,''],
                ['left', $i->Transito,''],
                ['left', $i->Total,''],
                ['left', $i->Costo_Promedio_Unitario,''],
                ['left', $i->Costo_Total,''],
               
            ];
        }
        $columns[] = [
                ['left','',''],
                ['left','',''],
                ['left','',''],
                ['left','',''],
                ['left','',''],
                ['left','',''],
                ['left','',''],
                ['left','',''],
                ['left','',''],
                ['left','',''],
                ['left','',''],
                ['left','',''],
                ['left','',''],
                ['left','Total costo inventario ','bold'],
                ['left', $cont,'bold'],
               
            ];

        $data = [
            'data' => $columns,
            'title' => $info[0]->Perido,
        ];

        return $data;
    }
}