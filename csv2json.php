<?php
/*
* CSV to JS converter for kiwisaver providers file
*/
ini_set("auto_detect_line_endings", true);
if (2 !== $argc) die ('Csv filename must be as parameter for this script');
$f = fopen($argv[1], 'r');

$csv = [];
while ($csv[] = fgetcsv($f)) {

}
$new_array = [];
//$header = $csv[0];
$header = ['id', 'scheme', 'fund', 'fee_invest_0', 'fee_invest_4500', 'fee_invest_30000', 'fee_trustee', 'fee_admin', 'fee_member', 'fee_infund', 'fee_min', 'ratio_aa_nz_au_s', 'ratio_aa_oss', 'ratio_aa_prop_nz', 'ratio_aa_prop_global', 'ratio_aa_alt_growth', 'ratio_aa_alt_income', 'ratio_aa_alt_other', 'ratio_aa_nzfi', 'ratio_aa_osfi', 'ratio_aa_cash', 'expense_before_tax', 'active', 'verified', 'ppn growth', 'risk_profile', 'aa_nz_au_s', 'aa_oss_s', 'aa_prop_nz', 'aa_prop_global', 'aa_alt_growth', 'aa_alt_income', 'aa_alt_other', 'aa_nzfi', 'aa_osfi', 'aa_cash', 'check', 'ppn_growth_2'];
foreach ($header as &$item) {
	$item = strtolower($item);
}
foreach ($csv as $key => $row) {
	if (!is_array($row))
	{
		continue;
	}
	if (count($row) !== count($header))
	{
		echo "wrong items count:\n";
		var_dump($row);
	}
	$new_array[$row[0]] = array_combine($header, preg_replace('/[^\-A-Za-z0-9\_\s\.\/]/', '', $row) );
}
unset($new_array['id']);
unset($new_array['']);
if (!json_encode($new_array, JSON_PRETTY_PRINT|JSON_NUMERIC_CHECK|JSON_BIGINT_AS_STRING|JSON_UNESCAPED_SLASHES|JSON_PARTIAL_OUTPUT_ON_ERROR ))
{
	var_dump($new_array);
	switch (json_last_error()){
		case JSON_ERROR_NONE:
    echo 'JSON_ERROR_NONE';
    break;
case JSON_ERROR_DEPTH:
    echo 'JSON_ERROR_DEPTH';
    break;
case JSON_ERROR_STATE_MISMATCH:
    echo 'JSON_ERROR_STATE_MISMATCH';
    break;
case JSON_ERROR_CTRL_CHAR:
    echo 'JSON_ERROR_CTRL_CHAR';
    break;
case JSON_ERROR_SYNTAX:
    echo 'JSON_ERROR_SYNTAX';
    break;
case JSON_ERROR_UTF8:
    echo 'JSON_ERROR_UTF8';
    break;
case JSON_ERROR_RECURSION:
    echo 'JSON_ERROR_RECURSION';
    break;
case JSON_ERROR_INF_OR_NAN:
    echo 'JSON_ERROR_INF_OR_NAN';
    break;
case JSON_ERROR_UNSUPPORTED_TYPE:
    echo 'JSON_ERROR_UNSUPPORTED_TYPE';
    break;
case JSON_ERROR_INVALID_PROPERTY_NAME:
    echo 'JSON_ERROR_INVALID_PROPERTY_NAME';
    break;
case JSON_ERROR_UTF16:
    echo 'JSON_ERROR_UTF16';
    break;
	}
}
file_put_contents('kiwisaver_providers.js','/* File updated at '.strftime('%I:%M %p %d/%m/%Y')." */\n". 'var fees_table = '.json_encode($new_array, JSON_PRETTY_PRINT|JSON_NUMERIC_CHECK|JSON_BIGINT_AS_STRING|JSON_UNESCAPED_SLASHES|JSON_PARTIAL_OUTPUT_ON_ERROR ).';');
