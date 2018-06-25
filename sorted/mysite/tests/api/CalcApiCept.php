<?php
$I = new ApiGuy($scenario);
$I->wantTo('Log in as admin');
$I->setCookie('PHPSESSID_2', $I->login());

//************ SAVE ************************

$I->wantTo('test API SAVE');

$faker = Faker\Factory::create();

$newData = [
    'Data'  => json_encode([
        'FirstName'     => $faker->firstName,
        'Surname'       => $faker->lastName,
        'Email'         => $faker->safeEmail,
        'MobilePhone'   => $faker->phoneNumber,
        'BirthDate'     => $faker->date()
    ]),
    'CalcID'    => "3"
];

$I->sendPOST('/api/v0.1/calculator/save', json_encode($newData) );
$I->seeResponseCodeIs(200);
$I->seeResponseIsJson();
$I->seeResponseContains('{"status":"success"}');

//************ QUERY ***********************

$I->wantTo('Test API QUERY');
$I->sendGET('/api/v0.1/calculator/query');
$I->seeResponseCodeIs(200);
$response = json_decode($I->grabResponse(), true);


//************ GET ***********************

$I->wantTo('Test API GET');
$I->sendGET('/api/v0.1/calculator/get/'.$response[0]['ID']);
$I->seeResponseCodeIs(200);
$I->seeResponseMatchesJsonType([
    'Data'     => 'string',
    'MemberID'     => 'string',
    'CalcID'         => 'string',
    'ID'            => 'integer'
]);

//************ DELETE ***********************

$I->wantTo('Test API DELETE');
$I->sendDELETE('/api/v0.1/calculator/delete/'.$response[0]['ID']);
$I->seeResponseCodeIs(200);
$I->seeResponseContains('{"status":"success"}');
