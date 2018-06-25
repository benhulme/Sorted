<?php
class Booklet extends DataObject {

    /**
     * @var array
     */
    private static $db = array(
        'Name' => 'Varchar(200)',
        'Ref' => 'Varchar(200)',
        'Qty' => 'Varchar(200)',
    );


    private static $has_one = array(
      'Orders' => 'Orders'
    );

    /**
     *
     * @var string
     */
    private static $default_sort = '"ID" ASC';

    public function getCMSfields() {
        $fields = FieldList::create(TabSet::create('Root'));
        $fields->addFieldsToTab('Root.Main', array(
            TextField::create('Name'),
        ));

        return $fields;
    }
  


}