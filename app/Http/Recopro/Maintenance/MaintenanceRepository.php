<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:29 AM
 */

namespace App\Http\Recopro\Maintenance;
use Illuminate\Support\Facades\DB;

class MaintenanceRepository implements MaintenanceInterface
{
    protected $model;
 private static $_ACTIVE = 'A';
    public function __construct(Maintenance $model)
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
            $q->where('nombre', 'LIKE', '%'.$s.'%');
            $q->orWhere('mo_revision', 'LIKE', '%'.$s.'%');
            $q->orWhere('mo_mecanica', 'LIKE', '%'.$s.'%');
            $q->orWhere('terceros', 'LIKE', '%'.$s.'%');
            $q->orWhere('otros_mo', 'LIKE', '%'.$s.'%');
            $q->orWhere('repuestos', 'LIKE', '%'.$s.'%');
            $q->orWhere('accesorios', 'LIKE', '%'.$s.'%');
            $q->orWhere('lubricantes', 'LIKE', '%'.$s.'%');
            $q->orWhere('otros_rep', 'LIKE', '%'.$s.'%');
            $q->orWhere('total', 'LIKE', '%'.$s.'%');
        });

    }
    
     public function create(array $attributes)
    {
        // $attributes['user_created'] = auth()->id();
        // $attributes['user_updated'] = auth()->id();
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
        // $attributes['user_updated'] = auth()->id();
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

}