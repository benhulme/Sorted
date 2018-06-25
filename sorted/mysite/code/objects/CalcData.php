<?php
class CalcData extends DataObject {

    /**
     * @var array
     */
    private static $db = array(
        'Data' => 'Text',
        'Title' => 'Varchar(400)',
        'CalcID' => 'Int',
        'Summary1' => 'Varchar(600)',
        'Summary2' => 'Varchar(400)',
        'Summary3' => 'Varchar(400)',
        'Imported' => 'Boolean',
        'Translated' => 'Boolean'

    );

    /**
     * @var array
     */
    private static $has_one = array(
        'Member' => 'Member',
    );

    /**
     *
     * @var string
     */
    private static $default_sort = '"ID" ASC';



}