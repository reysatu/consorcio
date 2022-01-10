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
    public function getCajaDiario($id){
        $mostrar=DB::select("select * from ERP_CajaDiaria as cd inner join ERP_Cajas as c on cd.idCaja=c.idcaja where cd.idCajaDiaria='$id'");
        return $mostrar; 
    }
    public function get_cajaActual($date,$usuario){
        $mostrar=DB::select("select * from ERP_CajaDiaria as cd inner join ERP_Cajas as c on cd.idCaja=c.idcaja where cd.fechaCaja='$date' and cd.idUsuario='$usuario'");
        return $mostrar; 
    }
    public function getCajaAbierta($date,$usuario){
        $mostrar=DB::select("select CONVERT(DATE, fechaCaja)  as fecha,* from ERP_CajaDiaria where estado=1 and fechaCaja!='$date' and idUsuario='$usuario'");
        return $mostrar; 
    }
    public function getCajaDetalle($date,$usuario){
        $mostrar=DB::select("select * from ERP_CajaDiariaDetalle as cd inner join ERP_TiposMovimiento as tm on cd.codigoTipo=tm.codigo_tipo INNER JOIN ERP_FormasPago as fp on cd.codigoFormaPago=fp.codigo_formapago inner join ERP_CajaDiaria as c on cd.idCajaDiaria=c.idCajaDiaria where c.fechaCaja='$date' and c.idUsuario='$usuario'");
        return $mostrar; 
    }
    public function getCajaDetForSol($date,$usuario){
        $mostrar=DB::select("select cd.codigoFormaPago as codigoFormaPago,sum(cd.monto) as monto,fp.descripcion_subtipo as descripcion_subtipo from ERP_CajaDiariaDetalle as cd inner join ERP_TiposMovimiento as tm on cd.codigoTipo=tm.codigo_tipo INNER JOIN ERP_FormasPago as fp on cd.codigoFormaPago=fp.codigo_formapago inner join ERP_CajaDiaria as c on cd.idCajaDiaria=c.idCajaDiaria where c.fechaCaja='$date' and c.idUsuario='$usuario' and cd.idMoneda='1' and cd.codigoTipo='VTA' GROUP BY cd.codigoFormaPago,fp.descripcion_subtipo");
        return $mostrar; 
    }
    public function getCajaDetEfeSol($date,$usuario){
        $mostrar=DB::select("select cd.codigoTipo as codigoTipo,sum(cd.monto) as monto ,tm.descripcion_tipo as descripcion_tipo from ERP_CajaDiariaDetalle as cd inner join ERP_TiposMovimiento as tm on cd.codigoTipo=tm.codigo_tipo INNER JOIN ERP_FormasPago as fp on cd.codigoFormaPago=fp.codigo_formapago inner join ERP_CajaDiaria as c on cd.idCajaDiaria=c.idCajaDiaria where c.fechaCaja='$date' and c.idUsuario='$usuario' and cd.idMoneda='1' and cd.codigoFormaPago='EFE' GROUP BY cd.codigoTipo,tm.descripcion_tipo");
        return $mostrar; 
    }
    public function getCajaDetForDol($date,$usuario){
        $mostrar=DB::select("select cd.codigoFormaPago as codigoFormaPago,sum(cd.monto) as monto,fp.descripcion_subtipo as descripcion_subtipo from ERP_CajaDiariaDetalle as cd inner join ERP_TiposMovimiento as tm on cd.codigoTipo=tm.codigo_tipo INNER JOIN ERP_FormasPago as fp on cd.codigoFormaPago=fp.codigo_formapago inner join ERP_CajaDiaria as c on cd.idCajaDiaria=c.idCajaDiaria where c.fechaCaja='$date' and c.idUsuario='$usuario' and cd.idMoneda='2' and cd.codigoTipo='VTA' GROUP BY cd.codigoFormaPago,fp.descripcion_subtipo");
        return $mostrar; 
    }
    public function getCajaDetEfeDol($date,$usuario){
        $mostrar=DB::select("select cd.codigoTipo as codigoTipo,sum(cd.monto) as monto ,tm.descripcion_tipo as descripcion_tipo from ERP_CajaDiariaDetalle as cd inner join ERP_TiposMovimiento as tm on cd.codigoTipo=tm.codigo_tipo INNER JOIN ERP_FormasPago as fp on cd.codigoFormaPago=fp.codigo_formapago inner join ERP_CajaDiaria as c on cd.idCajaDiaria=c.idCajaDiaria where c.fechaCaja='$date' and c.idUsuario='$usuario' and cd.idMoneda='2' and cd.codigoFormaPago='EFE' GROUP BY cd.codigoTipo,tm.descripcion_tipo");
        return $mostrar; 
    }
    public function getDataTipo(){
        $mostrar=DB::select("select * from ERP_TiposMovimiento");
        return $mostrar; 
    }
    public function getDataMoneda(){
        $mostrar=DB::select("select * from ERP_Moneda");
        return $mostrar; 
    }
    //  public function getDenominacionView($id)
    // {   
    //     $mostrar=DB::select("select * from ERP_CajaDiariaDenominaciones as cd INNER JOIN ERP_Denominaciones as de on cd.idDenominacion=de.id_denominacion where cd.idCajaDiaria='$id'");
    //     return $mostrar; 
    // }

}