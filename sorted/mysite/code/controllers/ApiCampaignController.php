<?php

class ApiCampaignController extends Controller {
    private static $allowed_actions = [
        'query'
    ];

    public function query(SS_HTTPRequest $request)
    {
        $campaignPages = CampaignPage::get()->filter([
            'ParentID'  => 1
        ]);
        $result = [];
        foreach ($campaignPages as $item) {
            $newItem = $item->toMap();
            $newItem['Thumbnail'] = $item->Thumbnail()->toMap();
            $newItem['BladeImage'] = $item->BladeImage()->toMap();
            $newItem['Link'] = $item->smartLink();
            $result[] = $newItem;
        }
        $this->response = new SS_HTTPResponse();
        $this->response->setStatusCode(200);

        $this->response->setBody(json_encode($result));
        $this->response->addHeader("Content-type", "application/json");

        return $this->response;
    }
}