<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCarsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cars', function (Blueprint $table) {
            $table->string('id', 36);
            $table->string('company_id', 36)->nullable();
            $table->string('organization_id', 36)->nullable();
            $table->string('autocolumn_id', 36)->nullable();
            $table->string('spot_id', 36)->nullable();
            $table->string('brigade_id', 36)->nullable();
            $table->string('bad_spot_id', 36)->nullable();
            $table->string('number', 16)->nullable();
            $table->tinyInteger('type')->nullable();
            $table->string('model', 128)->nullable();
            $table->string('description', 512)->nullable();
            $table->tinyInteger('status')->nullable();
            $table->boolean('inline')->nullable();
            $table->integer('year')->nullable();
            $table->float('profitability', 10)->nullable();
            $table->integer('technical_inspection_days')->nullable();
            $table->integer('battery_change_days')->nullable();
            $table->integer('tire_change_days')->nullable();
            $table->string('tire_season', 32)->nullable();
            $table->boolean('terminal')->default(0);
            $table->float('x_pos',10)->nullable();
            $table->float('y_pos',10)->nullable();
            $table->timestamps();
        });

        Schema::table('cars', function (Blueprint $table) {
            $table->primary('id', 'pk-cars');
            $table->foreign('company_id')->references('id')->on('companies')->onDelete('SET NULL');
            $table->foreign('organization_id')->references('id')->on('organizations')->onDelete('SET NULL');
            $table->foreign('autocolumn_id')->references('id')->on('autocolumns')->onDelete('SET NULL');
            $table->foreign('bad_spot_id')->references('id')->on('bad_spots')->onDelete('SET NULL');
            $table->foreign('spot_id')->references('id')->on('spots')->onDelete('SET NULL');
            $table->foreign('brigade_id')->references('id')->on('brigades')->onDelete('SET NULL');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cars');
    }
}
