<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use illuminate\Support\Facades\Auth;
use PhpOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use Validator;
use Carbon\Carbon;

class VacancyController extends Controller
{
    public function getJobVacancy(){
        $userId = Auth::guard("societies")->user()->id;
        $userCategory = DB::table("validations")->where("society_id", $userId)->first()->job_category_id;

        $data = DB::table("job_vacancies")
            ->join("available_positions", "available_positions.job_vacancy_id", "=", "job_vacancies.id")
            ->join("job_categories", "job_categories.id", "=", "job_vacancies.job_category_id")
            ->select("job_vacancies.id as id",
                    "job_categories.id as category_id",
                    "job_categories.job_category as category_job_category",
                    "job_vacancies.company as company",
                    "job_vacancies.address as address",
                    "job_vacancies.description as description",
                    "available_positions.position as position",
                    "available_positions.capacity as capacity", 
                    "available_positions.apply_capacity as apply_capacity")
            ->where("job_vacancies.job_category_id", $userCategory)
            ->get();

        $group = $data->groupBy("id");
        

        $struct = $group->map(function($item){
            return[
                "id" => $item->first()->id,
                "category" => [
                    "id" => $item->first()->category_id,
                    "job_category" => $item->first()->category_job_category,
                ],
                "company" => $item->first()->company,
                "address" => $item->first()->address,
                "description"  => $item->first()->description,
                "available_position" => $item->map(function($itemm){
                    return [
                        "position" => $itemm->position,
                        "capacity" => $itemm->capacity,
                        "apply_capacity" => $itemm->apply_capacity
                    ];
                })
            ];
        })->values();
        
        return response()->json([
            "vacancies" => $struct
        ]);
    }


    public function getJobVacancyDetail($id){
        $data = DB::table("job_vacancies")
            ->join("available_positions", "available_positions.job_vacancy_id", "=", "job_vacancies.id")
            ->join("job_categories", "job_categories.id", "=", "job_vacancies.job_category_id")
            ->select("job_vacancies.id as id",
                    "job_categories.id as category_id",
                    "job_categories.job_category as category_job_category",
                    "job_vacancies.company as company",
                    "job_vacancies.address as address",
                    "job_vacancies.description as description",
                    "available_positions.position as position",
                    "available_positions.capacity as capacity", 
                    "available_positions.apply_capacity as apply_capacity")
            ->where("job_vacancies.id", $id)
            ->get();

        $group = $data->groupBy("id");
        

        $struct = $group->map(function($item){
            return[
                "id" => $item->first()->id,
                "category" => [
                    "id" => $item->first()->category_id,
                    "job_category" => $item->first()->category_job_category,
                ],
                "company" => $item->first()->company,
                "address" => $item->first()->address,
                "description"  => $item->first()->description,
                "available_position" => $item->map(function($itemm){
                    return [
                        "position" => $itemm->position,
                        "capacity" => $itemm->capacity,
                        "apply_capacity" => $itemm->apply_capacity
                    ];
                })
            ];
        })->values();
        
        return response()->json([
            "vacancies" => $struct
        ]);
    } 


    public function applyVacancy(Request $request){
        $date = Carbon::now();
        $userId = Auth::guard("societies")->user()->id;
        $status = DB::table("validations")->where("society_id", $userId)->first()->status;
        $apply = DB::table("job_apply_societies")->where("society_id", $userId)->where("job_vacancy_id", $request->vacancy_id)->exists();

        $validate = Validator::make($request->all(), [
            "vacancy_id" => "required",
            "positions" => "required"
        ], [
            "vacancy_id" => "The vacancy id field is required.",
            "positions" => "The position field is required."
        ]);

        if($validate->fails()){
            return response()->json([
                "message" => "error",
                "error" => $validate->errors()
            ],401);
        }

        if($status !== "accepted"){
            return response()->json([
                "message" => "Your data validator must be accepted by validator before"
            ],401);
        }

        if($apply){
            return response()->json([
                "message" => " Application for a job can only be once" 
            ],401);
        }

        $insertId = DB::table("job_apply_societies")->insertGetId([
            "notes" => $request->notes,
            "date" => $date,
            "society_id" => $userId,
            "job_vacancy_id" => $request->vacancy_id
        ]);

        foreach($request->positions as $position){
            $positionId = DB::table("available_positions")->where("position", $position)->where("job_vacancy_id", $request->vacancy_id)->first()->id;

            DB::table("job_apply_positions")->insert([
                "date" => $date,
                "society_id" => $userId,
                "job_vacancy_id" => $request->vacancy_id,
                "position_id" => $positionId,
                "job_apply_societies_id" => $insertId,
            ]);
        }

        return response()->json([
            "message" => "Applying for job successful"
        ]);
    }

    public function getApply(){
        $userId = Auth::guard("societies")->user()->id;

        $data = DB::table("job_apply_positions")
            ->join("job_vacancies", "job_vacancies.id", "=", "job_apply_positions.job_vacancy_id")
            ->join("job_apply_societies", "job_apply_societies.job_vacancy_id", "=", "job_vacancies.id")
            ->join("available_positions", "available_positions.id", "=", "job_apply_positions.position_id")
            ->join("job_categories", "job_categories.id", "=", "job_vacancies.job_category_id")
            ->select("job_vacancies.id as id",
                    "job_categories.id as category_id",
                    "job_categories.job_category as category_job_category",
                    "job_vacancies.company as company",
                    "job_vacancies.address as address",
                    "available_positions.position as position",
                    "job_apply_positions.status as apply_status",
                    "job_apply_societies.notes as notes")
            ->where("job_apply_positions.society_id", $userId)
            ->get();

        $group = $data->groupBy("id");

        $struct = $group->map(function($item){
            return[
                "id" => $item->first()->id,
                "category" => [
                    "id" => $item->first()->category_id,
                    "job_category" => $item->first()->category_job_category
                ],
                "company" => $item->first()->company,
                "address" => $item->first()->address,
                "position" => $item->map(function($itemm){
                    return[
                        "position" => $itemm->position,
                        "apply_status" => $itemm->apply_status,
                        "notes" => $itemm->notes
                    ];
                })
            ];
        })->values();
        

        return response()->json([
            "vacancies" => $struct
        ]);
    }

}
