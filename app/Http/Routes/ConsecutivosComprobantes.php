<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('consecutivos_comprobantes/list', ['as' => 'consecutivos_comprobantes.list', 'uses' => 'ConsecutivosComprobantesController@all']);
Route::post('consecutivos_comprobantes/create', ['as' => 'consecutivos_comprobantes.create', 'uses' => 'ConsecutivosComprobantesController@create']);
Route::post('consecutivos_comprobantes/delete', ['as' => 'consecutivos_comprobantes.delete', 'uses' => 'ConsecutivosComprobantesController@destroy']);
Route::post('consecutivos_comprobantes/update', ['as' => 'consecutivos_comprobantes.update', 'uses' => 'ConsecutivosComprobantesController@update']);
Route::get('consecutivos_comprobantes/excel', ['as' => 'consecutivos_comprobantes.excel', 'uses' => 'ConsecutivosComprobantesController@excel']);

Route::post('consecutivos_comprobantes/getTiendas', 'ShopController@getTiendas');