<?php
class ActivateController extends Controller {

    private static $allowed_actions = array(
        'member'
    );

    public function init() {
        parent::init() ;
    }

    public function member(SS_HTTPRequest $request) {
        $token = $request->param('ID');
        $success = false;
        $member = Member::get_one('Member', array('Token' => $token));    
        if($member){
            if(strtotime($member->TokenExpire) < strtotime('-48 hour')){
                $success = false;
            }else{
                $member->Active = true;
                $member->TokenExpire = date('Y-m-d H:i:s', strtotime('-1 year'));
                $member->write();
                $success = true;
            }            
        }
        return array(
            'member' => $member,
            'success' => $success
        );
        
        
    }
}
