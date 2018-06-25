(function() {
  'use strict';

  angular.module('budgetingTool')
    .constant('budgetingToolConfig', {
      // Time (ms) after which save/replace alerts will fade
      ALERT_TIMEOUT: 2500,

      BREAKDOWN_CHART_OPTIONS: {
        chartArea: {
          height: 300,
          width: 300,
          margin: 0,
          padding: 0
        },
        transitions: false,
        legend: {
          visible: false
        },
        series: [{
          field: 'dollars',
          overlay: {
            gradient: 'none',
          },
         padding: 10
        }],
        seriesDefaults: {
          type: 'donut',
          startAngle: 90
        },
        legendItemClick: function(e) {
          e.preventDefault();
        },
        legendItemHover: function(e) {
          e.preventDefault();
        },
        tooltip: {
          animation: {
            duration: 0
          },
          template: '#= category #: $#= value > 0.25 ? value : 0 #',
          visible: true
        }
      },

      // Transparent spacer series values, placed between budget values
      BREAKDOWN_CHART_SPACER: 0.003,

      BROWSER_CLOSE_WARNING: "You're working on a budget that hasn't been saved.",
      BUDGET_PERIODS: [
        { Shortname: 'weekly', Title: 'Weekly', PerYear: 52 },
        { Shortname: 'fortnightly', Title: 'Fortnightly', PerYear: 26 },
        { Shortname: 'fourweekly', Title: '4 Weekly', PerYear: 13 },
        { Shortname: 'monthly', Title: 'Monthly', PerYear: 12 },
        { Shortname: 'yearly', Title: 'Yearly', PerYear: 1 }
      ],
      BUDGETING_TOOL_PREFIX: 'app/pages',
      BUDGETING_TOOL_PATH: '/tools/budgeting-tool',
      BUDGETING_TOOL_IMAGE_PATH: 'assets/images/tools/budgeting-tool',

      // Do NOT alter this! In the current calculator structure, Budgeting Tool
      // uses this ID to look for user's budget. Other calculators also use the
      // same table with different IDs.
      CALC_ID: '2',

      // Allowed image upload types
      CATEGORY_IMAGE_TYPES: [
        'image/gif',
        'image/jpeg',
        'image/png'
      ],
      CATEGORY_TITLE_PLACEHOLDER: 'Name your category',

      // Opacity steps for use in generating master category icons
      COLOUR_GRADIENTS: [
        0.66, 0.33
      ],

      // Palette for use in breakdown chart and master category icons
      COLOUR_SET: [
        "#ce0058",
        "#704c99",
        "#cadc3c",
        "#00afff",
        "#006e96",
        "#ffd700",
        "#20d4af",
        "#e18cc8"
      ],
      DEFAULT_BUDGET_TITLE: 'Your budget',

      // What period should new budgets use by default? Indexes BUDGET_PERIODS
      DEFAULT_BUDGET_PERIOD: 3,

      // Any property on VIEW_TEMPLATES. Used where no saved value exists in a user budget.
      DEFAULT_BUDGET_VIEW: 'list',

      // IE doesn't support Number.MAX_SAFE_INTEGER. Lame.
      // Unlikely we'll see budgets in excess of 9 trillion cents...
      IE_MAX_SAFE_INTEGER: 9000000000000,

      // Used in budget head modal
      INCOME_STREAM_PLACEHOLDER: 'Income source',
      LOGIN_REMINDER_TIMEOUT: 300000,

      // How many characters to display in browser
      MAX_CATEGORY_TITLE: 24,

      // How many characters can be stored, period
      MAX_CATEGORY_TITLE_FIELD: 50,

      MAX_STREAMS: 5,
      VIEW_TEMPLATES: {
        grid: {
          title: 'Grid View',
          plateTitle: 'Visual with Images',
          icon: 'grid.svg',
          plateIcon:'gridPlate.svg',
          url: 'gridView.html'
        },
        list: {
          title: 'List View',
          plateTitle: 'List View',
          icon: 'list.svg',
          plateIcon: 'listPlate.svg',
          url: 'listView.html'
        }
      }
    });

})();
