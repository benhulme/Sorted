<?php

/**
 *  *
 * @package silverstripe
 */

class HomepageQuestion extends DataObject {
    /**
     * @var array
     */
    private static $db = array(
        'Title' => 'Varchar(255)',
        'Url'   => 'Varchar(255)',
        'Number'=>'Int',

    );

    /**
     * @var array
     */
    private static $has_one = array(
        'HomePage'  => 'HomePage',
        'Icon'      => 'Image',
    );

    /**
     * The default sorting lists Questions by Number.
     *
     * @var string
     */
    private static $default_sort = '"Number" ASC';


    /**
     * {@inheritdoc}
     */
    public function getCMSFields() {

        $title = TextField::create('Title', 'Title');
        $title->Required();
        $title->setCustomValidationMessage('A title is required.');

        $url = TextField::create('Url', 'Url');
        $url->Required();
        $url->setCustomValidationMessage('A url is required.');


        $fields = new FieldList(
            $title,
            $url
        );

        $this->extend('updateCMSFields', $fields);

        return $fields;
    }

    function canDelete($member = null) {
        return true;
    }

    function canAdd($member = null) {
        return true;
    }

}
