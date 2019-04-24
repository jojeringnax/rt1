<?php

namespace App\Console\Commands;

use App\BadSpot;
use App\Brigade;
use App\Company;
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
        $client = new \SoapClient('http://d.rg24.ru:5601/PUP_WS/ws/PUP.1cws?wsdl');
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
            /**
             * @var $brigadeModel Brigade
             */
            $this->info('Brigade with ID='.$brigade->ID.' in work...');
            $haveName = isset($names['spots'][$brigade->ID]);
            $brigadeModel = Brigade::firstOrNew(['id' => $brigade->ID]);
            $brigadeModel->id = $brigade->ID;
            $brigadeModel->company_id = '113';
            $brigadeModel->organization_id = $brigade->FirmsID;
            $brigadeModel->autocolumn_id = $brigade->ParentID;
            $brigadeModel->name = $haveName ? $names['spots'][$brigade->ID][0] : null;
            $brigadeModel->town = $haveName ? $names['spots'][$brigade->ID][1] : null;
            $brigadeModel->description = $brigade->Description;
            $brigadeModel->address = $brigade->Address;
            $brigadeModel->x_pos = $brigade->XPos ? $brigade->XPos : null;
            $brigadeModel->y_pos = $brigade->YPos ? $brigade->YPos : null;
            $brigadeModel->save();
        }
        $spotIDs = Spot::all()->pluck('id');
        /**
         * @var Spot[] $brigades
         */
        $brigades = BadSpot::whereIn('autocolumn_id', $spotIDs)->all();
        foreach ($brigades as $brigade) {
            $brigadeModel = Brigade::firstOrNew(['id' => $brigade->id]);
            $brigadeModel->id = $brigade->id;
            $brigadeModel->company_id = '113';
            $brigadeModel->organization_id = $brigade->FirmsID;
            $brigadeModel->name = $haveName ? $names['spots'][$brigade->ID][0] : null;
            $brigadeModel->town = $haveName ? $names['spots'][$brigade->ID][1] : null;
            $brigadeModel->description = $brigade->description;
            $brigadeModel->address = $brigade->address;
            $brigadeModel->x_pos = $brigade->x_pos;
            $brigadeModel->y_pos = $brigade->y_pos;
        }
        $this->info('Thank you for using our airlines');
        return true;
    }
}
