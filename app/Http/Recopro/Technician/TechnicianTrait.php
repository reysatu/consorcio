<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/12/2017
 * Time: 11:36 AM
 */

namespace App\Http\Recopro\Technician;

use Carbon\Carbon;

trait TechnicianTrait
{
    public function generateDataExcel($info)
    {
        $columns[] = ['TÉCNICO','META CANTIDAD','META MONTO','U.CREADO', 'F.CREADO', 'U.MODIFICADO', 'F.MODIFICADO'];

        foreach ($info as $i) {
            $columns[] = [
                ['left', $i->descripcion],
                ['left',$i->meta_cantidad],
                ['left',$i->meta_monto],
                ['left', $i->user_c->name],
                ['center', (Carbon::parse($i->dFecCre)->format('d-m-Y'))],
                ['left', $i->user_u->name],
                ['center', (Carbon::parse($i->dFecMod)->format('d-m-Y'))]
            ];
        }

        $data = [
            'data' => $columns,
            'title' => 'LISTA DE TÉCNICOS'
        ];

        return $data;
    }
}