<div class="layout-header-small">
    <div class="header-small-container">
        <!-- header-blog, header-small-opacity  -->
        <% if $BackgroundImage.Width %>
        <div class="header-background" cover-image="$BackgroundImage.Url"></div>
        <% else %>
        <div class="header-background" cover-image="assets/headers/blogpost-header.jpg"></div>
        <% end_if %>
        <div class="header-small-opacity"></div>
        <div class="layout-container _relative">
            <div class="header-small-text _absolute">
                <div class="layout-content">
                    <% include BlogBreadCrumbs %>
                </div>
            </div>
        </div>
    </div>
</div>