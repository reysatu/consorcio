<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\RegisterOrdenCompra\RegisterOrdenCompraTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\RegisterOrdenCompra\RegisterOrdenCompraInterface;
use App\Http\Recopro\Currency\CurrencyInterface;
use App\Http\Recopro\Warehouse\WarehouseInterface;
use App\Http\Recopro\Operation\OperationInterface;
use App\Http\Recopro\Product\ProductInterface;
use App\Http\Recopro\Lot\LotInterface;
use App\Http\Recopro\Localizacion\LocalizacionInterface;
use App\Http\Requests\RegisterOrdenCompraRequest;
use App\Http\Recopro\Serie\SerieInterface;
use App\Http\Recopro\Solicitud_Asignacion\Solicitud_AsignacionInterface;
use App\Http\Recopro\RegisterOrdenCompraArticulo\RegisterOrdenCompraArticuloInterface;
use App\Http\Recopro\ViewScomprArticulo\ViewScomprArticuloInterface;
use Carbon\Carbon;
use DB;

use Illuminate\Support\Facades\Storage;
class RegisterOrdenCompraController extends Controller
{
     use RegisterOrdenCompraTrait;

    public function __construct() 
    {
//        $this->middleware('json');
    }

    public function all(Request $request, RegisterOrdenCompraInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['id','cCodConsecutivo','nConsecutivo','dFecRegistro','prioridad','dFecRequerida','idProveedor','idMoneda','idcondicion_pago','subtotal','nDescuento','nPorcDescuento','nIdDscto','valorCompra','nImpuesto','total','direccionEntrega','iEstado','user_created','created_at','user_updated','updated_at'];
        return parseList($repo->search($s), $request, 'id', $params);
    }
    public function allScomprArticulo(Request $request, ViewScomprArticuloInterface $repo)
    { 
        $s = $request->input('search', '');
        $consecutivo = $request->input('consecutivo', '');
        $FechaRegistro = $request->input('FechaRegistro', ''); 
        $params = ['fecha_requerida', 'cCodConsecutivo','impuesto','nConsecutivo','idMovimiento','consecutivo','idArticulo','unidadMedida','cantidad','articulo'];
        return parseList($repo->search($s,$consecutivo,$FechaRegistro), $request, 'idMovimiento', $params);
    }

