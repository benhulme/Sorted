<?php
class ContactPage extends SortedPage {

    private static $db = array(
        'SubjectList' => 'Varchar(4000)',
        'Email' => 'Varchar(255)',
    );

    public function getCMSFields(){
      $fields = parent::getCMSFields();
      $fields->addFieldToTab('Root.FormSettings', TextareaField::create('SubjectList', 'Subject List'));
      $fields->addFieldToTab('Root.FormSettings', TextField::create('Email', 'Email'));
      return $fields;
    }

}
class ContactPage_Controller extends Page_Controller {

    private static $allowed_actions = array('Form');

    public function Form() {

        $subjects = explode(',', $this->SubjectList);

        $emailField = EmailField::create('Email','Your email address','')
            ->addExtraClass('email-field required');
        $subjectField = DropdownField::create('Subject', 'Subject', $subjects)
            ->addExtraClass('subject-field required');
        $messageField = TextareaField::create('Message','Tell us what you think','')
            ->setAttribute('placeholder', 'Write your comments')
            ->addExtraClass('message-field required');

        $fields = new FieldList(
            $emailField,
            $subjectField,
            $messageField
        );

        $actions = new FieldList(
            new FormAction('submit', 'send feedback')
        );
        $validator = new RequiredFields('Email','Subject','Subject','Message');

        $form = new Form($this, 'Form', $fields, $actions, $validator );
        $form->enableSpamProtection();
        return $form;
    }

    public function submit($data, $form) {
        $subjects = explode(',', $this->SubjectList);
        //Convert Subj ID into text
        $data['Subject'] = $subjects[$data['Subject']];

        $email = new Email();

        $email->setTo($this->Email);
        $email->setFrom('Sorted.org.nz <no-reply@sorted.org.nz>');
        $email->setSubject("Contact Message from {$data["Email"]} - {$data["Subject"]}");

        $messageBody = "
            <p><strong>Email:</strong> {$data['Email']}</p>
            <p><strong>Subject:</strong> {$data['Subject']}</p>
            <p><strong>Message:</strong> {$data['Message']}</p>
        ";
        $email->setBody($messageBody);
        $email->send();
        return array(
            'FormattedContent' => '<p>Thank you for your feedback.</p>',
            'Form' => ''
        );
    }
}
