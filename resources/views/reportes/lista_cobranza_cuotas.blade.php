<?php  date_default_timezone_set('America/Lima'); $mes = array("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"); ?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lista Cobranza Cuotas</title>
    <style>
        
        /* referencia: https://ourcodeworld.co/articulos/leer/687/como-configurar-un-encabezado-y-pie-de-pagina-en-dompdf */
        @page {
            margin: 0cm 0cm;
        }

        /** Defina ahora los márgenes reales de cada página en el PDF **/
        body {
            margin-top: 4.5cm;
            margin-left: 0.5cm;
            margin-right: 0.5cm;
            /* margin-bottom: 2cm; */
        }
            
        header {
            position: fixed;
            top: 0.9cm;
            left: 0.5cm;
            right: 0.5cm;
            height: 4.5cm;
            /* text-align: center; */
            /* line-height: 0.8cm; */
             font-family: 'Roboto', sans-serif;
        }




        * {
            font-family: 'Roboto', sans-serif;
            box-sizing: border-box;
            /* font-weight: bold; */
            font-size: 13px;
        }
        
    
        /* #contenido {
            
            width: 696px; */
            /* border: 1px solid gray */
					
        /* } */

        .row {
            width: 100%;
            height: 30px;
            /* margin-top: 15px; */
            /* clear: both; */
        }

        .row-sm {
            width: 100%;
            height: 20px;
            /* margin-top: 15px; */
            /* clear: both; */
        }
        .clear {
            clear: both; 
        }
        .col {
            float: left;
            /* border: 1px solid black; */
        }
        

        h2, h3, h4, h5 {
            /* text-align: center !important; */
            margin: 2px 0;
            /* padding-botton: 2px; */
			
        }
        #tabla-header {
            border-collapse: collapse;
        }
        #tabla-header, #tabla-heade th, #tabla-header td {
            border: 1px solid;
        }
    </style>
   
</head>
<body>

