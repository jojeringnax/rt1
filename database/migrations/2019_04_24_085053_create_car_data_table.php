<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCarDataTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('car_data', function (Blueprint $table) {
            $table->string('car_id', 36);
            $table->string('driver_name', 128)->nullable();
            $table->string('phone_number', 20)->nullable();
            $table->dateTime('start_time_plan')->nullable();
            $table->dateTime('start_time_fact')->nullable();
            $table->dateTime('end_time_plan')->nullable();
            $table->float('work_time_plan')->nullable();
            $table->float('work_time_fact')->nullable();
            $table->integer('mileage')->nullable();
            $table->integer('speed')->nullable();
            $table->float('fuel_norm')->nullable();
            $table->float('fuel_DUT')->nullable();
            $table->string('driver_mark', 16)->nullable();
            $table->integer('violations_count')->nullable();
            $table->timestamps();
        });

        Schema::table('car_data', function (Blueprint $table) {
            $table->primary('car_id', 'pk-car_data');
            $table->foreign('car_id')->references('id')->on('cars')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('car_data');
    }
}
