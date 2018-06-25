/**
 * Created by stanislavk on 9/03/2016.
 */
(function(){

  $(document).ready(function(){
    $('.article-link-search').on('click', function(){
      var filter = $(this).attr('id');
      clearFilter();
      $(this).addClass('selected');
      $('.article-line').not('.'+filter).hide();
    });

    var clearFilter = function (){
      $('.filt-link').removeClass('selected');
      $('.article-line').show();

    };

    $('.article-link-all').on('click', function(){
      clearFilter();
      $(this).addClass('selected');

    })
  })

}());
