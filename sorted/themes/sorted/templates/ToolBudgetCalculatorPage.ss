<!DOCTYPE html>
<html lang="$ContentLocale" ng-app="sortedBudgetingTool">
<head>
	<% base_tag %>
	<title><% if $MetaTitle %>$MetaTitle<% else %>$Title<% end_if %> &raquo; $SiteConfig.Title</title>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE; Chrome=1">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <link rel="apple-touch-icon" sizes="57x57" href="/themes/sorted/assets/images/favicons/apple-touch-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="/themes/sorted/assets/images/favicons/apple-touch-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="/themes/sorted/assets/images/favicons/apple-touch-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="/themes/sorted/assets/images/favicons/apple-touch-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="/themes/sorted/assets/images/favicons/apple-touch-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="/themes/sorted/assets/images/favicons/apple-touch-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="/themes/sorted/assets/images/favicons/apple-touch-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="/themes/sorted/assets/images/favicons/apple-touch-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/themes/sorted/assets/images/favicons/apple-touch-icon-180x180.png">
    <link rel="icon" type="image/png" href="/themes/sorted/assets/images/favicons/favicon-32x32.png" sizes="32x32">
    <link rel="icon" type="image/png" href="/themes/sorted/assets/images/favicons/android-chrome-192x192.png" sizes="192x192">
    <link rel="icon" type="image/png" href="/themes/sorted/assets/images/favicons/favicon-96x96.png" sizes="96x96">
    <link rel="icon" type="image/png" href="/themes/sorted/assets/images/favicons/favicon-16x16.png" sizes="16x16">
    <link rel="manifest" href="/themes/sorted/assets/images/favicons/manifest.json">
    <link rel="mask-icon" href="/themes/sorted/assets/images/favicons/safari-pinned-tab.svg" color="#5bbad5 ">
    <meta name="msapplication-TileColor" content="#da532c ">
    <meta name="msapplication-TileImage" content="/themes/sorted/assets/images/favicons/mstile-144x144.png">
    <meta name="theme-color" content="#ffffff ">
	$MetaTags(true)
	<meta property="og:url" content="$AbsoluteLink" />
	<meta property="og:site_name" content="Sorted" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="$Title" />
	<meta property="og:description" content="$MetaDescription" />

  <% if $ThumbnailImage %>
      <meta property="og:image" content="{$BaseHref}{$ThumbnailImage.Link}" />
  <%--<% else %>--%>
      <%--<meta property="og:image" content="{$BaseHref}themes/sorted/images/sorted-og-image-default.jpg" />--%>
  <% end_if %>




	<!--[if lt IE 9]>
	<script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
  	<link rel="stylesheet" type="text/css" href="//cloud.typography.com/6773094/640348/css/fonts.css" />
    <!--<script src="https://use.fontawesome.com/0165c682e9.js"></script>-->
    <link rel="stylesheet" type="text/css" href="//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />

	<!-- styles -->
	<!-- bower:css -->
	<link rel="stylesheet" href="bower_components/animate.css/animate.css" />
	<link rel="stylesheet" href="bower_components/hover/css/hover.css" />
	<link rel="stylesheet" href="bower_components/angularjs-slider/dist/rzslider.css" />
	<!-- endbower -->
	<!-- inject:css -->
	<%--<link rel="stylesheet" href="/themes/sorted/assets/css/app.css">--%>

  <link rel="stylesheet" href="/themes/sorted/standalone/tools/budget-calculator/styles/vendor.css">
  <link rel="stylesheet" href="/themes/sorted/standalone/tools/budget-calculator/styles/app.css">

	<!-- endinject -->

    <style>
        @media print {
            breadcrumbs,
            div.nav-sticky,
            div.footer-container,
            div.layout-header-small,
            #_hj-f5b2a1eb-9b07_feedback {
                display: none !important;
            }
        }
    </style>
</head>
<body class="$ClassName<% if not $Menu(2) %> no-sidebar<% end_if %>" <% if $i18nScriptDirection %>dir="$i18nScriptDirection"<% end_if %>>
<script src="https://d3f5l8ze0o4j2m.cloudfront.net/m87/k33spt.js"></script>
<script>
(function () {
          window.onload = function(){
          var frameName = new ds07o6pcmkorn({
            openElementId: "#shieldedButton"
          });
          frameName.init();
          }
          })();
</script>



<% include Header %>


<div class="main" role="main">
	<div class="inner typography line">
		$Layout
	</div>
</div>

<% include Footer %>

<!-- Google Analytics: change UA-XXXXX-X to be your site's ID -->
<!-- Google Tag Manager -->
<noscript>
  <iframe src="//www.googletagmanager.com/ns.html?id=GTM-N8SW9H" height="0" width="0" style="display:none;visibility:hidden"></iframe>
</noscript>
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  '//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-N8SW9H');</script>
<!-- End Google Tag Manager -->
<!--[if lt IE 9]>
<script src="bower_components/es5-shim/es5-shim.js"></script>
<script src="bower_components/json3/lib/json3.min.js"></script>
<![endif]-->

<!-- scripts -->


<!-- inject:login -->
<script src="/themes/sorted/standalone/tools/budget-calculator/scripts/vendor.js"></script>
<script src="/themes/sorted/standalone/tools/budget-calculator/scripts/app.js"></script>

<script src="bower_components/jquery-validation/dist/jquery.validate.js"></script>

<!-- endinject -->


<!-- bower:js -->
<%--<script src="bower_components/jquery/dist/jquery.js"></script>--%>

