<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('cajas/list', ['as' => 'cajas.list', 'uses' => 'CajasController@all']);
Route::post('cajas/create', ['as' => 'cajas.create', 'uses' => 'CajasController@create']);
Route::post('cajas/delete', ['as' => 'cajas.delete', 'uses' => 'CajasController@destroy']);
Route::post('cajas/update', ['as' => 'cajas.update', 'uses' => 'CajasController@update']);
Route::get('cajas/excel', ['as' => 'cajas.excel', 'uses' => 'CajasController@excel']);

Route::post('cajas/getTiendas', 'ShopController@getTiendas');