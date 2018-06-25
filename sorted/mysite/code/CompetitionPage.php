<?php

class CompetitionPage extends CampaignPage
{
    private static $db = array(
        'Title' => 'Varchar(1024)',
        'SecondContent' => 'HTMLText',
        'ThirdContent' => 'HTMLText'
    );

    private static $has_one = [
        'Competition' => 'CompetitionData',
        'TnC' => 'File'
    ];

    private static $has_many = array(
        "Participants" => "CompetitionParticipant"
    );

    public function getCMSFields()
    {
        $fields = parent::getCMSFields();

        $uploadField = UploadField::create('TnC',  'Terms & Conditions (*PDF only)');
        $uploadField->getValidator()->setAllowedExtensions(array('pdf'));
        $fields->insertAfter($uploadField, 'Content');
        
      
        $fields->addFieldToTab('Root.Second Section', HtmlEditorField::create('SecondContent', 'Second Content'));
        $fields->addFieldToTab('Root.Third Section', HtmlEditorField::create('ThirdContent', 'Third Content'));
        
        $grid = GridField::create('Participants', 'Participants',
                $this->Participants()
            );
        // GridField configuration
        $config = $grid->getConfig();
        
        $config->addComponent(new GridFieldExportButton());


        $fields->addFieldToTab('Root.Participants',$grid);


        return $fields;
    }
}

class CompetitionPage_Controller extends Page_Controller
{

    /**
     * An array of actions that can be accessed via a request. Each array element should be an action name, and the
     * permissions or conditions required to allow the user to access it.
     *
     * <code>
     * array (
     *     'action', // anyone can access this action
     *     'action' => true, // same as above
     *     'action' => 'ADMIN', // you must have ADMIN permissions to access this action
     *     'action' => '->checkAction' // you can only access this action if $this->checkAction() returns true
     * );
     * </code>
     *
     * @var array
     */
    private static $allowed_actions = array(        
        'DrawForm'
    );

    public function init()
    {
        parent::init();

        $memberIn = new ArrayData(['MemberIn' => false]);

        $member = Member::currentUser();

        if ( !is_null($member) )
        {
            if (CompetitionParticipant::get()->where('MemberID', $member->ID)->where('CompetitionPageID', $this->ID) )
            {
                //Current member already draw
                $memberIn->setField('MemberIn', true);
            }
        }
    }

    public function DrawForm() {
        $fields = new FieldList([
            CheckboxField::create('acceptance', "I have read and agree to Sorted's <a href='".$this->TnC()->URL."' target='_blank'>Terms and Conditions</a>"),
        ]);
        
        $actions = new FieldList(
            new FormAction('submitDrawForm', 'Enter the draw')
        );
        
        $required = new RequiredFields([
            'acceptance'
        ]);

        $form = new Form($this, 'DrawForm', $fields, $actions, $required);

        return $form;
    }
    public function userIsLoggedIn() {
        return !is_null(Member::currentUser());
    }

    public function userAlreadyEntered() {
        $member = Member::currentUser();

        if ( !is_null($member) )
        {
            if (0 !== (int) $this->Participants("MemberID = ".$member->ID)->count()) {

                return true;
            }
        }
        return false;
    }
    
    public function submitDrawForm($data, Form $form) {
        
        $member = Member::currentUser();

        if ( !is_null($member) )
        {
            $entry = CompetitionParticipant::create();
            $entry->MemberID = $member->ID;    
            $entry->Newbie = Session::get('RecentlySignedUp');
            $entry->write();
            $form->sessionMessage("You're in the draw!", 'good');
            $this->Participants()->add($entry);
            return $this->redirectBack();
        }

        $form->addErrorMessage('DrawForm', 'You must be logged in to draw in', 'error');

        return $this->redirectBack();


    }





}