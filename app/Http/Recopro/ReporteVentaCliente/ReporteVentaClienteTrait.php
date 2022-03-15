<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/12/2017
 * Time: 11:36 AM
 */

namespace App\Http\Recopro\ReporteVentaCliente;

use Carbon\Carbon;

trait ReporteVentaClienteTrait
{
    public function generateDataExcel($info)
    {
        $columns[] = ['FECHA','DOCUMENTO','DNI/RUC','CLIENTE','DIRECCIÓN','CELULAR','MODELO','NÚMERO DE SERIE','COLOR','INICIAL','PRECIO UNITARIO','PAGADO','SALDO','FORMA PAGO','MONEDA','VENDEDOR'];

        foreach ($info as $i) {
            $columns[] = [
                ['center', (Carbon::parse($i->Fecha)->format('d/m/Y'))],
                ['left', $i->Documento],
                ['left', $i->DocumentoCliente],
                ['left', $i->razonsocial_cliente],
                ['left', $i->Direccion],
                ['left', $i->celular],
                ['left', $i->Modelo],
                ['left', $i->numero_serie],
                ['left', $i->Color],
                ['left', $i->cuota_inicial],
                ['left', $i->precio_unitario],
                ['left', $i->pagado],
                ['left', $i->saldo],
                ['left', $i->condicion_pago],
                ['left', $i->Moneda],
                ['left', $i->usuario],
            ];
        }

        $data = [
            'data' => $columns,
            'title' => 'LISTA DE VENTAS'
        ];

        return $data;
    }
}