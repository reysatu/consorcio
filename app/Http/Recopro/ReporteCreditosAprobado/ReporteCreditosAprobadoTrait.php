<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/12/2017
 * Time: 11:36 AM
 */

namespace App\Http\Recopro\ReporteCreditosAprobado;

use Carbon\Carbon;

trait ReporteCreditosAprobadoTrait
{
    public function generateDataExcel($info)
    {
        $columns[] = ['CÓDIGO','FECHA','DOCUMENTO DE VENTA','CLIENTE','VENDEDOR','MONTO TOTAL', 'ESTADO', 'REPUESTO','ACEITE','SERVICIO','SERVICIO TERCERO','MOSTRADOR','TALLER'];
        foreach ($info as $i) {
            $estado="Registrado";
            if($i->estado=='2'){
                $estado='Vigente';
            }elseif ($i->estado=='3') {
                $estado='Por Aprobar';
            }elseif ($i->estado=='4') {
                $estado='Aprobado';
            }elseif ($i->estado=='5') {
                $estado='Rechazado';
            }elseif ($i->estado=='6') {
                $estado='Facturado';
            }elseif ($i->estado=='7') {
                $estado='Facturado';
            };
            $mostrador=0;
            $taller=0;
            if($i->origen=='V'){
                $mostrador=floatval($i->REPUESTO)+floatval($i->ACEITE);
            }else{
                $taller=floatval($i->REPUESTO)+floatval($i->ACEITE); 
            };
            $columns[] = [
                ['left', $i->cCodConsecutivo.'-'.$i->nConsecutivo],
                ['center', (Carbon::parse($i->fecha)->format('d-m-Y'))],
                ['left', $i->documento_ven],
                ['left', $i->razonsocial_cliente],
                ['left', $i->vendedor],
                ['left', $i->monto_total],
                ['left', $estado],
                ['left', $i->REPUESTO],
                ['left', $i->ACEITE],
                ['left', $i->SERVICIO],
                ['left', $i->TERCEROS],
                ['left', $mostrador],
                ['left', $taller],
               
            ];
        }

        $data = [
            'data' => $columns,
            'title' => 'LISTA DE VENTA DE REPUESTO'
        ];

        return $data;
    }
}