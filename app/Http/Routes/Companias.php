<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('companias/list', ['as' => 'companias.list', 'uses' => 'CompaniaController@all']);
Route::post('companias/create', ['as' => 'companias.create', 'uses' => 'CompaniaController@create']);
Route::post('companias/delete', ['as' => 'companias.delete', 'uses' => 'CompaniaController@destroy']);
Route::post('companias/update', ['as' => 'companias.update', 'uses' => 'CompaniaController@update']);
Route::get('companias/excel', ['as' => 'companias.excel', 'uses' => 'CompaniaController@excel']);