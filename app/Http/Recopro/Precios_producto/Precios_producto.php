<?php namespace App\Http\Recopro\Precios_producto;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class Precios_producto extends Model
{
  
    protected $table = 'ERP_view_Productos_Precios';

    public $timestamps = true;

    protected $primaryKey = 'idProducto';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['idProducto', 'producto','codigo_articulo','precio','idTipocliente','cliente','idmoneda','moneda'];
    
    //  public function user_c()
    // {
    //     return $this->belongsTo(User::class, 'user_created');
    // }

    // public function user_u()
    // {
    //     return $this->belongsTo(User::class, 'user_updated');
    // }

}