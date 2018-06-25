<?php
class ApiSearchController extends ApiBaseController {
    private static $allowed_actions = ['go'];
    private static $url_handlers = ['' => 'go'];

    public function go() {

        $query = new SearchQuery();
        $query->search('Etiam');

        $params = array(
            'spellcheck' => 'true', 
            'spellcheck.collate' => 'true', 
            'hl' => 'true',
        );

        /*
        // create curl resource 
        $ch = curl_init(); 

        // set url 
        //curl_setopt($ch, CURLOPT_URL, 'http://localhost:8983/solr/AutoComplete/browse?q=te&wt=json&fq=_versionedstage:"Live"');
        curl_setopt($ch, CURLOPT_URL, 'http://localhost:8983/solr/AutoComplete/browse?q=te&wt=json'); 

        //return the transfer as a string 
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 

        // $output contains the output string 
        $output = curl_exec($ch); 

        // close curl resource to free up system resources 
        curl_close($ch); 

        //echo "<pre>";
            echo $output;
            //echo "</pre>";
            exit();
        */
        $data = singleton('SortedIndex')->search($query,  -1, -1, $params);

        echo "<pre>";
            var_dump($data);
            echo "</pre>";
            exit();
        
        foreach ($data->Matches as $value) {
            echo "<pre>";
            var_dump($value->Title);
            var_dump($value->Excerpt->value);
            var_dump($value->ClassName);
            echo "</pre>";

        }


        if(count($data->Matches) < 1){
            echo "<pre> let me suggest: ";
            var_dump($data->SuggestionQueryString);
            echo "</pre>";
        }
        die();


        $result = [];

        $toolPage = ToolPage::get();

        foreach ($toolPage as $page) {
            $result[] = $page->toMap();
        }

        $campaignPages = CampaignPage::get()->filter([
            'ParentID'  => 1
        ]);

        foreach ($campaignPages as $item) {
            $newItem = $item->toMap();
            $newItem['Thumbnail'] = $item->Thumbnail()->toMap();
            $newItem['BladeImage'] = $item->BladeImage()->toMap();
            $newItem['Link'] = $item->smartLink();
            $result[] = $newItem;
        }

        $blogPosts = SortedBlogPost::get()->sort('Created DESC')->limit(3);

        foreach ($blogPosts as $item) {
            $newItem = $item->toMap();
            $newItem['ThumbnailImage'] = $item->ThumbnailImage()->toMap();
            $newItem['FeaturedImage'] = $item->FeaturedImage()->toMap();
            $newItem['Link'] = $item->smartLink();
            $allowedFields = [
                'ID',
                'FirstName',
                'Email',
                'Surname'
            ];
            $newItem['Author'] = array_intersect_key($item->Authors()->last()->toMap(), array_fill_keys($allowedFields, ''));
            $result[] = $newItem;
        }

        return $this->response($result);
    }

}