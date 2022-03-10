<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('refinanciamientos/list', ['as' => 'refinanciamientos.list', 'uses' => 'RefinanciamientosController@all']);
Route::post('refinanciamientos/create', ['as' => 'refinanciamientos.create', 'uses' => 'RefinanciamientosController@create']);
Route::post('refinanciamientos/delete', ['as' => 'refinanciamientos.delete', 'uses' => 'RefinanciamientosController@destroy']);
Route::post('refinanciamientos/update', ['as' => 'refinanciamientos.update', 'uses' => 'RefinanciamientosController@update']);
Route::get('refinanciamientos/excel', ['as' => 'refinanciamientos.excel', 'uses' => 'RefinanciamientosController@excel']);

Route::post('refinanciamientos/find', ['as' => 'refinanciamientos.find', 'uses' => 'RefinanciamientosController@find']);
Route::post('refinanciamientos/find_documento', ['as' => 'refinanciamientos.find_documento', 'uses' => 'RefinanciamientosController@find_documento']);
Route::get('refinanciamientos/data_form', ['as' => 'refinanciamientos.data_form', 'uses' => 'RefinanciamientosController@data_form']);

Route::post('refinanciamientos/guardar_refinanciamientos', ['as' => 'refinanciamientos.guardar_refinanciamientos', 'uses' => 'RefinanciamientosController@guardar_refinanciamientos']);
Route::post('refinanciamientos/get_notas_devolucion', ['as' => 'refinanciamientos.get_notas_devolucion', 'uses' => 'RefinanciamientosController@get_notas_devolucion']);

Route::get('refinanciamientos/get_venta_detalle/{id}', ['as' => 'refinanciamientos.get_venta_detalle', 'uses' => 'RefinanciamientosController@get_venta_detalle']);

