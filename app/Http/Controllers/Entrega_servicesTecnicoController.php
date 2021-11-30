<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;
use App\Http\Recopro\Register_movement\Register_movementTrait;
use App\Http\Recopro\Proforma\ProformaTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\Proforma\ProformaInterface;
use App\Http\Recopro\Register_movement\Register_movementInterface;
use App\Http\Recopro\Register_movement_Articulo\Register_movement_ArticuloInterface;
use App\Http\Recopro\Lot\LotInterface;
use App\Http\Recopro\Register_movement_Detalle\Register_movement_DetalleInterface;
use App\Http\Recopro\Register_Transfer_Articulo\Register_Transfer_ArticuloInterface;
use App\Http\Recopro\Serie\SerieInterface;
use App\Http\Recopro\Operation\OperationInterface;
use App\Http\Requests\ProformaRequest;
use DB;
class Entrega_servicesTecnicoController extends Controller
{
     use Register_movementTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }
 
    public function all(Request $request, Register_movementInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['idTipoOperacion','idUsuario','estado','idMovimiento'];
        return parseList($repo->search_entrega($s), $request, 'idMovimiento', $params);
    }

   public function excel(Register_movementInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all_entrega_servicio()), 'LISTA DE ENTREGAS A SERVICIOS TÉCNICOS', 'Entregas');
    }
    public function createUpdate($id, Register_movementInterface $repoM, Request $request, OperationInterface $opRepo,Register_movement_ArticuloInterface $repo,LotInterface $lorepo,Register_movement_DetalleInterface $redm,SerieInterface $seri,Register_Transfer_ArticuloInterface $vali)
    {
       
        try {
            $data = $request->all();
             $table="ERP_Movimiento";
             $idt='idMovimiento';
            $getNaturaleza=$opRepo->find($data['idTipoOperacion']);
            $naturaleza=$getNaturaleza->idNaturaleza;
            $data['idTipoOperacion'] =$data['idTipoOperacion'];
            $data['naturaleza'] =$naturaleza;
            $data['observaciones'] = strtoupper($data['observaciones']);
            $data['cCodConsecutivo'] = strtoupper($data['cCodConsecutivo']);
            $data['nConsecutivo'] = strtoupper($data['nConsecutivo']);
            if($data['observaciones']==''){
                $data['observaciones']=null;
            }
            $data['idUsuario']=auth()->id();
            if ($id != 0) {
                $repoM->update($id, $data);
                $movement = $repoM->find($id);
                $idMovimiento = $movement->idMovimiento;
                $estado = $movement->estado;

            }else {
                $data['idMovimiento'] = $repoM->get_consecutivo($table,$idt);
                $movement = $repoM->create($data);
                $id = $movement->id;
                $idMovimiento = $movement->idMovimiento;
                $estado = $movement->estado;
            }
           

            $idArticulo = $data['idArticulo'];
            $idArticulo = explode(',', $idArticulo);

            $idAlmacen = $data['idAlmacen'];
            $idAlmacen = explode(',', $idAlmacen);

            
            $idLocalizacion = $data['idLocalizacion'];
            $idLocalizacion = explode(',', $idLocalizacion);

            $cantidad = $data['cantidad'];
            $cantidad = explode(',', $cantidad);

            $costo = $data['costo'];
            $costo = explode(',', $costo);

            $costo_total = $data['costo_total'];
            $costo_total = explode(',', $costo_total);

            $precio = $data['precio'];
            $precio = explode(',', $precio);
            

            $precio_total = $data['precio_total'];
            $precio_total = explode(',', $precio_total);
           
            $idLote = $data['idLote'];
            $idLote = explode(',', $idLote);



            $dataLote = $data['dataLote'];
            $dataLote = explode(',', $dataLote);


            $idProductoSe = $data['idProductoSe'];
            $idProductoSe = explode(',', $idProductoSe);

            $serieSe = $data['serieSe'];
            $serieSe = explode(',', $serieSe);

            $idSerieSe = $data['idSerieSe'];
            $idSerieSe = explode(',', $idSerieSe);

            $identificador_serie_bd = $data['identificador_serie_bd'];
            $identificador_serie_bd = explode(',', $identificador_serie_bd);

            $ident_serie_bd_serie = $data['ident_serie_bd_serie'];
            $ident_serie_bd_serie = explode(',', $ident_serie_bd_serie);

            $ident_serie_bd_serie2 = $data['ident_serie_bd_serie2'];
            $ident_serie_bd_serie2 = explode(',', $ident_serie_bd_serie2);

            $serieNenv = $data['serieNenv'];
            $serieNenv = explode(',', $serieNenv);

            $idProductoSeN = $data['idProductoSeN'];
            $idProductoSeN = explode(',', $idProductoSeN);

            $chasiNs = $data['chasiNs'];
            $chasiNs = explode(',', $chasiNs);

            $motorNs = $data['motorNs'];
            $motorNs = explode(',', $motorNs);

            $anioNFs = $data['anioNFs'];
            $anioNFs = explode(',', $anioNFs);

            $anioNVs = $data['anioNVs'];
            $anioNVs = explode(',', $anioNVs);

            $colorNs = $data['colorNs'];
            $colorNs = explode(',', $colorNs);

            $valida="ha";
            for ($i=0; $i < count($idArticulo) ; $i++) { 
                if($data['naturaleza']!="C"){
                    $tipo=$vali->traerKit($idArticulo[$i]);
                $tipoSe=$vali->traerTipo($idArticulo[$i]);
                $tipoLo=$vali->traerTipoLo($idArticulo[$i]);
                $valoSrie=0;
                $valotLote=0;
                $idAl=$idAlmacen[$i];
                $idLoca=$idLocalizacion[$i];
                $idAr=$idArticulo[$i];
                $cant=$cantidad[$i];
                if($tipo[0]->type_id=="3"){
                $valida=$vali->validarStockKit($idAl,$idLoca,$idAr,$cant);
                }else{
                    if($tipoSe[0]->serie=='1'){
                        for ($se=0; $se < count($idSerieSe) ; $se++) {
                            $contaCant=0;
                              for ($sa=0; $sa < count($idSerieSe) ; $sa++) {
                                    if($idSerieSe[$se]==$idSerieSe[$sa]){
                                         $contaCant=$contaCant+1;
                                    }
                            };
                            $valoSrie=$idSerieSe[$se];
                            $valotLote=0;
                            if($identificador_serie_bd[$i]==$ident_serie_bd_serie[$se]){
                                $valida=$vali->validarStock($idAl,$idLoca,$idAr,$valotLote,$valoSrie,$contaCant);
                                if($valida[0]->Mensaje!="OK"){
                                    break;
                                }
                             }
                        }
                    }else if($tipoLo[0]->lote=="1"){
                       for ($lo=0; $lo < count($idLote) ; $lo++) {
                            $valoSrie=0;
                            $valotLote=$idLote[$lo];
                            $valida=$vali->validarStock($idAl,$idLoca,$idAr,$valotLote,$valoSrie,$cant);
                            if($valida[0]->Mensaje!="OK"){
                                break;
                            }
                        }
                    }else{
                        $valoSrie=0;
                        $valotLote=0;
                        $valida=$vali->validarStock($idAl,$idLoca,$idAr,$valotLote,$valoSrie,$cant);
                        
                    }
                }
                $valida2=$valida[0]->Mensaje;
                if($data['naturaleza']=="S"){
                   if($valida2!="OK"){
                     $descripcionArticuloGet=$vali->traerDescripcionArticulo($idArticulo[$i]);
                     $descripcion=$descripcionArticuloGet[0]->description;
                     throw new \Exception($valida2);
                     } 
                  }
                }
                
            }

            if ($idArticulo != '') {
                $repo->delete_detalle($idMovimiento);
                $repo->delete_articulo_detalle($idMovimiento);
                if($data['naturaleza']=="C"){
                    for ($i=0; $i < count($idArticulo) ; $i++) {
                        $tablelMd="ERP_Movimiento_Articulo";
                        $idtMd="consecutivo";
                        $repo->create([
                            'idArticulo' => $idArticulo[$i],
                            'idMovimiento' => $idMovimiento,
                            'consecutivo'=> $lorepo->get_consecutivo($tablelMd,$idtMd),
                            'costo' => $costo[$i], 
                            ]);
                    }
                }else{
                for ($i=0; $i < count($idArticulo) ; $i++) { 
                             $idLB=$idLote[$i];
                            if($idLote[$i]==""){
                              // if($dataLote[$i]!=""){
                              //    $lotn = explode('*',$dataLote[$i]);
                              //    $tablelot="ERP_Lote";
                              //    $idtlote='idLote';
                              //    $datosLote['Lote'] = strtoupper($lotn[2]);
                              //    $datosLote['fechaIngreso'] =$lotn[3];
                              //    $datosLote['fechaVencimiento'] =$lotn[4];
                              //    $datosLote['cantidad'] =$lotn[1];
                              //    $datosLote['idArticulo'] = $lotn[0];
                              //    $datosLote['idLote'] = $lorepo->get_consecutivo($tablelot,$idtlote);
                              //    $contLot=$lorepo->create($datosLote);
                              //    $idLB=$contLot->idLote;
                              //   }else{
                                  $idLB=null;
                                // }
                            }
                            $tablelMd="ERP_Movimiento_Articulo";
                            $idtMd="consecutivo";
                            $preciot="";
                            $precio_totalt="";
                            if($precio[$i]==""){
                                $preciot=null;
                                $precio_totalt=null;
                            }else{
                                $preciot=$precio[$i];
                                $precio_totalt=$precio_total[$i]; 
                            };
                           $varinfo=$repo->create([
                            'idMovimiento' => $idMovimiento,
                            'idArticulo' => $idArticulo[$i],
                            'idAlmacen' => $idAlmacen[$i],
                            'idLocalizacion' =>$idLocalizacion[$i],
                            'consecutivo'=> $lorepo->get_consecutivo($tablelMd,$idtMd),
                            'idLote' =>$idLB,
                            'cantidad' =>  $cantidad[$i],
                            'costo' => $costo[$i], 
                            'costo_total' => $costo_total[$i],
                            'precio' => $preciot, 
                            'precio_total'=> $precio_totalt,

                            ]);

                            $tipo=$repo->traerTipo($idArticulo[$i]);
                            $conse=$varinfo->consecutivo; 
                            if($tipo[0]->serie=="1"){
                                if ($idProductoSe != '') {
                                    for ($j=0; $j < count($idProductoSe) ; $j++) { 
                                        if($ident_serie_bd_serie[$j]==$identificador_serie_bd[$i]){
                                             $redm->create([
                                                'idMovimiento' => $idMovimiento,
                                                'idArticulo' => $idProductoSe[$j],
                                                'consecutivo' => $conse,
                                                'serie' =>$idSerieSe[$j],
                                             ]);
                                        }
                                       
                                    }

                                }
                            //     $tablese="ERP_Serie";
                            //     $idtse='idSerie';
                            //     for ($k=0; $k < count($serieNenv) ; $k++) { 
                            //             if($ident_serie_bd_serie2[$k]==$identificador_serie_bd[$i]){
                            //                     $contserie = $seri->create([
                            //                     'idSerie' => $seri->get_consecutivo($tablese,$idtse),
                            //                     'nombreSerie' => strtoupper($serieNenv[$k]),
                            //                     'idArticulo' => $idProductoSeN[$k],
                            //                     'chasis' =>strtoupper($chasiNs[$k]),
                            //                     'motor' =>strtoupper($motorNs[$k]),
                            //                     'anio_fabricacion' => $anioNFs[$k],
                            //                     'anio_modelo' => $anioNVs[$k],
                            //                     'color' => strtoupper($colorNs[$k]),
                            //                     'idTipoCompraVenta' => strtoupper($idTipoCompraVenta[$k]),
                            //                     'nPoliza' => strtoupper($nPoliza[$k]),
                            //                     'nLoteCompra' => strtoupper($nLoteCompra[$k]),
                            //                      ]);
                            //                     $conseSn=$varinfo->consecutivo;
                            //                     $redm->create([
                            //                     'idMovimiento' => $id,
                            //                     'idArticulo' => $idProductoSeN[$k],
                            //                     'consecutivo' => $conseSn,
                            //                     'serie' =>$contserie->idSerie,
                            //                         ]);  
                            //             }
                            //     }


                             } 

                }//FIND FOR
              }
            }
            DB::commit();
            return response()->json([
                'status' => true,
                'code' => $idMovimiento,
                'estado'=>$estado,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    } 
}