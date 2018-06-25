<?php

class ApiGoalController extends ApiBaseController
{
    private static $allowed_actions = [
        'get'
    ];

    /**
     * @param SS_HTTPRequest $request
     * @return SS_HTTPResponse
     */
    public function get(SS_HTTPRequest $request)
    {
        $defaultGoals = array(
            'status' => 'success',
            'data' => array(
                0 => array(
                    'ClassName' => 'GoalsDefault',
                    'Data' => array(
                        'CalcID' => '12',
                        'allGoals' => array(
                            'Category' => 'allGoals',
                            'GoalList' => array(
                                0 => array(
                                    'Title' => 'Emergency Fund',
                                    'Type' => '',
                                    'Price' => '-',
                                    'Draggable' => 'true',
                                    'Color' => 'color-3',
                                ),
                                1 => array(
                                    'Title' => 'Holiday Fund',
                                    'Type' => '',
                                    'Price' => '-',
                                    'Draggable' => 'true',
                                    'Color' => 'color-6',
                                ),
                                2 => array(
                                    'Title' => 'Retirement Fund',
                                    'Type' => '',
                                    'Price' => '-',
                                    'Draggable' => 'true',
                                    'Color' => 'color-1',
                                ),
                                3 => array(
                                    'Title' => 'Tackle Debt',
                                    'Type' => '',
                                    'Price' => '-',
                                    'Draggable' => 'true',
                                    'Color' => 'color-2',
                                ),
                            ),

                        ),
                        'short' => array(
                            'Category' => 'short',
                            'Title' => 'Short Term',
                            'Dates' => '0-3 years',
                            'Class' => 'top',
                            'GoalList' => array(),
                        ),
                        'medium' => array(
                            'Category' => 'medium',
                            'Title' => 'Medium Term',
                            'Dates' => '4-9 years',
                            'Class' => 'middle',
                            'GoalList' => array(),
                        ),
                        'long' => array(
                            'Category' => 'long',
                            'Title' => 'Long Term',
                            'Dates' => '10+ years',
                            'Class' => 'bottom',
                            'GoalList' => array(),
                        ),
                        'deleted' => array(
                            'Category' => 'deleted',
                            'Title' => 'Deleted',
                            'GoalList' => array(),
                        ),
                    ),
                    'Title' => 'Goal Planner',
                    'CalcID' => '12',
                ),
            ),
        );
        return $this->response($defaultGoals);
    }
}
