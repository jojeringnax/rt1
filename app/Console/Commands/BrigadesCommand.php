<?php

namespace App\Console\Commands;

use App\BadSpot;
use App\Brigade;
use App\Company;
use App\Soap;
use App\Spot;
use Illuminate\Console\Command;

class BrigadesCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'brigades:fill';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fill brigades from SOAP.';

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
        $names = require_once (storage_path('names.php'));
        if (Company::find('113') === null) $this->call('organizations:fill');
        $client = app(Soap::class);
        try {
            $divisions = json_decode($client->getDivision()->return);
            foreach ($divisions as $division) {
                if ($division->Priznak === 'B') {
                    $brigades[] = $division;
                }
            }
            if (!isset($brigades)) {
                $this->error('Brigades not found in SOAP-response');
                return false;
            }
            $this->info('Brigades successfully received via SOAP');
        } catch (\Exception $exception) {
            $this->error($exception->getMessage());
            return false;
        }
        foreach ($brigades as $brigade) {
            if (isset($brigade->ParentID)) {
                $badSpot = BadSpot::find($brigade->ParentID);
                $spot = Spot::find($brigade->ParentID);
            }
            $isForBadSpot = $badSpot !== null;
            if ($badSpot === null && $spot === null) {
                $spotID = null;
                $organizationID = null;
                $autocolumnID = null;
                $badSpotID = null;
            } else {
                $spotID = $isForBadSpot ? null : $brigade->ParentID;
                $organizationID = $isForBadSpot ? $badSpot->organization_id : $spot->organization_id;;
                $autocolumnID = $isForBadSpot ? null : $spot->autocolumn_id;
                $badSpotID = $isForBadSpot ? $brigade->ParentID : null;
            }
            /**
             * @var $brigadeModel Brigade
             */
            $this->info('Brigade with ID='.$brigade->ID.' in work...');
            $haveName = isset($names['spots'][$brigade->ID]);
            $brigadeModel = Brigade::firstOrNew(['id' => $brigade->ID]);
            $brigadeModel->id = $brigade->ID;
            $brigadeModel->company_id = '113';
            $brigadeModel->organization_id = $organizationID;
            $brigadeModel->autocolumn_id = $autocolumnID;
            $brigadeModel->bad_spot_id = $badSpotID;
            $brigadeModel->spot_id = $spotID;
            $brigadeModel->name = $haveName ? $names['spots'][$brigade->ID][0] : null;
            $brigadeModel->town = $haveName ? $names['spots'][$brigade->ID][1] : null;
            $brigadeModel->description = $brigade->Description;
            $brigadeModel->address = $brigade->Address;
            $brigadeModel->work = $brigade->Work ? (boolean) $brigade->Work : false;
            $brigadeModel->x_pos = $brigade->XPos ? $brigade->XPos : null;
            $brigadeModel->y_pos = $brigade->YPos ? $brigade->YPos : null;
            $brigadeModel->save();
        }
        $this->info('Thank you for using our airlines');
        return true;
    }
}
