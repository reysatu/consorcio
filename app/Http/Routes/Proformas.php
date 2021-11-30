<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('proformas/list', ['as' => 'proformas.list', 'uses' => 'ProformaController@all']);
Route::post('proformas/create', ['as' => 'proformas.create', 'uses' => 'ProformaController@create']);

Route::post('proformas/update', ['as' => 'proformas.update', 'uses' => 'ProformaController@update']);
Route::get('proformas/excel', ['as' => 'proformas.excel', 'uses' => 'ProformaController@excel']);
Route::get('proformas/data_form', ['as' => 'proformas.data_form', 'uses' => 'ProformaController@data_form']);

Route::put('proformas/createProforma/{id}', ['as' => 'proformas.createProforma', 'uses' => 'ProformaController@createUpdate']);


Route::get('proformas/deleteDetalleServicio/{id}', ['as' => 'proformas.deleteDetalleServicio', 'uses' => 'ProformaController@deleteDetalleServicio']);

Route::get('proformas/deleteDetalleRepuesto/{id}', ['as' => 'proformas.deleteDetalleRepuesto', 'uses' => 'ProformaController@deleteDetalleRepuesto']);

Route::get('proformas/find/{id}', ['as' => 'proformas.find', 'uses' => 'ProformaController@find']);

Route::get('proformas/delete/{id}', ['as' => 'proformas.delete', 'uses' => 'ProformaController@destroy']);

Route::put('proformas/deleteDetalleMO/{id}', ['as' => 'proformas.deleteDetalleMO', 'uses' => 'ProformaController@deleteDetalleMO']);

Route::put('proformas/cambiar_estado/{id}', ['as' => 'proformas.cambiar_estado', 'uses' => 'ProformaController@cambiar_estado']);

Route::get('proformas/getDetalle_entrada/{id}', ['as' => 'proformas.getDetalle_entrada', 'uses' => 'ProformaController@getDetalle_entrada']);