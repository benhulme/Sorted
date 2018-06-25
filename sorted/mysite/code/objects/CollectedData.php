<?php

class CollectedData extends DataObject
{

    /**
     * @var array
     */
    private static $db = array(
        'DataField' => 'Text',
        'Data' => 'Text',
        'Type' => 'Varchar(10)'
    );

    private static $summary_fields = array (
        'Type' => 'Type',
        'DataField' => 'Email Address',
        'Created' => 'Created'
    );

    public function getCMSfields() {
        $fields = FieldList::create(TabSet::create('Root'));
        $fields->addFieldsToTab('Root.Main', array(
            TextField::create('Data'),
            TextField::create('Type')
        ));

        return $fields;
    }

    public function validate()
    {
        $result = parent::validate();

        if ('email' === $this->Type) {
            if (!filter_var($this->DataField, FILTER_VALIDATE_EMAIL)) {
                $result->error('Value must be a valid email address');
            }
        }

        return $result;
    }

}