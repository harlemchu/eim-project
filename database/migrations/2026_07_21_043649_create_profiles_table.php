<?php
// database/migrations/xxxx_xx_xx_create_profiles_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->integer('graduation_year');
            $table->text('bio')->nullable();
            $table->string('avatar')->nullable();
            $table->string('class_name')->nullable();
            $table->string('quote')->nullable();
            $table->json('interests')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('profiles');
    }
};