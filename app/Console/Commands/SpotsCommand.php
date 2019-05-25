<?php

namespace App\Console\Commands;

use App\Autocolumn;
use App\BadSpot;
use App\Brigade;
use App\Company;
use App\Soap;
use App\Spot;
use Illuminate\Console\Command;

class SpotsCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'spots:fill';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fill spots and bad spots from SOAP.';

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
                if ($division->Priznak === 'U') {
                    $spots[] = $division;
                }
            }
            if (!isset($spots)) {
                $this->error('Spots not found in SOAP-response');
                return false;
            }
            $this->info('Spots successfully received via SOAP');
        } catch (\Exception $exception) {
            $this->error($exception->getMessage());
            return false;
        }
        foreach ($spots as $spot) {
            /**
             * @var $spotModel Spot|BadSpot
             */
            $this->info('Spot with ID='.$spot->ID.' in work...');
            $haveName = isset($names['spots'][$spot->ID]);
            $isBad = Autocolumn::find($spot->ParentID) === null;
            $this->info($isBad ? 'Bad Spot' : 'Normal Spot');
            $spotModel = $isBad ? BadSpot::firstOrNew(['id' => $spot->ID]) : Spot::firstOrNew(['id' => $spot->ID]);
            $spotModel->id = $spot->ID;
            $spotModel->company_id = '113';
            $spotModel->organization_id = $spot->FirmsID;
            if (!$isBad) $spotModel->autocolumn_id = $spot->ParentID;
            $spotModel->name = $haveName ? $names['spots'][$spot->ID][0] : null;
            $spotModel->town = $haveName ? $names['spots'][$spot->ID][1] : null;
            $spotModel->description = $spot->Description;
            $spotModel->address = $spot->Address;
            $spotModel->x_pos = $spot->XPos ? $spot->XPos : null;
            $spotModel->y_pos = $spot->YPos ? $spot->YPos : null;
            $spotModel->save();
        }
        $this->info('Thank you for using our airlines');
        return true;
    }
}
