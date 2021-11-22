<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017 
 * Time: 6:59 PM
 */

Route::post('orden_servicios/list', ['as' => 'orden_servicios.list', 'uses' => 'Orden_servicioController@all']);
Route::post('orden_servicios/create', ['as' => 'orden_servicios.create', 'uses' => 'Orden_servicioController@create']);

Route::post('orden_servicios/update', ['as' => 'orden_servicios.update', 'uses' => 'Orden_servicioController@update']);
Route::get('orden_servicios/excel', ['as' => 'orden_servicios.excel', 'uses' => 'Orden_servicioController@excel']); 
Route::get('orden_servicios/data_form', ['as' => 'orden_servicios.data_form', 'uses' => 'Orden_servicioController@data_form']);
Route::get('orden_servicios/get_cliente/{id}', ['as' => 'orden_servicios.get_cliente', 'uses' => 'CustomerController@get_cliente_documento']);

Route::get('orden_servicios/get_Placa/{id}', ['as' => 'orden_servicios.get_Placa', 'uses' => 'Vehiculos_terceroController@get_Placa_documento']);

Route::get('orden_servicios/get_Modelo/{id}', ['as' => 'orden_servicios.get_Modelo', 'uses' => 'Vehiculos_terceroController@get_Modelo_documento']);
Route::put('orden_servicios/createOrden/{id}', ['as' => 'orden_servicios.createOrden', 'uses' => 'Orden_servicioController@createUpdate']);


Route::put('orden_servicios/deleteDetalle/{id}', ['as' => 'orden_servicios.deleteDetalle', 'uses' => 'Orden_servicioController@deleteDetalleChangue']);

Route::get('orden_servicios/delete/{id}', ['as' => 'orden_servicios.delete', 'uses' => 'Orden_servicioController@destroy']);

Route::get('orden_servicios/deleteMovimiento/{id}', ['as' => 'orden_servicios.deleteMovimiento', 'uses' => 'Orden_servicioController@delete_movimiento']);

Route::get('orden_servicios/deleteDetalle/{id}', ['as' => 'orden_servicios.deleteDetalle', 'uses' => 'Orden_servicioController@deleteDetalle']);

Route::get('orden_servicios/find/{id}', ['as' => 'orden_servicios.find', 'uses' => 'Orden_servicioController@find']);

Route::post('orden_servicios/getCliente', 'Orden_servicioController@getCliente');

Route::put('orden_servicios/cambiar_estado/{id}', ['as' => 'orden_servicios.cambiar_estado', 'uses' => 'Orden_servicioController@cambiar_estado']);