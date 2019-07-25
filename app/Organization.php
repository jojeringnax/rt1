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
    public function autocolumns()
    {
        return $this->hasMany(Autocolumn::class)->where('x_pos', '!=', null);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function badSpots()
    {
        return $this->hasMany(BadSpot::class, 'id', 'organization_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function spots()
    {
        return $this->hasMany(Spot::class, 'id', 'organization_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function brigades()
    {
        return $this->hasMany(Brigade::class, 'id', 'organization_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function carsWithCoordinates()
    {
        return $this->hasMany(Car::class)->where('x_pos', '!=', null);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function cars()
    {
        return $this->hasMany(Car::class)->where('company_id', '!=', null);;
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function statistics()
    {
        return $this->hasMany(Statistic::class);
    }


    /**
     * @return Organization[]|\Illuminate\Database\Eloquent\Collection
     */
    public static function getAllWithNumbers()
    {
        $organizations = self::get();
        $resultArray['bounds'] = Division::getBounds($organizations);
        foreach ($organizations as $organization) {
            $resultArray['divisions'][] = [
                'organization' => $organization,
                'carsNumber' => Car::where('x_pos', '!=', null)->where('organization_id', $organization->id)->count(),
                'totalCarsNumber' => Car::where('company_id', '!=', null)->where('organization_id', $organization->id)->count()
            ];
        }
        return $resultArray;
    }
}
