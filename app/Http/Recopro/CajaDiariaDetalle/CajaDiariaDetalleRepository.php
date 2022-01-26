<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:29 AM
 */

namespace App\Http\Recopro\CajaDiariaDetalle;
use Illuminate\Support\Facades\DB;

class CajaDiariaDetalleRepository implements CajaDiariaDetalleInterface
{
    protected $model;
 private static $_ACTIVE = 'A';
    public function __construct(CajaDiariaDetalle $model)
    {
        $this->model = $model; 
       
    }

    public function all()
    {
        return $this->model->get();
    }
    public function allExcel()
    {   $idusuario=auth()->id();
        date_default_timezone_set('UTC');
        $fechacA= date("Y-m-d");
        $query=DB::select("select * from ERP_CajaDiaria where idUsuario='$idusuario' and fechaCaja='$fechacA'");
        $idCajaDia=0;
        if(!empty($query)){
            $idCajaDia=$query[0]->idCajaDiaria;   
        }
        return $this->model->where('idCajaDiaria',$idCajaDia)->get();
    }
     public function search($s)
    {
        return $this->model->where(function($q) use ($s){
            $q->where('consecutivo', 'LIKE', '%'.$s.'%')->orderByRaw('created_at DESC');
            $q->orWhere('codigoTipo', 'LIKE', '%'.$s.'%');
            $q->orWhere('codigoFormaPago', 'LIKE', '%'.$s.'%');
            $q->orWhere('idMoneda', 'LIKE', '%'.$s.'%');
            $q->orWhere('descripcion', 'LIKE', '%'.$s.'%');
        });

    }
    public function search_movimiento_diario($s,$filtro_tipoMovi,$filtro_monedaMovi)
    {   $idusuario=auth()->id();
        date_default_timezone_set('America/Lima');
        $fechacA= date("Y-m-d");
        $query=DB::select("select * from ERP_CajaDiaria where idUsuario='$idusuario' and fechaCaja='$fechacA'");
        $idCajaDia=0;
        if(!empty($query)){
            $idCajaDia=$query[0]->idCajaDiaria;   
        }
       
        // return $this->model->where(function($q) use ($s,$idCajaDia,$fechacA,$filtro_tipoMovi,$filtro_monedaMovi){

            
        //     $q->where('consecutivo', 'LIKE', '%'.$s.'%')->orderByRaw('created_at DESC')->where('idCajaDiaria',$idCajaDia);
        //     $q->orWhere('codigoTipo', 'LIKE', '%'.$s.'%')->where('idCajaDiaria',$idCajaDia);
        //     $q->orWhere('codigoFormaPago', 'LIKE', '%'.$s.'%')->where('idCajaDiaria',$idCajaDia);
        //     $q->orWhere('idMoneda', 'LIKE', '%'.$s.'%')->where('idCajaDiaria',$idCajaDia);
        //     $q->orWhere('descripcion', 'LIKE', '%'.$s.'%')->where('idCajaDiaria',$idCajaDia);
        //      $q->orWhere('codigoTipo', 'LIKE', '%'.$filtro_tipoMovi.'%')->where('idCajaDiaria',$idCajaDia);
        //       $q->orWhere('idMoneda', 'LIKE', '%'.$filtro_monedaMovi.'%')->where('idCajaDiaria',$idCajaDia);
        //     if(!empty($filtro_tipoMovi)){
        //      $q=
        //     }
        //     if(!empty($filtro_monedaMovi)){
        //      $q=
        //     }
        // });

        return $this->model->where(function($q) use ($s,$idCajaDia,$fechacA,$filtro_tipoMovi,$filtro_monedaMovi) {
            $q->orderByRaw('created_at DESC')->where('idCajaDiaria',$idCajaDia);
            if(!empty($filtro_tipoMovi)){
              $q->Where('codigoTipo',$filtro_tipoMovi);
            }
            if(!empty($filtro_monedaMovi)){
              $q->Where('idMoneda',$filtro_monedaMovi);
            }
            if(!empty($s)){
              $q->Where('descripcion',$s);
            }
          
            // $q->orWhere('Almacen', 'LIKE', '%'.$s.'%');
            // $q->orWhere('Categoria', 'LIKE', '%'.$s.'%');
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
    public function update($id,$consecutivo, array $attributes)
    {
        $attributes['user_updated'] = auth()->id();
        $model = $this->model->findOrFail($id)->where('consecutivo',$consecutivo)->where('idCajaDiaria',$id);
        $model->update($attributes);
    }
    public function destroy($id)
    {
        $attributes = [];
        $model = $this->model->findOrFail($id);
        $model->update($attributes);
        $model->delete();
     


    }
    

    public function get_condicion_pago($dias) {
        $sql = "SELECT * FROM ERP_CondicionPago AS cp WHERE cp.days={$dias}";

        $result = DB::select($sql);

        return $result;
    }

    public function get_caja_diaria() {
        $idusuario = auth()->id();
        $fechacA = date("Y-m-d");
        $sql = "SELECT * FROM ERP_CajaDiaria AS cd
        INNER JOIN ERP_Cajas AS c ON(c.idcaja=cd.idCaja)
        WHERE cd.idUsuario='$idusuario' AND FORMAT(cd.fechaCaja, 'yyyy-MM-dd')='$fechacA'";
        $result = DB::select($sql);
        return $result;
    }

    public function get_cajero() {
        $idusuario = auth()->id();
        $fechacA = date("Y-m-d");
        $sql = "SELECT u.* FROM ERP_CajaDiaria AS cd
        INNER JOIN ERP_Usuarios AS u ON(cd.idUsuario=u.id)
        WHERE cd.idUsuario='$idusuario' AND FORMAT(fechaCaja, 'yyyy-MM-dd')='$fechacA'";
        $result = DB::select($sql);
        return $result;
    }


    public function get_empresa() {
        $sql = "SELECT * FROM ERP_Compania";
        $result = DB::select($sql);
        return $result;
    }
    

    public function get_tienda() {
        $caja_diaria = $this->get_caja_diaria();
        $sql = "SELECT t.* FROM ERP_Cajas AS c
        INNER JOIN ERP_Tienda AS t ON(c.idtienda=t.idTienda)
        WHERE c.idcaja={$caja_diaria[0]->idCaja}";

        $result = DB::select($sql);
        return $result;
    }


    
    public function get_venta($idventa) {
        $sql = "SELECT v.*, m.Descripcion AS moneda
        FROM ERP_Venta AS v 
        INNER JOIN ERP_Moneda AS m ON(v.idmoneda=m.IdMoneda)
        WHERE v.idventa={$idventa}";
        $result = DB::select($sql);
        return $result;
    }

    public function get_venta_formas_pago($idventa) {
        $sql = "SELECT vfp.*
        FROM ERP_Venta AS v 
        INNER JOIN ERP_VentaFormaPago AS vfp ON(v.idventa=vfp.idventa)
        WHERE v.idventa={$idventa}";
        $result = DB::select($sql);
        return $result;
    }
    

}