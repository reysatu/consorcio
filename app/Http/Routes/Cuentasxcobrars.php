<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */
 
Route::post('cuentasxcobrars/list', ['as' => 'cuentasxcobrars.list', 'uses' => 'AsignacioncobradorController@all']);
Route::post('cuentasxcobrars/create', ['as' => 'cuentasxcobrars.create', 'uses' => 'AsignacioncobradorController@create']);
Route::post('cuentasxcobrars/delete', ['as' => 'cuentasxcobrars.delete', 'uses' => 'AsignacioncobradorController@destroy']);
Route::post('cuentasxcobrars/update', ['as' => 'cuentasxcobrars.update', 'uses' => 'AsignacioncobradorController@update']);
Route::get('cuentasxcobrars/excel', ['as' => 'cuentasxcobrars.excel', 'uses' => 'AsignacioncobradorController@excel']);

Route::post('cuentasxcobrars/listCronogramaCuentasxCobrar', ['as' => 'cuentasxcobrars.listCronogramaCuentasxCobrar', 'uses' => 'AsignacioncobradorController@listCronogramaCuentasxCobrar']);

Route::get('cuentasxcobrars/data_form', ['as' => 'cuentasxcobrars.data_form', 'uses' => 'AsignacioncobradorController@data_form']);
Route::put('cuentasxcobrars/saveCobrador/{id}', ['as' => 'cuentasxcobrars.saveCobrador', 'uses' => 'AsignacioncobradorController@createUpdate']);

Route::get('cuentasxcobrars/tarjetaCobranza', ['as' => 'cuentasxcobrars.tarjetaCobranza', 'uses' => 'AsignacioncobradorController@tarjetaCobranza']);

Route::get('cuentasxcobrars/cuentasporcobrar', ['as' => 'cuentasxcobrars.cuentasporcobrar', 'uses' => 'AsignacioncobradorController@pdf_cuentasxcobrar']); 