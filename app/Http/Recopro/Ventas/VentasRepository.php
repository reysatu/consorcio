<?php

/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:56 PM
 */

namespace App\Http\Recopro\Ventas;

use Illuminate\Support\Facades\DB;

class VentasRepository implements VentasInterface
{
    protected $model;
    private static $_ACTIVE = 'A';
    public function __construct(Ventas $model)
    {
        $this->model = $model;
    }

    public function search($s)
    {


        // print_r($_REQUEST);
        $model = $this->model;
        if(!empty($_REQUEST["FechaInicioFiltro"]) && !empty($_REQUEST["FechaFinFiltro"])) {
           $model = $model->whereBetween('fecha_emision_server', [$_REQUEST["FechaInicioFiltro"] , $_REQUEST["FechaFinFiltro"]]); 

        }

        if(!empty($_REQUEST["idClienteFiltro"])) {
            $model = $model->where("idcliente", $_REQUEST["idClienteFiltro"]);
        }

        if(!empty($_REQUEST["id_tipo_doc"])) {
            $model = $model->where("IdTipoDocumento", $_REQUEST["id_tipo_doc"]);
        }

        if(!empty($_REQUEST["estado_cpe"])) {
            $model = $model->where("estado_cpe", $_REQUEST["estado_cpe"]);
        } 

        return $model->where(function ($q) use ($s) {
            $q->where('serie_comprobante', 'LIKE', '%' . $s . '%');
            $q->orWhere('numero_comprobante', 'LIKE', '%' . $s . '%');
            $q->orWhere('cliente', 'LIKE', '%' . $s . '%');
            $q->orWhere('fecha_emision', 'LIKE', '%' . $s . '%');
            $q->orWhere('numero_documento', 'LIKE', '%' . $s . '%');
        })->orderBy('fecha_emision', 'DESC');
    }

    public function search_comprobantes($filter)
    {


        // print_r($_REQUEST);
        $model = $this->model;
        $s = (isset($filter['search'])) ? $filter['search'] : '';
        if(!empty($filter["FechaInicioFiltro"]) && !empty($filter["FechaFinFiltro"])) {
           $model = $model->whereBetween('fecha_emision_server', [$filter["FechaInicioFiltro"] , $filter["FechaFinFiltro"]]); 

        }

        if(!empty($filter["idClienteFiltro"])) {
            $model = $model->where("idcliente", $filter["idClienteFiltro"]);
        }

        if(!empty($filter["id_tipo_doc"])) {
            $model = $model->where("IdTipoDocumento", $filter["id_tipo_doc"]);
        }

        if(!empty($filter["estado_cpe"])) {
            $model = $model->where("estado_cpe", $filter["estado_cpe"]);
        } 

        return $model->where(function ($q) use ($s) {
            $q->where('serie_comprobante', 'LIKE', '%' . $s . '%');
            $q->orWhere('numero_comprobante', 'LIKE', '%' . $s . '%');
            $q->orWhere('cliente', 'LIKE', '%' . $s . '%');
            $q->orWhere('fecha_emision', 'LIKE', '%' . $s . '%');
            $q->orWhere('numero_documento', 'LIKE', '%' . $s . '%');
        })->orderBy('fecha_emision', 'DESC');
    }

    public function search_creditos($s)
    {   
        return $this->model->whereIn('estado', [2, 4])->where(function ($q) use ($s) {
            $q->where('serie_comprobante', 'LIKE', '%' . $s . '%');
            $q->orWhere('numero_comprobante', 'LIKE', '%' . $s . '%');
            $q->orWhere('fecha_emision', 'LIKE', '%' . $s . '%');
            $q->orWhere('numero_documento', 'LIKE', '%' . $s . '%');
        })->orderBy('fecha_emision', 'DESC');
    }



    public function search_documentos($s)
    {
        $model = $this->model;
        if(!empty($_REQUEST["FechaInicioFiltro"]) && !empty($_REQUEST["FechaFinFiltro"])) {
           $model = $model->whereBetween('fecha_emision_server', [$_REQUEST["FechaInicioFiltro"] , $_REQUEST["FechaFinFiltro"]]); 

        }

        if(!empty($_REQUEST["idClienteFiltro"])) {
            $model = $model->where("idcliente", $_REQUEST["idClienteFiltro"]);
        }

        if(!empty($_REQUEST["id_tipo_doc"])) {
            $model = $model->where("IdTipoDocumento", $_REQUEST["id_tipo_doc"]);
        }

        if(!empty($_REQUEST["estado_cpe"])) {
            $model = $model->where("estado_cpe", $_REQUEST["estado_cpe"]);
        } 

        return $model->whereIn('IdTipoDocumento', ['01', '03', '07', '08'])->where(function ($q) use ($s) {
            $q->where('serie_comprobante', 'LIKE', '%' . $s . '%');
            $q->orWhere('numero_comprobante', 'LIKE', '%' . $s . '%');
            $q->orWhere('fecha_emision', 'LIKE', '%' . $s . '%');
            $q->orWhere('numero_documento', 'LIKE', '%' . $s . '%');
            $q->orWhere('cliente', 'LIKE', '%' . $s . '%');
        })->orderBy('fecha_emision', 'DESC');
    }


