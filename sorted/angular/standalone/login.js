/**
 * Created by stanislavk on 1/03/2016.
 */


'use strict';






  var saveToStorage = function(name,obj){
    if(sessionStorage){
      sessionStorage.setItem(name, JSON.stringify(obj))

    }
  };


  var updateRoot = function(data){

    try {
      var elem = angular.element(document.querySelector('[ng-app]'));
      if (elem.length) {
        var injector = elem.injector();
        var $rootScope = injector.get('$rootScope');


        $rootScope.$apply(function () {
          $rootScope.userLogged = data;
        });
      }
    }catch (e) {

    }


  };

  var getFromStorage = function(name){
    if(sessionStorage){
      var data = sessionStorage.getItem(name);
      return JSON.parse(data);
    }
  };

    var switchView = function(){
      $('#unsigned-view, #draw-form-container__unsigned-view').hide();
      fillLogged();
      $('#signed-view, #draw-form-container__form').show();

    };

    var resetLoginStatus = function(){
      sessionStorage.clear();
      updateRoot(false);
      $('#signed-view, #draw-form-container__form').hide();
      $('#unsigned-view, #draw-form-container__unsigned-view').show();

    };





    var logoutProfile = function(){
      $.ajax({
        type: "GET",
        headers: {
          'X-Csrf-Token': window.$_gah2Anoh,
          'Cache-Control': 'no-cache'
        },
        url: "/api/v0.1/profile/logout",
        async: true,
        success: function () {
          resetLoginStatus();
          window.location.href= window.location.origin;

        },
        error: function(request, status, error){

        }
      });
    };



    var fillLogged = function(){
      var data = getFromStorage('userData');
      var el = $('#signed-view');
      el.find('.member-name').text(data.FirstName);
      if ( !data.Image.Filename ){
        el.find('.member-circle').text(data.FirstName[0])
      }else{
        el.find('.member-circle').css({'background-image': 'url('+data.Image.Filename+')'}).addClass('bordered');
      }
      el.find('.logout-button').on('click', function(){
        if (globalState && globalState.dirty) {
          return;
        }
        logoutProfile();
      })
    };





    var loginProfile = function(){
      $.ajax({
        type: "GET",
        url: "/api/v0.1/profile/get",
        headers: {
          'X-Csrf-Token': window.$_gah2Anoh,
          'Cache-Control': 'no-cache'
        },
        async: true,
        success: function (data) {
          if(data.success==='false'){
            resetLoginStatus();

            if(window.location.hash.indexOf("?login=2") >= 0){
              $('#login-modal').modal('show');
            }
            if(window.location.hash.indexOf("?signup=2") >= 0){
              $('#signup-modal').modal('show');
            }


          }else{
            saveToStorage('userData',data);
            switchView();
            triggerSaveDialog();
            updateRoot(true);

          }

        },
        error: function(){
          $('#unsigned-view, #draw-form-container__unsigned-view').show();
        }
      });

    };


var triggerSaveDialog = function(){
  if(window.location.href.indexOf('/tools/') >= 0){
    if(sessionStorage.getItem('triggerSave')){
      $('#save-as-modal').modal('show');
      sessionStorage.removeItem('triggerSave');
    }
  }
};


var ifPrivate = function(){
  var checkError = function(){
    try{
      window.sessionStorage.setItem('test','test');
    }catch(e){
      return true
    }
    return false
  };

  if(checkError() || (window.sessionStorage.length === 0)){
    return true
  }else{
    return false;

  }
};

var showPrivateAlert = function(){
  $('.private-alert').show();
};



var checkLogin = function(){

  var checkExist = setInterval(function() {
    if ($('.nav-account').length) {

      if(ifPrivate()){

        showPrivateAlert();
      }
      window.loginProfile();


      clearInterval(checkExist);
    }
  }, 100);
};

checkLogin();





