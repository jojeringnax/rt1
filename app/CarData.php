<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CarData extends Model
{
    /**
     * @var string
     */
    protected $table='cars';

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function getOrganization()
    {
        return $this->hasOne(Organization::class, 'organization_id', 'id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function getAutocolumn()
    {
        return $this->hasOne(Autocolumn::class, 'autocolumn_id', 'id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function getBadSpot()
    {
        return $this->hasOne(BadSpot::class, 'bad_spot_id', 'id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function getSpot()
    {
        return $this->hasOne(Spot::class, 'spot_id', 'id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function getBrigade()
    {
        return $this->hasOne(Brigade::class, 'brigade_id', 'id');
    }
}
