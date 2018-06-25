<?php

/**
 *  *
 * @package silverstripe
 */

class Who extends DataObject {
	/**
	 * @var array
	 */
	private static $db = array(
		'Url' => 'Varchar(255)',

	);

	/**
	 * @var array
	 */
	private static $has_one = array(
		'Logo' => 'Image',
		'MoneyWeek' => 'MoneyWeek',
	);


	/**
	 * {@inheritdoc}
	 */
	public function getCMSFields() {

    $uploadField = UploadField::create('Logo', 'Logo Image');
    $uploadField->getValidator()->setAllowedExtensions(array('jpg', 'jpeg', 'png', 'gif'));
		$uploadField->setFolderName('moneyweek/logo');

		$fields = new FieldList(
			$uploadField,
			TextField::create('Url', 'Url')
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
