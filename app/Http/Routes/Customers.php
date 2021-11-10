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
Route::post('customers/getTipoCliente', 'CustomerController@getTipoCliente');

Route::get('customers/find/{id}', ['as' => 'customers.find', 'uses' => 'CustomerController@find']);