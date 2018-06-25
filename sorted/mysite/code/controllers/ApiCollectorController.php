<?php

class ApiCollectorController extends ApiBaseController
{
    private static $allowed_actions = [
        'email',
        'rollout'
    ];

    public function rollout(SS_HTTPRequest $request){
        echo "rollout<br/>";

        $items = CollectedData::get();
        foreach($items as $item){

            
            $item->DataField = $item->Data;

            $item->write();

          
        }
        
        echo "finished";
        exit();

    }

    public function email(SS_HTTPRequest $request)
    {

        if (!$request->isPOST()) {
            return $this->error('No data', 405);
        }

        $data = json_decode($request->getBody(), true);

        $record = new CollectedData();
        $record->Type = 'email';
        $record->DataField = $data['email'];

        if (!$record->validate()->valid()) {
            return $this->response($record->validate()->messageList(), 406);
        }

        if (!$record->write())
        {
            return $this->error('Internal server error. Please try again later.');
        }

        // Registration email -------------------------------
        $From = 'Sorted.org.nz <no-reply@sorted.org.nz>';
        $To = $data['email'];
        $Subject = "Subscription - confirm";
        $email = new Email($From, $To, $Subject);
        //set template
        $email->setTemplate('SubscriptionEmail');
        //send mail
        $email->send();
        //---------------------------------------------------

        return $this->response(['status' => 'success'], 201);
    }
}