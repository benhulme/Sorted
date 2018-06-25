<?php

class ApiOrderController extends ApiBaseController
{
    private static $allowed_actions = [
        'save',
        'seminars',
        'rollout',
        'rollout2'
    ];

    private $stock_references = [
        '1000' => [ 'ref' => 'SORTED016', 'name' =>		'Set your goals' ],
        '1100' => [ 'ref' => 'SORTED073', 'name' =>     'Set your goals - Te Reo'],
        '1004' => [ 'ref' => 'SORTED026', 'name' =>		'Insurance' ],
        '1005' => [ 'ref' => 'SORTED022', 'name' =>		'Investing' ],
        '1007' => [ 'ref' => 'SORTED002', 'name' =>		'KiwiSaver' ],
        '1003' => [ 'ref' => 'SORTED019', 'name' =>		'Retirement planning' ],
        '1006' => [ 'ref' => 'SORTED018', 'name' =>		'Saving' ],
        '1106' => [ 'ref' => 'SORTED076', 'name' =>     'Saving - Te Reo' ],
        '1008' => [ 'ref' => 'SORTED020', 'name' =>		'Choice years' ],
        '1001' => [ 'ref' => 'SORTED021', 'name' =>		'Budgeting' ],
        '1101' => [ 'ref' => 'SORTED074', 'name' =>     'Budgeting - Te Reo'], 
        '1002' => [ 'ref' => 'SORTED017', 'name' =>		'Managing debt' ],
        '1102' => [ 'ref' => 'SORTED075', 'name' =>     'Managing debt - Te Reo' ],
        '1999' => [ 'ref' => 'SORTED025', 'name' =>		'Set of Sorted booklets' ],
        '1009' => [ 'ref' => 'SORTED055', 'name' =>		'Thinking of living in a retirement village' ]
    ];

    private $seminar_name = [
        '2000' => ['name' =>		'Tackling debt' ],
        '2001' => ['name' =>     'Getting ahead'],
        '2002' => ['name' =>		'Setting goals, making a budget' ],
        '2003' => ['name' =>		'Dialling up KiwiSaver' ],
        '2004' => ['name' =>		'Retirement planning' ],
        '2005' => ['name' =>		'Saving and investing' ]  
    ];

    public function rollout(SS_HTTPRequest $request){
        echo "rollout<br/>";

        $orders = Orders::get();
        foreach($orders as $order){
            $data = unserialize($order->Data);
            // Loop through all ordered booklets
            
            $Organisation = $data['Organisation'];
            
            $order->OrganisationName = $Organisation['company_name'];
            $order->OrganisationRole = $Organisation['position_description'];
            $order->OrganisationType = $Organisation['organisation_type']['name'];
            $order->OrganisationSize = $Organisation['organisation_size']['name'];

            $order->write();

            foreach ($data['Items'] as $item_index => $qty) {
                if (!array_key_exists($item_index, $this->stock_references))
                {
                    SS_Log::log('Reference wasn\'t find: '.$item_index, SS_Log::ERR);
                    continue;
                }

                $booklet = new Booklet();
                $booklet->Name = $this->stock_references[$item_index]['name'];
                $booklet->Ref = $this->stock_references[$item_index]['ref'];
                $booklet->Qty = $qty;
                $booklet->OrdersID = $order->ID;
                $booklet->write();

            }
        }
        echo "finished";
        exit();

    }

    public function rollout2(SS_HTTPRequest $request){
        echo "rollout2<br/>";

        $orders = OrderedSeminars::get();
        foreach($orders as $order){

            //echo $this->seminar_name[$order->SeminarID]['name']. "<br/>";
            
            $order->SeminarID = $this->seminar_name[$order->SeminarID]['name'];

            $order->write();

          
        }
        
        echo "finished";
        exit();

    }

