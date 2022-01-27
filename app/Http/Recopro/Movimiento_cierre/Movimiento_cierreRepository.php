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
         $mostrar=DB::select("select * from ERP_Periodo");
         return $mostrar;

    }
    public function find_moviCierre($fechaFiltro){
         $mostrar=DB::select("SELECT * FROM ERP_Periodo where periodo='$fechaFiltro'");
         return $mostrar;

    }
    public function getMovimientosCierre($fechaFiltro){
         $mostrar=DB::select("select idArticulo,
idAlmacen,
disponible,
en_transito,
remitido,
total,
reservado,
costo
from ERP_almacen_stock D
inner join ERP_Productos P on P.id = D.idArticulo where FORMAT(D.created_at,'yyyy-MM')='$fechaFiltro'");
         return $mostrar;

    }
    public function getMovimientosCierreArticulo($fechaFiltro){
         $mostrar=DB::select("select idArticulo,
idAlmacen,
idLocalizacion,
disponible,
en_transito,
remitido,
total,
reservado,
costo
from ERP_almacen_stock_localizacion D
inner join ERP_Productos P on P.id = D.idArticulo where FORMAT(D.created_at,'yyyy-MM')='$fechaFiltro'");
         return $mostrar;
    }
    public function getMovimientosCierreArticuloDetalle($fechaFiltro){
         $mostrar=DB::select("select idArticulo,
idAlmacen,
idLocalizacion,
TipoId,
idDetalle,
disponible,
en_transito,
remitido,
total,
reservado,
costo
from ERP_almacen_stock_localizacion_detalle D
inner join ERP_Productos P on P.id = D.idArticulo where FORMAT(D.created_at,'yyyy-MM')='$fechaFiltro'");
         return $mostrar;
    }
     public function reversarMovimientos($id)
    {
        DB::table('ERP_almacen_stock_cierre')->where('periodo',$id)->delete();
        DB::table('ERP_almacen_stock_localizacion_detalle_cierre')->where('periodo',$id)->delete();
        DB::table('ERP_almacen_stock_localizacion_cierre')->where('periodo',$id)->delete();
    }
}