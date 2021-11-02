<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/12/2017
 * Time: 11:36 AM
 */

namespace App\Http\Recopro\Maintenance;

use Carbon\Carbon;

trait MaintenanceTrait
{
    public function generateDataExcel($info)
    {
        $columns[] = ['MANTENIMIENTO','MONTO REVISIÓN','MONTO MECÁNICA','TERCEROS','OTROS MONTOS','REPUESTOS','ACCESORIOS','LUBRICANTES','OTROS REPUESTOS','TOTAL'];

        foreach ($info as $i) {
            $columns[] = [
                ['left', $i->nombre],
                ['left', $i->mo_revision],
                ['left', $i->mo_mecanica],
                ['left', $i->terceros],
                ['left', $i->otros_mo],
                ['left', $i->repuestos],
                ['left', $i->accesorios],
                ['left', $i->lubricantes],
                ['left', $i->otros_rep],
                ['left', $i->total],
            ];
        }

        $data = [
            'data' => $columns,
            'title' => 'LISTA DE MOVIMIENTOS'
        ];

        return $data;
    }
}