<header style="">
        <div class="row">
            <div class="col" style="width: 25%; /*border: 1px solid black;*/ text-align: center;">
                <img style="width: 100%; height: 100px;" src="<?php echo public_path($empresa[0]->ruta_logo); ?>" alt="">
                
            </div>
            <div class="col" style="width: 5%; line-height: 20px;">
            </div>
            <div class="col" style="width: 70%; line-height: 20px; margin-top: 10px;">

                {{ $empresa[0]->RazonSocial }}<br>
                {{ $empresa[0]->Direccion }} TELEFONO:  {{ $empresa[0]->Telefono1 }}<br>
                <strong>Email: </strong>{{ $empresa[0]->Correo }} &nbsp;&nbsp;&nbsp; TARAPOTO, <?php echo date("d"). " de ".$mes[date("m")-1]. " del ".date("Y"); ?><br>
              
            </div>
        </div>
        <div class="clear"></div>
        <div class="row" style="margin-top: 0px !important; text-align: center; font-size: 20px !important;">
            <div class="col" style="width: 100%;">
                <h3 style="">Lista de Cobranza de Cuotas</h3>
            </div>
        </div>
        <br>
       <table id="tabla-header"  style="width: 1000px; font-size: 11px !important;">
           
            <tr>
                <td style="font-weight  : bold; width: 80px;" align="center" rowspan="2">Fec. Ult. Pago</td>
                <td style="font-weight  : bold; width: 200px;" align="center" rowspan="2">Cliente</td>
                <td style="font-weight  : bold; width: 20px;" align="center" rowspan="2"># Cta</td>
                <td style="font-weight  : bold; width: 40px;" align="center" rowspan="2">Nro Recibo</td>
                <td style="font-weight  : bold; width: 80px;" align="center" rowspan="2">Fecha Vencimiento</td>
                <td style="font-weight  : bold; width: 70px;" align="center" rowspan="2">Moneda Doc.</td>
                <td style="font-weight  : bold; width: 50px;" align="center" rowspan="2">Total Cta Soles</td>
                <td style="font-weight  : bold; width: 130px;" align="center" colspan="3">Montos Cobrados Soles</td>
                <td style="font-weight  : bold; width: 30px;" align="center" rowspan="2">Total Cta Dolares</td>
                <td style="font-weight  : bold; width: 90px;" align="center" colspan="3">Montos Cobrados Dolares</td>
                <td style="font-weight  : bold; width: 50px;" align="center" rowspan="2">Atraso</td>
                <td style="font-weight  : bold; width: 80px;" align="center" rowspan="2">Estado</td>
                <td style="font-weight  : bold; width: 80px;" align="center" rowspan="2">Nro Cobranza</td>
            </tr>
            <tr>
                <td style="font-weight  : bold; width: 50px;" align="center" >Monto Cta.</td>
                <td style="font-weight  : bold; width: 30px;" align="center" >Pto Pago</td>
                <td style="font-weight  : bold; width: 50px;" align="center" >Mora</td>
                <td style="font-weight  : bold; width: 30px;" align="center" >Monto Cta.</td>
                <td style="font-weight  : bold; width: 30px;" align="center" >Pto Pago</td>
                <td style="font-weight  : bold; width: 30px;" align="center" >Mora</td>
                
            </tr>
          
       </table>
       
        
        
       
    </header>
        
    <main>  
        <br><br><br><br><br>
        
        <?php 

            $total = 0;
            $mora = 0;
            foreach ($cobradores as $key => $value) {
                echo $value->idCobrador." ".$value->cobrador;
                echo '<hr>';
                echo '<table style="width: 1000px; font-size: 11px !important; ">';
                   
                    foreach ($value->pagos as $kp => $vp) {
                        $total += (float) $vp->t_monto_total;
                        $mora += (float) $vp->int_moratorio_pagado;
                        echo '<tr>';   
                        echo '  <td style="width: 80px !important;">'.$vp->fecha_emision.'</td>';
                        echo '  <td style="width: 200px !important;">'.$vp->razonsocial_cliente.'</td>';
                        echo '  <td style="width: 20px !important;">'.$vp->nrocuota.'</td>';
                        echo '  <td style="width: 40px !important;">-.-</td>';
                        echo '  <td style="width: 80px !important;">'.$vp->fecha_vencimiento.'</td>';
                        echo '  <td style="width: 70px !important;">'.$vp->moneda.'</td>';
                        echo '  <td style="width: 50px !important;">'.number_format($vp->t_monto_total, 2).'</td>';
                        echo '  <td style="width: 50px !important;">'.number_format($vp->t_monto_total, 2).'</td>';
                        echo '  <td style="width: 41px !important;">0.00</td>';
                        echo '  <td style="width: 50px !important;">'.number_format($vp->int_moratorio_pagado, 2).'</td>';
                        echo '  <td style="width: 41px !important;">0.00</td>';
                        echo '  <td style="width: 34px !important;">0.00</td>';
                        echo '  <td style="width: 30px !important;">0.00</td>';
                        echo '  <td style="width: 30px !important;">0.00</td>';
                        echo '  <td style="width: 50px !important;">'.$vp->dias_mora.'</td>';
                        echo '  <td style="width: 80px !important;">'.$vp->estado.'</td>';
                        echo '  <td style="width: 80px !important;">'.$vp->serie_comprobante.'-'.$vp->numero_comprobante.'</td>';
                        echo '</tr>';   
                    }
                    echo '<tr>';
                    echo '  <td colspan="7" align="right" style="font-weight: bold; border-top: 1px solid black !important;">Total '.$value->cobrador.'</td>';
                    echo '  <td style="font-weight: bold; border-top: 1px solid black !important;">'.number_format($total, 2).'</td>';
                    echo '<td colspan="9" style="font-weight: bold; border-top: 1px solid black !important;"></td>';
                    echo '</tr>';
                    echo '<tr >';
                    echo '  <td colspan="7" align="right" style="font-weight: bold;">Total '.$value->cobrador.' Incluido Descuentos y Moras</td>';
                    echo '  <td style="font-weight: bold;">'.number_format(($total+$mora), 2).'</td>';
                    echo '</tr>';

                echo '</table>';
            }
            echo '<hr>';
            echo '<table style="font-size: 11px !important; width: 72%;"> ';
                echo '<tr>';
                echo '  <td  align="right" style="font-weight: bold;">Total General</td>';
                echo '  <td style="font-weight: bold;">'.number_format($total, 2).'</td>';
                echo '<td  style="font-weight: bold;"></td>';
                echo '</tr>';
                echo '<tr >';
                echo '  <td  align="right" style="font-weight: bold;">Total Incluido Descuentos y Moras</td>';
                echo '  <td style="font-weight: bold;">'.number_format(($total+$mora), 2).'</td>';
                echo '<td  style="font-weight: bold;"></td>';
                echo '</tr>';
            echo '</table>';
        ?>
      
        
        
    </main>

 
  
</body>
</html>