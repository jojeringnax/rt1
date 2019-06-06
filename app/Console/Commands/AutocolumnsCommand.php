<?php

namespace App\Console\Commands;

use App\Autocolumn;
use App\Company;
use App\Soap;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\App;

class AutocolumnsCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'autocolumns:fill';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

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
                if ($division->Priznak === 'K') {
                    $autocolumns[] = $division;
                }
            }
            if (!isset($autocolumns)) {
                $this->error('Autocolumns not found in SOAP-response');
                return false;
            }
            $this->info('Autocolumns successfully received via SOAP');
        } catch (\Exception $exception) {
            $this->error($exception->getMessage());
            return false;
        }
        foreach ($autocolumns as $autocolumn) {
            $haveName = isset($names['autocolumns'][$autocolumn->ID]);
            /**
             * @var $autocolumnModel Autocolumn
             */
            $autocolumnModel = Autocolumn::firstOrNew(['id' => $autocolumn->ID]);
            $this->info('Autocolumn with ID='.$autocolumn->ID.' in work...');
            $autocolumnModel->id = $autocolumn->ID;
            $autocolumnModel->company_id = '113';
            $autocolumnModel->organization_id = $autocolumn->FirmsID;
            $autocolumnModel->name = $haveName ? $names['autocolumns'][$autocolumn->ID][0] : null;
            $autocolumnModel->town = $haveName ? $names['autocolumns'][$autocolumn->ID][1] : null;
            $autocolumnModel->description = $autocolumn->Description;
            $autocolumnModel->address = $autocolumn->Address;
            $autocolumnModel->work = $autocolumn->Work ? (boolean) $autocolumn->Work : false;
            $autocolumnModel->x_pos = $autocolumn->XPos ? $autocolumn->XPos : null;
            $autocolumnModel->y_pos = $autocolumn->YPos ? $autocolumn->YPos : null;
            $autocolumnModel->save();
        }
        $this->info('Thank you for using our airlines');
        return true;
    }
}
