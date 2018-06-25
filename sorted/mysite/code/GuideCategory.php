<?php

/**
 * A guide category for generalising guide pages.
 */
class GuideCategory extends DataObject implements CategorisationObject {
	/**
	 * @var array
	 */
	private static $db = array(
		'Title' => 'Varchar(255)',
		'Description' => 'HTMLText',
	);

	/**
	 * @var array
	 */
	private static $has_one = array(
		'GuidePageHolder' => 'GuidePageHolder',
	);


	/**
	 * @var array
	 */
	private static $belongs_many_many = array(
		'GuidePages' => 'GuidePage',
	);

	/**
	 * @return DataList
	 */
	public function GuidePages() {
		$guidePages = parent::GuidePages();	
		return $guidePages;
	}
	
	/**
	 * {@inheritdoc}
	 */
	public function getCMSFields() {
		$fields = new FieldList(
			TextField::create('Title', 'Title'),
			TextareaField::create('Description', 'Description')
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
