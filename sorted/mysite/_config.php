<?php

global $project;
$project = 'mysite';

global $databaseConfig;
$databaseConfig = '(databasename)';

require_once("conf/ConfigureFromEnv.php");

if ('cffc-akl-lws-a01' === gethostname() OR 'cffc-akl-lws-a02' === gethostname())
{


	Email::setAdminEmail('Sorted.org.nz <no-reply@sorted.org.nz>');
//    Director::setBaseURL('http://sorted.org.nz/');
    Session::set_cookie_domain('sorted.org.nz');

}

	ini_set('display_errors', 0);
	error_reporting(E_ALL & ~E_WARNING & ~E_NOTICE);

i18n::set_locale('en_GB');

LeftAndMain::require_javascript('mysite/javascript/DisablePreview.js');
LeftAndMain::require_css('mysite/css/DisablePreview.css');

HtmlEditorConfig::get('cms')->removeButtons('tablecontrols');

HtmlEditorConfig::get('cms')->setOption('extended_valid_elements', 'img[class|src|alt|title|hspace|vspace|width|height|align|onmouseover|onmouseout|name|usemap|data*],iframe[src|name|width|height|align|frameborder|marginwidth|marginheight|scrolling],object[width|height|data|type],param[name|value],map[class|name|id],area[shape|coords|href|target|alt],savings-nudge[type]');

HtmlEditorConfig::get('cms')->enablePlugins(array(
	'nudge' => '../../../mysite/javascript/nudge/nudge_plugin.js',
	'tip' => '../../../mysite/javascript/tip/tip_plugin.js',
  'youTube' => '../../../mysite/javascript/youTube/youTube.js'
	));

HtmlEditorConfig::get('cms')->insertButtonsAfter('fullscreen', 'nudge');
HtmlEditorConfig::get('cms')->insertButtonsAfter('fullscreen', 'youTube');
HtmlEditorConfig::get('cms')->insertButtonsAfter('fullscreen', 'tip');

FulltextSearchable::enable(array('SiteTree'));

Director::set_environment_type("dev");

//HybridSessionStore::init("546453lkj6k345h6jk345hk6345h6g365");
