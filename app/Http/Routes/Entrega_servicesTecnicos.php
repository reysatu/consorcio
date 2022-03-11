<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('entrega_servicesTecnicos/list', ['as' => 'entrega_servicesTecnicos.list', 'uses' => 'Entrega_servicesTecnicoController@all']);
Route::post('entrega_servicesTecnicos/create', ['as' => 'entrega_servicesTecnicos.create', 'uses' => 'Entrega_servicesTecnicoController@create']);
Route::post('entrega_servicesTecnicos/delete', ['as' => 'entrega_servicesTecnicos.delete', 'uses' => 'Entrega_servicesTecnicoController@destroy']);
Route::post('entrega_servicesTecnicos/update', ['as' => 'entrega_servicesTecnicos.update', 'uses' => 'Entrega_servicesTecnicoController@update']);
Route::get('entrega_servicesTecnicos/excel', ['as' => 'entrega_servicesTecnicos.excel', 'uses' => 'Entrega_servicesTecnicoController@excel']);
Route::put('entrega_servicesTecnicos/saveEntrega/{id}', ['as' => 'entrega_servicesTecnicos.saveEntrega', 'uses' => 'Entrega_servicesTecnicoController@createUpdate']);

Route::get('entrega_servicesTecnicos/data_formRegi', ['as' => 'entrega_servicesTecnicos.data_formRegi', 'uses' => 'Entrega_servicesTecnicoController@data_form']);
Route::post('entrega_servicesTecnicos/get_ventas_entrega', ['as' => 'entrega_servicesTecnicos.get_ventas_entrega', 'uses' => 'Entrega_servicesTecnicoController@get_ventas_entrega']);

Route::get('entrega_servicesTecnicos/get_venta_detalle/{id}', ['as' => 'entrega_servicesTecnicos.get_venta_detalle', 'uses' => 'Entrega_servicesTecnicoController@get_venta_detalle']);