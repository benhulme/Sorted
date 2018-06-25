<?php
class MoneyPersonality extends SortedPage {

	private static $db = array(
		'Heading1' => 'Varchar(255)',
		'Copy1' => 'HTMLText',
		'Heading2' => 'Varchar(255)',
		'Copy2' => 'HTMLText',
		'Heading3' => 'Varchar(255)',
		'Copy3' => 'HTMLText',
	);

	private static $can_be_root = false;
	

  public function getCMSFields(){
			$fields = parent::getCMSFields();			


      $fields->addFieldToTab('Root.Results', TextField::create('Heading1', 'Heading One'));
      $fields->addFieldToTab('Root.Results', HtmlEditorField::create('Copy1', 'Copy Block One'));

      $fields->addFieldToTab('Root.Results', TextField::create('Heading2', 'Heading Two'));
      $fields->addFieldToTab('Root.Results', HtmlEditorField::create('Copy2', 'Copy Block Two'));

      $fields->addFieldToTab('Root.Results', TextField::create('Heading3', 'Heading Three'));
      $fields->addFieldToTab('Root.Results', HtmlEditorField::create('Copy3', 'Copy Block Three'));



      return $fields;
    }

    

}
class MoneyPersonality_Controller extends ContentController {

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
	}

}
