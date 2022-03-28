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
use App\Http\Recopro\Orden_servicio\Orden_servicioInterface;
use App\Http\Recopro\Persona\PersonaInterface;
use App\Http\Recopro\Solicitud\SolicitudInterface;
use App\Http\Recopro\Ventas\VentasInterface;
use App\Http\Requests\MovimientoCajaRequest;
use App\Http\Recopro\Query_stock\Query_stockInterface;
use App\Http\Recopro\VisitaCliente\VisitaClienteInterface;
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
    public function data_formIncio (CajaDiariaDetalleInterface $moventRepo)
    {
        $cuenta_bancarias = $moventRepo->getcuentas_bancarias();
        $bancos = $moventRepo->getbancos();
        return response()->json([
            'status' => true,
            'cuenta_bancarias' => $cuenta_bancarias,
            'bancos'=>$bancos,
        ]);
    }
    public function createUpdate($id, CajaDiariaDetalleInterface $repo,request $request ,CajaDiariaInterface $recaj, ConsecutivosComprobantesInterface $repoCC)
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
                if($data['tipoMovimientoAdd']=='ING' || $data['tipoMovimientoAdd']=='SEP' ){
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
                 if($data['tipoMovimientoAdd']=='ING' || $data['tipoMovimientoAdd']=='SEP' ){
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
            if($data['tipoMovimientoAdd']=='ING' || $data["tipoMovimientoAdd"] == "SEP"){
                $datoDet['naturaleza'] ='E';
            } else {
                $datoDet['naturaleza'] ='S';
            }

            if($data['tipoMovimientoAdd']=='BCO'){
                 $datoDet['nroOperacion'] =$data['nrOperacion'];
                 $datoDet['banco'] =$data['idBanco'];
                 $datoDet['numero_cuenta'] =$data['idCuenta'];
                 $datoDet['descripcion'] =$data['bancoText'].','.$data['numero_cuenta']; 
            }
            $repo->create($datoDet);

            //GUARDAR VENTA POR SEPARACION
            $data_venta = array();
            $data_venta["idventa"] = "";
            if($data["tipoMovimientoAdd"] == "SEP") {
                $parametro_separacion = $repo->get_parametro_separacion();

                if(count($parametro_separacion) <= 0) {
                    throw new Exception("Por favor cree el parametro con el id del producto de separación!");
                }
    
                
                $data_venta = array();
               
                $data_venta["idventa"] = $repo->get_consecutivo("ERP_Venta", "idventa");
                $data_venta["serie_comprobante"] = $data["serie_comprobante"];
                $data_venta["numero_comprobante"] = $data["numero_comprobante"];
                $data_venta["condicion_pago"] = 1;
                $data_venta["fecha_emision"] = date("Y-m-d H:i:s");
                $data_venta["idcliente"] = $data["idcliente"];
                $data_venta["tipo_comprobante"] = "1"; // anticipo
                $data_venta["IdTipoDocumento"] = $data["IdTipoDocumento"];
                $data_venta["t_monto_subtotal"] = $data["montoAdd"];
                $data_venta["t_monto_total"] = $data["montoAdd"];
                $data_venta["saldo"] = "0";
                $data_venta["pagado"] = $data["montoAdd"];
                $data_venta["idmoneda"] = $data['idMonedaAdd'];
                $data_venta["idcajero"] = auth()->id();
                $data_venta["idtienda"] = $repo->get_caja_diaria()[0]->idtienda;
                $data_venta["idcaja"] = $repo->get_caja_diaria()[0]->idcaja;
    
                $this->base_model->insertar($this->preparar_datos("dbo.ERP_Venta", $data_venta));
    
               
                $data_venta_detalle = array();
                $data_venta_detalle["idventa"] = $data_venta["idventa"];
                $data_venta_detalle["consecutivo"] = $repo->get_consecutivo("ERP_VentaDetalle", "consecutivo");
                $data_venta_detalle["idarticulo"] = $parametro_separacion[0]->value;
                $data_venta_detalle["um_id"] = "07"; //codigo unidad
                $data_venta_detalle["cantidad"] = 1;
                $data_venta_detalle["precio_unitario"] = $data["montoAdd"];
            
                $data_venta_detalle["precio_total"] = $data["montoAdd"];
            
                $data_venta_detalle["monto_subtotal"] = $data["montoAdd"];
        
                $data_venta_detalle["monto_total"] = $data["montoAdd"];
            
    
    
                $this->base_model->insertar($this->preparar_datos("dbo.ERP_VentaDetalle", $data_venta_detalle));
                  
                
    
                $repoCC->actualizar_correlativo($data["serie_comprobante"], $data["numero_comprobante"]);
            }
           

            DB::commit();
            return response()->json([
                'status' => true,
                "idventa" => $data_venta["idventa"]
               
            ]);



        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage(),
            ]);
        }
    }
    public function Cuadrepdf(Request $request, CajaDiariaDetalleInterface $repo,CajaDiariaInterface $recaj,Query_stockInterface $repoQs)
    {          
           
            $usuario=auth()->id();
            $nameuser=$repoQs->getUsuario($usuario);
            date_default_timezone_set('America/Lima');
               // date_default_timezone_set('UTC');
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
            $dataDenomicacion=$recaj->getDenominaciones_actual($dataMc[0]->idCajaDiaria,$dataMc[0]->estado);
            $simboloMoneda = $repoQs->getSimboloMoneda();
            $simboloMonedaDolar = $repoQs->getSimboloMonedaDolar();

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
                 'dataDenomicacion'=>$dataDenomicacion,
                 'simboloMoneda'=>$simboloMoneda,
                 'simboloMonedaDolar'=>$simboloMonedaDolar,
                 'usuario'=>$nameuser[0]->name,
            ]);
    }
    public function EmisionComprpdfApert(Request $request, CajaDiariaDetalleInterface $repo,CajaDiariaInterface $recaj,Query_stockInterface $repoQs)
    {          
            $usuario = $request->input('idUsuario');
            $fechacA = $request->input('fechaCaja');
            // $usuario=auth()->id();
            $nameuser=$repoQs->getUsuario($usuario);
            date_default_timezone_set('America/Lima');
               // date_default_timezone_set('UTC');
           
            
            // $fechacA= date("Y-m-d");
            $fechacAc= date("d/m/Y H:i:s");
            $dataMc = $recaj->get_cajaActual($fechacA,$usuario);
            $dataTienda=$recaj->get_tienda($dataMc[0]->idcaja);
            $dataVe=$recaj->get_ventaCajaCompro($fechacA,$usuario);
            $dataList=$recaj->get_ventaCompro($fechacA,$usuario);
            $dataListTipoPago=$recaj->get_ventaComproTipoPago($fechacA,$usuario);

            $dataListDevolucion=$recaj->get_ventaDevolucion($fechacA,$usuario);


            $idArtiCuota=$recaj->get_idArtiCuota();
            $idArtiAnticipo=$recaj->get_idArtiAnticipo();
            $idArtiSeparacin=$recaj->get_idArtiSeparacin();
            $dataListCancelaCuotas=$recaj->get_ventaCancelaCuota($fechacA,$usuario,$idArtiCuota[0]->value);
            $dataListCancelaMora=$recaj->get_ventaCancelaMora($fechacA,$usuario,$idArtiCuota[0]->value);
            $dataListAnticipo=$recaj->get_ventaAnticipo($fechacA,$usuario,$idArtiAnticipo[0]->value);
            $dataListSeparacion=$recaj->get_ventaSeparacion($fechacA,$usuario,$idArtiSeparacin[0]->value);
            $dataCaDet = $recaj->getCajaDetalle($fechacA,$usuario);
            $dataCajaDetForSol = $recaj->getCajaDetForSol($fechacA,$usuario);
            $dataCajaDetEfeSol = $recaj->getCajaDetEfeSol($fechacA,$usuario);
            $dataCajaDetForDol = $recaj->getCajaDetForDol($fechacA,$usuario);
            $dataCajaDetEfeDol = $recaj->getCajaDetEfeDol($fechacA,$usuario);
            $dataCajaDetEfeSolAper = $recaj->getCajaDetEfeSolAper($fechacA,$usuario);
            $dataCajaDetEfeDolAper = $recaj->getCajaDetEfeDolAper($fechacA,$usuario);
            $dataDenomicacion=$recaj->getDenominaciones_actual($dataMc[0]->idCajaDiaria,$dataMc[0]->estado);
            $simboloMoneda = $repoQs->getSimboloMoneda();
            $simboloMonedaDolar = $repoQs->getSimboloMonedaDolar();
            

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
                 'dataDenomicacion'=>$dataDenomicacion,
                 'simboloMoneda'=>$simboloMoneda,
                 'simboloMonedaDolar'=>$simboloMonedaDolar,
                 'usuario'=>$nameuser[0]->name,
                 'dataTienda'=>$dataTienda,
                 'dataList'=> $dataList,
                 'dataListTipoPago'=>$dataListTipoPago,
                 'dataListCancelaCuotas'=>$dataListCancelaCuotas,
                 'dataListCancelaMora'=>$dataListCancelaMora,
                 'dataListAnticipo'=>$dataListAnticipo,
                 'dataListSeparacion'=>$dataListSeparacion,
                 'dataListDevolucion'=>$dataListDevolucion,
                

            ]);
    }
    public function EmisionComprpdf(Request $request, CajaDiariaDetalleInterface $repo,CajaDiariaInterface $recaj,Query_stockInterface $repoQs)
    {          
           
            $usuario=auth()->id();
            $nameuser=$repoQs->getUsuario($usuario);
            date_default_timezone_set('America/Lima');
               // date_default_timezone_set('UTC');
            $fechacA= date("Y-m-d");
            $fechacAc= date("d/m/Y H:i:s");
            $dataMc = $recaj->get_cajaActual($fechacA,$usuario);
            $dataTienda=$recaj->get_tienda($dataMc[0]->idcaja);
            $dataVe=$recaj->get_ventaCajaCompro($fechacA,$usuario);
            $dataList=$recaj->get_ventaCompro($fechacA,$usuario);
            $dataListTipoPago=$recaj->get_ventaComproTipoPago($fechacA,$usuario);
            $dataCaDet = $recaj->getCajaDetalle($fechacA,$usuario);

            $dataCajaDetForSol = $recaj->getCajaDetForSol($fechacA,$usuario);
            $dataCajaDetEfeSol = $recaj->getCajaDetEfeSol($fechacA,$usuario);
            $dataCajaDetForDol = $recaj->getCajaDetForDol($fechacA,$usuario);
            $dataCajaDetEfeDol = $recaj->getCajaDetEfeDol($fechacA,$usuario);
            $dataCajaDetEfeSolAper = $recaj->getCajaDetEfeSolAper($fechacA,$usuario);
            $dataCajaDetEfeDolAper = $recaj->getCajaDetEfeDolAper($fechacA,$usuario);
            $dataDenomicacion=$recaj->getDenominaciones_actual($dataMc[0]->idCajaDiaria,$dataMc[0]->estado);
            $simboloMoneda = $repoQs->getSimboloMoneda();
            $simboloMonedaDolar = $repoQs->getSimboloMonedaDolar();

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
                 'dataDenomicacion'=>$dataDenomicacion,
                 'simboloMoneda'=>$simboloMoneda,
                 'simboloMonedaDolar'=>$simboloMonedaDolar,
                 'usuario'=>$nameuser[0]->name,
                 'dataTienda'=>$dataTienda,
                 'dataList'=> $dataList,
                 'dataListTipoPago'=>$dataListTipoPago,
            ]);
    }
    public function pdf(Request $request, CajaDiariaDetalleInterface $repo,CajaDiariaInterface $recaj)
    {          
           
            $usuario=auth()->id();
            date_default_timezone_set('America/Lima');
            // date_default_timezone_set('UTC');
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
     public function pdfCuadreApert(Request $request, CajaDiariaDetalleInterface $repo,CajaDiariaInterface $recaj,Query_stockInterface $repoQs)
    {          
           
            $usuario=auth()->id();
            $nameuser=$repoQs->getUsuario($usuario);
            date_default_timezone_set('America/Lima');
            $usuario = $request->input('idUsuario');
            $fechacA = $request->input('fechaCaja');
               // date_default_timezone_set('UTC');
            // $fechacA= date("Y-m-d");
            $fechacAc= date("d/m/Y H:i:s");
            $dataMc = $recaj->get_cajaActual($fechacA,$usuario);

            $dataCaDet = $recaj->getCajaDetalle($fechacA,$usuario);
            $dataCajaDetForSol = $recaj->getCajaDetForSol($fechacA,$usuario);
            $dataCajaDetEfeSol = $recaj->getCajaDetEfeSol($fechacA,$usuario);
            $dataCajaDetForDol = $recaj->getCajaDetForDol($fechacA,$usuario);
            $dataCajaDetEfeDol = $recaj->getCajaDetEfeDol($fechacA,$usuario);
            $dataCajaDetEfeSolAper = $recaj->getCajaDetEfeSolAper($fechacA,$usuario);
            $dataCajaDetEfeDolAper = $recaj->getCajaDetEfeDolAper($fechacA,$usuario);
            $dataDenomicacion=$recaj->getDenominaciones_actual($dataMc[0]->idCajaDiaria,$dataMc[0]->estado);
            $simboloMoneda = $repoQs->getSimboloMoneda();
            $simboloMonedaDolar = $repoQs->getSimboloMonedaDolar();

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
                 'dataDenomicacion'=>$dataDenomicacion,
                 'simboloMoneda'=>$simboloMoneda,
                 'simboloMonedaDolar'=>$simboloMonedaDolar,
                 'usuario'=>$nameuser[0]->name,
            ]);
    }
    public function pdfdiarioApert(Request $request, CajaDiariaDetalleInterface $repo,CajaDiariaInterface $recaj)
    {          
           
            $usuario=auth()->id();
            date_default_timezone_set('America/Lima');
            $usuario = $request->input('idUsuario');
            $fechacA = $request->input('fechaCaja');
            // date_default_timezone_set('UTC');
            // $fechacA= date("Y-m-d");
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
     public function pdf_diario(Request $request, CajaDiariaDetalleInterface $repo,CajaDiariaInterface $recaj)
    {          
           
            $id = $request->input('id');
            // $porciones = explode("/", $id);
            $usuario=auth()->id();
            date_default_timezone_set('America/Lima');
            // $fechacA= date("Y-m-d") $porciones[2].'-'.$porciones[1].'-'.$porciones[0];
            $fechacA=$id;
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

    public function guardar_comprobante(CajaDiariaDetalleInterface $repo, Request $request, SolicitudInterface $solicitud_repositorio, ConsecutivosComprobantesInterface $repoCC, CajaDiariaInterface $caja_diaria_repositorio) {
        // ini_Set("display_errors", 1);
        // error_reporting(E_ALL);
        $data = $request->all();

        // print_r($data); exit;
        $result = array();
    
        try {
            DB::beginTransaction();
            $igv = 0;
            $parametro_igv =  $solicitud_repositorio->get_parametro_igv();

            if(count($parametro_igv) <= 0) {
                throw new Exception("Por favor cree el parametro IGV!");
            }
             // OBTENER PRODUCTO ANTICIPO
            $parametro_anticipo = $repo->get_parametro_anticipo();

            if(count($parametro_anticipo) <= 0) {
                throw new Exception("Por favor cree el parametro con el id del producto de anticipo!");
            }


            $ticket = $repoCC->obtener_consecutivo_comprobante(12,  $repo->get_caja_diaria()[0]->idtienda);
            if(count($ticket) <= 0) {
                throw new Exception("Cree una serie y consecutivo de ticket");
            }
            // return $ticket;
            $serie_ticket = $ticket[0]->serie;
            $consecutivo_ticket = $ticket[0]->actual;

            // print_r($this->preparar_datos("dbo.ERP_VentaFormaPago", $data));
            // exit;
            $solicitud = $solicitud_repositorio->get_solicitud($data["cCodConsecutivo"], $data["nConsecutivo"]);
            $solicitud_articulo = $solicitud_repositorio->get_solicitud_articulo($data["cCodConsecutivo"], $data["nConsecutivo"]);

            // TOTALIZAMOS LOS PRECIOS TOTALES DEL DETALLA SOLICITUD ARTICULO
            $suma_precio_total = 0;
            for ($sa=0; $sa < count($solicitud_articulo); $sa++) { 
                $suma_precio_total += (float)$solicitud_articulo[$sa]->precio_total;
            }

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

            $data_venta["idcajero"] = auth()->id();
            $data_venta["idtienda"] = $repo->get_caja_diaria()[0]->idtienda;
            $data_venta["idcaja"] = $repo->get_caja_diaria()[0]->idcaja;
            $data_venta["idventa_separacion"] = $data["idventa_separacion"];
            $data_venta["idventa_nota"] = $data["idventa_nota"];

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

                   

                    $data_venta["tipo_comprobante"] = "1"; // 1 anticipo, 0 normal
                    $data_venta["saldo"] = "0";
                    $data_venta["pagado"] = $solicitud_credito[0]->cuota_inicial;

                     //CAMBIAMOS DATOS DE LA VENTA PARA ANTICIPO
                    $data_venta["descuento_id"] = "";
                    $data_venta["t_porcentaje_descuento"] = "";
                    $data_venta["t_monto_descuento"] = "";
                    $data_venta["t_monto_subtotal"] = $solicitud_credito[0]->cuota_inicial;
                    $data_venta["t_monto_exonerado"] = "";
                    $data_venta["t_monto_afecto"] = "";
                    $data_venta["t_monto_inafecto"] = "";
                    $data_venta["t_impuestos"] = "";
                    $data_venta["t_monto_total"] = $solicitud_credito[0]->cuota_inicial;
                    $data_venta["monto_descuento_detalle"] = "";

                    

                    $data_venta["saldo"] = "0";
                    if($solicitud[0]->t_impuestos > 0) {
                        // print_r($parametro_igv);
                        $igv = $parametro_igv[0]->value;
                        $data_venta["t_impuestos"] = $solicitud_credito[0]->cuota_inicial * $igv / 100;
                        $data_venta["t_monto_afecto"] = $solicitud_credito[0]->cuota_inicial;
                        $data_venta["t_monto_total"] = $data_venta["t_impuestos"] + $data_venta["t_monto_afecto"];
                    } else {
                        $data_venta["t_monto_exonerado"] = $solicitud_credito[0]->cuota_inicial;
                    }

                    
                    $data_venta["pagado"] = $data_venta["t_monto_total"];

                    $update_solicitud["cCodConsecutivo"] = $data["cCodConsecutivo"];
                    $update_solicitud["nConsecutivo"] = $data["nConsecutivo"];
                    $update_solicitud["estado"] = "3"; // ESTADO POR APROBAR DE LA SOLICITUD
                    $update_solicitud["saldo"] = $solicitud[0]->t_monto_total - $data_venta["t_monto_total"];
                    $update_solicitud["pagado"] = $solicitud_credito[0]->cuota_inicial;
                    $update_solicitud["facturado"] = $solicitud_credito[0]->cuota_inicial;
                    // print_r($this->preparar_datos("dbo.ERP_Solicitud", $update_solicitud));

                    // enviamos aprobar la solicitud cuando se hace la venta de la cuota inicial
                    $data_envio_sol = array();
                    $data_envio_sol["cCodConsecutivo"] = $data_venta["cCodConsecutivo_solicitud"];
                    $data_envio_sol["nConsecutivo"] = $data_venta["nConsecutivo_solicitud"];
                    
                    $res = $solicitud_repositorio->envio_aprobar_solicitud($data_envio_sol);
                    if(isset($res[0]->msg) && $res[0]->msg != "OK") {
                        throw new Exception($res[0]->msg);
                    }
                
                } else {

                    //VALIDACION QUE SI POSEEN SERIE LOS ARTICULOS
                    for ($ii=0; $ii < count($solicitud_articulo); $ii++) { 
                        if($solicitud_articulo[$ii]->serie == 1) {
                            $res = $solicitud_repositorio->get_solicitud_detalle_series($solicitud_articulo[$ii]->cCodConsecutivo, $solicitud_articulo[$ii]->nConsecutivo, $solicitud_articulo[$ii]->id);

                            if(count($res) <= 0 ) {
                                throw new Exception("Por Favor ingrese la serie del producto: ". $solicitud_articulo[$ii]->producto." en el detalle de la solicitud!");
                            }
                        }
                    }

                    //SEGUNDA VENTA DEL CREDITO POR EL SALDO
                    $data_venta["tipo_comprobante"] = "0";
                    $data_venta["saldo"] = $solicitud[0]->t_monto_subtotal - $solicitud_credito[0]->cuota_inicial;
                    $data_venta["pagado"] = "0";
                    $data_venta["anticipo"] = $solicitud_credito[0]->cuota_inicial;

                    //CAMBIAMOS DATOS DE LA SEGUNDA VENTA DEL CREDITO
                    $data_venta["descuento_id"] = "";
                    $data_venta["t_porcentaje_descuento"] = "";
                    $data_venta["t_monto_descuento"] = "";
                    $data_venta["t_monto_subtotal"] = $solicitud[0]->t_monto_subtotal - $solicitud_credito[0]->cuota_inicial;
                    $data_venta["t_monto_exonerado"] = "";
                    $data_venta["t_monto_afecto"] = "";
                    $data_venta["t_monto_inafecto"] = "";
                    $data_venta["t_impuestos"] = "";
                   
                    $data_venta["monto_descuento_detalle"] = "";

                    
                    if($solicitud[0]->t_impuestos > 0) {
                        // print_r($parametro_igv);
                        $igv = $parametro_igv[0]->value;
                        $data_venta["t_impuestos"] = $data_venta["t_monto_subtotal"] * $igv / 100;
                        $data_venta["t_monto_afecto"] = $data_venta["t_monto_subtotal"];
                      
                    } else {
                        $data_venta["t_monto_exonerado"] = $data_venta["t_monto_subtotal"];
                    }

                    $data_venta["t_monto_total"] = $data_venta["t_monto_exonerado"] + $data_venta["t_monto_afecto"] + $data_venta["t_impuestos"];

                   
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
            // PARA TICKET
            $data_ticket = $data_venta;
            $data_ticket["idventa_comprobante"] = $data_venta["idventa"];
            $data_ticket["idventa"] = $repo->get_consecutivo("ERP_Venta", "idventa");
            $data_ticket["IdTipoDocumento"] = "12"; // Ticket o cinta emitido por máquina registradora
            $data_ticket["serie_comprobante"] = $serie_ticket;
            $data_ticket["numero_comprobante"] = $consecutivo_ticket;
            $this->base_model->insertar($this->preparar_datos("dbo.ERP_Venta", $data_ticket));
           
            for ($i=0; $i < count($solicitud_articulo); $i++) { 
                if($solicitud_articulo[$i]->cOperGrat == "-.-") {
                    $solicitud_articulo[$i]->cOperGrat = "";
                    // echo "ola";
                }
                $data_venta_detalle = (array)$solicitud_articulo[$i];
                $data_venta_detalle["idventa"] = $data_venta["idventa"];
                
                if(count($solicitud_credito) > 0) {

                    if($solicitud_credito[0]->cuota_inicial > 0 && $solicitud[0]->pagado == 0) {
                        if($i > 0) {
                            continue;
                        }
                        //CUOTA INICIAL
                        $data_venta_detalle["idarticulo"] = $parametro_anticipo[0]->value;
                        $data_venta_detalle["um_id"] = "07"; //codigo unidad
                        $data_venta_detalle["cantidad"] = 1;
                        $data_venta_detalle["precio_unitario"] = $solicitud_credito[0]->cuota_inicial;
                        $data_venta_detalle["iddescuento"] = "";
                        $data_venta_detalle["porcentaje_descuento"] = "";
                        $data_venta_detalle["precio_total"] = $solicitud_credito[0]->cuota_inicial;
                        $data_venta_detalle["monto_descuento"] = "";
                        $data_venta_detalle["monto_subtotal"] = "";
                        $data_venta_detalle["monto_exonerado"] = "";
                        if($solicitud[0]->t_impuestos > 0) {
                            $data_venta_detalle["monto_afecto"] = $solicitud_credito[0]->cuota_inicial;
                        } else {
                            $data_venta_detalle["monto_exonerado"] = $solicitud_credito[0]->cuota_inicial;
                        }
                       
                        $data_venta_detalle["monto_inafecto"] = "";
                        $data_venta_detalle["impuestos"] = "";
                        $data_venta_detalle["monto_total"] = $solicitud_credito[0]->cuota_inicial;
                        $data_venta_detalle["cOperGrat"] = "";
                        $data_venta_detalle["nOperGratuita"] = "";

                    } else {
                        //SEGUNDA VENTA DEL CREDITO
                       
                       //PRORRATEAMOS

                        $porcentaje = $solicitud_articulo[$i]->precio_total / $suma_precio_total;
                        $subtotal = $solicitud[0]->t_monto_subtotal * $porcentaje;

                      
                        $data_venta_detalle["precio_total"] = round($subtotal, 2);
                        $data_venta_detalle["monto_descuento"] = 0;
                        $data_venta_detalle["monto_subtotal"] = round($subtotal, 2);

                        $data_venta_detalle["precio_unitario"] = round( $subtotal / $solicitud_articulo[$i]->cantidad, 2);

                        if($solicitud_articulo[$i]->impuestos > 0) {
                            $igv = $parametro_igv[0]->value;
                            $data_venta_detalle["impuestos"] = $subtotal * $igv / 100;
                            $data_venta_detalle["monto_afecto"]  = $subtotal;
                        } else {
                            $data_venta_detalle["monto_exonerado"] = $subtotal;
                        }

    
                        $data_venta_detalle["monto_total"] = $data_venta_detalle["monto_exonerado"] + $data_venta_detalle["monto_afecto"] + $data_venta_detalle["impuestos"];
    
                        $data_venta_detalle["monto_inafecto"] = 0;

                        $data_venta_detalle["nOperGratuita"] = 0;
                        if($solicitud_articulo[$i]->cOperGrat == "S") {

                            $data_venta_detalle["nOperGratuita"] = round($subtotal, 2);
                        }

                        $data_venta_detalle["monto_descuento_prorrateado"] = 0;

                    }
                }
                
                $data_venta_detalle["consecutivo"] = $repo->get_consecutivo("ERP_VentaDetalle", "consecutivo");
                // print_r($this->preparar_datos("dbo.ERP_VentaDetalle", $data_venta_detalle));
               
                $this->base_model->insertar($this->preparar_datos("dbo.ERP_VentaDetalle", $data_venta_detalle));

              
                // print_r($res);
            }


            //PARA TICKET

            for ($i=0; $i < count($solicitud_articulo); $i++) { 
                if($solicitud_articulo[$i]->cOperGrat == "-.-") {
                    $solicitud_articulo[$i]->cOperGrat = "";
                    // echo "ola";
                }
              
                $data_ticket_detalle =  (array)$solicitud_articulo[$i];
                $data_ticket_detalle["idventa"] = $data_ticket["idventa"];                
                $data_ticket_detalle["consecutivo"] = $repo->get_consecutivo("ERP_VentaDetalle", "consecutivo");

                
                if(count($solicitud_credito) > 0) {

                    if($solicitud_credito[0]->cuota_inicial > 0 && $solicitud[0]->pagado == 0) {
                        if($i > 0) {
                            continue;
                        }
                        //CUOTA INICIAL
                        $data_ticket_detalle["idarticulo"] = $parametro_anticipo[0]->value;
                        $data_ticket_detalle["um_id"] = "07"; //codigo unidad
                        $data_ticket_detalle["cantidad"] = 1;
                        $data_ticket_detalle["precio_unitario"] = $solicitud_credito[0]->cuota_inicial;
                        $data_ticket_detalle["iddescuento"] = "";
                        $data_ticket_detalle["porcentaje_descuento"] = "";
                        $data_ticket_detalle["precio_total"] = $solicitud_credito[0]->cuota_inicial;
                        $data_ticket_detalle["monto_descuento"] = "";
                        $data_ticket_detalle["monto_subtotal"] = "";
                        $data_ticket_detalle["monto_exonerado"] = "";
                        if($solicitud[0]->t_impuestos > 0) {
                            $data_ticket_detalle["monto_afecto"] = $solicitud_credito[0]->cuota_inicial;
                        } else {
                            $data_ticket_detalle["monto_exonerado"] = $solicitud_credito[0]->cuota_inicial;
                        }
                       
                        $data_ticket_detalle["monto_inafecto"] = "";
                        $data_ticket_detalle["impuestos"] = "";
                        $data_ticket_detalle["monto_total"] = $solicitud_credito[0]->cuota_inicial;
                        $data_ticket_detalle["cOperGrat"] = "";
                        $data_ticket_detalle["nOperGratuita"] = "";

                    } else {
                        //SEGUNDA VENTA DEL CREDITO

                        $porcentaje = $solicitud_articulo[$i]->precio_total / $suma_precio_total;
                        $subtotal = $solicitud[0]->t_monto_subtotal * $porcentaje;

                      
                        $data_ticket_detalle["precio_total"] = round($subtotal, 2);
                        $data_ticket_detalle["monto_descuento"] = 0;
                        $data_ticket_detalle["monto_subtotal"] = round($subtotal, 2);

                        $data_ticket_detalle["precio_unitario"] = round( $subtotal / $solicitud_articulo[$i]->cantidad, 2);

                        if($solicitud_articulo[$i]->impuestos > 0) {
                            $igv = $parametro_igv[0]->value;
                            $data_ticket_detalle["impuestos"] = $subtotal * $igv / 100;
                            $data_ticket_detalle["monto_afecto"]  = $subtotal;
                        } else {
                            $data_ticket_detalle["monto_exonerado"] = $subtotal;
                        }

    
                        $data_ticket_detalle["monto_total"] = $data_ticket_detalle["monto_exonerado"] + $data_ticket_detalle["monto_afecto"] + $data_ticket_detalle["impuestos"];
    
                        $data_ticket_detalle["monto_inafecto"] = 0;

                        $data_ticket_detalle["nOperGratuita"] = 0;
                        if($solicitud_articulo[$i]->cOperGrat == "S") {

                            $data_ticket_detalle["nOperGratuita"] = round($subtotal, 2);
                        }

                        $data_ticket_detalle["monto_descuento_prorrateado"] = 0;

                        
                    }
                }

                $this->base_model->insertar($this->preparar_datos("dbo.ERP_VentaDetalle", $data_ticket_detalle));
                // print_r($res);
            }
                
            
            // GUARDAR FORMAS DE PAGO EN VENTA Y CAJA   
            $data_formas_pago = $data;
            // var_dump($data["codigo_formapago"]); exit;
            $efectivo_soles = 0;
            $no_efectivo_soles = 0;
            $efectivo_dolares = 0;
            $no_efectivo_dolares = 0;

            for ($i=0; $i < count($data["codigo_formapago"]); $i++) { 
                $data_formas_pago["idventa"][$i] = $data_venta["idventa"];
                // actualizamos la venta por separacion
                if($data["codigo_formapago"][$i] == "SEP") {
                    $sql_update = "UPDATE ERP_Venta SET aplicado_separacion = 'S'       
                    WHERE idventa={$data["idventa_separacion"]}";
            
                    DB::statement($sql_update);
                }

                 // actualizamos la venta por nota
                 if($data["codigo_formapago"][$i] == "NCR") {
                    $sql_update = "UPDATE ERP_Venta SET aplicado_nota= 'S'       
                    WHERE idventa={$data["idventa_nota"]}";
            
                    DB::statement($sql_update);
                }

                

                if($i == 0) {

                    $data_formas_pago["consecutivo"][$i] = $repo->get_consecutivo("ERP_VentaFormaPago", "consecutivo");
                   
                } else {
                    $data_formas_pago["consecutivo"][$i] = $data_formas_pago["consecutivo"][$i-1] + 1;
                }

                $data_caja_detalle = array();
                $data_caja_detalle["idCajaDiaria"] = $repo->get_caja_diaria()[0]->idCajaDiaria; 
                $data_caja_detalle["consecutivo"] = $repo->get_consecutivo("ERP_CajaDiariaDetalle", "consecutivo");
                $data_caja_detalle["codigoTipo"] = "VTA";
                $data_caja_detalle["codigoFormaPago"] = $data["codigo_formapago"][$i];
                $data_caja_detalle["idMoneda"] = $data["IdMoneda"][$i];
                $data_caja_detalle["monto"] = $data["monto_pago"][$i];
                $data_caja_detalle["descripcion"] = "Ingreso por Ventas";
                $data_caja_detalle["nroTarjeta"] = $data["nrotarjeta"][$i];
                $data_caja_detalle["nroOperacion"] = $data["nrooperacion"][$i];
                $data_caja_detalle["naturaleza"] = "E";

                $this->base_model->insertar($this->preparar_datos("dbo.ERP_CajaDiariaDetalle", $data_caja_detalle));

                if($data["vuelto"][$i] > 0) {
                    $data_caja_detalle = array();
                    $data_caja_detalle["idCajaDiaria"] = $repo->get_caja_diaria()[0]->idCajaDiaria; 
                    $data_caja_detalle["consecutivo"] = $repo->get_consecutivo("ERP_CajaDiariaDetalle", "consecutivo");
                    $data_caja_detalle["codigoTipo"] = "VTA";
                    $data_caja_detalle["codigoFormaPago"] = "EFE";
                    $data_caja_detalle["idMoneda"] = $solicitud[0]->idmoneda;
                    $data_caja_detalle["monto"] = $data["vuelto"][$i];
                    $data_caja_detalle["descripcion"] = "Vuelto por Ventas";
                    $data_caja_detalle["nroTarjeta"] = "";
                    $data_caja_detalle["nroOperacion"] = "";
                    $data_caja_detalle["naturaleza"] = "S";
                    
                    $this->base_model->insertar($this->preparar_datos("dbo.ERP_CajaDiariaDetalle", $data_caja_detalle));

                    if($solicitud[0]->idmoneda == "1") {
                        $efectivo_soles -= $data["vuelto"][$i];
                    }

                    if($solicitud[0]->idmoneda == "2") {
                        $efectivo_dolares -= $data["vuelto"][$i];
                    }
                }


                if($data["IdMoneda"][$i] == "1") {
                    if($data["codigo_formapago"][$i] == "EFE") {
                        $efectivo_soles += (float)$data["monto_pago"][$i];
                    } else {
                        $no_efectivo_soles += (float)$data["monto_pago"][$i];
                    }
                }

                if($data["IdMoneda"][$i] == "2") {
                    if($data["codigo_formapago"][$i] == "EFE") {
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

            
            $caja_diaria_repositorio->update_totales($update_caja_diaria);
            // $this->base_model->modificar($this->preparar_datos("dbo.ERP_CajaDiaria", $update_caja_diaria));

            $this->base_model->insertar($this->preparar_datos("dbo.ERP_VentaFormaPago", $data_formas_pago));

            //  PARA TICKET
            $data_formas_pago_ticket = $data;
            for ($i=0; $i < count($data["codigo_formapago"]); $i++) { 
                $data_formas_pago_ticket["idventa"][$i] = $data_ticket["idventa"];
               
                if($i == 0) {

                    $data_formas_pago_ticket["consecutivo"][$i] = $repo->get_consecutivo("ERP_VentaFormaPago", "consecutivo");
                   
                } else {
                    $data_formas_pago_ticket["consecutivo"][$i] = $data_formas_pago_ticket["consecutivo"][$i-1] + 1;
                }

                
            }

            $this->base_model->insertar($this->preparar_datos("dbo.ERP_VentaFormaPago", $data_formas_pago_ticket));



            $repoCC->actualizar_correlativo($data["serie_comprobante"], $data["numero_comprobante"]);
            $repoCC->actualizar_correlativo($serie_ticket, $consecutivo_ticket);

            // update stock
            $repo->update_stock($data_venta["idventa"]);
            
            $result["datos"][0]["estado"] = (isset($update_solicitud["estado"])) ? $update_solicitud["estado"] : "";
            $result["datos"][0]["tipo_solicitud"] = $solicitud[0]->tipo_solicitud;
            $result["datos"][0]["idventa_ticket"] = $data_ticket["idventa"];
            DB::commit();
            return response()->json($result);
        } catch (\Exception $e) {
            DB::rollBack();
            $response["status"] = "ei"; 
            $response["msg"] = $e->getMessage(); 
            return response()->json($response);
        }

    }

    public function guardar_pago_cuotas_credito(CajaDiariaDetalleInterface $repo, Request $request, SolicitudInterface $solicitud_repositorio, ConsecutivosComprobantesInterface $repoCC, CajaDiariaInterface $caja_diaria_repositorio) {

        $data = $request->all();

        // print_r($data); exit;
        $result = array();
    
        try {
            DB::beginTransaction();
            $solicitud = $solicitud_repositorio->get_solicitud($data["cCodConsecutivo"], $data["nConsecutivo"]);

            $parametro_cuota = $repo->get_parametro_cuota();

            if(count($parametro_cuota) <= 0) {
                throw new Exception("Por favor cree el parametro con el id del producto de tipo cuota!");
            }


            $data_venta = array();
           
            $data_venta["idventa"] = $repo->get_consecutivo("ERP_Venta", "idventa");
            $data_venta["serie_comprobante"] = $data["serie_comprobante"];
            $data_venta["numero_comprobante"] = $data["numero_comprobante"];
            $data_venta["cCodConsecutivo_solicitud"] = $data["cCodConsecutivo"];
            $data_venta["nConsecutivo_solicitud"] = $data["nConsecutivo"];
            $data_venta["condicion_pago"] = 1;
           
            $data_venta["fecha_emision"] = date("Y-m-d H:i:s");
            $data_venta["idcliente"] = $solicitud[0]->idcliente;
            $data_venta["tipo_comprobante"] = "0";
            $data_venta["descuento_id"] = "";
            $data_venta["IdTipoDocumento"] = "12";

              
            $data_venta["t_porcentaje_descuento"] = "";
            $data_venta["t_monto_descuento"] = "";
            $data_venta["t_monto_subtotal"] = $data["total_pagar"];
            $data_venta["t_monto_exonerado"] = "";
            $data_venta["t_monto_afecto"] = "";
            $data_venta["t_monto_inafecto"] = "";
            $data_venta["t_impuestos"] = "";
            $data_venta["t_monto_total"] = $data["total_pagar"];
            $data_venta["monto_descuento_detalle"] = "";


            $data_venta["user_updated"] = "";
            $data_venta["updated_at"] = "";

            $data_venta["saldo"] = "0";
            $data_venta["pagado"] = $data["total_pagar"];

            $data_venta["idmoneda"] = $solicitud[0]->idmoneda;

            $data_venta["idcajero"] = auth()->id();
            $data_venta["idtienda"] = $repo->get_caja_diaria()[0]->idtienda;
            $data_venta["idcaja"] = $repo->get_caja_diaria()[0]->idcaja;

            $data_venta["idventa_comprobante"] = "";
            $data_venta["idventa_separacion"] = $data["idventa_separacion"];
           
            $data_venta["idventa_nota"] = $data["idventa_nota"];
            $result = $this->base_model->insertar($this->preparar_datos("dbo.ERP_Venta", $data_venta));

            for ($i=0; $i < count($data["nrocuota"]); $i++) { 
                $data_venta_detalle = array();
                $data_venta_detalle["idventa"] = $data_venta["idventa"];
                $data_venta_detalle["consecutivo"] = $repo->get_consecutivo("ERP_VentaDetalle", "consecutivo");
                $data_venta_detalle["idarticulo"] = $parametro_cuota[0]->value;
                $data_venta_detalle["um_id"] = "07"; //codigo unidad
                $data_venta_detalle["cantidad"] = 1;
                $data_venta_detalle["precio_unitario"] = $data["monto_pago_credito"][$i];
                $data_venta_detalle["iddescuento"] = "";
                $data_venta_detalle["porcentaje_descuento"] = "";
                $data_venta_detalle["precio_total"] = $data["monto_pago_credito"][$i];
                $data_venta_detalle["monto_descuento"] = "";
                $data_venta_detalle["monto_subtotal"] = $data["monto_pago_credito"][$i];
                $data_venta_detalle["monto_exonerado"] = "";
                $data_venta_detalle["monto_afecto"] = "";
                
            
                $data_venta_detalle["monto_inafecto"] = "";
                $data_venta_detalle["impuestos"] = "";
                $data_venta_detalle["monto_total"] = $data["monto_pago_credito"][$i];
                $data_venta_detalle["cOperGrat"] = "";
                $data_venta_detalle["nOperGratuita"] = "";

                $data_venta_detalle["nrocuota"] = $data["nrocuota"][$i];
                $data_venta_detalle["valor_cuota_pagada"] = $data["monto_pago_credito"][$i];
                $data_venta_detalle["int_moratorio_pagado"] = "";

                $this->base_model->insertar($this->preparar_datos("dbo.ERP_VentaDetalle", $data_venta_detalle));
                
                $update_solicitud_cronograma = array();
                $update_solicitud_cronograma["cCodConsecutivo"] = $data["cCodConsecutivo"];
                $update_solicitud_cronograma["nConsecutivo"] = $data["nConsecutivo"];
                $update_solicitud_cronograma["nrocuota"] = $data["nrocuota"][$i];
                $update_solicitud_cronograma["saldo_cuota"] = $data["saldo_cuota"][$i];
                $update_solicitud_cronograma["monto_pago"] = $data["monto_pago_credito"][$i];
                $solicitud_repositorio->update_solicitud_cronograma($update_solicitud_cronograma);
            }   

           
           
            // GUARDAR FORMAS DE PAGO EN VENTA Y CAJA   
            $data_formas_pago = $data;
            // var_dump($data["codigo_formapago"]); exit;
            $efectivo_soles = 0;
            $no_efectivo_soles = 0;
            $efectivo_dolares = 0;
            $no_efectivo_dolares = 0;
            // echo count($data["codigo_formapago"]); exit;
            for ($fp=0; $fp < count($data["codigo_formapago"]); $fp++) { 
                $data_formas_pago["idventa"][$fp] = $data_venta["idventa"];

                 // actualizamos la venta por separacion
                if($data["codigo_formapago"][$fp] == "SEP") {
                    $sql_update = "UPDATE ERP_Venta SET aplicado_separacion = 'S'       
                    WHERE idventa={$data["idventa_separacion"]}";
            
                    DB::statement($sql_update);
                }

                 // actualizamos la venta por nota
                 if($data["codigo_formapago"][$fp] == "NCR") {
                    $sql_update = "UPDATE ERP_Venta SET aplicado_nota= 'S'       
                    WHERE idventa={$data["idventa_nota"]}";
            
                    DB::statement($sql_update);
                }
                
                if($fp == 0) {

                    $data_formas_pago["consecutivo"][$fp] = $repo->get_consecutivo("ERP_VentaFormaPago", "consecutivo");
                   
                } else {
                    $data_formas_pago["consecutivo"][$fp] = $data_formas_pago["consecutivo"][$fp-1] + 1;
                }
              

                $data_caja_detalle = array();
                $data_caja_detalle["idCajaDiaria"] = $repo->get_caja_diaria()[0]->idCajaDiaria; 
                $data_caja_detalle["consecutivo"] = $repo->get_consecutivo("ERP_CajaDiariaDetalle", "consecutivo");
                $data_caja_detalle["codigoTipo"] = "VTA";
                $data_caja_detalle["codigoFormaPago"] = $data["codigo_formapago"][$fp];
                $data_caja_detalle["idMoneda"] = $data["IdMoneda"][$fp];
                $data_caja_detalle["monto"] = $data["monto_pago"][$fp];
                $data_caja_detalle["descripcion"] = "Ingreso por Pago Cuota";
                $data_caja_detalle["nroTarjeta"] = $data["nrotarjeta"][$fp];
                $data_caja_detalle["nroOperacion"] = $data["nrooperacion"][$fp];
                $data_caja_detalle["naturaleza"] = "E";
               
                $this->base_model->insertar($this->preparar_datos("dbo.ERP_CajaDiariaDetalle", $data_caja_detalle));
                if($data["vuelto"][$fp] > 0) {
                    $data_caja_detalle = array();
                    $data_caja_detalle["idCajaDiaria"] = $repo->get_caja_diaria()[0]->idCajaDiaria; 
                    $data_caja_detalle["consecutivo"] = $repo->get_consecutivo("ERP_CajaDiariaDetalle", "consecutivo");
                    $data_caja_detalle["codigoTipo"] = "VTA";
                    $data_caja_detalle["codigoFormaPago"] = "EFE";
                    $data_caja_detalle["idMoneda"] = $solicitud[0]->idmoneda;
                    $data_caja_detalle["monto"] = $data["vuelto"][$fp];
                    $data_caja_detalle["descripcion"] = "Vuelto por Pago Cuota";
                    $data_caja_detalle["nroTarjeta"] = "";
                    $data_caja_detalle["nroOperacion"] = "";
                    $data_caja_detalle["naturaleza"] = "S";
                    
                    $this->base_model->insertar($this->preparar_datos("dbo.ERP_CajaDiariaDetalle", $data_caja_detalle));
                    
                    if($solicitud[0]->idmoneda == "1") {
                        $efectivo_soles -= $data["vuelto"][$fp];
                    }
                    
                    if($solicitud[0]->idmoneda == "2") {
                        $efectivo_dolares -= $data["vuelto"][$fp];
                    }
                }
                
                
                if($data["IdMoneda"][$fp] == "1") {
                    if($data["codigo_formapago"][$fp] == "EFE") {
                        $efectivo_soles += (float)$data["monto_pago"][$fp];
                    } else {
                        $no_efectivo_soles += (float)$data["monto_pago"][$fp];
                    }
                }
                
                if($data["IdMoneda"][$fp] == "2") {
                    if($data["codigo_formapago"][$fp] == "EFE") {
                        $efectivo_dolares += (float)$data["monto_pago"][$fp];
                    } else {
                        $no_efectivo_dolares += (float)$data["monto_pago"][$fp];
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
         
            
            $caja_diaria_repositorio->update_totales($update_caja_diaria);
            // $this->base_model->modificar($this->preparar_datos("dbo.ERP_CajaDiaria", $update_caja_diaria));

            $this->base_model->insertar($this->preparar_datos("dbo.ERP_VentaFormaPago", $data_formas_pago));
           

            //ACTUALIZAR SALDOS EN SOLICITUD
            $update_solicitud = array();
            $update_solicitud["cCodConsecutivo"] = $data["cCodConsecutivo"];
            $update_solicitud["nConsecutivo"] = $data["nConsecutivo"];
            $update_solicitud["monto_pagar_credito"] = $data["monto_pagar_credito"];
            $solicitud_repositorio->update_saldos_solicitud($update_solicitud);

            //ACTUALIZAR SALDOS EN LA SEGUNDA VENTA POR EL SALDO 
            $update_venta = array();
            $update_venta["cCodConsecutivo"] = $data["cCodConsecutivo"];
            $update_venta["nConsecutivo"] = $data["nConsecutivo"];
            $update_venta["monto_pagar_credito"] = $data["monto_pagar_credito"];
            $caja_diaria_repositorio->update_saldos_venta($update_venta);

            // echo "ola"; exit;   
           


          
            $repoCC->actualizar_correlativo($data["serie_comprobante"], $data["numero_comprobante"]);
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

    public function subfijo($xx)
    { // esta función regresa un subfijo para la cifra
        $xx = trim($xx);
        $xstrlen = strlen($xx);
        if ($xstrlen == 1 || $xstrlen == 2 || $xstrlen == 3)
            $xsub = "";
        //
        if ($xstrlen == 4 || $xstrlen == 5 || $xstrlen == 6)
            $xsub = "MIL";
        //
        return $xsub;
    }

    public function convertir($xcifra)
    {
        $xarray = array(
            0 => "CERO",
            1 => "UN", "DOS", "TRES", "CUATRO", "CINCO", "SEIS", "SIETE", "OCHO", "NUEVE",
            "DIEZ", "ONCE", "DOCE", "TRECE", "CATORCE", "QUINCE", "DIECISEIS", "DIECISIETE", "DIECIOCHO", "DIECINUEVE",
            "VEINTI", 30 => "TREINTA", 40 => "CUARENTA", 50 => "CINCUENTA", 60 => "SESENTA", 70 => "SETENTA", 80 => "OCHENTA", 90 => "NOVENTA",
            100 => "CIENTO", 200 => "DOSCIENTOS", 300 => "TRESCIENTOS", 400 => "CUATROCIENTOS", 500 => "QUINIENTOS", 600 => "SEISCIENTOS", 700 => "SETECIENTOS", 800 => "OCHOCIENTOS", 900 => "NOVECIENTOS"
        );
        //
        $xcifra = trim($xcifra);
        $xlength = strlen($xcifra);
        $xpos_punto = strpos($xcifra, ".");
        $xaux_int = $xcifra;
        $xdecimales = "00";
        if (!($xpos_punto === false)) {
            if ($xpos_punto == 0) {
                $xcifra = "0" . $xcifra;
                $xpos_punto = strpos($xcifra, ".");
            }
            $xaux_int = substr($xcifra, 0, $xpos_punto); // obtengo el entero de la cifra a convertir
            $xdecimales = substr($xcifra . "00", $xpos_punto + 1, 2); // obtengo los valores decimales
        }

        $XAUX = str_pad($xaux_int, 18, " ", STR_PAD_LEFT); // ajusto la longitud de la cifra, para que sea divisible por centenas de miles (grupos de 6)
        $xcadena = "";
        for ($xz = 0; $xz < 3; $xz++) {
            $xaux = substr($XAUX, $xz * 6, 6);
            $xi = 0;
            $xlimite = 6; // inicializo el Ytador de centenas xi y establezco el límite a 6 dígitos en la parte entera
            $xexit = true; // bandera para Ytrolar el ciclo del While
            while ($xexit) {
                if ($xi == $xlimite) { // si ya llegó al límite máximo de enteros
                    break; // termina el ciclo
                }

                $x3digitos = ($xlimite - $xi) * -1; // comienzo Y los tres primeros digitos de la cifra, comenzando por la izquierda
                $xaux = substr($xaux, $x3digitos, abs($x3digitos)); // obtengo la centena (los tres dígitos)
                for ($xy = 1; $xy < 4; $xy++) { // ciclo para revisar centenas, decenas y unidades, en ese orden
                    switch ($xy) {
                        case 1: // checa las centenas
                            if (substr($xaux, 0, 3) < 100) { // si el grupo de tres dígitos es menor a una centena ( < 99) no hace nada y pasa a revisar las decenas

                            } else {
                                $key = (int) substr($xaux, 0, 3);
                                if (TRUE === array_key_exists($key, $xarray)) {  // busco si la centena es número redondo (100, 200, 300, 400, etc..)
                                    $xseek = $xarray[$key];
                                    $xsub = $this->subfijo($xaux); // devuelve el subfijo correspondiente (Millón, Millones, Mil o nada)
                                    if (substr($xaux, 0, 3) == 100)
                                        $xcadena = " " . $xcadena . " CIEN " . $xsub;
                                    else
                                        $xcadena = " " . $xcadena . " " . $xseek . " " . $xsub;
                                    $xy = 3; // la centena fue redonda, entonces termino el ciclo del for y ya no reviso decenas ni unidades
                                } else { // entra aquí si la centena no fue numero redondo (101, 253, 120, 980, etc.)
                                    $key = (int) substr($xaux, 0, 1) * 100;
                                    $xseek = $xarray[$key]; // toma el primer caracter de la centena y lo multiplica por cien y lo busca en el arreglo (para que busque 100,200,300, etc)
                                    $xcadena = " " . $xcadena . " " . $xseek;
                                } // ENDIF ($xseek)
                            } // ENDIF (substr($xaux, 0, 3) < 100)
                            break;
                        case 2: // checa las decenas (Y la misma lógica que las centenas)
                            if (substr($xaux, 1, 2) < 10) {
                            } else {
                                $key = (int) substr($xaux, 1, 2);
                                if (TRUE === array_key_exists($key, $xarray)) {
                                    $xseek = $xarray[$key];
                                    $xsub = $this->subfijo($xaux);
                                    if (substr($xaux, 1, 2) == 20)
                                        $xcadena = " " . $xcadena . " VEINTE " . $xsub;
                                    else
                                        $xcadena = " " . $xcadena . " " . $xseek . " " . $xsub;
                                    $xy = 3;
                                } else {
                                    $key = (int) substr($xaux, 1, 1) * 10;
                                    $xseek = $xarray[$key];
                                    if (20 == substr($xaux, 1, 1) * 10)
                                        $xcadena = " " . $xcadena . " " . $xseek;
                                    else
                                        $xcadena = " " . $xcadena . " " . $xseek . " Y ";
                                } // ENDIF ($xseek)
                            } // ENDIF (substr($xaux, 1, 2) < 10)
                            break;
                        case 3: // checa las unidades
                            if (substr($xaux, 2, 1) < 1) { // si la unidad es cero, ya no hace nada

                            } else {
                                $key = (int) substr($xaux, 2, 1);
                                $xseek = $xarray[$key]; // obtengo directamente el valor de la unidad (del uno al nueve)
                                $xsub = $this->subfijo($xaux);
                                $xcadena = " " . $xcadena . " " . $xseek . " " . $xsub;
                            } // ENDIF (substr($xaux, 2, 1) < 1)
                            break;
                    } // END SWITCH
                } // END FOR
                $xi = $xi + 3;
            } // ENDDO

            if (substr(trim($xcadena), -5, 5) == "ILLON") // si la cadena obtenida termina en MILLON o BILLON, entonces le agrega al final la Yjuncion DE
                $xcadena .= " DE";

            if (substr(trim($xcadena), -7, 7) == "ILLONES") // si la cadena obtenida en MILLONES o BILLONES, entoncea le agrega al final la Yjuncion DE
                $xcadena .= " DE";

            // ----------- esta línea la puedes cambiar de acuerdo a tus necesidades o a tu país -------
            if (trim($xaux) != "") {
                switch ($xz) {
                    case 0:
                        if (trim(substr($XAUX, $xz * 6, 6)) == "1")
                            $xcadena .= "UN BILLON ";
                        else
                            $xcadena .= " BILLONES ";
                        break;
                    case 1:
                        if (trim(substr($XAUX, $xz * 6, 6)) == "1")
                            $xcadena .= "UN MILLON ";
                        else
                            $xcadena .= " MILLONES ";
                        break;
                    case 2:
                        if ($xcifra < 1) {
                            $xcadena = "$xdecimales/100 SOLES";
                        }
                        if ($xcifra >= 1 && $xcifra < 2) {
                            $xcadena = "UNO Y $xdecimales/100 SOLES ";
                        }
                        if ($xcifra >= 2) {
                            $xcadena .= " Y $xdecimales/100 SOLES "; //
                        }
                        break;
                } // endswitch ($xz)
            } // ENDIF (trim($xaux) != "")
            // ------------------      en este caso, para México se usa esta leyenda     ----------------
            $xcadena = str_replace("VEINTI ", "VEINTI", $xcadena); // quito el espacio para el VEINTI, para que quede: VEINTICUATRO, VEINTIUN, VEINTIDOS, etc
            $xcadena = str_replace("  ", " ", $xcadena); // quito espacios dobles
            $xcadena = str_replace("UN UN", "UN", $xcadena); // quito la duplicidad
            $xcadena = str_replace("  ", " ", $xcadena); // quito espacios dobles
            $xcadena = str_replace("BILLON DE MILLONES", "BILLON DE", $xcadena); // corrigo la leyenda
            $xcadena = str_replace("BILLONES DE MILLONES", "BILLONES DE", $xcadena); // corrigo la leyenda
            $xcadena = str_replace("DE UN", "UN", $xcadena); // corrigo la leyenda
        } // ENDFOR ($xz)
        return trim($xcadena);
    }

    

    public function imprimir_cronograma($id, CajaDiariaDetalleInterface $repo, SolicitudInterface $solicitud_repositorio, CustomerInterface $cliente_repositorio, PersonaInterface $persona_repositorio, VisitaClienteInterface $visita_repo) {
        $array = explode("|", $id);
        $cCodConsecutivo = $array[0];
        $nConsecutivo = $array[1];



        $datos = array();

    
        $solicitud = $solicitud_repositorio->get_solicitud($cCodConsecutivo, $nConsecutivo);
        $solicitud_credito = $solicitud_repositorio->get_solicitud_credito($cCodConsecutivo, $nConsecutivo);
       
        $datos["empresa"] = $repo->get_empresa(); 
        $datos["venta"] = $repo->get_segunda_venta_credito($cCodConsecutivo, $nConsecutivo); 
        $datos["solicitud_credito"] = $solicitud_credito; 
        $datos["solicitud"] = $solicitud; 
        $datos["cliente"] = $cliente_repositorio->find($solicitud[0]->idcliente);
        $idconyugue = (!empty($solicitud_credito[0]->idconyugue)) ? $solicitud_credito[0]->idconyugue : "0";
        $datos["conyugue"] = $persona_repositorio->find($idconyugue);

        $idfiadorconyugue = (!empty($solicitud_credito[0]->idfiadorconyugue)) ? $solicitud_credito[0]->idfiadorconyugue : "0";
        
        $datos["fiadorconyugue"] = $persona_repositorio->find($idfiadorconyugue);
      
        $idfiador = (!empty($solicitud_credito[0]->idfiador)) ? $solicitud_credito[0]->idfiador : "0";
        $datos["fiador"] = $persona_repositorio->find($idfiador);
        $datos["solicitud_cronograma"] = $solicitud_repositorio->get_solicitud_cronograma($cCodConsecutivo, $nConsecutivo);

        foreach ($datos["solicitud_cronograma"] as $key => $value) {
            $ultimo_pago_x_cuota = $visita_repo->ultimo_pago_x_cuota($cCodConsecutivo, $nConsecutivo, $value->nrocuota);
            $datos["solicitud_cronograma"][$key]->ultimo_pago_x_cuota = $ultimo_pago_x_cuota;
        }
        // echo "<pre>";
        // print_r($datos);
        // exit;
        $datos["producto"] = $solicitud_repositorio->get_solicitud_articulo_vehiculo($cCodConsecutivo, $nConsecutivo);
        //   echo "<pre>";
        // print_r($datos); exit;
        $pdf = PDF::loadView("solicitud.cronograma", $datos);

        // return $pdf->save("ficha_asociado.pdf"); // guardar
        // return $pdf->download("ficha_asociado.pdf"); // descargar
        return $pdf->stream("cronograma.pdf"); // ver

    }

    public function imprimir_ticket($id, CajaDiariaDetalleInterface $repo, SolicitudInterface $solicitud_repositorio, CustomerInterface $cliente_repositorio, PersonaInterface $persona_repositorio) {
        $array = explode("|", $id);
        $cCodConsecutivo = $array[0];
        $nConsecutivo = $array[1];
        $idventa = $array[2];

        $datos = array();
        $solicitud = $solicitud_repositorio->get_solicitud($cCodConsecutivo, $nConsecutivo);
        $solicitud_credito = $solicitud_repositorio->get_solicitud_credito($cCodConsecutivo, $nConsecutivo);

        $datos["empresa"] = $repo->get_empresa(); 
        // $datos["tienda"] = $repo->get_tienda(); 
        $datos["venta"] = $repo->get_venta($idventa); 
        $idventa_comprobante = (isset($datos["venta"][0]->idventa_comprobante)) ? $datos["venta"][0]->idventa_comprobante : "0";
        $datos["venta_comprobante"] = $repo->get_venta($idventa_comprobante); 
        // echo "<pre>";
        // print_r($datos);
        // exit;
        // $datos["cajero"] = $repo->get_cajero(); 
        // $datos["caja_diaria"] = $repo->get_caja_diaria(); 
        $datos["venta_formas_pago"] = $repo->get_venta_formas_pago($idventa); 
        $datos["solicitud_credito"] = $solicitud_credito; 
        $datos["solicitud"] = $solicitud; 
        $datos["cliente"] = $cliente_repositorio->find($solicitud[0]->idcliente);
        $idconyugue = (!empty($solicitud_credito[0]->idconyugue)) ? $solicitud_credito[0]->idconyugue : "0";
        $datos["conyugue"] = $persona_repositorio->find($idconyugue);

        $idfiador = (!empty($solicitud_credito[0]->idfiador)) ? $solicitud_credito[0]->idfiador : "0";
        $datos["fiador"] = $persona_repositorio->find($idfiador);
        $datos["solicitud_cronograma"] = $solicitud_repositorio->get_solicitud_cronograma($cCodConsecutivo, $nConsecutivo);
        $datos["producto"] = $solicitud_repositorio->get_solicitud_articulo_vehiculo($cCodConsecutivo, $nConsecutivo);
        $pdf = PDF::loadView("solicitud.ticket", $datos);
        $pdf->setPaper(array(0,0,249.45, 600), 'portrait');
        // "b7" => array(0,0,249.45,354.33),

        // return $pdf->save("ficha_asociado.pdf"); // guardar
        // return $pdf->download("ficha_asociado.pdf"); // descargar
        return $pdf->stream("ticket.pdf"); // ver

    }


    public function imprimir_ticket_pago_cuota($id, CajaDiariaDetalleInterface $repo, SolicitudInterface $solicitud_repositorio, CustomerInterface $cliente_repositorio, PersonaInterface $persona_repositorio) {
        $array = explode("|", $id);
        $cCodConsecutivo = $array[0];
        $nConsecutivo = $array[1];
        $idventa = $array[2];

        $datos = array();
        $solicitud = $solicitud_repositorio->get_solicitud($cCodConsecutivo, $nConsecutivo);
        $solicitud_credito = $solicitud_repositorio->get_solicitud_credito($cCodConsecutivo, $nConsecutivo);

        $datos["empresa"] = $repo->get_empresa(); 
        // $datos["tienda"] = $repo->get_tienda(); 
        $datos["venta"] = $repo->get_venta($idventa); 
        $idventa_comprobante = (isset($datos["venta"][0]->idventa_comprobante)) ? $datos["venta"][0]->idventa_comprobante : "0";
        $datos["venta_comprobante"] = $repo->get_venta($idventa_comprobante); 
       
        // $datos["cajero"] = $repo->get_cajero(); 
        // $datos["caja_diaria"] = $repo->get_caja_diaria(); 
        $datos["venta_formas_pago"] = $repo->get_venta_formas_pago($idventa); 
        $datos["venta_detalle"] = $repo->get_venta_detalle($idventa); 
        $datos["segunda_venta"] = $repo->get_segunda_venta_credito($cCodConsecutivo, $nConsecutivo); 
        //  echo "<pre>";
        // print_r($datos);
        // exit;
        $datos["solicitud_credito"] = $solicitud_credito; 
        $datos["solicitud"] = $solicitud; 
        $datos["cliente"] = $cliente_repositorio->find($solicitud[0]->idcliente);
        $idconyugue = (!empty($solicitud_credito[0]->idconyugue)) ? $solicitud_credito[0]->idconyugue : "0";
        $datos["conyugue"] = $persona_repositorio->find($idconyugue);

        $idfiador = (!empty($solicitud_credito[0]->idfiador)) ? $solicitud_credito[0]->idfiador : "0";
        $datos["fiador"] = $persona_repositorio->find($idfiador);
        $datos["solicitud_cronograma"] = $solicitud_repositorio->get_solicitud_cronograma($cCodConsecutivo, $nConsecutivo);
        $datos["producto"] = $solicitud_repositorio->get_solicitud_articulo_vehiculo($cCodConsecutivo, $nConsecutivo);
        $pdf = PDF::loadView("solicitud.ticket_pago_cuota", $datos);
        $pdf->setPaper(array(0,0,249.45, 600), 'portrait');
        // "b7" => array(0,0,249.45,354.33),

        // return $pdf->save("ficha_asociado.pdf"); // guardar
        // return $pdf->download("ficha_asociado.pdf"); // descargar
        return $pdf->stream("ticket.pdf"); // ver

    }


    public function imprimir_comprobante($id, CajaDiariaDetalleInterface $repo, SolicitudInterface $solicitud_repositorio, CustomerInterface $cliente_repositorio, PersonaInterface $persona_repositorio) {
        $array = explode("|", $id);
        $cCodConsecutivo = $array[0];
        $nConsecutivo = $array[1];
        $idventa = $array[2];

        $datos = array();
        $datos["venta_anticipo"] = array();
        $datos["solicitud"] = array();
        // $bool = $cCodConsecutivo != "null" && $cCodConsecutivo != "0";
        // var_dump($bool);
        if($cCodConsecutivo != "null" && $cCodConsecutivo != "0" && $nConsecutivo != "null" && $nConsecutivo != "0") {
     
            $solicitud = $solicitud_repositorio->get_solicitud($cCodConsecutivo, $nConsecutivo);
            $solicitud_credito = $solicitud_repositorio->get_solicitud_credito($cCodConsecutivo, $nConsecutivo);
            $datos["venta_anticipo"] = $repo->get_venta_anticipo($cCodConsecutivo, $nConsecutivo); 
            $datos["solicitud_credito"] = $solicitud_credito; 
            $datos["solicitud"] = $solicitud; 
            $datos["solicitud_cronograma"] = $solicitud_repositorio->get_solicitud_cronograma($cCodConsecutivo, $nConsecutivo);
            $idconyugue = (!empty($solicitud_credito[0]->idconyugue)) ? $solicitud_credito[0]->idconyugue : "0";
            $datos["conyugue"] = $persona_repositorio->find($idconyugue);
    
            $idfiador = (!empty($solicitud_credito[0]->idfiador)) ? $solicitud_credito[0]->idfiador : "0";
            $datos["fiador"] = $persona_repositorio->find($idfiador);
            $datos["producto"] = $solicitud_repositorio->get_solicitud_articulo_vehiculo($cCodConsecutivo, $nConsecutivo);
            
        }

     
      

        $datos["empresa"] = $repo->get_empresa(); 
        // $datos["tienda"] = $repo->get_tienda(); 
        $datos["venta"] = $repo->get_venta($idventa); 
        $datos["venta_anticipo_separacion"] = array();
        if(!empty($datos["venta"][0]->idventa_separacion)) {
            $datos["venta_anticipo_separacion"] = $repo->get_venta_anticipo_separacion($datos["venta"][0]->idventa_separacion); 
        }

        $datos["venta_detalle"] = $repo->get_venta_detalle($idventa); 
       
        if($datos["venta"][0]->idventa_referencia != "") {
            $datos["venta_referencia"] = $repo->get_venta($datos["venta"][0]->idventa_referencia); 
            

        }
        // echo "<pre>";
        // print_r($datos); exit;
        
       
        $datos["producto"] = $solicitud_repositorio->get_solicitud_articulo_vehiculo($cCodConsecutivo, $nConsecutivo);
        // $datos["cajero"] = $repo->get_cajero(); 
        $datos["caja_diaria"] = $repo->get_caja_diaria(); 
        $datos["tiendas"] = $repo->get_tiendas(); 
        $datos["venta_formas_pago"] = $repo->get_venta_formas_pago($idventa); 
        // if($datos["venta_detalle"][0]->idarticulo != 1862) {
          
        // }
      
        $datos["total_letras"] = $this->convertir($datos["venta"][0]->t_monto_total); 
        $datos["cliente"] = $cliente_repositorio->find($datos["venta"][0]->idcliente);
       
   
       
        // echo "<pre>";
        // print_r($datos);
        // exit;

        $pdf = PDF::loadView("solicitud.comprobante", $datos);
      
        // return $pdf->save("ficha_asociado.pdf"); // guardar
        // return $pdf->download("ficha_asociado.pdf"); // descargar
        return $pdf->stream("comprobante.pdf"); // ver

    }

    public function obtener_tipo_cambio_venta(Orden_servicioInterface $repo_orden, Request $request) {
        $data = $request->all();
        $fecha_actual = date("Y-m-d");
        $result = $repo_orden->cambio_tipo_venta($data["idmoneda"], $fecha_actual);

        return response()->json($result);
    }

    public function list_comprobantes(Request $request, VentasInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['idventa', 'serie_comprobante', 'numero_comprobante', 'fecha_emision', 'tipo_documento', 'numero_documento', 'moneda', 't_monto_total', 'pagado', 'saldo', 'cCodConsecutivo_solicitud', 'nConsecutivo_solicitud', 'tipo_solicitud', "estado", 'IdTipoDocumento', 'anticipo'];
        // print_r($repo->search($s)); exit;
        return parseList($repo->search($s), $request, 'idventa', $params);
    }

    public function obtener_consecutivo_comprobante(CajaDiariaDetalleInterface $repo, ConsecutivosComprobantesInterface $repoCC) {
        
        $ticket = $repoCC->obtener_consecutivo_comprobante(12,  $repo->get_caja_diaria()[0]->idtienda);
        return response()->json($ticket);
    }
    

   

}
