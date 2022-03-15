<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\CajaDiariaDetalle\CajaDiariaDetalleInterface;
use App\Http\Recopro\CajaDiaria\CajaDiariaInterface;
use App\Http\Recopro\Cobrador\CobradorInterface;
use App\Http\Recopro\ConsecutivosComprobantes\ConsecutivosComprobantesInterface;
use App\Http\Recopro\Solicitud\SolicitudInterface;
use App\Http\Recopro\VisitaCliente\VisitaClienteInterface;
use App\Http\Recopro\VisitaCliente\VisitaClienteTrait;
use App\Http\Requests\VisitaClienteRequest;
use App\Models\BaseModel;
use DB;
use Illuminate\Http\Request;

class VisitaClienteController extends Controller
{
    use VisitaClienteTrait;

    public function __construct()
    {
        $this->base_model = new BaseModel();
//        $this->middleware('json');
    }

    public function all(Request $request, VisitaClienteInterface $repo)
    {

        $s      = $request->input('search', '');
        $params =  ['id', 'fechareg', 'cobrador', 'estado'];
        // print_r($repo->search($s)); exit;
        return parseList($repo->search($s), $request, 'id', $params);
    }

    public function create(VisitaClienteInterface $repo, VisitaClienteRequest $request)
    {
        $data                = $request->all();
        $table               = "ERP_Venta";
        $id                  = 'idbanco';
        $data['idbanco']     = $repo->get_consecutivo($table, $id);
        $data['descripcion'] = $data['banco'];

        $repo->create($data);

        return response()->json([
            'Result' => 'OK',
            'Record' => [],
        ]);
    }

    public function update(VisitaClienteInterface $repo, VisitaClienteRequest $request)
    {
        $data = $request->all();
        // print_r($data);
        $idbanco             = $data['idbanco'];
        $data['descripcion'] = $data['banco'];
        $repo->update($idbanco, $data);

        return response()->json(['Result' => 'OK']);
    }

    public function destroy(VisitaClienteInterface $repo, Request $request)
    {
        $idbanco = $request->input('idbanco');
        $repo->destroy($idbanco);
        return response()->json(['Result' => 'OK']);
    }

    public function getAll(VisitaClienteInterface $repo)
    {
        return parseSelect($repo->all(), 'idbanco', 'descripcion');
    }

    public function excel(VisitaClienteInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE DOCUMENTOS EMITIDOS', 'VisitaCliente');
    }

    public function find_documento(VisitaClienteInterface $Repo, Request $request)
    {
        $data = $request->all();

        $response["documento"] = $Repo->find_documento($data["idventa"]);

        return response()->json($response);
    }

    public function data_form(VisitaClienteInterface $Repo, CobradorInterface $cobrador)
    {

        $motivos = $Repo->get_motivos(); 
      
        $cobrador = $cobrador->getCobrador();
        $clientes = $Repo->getClientes();
        // $solicitudes = $Repo->getSolicitudes();

        // $cambio_tipo = $repo_orden->cambio_tipo(2, date("Y-m-d"));

        return response()->json([
            'status'  => true,

            'motivos' => $motivos,
            'cobrador' => $cobrador,
            'clientes' => $clientes,
            // 'solicitudes' => $solicitudes,

        ]);
    }

   

    public function guardar_visita(VisitaClienteInterface $Repo, Request $request, CajaDiariaDetalleInterface $caja_diaria_detalle_repo, CajaDiariaInterface $caja_diaria_repositorio, ConsecutivosComprobantesInterface $repoCC)
    {

        $data = $request->all();
     
        $result = array();

        try {
            DB::beginTransaction();
            // $venta = $caja_diaria_detalle_repo->get_venta();
            $data_visita  = $data;
            $data_visita["id"]  = $Repo->get_consecutivo("ERP_VisitaCliente", "id");
            $data_visita["estado"]  = "1";
           
            $result = $this->base_model->insertar($this->preparar_datos("dbo.ERP_VisitaCliente", $data_visita));

            for ($i=0; $i < count($data["cuotas"]); $i++) { 
                $solicitud = explode("_", $data["idsolicitud"][$i]);
                $data_visita_solicitud = array();
                $data_visita_solicitud["id"] = $data_visita["id"];
                $data_visita_solicitud["cCodConsecutivo"] = $solicitud[0];
                $data_visita_solicitud["nConsecutivo"] = $solicitud[1];
                $this->base_model->insertar($this->preparar_datos("dbo.ERP_VisitaClienteSolicitud", $data_visita_solicitud));

                $cuotas = explode(",", $data["cuotas"][$i]);

                for ($c=0; $c < count($cuotas); $c++) { 
                    $data_visita_cuota = array();
                    $data_visita_cuota["id"] = $data_visita["id"];
                    $data_visita_cuota["cCodConsecutivo"] = $solicitud[0];
                    $data_visita_cuota["nConsecutivo"] = $solicitud[1];
                    $data_visita_cuota["nrocuota"] = $cuotas[$c];
                    $this->base_model->insertar($this->preparar_datos("dbo.ERP_VisitaClienteCuota", $data_visita_cuota));
                }
            }

            DB::commit();
            return response()->json($result);
        } catch (\Exception $e) {
            DB::rollBack();
            $response["status"] = "ei";
            $response["msg"]    = $e->getMessage();
            return response()->json($response);
        }
    }

    public function get_notas_devolucion(VisitaClienteInterface $Repo, Request $request)
    {

        $response = $Repo->get_notas_devolucion();
        return response()->json($response);

    }

    public function get_venta_detalle($id, VisitaClienteInterface $repo, Request $request)
    {
        try {

            $val = $repo->get_venta_detalle($id);

            return response()->json([
                'status' => true,
                'data'   => $val,
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status'  => false,
                'message' => $e->getMessage(),
            ]);
        }
    }

    public function get_venta_separacion(VisitaClienteInterface $repo, Request $request) {
        $data = $request->all();    

        $result = $repo->get_venta_separacion($data["idcliente"]);

        return response()->json($result);
        
    }


    public function obtener_solicitud(VisitaClienteInterface $repo, Request $request) {
        $data = $request->all();    

        $result = $repo->obtener_solicitud($data["idcliente"]);

        return response()->json($result);
    }

    public function find_visita(VisitaClienteInterface $repo, Request $request, SolicitudInterface $solicitud_repositorio) {
        $data = $request->all();    

        $result["visita_cliente"] = $repo->obtener_visita_cliente($data["id"]);
        $result["visita_cliente_solicitud"] = $repo->obtener_visita_cliente_solicitud($data["id"]);
        $result["visita_cliente_cuota"] = $repo->obtener_visita_cliente_cuota($data["id"]);
        $result["solicitud_cronograma"] = $repo->obtener_visita_cliente_cuota($data["id"]);

        return response()->json($result);
     
    }

    public function obtener_cuotas_cronograma(VisitaClienteInterface $repo, Request $request, SolicitudInterface $solicitud_repositorio) {
        $data = $request->all();    

        $arr = explode("_", $data["id"]);
        $cCodConsecutivo = $arr[0];
        $nConsecutivo = $arr[1];
        $idvisita = $data["idvisita"];


        $response = $repo->obtener_cuotas_cronograma($cCodConsecutivo, $nConsecutivo, $idvisita);

        return response()->json($response);

    }
}
