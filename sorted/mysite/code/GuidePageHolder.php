<?php

class GuidePageHolder extends SortedPage{
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
		'GuidePage',
	);

	/**
	 * @var array
	 */
	private static $has_many = array(
		'Categories' => 'GuideCategory',
	);

	/**
	 * @var array
	 */
	private static $many_many = array(	        
	);
    
    public function getCMSFields(){

    	$fields = parent::getCMSFields();

    	$gridFieldConfig = GridFieldConfig::create()->addComponents(
	      new GridFieldToolbarHeader(),
	      //new GridFieldAddNewButton('toolbar-header-right'),
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

        return $fields;        
    }

	
}


class GuidePageHolder_Controller extends Page_Controller {

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

