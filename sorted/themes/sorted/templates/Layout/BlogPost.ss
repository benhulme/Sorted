<span id="articles-top"></span>
<div id="blog-post" class="blog-entry content-container <% if $SideBarView %>unit size3of4<% end_if %>">

    <% include BlogHeader %>

    <div class="layout-container">

        <div class="layout-content">

            <div class="row">
                <div class="layout-row">
                    <div class="col-md-8">

                        <div class="articles-info _clear" >

                            <div class="ui-circle bg-fuschia _left">
                                <div class="ui-circle-inner">
                                    <div class="articles-day">$PublishDate.format(j)</div>
                                    <div class="articles-month">$PublishDate.format(M) $PublishDate.format(y)</div>
                                </div>
                            </div>

                            <div class="_left articles-info-text must-reads-info-text">
                                <div class="font-h4 articles-text-container">
                                    <a class="font-black" ng-href="/home/{{post.URLSegment}}">$Title</a>
                                </div>
                                <div class="font-xs articles-meta">
                                    Posted
                                    <% if $Credits %>
                                    <%t Blog.By "by" %>
                                    <% loop $Credits %><% if not $First && not $Last %>, <% end_if %><% if not $First && $Last %> and <% end_if %><% if $URLSegment %><a href="$URL">$Name.XML</a><% else %>$Name.XML<% end_if %><% end_loop %>
                                    <% end_if %>
                                    <% if $Tags.exists %>
                                    in
                                    <% loop $Tags.limit(3) %>
                                    <a class="ui-tag" href="$Link" title="$Title">$Title</a>
                                    <% end_loop %>
                                    <% end_if %>
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



                        <div class="layout-divider-dashed-medium blog-list-divider"></div>

                        <div class="social-and-fonts row">
                          <div class="col-xs-7 bubbles-container">
                            <% include Social %>
                          </div>
                          <div class="col-xs-5 bubbles-container">
                            <% include Fonts %>
                          </div>
                        </div>
                        <div id="blog-post-content">
                            $FormattedContent
                        </div>
                        <p>&nbsp;</p>
                        <div class="social-and-fonts row">
                          <div class="col-xs-12 bubbles-container bottom-bubbles">
                            <% include Social %>
                            <span>|&nbsp;</span>
                            <% if $Comments.exists %>
                              <a class="font-xs" href="{$Link}#comments-holder">
                                $Comments.count <%t Blog.Comments "Comments" %>
                              </a>
                            <% else %>
                              <a href="{$Link}#comments-holder " class="font-xs">
                                0 <%t Blog.Comments "Comments" %>
                              </a>
                            <% end_if %>
                          </div>
                        </div>

                        <div class="layout-divider-dashed-medium blog-list-divider "></div>
                        <% include BlogRelatedWidget %>

                        $CommentsForm
                        <%-- <% include CommentForm %> --%>
                        <%-- <% include BlogCommentWidget %> --%>

                    </div>

                    <div class="col-md-4 hidden-xs hidden-sm">
                        <% include BlogSideBar %>
                    </div>

                </div>
            </div>
            <% include Top %>


        </div>

    </div>

</div>

  <div class="visible-sm visible-xs">
      <% include BlogSideBar %>
  </div>
</div>

<% include EmailSignup %>
