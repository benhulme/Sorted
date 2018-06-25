<?php

class ApiCalculatorController extends ApiBaseController
{
    private static $allowed_actions = [
        'get',
        'query',
        'save',
        'update',
        'delete'
    ];

    /**
     * ApiCalculatorController constructor.
     */
    public function __construct()
    {
        parent::__construct();

        //Get current user object
        $member = Member::currentUser();
        if (is_null($member)) {
            //return $this->response(['status' => 'false']);
            user_error('User not logged in or not found', E_USER_WARNING);
        }
        $this->member = $member;
    }

    /**
     * @param SS_HTTPRequest $request
     * @return SS_HTTPResponse
     */
    public function get(SS_HTTPRequest $request)
    {   
       
        $data = $this->member->calcs()->filter([
            'CalcID' => $request->param('ID')
        ]);
        if ($data->count() === "0") return $this->error('Data not found', 404);
        if (is_null($data)) {
            return $this->error('Data not found', 404);
        }
        $data = $data->toNestedArray();
        foreach ($data as &$item) {
            $item['Data'] = unserialize($item['Data']);
            if(!$item['Translated'] && $request->param('ID') == 2){
                $obj = json_decode($item['Data']);
                $budget = new BudgetTranslate();
                $budget->init();
                $item['Data'] = $budget->createNewObject($obj);
            }
            
        }
        return $this->response($data);
    }

    /**
     * @param SS_HTTPRequest $request
     * @return SS_HTTPResponse
     */
    public function query(SS_HTTPRequest $request)
    {
        $vars = $request->getVars();
        if (isset($vars['calcid'])) {
            $data = $this->member->calcs()->filter([
                'CalcID' => $vars['calcid']
            ]);
            if ($data->count() === "0") return $this->response([]);

            $data = $data->toNestedArray();

            foreach ($data as &$item) {
                $item['Data'] = unserialize($item['Data']);
            }
//            $return[0]['Data'] = unserialize($return[0]['Data']);
            return $this->response($data);

        } else {
            $data = $this->member->calcs();
            if (is_null($data)) return $this->response([]);

            foreach ($data as &$single) {
                $single->Data = unserialize($single->Data);
            }

        }

        return $this->response($data->toNestedArray());
    }

    /**
     * @param SS_HTTPRequest $request
     * @return SS_HTTPResponse
     */
    public function save(SS_HTTPRequest $request)
    {
        //Check CSRF token
        if (!$this->checkToken($request)) {
            //return $this->error('CSRF token mismatch', 401);
        }

        if (!$request->isPOST()) {
            return $this->error('No data', 405);
        }
        $data = json_decode($request->getBody(), true);

        if (!isset($data['Data']) OR !isset($data['CalcID'])) return $this->error('Bad data', 406);
        $data['Data'] = serialize($data['Data']);

        $data['Title'] = 'Budgeting Tool'; //temp title fix as only this tool uses this mwethod
        $data['Translated'] = true;

        //TODO: Add validation for new user
        $newData = CalcData::create($data);
        $newData->write();
        $this->member->calcs()->add($newData);

        $newData->Data = unserialize($newData->Data);
        return $this->response(['status' => 'success', 'data' => $newData->ID]);
    }

    /**
     * @param SS_HTTPRequest $request
     * @return SS_HTTPResponse
     */
    public function update(SS_HTTPRequest $request)
    {
        if (!$this->checkToken($request)) {
            //return $this->error('CSRF token mismatch', 401);
        }
        

        // Get CalcData instance by CalcID
        $data = $this->member->calcs()->byId($request->param('ID'));

        if (is_null($data)) {
            return $this->error('Data not found', 404);
        }

        $newdata = json_decode($request->getBody(), true);

        //Set list of fields allowed for update
        $allowed = [
            'Data',
            'Title',
            'Summary1',
            'Summary2',
            'Summary3'
        ];

        $newdata = array_intersect_key($newdata, array_fill_keys($allowed, ''));

        $newdata['Data'] = serialize($newdata['Data']);
        $newdata['Translated'] = true;
//        $newdata['Title'] = 'Budgeting Tool'; //temp title fix as only this tool uses this mwethod

        $data->update($newdata);
        $data->write();

        return $this->response(['status' => 'success', 'data' => $data->ID]);
    }

    /**
     * @param SS_HTTPRequest $request
     * @return SS_HTTPResponse
     */
    public function delete(SS_HTTPRequest $request)
    {
        if (!$this->checkToken($request)) {
            return $this->error('CSRF token mismatch', 401);
        }

        $data = $this->member->calcs()->byId($request->param('ID'));

        if (null === $data) {
            return $this->error('Wrong ID', 404);
        }

        $data->delete();

        return $this->response(['status' => 'success']);
    }


}
