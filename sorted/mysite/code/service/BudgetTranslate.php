<?php

class BudgetTranslate{
  
    protected $period_monthly;
    protected $period_yearly;
    protected $period_weekly;
    protected $period_fortnightly;
  
    protected $stream;
    protected $sub_category;
    protected $master_category;
    protected $template;
  
    protected $isOld = false;
    protected $oldPeriod;
  
    public function init()
    {
  
  
    /******* PRE Formatted Objects *******/
  
  
    // Periods
  
      $period_monthly = array(
        'ShortName' => 'monthly',
        'Title' => 'Monthly',
        'PerYear' => 12
      );
      $this->period_monthly = (object)$period_monthly;
      
      $period_yearly = array(
        'ShortName' => 'yearly',
        'Title' => 'Yearly',
        'PerYear' => 1
      );
      $this->period_yearly = (object)$period_yearly;
      
      $period_weekly = array(
        'ShortName' => 'weekly',
        'Title' => 'Weekly',
        'PerYear' => 52
      );
      $this->period_weekly = (object)$period_weekly;
  
      $period_fortnightly = array(
        'ShortName' => 'fortnightly',
        'Title' => 'Per fortnight',
        'PerYear' => 26
      );
      $this->period_fortnightly = (object)$period_fortnightly;
      
      
      //Streams
      
      $this->stream = array(
        'Title' => 'test Title',
        'Cents' => 40000,
        'CentsFormattedString' => '400.00',
        'Period' => $period_monthly,
        'Removable' => false
      );   
      
      
      //Sub Category
      
      $this->sub_category = array(
        'ID' => 1,
        'MasterCategoryID' => 1,
        'Title' => 'Personal',
        'Image' => 'assets/images/savings.svg',
        'ValueCents' => 40000,
        'ValueFormattedString' => '400.00',
        'Period' => $this->period_monthly,
        'stateEdit' => false
      );
      
      
      //Master Category
      
      $this->master_category = array(
        'ID' => 1,
        'Title' => 'Personal',
        'Icon' => 'assets/images/savings.svg',
        'Color' => '#006E96',
        'PieValuePercent' => '0.00',
        'ValueCents' => 40000,
        'ValueFormattedString' => '$400.00',
        'DisplayOpen' => false,
        'SubCategories' => array()
      );
      
      
      // Overall Object
      
      $this->template = array(
        'Income' => 
          array(
            'Streams' => array(
              0 => $stream
            ),
            'TotalCents' => 400000,
            'Title' => 'Your Budget',
            'TotalFormattedString' => '400.00',
            'Period' => $period_monthly,
            'LeftToBudget' => '0.00'
          ),
        'PreferredView' => 'list',
        'MasterCategories' => array(
          0 => $master_category,
          1 => $master_category,
          2 => $master_category
        ),
        'MasterCategoriesTotalCents' => 500,
        'MasterCategoriesTotalFormattedString' => '5.00'
      );
    }
  
    private function convertFromYearly($value, $factor){
      if($this->isOld){
        $cents = $value;
      }else{
        $cents = $value / $factor;
      }
      return $cents;
    }
  
    private function calculateTotals($existing){
      $totalIncome = 0;
      $totalOut = 0;
  
      foreach($existing->IncomeStreams as $income){
        $cents = $this->convertFromYearly($income->Cents, $existing->Period->PerYear);
        $totalIncome = $totalIncome + (Int)$cents;
      }
  
      foreach($existing->MasterCategories as $master){     
        $cents = $this->convertFromYearly($master->Cents, $existing->Period->PerYear);
        $totalOut = $totalOut + (Int)$cents;
      }
  
      return array(
        'totalIn' => $totalIncome,
        'totalOut' => $totalOut
      );
    }
  
    private function formatString($cents, $dollar = false){
      $output;
      $number = $cents / 100;
      if($dollar){
        $output = '$' . number_format($number, 2);
      }else{
        $output = number_format($number, 2);
      }
      
      return $output;
    }
  
