<?php namespace App\Http\Recopro\Venta;

use App\Http\Recopro\User\User;
// use App\Http\Recopro\Shop\Shop;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:54 PM
 */
class Venta extends Model
{
   

    protected $table = 'ERP_view_venta';

    protected $fillable = ['idventa', 'serie_comprobante', 'numero_comprobante', 'fecha_emision', 'tipo_documento', 'numero_documento', 'moneda', 't_monto_total', 'pagado', 'saldo', 'cCodConsecutivo_solicitud', 'nConsecutivo_solicitud', 'tipo_solicitud', "estado"];
    protected $primaryKey = 'idventa';
    // protected $keyType = 'string';
    public $incrementing = false;



    
    protected $hidden = ['deleted_at'];

    public function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'user_updated');
    }

    // public function tienda_d()
    // {
    //     return $this->belongsTo(Shop::class,'idtienda');
    // }
}