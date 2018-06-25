(function() {
  'use strict';

  angular.module('sorted')
    .constant('apiEndpoints', {
      questionSelector: '/api/v0.1/question/get',
      popularTools: '/json/popular-tools.json',
      campaigns: '/json/campaigns.json',
      mustReads: '/json/must-reads.json',
      calcPreview: '/json/calc-preview.json',
      calcPreviewPost: '/calc-preview-post',
      signupPrompt: '/json/signup-prompt.json',
      headerGuides: '/json/header-guides.json',
      headerTools: '/json/header-tools.json',
      headerHome: '/json/header-home.json',
      mortgageTool: '/json/mortgage-tool.json',
      debtCalculator: '/json/debt-calculator.json',
      retirementPlanner: '/json/retirement-planner.json',
      kiwisaverFees: '/json/kiwisaver-fees.json',
      moneyPersonality: '/json/money-personality.json',
      investmentPlanner: '/json/investment-planner.json',
      glossary: '/json/glossary.json',
      headerGlossary: '/json/glossary.json',
      toolsArticles: '/json/tools-articles.json',
      relatedLinks: '/json/related-links.json',
      guidesArticles: '/json/guides-articles.json',
      sortedCollateral: '/json/sorted-collateral.json',
      budgetingToolPage: '/json/budgeting-tool-page.json',
      budgetTemplate: '/json/budget-presets.json',
      budgetMasterCategories: '/json/budget-master-categories.json',
      userProfile: '/json/user-profile.json',
      netWorthCalculator: '/json/net-worth-calculator.json',
      varPage: '/json/var-page',
      dashboard: '/json/dashboard.json',
      savingsCalculator: '/json/savings-calculator.json',
      kiwisaverSavingsCalculator: '/json/kiwisaver-savings-calculator.json',
      calculators: '/json/calculators.json',
      calcSave: '/json/savings-calculator.save.json',
      goalPlanner: '/json/goal-planner.json',
      planningTool: '/json/planning-tool.json'
    });
}());
