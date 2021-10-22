<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/12/2017
 * Time: 11:36 AM
 */

namespace App\Http\Recopro\Accoudet;

use Carbon\Carbon;

trait AccoudetTrait
{
    public function generateDataExcel($info)
    {
        $columns[] = ['GRUPO CONTABLE','OPERACIÓN','CUENTA','CENTRO COSTO','U.CREADO', 'F.CREADO', 'U.MODIFICADO', 'F.MODIFICADO'];

        foreach ($info as $i) {
            $columns[] = [
                ['left', $i->grupoContable_c->descripcion],
                ['left', $i->operacion_u->descripcion],
                ['left',$i->cuenta],
                ['left', $i->centrocosto],
                ['left', $i->user_c->name],
                ['center', (Carbon::parse($i->created_at)->format('d-m-Y'))],
                ['left', $i->user_u->name],
                ['center', (Carbon::parse($i->updated_at)->format('d-m-Y'))]
            ];
        }

        $data = [
            'data' => $columns,
            'title' => 'LISTA CONTABLE DETALLE'
        ];

        return $data;
    }
}