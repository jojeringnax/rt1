<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAutocolumnsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('autocolumns', function (Blueprint $table) {
            $table->string('id', 36);
            $table->string('company_id', 36)->nullable();
            $table->string('organization_id', 36)->nullable();
            $table->string('description', 512)->nullable();
            $table->string('name', 256)->nullable();
            $table->string('town', 64)->nullable();
            $table->string('address', 512)->nullable();
            $table->boolean('work')->default(false);
            $table->float('x_pos', 8)->nullable();
            $table->float('y_pos', 8)->nullable();
            $table->timestamps();
        });

        Schema::table('autocolumns', function (Blueprint $table) {
            $table->primary('id', 'pk-autocolumns');
            $table->foreign('company_id')->references('id')->on('companies')->onDelete('SET NULL');
            $table->foreign('organization_id')->references('id')->on('organizations')->onDelete('SET NULL');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('autocolumns');
    }
}
