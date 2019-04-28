<?php

use Illuminate\Http\Request;
use Psy\Util\Json;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

/**
 *  ORGANIZATIONS AND ORGANIZATION INFOS
*/
    Route::get('organizations', function () {
        return Json::encode(\App\Organization::getAllWithNumbers());
    });

    Route::get('organization/{id}/children', function ($id) {
        return Json::encode(\App\Division::getChildrenForDivision(\App\Organization::class,$id));
    });

    Route::get('organization/{id}/statistic', function ($id) {
        return \App\Statistic::getStatisticForDivision(\App\Organization::class, $id)->toJson();
    });

/**
 *  AUTOCOLUMNS AND AUTOCOLUMN INFOS
 */

Route::get('autocolumn/{id}/children', function ($id) {
    return Json::encode(\App\Division::getChildrenForDivision(\App\Autocolumn::class,$id));
});

Route::get('autocolumn/{id}/statistic', function ($id) {
    return \App\Statistic::getStatisticForDivision(\App\Autocolumn::class, $id)->toJson();
});

/**
 *  BAD_SPOTS AND BAD_SPOT INFOS
 */

Route::get('bad_spot/{id}/children', function ($id) {
    return Json::encode(\App\Division::getChildrenForDivision(\App\BadSpot::class,$id));
});

Route::get('bad_spot/{id}/statistic', function ($id) {
    return \App\Statistic::getStatisticForDivision(\App\BadSpot::class, $id)->toJson();
});

/**
 *  SPOTS AND SPOT INFOS
 */

Route::get('spot/{id}/children', function ($id) {
    return Json::encode(\App\Division::getChildrenForDivision(\App\Spot::class,$id));
});

Route::get('spot/{id}/statistic', function ($id) {
    return \App\Statistic::getStatisticForDivision(\App\Spot::class, $id)->toJson();
});

/**
 * BRIGADES AND BRIGADE INFOS
 */

Route::get('brigade/{id}/children', function ($id) {
    return Json::encode(\App\Division::getChildrenForDivision(\App\Brigade::class, $id));
});

Route::get('brigade/{id}/statistic', function ($id) {
    return \App\Statistic::getStatisticForDivision(\App\Brigade::class, $id)->toJson();
});




