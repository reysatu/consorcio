<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Solicitud\SolicitudInterface;
use App\Http\Recopro\Solicitud\SolicitudTrait;
use App\Http\Requests\SolicitudRequest;
use Illuminate\Http\Request;

class SolicitudController extends Controller
{
    use SolicitudTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, SolicitudInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['cCodConsecutivo', 'nConsecutivo', 'fecha_solicitud', 'tipo_solicitud', 'idconvenio'];
        // print_r($repo->search($s)); exit;
        return parseList($repo->search($s), $request, 'cCodConsecutivo', $params);
    }

    public function create(SolicitudInterface $repo, SolicitudRequest $request)
    {
        $data = $request->all();
        // $data['cCodConsecutivo'] = $data['cCodConsecutivo'];
        // $data['nombre_caja'] = $data['convenio'];
        // print_r($data);
        
        $repo->create($data);

        return response()->json([
            'Result' => 'OK',
            'Record' => []
        ]);
    }

    public function update(SolicitudInterface $repo, SolicitudRequest $request)
    {
        $data = $request->all();
        // print_r($data);
        $cCodConsecutivo = $data['cCodConsecutivo'];
        // $data['nombre_caja'] = $data['convenio'];
        $repo->update($cCodConsecutivo, $data);

        return response()->json(['Result' => 'OK']);
    }

    public function destroy(SolicitudInterface $repo, Request $request)
    {
        $cCodConsecutivo = $request->input('cCodConsecutivo');
        $repo->destroy($cCodConsecutivo);
        return response()->json(['Result' => 'OK']);
    }

    public function getAll(SolicitudInterface $repo)
    {
        return parseSelect($repo->all(), 'cCodConsecutivo', 'nombre_caja');
    }

    public function excel(SolicitudInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE Solicitud', 'Solicitud');
    }

    public function data_form (SolicitudInterface $Repo)
    {
        
        $codigo = $Repo->getcodigo();
        // $codigo_proforma = $Repo->getcodigo_proforma();
        $condicion_pago = $Repo->getcondicion_pago();
        // $tipo_servicio = $Repo->gettipo_servicio();
        $tipo_document = $Repo->gettipo_document();
        // $tipo_document_venta=$Repo->gettipo_document_venta();
        // $revisiones = $Repo->getrevisiones();
        // $tecnico = $Repo->gettecnico();
        // $asesor = $Repo->getasesor();
        $moneda = $Repo->getmoneda();
        // $servicios = $Repo->get_servicios(); 
        // $tipoMantenimiento = $Repo->get_Tipomantenimientos(); 
        // $totales = $Repo->get_totales();
        $usuario=auth()->id();
        $descuentos=$Repo->get_descuentos($usuario);
     

        return response()->json([
            'status' => true,
            'codigo' => $codigo,
            // 'codigo_proforma'=>$codigo_proforma,
            'condicion_pago' => $condicion_pago,
            // 'tipo_servicio' => $tipo_servicio,
            'tipo_document'=> $tipo_document,
            // 'revisiones'=>$revisiones,
            // 'tecnico'=>$tecnico,
            'moneda'=>$moneda,
            // 'asesor'=>$asesor,
            'descuentos'=>$descuentos,
            // 'servicios'=>$servicios,
            // 'totales'=>$totales,
            // 'tipoMantenimiento'=>$tipoMantenimiento,
            // 'tipo_document_venta'=>$tipo_document_venta,
            'usuario'=>$usuario,
        ]);
    }
}