    private function buildIncomes($existing){
      $output = array();
  
     
      foreach($existing->IncomeStreams as $income){
        $stream = $this->stream;
  
        $cents = $this->convertFromYearly($income->Cents, $existing->Period->PerYear);
  
        $stream['Title'] = $income->Title;
        $stream['Cents'] = $cents;
        $stream['CentsFormattedString'] = $this->formatString((Int)$cents);
        $stream['Period'] = $existing->Period;
        $stream['Removable'] = $income->Removable;
  
        $stream = (object)$stream;
  
        array_push($output, $stream);
      }
  
      return $output;
    }
  
    private function buildMasterCategories($existing){
      $output = array();
  
     
      foreach($existing->MasterCategories as $masterCategory){
        /*
        echo "<pre>";
        var_dump($masterCategory);
        echo "</pre>";
        */
        $master_category = $this->master_category;
  
        $cents = $this->convertFromYearly($masterCategory->Cents, $existing->Period->PerYear);
  
        $master_category['ID'] = $masterCategory->ID;
        $master_category['Title'] = $masterCategory->Title;
        $master_category['Icon'] = $masterCategory->Icon->Filename;
        $master_category['Color'] = $masterCategory->Color;
        $master_category['ValueCents'] = (Int)round($cents);
        $master_category['ValueFormattedString'] = $this->formatString((Int)$cents, true);
        $master_category['DisplayOpen'] = $masterCategory->Expanded;
  
        $sub_categories = $this->buildSubCategories($masterCategory);
  
        $master_category['SubCategories'] = $sub_categories;
  
        $master_category = (object)$master_category;
        
        array_push($output, $master_category);
       
      }
  
      return $output;
    }
  
    private function buildSubCategories($masterCategory){
      $output = array();
   
  
      foreach($masterCategory->Categories as $category){
  
        //echo "<pre>";
        //var_dump($category);
        //echo "</pre>";
        //exit();
  
        $sub_category = $this->sub_category;
  
        $cents = $this->convertFromYearly($category->Cents, $category->Period->PerYear);      
        
        $sub_category['ID'] = $category->ID;
        $sub_category['MasterCategoryID'] = $masterCategory->ID;
        $sub_category['Title'] = $category->Title;
        $sub_category['Image'] = $category->Icon->Filename;
        $sub_category['ValueCents'] = $cents;
        $sub_category['ValueFormattedString'] = $this->formatString((Int)$cents);
  
        if($this->isOld){
          $sub_category['Period'] = $this->oldPeriod;
        }else{
          $sub_category['Period'] = $category->Period;
        }
  
        $sub_category = (object)$sub_category;
  
        array_push($output, $sub_category);
      }
  
      return $output;
    }
  
    function createNewObject($existing){
      /*
      echo "<pre>";
      var_dump($existing);
      echo "</pre>";
  */
      if($existing->Cents && is_int($existing->Cents)){
        $this->isOld = true;
        $this->oldPeriod = $existing->Period;
      }
      
      $totals = $this->calculateTotals($existing);
      $incomes = $this->buildIncomes($existing);
      $masterCategories = $this->buildMasterCategories($existing);
  
      $newBudget = $this->template;
      
      $newBudget['Income']['Title'] = $existing->Title;
      $newBudget['Income']['Period'] = $existing->Period;
      $newBudget['Income']['TotalCents'] = $totals['totalIn'];
      $newBudget['Income']['TotalFormattedString'] = $this->formatString($totals['totalIn']);
      $newBudget['Income']['Streams'] = $incomes;
  
      $newBudget['Income'] = (object)$newBudget['Income'];
  
      if($existing->View == null){
        $existing->View = 'list';
      }
  
      $newBudget['PreferredView'] = $existing->View;
  
      $newBudget['MasterCategories'] = $masterCategories;
  
      $newBudget['MasterCategoriesTotalCents'] = $totals['totalOut'];
      $newBudget['MasterCategoriesTotalFormattedString'] = $this->formatString($totals['totalOut']);
  
      
  
  
      $updateObject = (object)$newBudget;
  
      /*
      echo "<pre>";
      var_dump($updateObject);
      echo "</pre>";
      */
      $json = json_encode($updateObject);
  
      return $json;
    }
  
  }

?>