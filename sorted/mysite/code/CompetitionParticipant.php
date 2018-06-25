<?php
class CompetitionParticipant extends DataObject {
    private static $db = array(
        'Newbie'    => 'boolean'
    );
    
    private static $has_one = array(
        'Competition' => 'CompetitionPage',
        'Member' => 'Member'
    );
    
    private static $summary_fields = array (
        'MemberID',
        'FirstName' => 'Member.FirstName',
        'Surname' => 'Member.Surname',
        'Email' => 'Member.Email'
    );
    
    private static $defaults = [
        'Newbie'    => false
    ];
}