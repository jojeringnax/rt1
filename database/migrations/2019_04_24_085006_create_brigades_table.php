<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBrigadesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('brigades', function (Blueprint $table) {
            $table->string('id', 36);
            $table->string('company_id', 36)->nullable();
            $table->string('organization_id', 36)->nullable();
            $table->string('autocolumn_id', 36)->nullable();
            $table->string('bad_spot_id', 36)->nullable();
            $table->string('spot_id', 36)->nullable();
            $table->string('description', 512)->nullable();
            $table->string('name', 256)->nullable();
            $table->string('town', 64)->nullable();
            $table->string('address', 512)->nullable();
            $table->boolean('work')->default(false);
            $table->float('x_pos',8)->nullable();
            $table->float('y_pos',8)->nullable();
            $table->timestamps();
        });

        Schema::table('brigades', function (Blueprint $table) {
            $table->primary('id', 'pk-brigades');
            $table->foreign('company_id')->references('id')->on('companies')->onDelete('SET NULL');
            $table->foreign('organization_id')->references('id')->on('organizations')->onDelete('SET NULL');
            $table->foreign('autocolumn_id')->references('id')->on('autocolumns')->onDelete('SET NULL');
            $table->foreign('bad_spot_id')->references('id')->on('bad_spots')->onDelete('SET NULL');
            $table->foreign('spot_id')->references('id')->on('spots')->onDelete('SET NULL');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('brigades');
    }
}
