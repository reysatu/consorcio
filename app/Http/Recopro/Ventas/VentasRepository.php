<?php

/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:56 PM
 */

namespace App\Http\Recopro\Ventas;

use Illuminate\Support\Facades\DB;

class VentasRepository implements VentasInterface
{
    protected $model;
    private static $_ACTIVE = 'A';
    public function __construct(Ventas $model)
    {
        $this->model = $model;
    }

    public function search($s)
    {
        return $this->model->orWhere(function ($q) use ($s) {
            $q->where('serie_comprobante', 'LIKE', '%' . $s . '%')
                ->where('numero_comprobante', 'LIKE', '%' . $s . '%')
                ->where('fecha_emision', 'LIKE', '%' . $s . '%')
                ->where('numero_documento', 'LIKE', '%' . $s . '%');
        })->orderBy('fecha_emision', 'DESC');
    }

    public function search_creditos($s)
    {   
      

        return $this->model->orWhere(function ($q) use ($s) {
             $q->whereIn('estado', [2, 4])
                ->where('serie_comprobante', 'LIKE', '%' . $s . '%')
                ->where('numero_comprobante', 'LIKE', '%' . $s . '%')
                ->where('fecha_emision', 'LIKE', '%' . $s . '%')
                ->where('numero_documento', 'LIKE', '%' . $s . '%');
        })->orderBy('fecha_emision', 'DESC');
    }


    public function search_documentos($s)
    {
        return $this->model->orWhere(function ($q) use ($s) {
            $q->whereIn('IdTipoDocumento', ['01', '03', '07', '08'])
                ->where('serie_comprobante', 'LIKE', '%' . $s . '%')
                ->where('numero_comprobante', 'LIKE', '%' . $s . '%')
                ->where('fecha_emision', 'LIKE', '%' . $s . '%')
                ->where('numero_documento', 'LIKE', '%' . $s . '%');
        })->orderBy('fecha_emision', 'DESC');
    }
 

    public function all()
    {
        return $this->model->all();
    }

    public function create(array $attributes)
    {
        $attributes['user_created'] = auth()->id();
        $attributes['user_updated'] = auth()->id();
        // print_r($attributes); exit;
        return $this->model->create($attributes);
    }
    public function allActive()
    {

        return $this->model->where('estado', self::$_ACTIVE)->get();
    }

    public function update($id, array $attributes)
    {
        // print_r($attributes); exit;
        $attributes['user_updated'] = auth()->id();
        $model                      = $this->model->findOrFail($id);
        $model->update($attributes);
    }

    public function find($id)
    {
        return $this->model->find($id);
    }

    public function destroy($id)
    {
        $attributes                 = [];
        $attributes['user_deleted'] = auth()->id();
        $model                      = $this->model->findOrFail($id);
        $model->update($attributes);
        $model->delete();
    }

    public function find_documento($idventa) {
        $sql = "SELECT v.*, c.*, c.razonsocial_cliente AS cliente 
        FROM ERP_Venta AS v
        INNER JOIN ERP_Clientes AS c ON(c.id=v.idcliente)
        WHERE v.idventa={$idventa}";

        return DB::select($sql);
    }

    public function get_motivos() {
        $sql = "SELECT * 
        FROM ERP_Motivos 
        WHERE estado='A'";

        return DB::select($sql);
    }

    public function get_consecutivo($table,$id)
    {     $mostrar=DB::select("select top 1 * from $table order by CONVERT(INT, $id) DESC");
         $actu=0;
         if(!$mostrar){
            $actu=0;
         }else{
            $actu=intval($mostrar[0]->$id);
         };
        $new=$actu+1;
        return $new; 
    }


    public function update_saldos_venta($data) {
        $sql_update = "UPDATE ERP_Venta SET saldo = saldo - {$data["monto"]}
        WHERE cCodConsecutivo_solicitud='{$data["cCodConsecutivo"]}' AND nConsecutivo_solicitud={$data["nConsecutivo"]} AND anticipo > 0";

        $result = DB::statement($sql_update);
        
        return $result; 
    }

}
