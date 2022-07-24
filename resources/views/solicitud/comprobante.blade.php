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
            margin-top: 7.2cm;
            margin-left: 0.5cm;
            margin-right: 0.5cm;
            margin-bottom: 2cm;
        }
            
        header {
            position: fixed;
            top: 0.9cm;
            left: 1cm;
            right: 1cm;
            height: 7.2cm;
            /* text-align: center; */
            line-height: 0.8cm;
            font-family: 'Times New Roman' !important;
        }

        footer {
            position: fixed; 
            bottom: -100px; 
            left: 1cm;
            right: 1cm;
            height: 350px; 
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
            <div class="col" style="width: 35%; /*border: 1px solid black;*/ text-align: center;">
                <img style="width: 100%; height: 123px;" src="<?php echo public_path($empresa[0]->ruta_logo); ?>" alt="">
            </div>
            <div class="col" style="width: 65%; text-align: center; font-weight: bold; font-size: 30px; /*border: 1px solid black;*/ line-height: 60px;">
                {{ $empresa[0]->RazonSocial }}
              
            </div>
        </div>
        <div class="clear">

        </div>
        <div class="row">
            <div class="col" style="width: 70%; text-align: center; line-height: 18px;">
               <?php 
                    // foreach ($tiendas as $key => $value) {
                    //     echo $value->descripcion."-".$value->direccion."; ";
                    // }
                    $direcciones = explode("|", $empresa[0]->direcciones_oficinas);
                    for ($i=0; $i < count($direcciones); $i++) { 
                        echo $direcciones[$i]."<br>";
                    }
                   
               ?>
            
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
                <td style="width: 20%;">
                <?php 
                    $arrd = explode("/", $venta[0]->fecha_emision_user);
              
                    echo $arrd[0]." / ".$mes[$arrd[1]-1]." / ".$arrd[2]; 
                   
                ?>
                </td>
            </tr>
            <?php  if($venta[0]->IdTipoDocumento == "07") { ?>
                <tr>
                    <td style="width: 20%;">Doc. Que Modifica: </td>
                    <td style="width: 55%;">{{ $venta_referencia[0]->tipo_documento }} {{ $venta_referencia[0]->serie_comprobante }}-{{ $venta_referencia[0]->numero_comprobante }}</td>
                   
                </tr>
                <tr>
                    <td style="width: 20%;">Motivo: </td>
                    <td style="width: 55%;">{{ $venta[0]->motivo }}</td>
                   
                </tr>
            <?php } ?>
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
                    echo '  <td>'.number_format($value->cantidad, 2).'</td>';
                    echo '  <td>'.$value->unidad_medida.'</td>';

                    if(empty($value->descripcion_articulo)) {

                        echo '  <td>'.$value->producto.'-'.$value->code_article.'</td>';
                    } else {
                        echo '  <td>' . $value->descripcion_articulo .'-'.$value->code_article. '</td>';
                    }
                   
                    echo '  <td>'.number_format($value->precio_unitario, 2).'</td>';
                    if($value->cOperGrat != "S") {

                        echo '  <td>'.number_format($value->precio_total, 2).'</td>';
                    } else {
                        echo '  <td>0.00</td>';
                    }
                    
                    
                   

                    echo '</tr>';

                }
              
                if(count($venta_anticipo) > 0 && $venta[0]->tipo_comprobante == 0 && ($venta[0]->IdTipoDocumento == "01" || $venta[0]->IdTipoDocumento == "03") && $venta[0]->comprobante_x_saldo == "S") {
                    $marca = (isset($producto[0]->marca)) ? $producto[0]->marca : "";
                    $modelo = (isset($producto[0]->modelo)) ? $producto[0]->modelo : "";
                    $motor = (isset($producto[0]->motor)) ? $producto[0]->motor : "";
                    $color = (isset($producto[0]->color)) ? $producto[0]->color : "";
                    $serie = (isset($producto[0]->serie)) ? $producto[0]->serie : "";
                    $anio_fabricacion = (isset($producto[0]->anio_fabricacion)) ? $producto[0]->anio_fabricacion : "";
                    echo '<tr>';
                    echo '  <td>1.00</td>';
                    echo '  <td>UND</td>';
                    echo '  <td>(-) ANTICIPO '.$venta_anticipo[0]->serie_comprobante.'-'.$venta_anticipo[0]->numero_comprobante.'</td>';
                    echo '  <td>-'.number_format($venta_anticipo[0]->t_monto_total, 2).'</td>';
                    echo '  <td>-'.number_format($venta_anticipo[0]->t_monto_total, 2).'</td>';
                    echo '</tr>';
                    echo '<tr>';
                    echo '  <td></td>';
                    echo '  <td></td>';
                    echo '  <td>
                                Marca              : '.$marca.'<br>
                                Modelo             : '.$modelo.'<br>
                                Año de Fabricación : '.$anio_fabricacion.'<br>
                                Color              : '.$color.'<br>
                                # Serie            : '.$serie.'<br>
                                # Motor            : '.$motor.'<br>
                            </td>';
                    echo '  <td></td>';
                    echo '  <td></td>';
                    echo '</tr>';
                }

               

                if($venta[0]->condicion_pago == "CONTADO" && !empty($venta[0]->cCodConsecutivo_solicitud) && !empty($venta[0]->nConsecutivo_solicitud) && count($producto) > 0) {
                    $marca = (isset($producto[0]->marca)) ? $producto[0]->marca : "";
                    $modelo = (isset($producto[0]->modelo)) ? $producto[0]->modelo : "";
                    $motor = (isset($producto[0]->motor)) ? $producto[0]->motor : "";
                    $color = (isset($producto[0]->color)) ? $producto[0]->color : "";
                    $serie = (isset($producto[0]->serie)) ? $producto[0]->serie : "";
                    $anio_fabricacion = (isset($producto[0]->anio_fabricacion)) ? $producto[0]->anio_fabricacion : "";
                   
                    echo '<tr>';
                    echo '  <td></td>';
                    echo '  <td></td>';
                    echo '  <td>
                                Marca              : '.$marca.'<br>
                                Modelo             : '.$modelo.'<br>
                                Año de Fabricación : '.$anio_fabricacion.'<br>
                                Color              : '.$color.'<br>
                                # Serie            : '.$serie.'<br>
                                # Motor            : '.$motor.'<br>
                            </td>';
                    echo '  <td></td>';
                    echo '  <td></td>';
                    echo '</tr>';
                }
              
                if(count($venta_anticipo_separacion) > 0 && $venta[0]->tipo_comprobante == 1 && ($venta[0]->IdTipoDocumento == "01" || $venta[0]->IdTipoDocumento == "03")) {
                    $venta[0]->t_monto_subtotal = $venta[0]->t_monto_subtotal - $venta_anticipo_separacion[0]->t_monto_total;
                    echo '<tr>';
                    echo '  <td>1.00</td>';
                    echo '  <td>UND</td>';
                    echo '  <td>(-) ANTICIPO SEPARACIÓN '.$venta_anticipo_separacion[0]->serie_comprobante.'-'.$venta_anticipo_separacion[0]->numero_comprobante.'</td>';
                    echo '  <td>-'.number_format($venta_anticipo_separacion[0]->t_monto_total, 2).'</td>';
                    echo '  <td>-'.number_format($venta_anticipo_separacion[0]->t_monto_total, 2).'</td>';
                    echo '</tr>';
                   
                }

                // print_R(count($solicitud));
              
                // agregar campo comentario facturacion
                $comentario_facturacion = (count($solicitud) > 0 && isset($solicitud[0]->comentario_facturacion)) ? $solicitud[0]->comentario_facturacion : "";
                
                if($comentario_facturacion == "" && count($venta) > 0) {
                    $comentario_facturacion == $venta[0]->descripcion;
                }

                echo '<tr>';
                echo '  <td></td>';
                echo '  <td></td>';
                echo '  <td>
                            <br>'.$comentario_facturacion.'
                        </td>';
                echo '  <td></td>';
                echo '  <td></td>';
                echo '</tr>';
                
            ?>
        </table>
        <br>
        <br>
        <br>
       
      

        <table style="width: 100%;">               
            <?php 
                
                if(count($venta_anticipo) > 0 && $venta[0]->tipo_comprobante == 0 && ($venta[0]->IdTipoDocumento == "01" || $venta[0]->IdTipoDocumento == "03")) {
                    echo '<tr>';
                    echo '  <td style="width: 15%;">Condicion de Pago:</td>';
                    echo '  <td style="width: 20%;">';
                    
                        if($venta[0]->tipo_comprobante == "1") {
                            echo "Contado";
                        } else {
                            echo $venta[0]->condicion_pago;
                        }
    
                
                    
                    echo '  </td>';
                    if(count($venta_anticipo) > 0 && ($venta[0]->IdTipoDocumento == "01" || $venta[0]->IdTipoDocumento == "03") && count($solicitud) > 0 && $solicitud[0]->tipo_solicitud == 2) {
                        echo '  <td style="width: 20%;">Cuota Mensual:</td>';
                        echo '  <td style="width: 15%;">'.number_format($solicitud_credito[0]->valor_cuota_final, 2).'</td>';
                    }
                    echo '  <td width: 30%;></td>';

                    echo '</tr>';
                    if(count($venta_anticipo) > 0 && ($venta[0]->IdTipoDocumento == "01" || $venta[0]->IdTipoDocumento == "03") && count($solicitud) > 0 && $solicitud[0]->tipo_solicitud == 2) {
                        $importe_financiar = ($solicitud[0]->t_monto_total - $venta_anticipo[0]->t_monto_total);
                        echo '<tr>';
                        echo '  <td colspan="3">Precio de Venta '.$solicitud[0]->simbolo_moneda.' Solic.</td>';
                        // echo '  <td>'.number_format($venta[0]->t_monto_total, 2).'</td>';
                        echo '  <td>'.number_format($solicitud[0]->t_monto_total, 2).'</td>';
                        echo '</tr>';

                        echo '<tr>';
                        echo '  <td colspan="2">Inicial Doc.</td>';
                        echo '  <td>'.$venta_anticipo[0]->serie_comprobante.'-'.$venta_anticipo[0]->numero_comprobante.'</td>';
                        echo '  <td>-'.number_format($venta_anticipo[0]->t_monto_total, 2).'</td>';
                        echo '</tr>';

                        echo '<tr>';
                        echo '  <td colspan="3">Importe a Financiar</td>';
                        echo '  <td>'.number_format($importe_financiar, 2).'</td>';
                        echo '</tr>';
                    }
                    
                } elseif($venta[0]->IdTipoDocumento == "01" || $venta[0]->IdTipoDocumento == "03") {
                    echo '<tr>';
                    echo '  <td style="width: 15%;">Condicion de Pago:</td>';
                    echo '  <td style="width: 20%;">';
                    
                        if($venta[0]->tipo_comprobante == "1") {
                            echo "Contado";
                        } else {
                            echo $venta[0]->condicion_pago;
                        }
    
                
                    
                    echo '  </td>';
                    
                }
                
            ?>
                
           
        </table>
        <br>
        <br>
        <br>
        <?php if($venta[0]->IdTipoDocumento == "01" || $venta[0]->IdTipoDocumento == "03" && count($solicitud) > 0) { 
            $vendedor = (count($solicitud) > 0 && isset($solicitud[0]->vendedor)) ? $solicitud[0]->vendedor : "";
            
            ?>
        <table style="width: 100%;">
            <tr>
                <td style="width: 20%;">Vendedor:</td>
                <td style="width: 80%;">{{ $vendedor }}</td>
               
            </tr>
        </table>
        <?php } ?>

       
       
        


        
        
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
                            <td>Descuento</td>
                            <td>{{ $venta[0]->Simbolo }} </td>
                            <td style="text-align: right; border: 1px solid black;">
                                
                                <?php 
                                    // if($venta[0]->t_impuestos > 0) {
                                    //     echo $venta[0]->t_monto_afecto;
                                    // } else {
                                    //     echo $venta[0]->t_monto_exonerado;
                                    // }
                                    echo number_format($venta[0]->t_monto_descuento, 2);
                                ?>
                            </td>
                        </tr>
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
                                    echo number_format($venta[0]->t_monto_subtotal, 2);
                                ?>
                            </td>
                        </tr>
                        <tr>
                            <td>18% I.G.V.</td>
                
                            <td>{{ $venta[0]->Simbolo }}</td>
                            <td style="text-align: right; border: 1px solid black;"><?php echo number_format($venta[0]->t_impuestos, 2); ?></td>
                        </tr>
                        <tr>
                            <td>Precio Venta</td>
                            <td>{{ $venta[0]->Simbolo }}</td>
                            <td style="text-align: right; border: 1px solid black;">
                                <?php 
                                    // echo $venta[0]->t_monto_total;
                                    $total = $venta[0]->t_monto_subtotal + $venta[0]->t_impuestos;
                                    echo number_format($total, 2);
                                ?>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            
        </table>
        <table>
            <tr>
                <td></td>
                <td>
                    <span id="pie_1" style="display: block;vtext-align: justify;"><?php echo $empresa[0]->pie_1; ?></span><br>
                    <span id="pie_2" style="display: block; text-align: justify;"><?php echo $empresa[0]->pie_2; ?></span><br>
                
                    <span id="pie_3" style="display: block; text-align: center;"><?php echo $empresa[0]->pie_3; ?> </span>
                </td>
            </tr>
        </table>
            
    </footer>
  
</body>
</html>