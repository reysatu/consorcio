<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ticket</title>
    <style>
        
        /* referencia: https://ourcodeworld.co/articulos/leer/687/como-configurar-un-encabezado-y-pie-de-pagina-en-dompdf */
        @page {
            margin: 0cm 0cm;
        }

        /** Defina ahora los márgenes reales de cada página en el PDF **/
        body {
            margin-top: 3cm;
            margin-left: 0.5cm;
            margin-right: 0.5cm;
            margin-bottom: 0.5cm;
        }
            
        header {
            position: fixed;
            top: 0.5cm;
            left: 0.5cm;
            right: 0.5cm;
            height: 3cm;
            /* text-align: center; */
            line-height: 0.8cm;

            font-family: 'Times New Roman' !important;
        }



        * {
            font-family: 'Roboto', sans-serif;
            box-sizing: border-box;
            /* font-weight: bold; */
            font-size: 11px;
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
    </style>
   
</head>
<body>

    <header style="">
       
        
        <div class="row">
           
            <div class="col" style="width: 100%; text-align: center; line-height: 20px;">
                <label for="">{{ $empresa[0]->RazonSocial }}</label><br>
                <label for="">{{ $venta[0]->tienda }} </label><br>
                <label for="">{{ $venta[0]->direccion_tienda }}</label>
            </div>            
        </div>
        <div class="clear"></div>
        <div class="row" style="border-bottom: 1px dashed black;">
            <div class="col" style="width: 50%; text-align: justify;">
                <label for="">RUC: {{ $empresa[0]->Ruc }}</label>
            </div>
            <div class="col" style="width: 50%; text-align: justify;">
                <label for="">TELF: {{ $empresa[0]->Telefono1 }}</label>
            </div>
        </div>
        <div class="clear"></div>

        
       
    </header>
    <main>
        
    <div class="row">
           
        <div class="col" style="width: 100%; line-height: 20px; margin-top: 5px;">
          
            <label for="">CONCEPTO: {{ $venta[0]->descripcion }} </label><br>
            <label for="">RECIBO N°: {{ $venta[0]->serie_comprobante }}-{{ $venta[0]->numero_comprobante }}</label><br>
            <label for="">CORRELATIVO N°: {{ $venta[0]->numero_comprobante }}</label><br>
             <label for="">FECHA: {{ $venta[0]->fecha_emision_user_full }}</label><br>
        
        </div>            
    </div>
    <div class="clear"></div>
    <br>
  
    <table style="width: 100%;">
        <tr >
            <td style="border-bottom: 1px dashed black;">DESCRIPCION</td>

            <td style="border-bottom: 1px dashed black;">MONTO</td>

        </tr>
        <?php 

            $total = 0;
            foreach ($venta_detalle as $key => $value) {
            
                echo '<tr>';
                echo '  <td>'.$value->producto.'</td>';
              
                echo '  <td>'.number_format($value->monto_total, 2).'</td>';
                echo '</tr>';
                $total += (float) $value->monto_total;
            }
        ?>
        <tr>
            <td style="border-top: 1px dashed black;" colspan="1">TOTAL ABONADO</td>
            <td style="border-top: 1px dashed black;" colspan="1"><?php echo number_format($total, 2); ?></td>  
        </tr>
    </table>
    <br>
    <div class="row">
           
        <div class="col" style="width: 100%; line-height: 20px; margin-top: 5px;">
            <label for="">Impreso: <?php echo date("d-m-Y H:i:s") ?></label><br>
            <label for="">Caja: {{ $venta[0]->nombre_caja }} </label><br>
            <label for="">Cajero(a): {{ $venta[0]->cajero }}</label><br>
           
            
        </div>            
    </div>
       
     


        
    </main>
    
</body>
</html>