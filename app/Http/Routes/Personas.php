<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('personas/list', ['as' => 'personas.list', 'uses' => 'PersonaController@all']);
Route::post('personas/create', ['as' => 'personas.create', 'uses' => 'PersonaController@create']);
Route::post('personas/delete', ['as' => 'personas.delete', 'uses' => 'PersonaController@destroy']);
Route::post('personas/update', ['as' => 'personas.update', 'uses' => 'PersonaController@update']);
Route::get('personas/excel', ['as' => 'personas.excel', 'uses' => 'PersonaController@excel']);
Route::put('personas/createPersona/{id}', ['as' => 'personas.createPersona', 'uses' => 'PersonaController@createUpdate']);
Route::get('personas/find/{id}', ['as' => 'personas.find', 'uses' => 'PersonaController@find']);