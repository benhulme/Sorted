<?php
class SortedPage extends SiteTree {

	private static $db = array(
		'HeaderCopy' => 'Varchar(1024)',
		'ShortCopy' => 'Varchar(1024)',
	);

	private static $has_one = array(
		'ForegroundImage' => 'Image',
		'BackgroundImage' => 'Image',
		'ThumbnailImage' => 'Image',
	);

	private static $many_many = array(
    'RelationTags' => 'BlogTag',
    'GlossaryTerms' => 'GlossaryTerm',
  );

  public function getCMSFields(){
			$fields = parent::getCMSFields();

			$tagField = TagField::create(
				'RelationTags',
				'Tags',
				BlogTag::get(),
				$this->RelationTags()
			)
			->setShouldLazyLoad(true) // tags should be lazy loaded
			->setCanCreate(true);     // new tag DataObjects can be created

      $fields->insertAfter($tagField, 'Content');

      $GlossaryTerms = TagField::create(
				'GlossaryTerms',
				'Glossary Terms',
				GlossaryTerm::get(),
				$this->GlossaryTerms()
			)
			->setShouldLazyLoad(true) // tags should be lazy loaded
			->setCanCreate(false);     // new tag DataObjects can be created

      $fields->insertAfter($GlossaryTerms, 'Content');


      $fields->addFieldToTab('Root.Header', TextField::create('HeaderCopy', 'Header Copy'));
      $uploadField = UploadField::create('ForegroundImage',  'Foreground Image');
			$uploadField->getValidator()->setAllowedExtensions(array('jpg', 'jpeg', 'png', 'gif'));

			$fields->addFieldToTab('Root.Header', $uploadField);

			$uploadField2 = UploadField::create('BackgroundImage',  'Background Image',NULL,NULL,NULL,'headers');
			$uploadField2->getValidator()->setAllowedExtensions(array('jpg', 'jpeg', 'png', 'gif'));

			$fields->addFieldToTab('Root.Header', $uploadField2);

			$fields->addFieldToTab('Root.Thumbnail', TextareaField::create('ShortCopy', 'Short Copy'));

			$uploadField3 = UploadField::create('ThumbnailImage',  'Thumbnail Image');
			$uploadField3->getValidator()->setAllowedExtensions(array('jpg', 'jpeg', 'png', 'gif'));

			$fields->addFieldToTab('Root.Thumbnail', $uploadField3);
      return $fields;
    }

    public function smartLink(){
    	switch($this->ClassName){
    		case "CampaignPage":
    			return $this->Link();
    			break;
    		case "ContactPage":
    			return $this->Link();
    			break;
    		case "ToolPageHolder":
    			return "/tools";
    			break;
    		case "ToolPage":
    			return "/tools/" . $this->URLSegment;
    			break;
    		case "GuidePageHolder":
    			return "/guides";
    			break;
    		case "GuidePage":
    			return "/guides/" . $this->URLSegment;
    			break;
    		case "HomePage":
    			return "/";
    			break;
    		case "GlossaryPage":
    			return "/glossary";
    			break;
    		default:
    		return $this->Link();
    			break;
    	}

    }



    public function getFormattedContent()
    {

    	$content = $this->getField('Content');
    	$content = ShortcodeParser::get_active()->parse($content);
    	/*
    	$content = preg_replace("/{nudge id=\"1\"}/", "<nudge>nudge</nudge>", $content);
    	$content = preg_replace("/{nudge id=\"2\"}/", "<nudge2>nudge2</nudge2>", $content);
    	$content = preg_replace("/{nudge id=\"3\"}/", "<nudge3>nudge3</nudge3>", $content);
    	$content = preg_replace("/{nudge id=\"4\"}/", "<nudge4>nudge4</nudge4>", $content);
    	$content = preg_replace("/{nudge id=\"5\"}/", "<nudge5>nudge5</nudge5>", $content);
    	$content = preg_replace("/{nudge id=\"6\"}/", "<nudge6>nudge6</nudge6>", $content);
       */
      $pageTerms = $this->GlossaryTerms();
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
class SortedPage_Controller extends ContentController {

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
		// You can include any CSS or JS required by your project here.
		// Injecting CSRF token into HTML
		Requirements::customScript( 'var $_gah2Anoh = "'. Csrf::generate() . '";' );
		// See: http://doc.silverstripe.org/framework/en/reference/requirements
	}

}
