<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:29 AM
 */

namespace App\Http\Recopro\Query_stock;
use Illuminate\Support\Facades\DB;

class Query_stockRepository implements Query_stockInterface
{
    protected $model;
    private static $_ACTIVE = 'A';
    public function __construct(Query_stock $model)
    {
        $this->model = $model; 
       
    }

    public function all()
    {
        return $this->model->get();
    }
    public function allFiltro($s,$filtro_art,$filtro_idAlm,$filtro_idLoc,$filtro_cate)
    {       $dato=$this->model->get();
            if(!empty($filtro_art)){
            $dato=$dato->Where('Articulo',$filtro_art);
            }
            if(!empty($filtro_idAlm)){
             $dato=$dato->Where('Almacen',$filtro_idAlm);
            }
            if(!empty($filtro_idLoc)){
             $dato=$dato->Where('Localizacion',$filtro_idLoc);
            }
            if(!empty($filtro_cate)){
             $dato=$dato->Where('Categoria',$filtro_cate);
            }
           return $dato;
    }
     public function search($s,$filtro_art,$filtro_idAlm,$filtro_idLoc,$filtro_cate)
    {   
        return $this->model->where(function($q) use ($s,$filtro_art,$filtro_idAlm,$filtro_idLoc,$filtro_cate) {
            $q->where('Articulo', 'LIKE', '%'.$s.'%')->orderByRaw('Articulo DESC');
            if(!empty($filtro_art)){
             $q->Where('Articulo',$filtro_art);
            }
            if(!empty($filtro_idAlm)){
             $q->Where('Almacen',$filtro_idAlm);
            }
            if(!empty($filtro_idLoc)){
             $q->Where('Localizacion',$filtro_idLoc);
            }
            if(!empty($filtro_cate)){
             $q->Where('Categoria',$filtro_cate);
            }
            // $q->orWhere('Almacen', 'LIKE', '%'.$s.'%');
            // $q->orWhere('Categoria', 'LIKE', '%'.$s.'%');
        });

    }
    //  public function get_data_complete()
    // {
    //     $destroy=DB::select("SET NOCOUNT ON; exec AL_Consulta_Stock 0,0,0,0");
    //     $collection = collect($destroy);
    //      return $collection;
    // }
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
    public function destroy($id)
    {
        $attributes = [];
        $model = $this->model->findOrFail($id);
        $model->update($attributes);
        $model->delete();
     
    }
    public function get_almacen(){
          $mostrar2=DB::select("select * from ERP_Almacen");
          return $mostrar2;
    }
    public function get_localizacion(){
          $mostrar2=DB::select("select * from ERP_Localizacion");
          return $mostrar2;
    }
     public function get_categoria(){
          $mostrar2=DB::select("select * from ERP_Categoria");
          return $mostrar2;
    }
     public function get_articulo(){
          $mostrar2=DB::select("select * from ERP_Productos");
          return $mostrar2;
    }
    // public function getDetalleKit(){
    //       $mostrar2=DB::select("select  * from ERP_Articulo_kit as ak inner join ERP_Productos as pr on ak.idArticulo=pr.id  where idArticuloKit=$idkit");
    //       return $mostrar2;
    // }
    // public function getDetalleKit(){
    //       $mostrar2=DB::select("select  * from ERP_Articulo_kit as ak inner join ERP_Productos as pr on ak.idArticulo=pr.id  where idArticuloKit=$idkit");
    //       return $mostrar2;
    // }

}