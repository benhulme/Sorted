<?php

class ApiProfileController extends ApiBaseController {

    private static $allowed_actions = [
        'save',
        'update',
        'get',
        'token',
        'upload',
        'custom',
        'deletecustom',
        'login',
        'checkemail',
        'logout',
        'test',
    ];

    protected $authenticator_class = 'MemberAuthenticator';


    public function test(SS_HTTPRequest $request){
        $From = 'Sorted.org.nz <no-reply@sorted.org.nz>';
        $To = 'paul.headington@gmail.com';
        $Subject = "New Member - confirm";
        $email = new Email($From, $To, $Subject);
        //set template
        $email->setTemplate('RegistrationFormEmail');
        //populate template
        //$email->populateTemplate($data);
        //send mail
        $email->send();

        return $this->response(array('success' => 'true'), 200);
    }

    public function login(SS_HTTPRequest $request){
        HTTP::set_cache_age(0);
        $data = $request->postVars();

        //test data
        /*
        $data = array(
            'Email' => 'paul.headington@gmail.com',
            'Password' => '123',
            'Remember' => true);
        */
        $member = call_user_func_array(array($this->authenticator_class, 'authenticate'), array($data));
        if($member) {
            $member->LogIn(isset($data['Remember']));
            $m = $member->toMap();
            $m['Image'] = $member->Image()->toMap();
            return $this->response($m, 200);
        } else {
            $this->extend('authenticationFailed', $data);
            return $this->response(array('success' => 'false'), 200);
        }

    }

    public function logout(SS_HTTPRequest $request){
        HTTP::set_cache_age(0);
        $member = Member::currentUser();

        /*
         * Forum logout
         */

        Cookie::force_expiry('ips4_member_id','/','.sorted.org.nz');
        Cookie::force_expiry('ips4_pass_hash','/','.sorted.org.nz');
        Cookie::force_expiry('ips4_IPSSessionFront','/','.sorted.org.nz');

        /***********************************************/

        if($member) {
            $member->Logout();
            return $this->response(array('success' => 'true'), 200);
        } else {
            return $this->response(array('success' => 'false'), 200);
        }

    }

    public function checkemail(SS_HTTPRequest $request){
        $data = $request->postVars();
        if(isset($data['Email'])){
          $email = Convert::raw2sql($data['Email']); // prevent sql injection
          $existingUser = DataObject::get_one("Member", "Email = '$email'");
          if(!$existingUser) {
              // user already exists.
              return $this->response(array('success' => 'true'), 200);
          }
        }
        return $this->response(array('success' => 'false'), 200);

    }

    public function token(SS_HTTPRequest $request)
    {
        return $this->response(['token' => Csrf::generate()], 200);
    }

    public function save(SS_HTTPRequest $request)
    {
        //Check CSRF token
//        if (!$this->checkToken($request))
//        {
//            return $this->error('CSRF token mismatch', 401);
//        }
        if (!$request->isPOST())
        {
            return $this->error('', 405);
        }
        $data = json_decode($request->getBody(), true);
        //TODO: Add validation for new user
        $data['Active'] = false;
        $data['Token'] = md5($data['Email'] .  time() . '09438564236jkl34h6klhkjlgdf879');
        $data['TokenExpire'] = date("Y-m-d H:i:s");

        $member = Member::create($data);
        $member->changePassword($data['Password']);
        $member->login();
        Session::set('RecentlySignedUp', true);

        // Add user email to subscribers db
        if (true === $data['Subscription'])
        {
            $record = new CollectedData();
            $record->Type = 'email';
            $record->Data = $data['Email'];

            if ($record->validate()->valid()) {
                $record->write();
            }
        }

        //Find or create the 'user' group
        if(!$userGroup = DataObject::get_one('Group', "Code = 'members'"))
        {
            $userGroup = new Group();
            $userGroup->Code = "members";
            $userGroup->Title = "Site Members";
            $userGroup->Write();
            $userGroup->Members()->add($member);
        }
        //Add member to user group
        $userGroup->Members()->add($member);

        // Registration email -------------------------------
        $From = 'Sorted.org.nz <no-reply@sorted.org.nz>';
        $To = $member->Email;
        $Subject = "New Member - confirm";
        $email = new Email($From, $To, $Subject);
        //set template
        $email->setTemplate('RegistrationFormEmail');
        //populate template
        $email->populateTemplate($data);
        //send mail
        $email->send();
        //---------------------------------------------------





        return $this->response(['status' => 'success'], 200);
    }

