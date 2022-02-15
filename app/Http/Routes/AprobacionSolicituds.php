<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('aprobacionSolicituds/list', ['as' => 'aprobacionSolicituds.list', 'uses' => 'AprobacionSolicitudController@all']);
Route::post('aprobacionSolicituds/create', ['as' => 'aprobacionSolicituds.create', 'uses' => 'AprobacionSolicitudController@create']);
Route::post('aprobacionSolicituds/delete', ['as' => 'aprobacionSolicituds.delete', 'uses' => 'AprobacionSolicitudController@destroy']);
Route::post('aprobacionSolicituds/update', ['as' => 'aprobacionSolicituds.update', 'uses' => 'AprobacionSolicitudController@update']);
Route::get('aprobacionSolicituds/excel', ['as' => 'aprobacionSolicituds.excel', 'uses' => 'AprobacionSolicitudController@excel']);
Route::post('aprobacionSolicituds/find', ['as' => 'solicitud.find', 'uses' => 'SolicitudController@find']);
Route::get('aprobacionSolicituds/getVentas/{id}', ['as' => 'aprobacionSolicituds.getVentas', 'uses' => 'AprobacionSolicitudController@getVentas']);
Route::put('aprobacionSolicituds/AprobarRechazar/{id}', ['as' => 'aprobacionSolicituds.AprobarRechazar', 'uses' => 'AprobacionSolicitudController@AprobarRechazarSolicitud']);
Route::get('aprobacionSolicituds/getAprobadores/{id}', ['as' => 'aprobacionSolicituds.getAprobadores', 'uses' => 'AprobacionSolicitudController@getAprobadores']); 

Route::get('aprobacionSolicituds/data_form', ['as' => 'aprobacionSolicituds.data_form', 'uses' => 'SolicitudController@data_form']);
Route::post('aprobacionSolicituds/factor_credito', ['as' => 'aprobacionSolicituds.factor_credito', 'uses' => 'SolicitudController@factor_credito']);
Route::post('aprobacionSolicituds/guardar_solicitud', ['as' => 'aprobacionSolicituds.guardar_solicitud', 'uses' => 'SolicitudController@guardar_solicitud']);
Route::post('aprobacionSolicituds/mostrar_aprobaciones', ['as' => 'aprobacionSolicituds.mostrar_aprobaciones', 'uses' => 'SolicitudController@mostrar_aprobaciones']);
Route::get('aprobacionSolicituds/imprimir_solicitud/{id}', 'SolicitudController@imprimir_solicitud'); 
Route::post('aprobacionSolicituds/enviar_solicitud', ['as' => 'aprobacionSolicituds.enviar_solicitud', 'uses' => 'SolicitudController@enviar_solicitud']);
Route::post('aprobacionSolicituds/find', ['as' => 'aprobacionSolicituds.find', 'uses' => 'SolicitudController@find']);