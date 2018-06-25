<div class="row blog-list-row">

    <div class="col-xs-12 layout-col">

        <div class="articles-info _clear">
            <div class="ui-circle bg-fuschia _left">
                <div class="ui-circle-inner">
                    <div class="articles-day">$PublishDate.format(j)</div>
                    <div class="articles-month">$PublishDate.format(M) $PublishDate.format(y)</div>
                </div>
            </div>
            <div class="_left articles-info-text blog-list-info-text">
                <div class="font-h4 articles-text-container">
                    <a class="font-black article-title-link" href="$Link" title="<%t Blog.ReadMoreAbout "Read more about '{title}'..." title=$Title %>">
                        <% if $MenuTitle %>$MenuTitle
                        <% else %>$Title<% end_if %>
                        <% if $IsVideoPost %> <img src="themes/sorted/assets/images/video-icon.png" class="articles-video-icon hidden-xs" /><% end_if %>
                    </a>
                </div>
                <div class="font-xs articles-meta">
                    Posted
                    <% if $Credits %>
                    <%t Blog.By "by" %>
                        <% loop $Credits %><% if not $First && not $Last %>, <% end_if %><% if not $First && $Last %> and <% end_if %><% if $URLSegment %>$Name.XML<% else %>$Name.XML<% end_if %><% end_loop %>
                    <% end_if %>
                    <span class="hidden-xs">
                        <% if $Tags.exists %>
                        in
                        <% loop $Tags.limit(3) %>
                        <a class="ui-tag" href="$Link" title="$Title">$Title</a>
                        <% end_loop %>
                        <% end_if %>
                    </span>
                    |
                    <% if $Comments.exists %>
                    <a href="{$Link}#comments-holder">
                        $Comments.count <%t Blog.Comments "Comments" %>
                    </a>
                    <% else %>
                    <a href="{$Link}#comments-holder">
                        0 <%t Blog.Comments "Comments" %>
                    </a>
                    <% end_if %>
                </div>
            </div>
        </div>


        <div class="articles-content blog-list-content">
            <% if $FeaturedImage %>
            <a class="_block _relative" href="$Link" aspect-ratio="16:9">
                <div class="articles-thumbnail _full-height" cover-image="$FeaturedImage.Filename"></div>
            </a>
            <% else_if $ThumbnailImage %>
            <a class="_block _relative" href="$Link">
                <img src="$ThumbnailImage.Filename" class="_full-width-max" />
            </a>
            <% end_if %>

            <div class="_elipsis articles-copy" num-lines="4">
                <% if $Summary %>
                <p>
                    <% if $IsVideoPost %> <img src="themes/sorted/assets/images/video-icon.png" class="articles-video-icon _hidden-sm-above" /><% end_if %>
                    $Summary
                    <% else %>
                    <p>
                    <% if $IsVideoPost %> <img src="themes/sorted/assets/images/video-icon.png" class="articles-video-icon _hidden-sm-above" /><% end_if %>
                        $Excerpt
                        <% end_if %>
                    </p>
                </div>
                <a href="$Link" class="ui-link font-sm articles-more">Read More <span class="fa fa-chevron-right font-xs"></span></a>
            </div>

            <div class="layout-divider-dashed-medium blog-list-divider"></div>

        </div>
    </div>

