<?php

namespace App\Http\Controllers;

use App\Models\BaseModel;
use Exception;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\DB;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    public function __construct()
    {
        $this->base_model = new BaseModel();
    }

    public function listar_campos($tabla)
    {


        $campos = array();
        $is_primary_key = array();
        $is_foreign_key = array();
        $tabla = explode(".", $tabla);

        $schema = $tabla[0];
        $table = $tabla[1];

        $sql = "SELECT cols.column_name, cols.data_type, pk.is_primary_key, fk.is_foreign_key
        FROM information_schema.columns cols
        LEFT JOIN (SELECT schema_name(tab.schema_id) as [schema_name], 
        pk.[name] as pk_name,
        ic.index_column_id as column_id,
        col.[name] as column_name, 
        tab.[name] as table_name,
        pk.is_primary_key
        FROM sys.tables tab
        INNER JOIN sys.indexes pk ON tab.object_id = pk.object_id  AND pk.is_primary_key = 1
        INNER JOIN sys.index_columns ic ON ic.object_id = pk.object_id AND ic.index_id = pk.index_id
        INNER JOIN sys.columns col ON pk.object_id = col.object_id AND col.column_id = ic.column_id	
        ) AS pk ON(pk.column_name = cols.column_name AND pk.table_name=cols.table_name)
        LEFT JOIN (SELECT  obj.name AS FK_NAME,
            sch.name AS [schema_name],
            tab1.name AS [table],
            col1.name AS [column],
            tab2.name AS [referenced_table],
            col2.name AS [referenced_column],
            1 AS is_foreign_key
        FROM sys.foreign_key_columns fkc
        INNER JOIN sys.objects obj ON obj.object_id = fkc.constraint_object_id
        INNER JOIN sys.tables tab1 ON tab1.object_id = fkc.parent_object_id
        INNER JOIN sys.schemas sch  ON tab1.schema_id = sch.schema_id
        INNER JOIN sys.columns col1  ON col1.column_id = parent_column_id AND col1.object_id = tab1.object_id
        INNER JOIN sys.tables tab2 ON tab2.object_id = fkc.referenced_object_id
        INNER JOIN sys.columns col2 ON col2.column_id = referenced_column_id AND col2.object_id = tab2.object_id) AS fk ON(fk.[table] = cols.table_name AND fk.[column] = cols.column_name)


        WHERE cols.table_schema='{$schema}' AND cols.table_name= '{$table}'";
        // die($sql);
        $result = DB::select($sql);

        foreach ($result as $key => $value) {
            array_push($campos, $value->column_name);
            array_push($is_primary_key, $value->is_primary_key);
            array_push($is_foreign_key, $value->is_foreign_key);
        }

        $data = array();
        $data["campos"] = $campos;
        $data["is_primary_key"] = $is_primary_key;
        $data["is_foreign_key"] = $is_foreign_key;

        return $data;
    }

    public function preparar_datos($table, $data)
    {

        $parametros = array();


        $fields = $this->listar_campos($table);
        $primary_key = array();
        $foreign_key = array();

        $datos = array();

        for ($i = 0; $i < count($fields["campos"]); $i++) {

            if (isset($data[$fields["campos"][$i]])) {

                $datos[$fields["campos"][$i]] = $data[$fields["campos"][$i]];

                if ($fields["is_primary_key"][$i] == "1") {
                    if (!is_array($data[$fields["campos"][$i]])) {
                        $primary_key[$fields["campos"][$i]] = $data[$fields["campos"][$i]];
                    } else {
                        if ($fields["is_primary_key"][$i] == "1") {
                            for ($j = 0; $j < count($data[$fields["campos"][$i]]); $j++) {
                                if (isset($data[$fields["campos"][$i]]) && $data[$fields["campos"][$i]] != "" && $data[$fields["campos"][$i]] != "null") {
                                    $primary_key[$j][$fields["campos"][$i]] = $data[$fields["campos"][$i]][$j];
                                } else {
                                    $primary_key[$j][$fields["campos"][$i]] = NULL;
                                }
                            }
                        }
                    }
                }


                if ($fields["is_foreign_key"][$i] == "1") {
                    $foreign_key[$fields["campos"][$i]] = $data[$fields["campos"][$i]];
                }
            }
        }

        $contador = 0;
        foreach ($datos as $key => $value) {
            if (in_array($key, $fields["campos"])) {
                if (is_array($value) && count($value) > 0) {
                    $contador = count($value);
                    for ($i = 0; $i < count($value); $i++) {
                        if (isset($value[$i]) && $value[$i] != "" && $value[$i] != "null") {
                            @$parametros["datos"][$i][$key] = $value[$i];
                        } else {
                            @$parametros["datos"][$i][$key] = NULL;
                        }
                    }
                } elseif ($value != "" && $value != "null") {
                    $parametros["datos"][0][$key] = $value;
                }
            }
        }

        foreach ($datos as $key => $value) {
            if (in_array($key, $fields["campos"])) {
                if (!is_array($value) && $contador > 0) {

                    for ($i = 0; $i <  $contador; $i++) {
                        if (isset($value) && $value != "" && $value != "null") {
                            @$parametros["datos"][$i][$key] = $value;
                        } else {
                            @$parametros["datos"][$i][$key] = NULL;
                        }
                    }
                }
            }
        }



        $parametros["primary_key"] = $primary_key;
        $parametros["foreign_key"] = $foreign_key;
        $parametros["tabla"] = $table;
        return $parametros;
    }


    // $fecha en formato yyyy-mm-dd
    public function sumar_restar_dias($fecha, $operacion, $dias)
    {

        $fecha = strtotime($operacion . $dias . " day", strtotime($fecha));
        $fecha = date("Y-m-d", $fecha);
        $date  = explode("-", $fecha);
        $mes   = $date[1];
        if ($date[1] < 0) {
            $mes = "0" . $mes;
        }

        $dia = $date[2];
        if ($date[2] < 0) {
            $dia = "0" . $dia;
        }

        return $date[0] . "-" . $mes . "-" . $dia;
    }


    public function SubirArchivo($archivo, $ruta, $newname = "")
    {
        $archivo = (array) $archivo;
        // print_r($archivo);
        ini_set('memory_limit', '2024M');
        ini_set('upload_max_filesize', '2024M');
        $dir_subida = $ruta;

        if ($newname != "") {
            $exts = explode(".", $archivo['name']);

            if (count($exts) > 0) {
                $ext = $exts[count($exts) - 1];
            } else {
                $ext = "jpg";
            }

            $filename = $newname . "." . $ext;
        } else {
            $filename = $archivo['name'];
        }

        $fichero_subido = $dir_subida . basename($filename);
        //SI NO EXISTE LA CARPETA LO CREAMOS CON TODOS LOS PERMISOS
        if (!file_exists($ruta)) {
            mkdir($ruta, 0777, true);
        }

        $response = array();
        if (move_uploaded_file($archivo['tmp_name'], $fichero_subido)) {
            chmod($fichero_subido, 0777);
            $response["response"]   = "OK";
            $response["NombreFile"] = $filename;
        } else {
            $response["response"]   = "ERROR";
            $response["NombreFile"] = $filename;
        }
        return $response;
    }

    // $tipo: R -> nota emitida desde refinanciamiento
    // $tipo: N -> nota emitida desde modulo de documentos emitidos
    public function emitir_nota($data, $caja_diaria_detalle_repo, $caja_diaria_repositorio, $Repo, $repoCC, $tipo = "N")
    {

        $result = array();
        $venta_ref = $caja_diaria_detalle_repo->get_venta($data["idventa"]);

        $parametro_igv =  $caja_diaria_detalle_repo->get_parametro_igv();
            
        if(count($parametro_igv) <= 0) {
            throw new Exception("Por favor cree el parametro IGV!");
        }

        $condicion = $data["t_monto_total"] == $data["monto"]; // VENTA AL CONTADO
        $saldo = 0;
        if (count($venta_ref) > 0) {
            $saldo = $venta_ref[0]->saldo;

            if ($venta_ref[0]->condicion_pago != 1) {
                $condicion = $venta_ref[0]->saldo == $data["monto"]; // VENTA CREDITO
            }
        }

        $data_venta                        = $data;
        $data_venta["por_aplicar"] = "N";
        $data_venta["idventa_referencia"]  = $data["idventa"];
        $data_venta["devolucion_producto"] = 0;
        $data_venta["devolucion_dinero"] = 0;
        //si son iguales
        if ($condicion) {

            // solo si es anticipo se devuelve el dinero
            if ($data["tipo_comprobante"] == "1") {
                $this->devolver_dinero($caja_diaria_detalle_repo, $caja_diaria_repositorio, $data);

                $data_venta["devolucion_producto"] = 0;
                $data_venta["devolucion_dinero"] = 1;
            }

            if ($data["tipo_comprobante"] == "0" && $data["anticipo"] > 0) { // esta codicion aplica a la segunda boleta por el saldo
                $data_venta["por_aplicar"] = "S";
                $data_venta["devolucion_producto"] = 1;
            }

            if ($data["tipo_comprobante"] == "0") {
                if (count($venta_ref) > 0 && $venta_ref[0]->saldo == 0) {
                    $data_venta["por_aplicar"] = "S";
                }
            }

            if ($data["condicion_pago"] == "1") {

                $data_venta["devolucion_producto"] = 1;
            }
        } elseif ($saldo > $data["monto"]) {
            if ($data["condicion_pago"] == "1") { // venta al contado contado
                $this->devolver_dinero($caja_diaria_detalle_repo, $caja_diaria_repositorio, $data);
                $data_venta["devolucion_dinero"] = 1;
            }
        }

        $data_venta["idventa"]                   = $Repo->get_consecutivo("ERP_Venta", "idventa");
        $data_venta["cCodConsecutivo_solicitud"] = $data["cCodConsecutivo"];
        $data_venta["nConsecutivo_solicitud"]    = $data["nConsecutivo"];
        $data_venta["condicion_pago"]            = 1;
        $data_venta["fecha_emision"]             = date("Y-m-d H:i:s");

        $data_venta["tipo_comprobante"] = "0";

        $data_venta["IdTipoDocumento"] = "07";

        $data_venta["t_monto_subtotal"] = $data["monto"];

        $data_venta["t_monto_total"] = $data["monto"];

        $data_venta["saldo"]  = "0";
        $data_venta["pagado"] = $data["monto"];
        $data["anticipo"]     = 0;

        $data_venta["idcajero"] = auth()->id();
        $data_venta["idtienda"] = $caja_diaria_detalle_repo->get_caja_diaria()[0]->idtienda;
        $data_venta["idcaja"]   = $caja_diaria_detalle_repo->get_caja_diaria()[0]->idcaja;
        // print_r($data_venta);
        $result = $this->base_model->insertar($this->preparar_datos("dbo.ERP_Venta", $data_venta));

        $venta_detalle = $caja_diaria_detalle_repo->get_venta_detalle($data["idventa"]);
        // print_r($venta_detalle); exit;
        // TOTALIZAMOS LOS PRECIOS TOTALES DEL DETALLA SOLICITUD ARTICULO
        $suma_precio_total = 0;
        for ($vd = 0; $vd < count($venta_detalle); $vd++) {
            if ($venta_detalle[$vd]->cOperGrat != "S") {
                $suma_precio_total += (float)$venta_detalle[$vd]->precio_total;
            }
        }


        foreach ($venta_detalle as $key => $value) {
            $data_detalle_venta            = (array) $value;
            $data_detalle_venta["idventa"] = $data_venta["idventa"];


            //PORRATEAMOS
            $porcentaje = $value->precio_total / $suma_precio_total;
            $subtotal = $data["monto"] * $porcentaje;

            $data_detalle_venta["precio_total"] = 0;
            $data_detalle_venta["monto_descuento"] = 0;
            $data_detalle_venta["monto_subtotal"] = 0;
            $data_detalle_venta["impuestos"] = 0;
            $data_detalle_venta["monto_afecto"] = 0;
            $data_detalle_venta["monto_exonerado"] = 0;
            $data_detalle_venta["monto_inafecto"] = 0;
            $data_detalle_venta["monto_total"] = 0;

            if ($value->cOperGrat != "S") {
                $data_detalle_venta["precio_unitario"] = round($subtotal / $value->cantidad, 2);
                // echo $data_detalle_venta["precio_unitario"];
                $data_detalle_venta["precio_total"] = round($subtotal, 2);
                $data_detalle_venta["monto_subtotal"] = round($subtotal, 2);


                if ($value->impuestos > 0) {
                    $igv = $parametro_igv[0]->value;
                    $data_detalle_venta["impuestos"] = $subtotal * $igv / 100;
                    $data_detalle_venta["monto_afecto"]  = $subtotal;
                } else {
                    $data_detalle_venta["monto_exonerado"] = $subtotal;
                }

                $data_detalle_venta["monto_total"] = $data_detalle_venta["monto_exonerado"] + $data_detalle_venta["monto_afecto"] + $data_detalle_venta["impuestos"];
            } else {
                $data_detalle_venta["precio_unitario"] = round($value->precio_unitario, 2);
            }


            $data_detalle_venta["nOperGratuita"] = 0;
            if ($value->cOperGrat == "S") {

                $data_detalle_venta["nOperGratuita"] = round($subtotal, 2);
            }

            $data_detalle_venta["monto_descuento_prorrateado"] = 0;
            // echo "data detalle nota credito ". $data["monto"]. " ".$subtotal. " ".$porcentaje;
            // print_r($data_detalle_venta);
            // print_r($this->preparar_datos("dbo.ERP_VentaDetalle", $data_detalle_venta));
            $this->base_model->insertar($this->preparar_datos("dbo.ERP_VentaDetalle", $data_detalle_venta));
        }
        // exit;

        //ACTUALIZAR SALDOS EN LA SEGUNDA VENTA POR EL SALDO
        $update_venta                    = array();
        $update_venta["cCodConsecutivo"] = $data["cCodConsecutivo"];
        $update_venta["nConsecutivo"]    = $data["nConsecutivo"];
        $update_venta["monto"]           = $data["monto"];
        $Repo->update_saldos_venta($update_venta);


        if ($tipo == "N") {
            // ANULAMOS LA SOLICITUD
            $update_solicitud = array();
            $update_solicitud["cCodConsecutivo"] = $data["cCodConsecutivo"];
            $update_solicitud["nConsecutivo"]    = $data["nConsecutivo"];
            $update_solicitud["estado"] = 10;
            $this->base_model->modificar($this->preparar_datos("dbo.ERP_Solicitud", $update_solicitud));
        }



        if ($tipo == "R") {
            // CUANDO LA NOTA SE EMITE DESDE UN REFINANCIAMIENTO POR el SALDO YA NO SE ANULA LA SOLIICTUD ORIGINAL
            $sql_update = "UPDATE ERP_Solicitud SET saldo = saldo - {$data["monto"]},
            pagado = pagado + {$data["monto"]}, estado=9    
            WHERE cCodConsecutivo='{$data["cCodConsecutivo"]}' AND nConsecutivo={$data["nConsecutivo"]}";
            // die($sql_update);
            DB::statement($sql_update);
        }


        $repoCC->actualizar_correlativo($data["serie_comprobante"], $data["numero_comprobante"]);
        return $result;
    }
}
