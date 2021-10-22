<?php

namespace App\Http\Recopro\DocumentType;

/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 19/07/2017
 * Time: 10:24 AM
 */
use \Illuminate\Database\Eloquent\Model;

class DocumentType extends Model
{

    protected $table = 'TipoDocumento';

    protected $fillable = ['Descripcion', 'EquivalenciaSunat', 'Referencia'];

    public $timestamps = false;

}