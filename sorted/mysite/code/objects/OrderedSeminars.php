<?php
class OrderedSeminars extends DataObject {

    /**
     * @var array
     */
    private static $db = array(
        'Associate' => 'Varchar(200)',
        'SeminarID' => 'Varchar(200)',
        'AudienceSize' => 'Varchar(200)',
        'Package' => 'Varchar(200)',
        'FirstName' => 'Varchar(200)',
        'LastName' => 'Varchar(200)',
        'Email' => 'Varchar(200)',
        'OrganisationName' => 'Varchar(200)',
        'OrganisationRole' => 'Varchar(200)',
        'OrganisationType' => 'Varchar(200)',
        'OrganisationSize' => 'Varchar(200)',
        'Address' => 'Text',
    );

    /**
     *
     * @var string
     */
    private static $default_sort = '"ID" ASC';

    private static $summary_fields = array (
        'FirstName' => 'First Name',
        'LastName' => 'Last Name',
        'Email' => 'Email',
        'AudienceSize' => 'AudienceSize',
        'Associate' => 'Associate',
        'SeminarID' => 'SeminarID',
        'Package' => 'Package',
        'OrganisationName' => 'OrganisationName',
        'OrganisationRole' => 'OrganisationRole',
        'OrganisationType' => 'OrganisationType',
        'OrganisationSize' => 'OrganisationSize',
        'Address' => 'Address',
        'Created' => 'Created',
    );

    public function getCMSfields() {
        $fields = FieldList::create(TabSet::create('Root'));
        $fields->addFieldsToTab('Root.Main', array(
            TextField::create('FirstName'),
            TextField::create('LastName'),
            TextField::create('Email'),
            TextField::create('AudienceSize'),
            TextField::create('Associate'),
            TextField::create('SeminarID'),
            TextField::create('OrganisationName'),
            TextField::create('OrganisationRole'),
            TextField::create('OrganisationType'),
            TextField::create('OrganisationSize'),
            TextareaField::create('Address'),
            ReadonlyField::create('Created', 'Created')
        ));

        return $fields;
    }



}
