<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrganizationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('organizations', function (Blueprint $table) {
            $table->string('id', 36);
            $table->string('company_id', 36)->nullable();
            $table->string('description', 512)->nullable();
            $table->string('address', 512)->nullable();
            $table->float('x_pos')->nullable();
            $table->float('y_pos')->nullable();
            $table->timestamps();
        });

        Schema::table('organizations', function (Blueprint $table) {
            $table->primary('id', 'pk-organizations');
            $table->foreign('company_id')->references('id')->on('companies')->onDelete('SET NULL');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('organizations');
    }
}
