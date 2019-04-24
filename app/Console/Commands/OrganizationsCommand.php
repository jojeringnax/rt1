<?php

namespace App\Console\Commands;

use App\Company;
use App\Organization;
use Illuminate\Console\Command;

class OrganizationsCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'organizations:fill';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fill organizations from SOAP.';

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
     * @return boolean
     */
    public function handle()
    {
        $company = Company::firstOrNew(['id' => '113']);
        if ($company->name === null) {
            $company->id = '113';
            $company->name = 'ООО Ресурс Транс';
            $company->save();
            $this->info('Company has been created');
        } else {
            $this->info('Company already exist');
        }
        $client = new \SoapClient('http://d.rg24.ru:5601/PUP_WS/ws/PUP.1cws?wsdl');
        try {
            $organizations = json_decode($client->getOrganization()->return);
            $this->info('Organizations successfully received via SOAP');
        } catch (\Exception $exception) {
            $this->error($exception->getMessage());
            return false;
        }
        foreach ($organizations as $organization) {
            /**
             * @var $organizationModel Organization
             */
            $organizationModel = Organization::firstOrNew(['id' => $organization->ID]);
            $this->info('Organization with ID='.$organization->ID.' in work...');
            $organizationModel->id = $organization->ID;
            $organizationModel->company_id = '113';
            $organizationModel->description = $organization->Description;
            $organizationModel->address = $organization->Address;
            $organizationModel->x_pos = $organization->XPos;
            $organizationModel->y_pos = $organization->YPos;
            $organizationModel->save();
        }
        $this->info('Thank you for using our airlines');
        return true;
    }
}
