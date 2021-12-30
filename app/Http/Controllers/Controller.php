<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\DB;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function listar_campos($tabla) {

        $campos = array();
        $tabla = explode(".", $tabla);
        
        $schema = $tabla[0];
        $table = $tabla[1];

        $sql = "SELECT cols.column_name, cols.data_type
        FROM information_schema.columns cols
        WHERE cols.table_schema='{$schema}' AND cols.table_name= '{$table}'";

        $result = DB::select($sql);

        foreach ($result as $key => $value) {
            array_push($campos, $value->column_name);
        }

        return $campos;
    }
    
    public function preparar_datos($table, $data, $tipoTabla = 'N') {

        $parametros = array();

      
        $fields = $this->listar_campos($table);
       
        $datos = array();
     
        for ($i = 0; $i < count($fields); $i++) {
            if (isset($data[$fields[$i]])) {
                $datos[$fields[$i]] = $data[$fields[$i]];
            }
        }


        if ($tipoTabla == "D") {
            $cantElementos = (is_array(array_values($datos)[1])) ? count(array_values($datos)[1]) : 0;
            $primer_key    = array_keys($datos)[0];
            $primer_value  = array_values($datos)[0];
            for ($i = 0; $i < $cantElementos; $i++) {
                $parametros["datos"][$i][$primer_key] = $primer_value;
            }
        }
      
       
        if ($tipoTabla == "D") {

            for ($i = 0; $i < $cantElementos; $i++) {
                foreach ($datos as $key => $value) {
                    if ($primer_key != $key) {
                       
                        if (in_array($key, $fields)) {
                          
                            if(isset($value[$i]) && $value[$i] != "" && $value[$i] != "null") {
                            
                                @$parametros["datos"][$i][$key] = $value[$i];
                            } else {
                                @$parametros["datos"][$i][$key] = NULL;
                            }
                            
                        }
                    }
                }

            }
        } elseif ($tipoTabla == "N") {
           
            foreach ($datos as $key => $value) {
                if (in_array($key, $fields)) {
                   
                    if ($value != "" && $value != "null") {
                       
                        $parametros["datos"][0][$key] = $value; 
                      
                    } else {
                      
                    }
                }

            }

        }

     
        $parametros["tabla"] = $table;

        return $parametros;
    }
}
