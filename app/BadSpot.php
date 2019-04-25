<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class BadSpot
 * @package App
 *
 * @property string $id
 * @property string $company_id
 * @property string $organization_id
 * @property string $spot_id
 * @property string $bad_spot_id
 * @property string $name
 * @property string $town
 * @property string $description
 * @property string $address
 * @property float $x_pos
 * @property float $y_pos
 *
 * @property Company $company
 * @property Organization $organization
 * @property Spot[] $spots
 * @property Brigade[] $brigades
 * @property Car[] $cars
 * @property Statistic[] $statistics
 */
class BadSpot extends Model
{
    /**
     * @var string
     */
    protected $table='bad_spots';

    /**
     * @var array
     */
    protected $guarded=[
        'id',
        'company_id',
        'organization_id',
        'name',
        'town',
        'description',
        'address',
        'x_pos',
        'y_pos'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function getOrganization()
    {
        return $this->hasOne(Organization::class, 'organization_id', 'id');
    }


    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function getBrigades()
    {
        return $this->hasMany(Brigade::class, 'id', 'bad_spot_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function getCars()
    {
        return $this->hasMany(Car::class, 'id', 'bad_spot_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function getStatistics()
    {
        return $this->hasMany(Statistic::class, 'id', 'bad_spot_id');
    }
}
