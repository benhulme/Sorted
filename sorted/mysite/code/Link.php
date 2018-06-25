<?php

/**
 *  *
 * @package silverstripe
 */

class Link extends DataObject {
	/**
	 * @var array
	 */
	private static $db = array(
		'Text' => 'Varchar(255)',
		'Url' => 'Varchar(255)',

	);

	/**
	 * @var array
	 */
	private static $has_one = array(
		'HomePage' => 'HomePage',
		'ToolPage' => 'ToolPage',
	);


	/**
	 * {@inheritdoc}
	 */
	public function getCMSFields() {
		$fields = new FieldList(
			TextField::create('Text', 'Text'),
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
