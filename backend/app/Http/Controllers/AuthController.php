<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use PhpOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Auth;
use Validator;
use Illuminate\Support\Facades\DB;

class AuthController extends Controller
{
    public function login(Request $request){
        $validate = Validator::make($request->all(), [
            "id_card_number" => "required|exists:societies,id_card_number",
            "password" => "required"
        ]);

        if($validate->fails()){
            return response()->json([
                "message" => "ID Card Number or Password incorrect"
            ]);
        }

        if(!$token =  Auth::guard("societies")->attempt($request->only("id_card_number", "password"))){
            return response()->json([
                "message" => "ID Card Number or Password incorrect"
            ]);
        }

        $userId = Auth::guard("societies")->user()->id;

        DB::table("societies")->where("id", $userId)->update([
            "login_tokens" => $token
        ]);

        $data = DB::table("societies")
            ->join("regionals", "regionals.id" , "=", "societies.regional_id")
            ->where("societies.id", $userId)
            ->select("societies.name as name",
                    "societies.born_date as born_date",
                    "societies.gender as gender",
                    "societies.address as address",
                    "regionals.id as id",
                    "regionals.province as province",
                    "regionals.district as district")
            ->get();

        $struct = $data->map(function($item) use ($token) {
            return [
                "name" => $item->name,
                "born_date" => $item->born_date,
                "gender" => $item->gender,
                "address" => $item->address,
                "token" => $token,
                "regional" => [
                    "id" => $item->id,
                    "privince" => $item->province,
                    "district" => $item->district
                ],
            ];
        });


        return response()->json($struct);
    }

    public function logout(){
        Auth::guard()->logout();
        return response()->json([
            "message" => "logout success"
        ]);
    }
}

