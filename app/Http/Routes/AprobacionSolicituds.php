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