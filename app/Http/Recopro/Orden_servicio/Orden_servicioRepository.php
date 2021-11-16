<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:29 AM
 */

namespace App\Http\Recopro\Orden_servicio;
use Illuminate\Support\Facades\DB;

class Orden_servicioRepository implements Orden_servicioInterface
{
    protected $model;
 private static $_ACTIVE = 'A';
    public function __construct(Orden_servicio $model)
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
            $q->where('cCodConsecutivo', 'LIKE', '%'.$s.'%')->orderByRaw('dFecCre DESC');
            $q->orWhere('nConsecutivo', 'LIKE', '%'.$s.'%');
            $q->orWhere('cPlacaVeh', 'LIKE', '%'.$s.'%');
           
        });

    }
     public function delete_ord_man($cCodConsecutivo,$ncon)
    {
        
        DB::table('ERP_OrdenServicioMantenimiento')->where('cCodConsecutivo',$id)->where('nConsecutivo',$ncon)->delete();
      
     
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
    public function update($id, array $attributes)
    {
        $attributes['cIdUsuMod'] = auth()->id();
        $model = $this->model->findOrFail($id);
        $model->update($attributes);
    }
    public function getcodigo(){
   
          $mostrar3=DB::select("select * from ERP_Consecutivos where cCodTipoCons='ORDEN'");
          return $mostrar3;
    }
    public function getcondicion_pago(){
   
          $mostrar3=DB::select("select * from ERP_CondicionPago");
          return $mostrar3;
    }
    public function gettipo_servicio(){
   
          $mostrar3=DB::select("select * from ERP_TipoServicioMant where estado='A'");
          return $mostrar3;
    }
    public function gettipo_document(){
   
          $mostrar3=DB::select("select cCodigo Codigo, cDescripcion TipoDocumento from ERP_TABLASUNAT where cnombretabla = 'TIPO_DOCUMENTO'");
          return $mostrar3;
    }
    public function gettecnico(){
   
          $mostrar3=DB::select("select * from ERP_Tecnico where estado='A'");
          return $mostrar3;
    }
    public function getasesor(){
   
          $mostrar3=DB::select("SELECT * FROM ERP_Asesores where estado='A'");
          return $mostrar3;
    }
    public function getmoneda(){
   
          $mostrar3=DB::select("SELECT * FROM ERP_Moneda where estado='A'");
          return $mostrar3;
    }
    public function find_orden_mantenimiento($conse,$nro)
    { 
      $mostrar3=DB::select("select * from ERP_OrdenServicioMantenimiento as om inner join ERP_Mantenimientos as m on om.idMantenimiento=m.id where om.cCodConsecutivo='$conse' and nConsecutivo='$nro'");
          return $mostrar3;

    }
     public function find_orden_detalle($conse,$nro)
    { 
      $mostrar3=DB::select("select od.id as idDetalleSer,* from ERP_OrdenServicioDetalle as od inner join ERP_Productos as pr on pr.id=od.idProducto inner join ERP_TipoTotalOS as tit on tit.id=od.id_tipototal  where od.cCodConsecutivo='$conse' and od.nConsecutivo='$nro'");
      return $mostrar3;

    }
    public function find_orden($conse,$nro)
    {
        $mostrar3=DB::select("select cdp.description as condicionPago, ase.descripcion as asesor,tcn.descripcion as tecnico , tv.descripcion as tipoVehiculo,mn.Descripcion as moneda ,tm.descripcion as TipoMantenimiento,tsm.descripcion as servicioMante, * from ERP_OrdenServicio as ore inner join ERP_TipoServicioMant as tsm on ore.id_tipo=tsm.id inner join ERP_TipoMantenimiento as tm on ore.id_tipomant=tm.id inner join ERP_Moneda as mn on mn.IdMoneda=ore.IdMoneda inner join ERP_TipoVehiculo as tv on tv.id=ore.id_tipoveh inner join ERP_Clientes as cli on cli.id=ore.idCliente LEFT JOIN ERP_Tecnico as tcn on ore.idTecnico=tcn.id left join ERP_Asesores as ase on ase.id=ore.idAsesor inner join ERP_CondicionPago as cdp on cdp.id=ore.idcCondicionPago where ore.cCodConsecutivo='$conse' and ore.nConsecutivo='$nro'");
          return $mostrar3;
    }
     public function find_orden_cliente($idCliente)
    {
      $mostrar3=DB::select("SELECT * FROM ERP_Clientes as cl inner join ERP_TipoCliente as ti on cl.id_tipocli=ti.id where cl.id='$idCliente'");
          return $mostrar3;
    }
    public function get_totales(){
   
          $mostrar3=DB::select("SELECT * FROM ERP_TipoTotalOS where estado='A'");
          return $mostrar3;
    }
    public function get_servicios(){
   
          $mostrar3=DB::select("
                      select pr.id as idProducto,pr.code_article as codigo_articulo , pr.description as producto ,pd.nPrecio as precio,p.id_tpocli as tipo_cliente,p.IdMoneda as idMoneda from ERP_ListaPrecios as p inner join ERP_ListaPreciosDetalle as pd on p.id=pd.id_lista inner join ERP_Productos as pr  on pr.id=pd.idProducto where  p.iEstado='1' and pr.type_id='2'");
          return $mostrar3;
    }
    public function get_Tipomantenimientos(){
   
          $mostrar3=DB::select("
                     select * from ERP_TipoMantenimiento where estado='A'");
          return $mostrar3;
    }
    public function getrevisiones(){
   
          $mostrar3=DB::select("SELECT * FROM ERP_Mantenimientos WHERE estado='A'");
          return $mostrar3;
    }
    public function actualizar_orden($cCodConsecutivo,
                $nConsecutivo,
                $id_tipo,
                $id_tipomant,
                $IdMoneda,
                $dFecRec,
                $horaRec,
                $dFecEntrega,
                $horaEnt,
                $id_tipoveh,
                $cPlacaVeh,
                $cMotor,
                $cChasis,
                $iAnioFab,
                $cColor,
                $nKilometraje,
                $idCliente,
                $idTecnico,
                $idAsesor,
                $idcCondicionPago,
                $cObservaciones,
                $mo_revision,
                $mo_mecanica,
                $terceros,
                $otros_mo,
                $respuestos,
                $accesorios,
                $lubricantes,
                $otros_rep,
                $total,
                $modo,
                $usuario){
         $pdo=DB::connection()->getPdo();
         $destroy=DB::select("SET NOCOUNT ON; EXEC ST_ActualizaOrdenServicio 
                '$cCodConsecutivo',
                '$nConsecutivo',
                '$id_tipo',
                '$id_tipomant',
                '$IdMoneda',
                '$dFecRec',
                '$horaRec',
                '$dFecEntrega',
                '$horaEnt',
                '$id_tipoveh',
                '$cPlacaVeh',
                '$cMotor',
                '$cChasis',
                '$iAnioFab',
                '$cColor',
                '$nKilometraje',
                '$idCliente',
                '$idTecnico',
                '$idAsesor',
                '$idcCondicionPago',
                '$cObservaciones',
                '$mo_revision',
                '$mo_mecanica',
                '$terceros',
                '$otros_mo',
                '$respuestos',
                '$accesorios',
                '$lubricantes',
                '$otros_rep',
                '$total',
                '$modo',
                '$usuario'");
         return $destroy;
    }
     public function destroy_orden($id,$no)
    {
         $pdo=DB::connection()->getPdo();
         $destroy=DB::update("SET NOCOUNT ON; EXEC ST_EliminaOrdenServicio '$id','$no'");
         return $destroy;
    }
     public function destroy_orden_mantenimiento($id,$no,$mant)
    {
         $pdo=DB::connection()->getPdo();
         $destroy=DB::select("SET NOCOUNT ON; EXEC ST_EliminaOrdenServicioMantenimiento '$id','$no','$mant'");
         return $destroy;
    }
     public function destroy_orden_detalle($id,$no,$mant)
    {
         $pdo=DB::connection()->getPdo();
         $destroy=DB::select("SET NOCOUNT ON; EXEC ST_EliminaOrdenServicioDetalle '$id','$no','$mant'");
         return $destroy;
    }
       public function actualizar_orden_mantenimiento($cCodConsecutivo,$res,$id_mantenimiento_array,$modo_mant,$usuario){
         $pdo=DB::connection()->getPdo();
         $destroy=DB::update("SET NOCOUNT ON; EXEC ST_ActualizaOrdenServicioMantenimiento 
                '$cCodConsecutivo',
                '$res',
                '$id_mantenimiento_array',
                '$modo_mant',
                '$usuario'"
          );
       }
       public function actualizar_orden_detalle($cCodConsecutivo,$res,$cont,$id_revision_array,$precio_array,$id_tipo_array,$modo,$usuario){
         $pdo=DB::connection()->getPdo();
         $destroy=DB::update("SET NOCOUNT ON; EXEC ST_ActualizaOrdenServicioDetalle 
                '$cCodConsecutivo',
                '$res',
                '$cont',
                '$id_revision_array',
                '$precio_array',
                '$id_tipo_array',
                '$modo',
                '$usuario'"
          );
       } 

}