<?php
class ApiToolController extends ApiBaseController
{
    private static $allowed_actions = [
        'tool'
    ];

    private static $url_handlers = ['' => 'tool'];

    private $_id;
    private $_data;
    private $_member;
    private $_response = array(
        'status' => 'fail',
        'data' => ''
        );


    /**
     * ApiCalculatorController constructor.
     */
    public function __construct()
    {
        parent::__construct();
        //Get current user object
        $member = Member::currentUser();
        if ( is_null($member) )
        {
            user_error('User not logged in or not found', E_USER_WARNING);
        }
        $this->_member = $member;

    }

    /**
     * @param SS_HTTPRequest $request
     * @return SS_HTTPResponse
     */
    public function tool(SS_HTTPRequest $request){
        $this->_id = $request->param('ID');
        /*
        echo "<pre>";
        var_dump($request);
        echo "</pre>";
        exit();
        */
        $this->_data = json_decode($request->getBody(), true);
        switch ($request->httpMethod()) {
            case 'GET':
                return $this->get();
                break;
            case 'POST':
                //Check CSRF token
                if (!$this->checkToken($request))
                {
                    //return $this->error('CSRF token mismatch', 401);
                }
                if (!$request->isPOST())
                {
                    return $this->error('No data', 405);
                }
                return $this->save();
                break;
            case 'PUT':
                //Check CSRF token
                if (!$this->checkToken($request))
                {
                    //return $this->error('CSRF token mismatch', 401);
                }
                if (!$request->isPUT())
                {
                    return $this->error('No data', 405);
                }
                return $this->update();
                break;
            case 'DELETE':
                //Check CSRF token
                if (!$this->checkToken($request))
                {
                    //return $this->error('CSRF token mismatch', 401);
                }
                return $this->delete();
                break;
        }

    }

    /**
     * @return SS_HTTPResponse
     */
    private function get()
    {
        if($this->_id){
            $calc = $this->_member->calcs()->byId($this->_id);
            if($calc){
                $calc->Data = unserialize($calc->Data);
                $this->_response['data'] = $calc->toMap();
            }else{
                return $this->error('Data not found', 404);
            }
        }else{
            $calcList = $this->_member->calcs();
            $calcListArray = array();
            foreach($calcList as $single){

                // Get link for tool
                $link = ToolPage::get()->filter([
                    'CalcID' => $single->CalcID
                ])->first()->URLSegment;

                $line = $single->toMap();
                $line['Data'] = unserialize($line['Data']);
                $line['Summary1'] = $single->Summary1;
                $line['Summary2'] = $single->Summary2;
                $line['Summary3'] = $single->Summary3;
                $line['Imported'] = $single->Imported;
                if($single->CalcID == 2){
                    $line['Link'] = '/tool/budgeting-tool';
                }else{
                    $line['Link'] = '/tools/'.$link.'/'.$single->ID;
                }
                array_push($calcListArray, $line);
            }
            $this->_response['data'] = $calcListArray;
        }

        if (is_null($this->_response['data']))
        {
            return $this->error('Data not found', 404);
        }
        $this->_response['status'] = 'success';
        return $this->response($this->_response);
    }

    /**
     * @return SS_HTTPResponse
     */
    private function save()
    {
        if (!isset($this->_data['Data']) OR !isset($this->_data['CalcID'])) return $this->error('Bad data', 406);

        $summary = $this->createSummary($this->_data['Data'], $this->_data['CalcID']);

        $this->_data = array_merge($this->_data, $summary);
        $this->_data['Data'] = serialize($this->_data['Data']);

        //TODO: Add validation for new user
        $calculator = CalcData::create($this->_data);
        $calculator->write();
        $this->_member->calcs()->add($calculator);

        $calculator->Data = unserialize($calculator->Data);

        $this->_response['status'] = 'success';
        $this->_response['data'] = $calculator->toMap();

        return $this->response($this->_response);
    }

    /**
     * @return SS_HTTPResponse
     */
    private function update()
    {
        if (!isset($this->_data['Data']) OR !isset($this->_data['CalcID'])) return $this->error('Bad data', 406);

        $calculator = CalcData::get()->byID($this->_id);
        
        if($calculator === null){
          return $this->error('Bad ID', 406);
        }

        //$this->dump($calculator);
        //exit();

        //Set list of fields allowed for update
        $allowed = [
            'Data',
            'CalcID',
            'Title',
            'Summary1',
            'Summary2',
            'Summary3',
            'ID'
        ];

        $summary = $this->createSummary($this->_data['Data'], $this->_data['CalcID']);
        $this->_data = array_merge($this->_data, $summary);

        $this->_data = array_intersect_key($this->_data, array_fill_keys($allowed, ''));


        $this->_data['Data'] = serialize($this->_data['Data']);

        $calculator->update($this->_data);
        $calculator->write();
        $calculator->Data = unserialize($calculator->Data);

        $this->_response['status'] = 'success';
        $this->_response['data'] = $calculator->toMap();

        return $this->response($this->_response);
    }


