<!DOCTYPE html>
<html lang="$ContentLocale">
<head>
	<% base_tag %>
	<title><% if $MetaTitle %>$MetaTitle<% else %>$Title<% end_if %> &raquo; $SiteConfig.Title</title>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE; Chrome=1">
	<meta name="viewport" content="width=device-width,  initial-scale=1.0">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	$MetaTags(false)
	<!--[if lte IE 9]>
	<script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
	<meta name="description" content="">
	<meta name="author" content="Paul Headington">
  	<title>Sorted Website</title>
  	<link rel="stylesheet" type="text/css" href="//cloud.typography.com/6773094/640348/css/fonts.css" />
	<!-- styles -->
	<!-- bower:css -->
	<link rel="stylesheet" href="bower_components/animate.css/animate.css" />
	<link rel="stylesheet" href="bower_components/hover/css/hover.css" />
	<link rel="stylesheet" href="bower_components/angularjs-slider/dist/rzslider.css" />
	<!-- endbower -->
	<!-- inject:css -->
	<link rel="stylesheet" href="/themes/sorted/assets/css/app.css">
	<!-- endinject -->
</head>
<body class="$ClassName<% if not $Menu(2) %> no-sidebar<% end_if %>" <% if $i18nScriptDirection %>dir="$i18nScriptDirection"<% end_if %>>

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
<!--[if lte IE 9]>
<script src="bower_components/es5-shim/es5-shim.js"></script>
<script src="bower_components/json3/lib/json3.min.js"></script>
<![endif]-->

<!-- scripts -->
<!-- bower:js -->
<script src="bower_components/jquery/dist/jquery.js"></script>
<script src="bower_components/angular/angular.js"></script>
<script src="bower_components/angular-animate/angular-animate.js"></script>
<script src="bower_components/angular-route/angular-route.js"></script>
<script src="bower_components/angular-sanitize/angular-sanitize.js"></script>
<script src="bower_components/angular-resource/angular-resource.js"></script>
<script src="bower_components/angular-cookies/angular-cookies.js"></script>
<script src="bower_components/angular-bootstrap/ui-bootstrap-tpls.js"></script>
<script src="bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/affix.js"></script>
<script src="bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/alert.js"></script>
<script src="bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/button.js"></script>
<script src="bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/carousel.js"></script>
<script src="bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/collapse.js"></script>
<script src="bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/dropdown.js"></script>
<script src="bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/tab.js"></script>
<script src="bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/transition.js"></script>
<script src="bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/scrollspy.js"></script>
<script src="bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/modal.js"></script>
<script src="bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/tooltip.js"></script>
<script src="bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/popover.js"></script>
<script src="bower_components/lodash/dist/lodash.js"></script>
<script src="bower_components/angular-socket-io/socket.js"></script>
<script src="bower_components/json3/lib/json3.js"></script>
<script src="bower_components/angular-mocks/angular-mocks.js"></script>
<script src="bower_components/gsap/src/uncompressed/TweenMax.js"></script>
<script src="bower_components/angular-touch/angular-touch.js"></script>
<script src="bower_components/angularjs-slider/dist/rzslider.js"></script>
<!-- endbower -->


 <!-- inject:login -->

 <script src="/themes/sorted/standalone/login.js"></script>

 <!-- endinject -->

<!-- inject:js -->

<script src="/themes/sorted/standalone/aspectRatio.js"></script>

<script src="/themes/sorted/standalone/coverImage.js"></script>

<script src="/themes/sorted/standalone/date.js"></script>

<script src="/themes/sorted/standalone/emailSignup.js"></script>

<script src="/themes/sorted/standalone/en-NZ.js"></script>

<script src="/themes/sorted/standalone/facebookShare.js"></script>

<script src="/themes/sorted/standalone/fontSize.js"></script>

<script src="/themes/sorted/standalone/form.js"></script>

<script src="/themes/sorted/standalone/navigation.js"></script>

<script src="/themes/sorted/standalone/popover.js"></script>

<script src="/themes/sorted/standalone/timeSpan-1.2.js"></script>

<script src="/themes/sorted/standalone/vertMiddle.js"></script>

<script src="/themes/sorted/standalone/widgets.js"></script>

<script src="/themes/sorted/standalone/calculators/_sorted-constants.js"></script>

<script src="/themes/sorted/standalone/calculators/_sorted_super_class.js"></script>

<script src="/themes/sorted/standalone/calculators/debt.js"></script>

<script src="/themes/sorted/standalone/calculators/event_money_planner.js"></script>

<script src="/themes/sorted/standalone/calculators/goals_worksheet.js"></script>

<script src="/themes/sorted/standalone/calculators/investment_planner.js"></script>

<script src="/themes/sorted/standalone/calculators/investment_recommender.js"></script>

<script src="/themes/sorted/standalone/calculators/kiwisaver.js"></script>

<script src="/themes/sorted/standalone/calculators/kiwisaver_fees.js"></script>

<script src="/themes/sorted/standalone/calculators/kiwisaver_providers.js"></script>

<script src="/themes/sorted/standalone/calculators/money_personality.js"></script>

<script src="/themes/sorted/standalone/calculators/money_planner.js"></script>

<script src="/themes/sorted/standalone/calculators/mortgage_manager.js"></script>

<script src="/themes/sorted/standalone/calculators/mortgage_repayment.js"></script>

<script src="/themes/sorted/standalone/calculators/net-worth.js"></script>

<script src="/themes/sorted/standalone/calculators/retirement.js"></script>

<script src="/themes/sorted/standalone/calculators/risk_recommender.js"></script>

<script src="/themes/sorted/standalone/calculators/savings.js"></script>

<script src="/themes/sorted/standalone/calculators/sort_me.js"></script>

<script src="/themes/sorted/standalone/calculators/sorted-constants.js"></script>

<script src="/themes/sorted/standalone/calculators/sorted_super_class.js"></script>

<!-- endinject -->

</body>
</html>
