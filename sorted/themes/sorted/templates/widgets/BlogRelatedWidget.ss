<% if $RelatedPages %>

    <div class="layout-container">
        <h2 class="font-light related-header">Related Content</h2>

            <div class="row">
                <div class="layout-row">

                    <% loop $RelatedPages %>
                    <div class="col-xs-12 col-md-6 articles-column">

                        <a href="$smartLink" class="related-link">
                            <% if $ThumbnailImage %>
                            <div class="articles-thumbnail">
                              <img src="$ThumbnailImage.Filename" alt>
                            </div>
                            <% end_if %>

                        </a>
                        <a href="$smartLink" class="related-link">
                          <h4 class="font-light font-h4 related-title _clear">

                              <% if $ClassName == "ToolPage" %>
                                <div class="related-tool-icon-container">
                                  <img src="{$BaseHref}$CalcIcon.Filename">
                                </div>
                              <% end_if %>
                              <span class="_inline-block related-title-text _le">$Title</span>
                          </h4>
                        </a>
                          <div class="_elipsis related-copy" num-lines="2">$ShortCopy</div>



                        <a href="$smartLink" class="ui-link font-sm articles-more">
                          <% if $ClassName == "ToolPage" %>
                            Get Started
                          <% else %>
                            Read More
                          <% end_if %>


                          <span class="fa fa-chevron-right font-xs"></span>
                        </a>

                    </div>
                    <% end_loop %>

                </div>
            </div>
        <div class="layout-divider-dashed-medium blog-list-divider hidden-xs"></div>
    </div>
<% end_if %>
