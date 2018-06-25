<%-- NOTE: Before including this, you will need to wrap the include in a with block  --%>
<% if $MoreThanOnePage %>
<div class="row">
  <div class="articles-pagination _clear">
    <div class="col-md-12 layout-col">
      <div class="_full-width">
        <% if $NotFirstPage %>
          <a class="font-sm font-black _left" href="{$PrevLink}"><span class="fa fa-chevron-left font-orange"></span> BACK</a>
        <% end_if %>

        <% if $NotLastPage %>
          <a class="font-sm font-black _right" href="{$NextLink}">NEXT <span class="fa fa-chevron-right font-orange"></span></a>
        <% end_if %>
      </div>
    </div>
  </div>
</div>
<% end_if %>
