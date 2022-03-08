<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('ventas/list', ['as' => 'ventas.list', 'uses' => 'VentasController@all']);
Route::post('ventas/create', ['as' => 'ventas.create', 'uses' => 'VentasController@create']);
Route::post('ventas/delete', ['as' => 'ventas.delete', 'uses' => 'VentasController@destroy']);
Route::post('ventas/update', ['as' => 'ventas.update', 'uses' => 'VentasController@update']);
Route::get('ventas/excel', ['as' => 'ventas.excel', 'uses' => 'VentasController@excel']);

Route::post('ventas/find', ['as' => 'ventas.find', 'uses' => 'VentasController@find']);
Route::post('ventas/find_documento', ['as' => 'ventas.find_documento', 'uses' => 'VentasController@find_documento']);
Route::get('ventas/data_form', ['as' => 'ventas.data_form', 'uses' => 'VentasController@data_form']);

Route::post('ventas/guardar_venta', ['as' => 'ventas.guardar_venta', 'uses' => 'VentasController@guardar_venta']);