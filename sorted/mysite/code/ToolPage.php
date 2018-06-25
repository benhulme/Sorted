<?php

class ToolPage extends SortedPage{
    /**
	 * @var array
	 */
	private static $db = array(
		'ShowNudge' => 'BOOLEAN',
		'CalcID' => 'Int',
	);

    /**
	 * @var array
	 */
	private static $has_one = array(
		'Nudge' => 'Nudge',
		'CalcIcon' => 'File'
	);

	/**
	 * @var array
	 */
	private static $has_many = array(
		'Links' => 'Link',
	);

	/**
	 * @var array
	 */
	private static $many_many = array(
		'Categories' => 'ToolCategory',
	);

	private static $allowed_children = array(
		'MoneyPersonality',
	);

	/**
	 * The default sorting
	 *
	 * @var string
	 */
	private static $default_sort = '"Created" DESC';

	private static $hide_preview_panel = true;

	/**
	 * @var bool
	 */
	private static $can_be_root = false;


    public function getCMSFields(){
    	$fields = parent::getCMSFields();

		$nudge_source = DataObject::get('Nudge')->map('ID','Title', 'Choose a nudge');

        $nudge = new DropdownField('NudgeID', 'Nudge', $nudge_source);
        $fields->insertAfter($nudge, 'Content');

        $tagField = TagField::create(
			'Categories',
			'Categories',
			ToolCategory::get(),
			$this->Categories()
		)
		->setShouldLazyLoad(true) // tags should be lazy loaded
		->setCanCreate(false);     // new tag DataObjects can be created

        $fields->insertBefore($tagField, 'Content');



        $uploadField = UploadField::create('CalcIcon',  'Tool Icon');
		$uploadField->getValidator()->setAllowedExtensions(array('svg'));

		$fields->insertAfter($uploadField, 'RelationTags');

        $gridFieldConfig = GridFieldConfig::create()->addComponents(
	      new GridFieldToolbarHeader(),
	      new GridFieldAddNewButton('toolbar-header-right'),
	     // new GridFieldSortableHeader(),
	      new GridFieldDataColumns(),
	      new GridFieldEditButton(),
	      //new GridFieldDeleteAction(),
	      new GridFieldDetailForm()
	    );

        $fields->addFieldToTab('Root.Header',
            $categories = GridField::create(
				'Links',
				'Links',
				$this->Links(),
				$gridFieldConfig
			)
        );

        $config = $categories->getConfig();

        $dataColumns = $config->getComponentByType('GridFieldDataColumns');

        $dataColumns->setDisplayFields(array(
            'Text' => 'Text',
            'Url' => 'Url'
        ));

        $fields->insertAfter(CheckBoxField::create('ShowNudge', 'Show Nudge on Parent'), 'CalcIcon');

        $fields->insertAfter(TextField::create('CalcID', 'CalcID'), 'ShowNudge');

        return $fields;
    }
}


class ToolPage_Controller extends Page_Controller {

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
	);

	public function init() {
		parent::init();
	}

}
