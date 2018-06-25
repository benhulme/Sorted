<?php

class SortedBlogPost extends BlogPost{

  private static $restrict_authors_to_group = 'content-authors';

	private static $db = array(
		'IsVideoPost' => 'BOOLEAN',
		'ShortCopy' => 'Varchar(1024)',
	);

	private static $has_one = array(
		'ThumbnailImage' => 'Image',
		'BackgroundImage' => 'Image',
	);

    private static $many_many = array(
        'GlossaryTerms' => 'GlossaryTerm',
      );

	public function getCMSFields(){
        $fields = parent::getCMSFields();

        $GlossaryTerms = TagField::create(
                'GlossaryTerms',
                'Glossary Terms',
                GlossaryTerm::get(),
                $this->GlossaryTerms()
            )
            ->setShouldLazyLoad(true) // tags should be lazy loaded
            ->setCanCreate(false);     // don't allow glossary terms to be made inline

        $fields->insertAfter($GlossaryTerms, 'Content');

        $uploadField = UploadField::create('ThumbnailImage',  'Thumbnail Image',NULL,NULL,NULL,'thumbnails');
		$uploadField->getValidator()->setAllowedExtensions(array('jpg', 'jpeg', 'png', 'gif'));

		$fields->insertAfter($uploadField, 'Content');

		$fields->addFieldToTab('Root.Main', TextareaField::create('ShortCopy', 'Short Copy'), 'Content');

		$uploadField2 = UploadField::create('BackgroundImage',  'Background Image');
		$uploadField2->getValidator()->setAllowedExtensions(array('jpg', 'jpeg', 'png', 'gif'));

		$fields->addFieldToTab('Root.Header', $uploadField2);

		$fields->addFieldToTab('Root.Main', CheckBoxField::create('IsVideoPost' ,'Is a Video Post'), 'Content');

        return $fields;
    }

    public function smartLink(){
        return $this->Link();
    }

    public function getRelatedPages(){
        $tags = $this->Tags();

        if($tags->count() < 1){
        	return array();
        }
        $pages = SortedPage::get()->filter(array(
            'RelationTags.ID:ExactMatchMulti' => $tags->getIDList()
            ));
        $posts = BlogPost::get()->filter(array(
            'Tags.ID:ExactMatchMulti' => $tags->getIDList(),
            'ID:ExactMatch:not' => $this->ID
            ));

        $set = new ArrayList;
		foreach(SortedPage::get()->filter(array(
            'RelationTags.ID:ExactMatchMulti' => $tags->getIDList()
            ))->sort('Created') as $obj) $set->push($obj);
		foreach(BlogPost::get()->filter(array(
            'Tags.ID:ExactMatchMulti' => $tags->getIDList(),
            'ID:ExactMatch:not' => $this->ID
            ))->sort('Created') as $obj) $set->push($obj);
		return $set->limit(2);
    }

    private function countTags($tags, $match){
        return count(array_intersect($tags, $match));

    }

    public function getFormattedContent()
    {
        $pageTerms = $this->GlossaryTerms();
        $content = $this->Content;
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
                            $replace = '<a id="element"    data-toggle="popover"   title="' . $term->Title . '<span onclick=$(\'[data-toggle=popover]\').popover(\'hide\')>&times</span>" data-content="' . $term->Content . ' <a href=\'#/glossary\' class=\'ui-link font-sm\'>See glossary <i class=\'fa fa-chevron-right\'></i></a> ">' . $needle . '</a>';
                            $content = substr_replace($content,$replace,$pos,strlen($needle));
                            break;
                        }
                        $needle = strtolower($needle);
                        $pos = strpos($content,$needle);
                        if ($pos !== false) {
                            $replace = '<a id="element"    data-toggle="popover"   title="' . $term->Title . '<span onclick=$(\'[data-toggle=popover]\').popover(\'hide\')>&times</span>" data-content="' . $term->Content . ' <a href=\'#/glossary\' class=\'ui-link font-sm\'>See glossary <i class=\'fa fa-chevron-right\'></i></a> ">' . $needle . '</a>';
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

class SortedBlogPost_Controller extends BlogPost_Controller {



}
?>
