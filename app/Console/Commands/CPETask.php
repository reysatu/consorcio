<?php

namespace App\Console\Commands;

use App\Http\Recopro\CajaDiariaDetalle\CajaDiariaDetalleInterface;
use App\Http\Recopro\Compania\CompaniaInterface;
use App\Http\Recopro\Solicitud\SolicitudInterface;
use App\Http\Recopro\Ventas\VentasInterface;
use Exception;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class CPETask extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'cpe:task';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Enviar los comprobantes y consultar el CDR';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    public function subfijo($xx)
    { // esta función regresa un subfijo para la cifra
        $xx = trim($xx);
        $xstrlen = strlen($xx);
        if ($xstrlen == 1 || $xstrlen == 2 || $xstrlen == 3)
            $xsub = "";
        //
        if ($xstrlen == 4 || $xstrlen == 5 || $xstrlen == 6)
            $xsub = "MIL";
        //
        return $xsub;
    }


    public function convertir($xcifra)
    {
        $xarray = array(
            0 => "CERO",
            1 => "UN", "DOS", "TRES", "CUATRO", "CINCO", "SEIS", "SIETE", "OCHO", "NUEVE",
            "DIEZ", "ONCE", "DOCE", "TRECE", "CATORCE", "QUINCE", "DIECISEIS", "DIECISIETE", "DIECIOCHO", "DIECINUEVE",
            "VEINTI", 30 => "TREINTA", 40 => "CUARENTA", 50 => "CINCUENTA", 60 => "SESENTA", 70 => "SETENTA", 80 => "OCHENTA", 90 => "NOVENTA",
            100 => "CIENTO", 200 => "DOSCIENTOS", 300 => "TRESCIENTOS", 400 => "CUATROCIENTOS", 500 => "QUINIENTOS", 600 => "SEISCIENTOS", 700 => "SETECIENTOS", 800 => "OCHOCIENTOS", 900 => "NOVECIENTOS"
        );
        //
        $xcifra = trim($xcifra);
        $xlength = strlen($xcifra);
        $xpos_punto = strpos($xcifra, ".");
        $xaux_int = $xcifra;
        $xdecimales = "00";
        if (!($xpos_punto === false)) {
            if ($xpos_punto == 0) {
                $xcifra = "0" . $xcifra;
                $xpos_punto = strpos($xcifra, ".");
            }
            $xaux_int = substr($xcifra, 0, $xpos_punto); // obtengo el entero de la cifra a convertir
            $xdecimales = substr($xcifra . "00", $xpos_punto + 1, 2); // obtengo los valores decimales
        }

        $XAUX = str_pad($xaux_int, 18, " ", STR_PAD_LEFT); // ajusto la longitud de la cifra, para que sea divisible por centenas de miles (grupos de 6)
        $xcadena = "";
        for ($xz = 0; $xz < 3; $xz++) {
            $xaux = substr($XAUX, $xz * 6, 6);
            $xi = 0;
            $xlimite = 6; // inicializo el Ytador de centenas xi y establezco el límite a 6 dígitos en la parte entera
            $xexit = true; // bandera para Ytrolar el ciclo del While
            while ($xexit) {
                if ($xi == $xlimite) { // si ya llegó al límite máximo de enteros
                    break; // termina el ciclo
                }

                $x3digitos = ($xlimite - $xi) * -1; // comienzo Y los tres primeros digitos de la cifra, comenzando por la izquierda
                $xaux = substr($xaux, $x3digitos, abs($x3digitos)); // obtengo la centena (los tres dígitos)
                for ($xy = 1; $xy < 4; $xy++) { // ciclo para revisar centenas, decenas y unidades, en ese orden
                    switch ($xy) {
                        case 1: // checa las centenas
                            if (substr($xaux, 0, 3) < 100) { // si el grupo de tres dígitos es menor a una centena ( < 99) no hace nada y pasa a revisar las decenas

                            } else {
                                $key = (int) substr($xaux, 0, 3);
                                if (TRUE === array_key_exists($key, $xarray)) {  // busco si la centena es número redondo (100, 200, 300, 400, etc..)
                                    $xseek = $xarray[$key];
                                    $xsub = $this->subfijo($xaux); // devuelve el subfijo correspondiente (Millón, Millones, Mil o nada)
                                    if (substr($xaux, 0, 3) == 100)
                                        $xcadena = " " . $xcadena . " CIEN " . $xsub;
                                    else
                                        $xcadena = " " . $xcadena . " " . $xseek . " " . $xsub;
                                    $xy = 3; // la centena fue redonda, entonces termino el ciclo del for y ya no reviso decenas ni unidades
                                } else { // entra aquí si la centena no fue numero redondo (101, 253, 120, 980, etc.)
                                    $key = (int) substr($xaux, 0, 1) * 100;
                                    $xseek = $xarray[$key]; // toma el primer caracter de la centena y lo multiplica por cien y lo busca en el arreglo (para que busque 100,200,300, etc)
                                    $xcadena = " " . $xcadena . " " . $xseek;
                                } // ENDIF ($xseek)
                            } // ENDIF (substr($xaux, 0, 3) < 100)
                            break;
                        case 2: // checa las decenas (Y la misma lógica que las centenas)
                            if (substr($xaux, 1, 2) < 10) {
                            } else {
                                $key = (int) substr($xaux, 1, 2);
                                if (TRUE === array_key_exists($key, $xarray)) {
                                    $xseek = $xarray[$key];
                                    $xsub = $this->subfijo($xaux);
                                    if (substr($xaux, 1, 2) == 20)
                                        $xcadena = " " . $xcadena . " VEINTE " . $xsub;
                                    else
                                        $xcadena = " " . $xcadena . " " . $xseek . " " . $xsub;
                                    $xy = 3;
                                } else {
                                    $key = (int) substr($xaux, 1, 1) * 10;
                                    $xseek = $xarray[$key];
                                    if (20 == substr($xaux, 1, 1) * 10)
                                        $xcadena = " " . $xcadena . " " . $xseek;
                                    else
                                        $xcadena = " " . $xcadena . " " . $xseek . " Y ";
                                } // ENDIF ($xseek)
                            } // ENDIF (substr($xaux, 1, 2) < 10)
                            break;
                        case 3: // checa las unidades
                            if (substr($xaux, 2, 1) < 1) { // si la unidad es cero, ya no hace nada

                            } else {
                                $key = (int) substr($xaux, 2, 1);
                                $xseek = $xarray[$key]; // obtengo directamente el valor de la unidad (del uno al nueve)
                                $xsub = $this->subfijo($xaux);
                                $xcadena = " " . $xcadena . " " . $xseek . " " . $xsub;
                            } // ENDIF (substr($xaux, 2, 1) < 1)
                            break;
                    } // END SWITCH
                } // END FOR
                $xi = $xi + 3;
            } // ENDDO

            if (substr(trim($xcadena), -5, 5) == "ILLON") // si la cadena obtenida termina en MILLON o BILLON, entonces le agrega al final la Yjuncion DE
                $xcadena .= " DE";

            if (substr(trim($xcadena), -7, 7) == "ILLONES") // si la cadena obtenida en MILLONES o BILLONES, entoncea le agrega al final la Yjuncion DE
                $xcadena .= " DE";

            // ----------- esta línea la puedes cambiar de acuerdo a tus necesidades o a tu país -------
            if (trim($xaux) != "") {
                switch ($xz) {
                    case 0:
                        if (trim(substr($XAUX, $xz * 6, 6)) == "1")
                            $xcadena .= "UN BILLON ";
                        else
                            $xcadena .= " BILLONES ";
                        break;
                    case 1:
                        if (trim(substr($XAUX, $xz * 6, 6)) == "1")
                            $xcadena .= "UN MILLON ";
                        else
                            $xcadena .= " MILLONES ";
                        break;
                    case 2:
                        if ($xcifra < 1) {
                            $xcadena = "$xdecimales/100 SOLES";
                        }
                        if ($xcifra >= 1 && $xcifra < 2) {
                            $xcadena = "UNO Y $xdecimales/100 SOLES ";
                        }
                        if ($xcifra >= 2) {
                            $xcadena .= " Y $xdecimales/100 SOLES "; //
                        }
                        break;
                } // endswitch ($xz)
            } // ENDIF (trim($xaux) != "")
            // ------------------      en este caso, para México se usa esta leyenda     ----------------
            $xcadena = str_replace("VEINTI ", "VEINTI", $xcadena); // quito el espacio para el VEINTI, para que quede: VEINTICUATRO, VEINTIUN, VEINTIDOS, etc
            $xcadena = str_replace("  ", " ", $xcadena); // quito espacios dobles
            $xcadena = str_replace("UN UN", "UN", $xcadena); // quito la duplicidad
            $xcadena = str_replace("  ", " ", $xcadena); // quito espacios dobles
            $xcadena = str_replace("BILLON DE MILLONES", "BILLON DE", $xcadena); // corrigo la leyenda
            $xcadena = str_replace("BILLONES DE MILLONES", "BILLONES DE", $xcadena); // corrigo la leyenda
            $xcadena = str_replace("DE UN", "UN", $xcadena); // corrigo la leyenda
        } // ENDFOR ($xz)
        return trim($xcadena);
    }

    public function get_header($username, $secret)
    {
       // Create a unique identifier, or nonce.
       // This example is used for simplicity in demonstration. Use a method
       // that guarantees uniqueness in a production environment.
       //$nonce = md5(rand());
       //$created = date("Y-m-d H:i:s");
       //$combo_string = $nonce . $created . $secret;
    
       // The sha1 command is not available in all versions of PHP.
       // If your version of PHP does not support this command, use
       //openssl directly with the command:
       // echo -n <string> | openssl dgst -sha1
       //$sha1_string = sha1($combo_string);
       //$password = base64_encode($sha1_string);
       $password=$secret;
       
       $headers = '<wsse:Security xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd">
          <wsse:UsernameToken xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">
             <wsse:Username>'.$username.'</wsse:Username>
             <wsse:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText">'.$password.'</wsse:Password>         
          </wsse:UsernameToken>
       </wsse:Security>';
       return $headers;
    }

    public function envio_json_cpe($ruta_json)
    {
        $sql_url = "SELECT * FROM ERP_Parametros WHERE id=22";
        $url = DB::select($sql_url);

        if(count($url) <= 0) {
            $texto = date("Y-m-d H:i:s");
            Storage::append("log.txt", $texto." No existe el parametro URL CPE FE");
            throw new Exception("No existe el parametro URL CPE FE");
        }
        
        $cliente = new  \nusoap_client($url[0]->value, true);

        $err = $cliente->getError();
        if ($err) {
            $texto = date("Y-m-d H:i:s");
            Storage::append("log.txt", $texto.' Error: ' . $err);
            die('Error: ' . $err);
        }
        $filename = $ruta_json; //nombre del archivo txt formato [99999999999]-[99]-[A000]-99999999.txt
       
        if (!file_exists(base_path("public/CPE/"))) {
            mkdir(base_path("public/CPE/"), 0777, true);
        }

        $pathRoot = base_path("public/CPE/"); //directorio local donde se generan los txt desde el sistema en PHP
        $sql_usuario = "SELECT * FROM ERP_Parametros WHERE id=20";
        $usuario = DB::select($sql_usuario);

        if(count($usuario) <= 0) {
            $texto = date("Y-m-d H:i:s");
            Storage::append("log.txt", $texto." No existe el parametro Usuario FE (RUC del emisor y usuario Sol concatenado) !");
            throw new Exception("No existe el parametro Usuario FE (RUC del emisor y usuario Sol concatenado) !");
        }

        $sql_pass = "SELECT * FROM ERP_Parametros WHERE id=21";
        $password = DB::select($sql_pass);

        if(count($password) <= 0) {
            $texto = date("Y-m-d H:i:s");
            Storage::append("log.txt", $texto." No existe el parametro Clave FE");
            throw new Exception("No existe el parametro Clave FE");
        }

        $username = $usuario[0]->value; //RUC del emisor y usuario Sol concatenado
        $password = $password[0]->value; //clave sol
        $contentfile = base64_encode(file_get_contents($pathRoot . $filename));
        $parametros = array('fileName' => $filename, 'contentFile' => $contentfile);
        $respuesta = $cliente->call("sendBill", $parametros, 'http://service.sunat.gob.pe', '', $this->get_header($username, $password));


        // print_r($respuesta); exit;

        $_strFaultCode = '';
        $_strFaultString = '';
        $_strContentFile = '';
        foreach ($respuesta as $key => $value) {
            switch ($key) {
                case 'faultcode':
                    $_strFaultCode = $value;
                    break;
                case 'faultstring':
                    $_strFaultString = $value;
                    break;
                case 'applicationResponse': //DEVOLVERA UN VALOR SI ESTA TODO CORRECTO
                    $_strContentFile = $value;
                    break;
                default:
                    $texto = date("Y-m-d H:i:s");
                    Storage::append("log.txt", $texto." sin respuesta");
                    $_strFaultString = "sin respuesta";
                   
                    // echo 'sin respuesta';
                    break;
            }
        }
        if (!(!isset($_strFaultCode) || trim($_strFaultCode) === '')) {
            #DEVUELVE CODIGO DE ERROR O RECHAZO
            // echo $_strFaultCode;
            // echo $_strFaultString;
            $response["status"] = "ei"; 
            $response["msg"] = $_strFaultCode.": ".$_strFaultString; 
            $texto = date("Y-m-d H:i:s");
            Storage::append("log.txt", $texto." _strFaultCode: ". $_strFaultCode. " _strFaultString:".$_strFaultString);
            return response()->json($response);

        } else if (!(!isset($_strContentFile) || trim($_strContentFile) === '')) { //si esta todo correcto devuelve el xml firmado y puede extraer el valor resumen
            $doc = new \DOMDocument;
            $doc->loadXML(base64_decode(array_values($respuesta)[0]));
            // echo $doc->getElementsByTagName('DigestValue')->item(0)->nodeValue; //obtiene el valor resumen codigo unico por comprobante enviado
            //  print_R($filename); exit;
           
            file_put_contents(base_path("public/XML/") .str_replace('.json', '.xml', $filename), base64_decode(array_values($respuesta)[0])); //grava en disco el archivo xml recepcionado
            #file_put_contents(str_replace('.txt','.xml',$filename), base64_decode(array_values($respuesta)[0]));
        }
    }

    public function generar_json_cpe($idventa, $caja_diaria_detalle_repo, $compania_repo, $solicitud_repositorio)
    {

        $json["invoice"] = array();
        $venta = $caja_diaria_detalle_repo->get_venta($idventa);
        $venta_detalle = $caja_diaria_detalle_repo->get_venta_detalle($idventa);
        $venta_anticipo = array();
        $solicitud_cronograma = array();

       

        if (!empty($venta[0]->cCodConsecutivo_solicitud) && !empty($venta[0]->nConsecutivo_solicitud)) {
            $venta_anticipo = $caja_diaria_detalle_repo->get_venta_anticipo($venta[0]->cCodConsecutivo_solicitud, $venta[0]->nConsecutivo_solicitud);
            $solicitud_cronograma = $solicitud_repositorio->get_solicitud_cronograma($venta[0]->cCodConsecutivo_solicitud, $venta[0]->nConsecutivo_solicitud);
        }

	

        $empresa = $compania_repo->find("00000");
		
        $parametro_igv =  $solicitud_repositorio->get_parametro_igv();

        if (count($parametro_igv) <= 0) {
            $texto = date("Y-m-d H:i:s");
            Storage::append("log.txt", $texto.' Por favor cree el parametro IGV!');
            throw new Exception("Por favor cree el parametro IGV!");
        }

		
        $json["invoice"]["tip_doc"] = $venta[0]->IdTipoDocumento;
        $json["invoice"]["serie"] = $venta[0]->serie_comprobante;
        $json["invoice"]["correl"] = str_pad($venta[0]->numero_comprobante, 8, "0", STR_PAD_LEFT);
        $json["invoice"]["fec_emi"] = $venta[0]->fecha_emision_server;
        $json["invoice"]["cod_mon"] = $venta[0]->EquivalenciaSunat;
        $json["invoice"]["tip_oper"] = "0101";
        $json["invoice"]["fec_ven"] = $venta[0]->fecha_emision_server;
        
        // $json["invoice"]["hora_emi"] = $venta[0]->hora_server;
        $json["invoice"]["ubl_version"] = "2.1";
        $json["invoice"]["customizacion"] = "2.0";
	
        $json["invoice"]["emisor"]["tip_doc"] = "6";
        $json["invoice"]["emisor"]["num_doc"] = $empresa->Ruc;
        $json["invoice"]["emisor"]["raz_soc"] = $empresa->RazonSocial;
        $json["invoice"]["emisor"]["dir"] = $empresa->Direccion;
        $json["invoice"]["emisor"]["cod_ubi"] = $empresa->ubigeo;
        $json["invoice"]["emisor"]["dep"] = $empresa->departamento;
        $json["invoice"]["emisor"]["prov"] = $empresa->provincia;
        $json["invoice"]["emisor"]["dist"] = $empresa->distrito;
        $json["invoice"]["emisor"]["cod_pais"] = "PE";
        $json["invoice"]["emisor"]["cod_sucur"] = "0000";

        $json["invoice"]["adquiriente"]["tip_doc"] = (string)(int)$venta[0]->tipodoc;
        $json["invoice"]["adquiriente"]["num_doc"] = $venta[0]->documento;
        $json["invoice"]["adquiriente"]["raz_soc"] = $venta[0]->razonsocial_cliente;
        $json["invoice"]["adquiriente"]["dir"] = $venta[0]->direccion;
        $json["invoice"]["adquiriente"]["cod_pais"] = "PE";

       
        $json["invoice"]["tot"]["exo"] = sprintf('%.2f', round($venta[0]->t_monto_exonerado, 2));
        $json["invoice"]["tot"]["val_vent"] = sprintf('%.2f', round($venta[0]->t_monto_total, 2));
        $json["invoice"]["tot"]["imp_tot"] = sprintf('%.2f', round($venta[0]->t_monto_total, 2));
        $json["invoice"]["tot"]["prec_tot"] = sprintf('%.2f', round($venta[0]->t_monto_total, 2));
        $json["invoice"]["tot"]["impsto_tot"] = sprintf('%.2f', round($venta[0]->t_impuestos, 2));
        $json["invoice"]["tot"]["trib_exo"] = "0.00"; //TRIBUTOS OPERACIONES EXONERADAS
        // echo $venta[0]->comprobante_x_saldo;
        if ($venta[0]->comprobante_x_saldo == "S" && $venta[0]->tipo_comprobante == "0") { // por el saldo, segunda boleta
            $json["invoice"]["tot"]["antic"] = sprintf('%.2f', round($venta[0]->anticipo, 2));

            // $json["invoice"]["cargo"][0]["cod_cd"] = "";
            // $json["invoice"]["cargo"][0]["factor_cd"] = "";
            // $json["invoice"]["cargo"][0]["monto_cd"] = "";
            // $json["invoice"]["cargo"][0]["base_cd"] = "";

            $json["invoice"]["ant"][0]["imp_prepagado"] = sprintf('%.2f', round($venta_anticipo[0]->t_monto_total, 2));
            $json["invoice"]["ant"][0]["tip_doc_ant"] = $venta_anticipo[0]->IdTipoDocumento;
            $json["invoice"]["ant"][0]["serie_correl"] = $venta_anticipo[0]->serie_comprobante;
            $json["invoice"]["ant"][0]["num_doc"] = $venta_anticipo[0]->numero_comprobante;
            $json["invoice"]["ant"][0]["tip_doc"] = $venta_anticipo[0]->tipodoc;
            $json["invoice"]["ant"][0]["moneda"] = $venta_anticipo[0]->EquivalenciaSunat;
            $json["invoice"]["ant"][0]["fec_pago"] = $venta_anticipo[0]->fecha_emision_server;
        }
       
		
        // echo "holsa"; exit;
        if ($venta[0]->codcondicionpago == 1) { // contado
            $json["invoice"]["forma_pago"]["descrip"] = "Contado";
           
        } else { // credito
            $json["invoice"]["forma_pago"]["descrip"] = "Crédito";
            $json["invoice"]["forma_pago"]["monto_neto"] = sprintf('%.2f', round($venta[0]->t_monto_total, 2));
            $json["invoice"]["forma_pago"]["cod_mon"] = $venta[0]->EquivalenciaSunat;

            if(count($solicitud_cronograma) > 0) {
                $json["invoice"]["cuota"] = array();
                $cuotas = array();
            }
         
            foreach ($solicitud_cronograma as $key => $value) {
                $cuotas["descrip"] = "Cuota " . $value->nrocuota;
                $cuotas["monto_neto"] = sprintf('%.2f', round($value->valor_cuota, 2));
                $cuotas["cod_mon"] = $venta[0]->EquivalenciaSunat;
                $cuotas["fec_venc"] = $value->fecha_vencimiento_credito;

                array_push($json["invoice"]["cuota"], $cuotas);
            }
        }
       
     

        $json["invoice"]["det"] = array();
      
        $detalle_venta = array();
        $cont = 1;
        foreach ($venta_detalle as $key => $value) {

            $detalle_venta["nro_item"] = $cont;
            $detalle_venta["cod_prod"] = str_pad($value->idarticulo, 8, "0", STR_PAD_LEFT);
            $detalle_venta["cod_und_med"] =  $value->unidad_medida;
            $detalle_venta["descrip"] = $value->producto;
            $detalle_venta["cant"] = sprintf('%.2f', round($value->cantidad, 2));
            $detalle_venta["val_unit_item"] = sprintf('%.2f', round($value->precio_unitario, 2));

            $detalle_venta["val_vta_item"] = sprintf('%.2f', round($value->precio_total, 2));
            $detalle_venta["igv_item"] = sprintf('%.2f', round($value->impuestos, 2));
            $detalle_venta["prec_unit_item"] = sprintf('%.2f', round($value->precio_unitario, 2));
            $detalle_venta["tip_afec_igv"] = "20"; // 10 con igv, 20 sin igv, catalogo 7
            $detalle_venta["impsto_tot"] = sprintf('%.2f', round($value->impuestos, 2));
            $detalle_venta["base_igv"] = sprintf('%.2f', round($value->precio_total, 2));
            $detalle_venta["tasa_igv"] = sprintf('%.2f', round($parametro_igv[0]->value, 2));

            $cont++;
            array_push($json["invoice"]["det"], $detalle_venta);
        }

       
        $json["invoice"]["leyen"][0]["leyen_cod"] = "1000";
       
       
        $json["invoice"]["leyen"][0]["leyen_descrip"] = $this->convertir($venta[0]->t_monto_total);
       
        if ($venta[0]->comprobante_x_saldo == "S" && $venta[0]->tipo_comprobante == "0") { // por el saldo, segunda boleta
            $json["invoice"]["leyen"][1]["leyen_cod"] = "2002";
            $json["invoice"]["leyen"][1]["leyen_descrip"] = "SERVICIOS PRESTADOS EN LA AMAZONÍA  REGIÓN SELVA PARA SER CONSUMIDOS EN LA MISMA";

            $json["invoice"]["leyen"][2]["leyen_descrip"] = "No se aceptan cambios ni devoluciones";
        } else {
            // if($venta[0]->t_monto_exonerado > 0) {
            //     $json["invoice"]["leyen"][1]["leyen_cod"] = "2001";
            //     $json["invoice"]["leyen"][1]["leyen_descrip"] = "BIENES TRANSFERIDOS EN LA AMAZONIA REGION SELVA PARA SER CONSUMIDOS EN LA MISMA";
            // }
           
        }
     
        $json_encode = json_encode($json, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

        if (!file_exists(base_path("public/CPE/"))) {
            mkdir(base_path("public/CPE/"), 0777, true);
        }

        $name = $empresa->Ruc . "-" . $venta[0]->IdTipoDocumento . "-" . $venta[0]->serie_comprobante . "-" . str_pad($venta[0]->numero_comprobante, 8, "0", STR_PAD_LEFT);
        file_put_contents(base_path("public/CPE/") . $name . ".json", $json_encode);
      
        $this->envio_json_cpe($name . ".json");
        
    }

    public function consultar_cdr($documento_cpe) {
        // consultar comprobantes
        // https://emite.tuscomprobantes.pe/
        // 20450106357
        // usuario: casociadmin  clave: 765419
        $sql_url = "SELECT * FROM ERP_Parametros WHERE id=22";
        $url = DB::select($sql_url);

        if(count($url) <= 0) {
            $texto = date("Y-m-d H:i:s");
            Storage::append("log.txt", $texto.' No existe el parametro URL CPE FE');
            throw new Exception("No existe el parametro URL CPE FE");
        }
        
        $cliente = new  \nusoap_client($url[0]->value, true);

        if (!file_exists(base_path("public/CDR/"))) {
            mkdir(base_path("public/CDR/"), 0777, true);
        }
        
        $err = $cliente->getError();
        if($err){
            $texto = date("Y-m-d H:i:s");
            Storage::append("log.txt", $texto.' Error: '.$err);
            die('Error: '.$err);
        }
        $filename = $documento_cpe.'.xml'; //nombre del archivo txt formato [99999999999]-[99]-[A000]-99999999.xml
        //$pathRoot = 'C:/Users/Javier/Documents/app/'; //directorio local donde se generan los xml del cdr desde el sistema en PHP 

        $sql_usuario = "SELECT * FROM ERP_Parametros WHERE id=20";
        $usuario = DB::select($sql_usuario);

        if(count($usuario) <= 0) {
            $texto = date("Y-m-d H:i:s");
            Storage::append("log.txt", $texto." No existe el parametro Usuario FE (RUC del emisor y usuario Sol concatenado) !");
            throw new Exception("No existe el parametro Usuario FE (RUC del emisor y usuario Sol concatenado) !");
        }
        
        $sql_pass = "SELECT * FROM ERP_Parametros WHERE id=21";
        $password = DB::select($sql_pass);

        if(count($password) <= 0) {
            $texto = date("Y-m-d H:i:s");
            Storage::append("log.txt", $texto." No existe el parametro Clave FE");
            throw new Exception("No existe el parametro Clave FE");
        }

        $username = $usuario[0]->value; //USUARIO DEL API por empresa, solicitar a jmariscal@seencorp.pe
        $password = $password[0]->value; //CLAVE DEL API por empresa, solicitar a jmariscal@seencorp.pe

        $parametros = array('fileName'=>$filename);
        $respuesta=$cliente->call("getStatusCdr",$parametros,'http://service.sunat.gob.pe','',$this->get_header($username, $password));

		// print_R($respuesta);

        $_strFaultCode='';
        $_strFaultString='';
        $_strContentFile='';
        $_strStatusCode='';
        foreach ($respuesta as $key => $value){
            switch($key){
                case 'faultcode':
                    $_strFaultCode=$value;
                    break;
                case 'faultstring':
                    $_strFaultString=$value;
                break;
                case 'applicationResponse':
                    $_strContentFile=$value;	
                break;
                case 'statusCdr':
                    foreach ($value as $key2 => $value2){
                        switch($key2){
                            case 'content':
                                $_strContentFile=$value2;	
                            break;
                            case 'statusCode':
                                $_strStatusCode=$value2;	
                            break;
                        }
                    }			
                break;
                default:		
                    $texto = date("Y-m-d H:i:s");
                    Storage::append("log.txt", $texto." sin respuesta");
                    // exit;
                    // echo 'sin respuesta';
                break;
                
            }
        }

        
        ############################
        #obtener codigo 
        ############################
        // var_dump($_strFaultCode);
        // var_dump($_strContentFile);
       
        if(!(!isset($_strFaultCode) || trim($_strFaultCode)==='')){
           
            echo $_strFaultCode.'<br>'; #codigo de error|
            echo $_strFaultString.'<br>'; #descripcion del error

            $texto = date("Y-m-d H:i:s");
            Storage::append("log.txt", $texto." _strFaultCode: ". $_strFaultCode. " _strFaultString:".$_strFaultString);
            exit;
        }else if(!(!isset($_strContentFile) || trim($_strContentFile)==='')){
            #cuando devuelve cdr
            $doc = new \DOMDocument;
            $doc->loadXML(base64_decode($_strContentFile));
           
            // echo $doc->getElementsByTagName('DigestValue')->item(0)->nodeValue;	#valor resumen del cdr
            // echo $_strStatusCode; #codigo de respuesta del cdr
            #graba el archuvo CDR de respuesta de SUNAT
            
            file_put_contents(base_path("public/CDR/").'R-'.$filename, base64_decode($_strContentFile));
            
        }
       
		// exit;
        return $respuesta;

    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle(VentasInterface $ventas_repo, SolicitudInterface $solicitud_repositorio, CompaniaInterface $compania_repo, CajaDiariaDetalleInterface $repo)
    {
        // referencia: https://www.youtube.com/watch?v=0uG0B5HqiuA&ab_channel=JesusMatiz
        
        $comprobantes_pendientes_envio = $ventas_repo->obtener_comprobantes_pendientes_envio();
        
        foreach ($comprobantes_pendientes_envio as $key => $value) {
         
            $this->generar_json_cpe($value->idventa, $repo, $compania_repo, $solicitud_repositorio);
           
            $sql_update = "UPDATE ERP_Venta SET enviado_cpe=1 WHERE idventa={$value->idventa}";
            DB::statement($sql_update);
           
        }

    
        $comprobantes = $ventas_repo->obtener_comprobantes();
    
        foreach ($comprobantes as $key => $value) {
            $res = $this->consultar_cdr($value->documento_cpe);
            if(isset($res["statusCdr"]["statusMessage"]) && isset($res["statusCdr"]["statusCode"])) {
                $statusMessage = utf8_decode(str_replace("'", "", $res["statusCdr"]["statusMessage"]));
                $sql_update = "UPDATE ERP_Venta SET statusCode='{$res["statusCdr"]["statusCode"]}', statusMessage='{$statusMessage}' WHERE idventa={$value->idventa}";
                DB::statement($sql_update);
            }
           
            // print_r($sql_update);
        }
      
        $texto = date("Y-m-d H:i:s");
        Storage::append("log.txt", $texto);
        // exit;
    }

   
}
