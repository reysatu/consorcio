<?php

/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:56 PM
 */

namespace App\Http\Recopro\VisitaCliente;

use Illuminate\Support\Facades\DB;

class VisitaClienteRepository implements VisitaClienteInterface
{
    protected $model;
    private static $_ACTIVE = 'A';
    public function __construct(VisitaCliente $model)
    {
        $this->model = $model;
    }

    public function search($s)
    {
        return $this->model->orWhere(function ($q) use ($s) {
            $q->where('fechareg', 'LIKE', '%' . $s . '%')
                ->where('cobrador', 'LIKE', '%' . $s . '%')
                ->where('estado', 'LIKE', '%' . $s . '%');
               
        })->orderBy('fechareg', 'DESC');
    }

    public function search_creditos($s)
    {   
      

        return $this->model->orWhere(function ($q) use ($s) {
             $q->whereIn('estado', [2, 4])
                ->where('serie_comprobante', 'LIKE', '%' . $s . '%')
                ->where('numero_comprobante', 'LIKE', '%' . $s . '%')
                ->where('fecha_emision', 'LIKE', '%' . $s . '%')
                ->where('numero_documento', 'LIKE', '%' . $s . '%');
        })->orderBy('fecha_emision', 'DESC');
    }


    public function search_documentos($s)
    {
        return $this->model->orWhere(function ($q) use ($s) {
            $q->whereIn('IdTipoDocumento', ['01', '03', '07', '08'])
                ->where('serie_comprobante', 'LIKE', '%' . $s . '%')
                ->where('numero_comprobante', 'LIKE', '%' . $s . '%')
                ->where('fecha_emision', 'LIKE', '%' . $s . '%')
                ->where('numero_documento', 'LIKE', '%' . $s . '%');
        })->orderBy('fecha_emision', 'DESC');
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

    public function find_documento($idVisitaCliente) {
        $sql = "SELECT v.*, c.*, c.razonsocial_cliente AS cliente 
        FROM ERP_VisitaCliente AS v
        INNER JOIN ERP_Clientes AS c ON(c.id=v.idcliente)
        WHERE v.idVisitaCliente={$idVisitaCliente}";

        return DB::select($sql);
    }

    public function get_motivos() {
        $sql = "SELECT * 
        FROM ERP_Motivos 
        WHERE estado='A'";

        return DB::select($sql);
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


    public function update_saldos_VisitaCliente($data) {
        $sql_update = "UPDATE ERP_VisitaCliente SET saldo = saldo - {$data["monto"]}
        WHERE cCodConsecutivo_solicitud='{$data["cCodConsecutivo"]}' AND nConsecutivo_solicitud={$data["nConsecutivo"]} AND anticipo > 0";

        $result = DB::statement($sql_update);
        
        return $result; 
    }

    public function get_notas_devolucion() {
        $sql = "SELECT v.*, c.*, c.razonsocial_cliente AS cliente 
        FROM ERP_VisitaCliente AS v
        INNER JOIN ERP_Clientes AS c ON(c.id=v.idcliente)
        WHERE v.devolucion_producto='1' AND v.IdTipoDocumento='07'";

        return DB::select($sql);
    }

    public function get_VisitaCliente_detalle($idVisitaCliente){
   
        $mostrar3=DB::select("select pr.costo as costo2,pr.costo as costo_total,pr.id as idProducto, vd.consecutivo as idDetalleRepues,* 
        from ERP_VisitaClienteDetalle as vd 
        inner join ERP_Productos as pr on pr.id=vd.idarticulo  
        where vd.idVisitaCliente={$idVisitaCliente}");
        return $mostrar3;
    }

    public function get_VisitaCliente_separacion($idcliente) {
        $sql = "SELECT v.* FROM ERP_VisitaCliente AS v
        INNER JOIN ERP_VisitaClienteDetalle AS vd ON(v.idVisitaCliente=vd.idVisitaCliente)
        WHERE v.idcliente={$idcliente} AND vd.idarticulo=1862 AND v.aplicado_separacion<>'S'";

        return DB::select($sql);
    }

    public function getClientes() {
        $sql = "SELECT c.id, c.razonsocial_cliente
        
        FROM ERP_Solicitud AS s
        INNER JOIN ERP_SolicitudCronograma AS sc ON(s.cCodConsecutivo=sc.cCodConsecutivo AND s.nConsecutivo=sc.nConsecutivo)
        INNER JOIN ERP_Clientes AS c ON(s.idcliente=c.id)
        INNER JOIN ERP_TABLASUNAT AS tc ON(cnombretabla = 'TIPO_DOCUMENTO' AND tc.cCodigo=c.tipodoc)
        INNER JOIN ERP_Moneda AS m ON(m.IdMoneda=s.idmoneda)
        WHERE s.estado=6 AND sc.saldo_cuota<>0
        GROUP BY c.id, c.razonsocial_cliente ";

        return DB::select($sql);
    }

    public function obtener_solicitud($idcliente) {
        $sql = "SELECT CONCAT(s.cCodConsecutivo, '_', s.nConsecutivo) AS id, CONCAT(s.cCodConsecutivo, '-', s.nConsecutivo, ' Saldo: ',  round(s.saldo, 2)) AS descripcion, s.saldo
        
        FROM ERP_Solicitud AS s
        INNER JOIN ERP_SolicitudCronograma AS sc ON(s.cCodConsecutivo=sc.cCodConsecutivo AND s.nConsecutivo=sc.nConsecutivo)
        INNER JOIN ERP_Clientes AS c ON(s.idcliente=c.id)
        INNER JOIN ERP_TABLASUNAT AS tc ON(cnombretabla = 'TIPO_DOCUMENTO' AND tc.cCodigo=c.tipodoc)
        INNER JOIN ERP_Moneda AS m ON(m.IdMoneda=s.idmoneda)
        WHERE s.estado=6 AND sc.saldo_cuota<>0 AND s.idcliente={$idcliente}
        GROUP BY s.cCodConsecutivo, s.nConsecutivo, s.saldo ";

        return DB::select($sql);
    }

}
