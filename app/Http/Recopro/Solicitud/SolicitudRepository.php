<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:56 PM
 */

namespace App\Http\Recopro\Solicitud;

use Illuminate\Support\Facades\DB;

class SolicitudRepository implements SolicitudInterface
{
    protected $model;
    private static $_ACTIVE = 'A';
    public function __construct(Solicitud $model)
    {
        $this->model = $model;
    }

    public function search($s)
    {
        return $this->model->orWhere(function($q) use ($s){
            $q->where('cCodConsecutivo', 'LIKE', '%'.$s.'%')
            ->where('nConsecutivo', 'LIKE', '%'.$s.'%')
            ->where('fecha_solicitud', 'LIKE', '%'.$s.'%')
            ->where('tipo_solicitud', 'LIKE', '%'.$s.'%');
        });
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
        $model = $this->model->findOrFail($id);
        $model->update($attributes);
    }

    public function find($id)
    {
        return $this->model->find($id);
    }

    public function destroy($id)
    {
        $attributes = [];
        $attributes['user_deleted'] = auth()->id();
        $model = $this->model->findOrFail($id);
        $model->update($attributes);
        $model->delete();
    }

    public function getcodigo(){
   
        $mostrar3=DB::select("select * from ERP_Consecutivos where cCodTipoCons='SOLICITUD'");
        return $mostrar3;
  }

    public function getcondicion_pago(){
   
        $mostrar3=DB::select("select * from ERP_CondicionPago");
        return $mostrar3;
    }

    public function get_cliente($idCliente)
    { 
      $mostrar3=DB::select("select * from ERP_Clientes where id='$idCliente'");
      return $mostrar3;

    }

    public function gettipo_document(){
   
        $mostrar3=DB::select("select cCodigo Codigo, cDescripcion TipoDocumento from ERP_TABLASUNAT where cnombretabla = 'TIPO_DOCUMENTO'");
        return $mostrar3;
    }

     public function getmoneda(){
   
          $mostrar3=DB::select("SELECT * FROM ERP_Moneda where estado='A'");
          return $mostrar3;
    }
}