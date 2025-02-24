<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ValidationController;
use App\Http\Controllers\VacancyController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post("/v1/auth/login", [AuthController::class, "login"]);


Route::middleware(["token"])->group(function() {
    Route::post("/v1/auth/logout", [AuthController::class, "logout"]);

    Route::post("/v1/validation", [ValidationController::class, "requestValidation"]);
    Route::get("/v1/validations", [ValidationController::class, "getValidation"]);

    Route::get("/v1/job_vacancies", [VacancyController::class, "getJobVacancy"]);
    Route::get("/v1/job_vacancies/{id}", [VacancyController::class, "getJobVacancyDetail"]);

    Route::post("/v1/applications", [VacancyController::class, "applyVacancy"]);
    Route::get("/v1/applications", [VacancyController::class, "getApply"]);
});
