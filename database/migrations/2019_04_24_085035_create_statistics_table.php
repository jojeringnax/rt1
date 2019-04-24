<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStatisticsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('statistics', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('company_id', 36)->nullable();
            $table->string('organization_id', 36)->nullable();
            $table->string('autocolumn_id', 36)->nullable();
            $table->string('spot_id', 36)->nullable();
            $table->string('brigade_id', 36)->nullable();
            $table->integer('applications_total')->default(0);
            $table->integer('applications_executed')->default(0);
            $table->integer('applications_canceled')->default(0);
            $table->integer('applications_sub')->default(0);
            $table->integer('applications_ac')->default(0);
            $table->integer('applications_mp')->default(0);
            $table->integer('waybills_total')->default(0);
            $table->integer('waybills_processed')->default(0);
            $table->integer('accidents_total')->default(0);
            $table->integer('accidents_guilty')->default(0);
            $table->float('time')->default(0);
            $table->float('fuel')->default(0);
            $table->integer('WB_M')->default(0);
            $table->integer('WB_ALL')->default(0);
            $table->timestamps();
        });

        Schema::table('statistics', function (Blueprint $table) {
            $table->foreign('company_id')->references('id')->on('companies')->onDelete('SET NULL');
            $table->foreign('organization_id')->references('id')->on('organizations')->onDelete('SET NULL');
            $table->foreign('autocolumn_id')->references('id')->on('organizations')->onDelete('SET NULL');
            $table->foreign('spot_id')->references('id')->on('organizations')->onDelete('SET NULL');
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
        Schema::dropIfExists('statistics');
    }
}
