<?php
/**
 * Created by PhpStorm.
 * User: jojer
 * Date: 2019-05-03
 * Time: 13:59
 */

namespace App;

/**
 * Class Soap
 * @package App
 */
abstract class Soap
{
    /**
     * @return string
     */
    abstract public function getOrganizations();

    /**
     * @return string
     */
    abstract public function getDivision();

    /**
     * @return string
     */
    abstract public function getCars();
}