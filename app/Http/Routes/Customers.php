<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('customers/list', ['as' => 'customers.list', 'uses' => 'CustomerController@all']);
Route::post('customers/create', ['as' => 'customers.create', 'uses' => 'CustomerController@create']);
Route::post('customers/delete', ['as' => 'customers.delete', 'uses' => 'CustomerController@destroy']);
Route::post('customers/update', ['as' => 'customers.update', 'uses' => 'CustomerController@update']);
Route::get('customers/excel', ['as' => 'customers.excel', 'uses' => 'CustomerController@excel']);