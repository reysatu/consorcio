<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:29 AM
 */

namespace App\Http\Recopro\AprobacionSolicitud;
use Illuminate\Support\Facades\DB;

class AprobacionSolicitudRepository implements AprobacionSolicitudInterface
{
    protected $model;
 private static $_ACTIVE = 'A';
    public function __construct(AprobacionSolicitud $model)
    {
        $this->model = $model; 
       
    }
      public function getVentasAproba($cCod,$nr){
        $mostrar=DB::select("select * from ERP_Venta as ve inner join ERP_Clientes as cl on cl.id = ve.idCliente inner join ERP_TipoDocumento as td on ve.IdTipoDocumento=td.IdTipoDocumento where   cCodConsecutivo_solicitud='$cCod' and nConsecutivo_solicitud='$nr'");
         return $mostrar; 
    }
    public function all()
    {
        return $this->model->get();
    }
    public function aprobarRechazar($data)

    {
        $sql = "
        DECLARE @return_value int,
        @sMensaje varchar(250)
        SELECT  @sMensaje = N''''''

        EXEC    @return_value = [dbo].[VTA_AprobarRechazarSol]
                @nCodConformidad = {$data["nCodConformidad"]},
                @Usuario = " . auth()->id() . ",
                @iEstado = {$data["iEstado"]},
                @cComentarios = {$data["aprobaComentario"]},
                @sMensaje = @sMensaje OUTPUT

        SELECT  @sMensaje as 'msg'";

        // echo $sql; exit;
        $res = DB::select($sql);


        return $res[0]->msg;
    }
     public function search($s)
    {
        return $this->model->where(function($q) use ($s){
            $q->where('Conformidad', 'LIKE', '%'.$s.'%');
            $q->orWhere('Codigo', 'LIKE', '%'.$s.'%');
            $q->orWhere('Consecutivo', 'LIKE', '%'.$s.'%');
            $q->orWhere('IdUsuario', 'LIKE', '%'.$s.'%'); 
            $q->orWhere('Usuario', 'LIKE', '%'.$s.'%');      
            $q->orWhere('EstadoAprob', 'LIKE', '%'.$s.'%'); 
            $q->orWhere('Fecha', 'LIKE', '%'.$s.'%'); 
            $q->orWhere('FechaVenc', 'LIKE', '%'.$s.'%'); 
            $q->orWhere('EstadoSol', 'LIKE', '%'.$s.'%'); 
            $q->orWhere('Saldo', 'LIKE', '%'.$s.'%'); 
            $q->orWhere('Total', 'LIKE', '%'.$s.'%'); 
            $q->orWhere('Moneda', 'LIKE', '%'.$s.'%'); 
            $q->orWhere('Cliente', 'LIKE', '%'.$s.'%'); 
            $q->orWhere('NumeroDoc', 'LIKE', '%'.$s.'%'); 
            $q->orWhere('TipoDoc', 'LIKE', '%'.$s.'%'); 
            $q->orWhere('TipoSolicitud', 'LIKE', '%'.$s.'%'); 
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
        $model->update($attributes);
        $model->delete();
     
    }

}