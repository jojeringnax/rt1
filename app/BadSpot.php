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
 * @property boolean $work
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

    /**
     * @return array
     */
    public static function getForOrganizationWithNumbers($organizationID)
    {
        $badSpots = self::where('x_pos', '!=', null)->where('organization_id', $organizationID)->get();
        $resultArray = [];
        foreach ($badSpots as $badSpot) {
            $resultArray[] = [
                'badSpot' => $badSpot,
                'carsNumber' => Car::where('x_pos', '!=', null)->where('bad_spot_id', $badSpot->id)->count()
            ];
        }
        return $resultArray;
    }
}
