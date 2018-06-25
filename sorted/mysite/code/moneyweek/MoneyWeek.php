<?php

class MoneyWeek extends Page
{
    /**
     * @var array
     */
    private static $db = array(
        'HeaderTitle' => 'Varchar(200)',
        'YoutubeID' => 'Varchar(200)',
        'WhatDebtTitle' => 'Varchar(200)',
        'ConversationTitle' => 'HTMLText',
        'ConversationText' => 'HTMLText',
        'ConversationCTA' => 'Varchar(200)',
        'ConversationLink' => 'Varchar(200)',
        'WhoTitle' => 'Varchar(200)',
        'WhoText' => 'HTMLText',
        'WhoCTA' => 'Varchar(200)',
        'WhoLink' => 'Varchar(200)',
        'ResourcesTitle' => 'Varchar(200)',
        'ResourcesText' => 'HTMLText',
        'Message' => 'HTMLText',
        'InitiativeTitle' => 'Varchar(200)',
        'InitiativeText' => 'HTMLText',
    );

    /**
     * @var array
     */
    private static $has_one = array(
        'ConversationImage' => 'Image',
    );

    /**
     * @var array
     */

    private static $has_many = array(
        'Supporters' => 'Who',
        'WhatDebts' =>'WhatDebt',
        'ResourceLinks' => 'ResourceLink',
        'Initiatives' => 'Initiative',
    );


    /**
     * @var array
     */
    private static $many_many = array();

    public function getCMSFields()
    {
        $gridFieldConfig = GridFieldConfig::create()->addComponents(
	      new GridFieldToolbarHeader(),
	      new GridFieldAddNewButton('toolbar-header-right'),
	     // new GridFieldSortableHeader(),
	      new GridFieldDataColumns(),
	      new GridFieldEditButton(),
	      //new GridFieldDeleteAction(),
	      new GridFieldDetailForm()
	    );

        $fields = parent::getCMSFields();

        $fields->addFieldToTab('Root.Main', TextField::create('YoutubeID', 'YoutubeID'), 'Content');
        $fields->addFieldToTab('Root.Main', TextField::create('HeaderTitle', 'Header Title'), 'Content');

        $fields->addFieldToTab('Root.WhatDebt', TextField::create('WhatDebtTitle', 'What Debt Title'));

        $fields->addFieldToTab('Root.WhatDebt', 
            $WhatDebts = GridField::create(
				'WhatDebts',
				'WhatDebts',
				$this->WhatDebts(),
				$gridFieldConfig
			)
        );

        $configWD = $WhatDebts->getConfig();

        $dataColumnsWD = $configWD->getComponentByType('GridFieldDataColumns');

        $dataColumnsWD->setDisplayFields(array(
            'Title' => 'Title',
        ));


        $fields->addFieldToTab('Root.Conversation', TextField::create('ConversationTitle', 'Title'));
        $fields->addFieldToTab('Root.Conversation', HtmlEditorField::create('ConversationText', 'Content'));
        $fields->addFieldToTab('Root.Conversation', TextField::create('ConversationCTA', 'CTA'));
        $fields->addFieldToTab('Root.Conversation', TextField::create('ConversationLink', 'Link'));
        $uploadField = UploadField::create('ConversationImage', 'Conversation Image');
        $uploadField->getValidator()->setAllowedExtensions(array('jpg', 'jpeg', 'png', 'gif'));
        $uploadField->setFolderName('moneyweek');
        $fields->addFieldToTab('Root.Conversation', $uploadField);


        $fields->addFieldToTab('Root.Who', TextField::create('WhoTitle', 'Title'));
        $fields->addFieldToTab('Root.Who', HtmlEditorField::create('WhoText', 'Content'));
        //$fields->addFieldToTab('Root.Who', TextField::create('WhoCTA', 'CTA'));
        //$fields->addFieldToTab('Root.Who', TextField::create('WhoLink', 'Link'));

        $gridFieldConfigW = GridFieldConfig::create()->addComponents(
	      new GridFieldToolbarHeader(),
	      new GridFieldAddNewButton('toolbar-header-right'),
	     // new GridFieldSortableHeader(),
	      new GridFieldDataColumns(),
	      new GridFieldEditButton(),
	      //new GridFieldDeleteAction(),
	      new GridFieldDetailForm()
	    );

        $fields->addFieldToTab('Root.Who', 
            $Supporters = GridField::create(
				'Supporters',
				'Supporters',
				$this->Supporters(),
				$gridFieldConfigW
			)
        );

        $config = $Supporters->getConfig();

        $dataColumns = $config->getComponentByType('GridFieldDataColumns');

        $dataColumns->setDisplayFields(array(
            'Url' => 'Url'
        ));

        $fields->addFieldToTab('Root.Message', HtmlEditorField::create('Message', 'Top Message'));

        $fields->addFieldToTab('Root.Initiative', TextField::create('InitiativeTitle', 'Title'));
        $fields->addFieldToTab('Root.Initiative', HtmlEditorField::create('InitiativeText', 'Content'));

        $gridFieldConfigI = GridFieldConfig::create()->addComponents(
	      new GridFieldToolbarHeader(),
	      new GridFieldAddNewButton('toolbar-header-right'),
	     // new GridFieldSortableHeader(),
	      new GridFieldDataColumns(),
	      new GridFieldEditButton(),
	      //new GridFieldDeleteAction(),
	      new GridFieldDetailForm()
	    );

        $fields->addFieldToTab('Root.Initiative', 
            $Initiatives = GridField::create(
				'Initiatives',
				'Initiatives',
				$this->Initiatives(),
				$gridFieldConfigI
			)
        );

        $configI = $Initiatives->getConfig();

        $dataColumnsI = $configI->getComponentByType('GridFieldDataColumns');

        $dataColumnsI->setDisplayFields(array(
            'Title' => 'Title'
        ));

        

        $fields->addFieldToTab('Root.Resources', TextField::create('ResourcesTitle', 'Title'));
        $fields->addFieldToTab('Root.Resources', HtmlEditorField::create('ResourcesText', 'Content'));

        $gridFieldConfigR = GridFieldConfig::create()->addComponents(
	      new GridFieldToolbarHeader(),
	      new GridFieldAddNewButton('toolbar-header-right'),
	     // new GridFieldSortableHeader(),
	      new GridFieldDataColumns(),
	      new GridFieldEditButton(),
	      //new GridFieldDeleteAction(),
	      new GridFieldDetailForm()
	    );

        $fields->addFieldToTab('Root.Resources', 
            $ResourceLinks = GridField::create(
				'ResourceLinks',
				'ResourceLinks',
				$this->ResourceLinks(),
				$gridFieldConfigR
			)
        );

        $configR = $ResourceLinks->getConfig();

        $dataColumnsR = $configR->getComponentByType('GridFieldDataColumns');

        $dataColumnsR->setDisplayFields(array(
            'Title' => 'Title'
        ));


        return $fields;
    }
}



class MoneyWeek_Controller extends Page_Controller
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
    );

    public function init()
    {
        parent::init();
        Config::inst()->update('SSViewer', 'rewrite_hash_links', false);
    }

    


}

