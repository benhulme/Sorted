<div class="layout-container">
    <div class="row">
        <div class="col-md-8 col-xs-10 col-xs-offset-1 col-md-offset-2 text-center font-book font-semi-bold">
          $Description
        </div>
    </div>
    <br/>
    <div class="row posters">
        <% if $allResources %>
          <% loop $allResources %>
              <div class="col-md-4 col-xs-6">
                  <img src="$Thumbnail.Link">
                  <p class="font-book font-semi-bold"><a
                          href="$Media.Link">$Title</a></p>
              </div>
              <% if $MultipleOf(3) %>
                  <div class="clearfix hidden-xs hidden-sm"></div>
              <% end_if %>
              <% if $MultipleOf(2) %>
                  <div class="clearfix visible-xs visible-sm"></div>
              <% end_if %>
          <% end_loop %>
        <% end_if %>
    </div>
    <div class="row">
        <br>
        <p class="text-center">
        </p>
        </p>
    </div>
</div>


