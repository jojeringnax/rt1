<?php

namespace App\Console\Commands;

use App\Autocolumn;
use App\BadSpot;
use App\Brigade;
use App\Spot;
use App\Statistic;
use Illuminate\Console\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputOption;

class StatisticsCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'statistics:fill';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fill statistics from SOAP.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
        $this->addOption('full','f',InputOption::VALUE_NONE,'Get all the statistics');
        $this->addOption('applications', 'a', InputOption::VALUE_NONE, 'Get only applications');
        $this->addOption('waybills', 'w', InputOption::VALUE_NONE, 'Get only waybills');
    }


    /**
     * @param $divisionID
     * @return Statistic
     */
    public static function getStatisticModel($divisionID)
    {
        $spotID = ($spot = Spot::find($divisionID)) !== null ? $divisionID : null;
        $autocolumnID = ($autocolumn = Autocolumn::find($divisionID)) !== null ? $divisionID : null;
        $brigadeID = ($brigade = Brigade::find($divisionID)) !== null ? $divisionID : null;
        $badSpotID = ($badSpot = BadSpot::find($divisionID)) !== null ? $divisionID : null;
        $organizationID = null;
        if ($autocolumn !== null) {
            $organizationID = $autocolumn->organization_id;
        }
        if ($badSpot !== null) {
            $organizationID = $badSpot->organization_id;
        }
        if ($spot !== null) {
            $organizationID = $spot->organization_id;
            $autocolumnID = $spot->autocolumn_id;
        }
        if ($brigade !== null) {
            $organizationID = $brigade->organization_id;
            $autocolumnID = $brigade->autocolumn_id;
            $badSpotID = $brigade->bad_spot_id;
            $spotID = $brigade->spot_id;
        }
        $statistic = Statistic::firstOrNew([
            'bad_spot_id' => $badSpotID,
            'autocolumn_id' => $autocolumnID,
            'spot_id' => $spotID,
            'brigade_id' => $brigadeID
        ]);
        $statistic->autocolumn_id = $autocolumnID;
        $statistic->organization_id = $organizationID;
        $statistic->bad_spot_id = $badSpotID;
        $statistic->spot_id = $spotID;
        $statistic->brigade_id = $brigadeID;
        return $statistic;
    }

    /**
     * @param $client \SoapClient
     * @return bool
     */
    private function saveApplications($client)
    {
        try {
            $applications = json_decode($client->GetRequests()->return);
            $this->info('Applications successfully received via SOAP');
        } catch (\Exception $exception) {
            $this->error($exception->getMessage());
            return false;
        }
        foreach ($applications as $application) {
            $statistic = self::getStatisticModel($application->DivisionID);
            $statistic->applications_total = isset($application->CountAll) ? $application->CountAll : 0;
            $statistic->applications_executed = isset($application->CountPlan) ? $application->CountPlan : 0;
            $statistic->applications_canceled = isset($application->CountCancel) ? $application->CountCancel : 0;
            $statistic->applications_sub = isset($application->CountSub) ? $application->CountSub : 0;
            $statistic->applications_ac = isset($application->CountAC) ? $application->CountAC : 0;
            $statistic->applications_mp = isset($application->CountMP) ? $application->CountMP : 0;
            $statistic->save();
            $this->info('Statistic with id='.$statistic->id.' successfully saved');
        }
        return true;
    }

    /**
     * @param $client \SoapClient
     * @return bool
     */
    public function saveWayBills($client)
    {
        try {
            $waybills = json_decode($client->GetWayBillProcessing()->return);
            $this->info('Waybills successfully received via SOAP');
        } catch (\Exception $exception) {
            $this->error($exception->getMessage());
            return false;
        }
        foreach ($waybills as $waybill) {
            $statistic = self::getStatisticModel($waybill->DivisionID);
            $statistic->waybills_total = isset($waybill->CountAll) ? $waybill->CountAll : 0;
            $statistic->waybills_processed = isset($waybill->CountProcessed) ? $waybill->CountProcessed : 0;
            $statistic->save();
            $this->info('Statistic with id='.$statistic->id.' successfully saved');
        }
        return true;
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $client = new \SoapClient('http://d.rg24.ru:5601/PUP_WS/ws/PUP.1cws?wsdl');
        if ($this->option('applications') || $this->option('full')) {
            $this->saveApplications($client);
        }
        if ($this->option('waybills') || $this->option('full')) {
            $this->saveWayBills($client);
        }
    }
}
