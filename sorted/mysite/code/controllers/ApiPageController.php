<?php

class ApiPageController extends Controller {
    private static $allowed_actions = [
        'get',
        'getGuidePageHolder'
    ];

    public function get(SS_HTTPRequest $request)
    {
        //$page = DataObject::get_one("SiteTree", "URLSegment = '".$request->params()['URLSegment']."'");
        $page = SiteTree::get()->filter('URLSegment', $request->params()['URLSegment'])->First();

        $result = [];

        if($page === false){
            $this->response = new SS_HTTPResponse();
            $this->response->setStatusCode(200);

            $this->response->setBody(json_encode(array('error' => 'page does not exist')));
            $this->response->addHeader("Content-type", "application/json");

            return $this->response;
        }

        $newItem = $page->toMap();

        switch($page->getClassName()){
            case "GuidePage":
                $newItem['ForegroundImage'] = $page->ForegroundImage()->toMap();
                $newItem['BackgroundImage'] = $page->BackgroundImage()->toMap();
                $newItem['ThumbnailImage'] = $page->ThumbnailImage()->toMap();
                $sections = $page->GuideSections();
                $SectionsPara = array();
                foreach($sections as $childPage){
                    $section['Title'] = $childPage->Title;
                    $section['Content'] = $childPage->getFormattedContent();
                    array_push($SectionsPara, $section);
                }
                $newItem['sections'] = $SectionsPara;
                $newItem['Content'] = $page->getFormattedContent();
                $newItem['Related'] = $this->getRelated($page);
                $newItem['Link'] = $page->smartLink();
                $newItem['EditorsPicks'] = $this->getEditorPicks();
            break;
            case "HomePage":
                $newItem['ForegroundImage'] = $page->ForegroundImage()->toMap();
                $newItem['BackgroundImage'] = $page->BackgroundImage()->toMap();
                $newItem['ThumbnailImage'] = $page->ThumbnailImage()->toMap();
                $newItem['RightImageID'] = $page->RightImage()->toMap();
                $newItem['links'] = $page->Links()->toNestedArray();
                $newItem['Related'] = $this->getRelated($page);
                $newItem['Link'] = $page->smartLink();
            break;
            case "MoneyPersonality":
            break;
            case "GuidePageHolder":
                $newItem['ForegroundImage'] = $page->ForegroundImage()->toMap();
                $newItem['BackgroundImage'] = $page->BackgroundImage()->toMap();
                $newItem['ThumbnailImage'] = $page->ThumbnailImage()->toMap();
                $guides = $page->Children();
                $GuidePages = array();
                foreach($guides as $childPage){
                    $GuidePage['Title'] = $childPage->Title;
                    $GuidePage['URLSegment'] = $childPage->URLSegment;
                    $GuidePage['Link'] = $childPage->smartLink();
                    $GuidePage['MenuTitle'] = $childPage->MenuTitle;
                    $GuidePage['CategoryIDs'] = $childPage->Categories()->getIDList();
                    array_push($GuidePages, $GuidePage);
                }
                $newItem['Link'] = $page->smartLink();
                $newItem['EditorsPicks'] = $this->getEditorPicks();
                $newItem['GuidePages'] = $GuidePages;
                $newItem['Categories'] = GuideCategory::get()->toNestedArray();
                $newItem['Related'] = $this->getRelated($page);
            break;
            case "ToolPageHolder":
                $newItem['ForegroundImage'] = $page->ForegroundImage()->toMap();
                $newItem['BackgroundImage'] = $page->BackgroundImage()->toMap();
                $newItem['ThumbnailImage'] = $page->ThumbnailImage()->toMap();                
                $tools = $page->Children();
                $ToolPages = array();
                foreach($tools as $childPage){
                    $ToolPage['CalcID'] = $childPage->CalcID;
                    $ToolPage['Title'] = $childPage->Title;
                    $ToolPage['URLSegment'] = $childPage->URLSegment;
                    if($ToolPage['CalcID'] == 2){
                        $ToolPage['Link'] = '/tool/budgeting-tool';
                    }else{
                        $ToolPage['Link'] = $childPage->smartLink();
                    }
                    $ToolPage['Content'] = $childPage->Content;
                    $ToolPage['ShortCopy'] = $childPage->ShortCopy;
                    $ToolPage['MenuTitle'] = $childPage->MenuTitle;
                    $ToolPage['CustomBlock'] = (BOOL)$childPage->ShowNudge;
                    if($ToolPage['CustomBlock']){
                        $ToolPage['CustomContent'] = $childPage->Nudge()->Tag;
                    }
                    $ToolPage['Links'] = $childPage->Links()->toNestedArray();
                    $ToolPage['Icon'] = $childPage->CalcIcon()->toMap();
                    $ToolPage['ThumbnailImage'] = $childPage->ThumbnailImage()->toMap();
                    $ToolPage['CategoryIDs'] = $childPage->Categories()->getIDList();
                    array_push($ToolPages, $ToolPage);
                }
                $newItem['Link'] = $page->smartLink();
                $newItem['ToolPages'] = $ToolPages;
                $newItem['Categories'] = ToolCategory::get()->toNestedArray();
                $newItem['Related'] = $this->getRelated($page);
            break;
            case "ToolPage":
                $newItem['ForegroundImage'] = $page->ForegroundImage()->toMap();
                $newItem['BackgroundImage'] = $page->BackgroundImage()->toMap();
                $newItem['ThumbnailImage'] = $page->ThumbnailImage()->toMap();
                $newItem['CalcIcon'] = $page->CalcIcon()->toMap();
                $newItem['Nudge'] = $page->Nudge()->toMap();
                $newItem['Related'] = $this->getRelated($page);
                $newItem['Content'] = $page->getFormattedContent();
                if($newItem['CalcID'] == 2){
                    $newItem['Link'] = '/tool/budgeting-tool';
                }else{
                    $newItem['Link'] = $page->smartLink();
                }
                $results = $page->Children();
                $resultPages = array();
                foreach($results as $childPage){
                    $resultPage['Title'] = $childPage->Title;
                    $resultPage['URLSegment'] = $childPage->URLSegment;
                    $resultPage['ThumbnailImage'] = $childPage->ThumbnailImage()->toMap();
                    $resultPage['MenuTitle'] = $childPage->MenuTitle;
                    $resultPage['ShortCopy'] = $childPage->ShortCopy;
                    $resultPage['Content'] = $childPage->Content;
                    $resultPage['Heading1'] = $childPage->Heading1;
                    $resultPage['Copy1'] = $childPage->Copy1;
                    $resultPage['Heading2'] = $childPage->Heading2;
                    $resultPage['Copy2'] = $childPage->Copy2;
                    $resultPage['Heading3'] = $childPage->Heading3;
                    $resultPage['Copy3'] = $childPage->Copy3;
                    array_push($resultPages, $resultPage);
                }
                $newItem['resultPages'] = $resultPages;
            break;
            case "GlossaryPage":
              $newItem['BackgroundImage'] = $page->BackgroundImage()->toMap();
              $terms = $page->Terms()->sort('Title');

              $termList = array();

              foreach ($terms as $term) {
                $letter = strtolower($term->Title[0]);
                if(!isset($termList[$letter])){
                  $termList[$letter] = array(
                    'category' => $letter,
                    'articles' => array(),
                    );
                }
                array_push($termList[$letter]['articles'], $term->toMap());
              }
              $newItem['Link'] = $page->smartLink();
              $newItem['Terms'] = array_values($termList);
            break;

        }


        $result[] = $newItem;

        $this->response = new SS_HTTPResponse();
        $this->response->setStatusCode(200);

        $this->response->setBody(json_encode($result));
        $this->response->addHeader("Content-type", "application/json");

        return $this->response;
    }

