!function(){"use strict";angular.module("budgetingTool").controller("LoginReminderModalCtrl",["$scope","$uibModalInstance",function(n,o){n.reminderModalLogin=function(){o.dismiss("cancel"),angular.element("#login-modal").modal("show")},n.reminderModalSignup=function(){o.dismiss("cancel"),angular.element("#signup-modal").modal("show")},n.cancelLoginReminder=function(){o.dismiss("cancel")}}])}();