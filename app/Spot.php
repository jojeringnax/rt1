<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Spot
 * @package App
 *
 * @property string $id
 * @property string $company_id
 * @property string $organization_id
 * @property string $autocolumn_id
 * @property string $name
 * @property string $town
 * @property string $description
 * @property string $address
 * @property boolean $work
 * @property float $x_pos
 * @property float $y_pos
 *
 * @property Company $company
 * @property Organization $organization
 * @property Autocolumn $autocolumn
 * @property Brigade[] $brigades
 * @property Car[] $cars
 * @property Statistic[] $statistics
 */
class Spot extends Model
{
    /**
     * @var string
     */
    protected $table='spots';

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
        'id',
        'company_id',
        'organization_id',
        'autocolumn_id',
        'name',
        'town',
        'description',
        'address',
        'x_pos',
        'y_pos'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function organization()
    {
        return $this->belongsTo(Organization::class)->where('x_pos', '!=', null);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function autocolumn()
    {
        return $this->belongsTo(Autocolumn::class)->where('x_pos', '!=', null);
    }


    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function brigades()
    {
        return $this->hasMany(Brigade::class)->where('x_pos', '!=', null);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function cars()
    {
        return $this->hasMany(Car::class)->where('x_pos', '!=', null);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function statistics()
    {
        return $this->hasMany(Statistic::class);
    }
}
