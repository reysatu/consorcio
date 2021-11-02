<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/12/2017
 * Time: 11:36 AM
 */

namespace App\Http\Recopro\Revision_ca;

use Carbon\Carbon;

trait Revision_caTrait
{
    public function generateDataExcel($info)
    {
        $columns[] = ['REVISIÓN','GRUPO'];

        foreach ($info as $i) {
            $columns[] = [
                ['left', $i->nombre],
                ['left', $i->grupo_c_EXCEL->nombre],
            ];
        }

        $data = [
            'data' => $columns,
            'title' => 'LISTA DE REVISIONES'
        ];

        return $data;
    }
}