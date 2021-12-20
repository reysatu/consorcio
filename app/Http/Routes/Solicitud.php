<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('solicitud/list', ['as' => 'solicitud.list', 'uses' => 'SolicitudController@all']);
Route::post('solicitud/create', ['as' => 'solicitud.create', 'uses' => 'SolicitudController@create']);
Route::post('solicitud/delete', ['as' => 'solicitud.delete', 'uses' => 'SolicitudController@destroy']);
Route::post('solicitud/update', ['as' => 'solicitud.update', 'uses' => 'SolicitudController@update']);
Route::get('solicitud/excel', ['as' => 'solicitud.excel', 'uses' => 'SolicitudController@excel']);


Route::get('solicitud/data_form', ['as' => 'solicitud.data_form', 'uses' => 'SolicitudController@data_form']);
// Route::post('solicitud/getTiendas', 'ShopController@getTiendas');