<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('solicitud/list', ['as' => 'solicitud.list', 'uses' => 'SolicitudController@all']);
Route::post('solicitud/list_ventas', ['as' => 'solicitud.list_ventas', 'uses' => 'SolicitudController@list_ventas']);
Route::post('solicitud/list_creditos', ['as' => 'solicitud.list_creditos', 'uses' => 'SolicitudController@list_creditos']);
Route::post('solicitud/create', ['as' => 'solicitud.create', 'uses' => 'SolicitudController@create']);
Route::post('solicitud/delete', ['as' => 'solicitud.delete', 'uses' => 'SolicitudController@destroy']);
Route::post('solicitud/update', ['as' => 'solicitud.update', 'uses' => 'SolicitudController@update']);
Route::post('solicitud/guardar_solicitud', ['as' => 'solicitud.guardar_solicitud', 'uses' => 'SolicitudController@guardar_solicitud']);
Route::post('solicitud/factor_credito', ['as' => 'solicitud.factor_credito', 'uses' => 'SolicitudController@factor_credito']);
Route::post('solicitud/enviar_solicitud', ['as' => 'solicitud.enviar_solicitud', 'uses' => 'SolicitudController@enviar_solicitud']);
Route::post('solicitud/eliminar_solicitud', ['as' => 'solicitud.eliminar_solicitud', 'uses' => 'SolicitudController@eliminar_solicitud']);

Route::post('solicitud/find', ['as' => 'solicitud.find', 'uses' => 'SolicitudController@find']);
Route::post('solicitud/mostrar_aprobaciones', ['as' => 'solicitud.mostrar_aprobaciones', 'uses' => 'SolicitudController@mostrar_aprobaciones']);


Route::get('solicitud/excel', ['as' => 'solicitud.excel', 'uses' => 'SolicitudController@excel']);




Route::get('solicitud/data_form', ['as' => 'solicitud.data_form', 'uses' => 'SolicitudController@data_form']);
// Route::post('solicitud/getTiendas', 'ShopController@getTiendas');

Route::get('solicitud/imprimir_solicitud/{id}', 'SolicitudController@imprimir_solicitud');