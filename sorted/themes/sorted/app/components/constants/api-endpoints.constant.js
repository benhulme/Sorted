!function () {
  "use strict";
  angular.module("sorted").constant("apiEndpoints", {
    questionSelector: "/api/v0.1/question/get",
    popularTools: "/themes/sorted/json/popular-tools.json",
    campaigns: "/api/v0.1/campaign/query",
    mustReads: "/api/v0.1/blog/get",
    calcPreview: "/themes/sorted/json/calc-preview.json",
    blankCalculatorsDefaults: "/themes/sorted/json/blank-calculators-defaults.json",
    usedCalculatorsDefaults: "/themes/sorted/json/used-calculators-defaults.json",
    calcPreviewPost: "/calc-preview-post",
    signupPrompt: "/themes/sorted/json/signup-prompt.json",
    headerHome: "/api/v0.1/page/get/home",
    headerTools: '/api/v0.1/page/get/tools',
    headerGuides: '/api/v0.1/page/get/guides',
    mortgageTool: '/api/v0.1/page/get/mortgage-calculator',
    sortedCollateral: '/themes/sorted/json/sorted-collateral.json',
    retirementPlanner: '/api/v0.1/page/get/retirement-planner',
    debtCalculator: '/api/v0.1/page/get/debt-calculator',
    goalPlanner: '/api/v0.1/page/get/goal-planner',
    kiwisaverFees: '/api/v0.1/page/get/kiwisaver-fees-calculator',
    moneyPersonality: '/api/v0.1/page/get/money-personality-quiz',
    investmentPlanner: '/api/v0.1/page/get/investor-kickstarter',
    glossary: '/api/v0.1/page/get/glossary',
    headerGlossary: "/api/v0.1/page/get/home",
    toolsArticles: '/api/v0.1/page/get/tools',
    mortageTool: '/api/v0.1/page/get/mortgage-calculator',
    relatedLinks: '/themes/sorted/json/related-links.json',
    guidesArticles: '/api/v0.1/page/get/guides',
    budgetingToolPage: '/api/v0.1/page/get/budgeting-tool',
    budgetTemplate: '/themes/sorted/json/budget-presets.json',
    budgetMasterCategories: '/themes/sorted/json/budget-master-categories.json',
    userProfile: '/api/v0.1/profile/get',
    netWorthCalculator: '/api/v0.1/page/get/net-worth-calculator',
    savingsCalculator: '/api/v0.1/page/get/savings-calculator',
    varPage: '/api/v0.1/page/get',
    kiwisaverSavingsCalculator: '/api/v0.1/page/get/kiwisaver-savings-calculator',
    calculators: '/api/v0.1/rest/tool',
    calcSave: '/api/v0.1/rest/tool'
  })
}();


