<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('aprobacion/list', ['as' => 'aprobacion.list', 'uses' => 'AprobacionController@all']);
Route::post('aprobacion/create', ['as' => 'aprobacion.create', 'uses' => 'AprobacionController@create']);
Route::post('aprobacion/delete', ['as' => 'aprobacion.delete', 'uses' => 'AprobacionController@destroy']);
Route::post('aprobacion/update', ['as' => 'aprobacion.update', 'uses' => 'AprobacionController@update']);
Route::get('aprobacion/excel', ['as' => 'aprobacion.excel', 'uses' => 'AprobacionController@excel']);

Route::post('aprobacion/getTiendas', 'ShopController@getTiendas');