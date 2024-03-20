<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Str;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 0; $i < 10; $i++) {
            DB::table('posts')->insert([
                'title' => 'Title ' . Str::random(10),
                'category_id' => rand(1, 2),
                'image' => Str::random(5),
                'description' => Str::random(20),
                'created_at' => Date::now(),
                'updated_at' => Date::now(),
            ]);
        }
    }
}
