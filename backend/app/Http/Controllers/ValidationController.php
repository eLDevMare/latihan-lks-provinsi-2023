<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use PhpOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Auth;

class ValidationController extends Controller
{
    public function requestValidation(Request $request){
        $validatorId = DB::table("validators")->pluck("id")->toArray();    
        $userId = Auth::guard("societies")->user()->id;
        
        DB::table("validations")->insert([
            "job_category_id" => $request->job_category,
            "society_id" => $userId,
            "validator_id" => fake()->randomElement($validatorId), 
            "work_experience" => $request->work_experience, 
            "job_position" => $request->job_position,
            "reason_accepted" => $request->reason_accepted
        ]);

        return response()->json([
            "message" => "Request data validation sent successful"
        ]);
    }

    public function getValidation(){
        $userId = Auth::guard("societies")->user()->id;

        $data = DB::table("validations")
            ->join("job_categories", "job_categories.id", "=", "validations.job_category_id")
            ->join("validators", "validators.id" , "=", "validations.validator_id")
            ->where("validations.society_id", $userId)
            ->select("validations.id as id",
                     "validations.status as status",
                     "validations.work_experience as work_experience",
                     "job_categories.job_category as job_category_id",
                     "validations.job_position as job_position",
                     "validations.reason_accepted as reason_accepted",
                     "validations.validator_notes as validator_notes",
                     "validators.name as validator")
            ->first();
    
        return response()->json([
            "validation" => $data
        ]);
    }


    
}
