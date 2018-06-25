<?php


class CalcDataMemberExtension extends DataExtension
{
    private static $has_many = [
        'Calcs' => 'CalcData'
    ];
}