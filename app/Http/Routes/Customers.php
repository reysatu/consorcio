<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('customers/list', ['as' => 'customers.list', 'uses' => 'CustomerController@all']);
Route::post('customers/create', ['as' => 'customers.create', 'uses' => 'CustomerController@create']);
Route::post('customers/delete', ['as' => 'customers.delete', 'uses' => 'CustomerController@destroy']);
Route::post('customers/update', ['as' => 'customers.update', 'uses' => 'CustomerController@update']);
Route::get('customers/excel', ['as' => 'customers.excel', 'uses' => 'CustomerController@excel']);
Route::get('customers/data_form', ['as' => 'customers.data_form', 'uses' => 'CustomerController@data_form']);

Route::put('customers/createCliente/{id}', ['as' => 'customers.createCliente', 'uses' => 'CustomerController@createUpdate']);

Route::post('customers/getTipoDocumento', 'CustomerController@getTipoDocumento');
Route::post('customers/getTipoPersona', 'CustomerController@getTipoPersona');
Route::post('customers/getTipoCliente', 'CustomerController@getTipoCliente');
Route::post('customers/getTipoDocumentoVenta', 'CustomerController@getTipoDocumentoVenta');
Route::get('customers/find/{id}', ['as' => 'customers.find', 'uses' => 'CustomerController@find']);

Route::get('customers/get_cliente_personaCus/{id}', ['as' => 'customers.get_cliente_personaCus', 'uses' => 'Orden_servicioController@get_cliente_persona']);