    public function update(SS_HTTPRequest $request)
    {
        //Check CSRF token
        if (!$this->checkToken($request))
        {
            return $this->error('CSRF token mismatch', 401);
        }
        //Check type of HTTP request
        if (! $request->isPUT())
        {
            return $this->error('', 405);
        }
        //Get current user object
        $member = Member::currentUser();
        if ( is_null($member) )
        {
            return $this->error('', 404);
        }

        //Get data from HTTP request
        $data = json_decode($request->getBody(), true);

        //Set list of fields allowed for update
        $allowed = [
            'FirstName',
            'Email',
            'Surname',
            'BirthDate',
            'MobilePhone'
        ];
        $data = array_intersect_key($data, array_fill_keys($allowed, ''));

        //Update user object
        $member->update($data);

        //Validate object
//      if (!$member->validate()->valid())
//          {
//                exit('::::');
//
//                return $this->response($member->validate()->messageList(), 400);
//          }

        $member->write();
        return $this->get();

    }

    public function get()
    {
        HTTP::set_cache_age(0);
        $member = Member::currentUser();
        if ( is_null($member) )
        {
            return $this->response(array('success' => 'false'), 200);
        }
        $m = $member->toMap();
        $m['Image'] = $member->Image()->toMap();
//        $allowed = [
//            'ID',
//            'FirstName',
//            'Email',
//            'Surname'
//        ];
//        $member = array_intersect_key($member->toMap(), array_fill_keys($allowed, ''));
        unset($m['AutoLoginHash']);
        unset($m['Password']);
        unset($m['blowfish']);
        unset($m['Salt']);
        unset($m['RememberLoginToken']);
        unset($m['TempIDHash']);        

        return $this->response($m, 200);
    }


    public function deletecustom(SS_HTTPRequest $request)
    {
        $id = $request->param('ID');
        //Check CSRF token
        if (!$this->checkToken($this->getRequest()))
        {
            return $this->error('CSRF token mismatch', 401);
        }
        // Take current member
        $member = Member::currentUser();
        if ( is_null($member) )
        {
            return $this->response([], 404);
        }
        if ($id == null)
        {
            return $this->error('No image id set', 406);
        }

        Image::delete_by_id('Image',$id);

        return $this->response(['status' => 'success']);

    }

    public function custom()
    {

        // Take current member
        $member = Member::currentUser();
        if ( is_null($member) )
        {
            return $this->response([], 404);
        }
        if (!isset($_FILES['Image']))
        {
            return $this->error('No image in request', 406);
        }
        $upload = new Upload;

        $validator = new Upload_Validator();
        $validator->allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
        $validator->allowedMaxFileSize = [10000];

        $upload->setValidator($validator);

        if ($upload->load($_FILES['Image'],  'budget-custom-images'))
        {
            $file = $upload->getFile();
            $id = (int)$file->ID;

            $image = DataObject::get_by_id('Image', $id);

            
            $resized = $image->SetHeight(375);


            $data = array(
                'ID' => $file->ID,
                'imageURL' => $resized->Link()
                );

            return $this->response(['status' => 'success', 'data' => $data]);
        }

        return $this->error($upload->getErrors(), 500);
    }


    public function upload()
    {

        // Take current member
        $member = Member::currentUser();
        if ( is_null($member) )
        {
            return $this->response([], 404);
        }
        if (!isset($_FILES['Image']))
        {
            return $this->error('No image in request', 406);
        }
        $upload = new Upload;

        $validator = new Upload_Validator();
        $validator->allowedExtensions = ['jpg', 'png', 'gif'];
        $validator->allowedMaxFileSize = [10000];

        $upload->setValidator($validator);

        if ($upload->load($_FILES['Image']))
        {
            // TODO: Find normal way to attach related object instead current
            $member->ImageID = $upload->getFile()->ID;
            $member->write();
            return $this->response([
                'status' => 'success',
                'file'  => $upload->getFile()->toMap()
            ]);
        }

        return $this->error($upload->getErrors(), 500);
    }
}