    public function create(RegisterOrdenCompraInterface $repo, RegisterOrdenCompraRequest $request)
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
     public function xmlcargar(Request $request,RegisterOrdenCompraInterface $repo)
    {   
        // $s = $request->input('search', '');
        $imagePath = 'xml/';
        $fileXml = $request->file('file');
        $nombre = $fileXml->getClientOriginalName();
        $ruta = public_path("xml/".$nombre);
        copy($fileXml, $ruta);
        // $xmlString = file_get_contents(public_path("img/products/".$nombre));
        // $xmlObject = simplexml_load_string($xmlString);
                   
        // $json = json_encode($xmlObject);
        // $phpArray = json_decode($json, true);
        // $nombre='catalogo.xml'; 
       $xml = simplexml_load_file(public_path("xml/".$nombre));
       $valor = $xml->xpath("cac:InvoiceLine");
       $valorMoneda = $xml->xpath("cbc:DocumentCurrencyCode");
       $monedFac=$valorMoneda[0]->__toString();
       $mone='';
       if($monedFac=='USD'){
        $mone='2';
       }else if($monedFac=='PEN'){
         $mone='1';
       }
       $arrayIdsProdE=[];
       $arrayCodProdE=[];
       $arrayDescripE=[];
       $arrayCantidaE=[];
       $arrayCostoUnE=[];
       $arrayCodProdN=[];
       $arrayDescripN=[];
       $arrayCantidaN=[];
       $arrayCostoUnN=[];
       foreach ($valor as $elemento) {
        $valorIgv=$elemento->xpath("cac:TaxTotal/cbc:TaxAmount");
        $valorCant=$elemento->xpath("cbc:InvoicedQuantity");
        $valorDescr=$elemento->xpath("cac:Item/cbc:Description");
        $valorProdu=$elemento->xpath("cac:Item/cac:SellersItemIdentification/cbc:ID");
        $valorImpor=$elemento->xpath("cbc:LineExtensionAmount");
        $valorCosto=$elemento->xpath("cac:PricingReference/cac:AlternativeConditionPrice/cbc:PriceAmount");
        $descrProd=$valorDescr[0]->__toString();
        $codigProd=$valorProdu[0]->__toString();
        $cantiProd=$valorCant[0]->__toString();
        $igvProd=$valorIgv[0]->__toString();
        $imporProd=$valorImpor[0]->__toString();
        $costoProd=$valorCosto[0]->__toString();
        $val=$repo->getProductoFactura($codigProd); 
         if (empty($val)) {

                array_push($arrayCodProdN,$codigProd);
                array_push($arrayDescripN,$descrProd);
                array_push($arrayCantidaN,$cantiProd);
                array_push($arrayCostoUnN,$costoProd);
            }else{
                array_push($arrayIdsProdE,$val[0]->id);
                array_push($arrayCodProdE,$codigProd);
                array_push($arrayDescripE,$descrProd);
                array_push($arrayCantidaE,$cantiProd);
                array_push($arrayCostoUnE,$costoProd);
            } 
       }

     

       // var_dump($arrayCodProdE);
       // echo("-------");
       // var_dump($arrayCodProdN);
       // echo($valor[0]->__toString());
        // $namespaces =$xml->Invoice->getNameSpaces(true);
        // $media = $xml->Invoice->children($namespaces['cac']);
         
        
        // $media = $xml->Invoice->children($namespaces['media']);
        // echo "El thumbnail es:" .$media->thumbnail."<br>";
     
        unlink(public_path("xml/".$nombre));     
          return response()->json([
            'Result' => 'OK',
            'Record' => [],
            'arrayIdsProdE'=>$arrayIdsProdE,
            'arrayCodProdE'=>$arrayCodProdE,
            'arrayDescripE'=>$arrayDescripE,
            'arrayCantidaE'=>$arrayCantidaE,
            'arrayCostoUnE'=>$arrayCostoUnE,
            'arrayCodProdN'=>$arrayCodProdN,
            'arrayDescripN'=>$arrayDescripN,
            'arrayCantidaN'=>$arrayCantidaN,
            'arrayCostoUnN'=>$arrayCostoUnN,
            'monedFac'=>$mone,

        ]);
    }
    public function procesarTransferencia($id, RegisterOrdenCompraInterface $repo, Request $request)
    {   try {
        $val=$repo->procesarTransferencia($id);
        // throw new \Exception('Ya existe un almacen con este código interno. Por favor ingrese otro código.');
        //     DB::commit();
            return response()->json([
                'status' => true,
                'data'=>$val,
            ]);

    }catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
    public function update(RegisterOrdenCompraInterface $repo, RegisterOrdenCompraRequest $request)
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


    public function destroy($id, RegisterOrdenCompraInterface $repo, Request $request)
    {   try {
        $val=$repo->destroy($id);
        // throw new \Exception('Ya existe un almacen con este código interno. Por favor ingrese otro código.');
        //     DB::commit();
            return response()->json([
                'status' => true,
                'data'=>$val,
            ]);

    }catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
    public function cambiarEstado($id, RegisterOrdenCompraInterface $repo, Request $request)
    {
        try {
             $mensaje='';
             $estado =$request->input('estadoCambio');
          
             $val=$repo->cambiar_estado($id,$estado);
            if($estado==1){
                $mensaje='Aprobó';
            }else if($estado==3){
                $mensaje='Cerró';
            }else if($estado==4){
                $mensaje='Canceló';
            }
            return response()->json([
                'status' => true,
                'mensaje'=>$mensaje,
            ]);

        }catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
    public function createUpdate($id, RegisterOrdenCompraInterface $repo, Request $request, OperationInterface $opRepo,RegisterOrdenCompraArticuloInterface $repoArti)
    {
        
        try {

            $data = $request->all();
            $table="ERP_OrdenCompra";
            $idt='id';
            $idcon='nConsecutivo';
            if ($id != 0) {
                $repo->update($id, $data);
                $movement = $repo->find($id);
                $id = $movement->id;
                $estado = $movement->iEstado;
                $nco = $movement->nConsecutivo;

            }else {
                $data['id'] = $repo->get_consecutivo($table,$idt);
                $data['nConsecutivo'] = $repo->get_consecutivo($table,$idcon);
                $movement = $repo->create($data);
                $id = $movement->id;
                $estado = $movement->iEstado;
                $nco = $movement->nConsecutivo;
            }

            


            $idArticulo = $data['idArticulo'];
            $idArticulo = explode(',', $idArticulo);

            $cantidad = $data['cantidad'];
            $cantidad = explode(',', $cantidad);

            $cantidadPendiente = $data['cantidadPendiente'];
            $cantidadPendiente = explode(',', $cantidadPendiente);


            $cantidadRecibida = $data['cantidadRecibida'];
            $cantidadRecibida = explode(',', $cantidadRecibida);

            $cantidadDevuelta = $data['cantidadDevuelta'];
            $cantidadDevuelta = explode(',', $cantidadDevuelta);

            $precioUnitario = $data['precioUnitario'];
            $precioUnitario = explode(',', $precioUnitario);

            $precioTotal = $data['precioTotal'];
            $precioTotal = explode(',', $precioTotal);

            $nImpuestoDetalle = $data['nImpuestoDetalle'];
            $nImpuestoDetalle = explode(',', $nImpuestoDetalle);

            ////
            $nIdDsctoDetalle = $data['nIdDsctoDetalle'];
            $nIdDsctoDetalle = explode(',', $nIdDsctoDetalle);

            $nDescuentoDetalle = $data['nDescuentoDetalle'];
            $nDescuentoDetalle = explode(',', $nDescuentoDetalle);

            $nPorcDescuentoDetalle = $data['nPorcDescuentoDetalle'];
            $nPorcDescuentoDetalle = explode(',', $nPorcDescuentoDetalle);


            $valorCompraDetalle = $data['valorCompraDetalle'];
            $valorCompraDetalle = explode(',', $valorCompraDetalle);


            $totalDetalle = $data['totalDetalle'];
            $totalDetalle = explode(',', $totalDetalle);


            $dFecRequeridaDetalle = $data['dFecRequeridaDetalle'];
            $dFecRequeridaDetalle = explode(',', $dFecRequeridaDetalle);


            $iEstadoDetalle = $data['iEstadoDetalle'];
            $iEstadoDetalle = explode(',', $iEstadoDetalle);


            $detalleModo = $data['detalleModo'];
            $detalleModo = explode(',', $detalleModo);


            for ($i = 0; $i < count($idArticulo); $i++) {
                    $datoLo = [];
                    $datoLo['idArticulo'] = $idArticulo[$i];
                    $datoLo['idOrden'] = $id;
                    $datoLo['cantidad'] = $cantidad[$i];
                    $datoLo['cantidadPendiente'] = $cantidadPendiente[$i];
                    $datoLo['cantidadRecibida'] = $cantidadRecibida[$i];
                    $datoLo['cantidadDevuelta'] = $cantidadDevuelta[$i];
                    $datoLo['precioUnitario'] = $precioUnitario[$i];
                    $datoLo['precioTotal'] = $precioTotal[$i];
                    $datoLo['nImpuesto'] = $nImpuestoDetalle[$i];
                    $datoLo['nIdDscto'] = $nIdDsctoDetalle[$i];
                    $datoLo['nDescuento'] = $nDescuentoDetalle[$i];
                    $datoLo['nPorcDescuento'] = $nPorcDescuentoDetalle[$i];
                    $datoLo['valorCompra'] = $valorCompraDetalle[$i];
                    $datoLo['total'] = $totalDetalle[$i];
                    $datoLo['dFecRequerida'] = $dFecRequeridaDetalle[$i];
                    $esta=$iEstadoDetalle[$i];
                    if($iEstadoDetalle[$i]=='N'){
                        $esta=0;
                    }
                    $datoLo['iEstado'] = $esta;

                if ($detalleModo[$i] == 0) {
                    $idt = 'id';
                    $table ="ERP_OrdenCompraArticulo";
                    $datoLo['id'] = $repoArti->get_consecutivo($table,$idt);
                    $repoArti->create($datoLo);
                }else {
                    $repoArti->update($detalleModo[$i], $datoLo);
                };

            }


            
          
            DB::commit();
            return response()->json([
                'status' => true,
                'code' => $id,
                'estado'=>$estado,
                'nco'=>$nco,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    } 
   

    // // public function getAll(BrandInterface $repo)
    // // {
    // //     return parseSelect($repo->all(), 'id', 'description');
    // // }

    public function excel(RegisterOrdenCompraInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE ORDENES DE COMPRA', 'Lista de ordenes de compra');
    }
    
    public function getLocalizacionSelec($id, LocalizacionInterface $repo)
    {
       try {
            $data = $repo->getLocalizacion($id);

            return response()->json([
                'status' => true,
                'data' => $data
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
    public function validateCantSerie($id, SerieInterface $reSeri){
        try {
            $datos=$id;
            $datos=explode('*', $datos);
            $idArticulo=$datos[0];
            $cantidad=$datos[1];
            $data = $reSeri->getSeries($idArticulo);
            $valor=count($data);
            $val="N";
            if($data){
                $val="A";
              if($cantidad>$valor){
                $val='S';
              }
            }
            return response()->json([
                'status' => true,
                'data' => $val,
                'cantidad'=>$valor
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
    public function validateLote($id, LotInterface $relot)
    {
       try {
            $data = $relot->findByCode($id);
            $valor='N';
            $fecha='N';
            $codigol='N';
            if($data){
                $valor='A';
                $fecha=$data->fechaVencimiento;
                $codigol=$data->idLote;
            }
            return response()->json([
                'status' => true,
                'data' => $valor,
                'fecha'=>$fecha,
                'codigol'=>$codigol,
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    } 
    public function valida_series_serve($id, SerieInterface $repo){

        try {
            $data=0;
            $series=explode(',',$id);
            for ($i=0; $i < count($series) ; $i++) { 
                    $data = $repo->findByCode($series[$i]);
                    if ($data) {
                    throw new \Exception('Ya existe una Serie con este código '.$series[$i]. 'Por favor ingrese otro código.');
                    break;
                    }
                       

             }
            return response()->json([
                'status' => true,
                'data' => $data
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    // public function getStockLoc($id, RegisterOrdenCompraInterface $repo){

    //     try {
    //         $datos=explode(',', $id);
    //         $idl=$datos[0];
    //         $idArl=$datos[1];
    //         $stock=0;
    //         $data = $repo->getStockLoc($idl, $idArl);
    //         if(!empty($data)){
    //             $stock=$data[0]->total;
    //         }
    //         return response()->json([
    //             'status' => true,
    //             'data' => $stock
    //         ]);

    //     } catch (\Exception $e) {
    //         return response()->json([
    //             'status' => false,
    //             'message' => $e->getMessage()
    //         ]);
    //     }
    // }
     public function pdf(Request $request, RegisterOrdenCompraInterface $repo,Solicitud_AsignacionInterface $repcom)
    {
            $id = $request->input('id');
            $idtipoOpe = $request->input('idtipoOpe', '');
            $data_movimientoEntrega=""; 
            $data_movimientoEntregaArti=""; 
            if($idtipoOpe==7){
                 $data_movimientoEntrega=$repo->get_movimientoEntregaProf($id);
                 $data_movimientoEntregaArti=$repo->get_movement_articulo_printProforma($id); 
            }else{
               $data_movimientoEntrega=$repo->get_movimientoEntrega($id); 
               $data_movimientoEntregaArti=$repo->get_movement_articulo_printVenta($id);
            }
            $operacion = $repo->get_movimiento($id);
            $data_compania=$repcom->get_compania(); 
            
            $data = $repo->find($id); 
            $data_movimiento_Articulo=$repo->get_movement_articulo_print($id);
            $data_movimiento_lote=$repo->get_movemen_lote($id);
            $data_movimiento_serie=$repo->get_movemen_Serie($id);
            if($data['fecha_proceso']){
                $data['fecha_proceso']=date("d/m/Y", strtotime($data['fecha_proceso']));
            }else{
               $data['fecha_proceso']=''; 
            };
            $data['fecha_impresion']=date("d/m/Y");
            $path = public_path('/'.$data_compania[0]->ruta_logo);
            $type_image = pathinfo($path, PATHINFO_EXTENSION);
            $image = file_get_contents($path);
            $image = 'data:image/' . $type_image . ';base64,' . base64_encode($image);
            return response()->json([
                'status' => true,
                'data_compania'=>$data_compania,
                'data' => $data,
                'operacion'=>$operacion,
                'movimiento_Ar'=>$data_movimiento_Articulo,
                'data_movimiento_lote'=>$data_movimiento_lote,
                'data_movimiento_serie'=>$data_movimiento_serie,
                'estado'=>$id,
                'img'=>$image,
                'data_movimientoEntrega'=>$data_movimientoEntrega,
                'data_movimientoEntregaArti'=>$data_movimientoEntregaArti,
            ]);
    }

    public function find($id, RegisterOrdenCompraInterface $repo)
    {
        try {
            $operaciones = $repo->getOperationFind();
            $data = $repo->find($id);
            $data_movimiento_Articulo = $repo->get_movement_articulo($id);
            $dataDescuento=$repo->get_data_descuento($data['nIdDscto']);
            // $data_movimiento_Articulo_entrega = $repo->get_movement_articulo_entrega($id);
            // $data_movimiento_Articulo_entrega_venta = $repo->get_movimiento_Articulo_entrega_venta($id);
            // $data_movimiento_lote=$repo->get_movemen_lote($id);
            // $data_movimiento_serie=$repo->get_movemen_Serie($id);
            // $data_movimiento_lote_entrega=$repo->get_movemen_lote_entrega($id);
            // $data_movimiento_serie_entrega=$repo->get_movemen_Serie_entrega($id);
            // $data_ventaMovimiento=$repo->get_movimientoVenta($id);
            $data['fecha_registro']=date("Y-m-d", strtotime($data['dFecRegistro']));
             $data['fecha_requerida']=date("Y-m-d", strtotime($data['dFecRequerida']));

            return response()->json([
                   'operaciones'=>$operaciones,
                    'status' => true,
                    'data' => $data,
                    'movimiento_Ar'=>$data_movimiento_Articulo,
                    'dataDescuento'=>$dataDescuento,
                 // 'data_movimiento_lote'=>$data_movimiento_lote,
                 // 'data_movimiento_serie'=>$data_movimiento_serie,
                 // 'data_movimiento_Articulo_entrega'=>$data_movimiento_Articulo_entrega,
                 // 'data_movimiento_Articulo_entrega_venta'=>$data_movimiento_Articulo_entrega_venta,
                 // 'data_ventaMovimiento'=>$data_ventaMovimiento,
                 // 'data_movimiento_lote_entrega'=>$data_movimiento_lote_entrega,
                 // 'data_movimiento_serie_entrega'=>$data_movimiento_serie_entrega,
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
    public function deleteDetalle($id, RegisterOrdenCompraInterface $repo, Request $request)
    {   try {
            
            $repo->destroy_detalle_Orden($id);
            return response()->json([
                'status' => true,
            ]);

    }catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function getDataArticulo($id, RegisterOrdenCompraInterface $repo)
    {
        try {
           
            $data = $repo->dataProducto($id);
            return response()->json([
               
                'status' => true,
                 'data' => $data,
              
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
    public function getLocaStock($id, RegisterOrdenCompraInterface $repo){

        try {
        
            $data = $repo->getLocaStock($id);
            $LocalizacionAlmacen=$repo->getLocalizacioAlmacen($id);
            return response()->json([
                'status' => true,
                'data' => $data,
             
                'LocalizacionAlmacen'=>$LocalizacionAlmacen,
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function validaDetalle($id, RegisterOrdenCompraInterface $repo){
        try {
            $data = $repo->getDetalle($id);
            if(empty($data)){
                 throw new \Exception("Debe registrar los artículos del movimiento");
            }

             DB::commit();
            return response()->json([
                'status' => true,
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
    public function data_form (RegisterOrdenCompraInterface $moventRepo,CurrencyInterface $currencyRepo, WarehouseInterface $WareRepo,OperationInterface $operRepo)
    {
        $moneda = parseSelectOnly($currencyRepo->allActive(), 'IdMoneda', 'Descripcion');
        $almacen = parseSelectOnly($WareRepo->allActive(), 'id', 'description');
        $operacion = parseSelectOnly($operRepo->allActive(), 'idTipoOperacion', 'descripcion');
        $usuario=auth()->id();
        $operaciones = $operRepo->getOperation($usuario);
        $operaciones_entra = $operRepo->getOperation_entra($usuario);
        $almacen_usuario = $WareRepo->getAlmacen_usuario($usuario);
        $almacen_todos = $WareRepo->getAlmacen_todos($usuario);
        $area=$moventRepo->getAreas();
        $consecutivo=$moventRepo->getConsecutivo();
        $idProveedor=$moventRepo->getProveedor();
        return response()->json([
            'status' => true,
            'moneda' => $moneda,
            'almacen' => $almacen,
            'operacion' => $operacion,
            'operaciones'=> $operaciones,
            'operaciones_entra'=>$operaciones_entra,
            'almacen_usuario'=>$almacen_usuario,
            'almacen_todos'=>$almacen_todos,
            'area'=> $area,
            'consecutivo'=>$consecutivo,
            'idProveedor'=>$idProveedor,
        ]);
    }
     
}