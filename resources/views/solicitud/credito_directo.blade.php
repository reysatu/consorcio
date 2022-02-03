<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $titulo }}</title>
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
            margin-bottom: 2cm;
        }

        header {
            position: fixed;
            top: 0.9cm;
            left: 0.5cm;
            right: 0.5cm;
            height: 3cm;
            /* text-align: center; */
            /* line-height: 0.8cm; */
            font-family: 'Times New Roman' !important;
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


        h2,
        h3,
        h4,
        h5 {
            /* text-align: center !important; */
            margin: 2px 0;
            /* padding-botton: 2px; */

        }

        #tabla, #tabla tr, #tabla td {
            width: 100%; 
            border: 1px solid black;  
            border-collapse: collapse;
        }

        #tabla_2, #tabla_2 td {
            width: 100%; 
            border-left: 1px solid black;  
            border-right: 1px solid black;  
            border-bottom: 1px solid black;  
            border-collapse: collapse;
        }

   
    </style>

</head>

<body>

    <header style="">
        <table style="width: 100%;">

          <tr>
              <td style="width: 15%;"><strong>Compañia </strong></td>
              <td colspan="2" style="width: 45%;"><strong>{{ $empresa[0]->RazonSocial }}</strong></td>
              <td style="width: 10%;">Fecha </td>
              <td colspan="2" style="width: 30%;"><?php echo date("d/m/Y"); ?></td>
          </tr>
          <tr>
              <td style="width: 15%;">R.U.C. </td>
              <td colspan="5" style="width: 85%;">{{ $empresa[0]->Ruc }}</td>
              
          </tr>
          <tr>
              <td style="width: 15%;">Dirección </td>
              <td colspan="5" style="width: 85%;">{{ $empresa[0]->Direccion }}</td>
              
          </tr>
          <tr>
              <td style="width: 15%;">Teléfono </td>
              <td style="width: 15%;">{{ $empresa[0]->Telefono1 }}</td>
              <td style="width: 10%;">Estado </td>
              <td style="width: 10%;">{{ $solicitud[0]->estado }}</td>
              <td style="width: 30%;"><strong>NÚMERO SOLICITUD: </strong></td>
              <td style="width: 20%;"><strong>{{ $solicitud[0]->cCodConsecutivo }}-{{ $solicitud[0]->nConsecutivo }}</strong></td>
              
          </tr>
         
      </table>




    </header>
    <main>

        <table id="tabla" style="">
        
            <tr>
                <td style="width: 20%;"><strong>Fecha Solicitud </strong></td>
                <td style="width: 20%;"><strong>Tipo Solicitud </strong></td>
                <td style="width: 25%;"><strong>Convenio </strong></td>
                <td style="width: 35%;"><strong>Vendedor </strong></td>
                
            </tr>
            <!-- <tr>
                <td style="width: 15%;">Doc. del Ciente: </td>
                <td style="width: 12%;">{{ $cliente[0]->documento }}</td>
                <td style="width: 15%;">Forma de Pago: </td>
                <td style="width: 12%;">{{ $titulo }}</td>
                <td style="width: 6%;">Vendedor: </td>
                <td style="width: 40%;">{{ $solicitud[0]->vendedor }}</td>
            </tr>
            <tr>
                <td style="width: 15%;">Fecha Documento: </td>
                <td style="width: 12%;">{{ $solicitud[0]->fecha_solicitud_user }}</td>
                <td style="width: 15%;">Fecha Vencimiento: </td>
                <td style="width: 12%;">{{ $solicitud[0]->fecha_vencimiento_user }}</td>
                <td style="width: 6%;">Estado: </td>
                <td style="width: 40%;">{{ $solicitud[0]->estado }}</td>
            </tr>
            <tr>
                <td style="width: 20%;">Comentarios: </td>
                <td colspan="5" style="width: 80%;">{{ $solicitud[0]->comentarios }}</td>
            </tr> -->
           
        </table>
      


        <table id="tabla_2" style="width: 100%; font-size: 10px !important;">
            <tr style="">
                <td style="border-bottom: 1px solid black; border-right: 1px solid black;">#</td>
                <td style="border-bottom: 1px solid black; border-right: 1px solid black;">Código</td>
                <td style="border-bottom: 1px solid black; border-right: 1px solid black;">Descripción</td>
                <td style="border-bottom: 1px solid black; border-right: 1px solid black;">Und</td>
                <td style="border-bottom: 1px solid black; border-right: 1px solid black;">Cantidad</td>
                <td style="border-bottom: 1px solid black; border-right: 1px solid black;">P. Unit.</td>
                <td style="border-bottom: 1px solid black;">Monto Total</td>

            </tr>

            <?php
            // $total_importe = 0;
            // $total_interes = 0;
            // $total = 0;
            // $total_amortizacion = 0;
            // $total_saldo = 0;
            $i = 1;
            foreach ($solicitud_articulo as $key => $value) {
                // $total_importe += (float)$value->valor_cuota;
                // $total += (float)($value->int_moratorio + $value->valor_cuota);
                // $total_amortizacion += (float)$value->monto_pago;
                // $total_saldo += (float)$value->saldo_cuota;
                echo '<tr>';
                echo '  <td>' . $i . '</td>';
                echo '  <td>' . $value->idproducto . '</td>';
                echo '  <td>' . $value->producto . '</td>';
                echo '  <td>' . $value->unidad . '</td>';
                echo '  <td>' . $value->cantidad . '</td>';

                echo '  <td>' . $value->precio_unitario . '</td>';
                echo '  <td>' . $value->precio_total . '</td>';


                echo '</tr>';

                $i++;
            }
            // echo '<tr>';
            // echo '  <td style="border-top: 1px solid black;"></td>';
            // echo '  <td style="border-top: 1px solid black;"></td>';
            // echo '  <td style="border-top: 1px solid black;"></td>';
            // echo '  <td style="border-top: 1px solid black;">'.$total_importe.'</td>';
            // echo '  <td style="border-top: 1px solid black;">'.$total_interes.'</td>';
            // echo '  <td style="border-top: 1px solid black;">'.$total.'</td>';
            // echo '  <td style="border-top: 1px solid black;">'.$total_amortizacion.'</td>';
            // echo '  <td style="border-top: 1px solid black;">'.$total_saldo.'</td>';
            // echo '  <td style="border-top: 1px solid black;"></td>';
            // echo '  <td style="border-top: 1px solid black;"></td>';
            // echo '  <td style="border-top: 1px solid black;"></td>';
            // echo '</tr>';
            ?>
        </table>
        

            <br>
        <table style="width: 100%;">
            <tr>
                <td style="width: 75%;"></td>
                <td style="width: 25%;">
                    <table>
                        <tr>
                            <td>Monto Afecto</td>
                            <td>
                                <?php 
                                    if($solicitud[0]->t_impuestos > 0) {
                                        echo $solicitud[0]->t_monto_afecto;
                                    }
                                ?>
                            </td>
                        </tr>
                        <tr>
                            <td>Monto No Afecto</td>
                            <td>
                                <?php 
                                    if($solicitud[0]->t_impuestos <= 0) {
                                        echo $solicitud[0]->t_monto_exonerado;
                                    }
                                ?>
                            </td>
                        </tr>
                        <tr>
                            <td>(-) Descuentos</td>
                            <td>
                                <?php echo (float)$solicitud[0]->monto_descuento_detalle + (float)$solicitud[0]->t_monto_descuento; ?> 
                            </td>
                        </tr>
                        <tr>
                            <td>(+) Impuestos</td>
                            <td>{{ $solicitud[0]->t_impuestos }}</td>
                        </tr>

                        <tr>
                            <td style="border-top: 1px solid black;"><strong>Monto Total</strong></td>
                            <td style="border-top: 1px solid black;"><strong>{{ $solicitud[0]->t_monto_total }}</strong></td>
                        </tr>
                    </table>
            
                </td>
               
            </tr>
        </table>

    




    </main>

</body>

</html>