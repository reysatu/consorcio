<?php namespace App\Http\Recopro\Movimiento_Articulo_cierre;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class Movimiento_Articulo_cierre extends Model
{
  
    protected $table = 'ERP_Movimiento_Articulo_cierre';

    public $timestamps = true;

    protected $primaryKey = 'idMovimiento';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['idMovimiento', 'idArticulo','idAlmacen','idLocalizacion','idLote','cantidad','costo','costo_total','user_created','user_updated','consecutivo','precio','precio_total','periodo'];
    
     public function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'user_updated');
    }

}