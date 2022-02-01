<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('movimientoCajas/list', ['as' => 'movimientoCajas.list', 'uses' => 'MovimientoCajaController@all']);
Route::post('movimientoCajas/create', ['as' => 'movimientoCajas.create', 'uses' => 'MovimientoCajaController@create']);
Route::post('movimientoCajas/delete', ['as' => 'movimientoCajas.delete', 'uses' => 'MovimientoCajaController@destroy']);
Route::post('movimientoCajas/update', ['as' => 'movimientoCajas.update', 'uses' => 'MovimientoCajaController@update']);
Route::get('movimientoCajas/excel', ['as' => 'movimientoCajas.excel', 'uses' => 'MovimientoCajaController@excel']);
// Route::get('movimientoCajas/data_form', ['as' => 'movimientoCajas.data_form', 'uses' => 'MovimientoCajaController@data_form']);
Route::get('movimientoCajas/data_form/{id}', ['as' => 'movimientoCajas.data_form', 'uses' => 'MovimientoCajaController@data_form']);
Route::get('movimientoCajas/data_formUsu', ['as' => 'movimientoCajas.data_formUsu', 'uses' => 'DescuentoController@data_form']);

Route::get('movimientoCajas/getDenominaciones/{id}', ['as' => 'movimientoCajas.getDenominaciones', 'uses' => 'CajaDiariaController@getDenominaciones']);

Route::get('movimientoCajas/getDenominacionesView/{id}', ['as' => 'movimientoCajas.getDenominacionesView', 'uses' => 'CajaDiariaController@getDenominacionesView']);

Route::get('movimientoCajas/data_form', ['as' => 'movimientoCajas.data_form', 'uses' => 'CajaDiariaController@data_form']);

Route::put('movimientoCajas/saveCajasDiarias/{id}', ['as' => 'movimientoCajas.saveCajasDiarias', 'uses' => 'CajaDiariaController@createUpdate']);

Route::get('movimientoCajas/find/{id}', ['as' => 'movimientoCajas.find', 'uses' => 'CajaDiariaController@find']);
Route::post('movimientoCajas/getMonedasMoc', 'CurrencyController@getAll');

Route::get('movimientoCajas/pdf', 'MovimientoCajaController@pdf');

Route::get('movimientoCajas/pdf_diario', 'MovimientoCajaController@pdf_diario');

Route::post('movimientoCajas/getFormPaCa', 'FormasPagoController@getAll');

Route::post('movimientoCajas/getTipoMoCa', 'TiposMovimientoController@getAll');
Route::post('movimientoCajas/obtener_tipo_cambio_venta', 'MovimientoCajaController@obtener_tipo_cambio_venta');
Route::post('movimientoCajas/guardar_comprobante', 'MovimientoCajaController@guardar_comprobante');
Route::post('movimientoCajas/get_caja_diaria', 'MovimientoCajaController@get_caja_diaria');
Route::get('movimientoCajas/imprimir_cronograma/{id}', 'MovimientoCajaController@imprimir_cronograma');
Route::get('movimientoCajas/imprimir_ticket/{id}', 'MovimientoCajaController@imprimir_ticket');
Route::get('movimientoCajas/imprimir_comprobante/{id}', 'MovimientoCajaController@imprimir_comprobante');


Route::post('movimientoCajas/list_comprobantes', ['as' => 'movimientoCajas.list_comprobantes', 'uses' => 'MovimientoCajaController@list_comprobantes']);

Route::put('movimientoCajas/saveMovimientoCaja/{id}', ['as' => 'movimientoCajas.saveMovimientoCaja', 'uses' => 'MovimientoCajaController@createUpdate']);