<?php

class ApiQuestionController extends ApiBaseController
{

    private static $allowed_actions = [
        'get'
    ];

    public function get()
    {
        return $this->response(HomepageQuestion::get()->toNestedArray());
    }

}
