<?php
class CompetitionAdmin extends ModelAdmin {
    private static $managed_models = [
        'CompetitionPage'
    ];

    private static $url_segment = 'competitions';

    private static $menu_title = 'Competitions';

}