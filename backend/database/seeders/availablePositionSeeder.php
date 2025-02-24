<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class availablePositionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $vacancyId = DB::table("job_vacancies")->pluck("id")->toArray();
        $positions = ["Backend", "Frontend", "Ui/Ux", "Fullstack", "DevOps", "Cyber Security"];

        for($i = 0; $i < 100 ; $i++){
            DB::table("available_positions")->insert([
                "job_vacancy_id" =>  fake()->randomElement($vacancyId),
                "position" => fake()->randomElement($positions),
                "capacity" => fake()->randomElement([3,6,9,10]),
                "apply_capacity" => fake()->randomElement([11,13,15,18])
            ]);
        }
    }
}
