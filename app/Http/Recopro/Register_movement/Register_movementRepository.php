<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:29 AM
 */

namespace App\Http\Recopro\Register_movement;
use Illuminate\Support\Facades\DB;

class Register_movementRepository implements Register_movementInterface
{
    protected $model;
    private static $_ACTIVE = 1;
    public function __construct(Register_movement $model)
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
     public function search($s)
    {
        return $this->model->where(function($q) use ($s){
            $q->where('idMovimiento', 'LIKE', '%'.$s.'%')->orderByRaw('created_at DESC');
            $q->orWhere('idUsuario', 'LIKE', '%'.$s.'%');
            $q->orWhere('estado', 'LIKE', '%'.$s.'%');
            $q->orWhere('idTipoOperacion', 'LIKE', '%'.$s.'%');
        });

    }
     public function search_entrega($s)
    {
        return $this->model->where(function($q) use ($s){
            $q->where('idMovimiento', 'LIKE', '%'.$s.'%')->orderByRaw('created_at DESC')->where('naturaleza','R');
            $q->orWhere('idUsuario', 'LIKE', '%'.$s.'%')->where('naturaleza','R');
            $q->orWhere('estado', 'LIKE', '%'.$s.'%')->where('naturaleza','R');
            $q->orWhere('idTipoOperacion', 'LIKE', '%'.$s.'%')->where('naturaleza','R');
        });

    }
    public function get_movemen_lote($id){
         $mostrar=DB::select("select * from ERP_Movimiento_Articulo as mo inner join ERP_Lote as l on mo.idLote=l.idLote where mo.idMovimiento='$id'");
         return $mostrar; 
    }
    public function get_movemen_Serie($id){
        $mostrar=DB::select("select md.consecutivo as identificador,ma.cantidad as cantiTotal,* from ERP_Movimiento_Detalle as md inner join ERP_Serie as s on md.serie=s.idserie  inner join ERP_Movimiento_Articulo as ma on ma.consecutivo=md.consecutivo where md.idMovimiento='$id'");
         return $mostrar; 
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
     public function get_movement_articulo($id){
        $mostrar=DB::select("select Mo.costo as costo2,* from ERP_Movimiento_Articulo as Mo inner join ERP_Productos as pr on mo.idArticulo=pr.id where mo.idMovimiento='$id'");
        return $mostrar; 
    }
     public function get_movement_articulo_entrega($id){
        $mostrar=DB::select("select DISTINCT pr.type_id as type_id,pr.serie as serie,pr.lote as lote,pr.kit as kit, pd.nCantidadPendienteEntregar as nCantidadPendienteEntregar ,mov.cCodConsecutivo as cCodConsecutivo, mov.nConsecutivo as nConsecutivo ,lot.Lote  as cod_lote,Mo.costo as costo2,Mo.idArticulo as idArticulo,Mo.idAlmacen as idAlmacen,Mo.idLocalizacion as idLocalizacion,Mo.idLote as idLote,Mo.cantidad as cantidad, Mo.costo as costo, Mo.costo_total as costo_total,Mo.consecutivo  as consecutivo,Mo.precio  as precio,Mo.precio_total  as precio_total,pr.description as description  from ERP_Movimiento_Articulo as Mo inner join ERP_Productos as pr on mo.idArticulo=pr.id LEFT JOIN ERP_Lote as lot on lot.idLote=Mo.idLote inner join ERP_Movimiento as mov on mov.idMovimiento=Mo.idMovimiento LEFT JOIN ERP_ProformaDetalle as pd on pd.cCodConsecutivo=mov.cCodConsecutivo where mo.idMovimiento='$id' and  (pd.cCodConsecutivo=mov.cCodConsecutivo and pd.nConsecutivo=mov.nConsecutivo )");
        return $mostrar; 
    }
    public function procesarTransferencia($id)
    {
      
        $pdo=DB::connection()->getPdo();
         $destroy=DB::select("SET NOCOUNT ON; EXEC AL_Registra_Movimiento '$id'");
         return $destroy;
    }
    public function destroy($id)
    {
      
        $pdo=DB::connection()->getPdo();
         $destroy=DB::select("SET NOCOUNT ON; EXEC AL_Elimina_Movimiento '$id'");
         return $destroy;
    }
     public function find($id)
    {
        return $this->model->find($id);
    }
     public function get_movimiento($id)
    {
        $mostrar=DB::select("select * from ERP_Movimiento as er inner join ERP_TipoOperacion as ti on er.idTipoOperacion=ti.idTipoOperacion where er.idMovimiento='$id'");
         return $mostrar; 
    }
     public function get_movement_articulo_print($id)
    {
        $mostrar=DB::select("SELECT ma.cantidad as cantidad, ma.consecutivo as consecutivo,pr.description as producto,al.description as almacen,lo.descripcion as localizacion,lot.Lote as lote,un.Abreviatura as unidad FROM ERP_Movimiento_Articulo as ma left JOIN ERP_Almacen  as al on al.id=ma.idAlmacen LEFT join ERP_Localizacion as lo on lo.idLocalizacion=ma.idLocalizacion inner join ERP_Productos as pr on pr.id=ma.idArticulo INNER JOIN ERP_UnidadMedida as un on pr.um_id=un.IdUnidadMedida LEFT JOIN ERP_Lote as lot  on lot.idLote=ma.idLote where ma.idMovimiento='$id'");
         return $mostrar; 
    }


    public function getStockLoc($idl,$idArl){
         $mostrar=DB::select("select total from ERP_almacen_stock_localizacion where idArticulo=$idArl and idLocalizacion=$idl");
         return $mostrar; 
    }
    public function getLocaStock($idAlmacen){
         $mostrar=DB::select("select lo.idLocalizacion,lo.descripcion,los.idArticulo, los.total from ERP_Localizacion as lo LEFT JOIN ERP_almacen_stock_localizacion as los on lo.idLocalizacion=los.idLocalizacion where lo.idALmacen=$idAlmacen");
         return $mostrar;
    }
     public function getLocalizacioAlmacen($idAlmacen){
         $mostrar=DB::select("SELECT * FROM ERP_Localizacion where idAlmacen='$idAlmacen' AND estado='A'");
         return $mostrar;
    }
    public function getDetalle($idMovimiento){
         $mostrar=DB::select("select * from ERP_Movimiento_Articulo where idMovimiento=$idMovimiento");
         return $mostrar;
    }

}