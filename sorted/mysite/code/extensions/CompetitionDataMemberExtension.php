<?php


class CompetitionDataMemberExtension extends DataExtension
{
    private static $has_many = [
        'Competitions' => 'CompetitionParticipant'
    ];
}