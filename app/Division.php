<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Division
 * @package App
 */
class Division extends Model
{
    /**
     * @param $arrayOfDivisions
     * @return array
     */
    public static function getBounds($arrayOfDivisions, $xMin=1000, $xMax=-1000, $yMin=1000, $yMax=-1000)
    {
        if (empty($arrayOfDivisions)) {
            return [
                'bounds' => null,
                'center' => null
            ];
        }
        foreach($arrayOfDivisions as $division) {
            if ($division->x_pos > $xMax) {
                $xMax = $division->x_pos;
            }
            if ($division->x_pos < $xMin) {
                $xMin  = $division->x_pos;
            }
            if ($division->y_pos > $yMax) {
                $yMax = $division->y_pos;
            }
            if ($division->y_pos < $yMin) {
                $yMin = $division->y_pos;
            }
        }
        if ($xMax === $xMin && $yMax === $yMin) {
            $bounds = null;
            $center = [$xMin, $yMin];
        } else {
            $bounds = [[$xMin, $yMin], [$xMax, $yMax]];
            $center = null;
        }
        return [
            'bounds' => $bounds,
            'center' => $center
        ];
    }

    /**
     * @param $className
     * @param $organizationID
     * @return array
     */
    public static function getForOrganizationWithNumbers($className, $organizationID)
    {
        $divisions = $className::where('x_pos', '!=', null)->where('organization_id', $organizationID)->get();
        $type = $className === Autocolumn::class ? 'autocolumn' : 'bad_spot';
        $resultArray['bounds'] = self::getBounds($divisions);
        foreach ($divisions as $division) {
            $resultArray['divisions'] = [
                $type => $division,
                'carsNumber' => Car::where('x_pos', '!=', null)->where($type.'_id', $division->id)->count()
            ];
        }
        return $resultArray;
    }


    public static function getChildrenForDivision($parentClass, $parentID)
    {
        if ($parentClass::find($parentID) === null) {
            return 'This is not a joke';
        }
        switch($parentClass) {
            case Organization::class:
                $parentType = 'organization';
                $childrenClasses = [Autocolumn::class, BadSpot::class];
                break;

            case Autocolumn::class:
                $parentType = 'autocolumn';
                $childrenClasses = [Spot::class];
                break;

            case BadSpot::class:
                $parentType = 'bad_spot';
                $childrenClasses = [Car::class, Brigade::class];
                break;

            case Spot::class:
                $parentType = 'spot';
                $childrenClasses = [Car::class, Brigade::class];
                break;

            default:
                $parentType = 'brigade';
                $childrenClasses = [Car::class];
        }
        $finalChildren = [];
        foreach ($childrenClasses as $childrenClass) {
            if ($childrenClass === Car::class) {
                $children = $childrenClass::where('x_pos', '!=', null)->where($parentType.'_id', $parentID)->get();
            } else {
                $children = $childrenClass::where('x_pos', '!=', null)->where('work', 1)->where($parentType.'_id', $parentID)->get();
            }
            foreach($children as $child) {
                $finalChildren[] = $child;
            }
        }
        $resultArray['bounds'] = Division::getBounds($finalChildren);
        foreach ($finalChildren as $finalChild) {
            if ($finalChild instanceof Car) {
                $resultArray['cars'][] = $finalChild;
                continue;
            }
            switch(get_class($finalChild)) {
                case Autocolumn::class:
                    $childType = 'autocolumn';
                    break;
                case BadSpot::class:
                    $childType = 'bad_spot';
                    break;
                case Spot::class:
                    $childType = 'spot';
                    break;
                default:
                    $childType = 'brigade';

            }
            $resultArray['divisions'][] = [
                $childType => $finalChild,
                'carsNumber' => Car::where('x_pos', '!=', null)->where($childType.'_id', $finalChild->id)->count()
            ];
        }
        return $resultArray;
    }
}
