<?php
class Orders extends DataObject {

    /**
     * @var array
     */
    private static $db = array(
        'Data' => 'Text',
        'Sent' => 'Boolean',
        'FirstName' => 'Varchar(200)',
        'LastName' => 'Varchar(200)',
        'Email' => 'Varchar(200)',
        'AudienceSize' => 'Varchar(200)',
        'Booklet' => 'Varchar(200)',
        'OrganisationName' => 'Varchar(200)',
        'OrganisationRole' => 'Varchar(200)',
        'OrganisationType' => 'Varchar(200)',
        'OrganisationSize' => 'Varchar(200)',
        'Address' => 'Text',

    );

    private static $has_many = array(
        'Booklets' => 'Booklet'
      );

    private static $summary_fields = array (
        'FirstName' => 'First Name',
        'LastName' => 'Last Name',
        'Email' => 'Email',
        'AudienceSize' => 'AudienceSize',
        'BookletNames' => 'Booklets',
        'OrganisationName' => 'OrganisationName',
        'OrganisationRole' => 'OrganisationRole',
        'OrganisationType' => 'OrganisationType',
        'OrganisationSize' => 'OrganisationSize',
        'Address' => 'Address',
        'Created' => 'Created',
    );
    


    /**
     *
     * @var string
     */
    private static $default_sort = '"ID" ASC';



    public function BookletNames(){
        
        $names = array();
        foreach($this->Booklets() as $book){
            $names[] = $book->getField('Name') . " qty: " . $book->getField('Qty');
        }
    
        //use a separator that won't break the CSV file
        return join("; ", $names);
    
    }


    public function getCMSfields() {
        $fields = FieldList::create(TabSet::create('Root'));
        $fields->addFieldsToTab('Root.Main', array(
            TextField::create('FirstName'),
            TextField::create('LastName'),
            TextField::create('Email'),
            TextField::create('AudienceSize'),
            TextField::create('OrganisationName'),
            TextField::create('OrganisationRole'),
            TextField::create('OrganisationType'),
            TextField::create('OrganisationSize'),
            TextareaField::create('Address'),
            //TextareaField::create('Data'),
            CheckboxField::create('Sent','Sent'),
            ReadonlyField::create('Created', 'Created')
        ));

        return $fields;
    }
  


}