<%--<script src="bower_components/jquery/dist/jquery.js"></script>--%>
<%--<script src="bower_components/angular/angular.js"></script>--%>
<%--<script src="bower_components/angular-animate/angular-animate.js"></script>--%>
<%--<script src="bower_components/angular-route/angular-route.js"></script>--%>
<%--<script src="bower_components/angular-sanitize/angular-sanitize.js"></script>--%>
<%--<script src="bower_components/angular-resource/angular-resource.js"></script>--%>
<%--<script src="bower_components/angular-cookies/angular-cookies.js"></script>--%>
<%--<script src="bower_components/angular-bootstrap/ui-bootstrap-tpls.js"></script>--%>
<%--<script src="bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/affix.js"></script>--%>
<%--<script src="bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/alert.js"></script>--%>
<%--<script src="bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/button.js"></script>--%>
<%--<script src="bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/carousel.js"></script>--%>
<%--<script src="bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/collapse.js"></script>--%>
<script src="bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/dropdown.js"></script>
<%--<script src="bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/tab.js"></script>--%>
<%--<script src="bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/transition.js"></script>--%>
<%--<script src="bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/scrollspy.js"></script>--%>
<script src="bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/modal.js"></script>
<script src="bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/tooltip.js"></script>
<script src="bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/popover.js"></script>
<%--<script src="bower_components/angular-socket-io/socket.js"></script>--%>
<%--<script src="bower_components/json3/lib/json3.js"></script>--%>
<%--<script src="bower_components/es5-shim/es5-shim.js"></script>--%>
<%--<script src="bower_components/angular-mocks/angular-mocks.js"></script>--%>
<%--<script src="bower_components/gsap/src/uncompressed/TweenMax.js"></script>--%>
<%--<script src="bower_components/angular-touch/angular-touch.js"></script>--%>
<%--<script src="bower_components/angularjs-slider/dist/rzslider.js"></script>--%>
<%--<script src="bower_components/jquery-validation/dist/jquery.validate.js"></script>--%>
<%--<script src="bower_components/moment/moment.js"></script>--%>
<%--<script src="bower_components/angular-moment/angular-moment.js"></script>--%>
<%--<script src="bower_components/underscore/underscore.js"></script>--%>
<%--<script src="bower_components/backbone/backbone.js"></script>--%>
<%--<script src="bower_components/ng-backbone/ng-backbone.js"></script>--%>
<%--<script src="bower_components/ng-lodash/build/ng-lodash.js"></script>--%>
<%--<script src="bower_components/SHA-1/sha1.js"></script>--%>
<%--<script src="bower_components/angulartics/src/angulartics.js"></script>--%>
<%--<script src="bower_components/angulartics-google-tag-manager/lib/angulartics-google-tag-manager.js"></script>--%>
<%--<script src="bower_components/re-tree/re-tree.js"></script>--%>
<%--<script src="bower_components/ng-device-detector/ng-device-detector.js"></script>--%>
<%--<script src="bower_components/bignumber.js/bignumber.js"></script>--%>
<%--<script src="bower_components/es6-shim/es6-shim.js"></script>--%>
<%--<script src="bower_components/array.from/array-from.js"></script>--%>
<%--<script src="bower_components/jquery-ui/jquery-ui.js"></script>--%>
<%--<script src="bower_components/angular-dragdrop/src/angular-dragdrop.js"></script>--%>
<%--<script src="bower_components/jqueryui-touch-punch/jquery.ui.touch-punch.min.js"></script>--%>



<!-- endbower -->



<!-- inject:js -->

<script src="/themes/sorted/standalone/aspectRatio.js"></script>

<script src="/themes/sorted/standalone/campaign.js"></script>

<script src="/themes/sorted/standalone/passwordValidation.js"></script>

<script src="/themes/sorted/standalone/changePassValidation.js"></script>

<script src="/themes/sorted/standalone/competition.js"></script>

<script src="/themes/sorted/standalone/coverImage.js"></script>

<script src="/themes/sorted/standalone/date.js"></script>

<script src="/themes/sorted/standalone/emailSignup.js"></script>

<script src="/themes/sorted/standalone/en-NZ.js"></script>

<script src="/themes/sorted/standalone/facebookShare.js"></script>

<script src="/themes/sorted/standalone/fontSize.js"></script>

<script src="/themes/sorted/standalone/form.js"></script>

<script src="/themes/sorted/standalone/globalState.js"></script>

<script src="/themes/sorted/standalone/login.js"></script>

<script src="/themes/sorted/standalone/loginValidation.js"></script>

<script src="/themes/sorted/standalone/signupValidation.js"></script>

<script src="/themes/sorted/standalone/navigation.js"></script>

<script src="/themes/sorted/standalone/outdated-browsers/outdatedbrowser.min.js"></script>
<!-- endinject -->
<!-- Outdated browsers module -->
<div id="outdated">
    <h6>Your browser is out of date!</h6>
    <p>Update your browser to view this website correctly. <a id="btnUpdateBrowser" href="http://outdatedbrowser.com/">Update my browser now </a></p>
    <p class="last"><a href="#" id="btnCloseUpdateBrowser" title="Close">&times;</a></p>
</div>

<script>
    //event listener form DOM ready
    function addLoadEvent(func) {
        var oldonload = window.onload;
        if (typeof window.onload != 'function') {
            window.onload = func;
        } else {
            window.onload = function() {
                if (oldonload) {
                    oldonload();
                }
                func();
            }
        }
    }
    //call function after DOM ready
    addLoadEvent(function(){
        outdatedBrowser({
            bgColor: '#f25648',
            color: '#ffffff',
            lowerThan: 'transform',
            languagePath: ''
        })
    });
</script>
</body>
</html>
