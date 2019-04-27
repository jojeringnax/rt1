<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Organization
 * @package App
 *
 * @property string $id
 * @property string $company_id
 * @property string $description
 * @property string $address
 * @property float $x_pos
 * @property float $y_pos
 *
 * @property Company $company
 * @property Autocolumn[] $autocolumns
 * @property BadSpot[] $badSpots
 * @property Spot[] $spots
 * @property Brigade[] $brigades
 * @property Car[] $cars
 * @property Statistic[] $statistics
 */
class Organization extends Model
{
    /**
     * @var string
     */
    protected $table='organizations';

    /**
     * @var string
     */
    protected $primaryKey='id';

    /**
     * @var bool
     */
    public $incrementing = false;

    /**
     * @var array
     */
    protected $guarded=[
        'company_id',
        'description',
        'address',
        'x_pos',
        'y_pos'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function getAutocolumns()
    {
        return $this->hasMany(Autocolumn::class, 'id', 'organization_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function getBadSpots()
    {
        return $this->hasMany(BadSpot::class, 'id', 'organization_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function getSpots()
    {
        return $this->hasMany(Spot::class, 'id', 'organization_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function getBrigades()
    {
        return $this->hasMany(Brigade::class, 'id', 'organization_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function getCars()
    {
        return $this->hasMany(Car::class, 'id', 'organization_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function getStatistics()
    {
        return $this->hasMany(Statistic::class, 'id', 'organization_id');
    }
}
