"use strict";var saveToStorage=function(e,o){sessionStorage&&sessionStorage.setItem(e,JSON.stringify(o))},updateRoot=function(e){try{var o=angular.element(document.querySelector("[ng-app]"));if(o.length){var n=o.injector(),t=n.get("$rootScope");t.$apply(function(){t.userLogged=e})}}catch(e){}},getFromStorage=function(e){if(sessionStorage){var o=sessionStorage.getItem(e);return JSON.parse(o)}},switchView=function(){$("#unsigned-view, #draw-form-container__unsigned-view").hide(),fillLogged(),$("#signed-view, #draw-form-container__form").show()},resetLoginStatus=function(){sessionStorage.clear(),updateRoot(!1),$("#signed-view, #draw-form-container__form").hide(),$("#unsigned-view, #draw-form-container__unsigned-view").show()},logoutProfile=function(){$.ajax({type:"GET",headers:{"X-Csrf-Token":window.$_gah2Anoh,"Cache-Control":"no-cache"},url:"/api/v0.1/profile/logout",async:!0,success:function(){resetLoginStatus(),window.location.href=window.location.origin},error:function(e,o,n){}})},fillLogged=function(){var e=getFromStorage("userData"),o=$("#signed-view");o.find(".member-name").text(e.FirstName),e.Image.Filename?o.find(".member-circle").css({"background-image":"url("+e.Image.Filename+")"}).addClass("bordered"):o.find(".member-circle").text(e.FirstName[0]),o.find(".logout-button").on("click",function(){globalState&&globalState.dirty||logoutProfile()})},loginProfile=function(){$.ajax({type:"GET",url:"/api/v0.1/profile/get",headers:{"X-Csrf-Token":window.$_gah2Anoh,"Cache-Control":"no-cache"},async:!0,success:function(e){"false"===e.success?(resetLoginStatus(),window.location.hash.indexOf("?login=2")>=0&&$("#login-modal").modal("show"),window.location.hash.indexOf("?signup=2")>=0&&$("#signup-modal").modal("show")):(saveToStorage("userData",e),switchView(),triggerSaveDialog(),updateRoot(!0))},error:function(){$("#unsigned-view, #draw-form-container__unsigned-view").show()}})},triggerSaveDialog=function(){window.location.href.indexOf("/tools/")>=0&&sessionStorage.getItem("triggerSave")&&($("#save-as-modal").modal("show"),sessionStorage.removeItem("triggerSave"))},ifPrivate=function(){return!(!function(){try{window.sessionStorage.setItem("test","test")}catch(e){return!0}return!1}()&&0!==window.sessionStorage.length)},showPrivateAlert=function(){$(".private-alert").show()},checkLogin=function(){var e=setInterval(function(){$(".nav-account").length&&(ifPrivate()&&showPrivateAlert(),window.loginProfile(),clearInterval(e))},100)};checkLogin();