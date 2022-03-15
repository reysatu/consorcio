<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('asignacioncobradors/list', ['as' => 'asignacioncobradors.list', 'uses' => 'AsignacioncobradorController@all']);
Route::post('asignacioncobradors/create', ['as' => 'asignacioncobradors.create', 'uses' => 'AsignacioncobradorController@create']);
Route::post('asignacioncobradors/delete', ['as' => 'asignacioncobradors.delete', 'uses' => 'AsignacioncobradorController@destroy']);
Route::post('asignacioncobradors/update', ['as' => 'asignacioncobradors.update', 'uses' => 'AsignacioncobradorController@update']);
Route::get('asignacioncobradors/excel', ['as' => 'asignacioncobradors.excel', 'uses' => 'AsignacioncobradorController@excel']);

Route::post('asignacioncobradors/listCronograma', ['as' => 'asignacioncobradors.listCronograma', 'uses' => 'AsignacioncobradorController@listCronograma']);

Route::get('asignacioncobradors/data_form', ['as' => 'asignacioncobradors.data_form', 'uses' => 'AsignacioncobradorController@data_form']);
Route::put('asignacioncobradors/saveCobrador/{id}', ['as' => 'asignacioncobradors.saveCobrador', 'uses' => 'AsignacioncobradorController@createUpdate']);

Route::get('asignacioncobradors/tarjetaCobranza', ['as' => 'asignacioncobradors.tarjetaCobranza', 'uses' => 'AsignacioncobradorController@tarjetaCobranza']);