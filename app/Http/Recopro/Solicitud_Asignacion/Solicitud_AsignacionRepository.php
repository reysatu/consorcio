<?php

/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:56 PM
 */

namespace App\Http\Recopro\Solicitud_Asignacion;

use Illuminate\Support\Facades\DB;

class Solicitud_AsignacionRepository implements Solicitud_AsignacionInterface
{
    protected $model;
    private static $_ACTIVE = 'A';
    public function __construct(Solicitud_Asignacion $model)
    {
        $this->model = $model;
    }

    public function search($s) 
    {
        return $this->model->orWhere(function ($q) use ($s) {
            $q->where('cCodConsecutivo', 'LIKE', '%' . $s . '%')
                ->where('nConsecutivo', 'LIKE', '%' . $s . '%')
                ->where('fecha_solicitud', 'LIKE', '%' . $s . '%')
                ->where('tipo_solicitud', 'LIKE', '%' . $s . '%');
        });
    }
    public function searchAsignacionCobrador($s,$filtro_tienda,$idInicio,$idFin,$idClienteFiltro,$idCobradorFiltro,$FechaInicioFiltro,$FechaFinFiltro) 
    {
        $solitud=[];
        $filtroFechaSol=[];
        if($idInicio!='' && $idFin!=''){
            $mostrar3 = DB::select("select *,  DATEDIFF (DAY,fecha_vencimiento, CONVERT(DATE,GETDATE())) as fe from ERP_SolicitudCronograma  where saldo_cuota>0  and DATEDIFF (DAY,fecha_vencimiento, CONVERT(DATE,GETDATE())) BETWEEN '$idInicio' AND '$idFin'");
            foreach ($mostrar3 as $row) {
               array_push($solitud, $row->nConsecutivo);
            } 
        }
        if($FechaInicioFiltro!='' && $FechaFinFiltro!=''){
              $mostrar3 = DB::select("select * from ERP_SolicitudCronograma  where convert(date,fecha_vencimiento) >= '$FechaInicioFiltro'  and convert(date,fecha_vencimiento) <='$FechaFinFiltro' and saldo_cuota>0 ");
                foreach ($mostrar3 as $row) {
                   array_push($filtroFechaSol, $row->nConsecutivo);
                } 
        }   
        return $this->model->orWhere(function ($q) use ($s,$filtroFechaSol,$filtro_tienda,$idInicio,$idFin,$solitud,$idClienteFiltro,$idCobradorFiltro,$FechaInicioFiltro,$FechaFinFiltro) {
            $q->where('cCodConsecutivo', 'LIKE', '%' . $s . '%')
                ->where('nConsecutivo', 'LIKE', '%' . $s . '%')
                ->where('fecha_solicitud', 'LIKE', '%' . $s . '%')
                ->where('tipo_solicitud', 'LIKE', '%' . $s . '%');
              if($FechaInicioFiltro!='' && $FechaFinFiltro!=''){
                $q->whereIn('nConsecutivo',$filtroFechaSol);
            }    
             if(!empty($filtro_tienda)){
              $q->Where('nCodTienda',$filtro_tienda);
            }
            if($idInicio!='' && $idFin!=''){
                  $q->whereIn('nConsecutivo',$solitud);
            }
             if($idCobradorFiltro !='' ){
                  $q->where('idCobrador',$idCobradorFiltro);
            }
            if($idClienteFiltro !='' ){
                  $q->where('idCliente',$idClienteFiltro);
            }
          
        });
    }

    public function search_ventas($s)
    {
        return $this->model->orWhere(function ($q) use ($s) {

            $q->whereIn('estado', [2, 4])
                ->where('cCodConsecutivo', 'LIKE', '%' . $s . '%')
                ->where('nConsecutivo', 'LIKE', '%' . $s . '%')
                ->where('fecha_solicitud', 'LIKE', '%' . $s . '%')
                ->where('tipo_solicitud', 'LIKE', '%' . $s . '%');
        });
    }

    public function all()
    {
        return $this->model->all();
    }

    public function create(array $attributes)
    {
        $attributes['user_created'] = auth()->id();
        $attributes['user_updated'] = auth()->id();
        // print_r($attributes); exit;
        return $this->model->create($attributes);
    }
    public function allActive()
    {

        return $this->model->where('estado', self::$_ACTIVE)->get();
    }

    public function update($id, array $attributes)
    {
        // print_r($attributes); exit;
        $attributes['user_updated'] = auth()->id();
        $model                      = $this->model->findOrFail($id);
        $model->update($attributes);
    }

    public function find($id)
    {
        return $this->model->find($id);
    }

    public function destroy($id)
    {
        $attributes                 = [];
        $attributes['user_deleted'] = auth()->id();
        $model                      = $this->model->findOrFail($id);
        $model->update($attributes);
        $model->delete();
    }

    
    
}
