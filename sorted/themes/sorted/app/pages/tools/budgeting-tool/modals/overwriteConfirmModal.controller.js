!function(){"use strict";angular.module("budgetingTool").controller("OverwriteConfirmModalCtrl",["$scope","$uibModalInstance","existingBudget","siteConfig",function(e,i,n,o){e.siteConfig=o,n.ParsedDate=Date.parse(n.Created),e.existingBudget=n,e.overwriteConfirmYes=function(){i.close(!0)},e.overwriteConfirmNo=function(){i.close(!1)},e.cancelOverwriteConfirm=function(){i.dismiss("cancel")}}])}();