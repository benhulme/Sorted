<?php

class GlossaryPage extends Page{

	private static $db = array(
		'HeaderCopy' => 'Varchar(1024)',
	);

	private static $has_one = array(
		'BackgroundImage' => 'Image',
	);

	private static $has_many = array(
		'Terms' => 'GlossaryTerm'
	);

	/**
	 * @var array
	 */
	private static $many_many = array(
	);

	/**
	 * The default sorting lists guide pages by date.
	 *
	 * @var string
	 */
	private static $default_sort = '"Created" DESC';

	private static $hide_preview_panel = true;

	/**
	 * @var bool
	 */
	private static $can_be_root = true;


    public function getCMSFields(){
        $fields = parent::getCMSFields();

        $fields->addFieldToTab('Root.Terms',
                GridField::create('Terms', 'Glossary Terms',
                        $this->Terms()->sort('Title'),
                        GridFieldConfig_RecordEditor::create()
                    )
                );

      $fields->addFieldToTab('Root.Header', TextField::create('HeaderCopy', 'Header Copy'));

			$uploadField2 = UploadField::create('BackgroundImage',  'Background Image');
			$uploadField2->getValidator()->setAllowedExtensions(array('jpg', 'jpeg', 'png', 'gif'));
			$fields->addFieldToTab('Root.Header', $uploadField2);



        return $fields;
    }

    public function smartLink(){
    	return "/#glossary";
    }


}


class GlossaryPage_Controller extends Page_Controller {

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