    public function search_documentos_excel($filter)
    {
        // print_r($_REQUEST);
        $model = $this->model;
        $s = (isset($filter['search'])) ? $filter['search'] : '';
        if(!empty($filter["FechaInicioFiltro"]) && !empty($filter["FechaFinFiltro"])) {
           $model = $model->whereBetween('fecha_emision_server', [$filter["FechaInicioFiltro"] , $filter["FechaFinFiltro"]]); 

        }

        if(!empty($filter["idClienteFiltro"])) {
            $model = $model->where("idcliente", $filter["idClienteFiltro"]);
        }

        if(!empty($filter["id_tipo_doc"])) {
            $model = $model->where("IdTipoDocumento", $filter["id_tipo_doc"]);
        }

        if(!empty($filter["estado_cpe"])) {
            $model = $model->where("estado_cpe", $filter["estado_cpe"]);
        } 

        return $model->whereIn('IdTipoDocumento', ['01', '03', '07', '08'])->where(function ($q) use ($s) {
            $q->where('serie_comprobante', 'LIKE', '%' . $s . '%');
            $q->orWhere('numero_comprobante', 'LIKE', '%' . $s . '%');
            $q->orWhere('fecha_emision', 'LIKE', '%' . $s . '%');
            $q->orWhere('numero_documento', 'LIKE', '%' . $s . '%');
            $q->orWhere('cliente', 'LIKE', '%' . $s . '%');
        })->orderBy('fecha_emision', 'DESC');
    }
    