    public function getGuidePageHolder(SS_HTTPRequest $request)
    {
        $GuidePageHolder = DataObject::get_one("SiteTree", "URLSegment = 'guides'");

        $subPages = $GuidePageHolder->Children();

        $newItem = $GuidePageHolder->toMap();
        $newItem['GuidePages'] = $GuidePageHolder->Children()->toNestedArray();
        $newItem['ForegroundImage'] = $GuidePageHolder->ForegroundImage()->toMap();
        $newItem['BackgroundImage'] = $GuidePageHolder->BackgroundImage()->toMap();

        $result[] = $newItem;

        $this->response = new SS_HTTPResponse();
        $this->response->setStatusCode(200);

        $this->response->setBody(json_encode($result));
        $this->response->addHeader("Content-type", "application/json");



        return $this->response;
    }

    private function getEditorPicks(){
        $data = GuidePage::get()->filter(array('Sticky' => 1))->limit(6);
        $output = array();
        foreach ($data as $key => $value) {
            $line = array();
            $line['Title'] = $value->Title;
            $line['ShortCopy'] = $value->ShortCopy;
            $line['URLSegment'] = $value->URLSegment;
            $line['MenuTitle'] = $value->MenuTitle;
            $line['Link'] = $value->smartLink();
            $line['ThumbnailImage'] = $value->ThumbnailImage()->toMap();
            array_push($output, $line);
        }
        return $output;
    }

    private function getRelated($page){
        $tags = $page->RelationTags();

        if($tags->count() < 1){
            return array();
        }

        $pages = SortedPage::get()->filter(array(
            'RelationTags.ID:ExactMatchMulti' => $tags->getIDList(),
            'ID:ExactMatch:not' => $page->ID
            ));
        $posts = BlogPost::get()->filter(array(
            'Tags.ID:ExactMatchMulti' => $tags->getIDList(),
            'ID:ExactMatch:not' => $page->ID
            ));


        $output = array();

        foreach ($pages as $key => $page) {
            $pageTags = $page->RelationTags();
            $count = $this->countTags($tags->getIDList(), $pageTags->getIDList());
            $newItem = $page->toMap();
            $newItem['ThumbnailImage'] = $page->ThumbnailImage()->toMap();
            $newItem['Link'] = $page->smartLink();
            $newItem['MenuTitle'] = $page->MenuTitle;
            $newItem['rank'] = $count;
            $output[] = $newItem;
        }

        foreach ($posts as $key => $post) {
            $pageTags = $post->Tags();
            $count = $this->countTags($tags->getIDList(), $pageTags->getIDList());
            $newItem = $post->toMap();
            $newItem['ThumbnailImage'] = $post->ThumbnailImage()->toMap();
            $newItem['rank'] = $count;
            $newItem['MenuTitle'] = $post->MenuTitle;
            $newItem['Link'] = $post->smartLink();
            $output[] = $newItem;
        }

        usort($output, function($a, $b) {
            return $b['rank'] - $a['rank'];
        });
        return $output;
    }
    

    private function countTags($tags, $match){
        return count(array_intersect($tags, $match));

    }

    private function dump($value){
      echo "<pre>";
      var_dump($value);
      echo "</pre>";
      exit();
    }
}
