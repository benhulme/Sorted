<?php

/**
 *  *
 * @package silverstripe
 */

class GlossaryTerm extends DataObject {
	/**
	 * @var array
	 */
	private static $db = array(
		'Title' => 'Varchar(255)',
		'Content' => 'Varchar(4000)',
		'SearchWords' => 'Varchar(1000)'
	);

	/**
	 * @var array
	 */
	private static $has_one = array(
		'GlossaryPage' => 'GlossaryPage',
	);

	/**
	 * @var array
	 */
	private static $belongs_many_many = array(
		'GoesIn' => 'SortedPage',
		'AppearsIn' => 'SortedBlogPost',
	);

	/**
	 * The default sorting lists GlossaryTerms by title alpha.
	 *
	 * @var string
	 */
	private static $default_sort = 'Title ASC';

	private static $hide_preview_panel = true;


	/**
	 * {@inheritdoc}
	 */
	public function getCMSFields() {

		$title = TextField::create('Title', 'Title');
		$title->Required();
		$title->setCustomValidationMessage('A title is required.');

		$content = TextareaField::create('Content', 'Content');
		$content->Required();
		$content->setCustomValidationMessage('Content is required.');

		$searchWords = TextField::create('SearchWords', 'Search Words');
		$searchWords->Required();
		$searchWords->setCustomValidationMessage('Search words are required');

		$fields = new FieldList(
			$title,
			$searchWords,
			$content
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
