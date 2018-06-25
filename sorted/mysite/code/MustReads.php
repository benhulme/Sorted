<?php

class MustReads extends Blog{
	private static $db = array(
		'HeaderCopy' => 'Varchar(1024)',
	);

	private static $has_one = array(
		'HeaderImage' => 'Image',
		'HeaderBackgroundImage' => 'Image',
	);

	/**
	 * @var array
	 */
	private static $allowed_children = array(
		'SortedBlogPost',		
	);

	/**
	 * @var string
	 */
	private static $description = 'Adds a custom "Sorted" blog to your website.';

	public function getCMSFields(){
        $fields = parent::getCMSFields();

        $fields->addFieldToTab('Root.Main', TextField::create('HeaderCopy', 'Header Copy'), 'Content');
        $uploadField = UploadField::create('HeaderImage',  'Header Image');
		$uploadField->getValidator()->setAllowedExtensions(array('jpg', 'jpeg', 'png', 'gif'));

		$fields->insertAfter($uploadField, 'HeaderCopy');


		$uploadField2 = UploadField::create('HeaderBackgroundImage',  'Header Background Image');
		$uploadField2->getValidator()->setAllowedExtensions(array('jpg', 'jpeg', 'png', 'gif'));

		$fields->insertAfter($uploadField2, 'HeaderImage');

        return $fields;
    }

  public function getBlogCategories()
  {
    $blogCategories = BlogCategory::get();
    return $blogCategories;
  }

}

class MustReads_Controller extends Blog_Controller {

	private static $allowed_actions = array (
		'SearchForm'
	);

	public function init() {
		parent::init();
	}


}


