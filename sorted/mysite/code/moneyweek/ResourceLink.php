<?php

/**
 *  *
 * @package silverstripe
 */

class ResourceLink extends DataObject {
	/**
	 * @var array
	 */
	private static $db = array(
    'Title' => 'Varchar(255)',
    'CTA' => 'Varchar(255)',
		'Url' => 'Varchar(255)',
	);

	/**
	 * @var array
	 */
	private static $has_one = array(
		'Thumb' => 'Image',
		'MoneyWeek' => 'MoneyWeek',
	);


	/**
	 * {@inheritdoc}
	 */
	public function getCMSFields() {

    $uploadField = UploadField::create('Thumb', 'Thumb Image');
    $uploadField->getValidator()->setAllowedExtensions(array('jpg', 'jpeg', 'png', 'gif'));
		$uploadField->setFolderName('moneyweek/thumb');

		$fields = new FieldList(
      TextField::create('Title', 'Title'),
      TextField::create('CTA', 'CTA'),
      TextField::create('Url', 'Url'),
			$uploadField
		);

		$this->extend('updateCMSFields', $fields);

		return $fields;
	}

	function canDelete($member = null) { 
      return true;
	}

	function canAdd($member = null) { 
      return false;
	}

	
}
