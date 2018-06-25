<?php

class CampaignPage extends SortedPage{
    /**
	 * @var array
	 */
	private static $db = array(
		'ShortCopy' => 'Varchar(1024)',
    'ButtonCopy' => 'Varchar(40)',
	);

    /**
	 * @var array
	 */
	private static $has_one = array(
        'Thumbnail' => 'Image',
				'BladeImage' => 'Image',
	);

	/**
	 * @var array
	 */
	private static $has_many = array(
	);

	/**
	 * @var array
	 */
	private static $many_many = array(
	);

    public function getCMSFields(){
        $fields = parent::getCMSFields();

        $fields->addFieldToTab('Root.Main', TextareaField::create('ShortCopy', 'Short Copy'), 'Content');
        $fields->addFieldToTab('Root.Main', TextField::create('ButtonCopy' ,'Button Copy'), 'Content');

        $uploadField = UploadField::create('BladeImage',  'Blade Image');
		$uploadField->getValidator()->setAllowedExtensions(array('jpg', 'jpeg', 'png', 'gif'));

		$fields->insertAfter($uploadField, 'Content');

		$thumbnail = UploadField::create('Thumbnail',  'Thumbnail');
		$thumbnail->getValidator()->setAllowedExtensions(array('jpg', 'jpeg', 'png', 'gif'));

		$fields->insertAfter($thumbnail, 'BladeImage');

        return $fields;
    }
}

class CampaignPageEntry extends DataObject {
	/**
	 * @var array
	 */
	private static $db = array(
			'Type' => 'Enum(array("Person", "Organisation"))',
			'Name' => 'Varchar(64)',
			'Company' => 'Varchar(128)',
			'Email' => 'Varchar(64)'

	);

	private static $has_one = [
		'CampaignPage' => 'CampaignPage'
	];

	private static $defaults = [
		'Company' => null
	];

	/**
	 *
	 * @var string
	 */
	private static $default_sort = '"ID" ASC';
}

class CampaignPage_Controller extends Page_Controller {

	/**
	 * An array of actions that can be accessed via a request. Each array element should be an action name, and the
	 * permissions or conditions required to allow the user to access it.
	 *
	 * <code>
	 * array (
	 *     'action', // anyone can access this action
	 *     'action' => true, // same as above
	 *     'action' => 'ADMIN', // you must have ADMIN permissions to access this action
	 *     'action' => '->checkAction' // you can only access this action if $this->checkAction() returns true
	 * );
	 * </code>
	 *
	 * @var array
	 */
	private static $allowed_actions = array (
		'InterestForm'
	);

	public function init() {
		parent::init();
    Config::inst()->update('SSViewer', 'rewrite_hash_links', false);
	}

	public function InterestForm() {
		$fields = new FieldList([
			SelectionGroup::create('Type', [
				SelectionGroup_Item::create('Person', new LiteralField('Person', 'person view'), 'Person'),
				SelectionGroup_Item::create('Organisation', new LiteralField('Organisation', 'Organisation view'), 'Organisation')
			]),
			TextField::create('Name', 'Name'),
			TextField::create('Company', 'Company'),
			EmailField::create('Email', 'Email address')

		]);
		$actions = new FieldList(
				FormAction::create("submitInterestForm")->setTitle("Submit")
		);

		$required = new RequiredFields([
			'Type',
			'Name',
			'Company',
			'Email'
		]);

		$form = new Form($this, 'InterestForm', $fields, $actions, $required);

		return $form;
	}

	public function submitInterestForm($data, Form $form) {
		$entry = CampaignPageEntry::create($data);
		$entry->CampaignPageID = $this->ID;
		if ($entry->Type === 'Organisation' && $entry->Company === '')
		{
			$form->addErrorMessage('Company', 'Company name is required.', 'bad');
			return $this->redirectBack();
		}
		$entry->write();
		$form->sessionMessage("Successful!", 'good');
		return $this->redirectBack();
	}
}

