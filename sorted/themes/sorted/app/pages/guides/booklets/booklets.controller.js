!function(){"use strict";angular.module("sorted").controller("BookletsController",["$scope","siteConfig","orderViewModel",function(e, a, n){e.siteConfig=a,e.data={organisationTypes:[{id:"1",name:"sole trader"},{id:"2",name:"partnership"},{id:"3",name:"company"},{id:"4",name:"trust"}],organisationSizes:[{id:"1",name:"less than 3"},{id:"2",name:"3 to 5"},{id:"3",name:"6 to 10"},{id:"4",name:"11 to 25"},{id:"5",name:"26 to 50"},{id:"5",name:"more than 50"}]},e.data.selectedOrganisationType=e.data.organisationTypes[0],e.data.selectedOrganisationSize=e.data.organisationSizes[0],n.build().then(function(a){console.log("model: ",a),_.merge(e.data,a)})}])}();