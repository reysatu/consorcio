<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Proforma\ProformaTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\Proforma\ProformaInterface;
use App\Http\Requests\ProformaRequest;
class ProformaController extends Controller
{
     use ProformaTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, ProformaInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['cCodConsecutivo', 'nConsecutivo','cCodConsecutivoOS'];
        return parseList($repo->search($s), $request, 'cCodConsecutivo', $params);
    }

   
    public function destroy(ProformaInterface $repo, Request $request)
    {
        $id = $request->input('idCategoria');
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    }

    // // public function getAll(BrandInterface $repo)
    // // {
    // //     return parseSelect($repo->all(), 'id', 'description');
    // // }

    public function excel(ProformaInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE CATEGORÍAS', 'Categoría');
    }
}
