<h4 class="sidebar-heading font-light _align-center-xs-max">Recent comments</h4>
<% if $Posts %>
<% loop $Posts %>
<% if $Odd %>
<div class="row">
  <div class="col-sm-6 col-md-12 layout-col _no-float-md-above">
    <a class="sidebar-link _block _clear link-black-orange" href="$Link" vert-middle="sidebar-text-cell ">
      <div class="sidebar-thumb _left _block" aspect-ratio="16:9">
        <% if $ThumbnailImage %>
        <div class="_full-width _full-height" cover-image="$ThumbnailImage.Filename"></div>
        <% else_if $FeaturedImage %>
        <div class="_full-width _full-height" cover-image="$FeaturedImage.Filename"></div>
        <% end_if %>
    </div>
    <span class="sidebar-text _left _block">
        <div class="sidebar-link-container _relative">
          <div class="sidebar-text-table">
            <div class="sidebar-text-cell font-sm" >
              $Title
          </div>
      </div>
  </div>
</span>
</a>
</div>
<% end_if %>
<% if $Even %>
<div class="layout-divider-dashed sidebar-divider hidden-sm"></div>
<div class="col-sm-6 col-md-12 layout-col _no-float-md-above">
  <a class="sidebar-link _block _clear link-black-orange" href="$Link" vert-middle="sidebar-text-cell ">
    <div class="sidebar-thumb _left _block" aspect-ratio="16:9">
      <% if $ThumbnailImage %>
      <div class="_full-width _full-height" cover-image="$ThumbnailImage.Filename"></div>
      <% else_if $FeaturedImage %>
      <div class="_full-width _full-height" cover-image="$FeaturedImage.Filename"></div>
      <% end_if %>
  </div>
  <span class="sidebar-text _left _block">
      <div class="sidebar-link-container _relative">
        <div class="sidebar-text-table">
          <div class="sidebar-text-cell font-sm">
            $Title
        </div>
    </div>
</div>
</span>
</a>
</div>
</div>
<% if $Last != 1 %>
<div class="layout-divider-dashed sidebar-divider"></div>
<% end_if %>
<% end_if %>
<% end_loop %>
<% end_if %>
