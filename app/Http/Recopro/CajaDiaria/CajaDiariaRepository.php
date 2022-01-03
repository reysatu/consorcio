<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:29 AM
 */

namespace App\Http\Recopro\CajaDiaria;
use Illuminate\Support\Facades\DB;

class CajaDiariaRepository implements CajaDiariaInterface
{
    protected $model;
 private static $_ACTIVE = 'A';
    public function __construct(CajaDiaria $model)
    {
        $this->model = $model; 
       
    }
      public function find($id)
    {
        return $this->model->find($id);
    }

    public function all()
    {
        return $this->model->get();
    }
     public function search($s)
    {
        return $this->model->where(function($q) use ($s){
            $q->where('idCajaDiaria', 'LIKE', '%'.$s.'%')->orderByRaw('created_at DESC');
            $q->orWhere('idCajaDiaria', 'LIKE', '%'.$s.'%');
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
    public function destroy($id)
    {
        $attributes = [];
        $model = $this->model->findOrFail($id);
        DB::table('ERP_CajaDiariaDetalle')->where('idCajaDiaria',$id)->delete();
        DB::table('ERP_CajaDiariaDenominaciones')->where('idCajaDiaria',$id)->delete();
        $model->update($attributes);
        $model->delete();
     
    }
    public function getDenominacion()
    {   
        $mostrar=DB::select("select * from ERP_Denominaciones");
        return $mostrar; 
    }
    public function getcajas($idUser)
    {   
        $mostrar=DB::select("SELECT * FROM ERP_Cajas as c inner join ERP_CajaUsuario as cu on c.idcaja=cu.idCaja where c.activo='S' and cu.idUsuario='$idUser' ");
        return $mostrar; 
    }
    public function getDetalle($id)
    {   
        $mostrar=DB::select("select * from ERP_CajaDiariaDetalle where idCajaDiaria='$id'");
        return $mostrar; 
    }
    public function getDenominaciones($id)
    {   
        $mostrar=DB::select("select * from ERP_CajaDiariaDenominaciones as cd INNER JOIN ERP_Denominaciones as de on cd.idDenominacion=de.id_denominacion where cd.idCajaDiaria='$id'");
        return $mostrar; 
    }
    //  public function getDenominacionView($id)
    // {   
    //     $mostrar=DB::select("select * from ERP_CajaDiariaDenominaciones as cd INNER JOIN ERP_Denominaciones as de on cd.idDenominacion=de.id_denominacion where cd.idCajaDiaria='$id'");
    //     return $mostrar; 
    // }

}