<?php namespace App\Http\Recopro\Revision_ca;
use App\Http\Recopro\User\User;
use App\Http\Recopro\Group_ca\Group_ca;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class Revision_ca extends Model
{
  
    protected $table = 'ERP_RevisionCA';

    public $timestamps = false;

    protected $primaryKey = 'id';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['id', 'nombre','idgrupo'];
    
     public function grupo_c_EXCEL()
    {
        return $this->belongsTo(Group_ca::class, 'idgrupo');
    }

   

}