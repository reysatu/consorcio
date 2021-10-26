<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Serie\SerieTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\Serie\SerieInterface;
use App\Http\Requests\SerieRequest;
use Carbon\Carbon;
use DB;
use App\Http\Recopro\Stock_Serie\Stock_SerieInterface;
class SerieController extends Controller
{
     use SerieTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, SerieInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['idSerie', 'nombreSerie as serie','chasis','motor','anio_fabricacion','anio_modelo','color','idArticulo','idTipoCompraVenta','nPoliza','nLoteCompra'];
        return parseList($repo->search($s), $request, 'idSerie', $params);
    }

    public function create(SerieInterface $repo, SerieRequest $request)
    {
        $data = $request->all();
        $table="ERP_SubFamilia";
        $id='idSubFamilia';
        $data['idSubFamilia'] = $repo->get_consecutivo($table,$id);
        $data['descripcion'] = strtoupper($data['SubFamilia']);
        $data['idFamilia'] = $data['idFamilia'];
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

    public function update(SerieInterface $repo, SerieRequest $request)
    {
        $data = $request->all();
        $id = $data['idSubFamilia'];
        $data['descripcion'] = strtoupper($data['SubFamilia']);
        $data['idFamilia'] = $data['idFamilia'];
        $estado='A';
        if(!isset($data['estado'])){
            $estado='I';
        };
        $data['estado'] =  $estado;
        $repo->update($id, $data);

        return response()->json(['Result' => 'OK']);
    }
    public function data_form(SerieInterface $repo,Request $request)
    {
        $tipocompra =$repo->get_tipoCompraVenta();
        return response()->json([
            'status' => true,
            'tipoCompra' => $tipocompra,
            
        ]);
    }

    public function destroy(SerieInterface $repo, Request $request)
    {
        $id = $request->input('idSerie');
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    }

    public function traerSeries(Request $request, SerieInterface $repo){
        $idProducto = $request->input('idProducto');
        $s = $request->input('search', '');
        $params = ['idSerie', 'nombreSerie as serie','chasis','motor','anio_fabricacion','anio_modelo','color','idArticulo'];
        return parseList($repo->searchMovi($s,$idProducto), $request, 'idSerie', $params);
    }
    public function traerSeriesStock(Request $request, Stock_SerieInterface $repo){
        $idProducto = $request->input('idProducto');
        $s = $request->input('search', '');
        $params = ['idSerie', 'nombreSerie as serie','chasis','motor','anio_fabricacion','anio_modelo','color','idArticulo'];
        return parseList($repo->searchMovi($s,$idProducto), $request, 'idSerie', $params);
    }

    // // public function getAll(BrandInterface $repo)
    // // {
    // //     return parseSelect($repo->all(), 'id', 'description');
    // // }

    public function excel(SerieInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE SERIES', 'Series');
    }

    public function createUpdate($id, SerieInterface $repo, Request $request)
    {
        DB::beginTransaction();
        try {
            $data = $request->all();
             $table="ERP_Serie";
             $idt='idSerie';
             $data['nombreSerie'] = strtoupper($data['nombreSerie']);
             $data['chasis'] = strtoupper($data['chasis']);
             $data['motor'] = strtoupper($data['motor']);
             $data['color'] = strtoupper($data['color']);
             $w = $repo->findByCode($data['nombreSerie']);
            if ($id != 0) {
                if ($w && $w->idSerie != $id) {
                    throw new \Exception('Ya existe una Serie con este código. Por favor ingrese otro código.');
                }
                $repo->update($id, $data);
            } else {
                 if ($w) {
                    throw new \Exception('Ya existe una Serie con este código. Por favor ingrese otro código.');
                }
                $data['idSerie'] = $repo->get_consecutivo($table,$idt);
                $repo->create($data);
            };
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
     public function find($id, SerieInterface $repo)
    {
        try {
            $data = $repo->find($id);
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
}
