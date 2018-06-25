<?php
class SortedControllerExtension extends Extension {

    public function alterCommentForm($form) {
        //$form->enableSpamProtection();
        foreach($form->Fields() as $field) {

            if ($field->is_a('CompositeField')) {
                $comment = $field->fieldByName('Comment');
                $field->removeByName('Comment');
                $field->removeByName('URL');
                $field->insertBefore($comment, 'Name');

                foreach($field->FieldList() as $subfield) {

                    if (!$subfield->is_a('HiddenField')) {

                        // skip hidden fields
                        switch($subfield->name){

                            case "Comment":
                                $subfield->setFieldHolderTemplate('SortedField_Comment');
                                $subfield->setAttribute('placeholder','Post your comment');
                                break;

                            case "Name":
                                $subfield->setFieldHolderTemplate('SortedField_Name');
                                $subfield->setAttribute('placeholder','Name');
                                $subfield->setMaxLength(25);
                                break;

                            case "Email":
                                $subfield->setFieldHolderTemplate('SortedField_Email');
                                $subfield->setAttribute('placeholder','Email address*');
                                break;
                        }

                    }

                }

            }

        }

        $NocaptchaField = new NocaptchaField('MyCaptcha');
        $NocaptchaField->options = array('theme' => 'light'); // optional
        $form->Fields()->insertAfter($NocaptchaField, 'Email');

        foreach($form->Actions() as $action){

            if($action->Name = 'action_doPostComment') {
                $action->title = 'Post Comment';
                $action->addExtraClass('btn btn-primary hidden');
                $action->attrValue('value', 'fsdfsd');

            }

        }

    }

}
