<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class jobVaccanciesSededer extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $jobCategoryId = DB::table("job_categories")->pluck("id")->toArray();

        for($i = 0; $i < 20; $i++){
            DB::table("job_vacancies")->insert([
                "job_category_id" => fake()->randomElement($jobCategoryId),
                "company" => fake()->company(),
                "address" => fake()->address(),
                "description" => fake()->text()
            ]);
        }
    }
}