    public function search_comprobantes_pendientes($s)
    {
        return $this->model->whereIn('IdTipoDocumento', ['01', '03', '08'])->where('saldo', '>', '0')->where('tipo_solicitud', '<>', '2')->where(function ($q) use ($s) {           
            $q->where('serie_comprobante', 'LIKE', '%' . $s . '%');
            $q->orWhere('numero_comprobante', 'LIKE', '%' . $s . '%');
            $q->orWhere('cliente', 'LIKE', '%' . $s . '%');
            $q->orWhere('fecha_emision', 'LIKE', '%' . $s . '%');
            $q->orWhere('numero_documento', 'LIKE', '%' . $s . '%');
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

    public function find_documento($idventa) {
        $sql = "SELECT v.*, c.*, c.razonsocial_cliente AS cliente, m.Simbolo AS simbolo_moneda
        FROM ERP_Venta AS v
        INNER JOIN ERP_Clientes AS c ON(c.id=v.idcliente)
        LEFT JOIN ERP_Moneda AS m ON(m.IdMoneda=v.idmoneda)
        WHERE v.idventa={$idventa}";

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


    public function update_saldos_venta($data) {
        $sql_update = "UPDATE ERP_Venta SET saldo = saldo - {$data["monto"]},
        pagado = pagado + {$data["monto"]}       
        WHERE cCodConsecutivo_solicitud='{$data["cCodConsecutivo"]}' AND nConsecutivo_solicitud={$data["nConsecutivo"]} AND /*anticipo > 0*/ comprobante_x_saldo='S' AND IdTipoDocumento IN('01', '03', '12')";
        // die($sql_update);
        $result = DB::statement($sql_update);
        
        return $result; 
    }

    public function update_saldos_venta_pendiente($data) {
        $sql_update = "UPDATE ERP_Venta SET saldo = saldo - {$data["monto"]},
        pagado = pagado + {$data["monto"]}       
        WHERE idventa={$data["idventa"]}";

        $result = DB::statement($sql_update);
        
        return $result; 
    }

    public function get_notas_devolucion() {
        $sql = "SELECT v.*, c.*, c.razonsocial_cliente AS cliente 
        FROM ERP_Venta AS v
        INNER JOIN ERP_Clientes AS c ON(c.id=v.idcliente)
        WHERE v.devolucion_producto='1' AND v.IdTipoDocumento='07'";

        return DB::select($sql);
    }
     public function get_notas_devolucion_find($conse,$numer,$idmoneda) {
        $sql = "SELECT v.*, c.*, c.razonsocial_cliente AS cliente 
        FROM ERP_Venta AS v
        INNER JOIN ERP_Clientes AS c ON(c.id=v.idcliente)
        WHERE v.serie_comprobante='$conse' AND v.numero_comprobante='$numer' and v.idmoneda='$idmoneda'";

        return DB::select($sql);
    }

     public function anular_venta($id) {
        $sql = "UPDATE ERP_Venta
                SET anulado = 'S'
                WHERE idventa='$id'";

        return DB::update($sql);
    }

    public function get_venta_detalle($idventa){
   
        $mostrar3=DB::select("select pr.costo as costo2,pr.costo as costo_total,pr.id as idProducto, vd.consecutivo as idDetalleRepues,* 
        from ERP_VentaDetalle as vd 
        inner join ERP_Productos as pr on pr.id=vd.idarticulo  
        where vd.idventa={$idventa} AND pr.type_id=1");
        return $mostrar3;
    }

    public function get_venta_detalle_devolucion($serie_comprobante, $numero_comprobante){
   
        $mostrar3=DB::select("select pr.costo as costo2,pr.costo as costo_total,pr.id as idProducto, vd.consecutivo as idDetalleRepues,* 
        from ERP_VentaDetalle as vd 
        INNER JOIN ERP_Venta AS v ON(v.idventa=vd.idventa)
        inner join ERP_Productos as pr on pr.id=vd.idarticulo  
        where v.serie_comprobante='{$serie_comprobante}' AND v.numero_comprobante={$numero_comprobante}  AND pr.type_id=1");
        return $mostrar3;
    }

     public function get_venta_detalle_entrega($idventa){
   
        $mostrar3=DB::select("
select pr.kit as kit,lot.Lote  as cod_lote,sa.idLote as idLote, pr.serie,pr.lote, sa.costo as costo2,sa.costo_total,sa.precio_unitario as precio,sa.precio_total,sa.nCantidadPendienteEntregar,sa.idarticulo as idArticulo, pr.description as description, sa.cantidad,sa.id as consecutivo,sa.idAlmacen as idAlmacen,sa.idLocalizacion from erp_venta as v inner join ERP_SolicitudArticulo as sa on (v.cCodConsecutivo_solicitud=sa.cCodConsecutivo and v.nConsecutivo_solicitud=sa.nConsecutivo) inner join ERP_Productos as pr on(pr.id=sa.idArticulo) LEFT JOIN ERP_Lote as lot on lot.idLote=sa.idlote where v.idventa='$idventa' and pr.type_id ='1' and sa.nCantidadPendienteEntregar>0");
        return $mostrar3;
    }
     public function get_movemen_lote_entrega($id){
         $mostrar=DB::select("select sa.id  as consecutivo,* from erp_venta as v inner join ERP_SolicitudArticulo as sa on (v.cCodConsecutivo_solicitud=sa.cCodConsecutivo and v.nConsecutivo_solicitud=sa.nConsecutivo) inner join ERP_Productos as pr on(pr.id=sa.idArticulo) inner JOIN ERP_Lote as lot on lot.idLote=sa.idlote  where v.idventa='$id'");
         return $mostrar; 
    }
   public function get_movemen_Serie_entrega($id){
        $mostrar=DB::select("select sd.id_solicitud_articulo  as identificador,sa.cantidad as cantiTotal ,* from erp_venta as v inner join ERP_SolicitudArticulo as sa on (v.cCodConsecutivo_solicitud=sa.cCodConsecutivo and v.nConsecutivo_solicitud=sa.nConsecutivo) inner join ERP_Productos as pr on(pr.id=sa.idArticulo) inner JOIN ERP_SolicitudDetalle as sd on(sa.id=sd.id_solicitud_articulo) inner join ERP_Serie as s on sd.idSerie=s.idserie  where v.idventa='$id'");
         return $mostrar; 
    }

    public function get_venta_separacion($idcliente) {
        $sql = "SELECT v.*, ISNULL(v.devolucion_producto, '') AS devolucion_producto FROM ERP_Venta AS v
        INNER JOIN ERP_VentaDetalle AS vd ON(v.idventa=vd.idventa)
        WHERE v.idcliente={$idcliente} AND vd.idarticulo=1862 AND ISNULL(v.aplicado_separacion, 'N')<>'S' AND v.IdTipoDocumento IN('01', '03')";

        return DB::select($sql);
    }

    public function get_venta_nota($idcliente) {
        $sql = "SELECT v.*, ISNULL(v.devolucion_producto, '') AS devolucion_producto FROM ERP_Venta AS v
        INNER JOIN ERP_VentaDetalle AS vd ON(v.idventa=vd.idventa)
        WHERE v.idcliente={$idcliente} AND v.IdTipoDocumento='07' AND vd.idarticulo<>1859 AND ISNULL(v.aplicado_nota, 'N')<>'S'"; // QUE NO SEA DE UNA VENTA ANTICIPO LA NOTA DE CREDITO
    // die($sql);
        return DB::select($sql);
    }


    public function obtener_comprobantes() {
        $sql = "SELECT * FROM ERP_Venta WHERE IdTipoDocumento IN('03', '01', '07', '08') AND documento_cpe IS NOT NULL AND statusCode IS NULL /*AND FORMAT(fecha_emision, 'yyyy-MM-dd')='2022-07-26'*/";


        return DB::select($sql);

    }
    
    public function obtener_comprobantes_pendientes_envio() {
        $sql = "SELECT * FROM ERP_Venta WHERE IdTipoDocumento IN('03', '01', '07', '08') AND enviado_cpe=0 /*AND FORMAT(fecha_emision, 'yyyy-MM-dd')='2022-07-26'*/";


        return DB::select($sql);

    }

    public function obtener_comprobantes_pendientes_envio_pdf() {
        $sql = "SELECT * FROM ERP_Venta WHERE IdTipoDocumento IN('03', '01', '07', '08') AND enviado_pdf=0 /*AND FORMAT(fecha_emision, 'yyyy-MM-dd')='2022-07-26'*/";


        return DB::select($sql);

    }
    

   

}
