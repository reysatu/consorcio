<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:29 AM
 */

namespace App\Http\Recopro\Movimiento_cierre;
use Illuminate\Support\Facades\DB;

class Movimiento_cierreRepository implements Movimiento_cierreInterface
{
    protected $model;
    private static $_ACTIVE = 1;
    public function __construct(Movimiento_cierre $model)
    {
        $this->model = $model; 
       
    }

    public function all()
    {
        return $this->model->get();
    }
      public function all_entrega_servicio()
    {
        return $this->model->get()->where('naturaleza','R');
    }
     public function all_devolucion_servicio()
    {
        return $this->model->get()->where('naturaleza','D');
    }
     public function search($s,$perido_busquedad)
    {
        $anio='';
        $mes='';
        if($perido_busquedad){
            $valtodo=explode("-", $perido_busquedad);
            $anio=$valtodo[0];
            if(!isset($valtodo[1])){
              $anio='';  
              $mes='';  
            }else{
                $mes=$valtodo[1]; 
            }
            
        }
        return $this->model->where(function($q) use ($s,$anio,$mes){
            $q->where('idMovimiento', 'LIKE', '%'.$s.'%')->whereYear('fecha_registro',$anio)->whereMonth('fecha_registro',$mes)->orderByRaw('created_at DESC');
            $q->orWhere('idUsuario', 'LIKE', '%'.$s.'%')->whereYear('fecha_registro',$anio)->whereMonth('fecha_registro',$mes);
            $q->orWhere('estado', 'LIKE', '%'.$s.'%')->whereYear('fecha_registro',$anio)->whereMonth('fecha_registro',$mes);
            $q->orWhere('idTipoOperacion', 'LIKE', '%'.$s.'%')->whereYear('fecha_registro',$anio)->whereMonth('fecha_registro',$mes);
        });

    }
     public function update_mc($id)
    {
        $attributes['user_updated'] = auth()->id();
        $attributes['estado'] = 'C';
        $this->model->where('periodo',$id)->update($attributes);
    }
    
     
    
 
    public function allActive()
    {
       return $this->model->where('estado', self::$_ACTIVE)->get();
    }
     public function create(array $attributes)
    {
        $attributes['user_created'] = auth()->id();
        $attributes['user_updated'] = auth()->id();
        return $this->model->create($attributes);
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
    public function update($id, array $attributes)
    {
        $attributes['user_updated'] = auth()->id();
        $model = $this->model->findOrFail($id);
        $model->update($attributes);
    }
     
    public function getPeriodos(){
         $mostrar=DB::select("select * from ERP_Periodo where estado='A'");
         return $mostrar;

    }
    public function find_moviCierre($fechaFiltro){
         $mostrar=DB::select("SELECT DISTINCT periodo,idUsuario,estado FROM ERP_Movimiento_cierre where periodo='$fechaFiltro'");
         return $mostrar;

    }
    public function getMovimientosCierre($fechaFiltro){
         $mostrar=DB::select(" SELECT * from ERP_Movimiento where FORMAT(fecha_registro,'yyyy-MM')='$fechaFiltro'");
         return $mostrar;

    }
    public function getMovimientosCierreArticulo($idMovimiento){
         $mostrar=DB::select("select * from ERP_Movimiento_Articulo where idMovimiento='$idMovimiento'");
         return $mostrar;
    }
    public function getMovimientosCierreArticuloDetalle($idMovimiento){
         $mostrar=DB::select("select * from ERP_Movimiento_Detalle where idMovimiento='$idMovimiento'");
         return $mostrar;
    }
     public function reversarMovimientos($id)
    {
        DB::table('ERP_Movimiento_cierre')->where('periodo',$id)->delete();
        DB::table('ERP_Movimiento_Articulo_cierre')->where('periodo',$id)->delete();
        DB::table('ERP_Movimiento_Detalle_cierre')->where('periodo',$id)->delete();
    }
}