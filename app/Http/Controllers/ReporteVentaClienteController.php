<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\ReporteVentaCliente\ReporteVentaClienteTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\ReporteVentaCliente\ReporteVentaClienteInterface;
use App\Http\Requests\ReporteVentaClienteRequest;
class ReporteVentaClienteController extends Controller
{
     use ReporteVentaClienteTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, ReporteVentaClienteInterface $repo)
    { 
        $s = $request->input('search', '');
        $filtro_tienda = $request->input('filtro_tienda', '');

        $idClienteFiltro = $request->input('idClienteFiltro', '');
        $idVendedorFiltro = $request->input('idVendedorFiltro', '');
        $FechaInicioFiltro = $request->input('FechaInicioFiltro', '');
        $FechaFinFiltro = $request->input('FechaFinFiltro', '');
        $idcategoria= $request->input('idcategoria', '');
        $params =  ['idCategoria', 'idtienda','cuota_inicial','idvendedor','usuario','IdMoneda','Moneda','idcondicion_pago','condicion_pago','precio_unitario','Motor','numero_serie','Color','idSerie','Modelo','serie_comprobante','numero_comprobante','idventa','Fecha','DocumentoCliente','Direccion','celular','razonsocial_cliente'];
        return parseList($repo->search($s,$filtro_tienda,$idClienteFiltro,$idVendedorFiltro,$FechaInicioFiltro,$FechaFinFiltro,$idcategoria), $request, 'idCategoria', $params);
    }

    public function create(ReporteVentaClienteInterface $repo, ReporteVentaClienteRequest $request)
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

    public function update(ReporteVentaClienteInterface $repo, ReporteVentaClienteRequest $request)
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

    public function destroy(ReporteVentaClienteInterface $repo, Request $request)
    {
        $id = $request->input('idCategoria');
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    }

    // // public function getAll(BrandInterface $repo)
    // // {
    // //     return parseSelect($repo->all(), 'id', 'description');
    // // }

    public function excel(ReporteVentaClienteInterface $repo,Request $request)
    {
       
        $s = $request->input('search', '');
        $filtro_tienda = $request->input('filtro_tienda', '');
        $idClienteFiltro = $request->input('idClienteFiltro', '');
        $idVendedorFiltro = $request->input('idVendedorFiltro', '');
        $FechaInicioFiltro = $request->input('FechaInicioFiltro', '');
        $FechaFinFiltro = $request->input('FechaFinFiltro', '');
         $idcategoria = $request->input('idcategoria', '');
        return generateExcel($this->generateDataExcel($repo->allFiltro($s,$filtro_tienda,$idClienteFiltro,$idVendedorFiltro,$FechaInicioFiltro,$FechaFinFiltro,$idcategoria)), 'REPORTE DE VENTAS ', 'VENTAS');
    }
    public function pdf(ReporteVentaClienteInterface $repo,Request $request)
    {   
         $s = $request->input('search', '');
        $filtro_tienda = $request->input('filtro_tienda', '');
        $idClienteFiltro = $request->input('idClienteFiltro', '');
        $idVendedorFiltro = $request->input('idVendedorFiltro', '');
        $FechaInicioFiltro = $request->input('FechaInicioFiltro', '');
        $FechaFinFiltro = $request->input('FechaFinFiltro', '');
         $idcategoria = $request->input('idcategoria', '');
        $data = $this->generateDataExcel($repo->allFiltro($s,$filtro_tienda,$idClienteFiltro,$idVendedorFiltro,$FechaInicioFiltro,$FechaFinFiltro,$idcategoria));
        return generateDataPDF($data, 'landscape', 'logo.jpg');
    } 
}
