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
     public function search($s)
    {
        return $this->model->where(function($q) use ($s){
            $q->where('idMovimiento', 'LIKE', '%'.$s.'%')->orderByRaw('created_at DESC');
            $q->orWhere('idUsuario', 'LIKE', '%'.$s.'%');
            $q->orWhere('estado', 'LIKE', '%'.$s.'%');
            $q->orWhere('idTipoOperacion', 'LIKE', '%'.$s.'%');
        });

    }
    public function get_movemen_lote($id){
         $mostrar=DB::select("select * from ERP_Movimiento_Articulo as mo inner join ERP_Lote as l on mo.idLote=l.idLote where mo.idMovimiento='$id'");
         return $mostrar; 
    }
    public function get_movemen_Serie($id){
        $mostrar=DB::select("select ma.consecutivo as identificador,* from ERP_Movimiento_Detalle as md inner join ERP_Serie as s on md.serie=s.idserie inner join ERP_Movimiento_Articulo as ma on ma.idMovimiento=md.idMovimiento where md.idMovimiento='$id'");
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
    public function getStockLoc($idl,$idArl){
         $mostrar=DB::select("select total from ERP_almacen_stock_localizacion where idArticulo=$idArl and idLocalizacion=$idl");
         return $mostrar;
    }
    public function getLocaStock($idAlmacen){
         $mostrar=DB::select("select lo.idLocalizacion,lo.descripcion,los.idArticulo, los.total from ERP_Localizacion as lo LEFT JOIN ERP_almacen_stock_localizacion as los on lo.idLocalizacion=los.idLocalizacion where lo.idALmacen=$idAlmacen");
         return $mostrar;
    }

}