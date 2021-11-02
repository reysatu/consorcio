<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/12/2017
 * Time: 11:36 AM
 */

namespace App\Http\Recopro\Customer;

use Carbon\Carbon;

trait CustomerTrait
{
    public function generateDataExcel($info)
    {
        $columns[] = ['TIPO DOCUMENTO','DOCUMENTO','RAZON SOCIAL', 'CONTACTO', 'DIRECCION', 'CORREO ELECTRÓNICO','CELULAR'];

        foreach ($info as $i) {
           
            $columns[] = [
                ['left', $i->tipodoc],
                ['left', $i->documento],
                ['left', $i->razonsocial_cliente],
                ['left', $i->contacto],
                ['left', $i->direccion],
                ['left', $i->correo_electronico],
                ['left', $i->celular],
               
                
            ];
        }

        $data = [
            'data' => $columns,
            'title' => 'LISTA DE CLIENTES'
        ];

        return $data;
    }
}