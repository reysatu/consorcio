<?php
/**
 * Created by PhpStorm.
 * User: Ever
 * Date: 4/3/2017
 * Time: 12:16 PM
 */

namespace App\Http\Recopro\Product;
use Illuminate\Support\Facades\DB;

class ProductRepository implements ProductInterface
{
    protected $model;

    public function __construct(Product $model)
    {
        $this->model = $model;
    }

    public function search($s)
    {
        return $this->model->where(function ($q) use ($s) {
            $q->orWhere('description', 'LIKE', '%' . $s . '%');
            $q->orWhere('code_matrix', 'LIKE', '%' . $s . '%');
            $q->orWhere('code_article', 'LIKE', '%' . $s . '%');
        });
    }
     public function searchTrans($s)
    {
        return $this->model->where(function($q) use ($s){
            $q->where('description', 'LIKE', '%'.$s.'%')->where('type_id','!=',3)->where('type_id','!=',2);
            $q->orWhere('code_article', 'LIKE', '%' . $s . '%');
        });
    }
     public function search2($s)
    {
        return $this->model->where(function($q) use ($s){
            $q->where('description', 'LIKE', '%'.$s.'%');
            $q->orWhere('code_article', 'LIKE', '%' . $s . '%');
        });
    }
      public function searchMinKit($s)
    {
        return $this->model->where(function($q) use ($s){
            $q->where('description', 'LIKE', '%'.$s.'%')->where('type_id','!=',3);
            $q->orWhere('code_article', 'LIKE', '%' . $s . '%');
        });
    }
    public function search3($s)
    {
        return $this->model->where(function($q) use ($s){
            $q->where('description_detail', 'LIKE', '%'.$s.'%')->where('type_id','=',1);
            $q->Where('serie','=',0);
            $q->Where('lote','=',0);

        });
    }
    public function searchSerie($s)
    {
        return $this->model->where(function($q) use ($s){
            $q->where('description_detail', 'LIKE', '%'.$s.'%')->where('serie',1);
        });
    }
    public function searchLote($s)
    {
        return $this->model->where(function($q) use ($s){
            $q->where('description_detail', 'LIKE', '%'.$s.'%')->where('lote',1);
        });
    }

    public function search_detail($data)
    {
        $s = $data['search'];
        $items = (isset($data['items'])) ? $data['items'] : [];
//        $stock=  (isset($data['state'])) ? ($data['state']==='disponibles') ? 0:[] : [];

        return $this->model->where(function ($q) use ($s) {
            $q->where('sale', 'LIKE', '%' . $s . '%');
            $q->orWhere('description_detail', 'LIKE', '%' . $s . '%');
            $q->orWhere('code_article', 'LIKE', '%' . $s . '%');
            $q->orWhereHas('type', function ($t) use ($s) {
                $t->where('description', 'LIKE', '%' . $s . '%');
            });
            $q->orWhereHas('level', function ($t) use ($s) {
                $t->where('description', 'LIKE', '%' . $s . '%');
            });
        })->where('type_id', 1)
//            ->where('state', $data['state'])
            ->whereNotIn('id', $items);
    }

    public function searchDetailProject($data)
    {
        $s = $data['search'];
        $items = (isset($data['items'])) ? $data['items'] : [];
        $project_id = $data['project_id'];

        return $this->model->where(function ($q) use ($s) {
            $q->where('sale', 'LIKE', '%' . $s . '%');
            $q->orWhere('description_detail', 'LIKE', '%' . $s . '%');
            $q->orWhere('code_article', 'LIKE', '%' . $s . '%');
            $q->orWhereHas('type', function ($t) use ($s) {
                $t->where('description', 'LIKE', '%' . $s . '%');
            });
            $q->orWhereHas('projectConsolidated', function ($pc) use ($s) {
                $pc->where('price', 'LIKE', '%' . $s . '%');
            });
            $q->orWhereHas('level', function ($t) use ($s) {
                $t->where('description', 'LIKE', '%' . $s . '%');
            });
        })->where('type_id', 1)
            ->whereNotIn('id', $items)
            ->whereHas('projectConsolidated', function ($p) use ($project_id) {
                $p->where('project_id', $project_id);
            });
    }


    public function all()
    {
        return $this->model->all();
    }

    public function create(array $attributes)
    {  

        $attributes['costo'] = 0;
        $attributes['user_created'] = auth()->id();
        $attributes['user_updated'] = auth()->id();
        $model = $this->model->create($attributes);
        return $model;
    }

    public function update($id, array $attributes)
    {
        $attributes['user_updated'] = auth()->id();
        $model = $this->model->findOrFail($id);
        $model->update($attributes);
    }

    public function find($id)
    {
        return $this->model->find($id);
    }

    public function destroy($id)
    {
        $attributes = [];
        $attributes['user_deleted'] = auth()->id();
        $model = $this->model->findOrFail($id);
        $model->update($attributes);
        $model->delete();
    }

    public function findByAttr($attribute, $value)
    {
        return $this->model->where($attribute, $value)->first();
    }

    public function searchByMatrix($s)
    {
        return $this->model->where(function ($q) use ($s) {
            $q->where('description', 'LIKE', '%' . $s . '%');
            $q->orWhere('description_detail', 'LIKE', '%' . $s . '%');
            $q->orWhere('code_matrix', 'LIKE', '%' . $s . '%');
        })->whereNotNull('code_matrix');
    }

    public function searchByMatrixAPU($s)
    {
        return $this->model->where(function ($q) use ($s) {
            $q->where('description', 'LIKE', '%' . $s . '%');
            $q->orWhere('description_detail', 'LIKE', '%' . $s . '%');
            $q->orWhere('code_matrix', 'LIKE', '%' . $s . '%');
        })
        ->whereHas('level', function ($l){
            $l->where('type_apu', '<>', 0);
        });
    }

    public function searchByMatrixGT($s, $type)
    {
        return $this->model->where(function ($q) use ($s) {
            $q->where('description', 'LIKE', '%' . $s . '%');
            $q->orWhere('description_detail', 'LIKE', '%' . $s . '%');
            $q->orWhere('code_matrix', 'LIKE', '%' . $s . '%');
        })
        ->whereHas('level', function ($l) use ($type) {
            $l->where('type_gt', $type);
        });
    }
    public function getDetalleKit($idkit){
          $mostrar2=DB::select("select  * from ERP_Articulo_kit as ak inner join ERP_Productos as pr on ak.idArticulo=pr.id  where idArticuloKit=$idkit");
          return $mostrar2;
    }
    public function getidArticuloKit($id){
   
          $mostrar3=DB::select("select  top 1 idArticulo,idArticuloKit,cantidad from ERP_Articulo_kit as ak inner join ERP_Productos as pr on ak.idArticulo=pr.id  where idArticulo='$id' order by ak.created_at asc");
          return $mostrar3;
    }
    public function getDetalleKitCom($idkit,$id){
          $mostrar2=DB::select("select  * from ERP_Articulo_kit as ak inner join ERP_Productos as pr on ak.idArticulo=pr.id  where idArticuloKit=$idkit");
          return $mostrar2;
    }
}
