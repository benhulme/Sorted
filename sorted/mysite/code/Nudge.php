<?php

/**
 */
class Nudge extends DataObject {
	/**
	 * @var array
	 */
	private static $db = array(
		'Title' => 'Varchar(255)',
		'Description' => 'HTMLText',
		'Tag' => 'Varchar(255)',		
	);

	/**
	 * @var array
	 */
	private static $has_one = array(
		'ToolPageHolder' => 'ToolPageHolder',	
		'ToolPage' => 'ToolPage',	
		'PlaceHolder' => 'Image',
	);


	/**
	 * @var array
	 */
	private static $belongs_many_many = array(		
	);

	
	/**
	 * {@inheritdoc}
	 */
	public function getCMSFields() {
		$uploadField = UploadField::create('PlaceHolder',  'PlaceHolder Image');
		$uploadField->getValidator()->setAllowedExtensions(array('jpg', 'jpeg', 'png', 'gif'));

		$fields = new FieldList(
			TextField::create('Title', 'Title'),
			TextareaField::create('Description', 'Description'),
			TextareaField::create('Tag', 'Tag'),
			$uploadField
		);

		$this->extend('updateCMSFields', $fields);
		

		return $fields;
	}

	function canDelete($member = null) { 
      return false;
	}

	function canAdd($member = null) { 
      return false;
	}

	
}
