<?php
$I = new ApiGuy($scenario);
$I->wantTo('get 6 last blog posts');
$I->sendGET('/blog/get');
$I->seeResponseCodeIs(200);
$I->seeResponseContainsJson([
    'ClassName' => 'SortedBlogPost',

]);
