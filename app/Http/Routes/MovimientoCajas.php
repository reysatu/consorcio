<?php
/**
 * Created by PhpStorm. 
 * User: JAIR
 * Date: 4/5/2017 
 * Time: 6:59 PM
 */ 

Route::post('movimientoCajas/list', ['as' => 'movimientoCajas.list', 'uses' => 'MovimientoCajaController@all']);

Route::post('movimientoCajas/listComMovi', ['as' => 'movimientoCajas.listComMovi', 'uses' => 'MovimientoCajaController@allSearComMov']);

Route::post('movimientoCajas/listComMoviDol', ['as' => 'movimientoCajas.listComMoviDol', 'uses' => 'MovimientoCajaController@allSearComMovDol']);


Route::post('movimientoCajas/listComDetalle', ['as' => 'movimientoCajas.listComDetalle', 'uses' => 'MovimientoCajaController@allSearComMovDeta']);

Route::post('movimientoCajas/listComDetalleDol', ['as' => 'movimientoCajas.listComDetalleDol', 'uses' => 'MovimientoCajaController@allSearComMovDetaDol']);


Route::post('movimientoCajas/create', ['as' => 'movimientoCajas.create', 'uses' => 'MovimientoCajaController@create']);
Route::post('movimientoCajas/delete', ['as' => 'movimientoCajas.delete', 'uses' => 'MovimientoCajaController@destroy']);
Route::post('movimientoCajas/update', ['as' => 'movimientoCajas.update', 'uses' => 'MovimientoCajaController@update']);
Route::get('movimientoCajas/excel', ['as' => 'movimientoCajas.excel', 'uses' => 'MovimientoCajaController@excel']); 
// Route::get('movimientoCajas/data_form', ['as' => 'movimientoCajas.data_form', 'uses' => 'MovimientoCajaController@data_form']);
Route::get('movimientoCajas/data_form/{id}', ['as' => 'movimientoCajas.data_form', 'uses' => 'MovimientoCajaController@data_form']); 

Route::get('movimientoCajas/data_formUsu', ['as' => 'movimientoCajas.data_formUsu', 'uses' => 'DescuentoController@data_form']);


Route::get('movimientoCajas/getCuentaBancaria/{id}', ['as' => 'movimientoCajas.getCuentaBancaria', 'uses' => 'MovimientoCajaController@getCuentaBancaria']);

Route::get('movimientoCajas/getDenominaciones/{id}', ['as' => 'movimientoCajas.getDenominaciones', 'uses' => 'CajaDiariaController@getDenominaciones']);

Route::get('movimientoCajas/getDenominacionesView/{id}', ['as' => 'movimientoCajas.getDenominacionesView', 'uses' => 'CajaDiariaController@getDenominacionesView']);
 
Route::get('movimientoCajas/data_form', ['as' => 'movimientoCajas.data_form', 'uses' => 'CajaDiariaController@data_form']);

Route::get('movimientoCajas/data_formIncio', ['as' => 'movimientoCajas.data_formIncio', 'uses' => 'MovimientoCajaController@data_formIncio']);

Route::put('movimientoCajas/saveCajasDiarias/{id}', ['as' => 'movimientoCajas.saveCajasDiarias', 'uses' => 'CajaDiariaController@createUpdate']);

Route::get('movimientoCajas/find/{id}', ['as' => 'movimientoCajas.find', 'uses' => 'CajaDiariaController@find']);
Route::post('movimientoCajas/getMonedasMoc', 'CurrencyController@getAll');

Route::get('movimientoCajas/pdf', 'MovimientoCajaController@pdf');

Route::get('movimientoCajas/Cuadrepdf', 'MovimientoCajaController@Cuadrepdf');

Route::get('movimientoCajas/EmisionComprpdf', 'MovimientoCajaController@EmisionComprpdf'); 

Route::get('movimientoCajas/pdf_diario', 'MovimientoCajaController@pdf_diario');

Route::post('movimientoCajas/getFormPaCa', 'FormasPagoController@getAll');

Route::post('movimientoCajas/getTipoMoCa', 'TiposMovimientoController@getAll');
Route::post('movimientoCajas/obtener_tipo_cambio_venta', 'MovimientoCajaController@obtener_tipo_cambio_venta');
Route::post('movimientoCajas/guardar_comprobante', 'MovimientoCajaController@guardar_comprobante');
Route::post('movimientoCajas/guardar_pago_cuotas_credito', 'MovimientoCajaController@guardar_pago_cuotas_credito');
Route::post('movimientoCajas/guardar_pago_documentos_pendientes', 'MovimientoCajaController@guardar_pago_documentos_pendientes');
Route::post('movimientoCajas/get_caja_diaria', 'MovimientoCajaController@get_caja_diaria');
Route::get('movimientoCajas/imprimir_cronograma/{id}', 'MovimientoCajaController@imprimir_cronograma');
Route::get('movimientoCajas/imprimir_ticket/{id}', 'MovimientoCajaController@imprimir_ticket'); 
Route::get('movimientoCajas/imprimir_ticket_movimiento_caja/{id}', 'MovimientoCajaController@imprimir_ticket_movimiento_caja'); 
Route::get('movimientoCajas/imprimir_ticket_pago_cuota/{id}', 'MovimientoCajaController@imprimir_ticket_pago_cuota'); 
Route::get('movimientoCajas/imprimir_ticket_pago_documento_pendiente/{id}', 'MovimientoCajaController@imprimir_ticket_pago_documento_pendiente'); 
Route::get('movimientoCajas/imprimir_comprobante/{id}', 'MovimientoCajaController@imprimir_comprobante');


Route::post('movimientoCajas/list_comprobantes', ['as' => 'movimientoCajas.list_comprobantes', 'uses' => 'MovimientoCajaController@list_comprobantes']);
Route::post('movimientoCajas/list_comprobantes_pendientes', ['as' => 'movimientoCajas.list_comprobantes_pendientes', 'uses' => 'MovimientoCajaController@list_comprobantes_pendientes']);
Route::post('movimientoCajas/list_creditos', ['as' => 'movimientoCajas.list_creditos', 'uses' => 'SolicitudController@list_creditos']);
Route::post('movimientoCajas/obtener_consecutivo_comprobante', ['as' => 'movimientoCajas.obtener_consecutivo_comprobante', 'uses' => 'MovimientoCajaController@obtener_consecutivo_comprobante']);

Route::put('movimientoCajas/saveMovimientoCaja/{id}', ['as' => 'movimientoCajas.saveMovimientoCaja', 'uses' => 'MovimientoCajaController@createUpdate']);

Route::post('movimientoCajas/list_ventas', ['as' => 'movimientoCajas.list_ventas', 'uses' => 'SolicitudController@list_ventas']);