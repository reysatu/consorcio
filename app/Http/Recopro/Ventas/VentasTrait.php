<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/12/2017
 * Time: 11:36 AM
 */

namespace App\Http\Recopro\Ventas;

use Carbon\Carbon;

trait VentasTrait
{
    public function generateDataExcel($info)
    {
        $columns[] = ['CAJA', 'TIENDA', 'USUARIO', 'ACTIVO', 'U.CREADO', 'F.CREADO', 'U.MODIFICADO', 'F.MODIFICADO'];

        foreach ($info as $i) {
            $columns[] = [
                ['left', $i->nombre_caja],
                ['left', $i->tienda_d->descripcion],
                ['left', $i->usuario],
                ['left', $i->activo],
                ['left', $i->user_c->name],
                ['center', (Carbon::parse($i->created_at)->format('d-m-Y'))],
                ['left', $i->user_u->name],
                ['center', (Carbon::parse($i->updated_at)->format('d-m-Y'))]
            ];
        }

        $data = [
            'data' => $columns,
            'title' => 'LISTA DE COMPROBANTES'
        ];

        return $data;
    }

    public function generateDataExcelListaCobranzaCuotas($info)
    {
        $columns[] = ['COBRADOR', 'FEC. ULT. PAGO', 'CLIENTE', '# CTA', 'NRO RECIBO', 'FECHA VENCIMIENTO', 'MONEDA DOC.', 'TOTAL CTA SOLES', 'MONTO CTA SOLES', 'MORA SOLES', 'TOTAL CTA DOLARES', 'MONTO CTA DOLARES', 'MORA DOLARES', 'ATRASO', 'ESTADO', 'NRO COBRANZA'];
        // echo "<pre>";
        // print_r($info);
        // exit;
        $total = 0;
        $mora = 0;
        foreach ($info as $i) {
            $total += (float) $i->valor_cuota_pagada + (float) $i->int_moratorio_pagado;
            $total_cte_soles =  (float) $i->valor_cuota_pagada + (float) $i->int_moratorio_pagado;
            $mora += (float) $i->int_moratorio_pagado;
            $columns[] = [
                ['center', $i->cobrador],
                ['center', $i->fecha_emision],
                ['center', $i->razonsocial_cliente],
                ['center', $i->nrocuota.'-'.$i->nrocuotas],
                ['center', '-.-'],
                ['center', $i->fecha_vencimiento],
                ['center', $i->moneda],
                ['center', number_format($total_cte_soles, 2)],
                ['center', $i->valor_cuota_pagada],
                ['center', $i->int_moratorio_pagado],
                ['center', "0.00"],
                ['center', "0.00"],
                ['center', "0.00"],
                ['center', $i->dias_mora],
                ['center', $i->estado],
                ['center', $i->serie_comprobante.'-'.$i->numero_comprobante]
            ];
        }

        $data = [
            'data' => $columns,
            'title' => 'LISTA DE COBRANZA DE CUOTAS'
        ];

        // print_r($data); exit;

        return $data;
    }
}