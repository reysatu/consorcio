<?php namespace App\Http\Recopro\Maintenance;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class Maintenance extends Model
{
  
    protected $table = 'ERP_Mantenimientos';

    public $timestamps = false;

    protected $primaryKey = 'id';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['id','nombre','mo_revision','mo_mecanica','terceros','otros_mo','repuestos','accesorios','lubricantes','otros_rep','total'];
    
    //  public function user_c()
    // {
    //     return $this->belongsTo(User::class, 'user_created');
    // }

    // public function user_u()
    // {
    //     return $this->belongsTo(User::class, 'user_updated');
    // }

}