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

    public function obtener_personas() {
        $mostrar3 = DB::select("select * from ERP_Persona");
        return $mostrar3;
    }

    public function get_parametro_cuotas() {
        $param = DB::select("select * from ERP_Parametros WHERE id=4");
        if(count($param) > 0) {
            return $param[0]->value;
        } else {
            return 0;
        }

    }


    public function get_factor_credito($nro_cuotas, $param_nro_cuotas) {
        $sql = "SELECT * FROM ERP_FactorCredito WHERE nrocuotas = {$nro_cuotas}  AND nrocuotas > {$param_nro_cuotas}";
        // die($sql);
        return DB::select($sql);
    }


    public function get_parametro_igv() {
        $param = DB::select("select * from ERP_Parametros WHERE id=1");
        return $param;

    }

    public function envio_aprobar_solicitud($data) {
        $sql = "
        DECLARE	@return_value int,
		@sMensaje varchar(250)
        SELECT	@sMensaje = N''''''

        EXEC	@return_value = [dbo].[VTA_EnvioAprobarSol]
                @cCodConsecutivo = N'{$data["cCodConsecutivo"]}',
                @nConsecutivo = {$data["nConsecutivo"]},
                @Usuario = ".auth()->id().",
                @sMensaje = @sMensaje OUTPUT

        SELECT	@sMensaje as 'msg'";

        // echo $sql; exit;
        $res = DB::select($sql);
        

        return $res[0]->msg;
    }

    public function get_solicitud($cCodConsecutivo, $nConsecutivo) {

        $sql = "SELECT s.*, FORMAT(s.fecha_vencimiento, 'yyyy-MM-dd') AS fecha_vencimiento, FORMAT(s.fecha_solicitud, 'yyyy-MM-dd') AS fecha_solicitud, c.documento, CONCAT(d.id ,'*' , CAST(d.nPorcDescuento AS float), '*', CAST(d.nMonto AS FLOAT) ) AS descuento_id
        FROM ERP_Solicitud AS s
        INNER JOIN ERP_Clientes AS c ON(c.id=s.idcliente)
        LEFT JOIN ERP_Descuentos AS d ON(d.id=s.descuento_id)
        WHERE s.cCodConsecutivo='{$cCodConsecutivo}' AND s.nConsecutivo={$nConsecutivo}";
        $result = DB::select($sql);

        return $result;
    }

    public function get_solicitud_articulo($cCodConsecutivo, $nConsecutivo) {

        $sql = "SELECT sa.*, p.description AS producto, p.impuesto, p.lote FROM ERP_SolicitudArticulo AS sa
        INNER JOIN ERP_Productos AS p ON(sa.idarticulo=p.id)
        WHERE sa.cCodConsecutivo='{$cCodConsecutivo}' AND sa.nConsecutivo={$nConsecutivo}";
        $result = DB::select($sql);

        return $result;
    }

    public function get_solicitud_detalle($cCodConsecutivo, $nConsecutivo) {

        $sql = "SELECT * FROM ERP_SolicitudDetalle WHERE cCodConsecutivo='{$cCodConsecutivo}' AND nConsecutivo={$nConsecutivo}";
        $result = DB::select($sql);

        return $result;
    }

    public function get_solicitud_credito($cCodConsecutivo, $nConsecutivo) {

        $sql = "SELECT * FROM ERP_SolicitudCredito WHERE cCodConsecutivo='{$cCodConsecutivo}' AND nConsecutivo={$nConsecutivo}";
        $result = DB::select($sql);

        return $result;
    }




}
