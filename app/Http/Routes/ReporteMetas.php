<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('reporteMetas/list', ['as' => 'reporteMetas.list', 'uses' => 'ReporteMetaController@all']);
Route::post('reporteMetas/create', ['as' => 'reporteMetas.create', 'uses' => 'ReporteMetaController@create']);
Route::post('reporteMetas/delete', ['as' => 'reporteMetas.delete', 'uses' => 'ReporteMetaController@destroy']);
Route::post('reporteMetas/update', ['as' => 'reporteMetas.update', 'uses' => 'ReporteMetaController@update']);
Route::get('reporteMetas/excel', ['as' => 'reporteMetas.excel', 'uses' => 'ReporteMetaController@excel']);
Route::get('reporteMetas/pdf', ['as' => 'reporteMetas.pdf', 'uses' => 'ReporteMetaController@pdf']);