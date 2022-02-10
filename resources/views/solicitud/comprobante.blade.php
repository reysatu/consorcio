<?php  date_default_timezone_set('America/Lima'); $mes = array("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"); ?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Comprobante</title>
    <style>
        
        /* referencia: https://ourcodeworld.co/articulos/leer/687/como-configurar-un-encabezado-y-pie-de-pagina-en-dompdf */
        @page {
            margin: 0cm 0cm;
        }

        /** Defina ahora los márgenes reales de cada página en el PDF **/
        body {
            margin-top: 4cm;
            margin-left: 0.5cm;
            margin-right: 0.5cm;
            margin-bottom: 2cm;
        }
            
        header {
            position: fixed;
            top: 0.9cm;
            left: 1cm;
            right: 1cm;
            height: 4cm;
            /* text-align: center; */
            line-height: 0.8cm;
            font-family: 'Times New Roman' !important;
        }

        footer {
            position: fixed; 
            bottom: -60px; 
            left: 1cm;
            right: 1cm;
            height: 150px; 
            /* border: 1px solid black; */

            /** Extra personal styles **/
            /* background-color: #03a9f4;
            color: white; */
            /* text-align: center; */
            /* line-height: 35px; */
        }



        * {
            font-family: 'Roboto', sans-serif;
            box-sizing: border-box;
            /* font-weight: bold; */
            font-size: 12px;
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
            <div class="col" style="width: 70%; text-align: center; line-height: 18px;">
               <?php 
                    // foreach ($tiendas as $key => $value) {
                    //     echo $value->descripcion."-".$value->direccion."; ";
                    // }
               ?>
               {{ $empresa[0]->direcciones_oficinas }}
               <br>
         
               <label for="" style="font-weight: bold; font-size: 14px !important;">{{ $empresa[0]->lema1 }}</label><br>
               <label for="" style="font-weight: bold; font-size: 14px !important;">{{ $empresa[0]->lema2 }}</label>
            </div>
            <div class="col" style="width: 30%;">
                <table style="width: 100%; border: 1px solid black; text-align: center; font-weight: bold; font-size: 18px !important; line-height: 25px;">
                    <tr>
                        <td style="border-bottom: 1px solid black;">R.U.C. {{ $empresa[0]->Ruc }}</td>
                    </tr>
                    <tr>
                        <td style="border-bottom: 1px solid black;">{{ $venta[0]->tipo_documento }}</td>
                    </tr>
                    <tr>
                        <td>{{ $venta[0]->serie_comprobante }}-{{ $venta[0]->numero_comprobante }}</td>
                    </tr>
                </table>
               
            </div>
        </div>
        
        
       
    </header>
    <!-- <div class="clear"></div> -->
    
    <main>  
        <br><br>
        <table style="width: 100%; ">
            <tr >
                <td style="width: 20%;">CLIENTE</td>
                <td colspan="2" style="width: 80%;">{{ $cliente[0]->razonsocial_cliente }}</td>
            </tr>
            <tr>
                <td style="width: 20%;">DIRECCIÓN</td>
                <td style="width: 55%;">{{ $cliente[0]->direccion }}</td>
                <td style="width: 5%;">RI SUNAT</td>
                <td style="width: 20%;"></td>
            </tr>
            <tr>
                <td style="width: 20%;">DNI/RUC</td>
                <td style="width: 55%;">{{ $cliente[0]->documento }}</td>
                <td style="width: 5%;">Fecha</td>
                <td style="width: 20%;"><?php echo date("d / ").$mes[date("n")-1].date(" / Y"); ?></td>
            </tr>
           
          
        </table>
        

      
        <table style="width: 100%; font-size: 10px !important;" >
            <tr style="">
                <td style="border-bottom: 1px solid black; border-right: 1px solid black; background: #adadad;">CANT.</td>
                <td style="border-bottom: 1px solid black; border-right: 1px solid black; background: #adadad;">UND</td>
                <td style="border-bottom: 1px solid black; border-right: 1px solid black; background: #adadad;">DESCRIPCION</td>
                <td style="border-bottom: 1px solid black; border-right: 1px solid black; background: #adadad;">P. UNITARIO</td>
                <td style="border-bottom: 1px solid black; border-right: 1px solid black; background: #adadad;">VALOR DE VENTA</td>
               
            </tr>
            
            <?php 
               
                $total = 0;
                
                foreach ($venta_detalle as $key => $value) {
                  
                    $total += (float)($value->precio_total);
                  
                    echo '<tr>';
                    echo '  <td>'.$value->cantidad.'</td>';
                    echo '  <td>'.$value->unidad_medida.'</td>';
                    echo '  <td>'.$value->producto.'</td>';
                    echo '  <td>'.$value->precio_unitario.'</td>';
                   
                    echo '  <td>'.$value->precio_total.'</td>';
                   

                    echo '</tr>';

                }
                
            ?>
        </table>
        <br>
        <br>
        <br>
       

        <table style="width: 100%;">
            <tr>
                <td style="width: 20%;">Condicion de Pago:</td>
                <td style="width: 80%;">
                <?php 
                    if($venta[0]->tipo_comprobante == "1") {
                        echo "Contado";
                    } else {
                        echo $venta[0]->condicion_pago;
                    }

                ?>
                
                </td>
               
            </tr>
        </table>
        <br>
        <br>
        <br>
        
        <table style="width: 100%;">
            <tr>
                <td style="width: 20%;">Vendedor:</td>
                <td style="width: 80%;">{{ $solicitud[0]->vendedor }}</td>
               
            </tr>
        </table>


       
       
        


        
        
    </main>

    <footer>
      
        <table style="width: 100%;">
            <tr>
                <td style="width: 70%;">
                    SON: {{  $total_letras }}
                    <br><br>
                    <strong style="text-align: center !important;">BIENES TRANSFERIDOS EN LA AMAZONIA PARA SER CONSUMIDOS EN LA AMAZONIA</strong>
                </td>
                <td style="width: 30%;">
                    <table style="width: 100%;">
                        <tr>
                            <td>Valor de Venta</td>
                            <td>{{ $venta[0]->Simbolo }} </td>
                            <td style="text-align: right; border: 1px solid black;">
                                
                                <?php 
                                    // if($venta[0]->t_impuestos > 0) {
                                    //     echo $venta[0]->t_monto_afecto;
                                    // } else {
                                    //     echo $venta[0]->t_monto_exonerado;
                                    // }
                                    echo $venta[0]->t_monto_subtotal;
                                ?>
                            </td>
                        </tr>
                        <tr>
                            <td>18% I.G.V.</td>
                            <td>{{ $venta[0]->Simbolo }}</td>
                            <td style="text-align: right; border: 1px solid black;">{{ $venta[0]->t_impuestos }}</td>
                        </tr>
                        <tr>
                            <td>Precio Venta</td>
                            <td>{{ $venta[0]->Simbolo }}</td>
                            <td style="text-align: right; border: 1px solid black;">
                                <?php 
                                    // echo $venta[0]->t_monto_total;
                                    echo $venta[0]->t_monto_subtotal + $venta[0]->t_impuestos;
                                ?>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
            
    </footer>
  
</body>
</html>