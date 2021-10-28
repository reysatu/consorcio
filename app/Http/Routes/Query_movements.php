<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('query_movements/list', ['as' => 'query_movements.list', 'uses' => 'Query_movementsController@all']);
Route::post('query_movements/create', ['as' => 'query_movements.create', 'uses' => 'Query_movementsController@create']);
Route::post('query_movements/delete', ['as' => 'query_movements.delete', 'uses' => 'Query_movementsController@destroy']);
Route::post('query_movements/update', ['as' => 'query_movements.update', 'uses' => 'Query_movementsController@update']);
Route::get('query_movements/excel', ['as' => 'query_movements.excel', 'uses' => 'Query_movementsController@excel']);
Route::get('query_movements/getDataFiltro', 'Query_movementsController@getDataFiltro');