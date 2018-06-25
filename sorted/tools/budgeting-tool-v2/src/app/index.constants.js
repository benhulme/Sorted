/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('sortedBudgetingTool')
    .constant('malarkey', malarkey)
    .constant('_', _)
    .constant('BudgetView', {
      LIST : 'list',
      GRID : 'grid'
    })
    .constant('ModalType', {
      EDIT_BUDGET : 'edit_budget',
      DELETE_SUBCATEGORY : 'delete_subcategory',
      ADD_SUBCATEGORY : 'add_subcategory',
      EDIT_MASTER_CATEGORY: 'edit_master_category',
      DELETE_MASTER_CATEGORY: 'delete_master_category',
      LOGIN: 'login'
    })
    .constant('Colors', {
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
      COLOUR_GRADIENTS: [
        0.66, 0.33
      ]
    })

    .constant('moment', moment);

})();
