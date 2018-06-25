'use strict';

$(document).ready(function() {

	$('#Form_CommentsForm #Form_CommentsForm_Comment').focus(function() {
		$('#Form_CommentsForm .hidden').removeClass('hidden');
    $('#Form_CommentsForm_action_doPostComment').removeClass('hidden');
	});


  $('#Form_CommentsForm_action_doPostComment').on('click', function(){

    if ($('#Form_CommentsForm_Name').val() == ''){
      $('#Form_CommentsForm_Name').val('anonymous');
    }
  })

});
