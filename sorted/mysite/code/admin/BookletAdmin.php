<?php
class BookletAdmin extends ModelAdmin {
    private static $managed_models = [
        'Orders'
    ];

    private static $url_segment = 'booklets';

    private static $menu_title = 'Booklet Orders';


    public function getExportFields() {
        return array(
            'FirstName' => 'First Name',
            'LastName' => 'Last Name',
            'Email' => 'Email',
            'AudienceSize' => 'AudienceSize',
            'OrganisationName' => 'OrganisationName',
            'OrganisationRole' => 'OrganisationRole',
            'OrganisationType' => 'OrganisationType',
            'OrganisationSize' => 'OrganisationSize',
            'Address' => 'Address',
            'Created' => 'Created',
            'BookletNames' => 'Booklets'
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