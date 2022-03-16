<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */
 
namespace App\Http\Controllers;

use App\Http\Recopro\Cobrador\CobradorTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\Cobrador\CobradorInterface;
use App\Http\Requests\CobradorRequest;
use App\Http\Recopro\Solicitud_Asignacion\Solicitud_AsignacionInterface;
use App\Http\Recopro\SolicitudCronograma\SolicitudCronogramaInterface;
use App\Http\Recopro\Query_movements\Query_movementsInterface;
use DB;
class AsignacioncobradorController extends Controller
{
     use CobradorTrait; 

    public function __construct()  
    {
//        $this->middleware('json');
    } 
      public function pdf_cuentasxcobrar(Request $request,Query_movementsInterface $repomo, Solicitud_AsignacionInterface $repo)
    {       
            $simboloMoneda = $repomo->getSimboloMoneda();
            $data_compania=$repo->get_compania();
            $data_cabe=$repo->get_cuentas_caber();
            $data_cuer=$repo->get_cuentas_cuerp();

            $path = public_path('/'.$data_compania[0]->ruta_logo);
            $type_image = pathinfo($path, PATHINFO_EXTENSION);
            $image = file_get_contents($path);
            $image = 'data:image/' . $type_image . ';base64,' . base64_encode($image);
            return response()->json([
                'status' => true,
                 'img'=>$image,
                 'data_cabe'=>$data_cabe,
                 'data_cuer'=>$data_cuer,
               
            ]);
    }
    public function tarjetaCobranza(Solicitud_AsignacionInterface $repo,Request $request)
    {
        $cCodConsecutivo =  $request->input('cCodConsecutivo');
        $nConsecutivo =  $request->input('nConsecutivo');  
        $data_cronograma = $repo->get_tarjeta_Cronograma($cCodConsecutivo,$nConsecutivo);
        $data_cliente=$repo->get_tarjeta_cliente($cCodConsecutivo,$nConsecutivo);
        $data_compania=$repo->get_compania(); 
        $info=str_replace("/","\\",$data_compania[0]->ruta_logo);   
            $path = public_path("\\".$info);
            $path =str_replace("\\","/",$path);   
            $type_image = pathinfo($path, PATHINFO_EXTENSION);
            $image = file_get_contents($path);
            $image = 'data:image/' . $type_image . ';base64,' . base64_encode($image);
        return response()->json([
                'status' => true,
                'data_cronograma'=>$data_cronograma,
                'data_cliente'=>$data_cliente,
                 'img'=>$image, 
            ]);
    }
    public function createUpdate($id, CobradorInterface $repo, Request $request)
    { 
        
        try { 
            $data = $request->all();
            $idCobrador=$data['idCobrador'];
            $cobrador=$data['cobradores'];
            $cobrador=explode(',', $cobrador);
            for ($i=0; $i < count($cobrador) ; $i++) {
                $totalData=explode('*', $cobrador[$i]);
                $repo->asignar_cobrador($totalData[0],$totalData[1],$idCobrador);
            }
            DB::commit();
            return response()->json([
                'status' => true,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    } 

    public function all(Request $request,Solicitud_AsignacionInterface $repo)
    {
        $s = $request->input('search', '');
        $filtro_tienda = $request->input('filtro_tienda', '');
        $idInicio = $request->input('idInicio', '');
        $idFin = $request->input('idFin', '');
        $idClienteFiltro = $request->input('idClienteFiltro', '');
        $idCobradorFiltro = $request->input('idCobradorFiltro', '');

        $FechaInicioFiltro = $request->input('FechaInicioFiltro', '');
        $FechaFinFiltro = $request->input('FechaFinFiltro', '');
        


        $params = ['cCodConsecutivo', 'nConsecutivo', 'fecha_solicitud', 'tipo_solicitud', 'idconvenio', 'tipo_documento', 'numero_documento', 'moneda', 't_monto_total', 'pagado', 'saldo', 'facturado', 'estado','Cobrador','nCodTienda','tipoComprobanteText','idcliente','cliente','serie_comprobante','numero_comprobante'];
        // print_r($repo->search($s)); exit;
        return parseList($repo->searchAsignacionCobrador($s,$filtro_tienda,$idInicio,$idFin,$idClienteFiltro,$idCobradorFiltro,$FechaInicioFiltro,$FechaFinFiltro), $request, 'cCodConsecutivo', $params);
    }

    public function allAproba(Request $request,Solicitud_AsignacionInterface $repo)
    {
        $s = $request->input('search_c', '');
        $idCliente = $request->input('cliente_id_or', '');
        $params = ['cCodConsecutivo', 'nConsecutivo', 'fecha_solicitud', 'tipo_solicitud', 'idconvenio', 'tipo_documento', 'numero_documento', 'moneda', 't_monto_total', 'pagado', 'saldo', 'facturado', 'estado','Cobrador','nCodTienda','tipoComprobanteText','idcliente','cliente','serie_comprobante','numero_comprobante'];
        // print_r($repo->search($s)); exit;
      
        return parseList($repo->searchAsignacionAproba($s,$idCliente), $request, 'cCodConsecutivo', $params);
    }
    public function listCronograma(Request $request,SolicitudCronogramaInterface $repo)
    {
        $cCodConsecutivo = $request->input('cCodConsecutivo', '');
        $nConsecutivo = $request->input('nConsecutivo', '');
        $params =  ['cCodConsecutivo', 'nConsecutivo','nrocuota','fecha_vencimiento','valor_cuota','int_moratorio','saldo_cuota','monto_pago','user_created','user_updated'];
        // print_r($repo->search($s)); exit;
        return parseList($repo->search($cCodConsecutivo,$nConsecutivo), $request, 'cCodConsecutivo', $params);
    }
    public function listCronogramaCuentasxCobrar(Request $request,SolicitudCronogramaInterface $repo)
    {
        $cCodConsecutivo = $request->input('cCodConsecutivo', '');
        $nConsecutivo = $request->input('nConsecutivo', '');
        $params =  ['cCodConsecutivo', 'nConsecutivo','nrocuota','fecha_vencimiento','valor_cuota','int_moratorio','saldo_cuota','monto_pago','user_created','user_updated'];
        // print_r($repo->search($s)); exit;
        return parseList($repo->searchCuentasxCobrar($cCodConsecutivo,$nConsecutivo), $request, 'cCodConsecutivo', $params);
    }
     public function data_form(CobradorInterface $repo)
    {
        $cobrador=$repo->getCobrador();
        $tienda=$repo->getTienda();
        $cliente=$repo->getCliente();
        $usuarios=$repo->getUsuarios();
        $categorias=$repo->getCategorias();
        return response()->json([ 
            'status' => true,
            'cobrador' => $cobrador,
            'tienda' => $tienda,
            'cliente'=>$cliente,
            'usuarios'=>$usuarios,
            'categorias'=>$categorias,
        ]);
    }
 
    public function create(CobradorInterface $repo, Request $request)
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

    public function update(CobradorInterface $repo, CobradorRequest $request)
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

    public function destroy(CobradorInterface $repo, Request $request)
    {
        $id = $request->input('idCategoria');
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    }

    // // public function getAll(BrandInterface $repo)
    // // {
    // //     return parseSelect($repo->all(), 'id', 'description');
    // // }

    public function excel(CobradorInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE CATEGORÍAS', 'Categoría');
    }
}
