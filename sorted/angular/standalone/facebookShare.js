// Facebook sharing
$('.fb-sharer').click(function(e) {
	e.preventDefault();
	window.open($(this).attr('href'), 'fbShareWindow', 'height=450, width=550, top=' + ($(window).innerHeight() / 2 - 275) + ', left=' + ($(window).innerWidth() / 2 - 225) + ', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
	return false;
});