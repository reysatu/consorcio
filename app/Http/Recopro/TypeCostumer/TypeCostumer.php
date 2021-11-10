<?php namespace App\Http\Recopro\TypeCostumer;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class TypeCostumer extends Model
{
  
    protected $table = 'ERP_TipoCliente';

    public $timestamps = true;

    protected $primaryKey = 'id';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['id', 'descripcion','estado','cIdUsuCre','cIdUsuMod'];
    
     public function user_c()
    {
        return $this->belongsTo(User::class, 'cIdUsuCre');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'cIdUsuMod');
    }

}