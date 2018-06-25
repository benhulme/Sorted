<?php

class HomePage extends SortedPage{
    private static $db = array(		
	);

	private static $has_one = array(
		'RightImage' => 'Image',
	);

	private static $has_many = array(
        'Links' => 'Link',
		'Questions' => 'HomepageQuestion'
    );

    public function getCMSFields(){
        $fields = parent::getCMSFields();

		$uploadField = UploadField::create('RightImage',  'Right Image');
		$uploadField->getValidator()->setAllowedExtensions(array('jpg', 'jpeg', 'png', 'gif'));

		$fields->addFieldToTab('Root.Header', $uploadField);

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

		// Questions tab ---------

		$fields->addFieldToTab('Root.Questions',
				GridField::create('Questions', 'Questions',
						$this->Questions(),
						GridFieldConfig_RecordEditor::create()
								->addComponent(new GridFieldSortableRows('Number')) //use addComponent() function to add SortableGridFieldRows
				)
		);

		// -----------------------

        return $fields;
    }
}

class HomePage_Controller extends Page_Controller {

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