<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('devolucion_servicesTecnicos/list', ['as' => 'devolucion_servicesTecnicos.list', 'uses' => 'Devolucion_servicesTecnicoController@all']);
Route::post('devolucion_servicesTecnicos/create', ['as' => 'devolucion_servicesTecnicos.create', 'uses' => 'Devolucion_servicesTecnicoController@create']);
Route::post('devolucion_servicesTecnicos/delete', ['as' => 'devolucion_servicesTecnicos.delete', 'uses' => 'Devolucion_servicesTecnicoController@destroy']);
Route::post('devolucion_servicesTecnicos/update', ['as' => 'devolucion_servicesTecnicos.update', 'uses' => 'Devolucion_servicesTecnicoController@update']);
Route::get('devolucion_servicesTecnicos/excel', ['as' => 'devolucion_servicesTecnicos.excel', 'uses' => 'Devolucion_servicesTecnicoController@excel']);