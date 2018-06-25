<?php

class ApiBlogController extends ApiBaseController
{
    private static $allowed_actions = [
        'get'
    ];

    public function get(SS_HTTPRequest $request)
    {
        $blogPosts = SortedBlogPost::get()->sort('PublishDate DESC')->limit(3);
        $result = [];

        foreach ($blogPosts as $item) {
            $newItem = $item->toMap();
            $newItem['ThumbnailImage'] = $item->ThumbnailImage()->toMap();
            $newItem['FeaturedImage'] = $item->FeaturedImage()->toMap();
            $newItem['Link'] = $item->smartLink();
            $newItem['CommentsNumber'] = Comment::get()->filter(['ParentID' => $item->ID])->count();
            $allowedFields = [
                'ID',
                'FirstName',
                'Email',
                'Surname'
            ];
            $newItem['Author'] = array_intersect_key($item->Authors()->last()->toMap(), array_fill_keys($allowedFields, ''));
            $result[] = $newItem;
        }
        $this->response = new SS_HTTPResponse();
        $this->response->setStatusCode(200);

        $this->response->setBody(json_encode($result));
        $this->response->addHeader("Content-type", "application/json");

        return $this->response;
    }
}