    /**
     * @return SS_HTTPResponse
     */
    private function delete()
    {
        $calculator = CalcData::get()->byID($this->_id);

        if (null === $calculator)
        {
            return $this->error('Wrong ID', 404);
        }

        $calculator->delete();

        $this->_response['status'] = 'success';

        return $this->response($this->_response);
    }

    private function dump($var){
        echo "<pre>";
        var_dump($var);
        echo "</pre>";
    }

    private function createSummary($data, $calcID){
        $mpp = array(
              'OImSD' => 'Money Mentor',
              'OImSF' => 'visual Stylist',
              'OImLD' => 'Financial Controller',
              'OImLF' => 'Entrepreneur',
              'ORSD' => 'Money Organiser',
              'ORSF' => 'Hedonist',
              'ORLD' => 'Money Surgeon',
              'ORLF' => 'Money Maestro',
              'InImSD' => 'Insightful Investor',
              'InImSF' => 'Authentic Dreamer',
              'InImLD' => 'Adviser Speculator',
              'InImLF' => 'System Innovator',
              'InRSD' => 'Practical Domestic',
              'InRSF' => 'Sensible Drifter',
              'InRLD' => 'Sound Controller',
              'InRLF' => 'Money Mechanic',
            );

        $ik = array(
            0 => 'Defensive',
            1 => 'Conservative',
            2 => 'Balanced',
            3 => 'Growth',
            4 => 'Aggressive',
            );


/* savings tool guide:
if we get a regular type total interest if we get goal period saiving as second summary term, if both interest.
*/


        $output = array();
        switch($calcID){
            case 1:
                $output['Summary1'] = $data['live_on'];
                $output['Summary2'] = $data['result']['shortfall_post_65'];
            break;
            case 2:
            break;
            case 3:
              $s1 = 0;
              $s2 = 0;
              $s3 = 0;  

              foreach ($data as $key => $value) {
                $s1 += $value['amountOwed'];
                  if(count($value['result']) > 0){
                    $s2 += $value['result']['result_interest'];
                    $s3 += $value['result']['result_total'];
                  }
              }

              $output['Summary1'] = $s1;
              $output['Summary2'] = $s2;
              $output['Summary3'] = $s3;
            break;
            case 4:
                $s1 = 0;
                $s2 = 0;
                $s3 = 0;  

                foreach ($data as $key => $value) {
                  $s1 += $value['repayments1'];
                  $s2 += $value['loan1'];
                    if(count($value['result']) > 1){                      
                      $s3 += $value['result']['total'];
                    }
                }

                $output['Summary1'] = $s1;
                $output['Summary2'] = $s2;
                $output['Summary3'] = $s3;
            break;
            case 5:
                $s1 = $data[0]['result']['total'];
                $s2 = $data[0]['result']['sum_total'];
                $s3 = $data[0]['result']['debt_total'];                

                $output['Summary1'] = $s1;
                $output['Summary2'] = $s2;
                $output['Summary3'] = $s3;
            break;
            case 6:
                $output['Summary1'] = 'Visit the tool to view your saved search';
            break;
            case 7:
                $output['Summary1'] = $data['result']['retirement_lump_sum'];
                $output['Summary2'] = $data['result']['retirement_income'];
                $output['Summary3'] = $data['result']['life_expectancy'];
            break;
            case 8:
                $freq = 'weekly';
                switch($data[0]['saving_freq']){
                    case 1:
                        $freq = 'yearly';
                    break;
                    case 12:
                        $freq = 'monthly';
                    break;
                    case 24:
                        $freq = 'fortnightly';
                    break;
                    case 52:
                        $freq = 'weekly';
                    break;
                }
                if(count($data[1]['result'])){
                    $output['Summary1'] = $data[1]['result']['total_saved'];
                    $output['Summary2'] = $data[1]['result']['interest'];
                    $output['Summary3'] = '$'.$data[1]['result']['total'] . ' ' . $freq;
                }
                if(count($data[0]['result'])){
                    $output['Summary1'] = $data[0]['result']['total'];
                    $output['Summary2'] = $data[0]['result']['interest'];
                    $output['Summary3'] = '$'.$data[0]['regular_amount'] . ' ' .  $freq;
                }
            break;
            case 9:
                $output['Summary1'] = $ik[$data['result']['label']];
            break;
            case 10:
                $output['Summary1'] = $mpp[$data['result']['code']];
            break;
            case 11:
            break;
            case 12:
                $output['Summary1'] = count($data['short']['GoalList']).'x goals';
                $output['Summary2'] = count($data['medium']['GoalList']).'x goals';
                $output['Summary3'] = count($data['long']['GoalList']).'x goals';
            break;
        }

        return $output;
    }


}