    public function seminars(SS_HTTPRequest $request)
    {
      if (!$request->isPOST()) {
        return $this->error('No data', 405);
      }

      $data = json_decode($request->getBody(), true);
      $Seminars = $data['Seminar'];
      $User = $data['User'];
      $Organisation = $data['raw']['Organisation'];
      $DeliverTo = $data['raw']['DeliverTo'];

      //var_dump($Organisation);
      //exit();

      $date = new DateTime();
      $associate = $date->getTimestamp();

      $obj = [];

      // Seminar email -------------------------------
      $From = 'Sorted.org.nz <no-reply@sorted.org.nz>';
      $To = $data['User']['email'];
      $Subject = "Your Free Sorted Seminar Download";

      $Body = "<p>Thanks for ordering free Sorted seminars.</p><p>Click the link below to download the full guide and slide package.</p>";


      $responseData['Errors'] = [];
      $responseData['Errors']['CouldntWrite'] = [];

      foreach ($Seminars as $seminar) {

        $linkHref = 'https://sorted.org.nz/'.$seminar['Dl'];

        // Add to Email body
        $Body = $Body . "<p>";
        $Body = $Body . "<strong>" . $seminar['Title'] . "</strong> - " . $seminar['ShortCopy'];
        $Body = $Body . "<br/>";
        $Body = $Body . "<a href='".$linkHref."' title='Download the seminar package' target='_blank'>Link</a>";
        $Body = $Body . "</p>";

        // Create the OrderedSeminars record
        $record = new OrderedSeminars();
        $record->Email = $User['email'];
        $record->FirstName = $User['first_name'];
        $record->LastName = $User['family_name'];
        $record->AudienceSize = $User['seminarAudience'];
        $record->SeminarID = $this->seminar_name[$seminar['ID']]['name'];
        $record->Package = $seminar['Dl'];
        $record->Associate = $associate;
        $record->OrganisationName = $Organisation['company_name'];
        $record->OrganisationRole = $Organisation['position_description'];
        $record->OrganisationType = $Organisation['organisation_type']['name'];
        $record->OrganisationSize = $Organisation['organisation_size']['name'];
        $record->Address = $DeliverTo['street_address'] . ' ' . $DeliverTo['suburb_address'] . ' ' .$DeliverTo['town_city'] . ' ' .$DeliverTo['post_code'];

        //var_dump($record);
        //exit();

        // Write it to the database
        if (!$record->write())
        {
          // Respond with any IDs that failed
          array_push($responseData['Errors']['CouldntWrite'], $seminar['ID']);
        }
      }

      $Body = $Body . "<p>Kind regards,</p><p>The Sorted team</p>";

      $email = new Email($From, $To, $Subject, $Body);

      $responseData['Body'] = $Body;

      //send mail
      $email->send();

      $response = $responseData;

      //---------------------------------------------------
      $this->response->addHeader('Content-Type', 'application/json');
      return json_encode($response);

    }

    public function save(SS_HTTPRequest $request)
    {

        if (!$request->isPOST()) {
            return $this->error('No data', 405);
        }

        $data = json_decode($request->getBody(), true);
        if (!isset($data['DeliverTo']['suburb_address']))
        {
            $data['DeliverTo']['suburb_address'] = '';
        }

        $Organisation = $data['Organisation'];
        

        $record = new Orders();
        $record->Data = serialize($data);
        $record->Email = $data['User']['email'];
        $record->FirstName = $data['User']['first_name'];
        $record->LastName = $data['User']['family_name'];
        $record->OrganisationName = $Organisation['company_name'];
        $record->OrganisationRole = $Organisation['position_description'];
        $record->OrganisationType = $Organisation['organisation_type']['name'];
        $record->OrganisationSize = $Organisation['organisation_size']['name'];
        $record->Address = $data['DeliverTo']['street_address'] . ', ' . $data['DeliverTo']['suburb_address']. ', ' . $data['DeliverTo']['town_city']. ',' . $data['DeliverTo']['post_code'];
        $record->Sent = false;


        if (!$record->write())
        {
            return $this->error('Internal server error. Please try again later.');
        }

        // Loop through all ordered booklets
        foreach ($data['Items'] as $item_index => $qty) {
            if (!array_key_exists($item_index, $this->stock_references))
            {
                SS_Log::log('Reference wasn\'t find: '.$item_index, SS_Log::ERR);
                continue;
            }

            $booklet = new Booklet();
            $booklet->Name = $this->stock_references[$item_index]['name'];
            $booklet->Ref = $this->stock_references[$item_index]['ref'];
            $booklet->Qty = $qty;
            $booklet->OrdersID = $record->ID;
            $booklet->write();

        }

        // Confirmation email -------------------------------
        $From = 'Sorted.org.nz <no-reply@sorted.org.nz>';
        $To = $data['User']['email'];
        $Subject = "Order #". $record->ID ." - confirm ";
        $email = new Email($From, $To, $Subject);
        //set template
        $email->setTemplate('OrderConfirmationEmail');
        $email->populateTemplate(new ArrayData([
            'Record' => $record,
            'Data'  => $data
        ]));

        //send mail
        $email->send();
        //---------------------------------------------------
        return $this->response(['status' => 'success'], 201);
    }
}
