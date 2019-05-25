<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Company
 * @package App
 *
 * @property string $id
 * @property string $name
 *
 * @property Organization[] $organizations
 * @property Autocolumn[] $autocolumns
 * @property BadSpot[] $badSpots
 * @property Spot[] $spots
 * @property Brigade[] $brigades
 * @property Car[] $cars
 * @property Statistic[] $statistics
 */
class Company extends Model
{
    /**
     * @var string
     */
    protected $table='companies';

    /**
     * @var array
     */
    protected $guarded=[
        'id',
        'name'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function getOrganizations()
    {
        return $this->hasMany(Organization::class, 'id', 'company_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function getAutocolumns()
    {
        return $this->hasMany(Autocolumn::class, 'id', 'company_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function getBadSpots()
    {
        return $this->hasMany(BadSpot::class, 'id', 'company_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function getSpots()
    {
        return $this->hasMany(Spot::class, 'id', 'company_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function getBrigades()
    {
        return $this->hasMany(Brigade::class, 'id', 'company_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function getCars()
    {
        return $this->hasMany(Car::class, 'id', 'company_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function getStatistics()
    {
        return $this->hasMany(Statistic::class, 'id', 'company_id');
    }
}
