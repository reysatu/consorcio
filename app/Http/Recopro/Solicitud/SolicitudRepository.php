<?php

/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:56 PM
 */

namespace App\Http\Recopro\Solicitud;

use Illuminate\Support\Facades\DB;

class SolicitudRepository implements SolicitudInterface
{
    protected $model;
    private static $_ACTIVE = 'A';
    public function __construct(Solicitud $model)
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
    public function searchAsignacionCobrador($s,$filtro_tienda,$idInicio,$idFin) 
    {

        return $this->model->orWhere(function ($q) use ($s,$filtro_tienda,$idInicio,$idFin) {
            $q->where('tipo_comprobante','>',0)->where('saldo','>',0)->where('cCodConsecutivo', 'LIKE', '%' . $s . '%')
                ->where('nConsecutivo', 'LIKE', '%' . $s . '%')
                ->where('fecha_solicitud', 'LIKE', '%' . $s . '%')
                ->where('tipo_solicitud', 'LIKE', '%' . $s . '%');
             if(!empty($filtro_tienda)){
              $q->Where('nCodTienda',$filtro_tienda);
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

    public function getcodigo()
    {

        $mostrar3 = DB::select("select * from ERP_Consecutivos where cCodTipoCons='SOLICITUD'");
        return $mostrar3;
    }

    public function get_consecutivo($cCodConsecutivo)
    {
        $mostrar = DB::select("select nConsecutivo from ERP_Consecutivos WHERE cCodConsecutivo = '{$cCodConsecutivo}'");
        $actu    = 0;
        if (!$mostrar) {
            $actu = 0;
        } else {
            $actu = intval($mostrar[0]->nConsecutivo);
        }
        $new = $actu + 1;
        return $new;
    }

    public function get_consecutivo_detalle($table, $id)
    {
        $mostrar = DB::select("select top 1 * from $table order by CONVERT(INT, $id) DESC");
        $actu = 0;
        if (!$mostrar) {
            $actu = 0;
        } else {
            $actu = intval($mostrar[0]->$id);
        };
        $new = $actu + 1;
        return $new;
    }

    public function actualizar_correlativo($cCodConsecutivo, $nConsecutivo)
    {
        $r = DB::table("ERP_Consecutivos")
            ->where("cCodConsecutivo", $cCodConsecutivo)
            ->update(array("nConsecutivo" => $nConsecutivo));

        return $r;
    }

    public function obtener_lotes()
    {

        $mostrar3 = DB::select("select * from ERP_Lote");
        return $mostrar3;
    }

    public function obtener_vendedores()
    {

        $mostrar3 = DB::select("select * from ERP_Vendedores");
        return $mostrar3;
    }

    public function obtener_convenios()
    {

        $mostrar3 = DB::select("select * from ERP_Convenios");
        return $mostrar3;
    }

    public function obtener_personas()
    {
        $mostrar3 = DB::select("select * from ERP_Persona");
        return $mostrar3;
    }

    public function get_parametro_cuotas()
    {
        $param = DB::select("select * from ERP_Parametros WHERE id=4");
        if (count($param) > 0) {
            return $param[0]->value;
        } else {
            return 0;
        }
    }


    public function get_factor_credito($nro_cuotas, $param_nro_cuotas)
    {
        $sql = "SELECT * FROM ERP_FactorCredito WHERE nrocuotas = {$nro_cuotas}  AND nrocuotas > {$param_nro_cuotas}";
        // die($sql);
        return DB::select($sql);
    }


    public function get_parametro_igv()
    {
        $param = DB::select("select * from ERP_Parametros WHERE id=1");
        return $param;
    }

    public function envio_aprobar_solicitud($data)
    {
        $sql = "
        DECLARE	@return_value int,
		@sMensaje varchar(250)
        SELECT	@sMensaje = N''''''

        EXEC	@return_value = [dbo].[VTA_EnvioAprobarSol]
                @cCodConsecutivo = N'{$data["cCodConsecutivo"]}',
                @nConsecutivo = {$data["nConsecutivo"]},
                @Usuario = " . auth()->id() . ",
                @sMensaje = @sMensaje OUTPUT

        SELECT	@sMensaje as 'msg'";

        // echo $sql; exit;
        $res = DB::select($sql);


        return $res[0]->msg;
    }

    public function get_solicitud($cCodConsecutivo, $nConsecutivo)
    {

        $sql = "SELECT s.*, FORMAT(s.fecha_vencimiento, 'yyyy-MM-dd') AS fecha_vencimiento, FORMAT(s.fecha_solicitud, 'yyyy-MM-dd') AS fecha_solicitud, c.documento, CONCAT(d.id ,'*' , CAST(d.nPorcDescuento AS float), '*', CAST(d.nMonto AS FLOAT) ) AS descuento_id, c.correo_electronico, v.descripcion AS vendedor, m.*, FORMAT(s.fecha_solicitud, 'dd/MM/yyyy') AS fecha_solicitud_user, m.Descripcion AS moneda, FORMAT(s.fecha_vencimiento, 'dd/MM/yyyy') AS fecha_vencimiento_user, FORMAT(s.fecha_solicitud, 'dd/MM/yyyy') AS fecha_solicitud_user,
        CASE WHEN s.estado = 1 THEN 'Registrado'
        WHEN s.estado = 2 THEN 'Vigente'
        WHEN s.estado = 3 THEN 'Por Aprobar'
        WHEN s.estado = 4 THEN 'Aprobado'
        WHEN s.estado = 5 THEN 'Rechazado'
        WHEN s.estado = 6 THEN 'Facturado'
        WHEN s.estado = 7 THEN 'Despachado' END AS estado, conv.descripcionconvenio AS convenio
        FROM ERP_Solicitud AS s
        INNER JOIN ERP_Clientes AS c ON(c.id=s.idcliente)
        LEFT JOIN ERP_Descuentos AS d ON(d.id=s.descuento_id)
        LEFT JOIN ERP_Vendedores AS v ON(v.idvendedor=s.idvendedor)
        LEFT JOIN ERP_Moneda AS m ON(m.IdMoneda=s.idmoneda)
        LEFT JOIN ERP_Convenios AS conv ON(conv.idconvenio=s.idconvenio)
        WHERE s.cCodConsecutivo='{$cCodConsecutivo}' AND s.nConsecutivo={$nConsecutivo}";
        $result = DB::select($sql);

        return $result;
    }

    public function get_solicitud_articulo($cCodConsecutivo, $nConsecutivo)
    {

        $sql = "SELECT sa.*, p.description AS producto, p.impuesto, p.lote, 
        CASE WHEN a.description IS NULL THEN '-.-' ELSE a.description END AS almacen, 
        CASE WHEN lo.Lote IS NULL  THEN '-.-' ELSE lo.lote END AS lote, 
        CASE WHEN l.descripcion IS NULL THEN '-.-' ELSE l.descripcion END AS localizacion, 
        CASE WHEN d.descripcion IS NULL THEN '-.-' ELSE d.descripcion END AS descuento, ISNULL(sa.porcentaje_descuento, 0) AS porcentaje_descuento, ISNULL(sa.monto_descuento, 0) AS monto_descuento, CASE WHEN sa.cOperGrat IS NULL THEN '-.-' ELSE sa.cOperGrat END AS cOperGrat, p.serie, p.id AS idproducto
        FROM ERP_SolicitudArticulo AS sa
        INNER JOIN ERP_Productos AS p ON(sa.idarticulo=p.id)
        LEFT JOIN ERP_Almacen AS a ON(a.id=sa.idalmacen)
        LEFT JOIN ERP_Localizacion AS l ON(l.idLocalizacion=sa.idlocalizacion)
        LEFT JOIN ERP_Lote AS lo ON(lo.idLote=sa.idlote)
        LEFT JOIN ERP_Descuentos AS d ON(d.id=sa.iddescuento)
        
        WHERE sa.cCodConsecutivo='{$cCodConsecutivo}' AND sa.nConsecutivo={$nConsecutivo}";
        $result = DB::select($sql);

        return $result;
    }


    public function get_solicitud_articulo_vehiculo($cCodConsecutivo, $nConsecutivo)
    {

        $sql = "SELECT sa.*, p.*, c.descripcion AS categoria,
        CASE WHEN m.description IS NULL THEN '.' ELSE  m.description END AS marca,
        CASE WHEN mo.descripcion IS NULL THEN '.' ELSE  mo.descripcion END AS modelo,
        s.nombreSerie AS serie, cv.idCatVeh 
       
        FROM ERP_SolicitudArticulo AS sa
        INNER JOIN ERP_Productos AS p ON(sa.idarticulo=p.id)
        LEFT JOIN ERP_Marcas AS m ON(m.id=p.idMarca)
        LEFT JOIN ERP_Modelo AS mo ON(mo.idModelo=p.idModelo)
        LEFT JOIN ERP_Serie AS s ON(s.idArticulo=p.id)
        
        INNER JOIN ERP_Categoria AS c ON(c.idCategoria=p.idCategoria)
        INNER JOIN ERP_CategoriaVeh AS cv ON(cv.idCatVeh=p.idCatVeh)
        WHERE sa.cCodConsecutivo='{$cCodConsecutivo}' AND sa.nConsecutivo={$nConsecutivo} AND p.idCategoria IN(1,2)";
        $result = DB::select($sql);

        return $result;
    }

    public function get_solicitud_detalle($cCodConsecutivo, $nConsecutivo)
    {

        $sql = "SELECT * FROM ERP_SolicitudDetalle WHERE cCodConsecutivo='{$cCodConsecutivo}' AND nConsecutivo={$nConsecutivo}";
        $result = DB::select($sql);

        return $result;
    }


    public function get_solicitud_credito($cCodConsecutivo, $nConsecutivo)
    {

        $sql = "SELECT * FROM ERP_SolicitudCredito WHERE cCodConsecutivo='{$cCodConsecutivo}' AND nConsecutivo={$nConsecutivo}";
        $result = DB::select($sql);

        return $result;
    }

    public function get_solicitud_cronograma($cCodConsecutivo, $nConsecutivo)
    {

        $sql = "SELECT sc.*, FORMAT(sc.fecha_vencimiento, 'dd/MM/yyyy') AS fecha_vencimiento,
        CASE WHEN sc.saldo_cuota=0 THEN 'PAGADO' ELSE 'PENDIENTE' END AS estado
         FROM ERP_SolicitudCronograma AS sc
        WHERE sc.cCodConsecutivo='{$cCodConsecutivo}' AND sc.nConsecutivo={$nConsecutivo}";
        $result = DB::select($sql);

        return $result;
    }


    public function get_formas_pago()
    {

        $mostrar3 = DB::select("select * from ERP_FormasPago");
        return $mostrar3;
    }

    public function mostrar_aprobaciones($cCodConsecutivo, $nConsecutivo) {

        $sql = "SELECT sc.*, u.name AS usuario, a.nombre_aprobacion, FORMAT(sc.dFecReg, 'dd/MM/yyyy') AS dFecReg FROM ERP_SolicitudConformidad AS sc
        INNER JOIN ERP_Usuarios AS u ON(u.id=sc.nIdUsuario)
        INNER JOIN ERP_Aprobacion AS a ON(a.idaprobacion=sc.nIdAprob)
        WHERE sc.cCodConsecutivo='{CodConsecutivo}' AND sc.nConsecutivo={$nConsecutivo}";

        $result = DB::select($sql);
        return $result;


    }
}
