<?php

/**
 *  *
 * @package silverstripe
 */

class WhatDebt extends DataObject {
	/**
	 * @var array
	 */
	private static $db = array(
		'Title' => 'Varchar(255)',
    'Text' => 'HTMLText',
    'CTA1' => 'Varchar(200)',
    'Link1' => 'Varchar(200)',
    'CTA2' => 'Varchar(200)',
    'Link2' => 'Varchar(200)',
    'CssStyle' => 'Varchar(200)',
    'ColourStyle' => 'Varchar(200)',

	);

	/**
	 * @var array
	 */
	private static $has_one = array(
    'MainImage' => 'Image',
		'Image1' => 'Image',
    'Image2' => 'Image',
		'MoneyWeek' => 'MoneyWeek',
	);


	/**
	 * {@inheritdoc}
	 */
	public function getCMSFields() {

    $uploadField = UploadField::create('Image1', 'Image 1');
    $uploadField->getValidator()->setAllowedExtensions(array('jpg', 'jpeg', 'png', 'gif'));
    $uploadField->setFolderName('moneyweek');

    $uploadField2 = UploadField::create('Image2', 'Image 2');
    $uploadField2->getValidator()->setAllowedExtensions(array('jpg', 'jpeg', 'png', 'gif'));
    $uploadField2->setFolderName('moneyweek');

    $uploadFieldMain = UploadField::create('MainImage', 'Main Image');
    $uploadFieldMain->getValidator()->setAllowedExtensions(array('jpg', 'jpeg', 'png', 'gif'));
    $uploadFieldMain->setFolderName('moneyweek');

		$fields = new FieldList(
			TextField::create('Title', 'Title'),
      HtmlEditorField::create('Text', 'Text'),
      TextField::create('CssStyle', 'CssStyle'),
      TextField::create('ColourStyle', 'ColourStyle'),
      $uploadFieldMain,
      TextField::create('CTA1', 'CTA1'),
      TextField::create('Link1', 'Link1'),
			$uploadField,
      TextField::create('CTA2', 'CTA2'),
      TextField::create('Link2', 'Link2'),
      $uploadField2
		);

		$this->extend('updateCMSFields', $fields);

		return $fields;
	}

	function canDelete($member = null) { 
      return true;
	}

	function canAdd($member = null) { 
      return false;
	}

	
}
