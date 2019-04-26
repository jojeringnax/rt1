<?php

namespace App\Console\Commands;

use App\BadSpot;
use App\Brigade;
use App\Car;
use App\Spot;
use Illuminate\Console\Command;

class CarsCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'cars:fill';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fill cars from SOAP.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        ini_set('memory_limit', '1000M');
        ini_set('max_execution_time', '0');
        $client = new \SoapClient('http://d.rg24.ru:5601/PUP_WS/ws/PUP.1cws?wsdl');
        try {
            $cars = json_decode($client->getCars()->return);
            $carsStatuses = json_decode($client->getGarsStatus()->return);
            $carsPositions = json_decode($client->getCarsPosition([])->return);
            $this->info('Cars successfully received via SOAP');
        } catch (\Exception $exception) {
            $this->error($exception->getMessage());
            return false;
        }
        foreach ($cars as $car) {
            $this->info('Car with ID='.$car->ID.' in work...');
            /**
             * @var Car $carModel
             */
            $carModel = Car::firstOrNew(['id' => $car->ID]);
            $carModel->id = $car->ID;
            foreach($carsStatuses as $carsStatus) {
                if($carsStatus->CarsID === $car->ID) {
                    $badSpot = null;
                    $spot = null;
                    /**
                     * @var Spot $spot|null
                     * @var BadSpot $badSpot|null
                     */
                    if (isset($carsStatus->DivisionID)) {
                        $badSpot = BadSpot::find($carsStatus->DivisionID);
                        $spot = Spot::find($carsStatus->DivisionID);
                        $brigade = Brigade::find($carsStatus->DivisionID);
                    }
                    $isForBadSpot = $badSpot !== null;
                    $isForBrigade = $brigade !== null;
                    if ($badSpot === null && $spot === null && $brigade === null) {
                        $spotID = null;
                        $organizationID = null;
                        $autocolumnID = null;
                        $badSpotID = null;
                        $brigadeID = null;
                    } else {
                        if ($isForBrigade) {
                            $spotID = $brigade->spot_id;
                            $organizationID = $brigade->organization_id;;
                            $autocolumnID = $brigade->autocolumn_id;
                            $badSpotID = $brigade->bad_spot_id;
                            $brigadeID = $carsStatus->DivisionID;
                        } else {
                            $spotID = $isForBadSpot ? null : $carsStatus->DivisionID;
                            $organizationID = $isForBadSpot ? $badSpot->organization_id : $spot->organization_id;;
                            $autocolumnID = $isForBadSpot ? null : $spot->autocolumn_id;
                            $badSpotID = $isForBadSpot ? $carsStatus->DivisionID : null;
                            $brigadeID = null;
                        }
                    }
                    $this->info($isForBadSpot ? 'Bad Spot :(' : 'Good Spot :)');
                    $this->info('Statuses found in SOAP-response');
                    $carModel->number = isset($car->Number) ? $car->Number  : null;
                    $carModel->company_id = '113';
                    $carModel->organization_id = $organizationID;
                    $carModel->autocolumn_id = $autocolumnID;
                    $carModel->bad_spot_id = $badSpotID;
                    $carModel->spot_id = $spotID;
                    $carModel->brigade_id = $brigadeID;
                    $carModel->status = isset($carsStatus->Status) ? Car::STATUSES[$carsStatus->Status]  : null;
                    $carModel->inline = isset($carsStatus->InLine) ? $carsStatus->InLine  : null;
                    $carModel->type = isset($car->Type) ? Car::TYPES[$car->Type]  : null;
                    $carModel->model = isset($car->Model) ? $car->Model  : null;
                    $carModel->description = isset($car->Description) ? $car->Description  : null;
                    $carModel->year = isset($car->Year) ? $car->Year  : null;
                    $carModel->profitability = isset($carsStatus->Profitability) && $carsStatus->Profitability !== '' ? preg_replace('/,/', '.', $carsStatus->Profitability)  : null;
                    $carModel->technical_inspection_days = isset($carsStatus->TechnicalInspection) ? $carsStatus->TechnicalInspection  : null;
                    $carModel->battery_change_days = isset($carsStatus->BatteryChange) ? $carsStatus->BatteryChange  : null;
                    $carModel->tire_change_days = isset($carsStatus->TyreChange) ? $carsStatus->TyreChange  : null;
                    $carModel->tire_season = isset($carsStatus->TyreSeason) ? $carsStatus->TyreSeason  : null;
                    $carModel->terminal = isset($carsStatus->Terminal) && $carsStatus->Terminal !== 0;
                } else {
                    continue;
                }
            }
            foreach ($carsPositions as $carsPosition) {
                if ($carsPosition->CarsID === $car->ID) {
                    $this->info('Coordinates found in SOAP-response');
                    $carModel->x_pos = preg_replace('/,/', '.', $carsPosition->XPos);
                    $carModel->y_pos = preg_replace('/,/', '.', $carsPosition->YPos);
                } else {
                    continue;
                }
            }
            $carModel->save();
            $this->info('saved');
        }
        return true;
    }
}
