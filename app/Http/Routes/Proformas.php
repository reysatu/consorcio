<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('proformas/list', ['as' => 'proformas.list', 'uses' => 'ProformaController@all']);
Route::post('proformas/create', ['as' => 'proformas.create', 'uses' => 'ProformaController@create']);
Route::post('proformas/delete', ['as' => 'proformas.delete', 'uses' => 'ProformaController@destroy']);
Route::post('proformas/update', ['as' => 'proformas.update', 'uses' => 'ProformaController@update']);
Route::get('proformas/excel', ['as' => 'proformas.excel', 'uses' => 'ProformaController@excel']);