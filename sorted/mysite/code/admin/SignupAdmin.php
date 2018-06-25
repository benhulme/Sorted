<?php
class SignupAdmin extends ModelAdmin {
    private static $managed_models = [
        'CollectedData'
    ];

    private static $url_segment = 'signup';

    private static $menu_title = 'Data incomplete. Do not use.';


    public function getExportFields() {
        return array(
            'Type' => 'Type',
            'DataField' => 'Email Address',
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
