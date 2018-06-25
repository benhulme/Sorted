<?php
class SeminarsAdmin extends ModelAdmin {
    private static $managed_models = [
        'OrderedSeminars'
    ];

    private static $url_segment = 'seminars';

    private static $menu_title = 'Seminar Orders';


    public function getExportFields() {
        return array(
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
            'Created' => 'Created'
        );
    }

    public function getEditForm($id = null, $fields = null)
    {
        $form = parent::getEditForm($id, $fields);
        $gridField = $form->Fields()->fieldByName($this->sanitiseClassName($this->owner->modelClass));
        $config = $gridField->getConfig();
        $config->removeComponentsByType($config->getComponentByType('GridFieldAddNewButton'));   
        $config->removeComponentsByType($config->getComponentByType('GridFieldEditButton')); 
        $config->removeComponentsByType('GridFieldDeleteAction'); 
        
        return $form; 
    }

}