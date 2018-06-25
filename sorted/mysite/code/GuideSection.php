<?php

/**
 *  *
 * @package silverstripe
 */

class GuideSection extends DataObject {
	/**
	 * @var array
	 */
	private static $db = array(
		'Title' => 'Varchar(255)',
		'Content' => 'HTMLText',
		'SortID'=>'Int',

	);

	/**
	 * @var array
	 */
	private static $has_one = array(
		'GuidePage' => 'GuidePage',
	);

	/**
	 * The default sorting lists GuideSections by sortID.
	 *
	 * @var string
	 */
	private static $default_sort = '"SortID" ASC';


	/**
	 * {@inheritdoc}
	 */
	public function getCMSFields() {

		$title = TextField::create('Title', 'Title');
		$title->Required();
		$title->setCustomValidationMessage('A title is required.');

		$content = HtmlEditorField::create('Content', 'Content');
		$content->Required();
		$content->setCustomValidationMessage('Content is required.');

		$fields = new FieldList(
			$title,
			$content
		);

		$this->extend('updateCMSFields', $fields);

		return $fields;
	}

	function canDelete($member = null) {
      return true;
	}

	function canAdd($member = null) {
      return true;
	}

	public function getFormattedContent()
    {

    	$content = $this->getField('Content');
    	$content = ShortcodeParser::get_active()->parse($content);

      $pageTerms = $this->GuidePage()->GlossaryTerms();
      if(count($pageTerms) > 0){
	      foreach($pageTerms as $term){
	          $needles = explode(',', $term->SearchWords);
	          if(count($needles) < 1){
	              $needles[] = $term->Title;
	          }
	          if(count($needles) > 0){
		          foreach($needles as $needle){
		              $needle = ucfirst(strtolower($needle));
		              $pos = strpos($content,$needle);
		              if ($pos !== false) {
		              		$replace = "<popover><a id='element' data-toggle='popover' data-placement='top' data-type='glossary' data-title='". $term->Title ."' data-content='" . $term->Content . "' >". $needle ."</a></popover>";
		                  //$replace = '<a id="element"    data-toggle="popover"   title="' . $term->Title . '<span onclick=$(\'[data-toggle=popover]\').popover(\'hide\')>&times</span>" data-content="' . $term->Content . ' <a href=\'#/glossary\' class=\'ui-link font-sm\'>See glossary <i class=\'fa fa-chevron-right\'></i></a> ">' . $needle . '</a>';
		                  $content = substr_replace($content,$replace,$pos,strlen($needle));
		                  break;
		              }
		              $needle = strtolower($needle);
		              $pos = strpos($content,$needle);
		              if ($pos !== false) {
		              		$replace = "<popover><a id='element' data-toggle='popover' data-placement='top' data-type='glossary' data-title='". $term->Title ."' data-content='" . $term->Content . "' >". $needle ."</a></popover>";
		                  //$replace = '<a id="element"    data-toggle="popover"   title="' . $term->Title . '<span onclick=$(\'[data-toggle=popover]\').popover(\'hide\')>&times</span>" data-content="' . $term->Content . ' <a href=\'#/glossary\' class=\'ui-link font-sm\'>See glossary <i class=\'fa fa-chevron-right\'></i></a> ">' . $needle . '</a>';
		                  $content = substr_replace($content,$replace,$pos,strlen($needle));
		                  break;
		              }
		          }
	        	}

	      }
    	}

      return $content;
    }


}
