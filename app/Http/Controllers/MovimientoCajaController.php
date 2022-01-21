<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\CajaDiariaDetalle\CajaDiariaDetalleTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\CajaDiariaDetalle\CajaDiariaDetalleInterface;
use App\Http\Recopro\CajaDiaria\CajaDiariaInterface;
use App\Http\Recopro\ConsecutivosComprobantes\ConsecutivosComprobantesInterface;
use App\Http\Recopro\Customer\CustomerInterface;
use App\Http\Recopro\Persona\PersonaInterface;
use App\Http\Recopro\Solicitud\SolicitudInterface;
use App\Http\Requests\MovimientoCajaRequest;
use App\Models\BaseModel;
use DateTime;
use DateTimeZone;
use DB;
use Exception;
use PDF;

class MovimientoCajaController extends Controller
{
     use CajaDiariaDetalleTrait;

    public function __construct()
    {
        $this->base_model = new BaseModel();
//        $this->middleware('json');
    }
    public function createUpdate($id, CajaDiariaDetalleInterface $repo,request $request ,CajaDiariaInterface $recaj)
    {
        DB::beginTransaction();
        try {
            $data = $request->all();
            $dataCaja = $recaj->find($id);
            $datoDet = [];
            $total=0;
            $totalEgre=0;
            $totalOtrosI=0;
            $dataCajadia=[];
            if($data['idMonedaAdd']=='1'){
                if($data['tipoMovimientoAdd']=='ING'){
                    $total=floatval($dataCaja->totalEfectivo)+floatval($data['montoAdd']);
                    $totalEgre=floatval($dataCaja->totalEgresos);
                    $totalOtrosI=floatval($dataCaja->totalOtrosIngresos)+floatval($data['montoAdd']);
                }else{
                    $total=floatval($dataCaja->totalEfectivo)-floatval($data['montoAdd']);
                    $totalEgre=floatval($dataCaja->totalEgresos)+floatval($data['montoAdd']);
                    $totalOtrosI=floatval($dataCaja->totalOtrosIngresos);

                }
                $dataCajadia['totalOtrosIngresos'] =  $totalOtrosI;
                $dataCajadia['totalEfectivo'] =  $total;
                $dataCajadia['totalEgresos'] =  $totalEgre;
            }else{
                 if($data['tipoMovimientoAdd']=='ING'){
                    $total=floatval($dataCaja->totalEfectivoDol)+floatval($data['montoAdd']);
                    $totalEgre=floatval($dataCaja->totalEgresosDol);
                    $totalOtrosI=floatval($dataCaja->totalOtrosIngresosDol)+floatval($data['montoAdd']);
                }else{
                    $total=floatval($dataCaja->totalEfectivoDol)-floatval($data['montoAdd']);
                    $totalEgre=floatval($dataCaja->totalEgresosDol)+floatval($data['montoAdd']);
                    $totalOtrosI=floatval($dataCaja->totalOtrosIngresosDol);
                }
                $dataCajadia['totalOtrosIngresosDol'] =  $totalOtrosI;
                $dataCajadia['totalEfectivoDol'] =  $total;
                $dataCajadia['totalEgresosDol'] =  $totalEgre;
            }
            

            
            $recaj->update($id, $dataCajadia); 

            $iddet = 'consecutivo';
            $tabledet = "ERP_CajaDiariaDetalle";
            $datoDet['codigoTipo'] =strtoupper($data['tipoMovimientoAdd']);
            $datoDet['codigoFormaPago'] =strtoupper($data['formaPagoAdd']);
            $datoDet['idMoneda'] =strtoupper($data['idMonedaAdd']);
            $datoDet['monto'] =strtoupper($data['montoAdd']);
            $datoDet['descripcion'] =strtoupper($data['conceptoAdd']);
            $datoDet['idCajaDiaria'] =$id;
            
            $datoDet['consecutivo'] = $repo->get_consecutivo($tabledet, $iddet);
            $repo->create($datoDet);

            DB::commit();
            return response()->json([
                'status' => true,
            ]);



        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage(),
            ]);
        }
    }
    public function pdf(Request $request, CajaDiariaDetalleInterface $repo,CajaDiariaInterface $recaj)
    {          
           
            $usuario=auth()->id();
            date_default_timezone_set('America/Lima');
            $fechacA= date("Y-m-d");
            $fechacAc= date("d/m/Y H:i:s");
            $dataMc = $recaj->get_cajaActual($fechacA,$usuario);
            $dataCaDet = $recaj->getCajaDetalle($fechacA,$usuario);
            $dataCajaDetForSol = $recaj->getCajaDetForSol($fechacA,$usuario);
            $dataCajaDetEfeSol = $recaj->getCajaDetEfeSol($fechacA,$usuario);
            $dataCajaDetForDol = $recaj->getCajaDetForDol($fechacA,$usuario);
            $dataCajaDetEfeDol = $recaj->getCajaDetEfeDol($fechacA,$usuario);
            $dataCajaDetEfeSolAper = $recaj->getCajaDetEfeSolAper($fechacA,$usuario);
            $dataCajaDetEfeDolAper = $recaj->getCajaDetEfeDolAper($fechacA,$usuario);

            $feca=date("d/m/Y", strtotime($dataCaDet[0]->fechaCaja));
            return response()->json([
                'status' => true,
                'dataCaDet'=>$dataCaDet,
                'feca'=> $feca,
                'fechacA'=>$fechacAc,
                'dataCajaDetForSol'=>$dataCajaDetForSol,
                'dataCajaDetEfeSol'=>$dataCajaDetEfeSol,
                'dataCajaDetForDol'=>$dataCajaDetForDol,
                'dataCajaDetEfeDol'=>$dataCajaDetEfeDol,
                 'dataCajaDetEfeSolAper'=>$dataCajaDetEfeSolAper,
                'dataCajaDetEfeDolAper'=>$dataCajaDetEfeDolAper,
                 'dataMc'=>$dataMc,
            ]);
    }

 
    public function all(Request $request, CajaDiariaDetalleInterface $repo)
    {
        $s = $request->input('search', '');
        $filtro_tipoMovi = $request->input('filtro_tipoMovi');
        $filtro_monedaMovi = $request->input('filtro_monedaMovi');
        $params = ['consecutivo', 'descripcion','codigoTipo','codigoFormaPago','idMoneda','created_at','nroOperacion','monto'];
        return parseList($repo->search_movimiento_diario($s,$filtro_tipoMovi,$filtro_monedaMovi), $request, 'consecutivo', $params);
    }

    public function create(CajaDiariaDetalleInterface $repo, CajaDiariaDetalleRequest $request)
    {
        $data = $request->all();
        $table="ERP_Categoria";
        $id='idCategoria';
        $data['idCategoria'] = $repo->get_consecutivo($table,$id);
        $data['descripcion'] = strtoupper($data['Categoria']);
        $estado='A';
        if(!isset($data['estado'])){
            $estado='I';
        };
        $data['estado'] =  $estado;
        $repo->create($data);

        return response()->json([ 
            'Result' => 'OK',
            'Record' => []
        ]);
    }
     public function data_form ($id,CajaDiariaDetalleInterface $repo,CajaDiariaInterface $recaj)
    {   
        $date=$id;
        $usuario=auth()->id();
        date_default_timezone_set('America/Lima');
        $dataMc = $recaj->get_cajaActual($date,$usuario);
        $dataCA = $recaj->getCajaAbierta($date,$usuario);
        $dataCaDet = $recaj->getCajaDetalle($date,$usuario);
        $data_tipo=$recaj->getDataTipo();
        $data_moneda=$recaj->getDataMoneda();
        $dataCajaDetForSol = $recaj->getCajaDetForSol($date,$usuario);
        $dataCajaDetEfeSol = $recaj->getCajaDetEfeSol($date,$usuario);
        $dataCajaDetEfeSolAper = $recaj->getCajaDetEfeSolAper($date,$usuario);
            $dataCajaDetForDol = $recaj->getCajaDetForDol($date,$usuario);
            $dataCajaDetEfeDol = $recaj->getCajaDetEfeDol($date,$usuario);
        $dataCajaDetEfeDolAper = $recaj->getCajaDetEfeDolAper($date,$usuario);

        $fechacA= date("Y-m-d H:i:s");

        return response()->json([
            'status' => true,
            'data' => $id,
            'dataMc'=>$dataMc,
            'dataCA'=>$dataCA,
            'dataCaDet'=>$dataCaDet,
            'fechacA'=>$fechacA,
            'data_tipo'=>$data_tipo,
            'data_moneda'=>$data_moneda,
             'dataCajaDetForSol'=>$dataCajaDetForSol,
                'dataCajaDetEfeSol'=>$dataCajaDetEfeSol,
                'dataCajaDetForDol'=>$dataCajaDetForDol,
                'dataCajaDetEfeDol'=>$dataCajaDetEfeDol,
                'dataCajaDetEfeSolAper'=>$dataCajaDetEfeSolAper,
                'dataCajaDetEfeDolAper'=>$dataCajaDetEfeDolAper,
        ]);
    }

    public function update(CajaDiariaDetalleInterface $repo, CajaDiariaDetalleRequest $request)
    {
        $data = $request->all();
        $id = $data['idCategoria'];
        $data['descripcion'] = strtoupper($data['Categoria']);
        $estado='A';
        if(!isset($data['estado'])){
            $estado='I';
        };
        $data['estado'] =  $estado;
        $repo->update($id, $data); 

        return response()->json(['Result' => 'OK']);
    }

    public function destroy(CajaDiariaDetalleInterface $repo, Request $request)
    {
        $id = $request->input('idCategoria');
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    }

    // // public function getAll(BrandInterface $repo)
    // // {
    // //     return parseSelect($repo->all(), 'id', 'description');
    // // }

    public function excel(CajaDiariaDetalleInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->allExcel()), 'LISTA DE MOVIMIENTOS DE CAJA', 'Movimientos de caja');
    }

    public function guardar_comprobante(CajaDiariaDetalleInterface $repo, Request $request, SolicitudInterface $solicitud_repositorio, ConsecutivosComprobantesInterface $repoCC) {

        $data = $request->all();

        // print_r($data); exit;
        $result = array();
       
        try {
            DB::beginTransaction();

            // print_r($this->preparar_datos("dbo.ERP_VentaFormaPago", $data));
            // exit;
            $solicitud = $solicitud_repositorio->get_solicitud($data["cCodConsecutivo"], $data["nConsecutivo"]);
            $solicitud_articulo = $solicitud_repositorio->get_solicitud_articulo($data["cCodConsecutivo"], $data["nConsecutivo"]);
            $solicitud_credito = $solicitud_repositorio->get_solicitud_credito($data["cCodConsecutivo"], $data["nConsecutivo"]);

            $data_venta = (array)$solicitud[0];
            $data_venta["descuento_id"] = explode("*", $solicitud[0]->descuento_id)[0];
            $data_venta["idventa"] = $repo->get_consecutivo("ERP_Venta", "idventa");
            $data_venta["serie_comprobante"] = $data["serie_comprobante"];
            $data_venta["numero_comprobante"] = $data["numero_comprobante"];
            $data_venta["cCodConsecutivo_solicitud"] = $data["cCodConsecutivo"];
            $data_venta["nConsecutivo_solicitud"] = $data["nConsecutivo"];
            $data_venta["fecha_emision"] = date("Y-m-d H:i:s");
            $data_venta["user_updated"] = "";
            $data_venta["updated_at"] = "";

            $condicion_pago = array();

            //CONTADO
            if($solicitud[0]->tipo_solicitud == "1") {
                $dias = 0;
                $data_venta["tipo_comprobante"] = "0";

                $update_solicitud["cCodConsecutivo"] = $data["cCodConsecutivo"];
                $update_solicitud["nConsecutivo"] = $data["nConsecutivo"];
                $update_solicitud["saldo"] = "0";
                $update_solicitud["pagado"] = $solicitud[0]->t_monto_total;
                $update_solicitud["facturado"] = $solicitud[0]->t_monto_total;
                $update_solicitud["estado"] = "6"; // ESTADO FACTURADO DE LA SOLICITUD

                $data_venta["saldo"] = "0";
                $data_venta["pagado"] = $solicitud[0]->t_monto_total;

            }

            //CREDITO DIRECTO
            if($solicitud[0]->tipo_solicitud == "2") {
                $dias = $solicitud_credito[0]->nro_cuotas * 30;
                
            }
            // CREDITO FINANCIERO
            if($solicitud[0]->tipo_solicitud == "3") {
                $dias = 30;
                
            }

            if(count($solicitud_credito) > 0) {

                if($solicitud_credito[0]->cuota_inicial > 0 && $solicitud[0]->pagado == 0) {
                    $data_venta["tipo_comprobante"] = "1";
                    $data_venta["saldo"] = "0";
                    $data_venta["pagado"] = $solicitud_credito[0]->cuota_inicial;

                    $update_solicitud["cCodConsecutivo"] = $data["cCodConsecutivo"];
                    $update_solicitud["nConsecutivo"] = $data["nConsecutivo"];
                    $update_solicitud["saldo"] = $solicitud_credito[0]->total_financiado;
                    $update_solicitud["pagado"] = $solicitud_credito[0]->cuota_inicial;
                    $update_solicitud["facturado"] = $solicitud_credito[0]->cuota_inicial;
                    // print_r($this->preparar_datos("dbo.ERP_Solicitud", $update_solicitud));
                    

                } else {


                    $data_venta["tipo_comprobante"] = "0";
                    $data_venta["saldo"] = $solicitud_credito[0]->total_financiado;
                    $data_venta["pagado"] = "0";
                   
                    $update_solicitud["cCodConsecutivo"] = $data["cCodConsecutivo"];
                    $update_solicitud["nConsecutivo"] = $data["nConsecutivo"];
                    $update_solicitud["facturado"] = $solicitud[0]->t_monto_total;
                    $update_solicitud["estado"] = "6"; // ESTADO FACTURADO DE LA SOLICITUD

                    //GENERAMOS EL CRONOGRAMA DE PAGOS
                    $fecha = $solicitud[0]->fecha_solicitud;
                    for ($c=1; $c <= $solicitud_credito[0]->nro_cuotas; $c++) { 

                        $fecha = $this->sumar_restar_dias($fecha, "+", 30);
                        $data_cronograma = array();
                        $data_cronograma["cCodConsecutivo"] = $data["cCodConsecutivo"];
                        $data_cronograma["nConsecutivo"] = $data["nConsecutivo"];
                        $data_cronograma["nrocuota"] = $c;
                        $data_cronograma["fecha_vencimiento"] = $fecha;
                        $data_cronograma["valor_cuota"] = $solicitud_credito[0]->valor_cuota;
                        $data_cronograma["int_moratorio"] = "0";
                        $data_cronograma["saldo_cuota"] = $solicitud_credito[0]->valor_cuota;
                        $data_cronograma["monto_pago"] = "0";
                        // print_r($this->preparar_datos("dbo.ERP_SolicitudCronograma", $data_cronograma));
                        $res = $this->base_model->insertar($this->preparar_datos("dbo.ERP_SolicitudCronograma", $data_cronograma));
                        // print_r($res);   
                    }
                    

                }
            }
            
            //ACTUALIZAMOS LOS SALDOS EN SOLICITUD
            $this->base_model->modificar($this->preparar_datos("dbo.ERP_Solicitud", $update_solicitud));


            $condicion_pago = $repo->get_condicion_pago($dias);
            
            if(count($condicion_pago) <= 0) {
               
                throw new Exception("No hay una condicion de pago para ".$dias." dias");
            }

            $data_venta["condicion_pago"] = $condicion_pago[0]->id;


            $result = $this->base_model->insertar($this->preparar_datos("dbo.ERP_Venta", $data_venta));

            for ($i=0; $i < count($solicitud_articulo); $i++) { 
                if($solicitud_articulo[$i]->cOperGrat == "-.-") {
                    $solicitud_articulo[$i]->cOperGrat = "";
                    // echo "ola";
                }
                $data_venta_detalle = (array)$solicitud_articulo[$i];
                $data_venta_detalle["idventa"] = $data_venta["idventa"];
               
                
                $data_venta_detalle["consecutivo"] = $repo->get_consecutivo("ERP_VentaDetalle", "consecutivo");
                // print_r($this->preparar_datos("dbo.ERP_VentaDetalle", $data_venta_detalle));
                $this->base_model->insertar($this->preparar_datos("dbo.ERP_VentaDetalle", $data_venta_detalle));
                // print_r($res);
            }
            
         
            $data_formas_pago = $data;
            // var_dump($data["codigo_formapago"]); exit;
            $efectivo_soles = 0;
            $no_efectivo_soles = 0;
            $efectivo_dolares = 0;
            $no_efectivo_dolares = 0;

            for ($i=0; $i < count($data["codigo_formapago"]); $i++) { 
                $data_formas_pago["idventa"][$i] = $data_venta["idventa"];
               
                if($i == 0) {

                    $data_formas_pago["consecutivo"][$i] = $repo->get_consecutivo("ERP_VentaFormaPago", "consecutivo");
                   
                } else {
                    $data_formas_pago["consecutivo"][$i] = $data_formas_pago["consecutivo"][$i-1] + 1;
                }

                $data_caja_detalle = array();
                $data_caja_detalle["idCajaDiaria"] = $repo->get_caja_diaria()[0]->idCajaDiaria; 
                $data_caja_detalle["consecutivo"] = $repo->get_consecutivo("ERP_CajaDiariaDetalle", "consecutivo");
                $data_caja_detalle["codigoTipo"] = "ir";
                $data_caja_detalle["codigoFormaPago"] = $data["codigo_formapago"][$i];
                $data_caja_detalle["idMoneda"] = $data["IdMoneda"][$i];
                $data_caja_detalle["monto"] = $data["monto_pago"][$i];
                $data_caja_detalle["descripcion"] = "Ingreso por Venta";
                $data_caja_detalle["nroTarjeta"] = $data["nrotarjeta"][$i];
                $data_caja_detalle["nroOperacion"] = $data["nrooperacion"][$i];

                $this->base_model->insertar($this->preparar_datos("dbo.ERP_CajaDiariaDetalle", $data_caja_detalle));

                if($data["IdMoneda"][$i] == "1") {
                    if($data["codigo_formapago"][$i] == "ef") {
                        $efectivo_soles += (float)$data["monto_pago"][$i];
                    } else {
                        $no_efectivo_soles += (float)$data["monto_pago"][$i];
                    }
                }

                if($data["IdMoneda"][$i] == "2") {
                    if($data["codigo_formapago"][$i] == "ef") {
                        $efectivo_dolares += (float)$data["monto_pago"][$i];
                    } else {
                        $no_efectivo_dolares += (float)$data["monto_pago"][$i];
                    }
                }
            }


            //ACTUALIZAMOS MONTOS EN CAJA DIARIA
            $update_caja_diaria = array();
            $update_caja_diaria["idCajaDiaria"] = $repo->get_caja_diaria()[0]->idCajaDiaria; 
            $update_caja_diaria["totalEfectivo"] = $efectivo_soles;
            $update_caja_diaria["totalNoEfectivo"] = $no_efectivo_soles;
            $update_caja_diaria["totalEfectivoDol"] = $efectivo_dolares;
            $update_caja_diaria["totalNoEfectivoDol"] = $no_efectivo_dolares;

            $this->base_model->modificar($this->preparar_datos("dbo.ERP_CajaDiaria", $update_caja_diaria));

            $this->base_model->insertar($this->preparar_datos("dbo.ERP_VentaFormaPago", $data_formas_pago));

            $repoCC->actualizar_correlativo($data["serie_comprobante"], $data["numero_comprobante"]);
            
            $result["datos"][0]["estado"] = (isset($update_solicitud["estado"])) ? $update_solicitud["estado"] : "";
            $result["datos"][0]["tipo_solicitud"] = $solicitud[0]->tipo_solicitud;
            DB::commit();
            return response()->json($result);
        } catch (\Exception $e) {
            DB::rollBack();
            $response["status"] = "ei"; 
            $response["msg"] = $e->getMessage(); 
            return response()->json($response);
        }

    }

    public function get_caja_diaria(CajaDiariaDetalleInterface $repo) {
        $result = $repo->get_caja_diaria();
        return response()->json($result);

    }

    public function imprimir_cronograma($id, CajaDiariaDetalleInterface $repo, SolicitudInterface $solicitud_repositorio, CustomerInterface $cliente_repositorio, PersonaInterface $persona_repositorio) {
        $array = explode("|", $id);
        $cCodConsecutivo = $array[0];
        $nConsecutivo = $array[1];

        $datos = array();
        $solicitud = $solicitud_repositorio->get_solicitud($cCodConsecutivo, $nConsecutivo);
        $solicitud_credito = $solicitud_repositorio->get_solicitud_credito($cCodConsecutivo, $nConsecutivo);

        $datos["empresa"] = $repo->get_empresa(); 
        $datos["solicitud_credito"] = $solicitud_credito; 
        $datos["solicitud"] = $solicitud; 
        $datos["cliente"] = $cliente_repositorio->find($solicitud[0]->idcliente);
        $idconyugue = (!empty($solicitud_credito[0]->idconyugue)) ? $solicitud_credito[0]->idconyugue : "0";
        $datos["conyugue"] = $persona_repositorio->find($idconyugue);

        $idfiador = (!empty($solicitud_credito[0]->idfiador)) ? $solicitud_credito[0]->idfiador : "0";
        $datos["fiador"] = $persona_repositorio->find($idfiador);
        $datos["solicitud_cronograma"] = $solicitud_repositorio->get_solicitud_cronograma($cCodConsecutivo, $nConsecutivo);
        $datos["producto"] = $solicitud_repositorio->get_solicitud_articulo_vehiculo($cCodConsecutivo, $nConsecutivo);
        $pdf = PDF::loadView("solicitud.cronograma", $datos);

        // return $pdf->save("ficha_asociado.pdf"); // guardar
        // return $pdf->download("ficha_asociado.pdf"); // descargar
        return $pdf->stream("cronograma.pdf"); // ver

    }
}
