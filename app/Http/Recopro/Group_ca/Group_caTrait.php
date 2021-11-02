<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/12/2017
 * Time: 11:36 AM
 */

namespace App\Http\Recopro\Group_ca;

use Carbon\Carbon;

trait Group_caTrait
{
    public function generateDataExcel($info)
    {
        $columns[] = ['GRUPO'];

        foreach ($info as $i) {
           
            $columns[] = [
             
                ['left', $i->nombre],
                
            ];
        }

        $data = [
            'data' => $columns,
            'title' => 'LISTA DE GRUPOS'
        ];

        return $data;
    }
}