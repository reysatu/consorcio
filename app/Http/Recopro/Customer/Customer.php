<?php namespace App\Http\Recopro\Customer;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Http\Recopro\Ubigeo\Ubigeo;
use App\Http\Recopro\TablaSunat\TablaSunat;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class Customer extends Model
{
  
    protected $table = 'ERP_Clientes';

    public $timestamps = true;

    protected $primaryKey = 'id';

    protected $keyType = 'string';

    public $incrementing = false;

    const CREATED_AT = 'dFecCre';
    const UPDATED_AT = 'dFecMod';

    protected $fillable = ['tipodoc', 'id','documento','razonsocial_cliente','contacto','direccion','correo_electronico','celular','id_tipocli','telefono','ubigeo','cIdUsuCre','cIdUsuMod'];
    
   public function user_c()
    {
        return $this->belongsTo(User::class, 'cIdUsuCre');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'cIdUsuMod');
    }
    public function tipo_c()
    {
        return $this->belongsTo(User::class, 'id_tipocli');
    }
     public function ubigeo_u()
    {
        return $this->belongsTo(Ubigeo::class, 'ubigeo');
    }
     public function tipo_u()
    {
         
        $ft=$this->belongsTo(TablaSunat::class, 'tipodoc','cCodigo');
        return $ft->where('cnombretabla','TIPO_DOCUMENTO');
    }
}