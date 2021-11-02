<?php namespace App\Http\Recopro\Group_ca;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class Group_ca extends Model
{
  
    protected $table = 'ERP_GruposCA';

    public $timestamps = false;

    protected $primaryKey = 'id';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['nombre', 'id'];
    
    //  public function user_c()
    // {
    //     return $this->belongsTo(User::class, 'user_created');
    // }

    // public function user_u()
    // {
    //     return $this->belongsTo(User::class, 'user_updated');
    // }

}