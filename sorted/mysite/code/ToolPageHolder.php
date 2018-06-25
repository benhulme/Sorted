<?php

class ToolPageHolder extends SortedPage{
    /**
	 * @var array
	 */
	private static $db = array(
	);

    /**
	 * @var array
	 */
	private static $has_one = array(
	);

	private static $allowed_children = array(
		'ToolPage',
	);

	/**
	 * @var array
	 */
	private static $has_many = array(
		'Categories' => 'ToolCategory',
		'Nudges' => 'Nudge',
	);

	/**
	 * @var array
	 */
	private static $many_many = array(
	);

	private static $hide_preview_panel = true;

    public function getCMSFields(){

    	$fields = parent::getCMSFields();


    	$gridFieldConfig = GridFieldConfig::create()->addComponents(
	      new GridFieldToolbarHeader(),
	     // new GridFieldAddNewButton('toolbar-header-right'),
	     // new GridFieldSortableHeader(),
	      new GridFieldDataColumns(),
	      new GridFieldPaginator(10),
	      new GridFieldEditButton(),
	      //new GridFieldDeleteAction(),
	      new GridFieldDetailForm()
	    );

        $fields->addFieldToTab('Root.Categories',
            $categories = GridField::create(
				'Categories',
				'Categories',
				$this->Categories(),
				$gridFieldConfig
			)
        );

        $gridFieldConfig2 = GridFieldConfig::create()->addComponents(
	      new GridFieldToolbarHeader(),
	      new GridFieldAddNewButton('toolbar-header-right'),
	     // new GridFieldSortableHeader(),
	      new GridFieldDataColumns(),
	      new GridFieldPaginator(10),
	      new GridFieldEditButton(),
	      //new GridFieldDeleteAction(),
	      new GridFieldDetailForm()
	    );

        $fields->addFieldToTab('Root.Nudges',
            $nudges = GridField::create(
				'Nudges',
				'Nudges',
				$this->Nudges(),
				$gridFieldConfig2
			)
        );

        return $fields;
    }


}


class ToolPageHolder_Controller extends Page_Controller {

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
