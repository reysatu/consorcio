<?php namespace App\Http\Recopro\Customer;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class Customer extends Model
{
  
    protected $table = 'ERP_Clientes';

    public $timestamps = false;

    protected $primaryKey = 'id';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['tipodoc', 'id','documento','razonsocial_cliente','contacto','direccion','correo_electronico','celular'];
    
    //  public function user_c()
    // {
    //     return $this->belongsTo(User::class, 'user_created');
    // }

    // public function user_u()
    // {
    //     return $this->belongsTo(User::class, 'user_updated');
    // }

}