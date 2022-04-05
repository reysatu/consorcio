<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:29 AM
 */

namespace App\Http\Recopro\Quality_control;
use Illuminate\Support\Facades\DB;

class Quality_controlRepository implements Quality_controlInterface
{
    protected $model;
 private static $_ACTIVE = 'A';
    public function __construct(Quality_control $model)
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
            $q->where('id', 'LIKE', '%'.$s.'%')->orderByRaw('dFecCre');
            $q->where('cCodConsecutivoOS', 'LIKE', '%'.$s.'%');
            $q->orWhere('nConsecutivoOS', 'LIKE', '%'.$s.'%');
            $q->orWhere('dFechaRegistro', 'LIKE', '%'.$s.'%');
            $q->orWhere('iEstado', 'LIKE', '%'.$s.'%');
        })->orderBy("dFecCre", "DESC");

    }
    public function allActive()
    {
       return $this->model->where('estado', self::$_ACTIVE)->get();
    }
     public function create(array $attributes)
    {
        $attributes['cIdUsuCre'] = auth()->id();
        $attributes['cIdUsuMod'] = auth()->id();
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
    public function find_Detalle($id){
         $mostrar=DB::select("select * from ERP_ControlCalidadRevision WHERE   idControlCalidad='$id'");
         return $mostrar; 
    }
    public function find($id){
         $mostrar=DB::select("
select * from ERP_ControlCalidad where id='$id'");
         return $mostrar; 
    }
    public function getGrupos(){
         $mostrar=DB::select("select gr.id as idGrupo,gr.nombre as nombre,rv.id as idRev, rv.nombre as revision from ERP_GruposCA as gr inner join ERP_RevisionCA as rv on gr.id=rv.idgrupo where gr.estado='A' AND rv.estado='A' ORDER BY gr.id");
         return $mostrar; 
    }
    public function update($id, array $attributes)
    {
        $attributes['cIdUsuMod'] = auth()->id();
        $model = $this->model->findOrFail($id);
        $model->update($attributes);
    }
    public function destroy($id)
    {
        $attributes = [];
        $model = $this->model->findOrFail($id);
        DB::table('ERP_ControlCalidadRevision')->where('idControlCalidad',$id)->delete();
        $model->update($attributes);
        $model->delete();
     
    }

}