<?php

class GuidePage extends SortedPage{



    /**
	 * @var array
	 */

	private static $db = array(
		'Sticky' => 'BOOLEAN',
		'Index' => 'BOOLEAN',
	);

    /**
	 * @var array
	 */
	private static $has_one = array(
	);

	/**
	 * @var array
	 */
	private static $has_many = array(
		'GuideSections' => 'GuideSection'
	);

	/**
	 * @var array
	 */
	private static $many_many = array(
		'Categories' => 'GuideCategory',
	);

	/**
	 * The default sorting lists guide pages by date.
	 *
	 * @var string
	 */
	private static $default_sort = '"Created" DESC';

	/**
	 * @var bool
	 */
	private static $can_be_root = false;


    public function getCMSFields(){
        $fields = parent::getCMSFields();

        $fields->addFieldToTab('Root.Main', CheckBoxField::create('Sticky', 'Editors Pick'), 'Content');
        $fields->addFieldToTab('Root.Main', CheckBoxField::create('Index', 'Build Section Index'), 'Content');

        $tagField = TagField::create(
			'Categories',
			'Categories',
			GuideCategory::get(),
			$this->Categories()
		)
		->setShouldLazyLoad(true) // tags should be lazy loaded
		->setCanCreate(false);     // new tag DataObjects can be created

        $fields->insertBefore($tagField, 'Content');


        $fields->addFieldToTab('Root.Sections',
                GridField::create('GuideSections', 'Guide Sections',
                        $this->GuideSections(),
                        GridFieldConfig_RecordEditor::create()
                        ->addComponent(new GridFieldSortableRows('SortID')) //use addComponent() function to add SortableGridFieldRows
                    )
                );



        return $fields;
    }
}


class GuidePage_Controller extends Page_Controller {

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

