<span id="articles-top"></span>
<div class="blog-entry content-container <% if $SideBarView %>unit size3of4<% end_if %>">

    <div class="layout-header">

        <div class="header-container header-standard">

            <div class="header-background" cover-image="/$HeaderBackgroundImage.Filename"></div>

            <div class="layout-container _relative">

                <div class="header-standard-copy _absolute _full-width">

                    <div class="row">

                        <div class="layout-col col-sm-7 col-md-6 _full-height">

                            <div class="layout-content">
                                <h1 sequence-order="1">$Title</h1>
                                <p class="header-subhead font-h5">$HeaderCopy</p>
                            </div>

                        </div>

                    </div>

                </div>

                <div class="header-foreground-layout _full-width _absolute">
                    <div class="header-foreground-container">
                        <img class="header-foreground-image" src="/$HeaderImage.Filename" />
                    </div>
                </div>

            </div>

        </div>

    </div>

    <div class="visible-xs">
        <div class="dropdown filters-select _full-width">
            <button class="dropdown-toggle form-control" dropdown type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">Filter Articles</button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
                <li>
                    <% if $CurrentCategory || $CurrentTag || $ArchiveYear %>
                    <a href="/must-reads" class="dropdown-link _clear">
                        <% else %>
                        <a href="/must-reads" class="dropdown-link _clear selected">
                            <% end_if %>
                            <span class="filters-dd-icon _relative _inline-block _left">
                                <img src="/themes/sorted/assets/images/filters/filters-latest.svg" class="_full-width filters-dd-image _absolute" />
                            </span>
                            <span class="filters-dd-text _inline-block _left">Latest Posts</span>
                        </a>
                    </li>
                    <% loop $BlogCategories %>
                    <li>
                        <% if $Top.CurrentCategory.Title == $Title %>
                        <a href="$Link" class="dropdown-link _clear selected">
                            <% else %>
                            <a href="$Link" class="dropdown-link _clear">
                                <% end_if %>
                                <span class="filters-dd-icon _relative _inline-block _left">
                                    <% if $ID == 1 %>
                                    <img src="/themes/sorted/assets/images/filters/filters-budgeting.svg" class="_full-width filters-dd-image _absolute" />
                                    <% end_if %>
                                    <% if $ID == 2 %>
                                    <img src="/themes/sorted/assets/images/filters/filters-debt.svg" class="_full-width filters-dd-image _absolute" />
                                    <% end_if %>
                                    <% if $ID == 3 %>
                                    <img src="/themes/sorted/assets/images/filters/filters-home.svg" class="_full-width filters-dd-image _absolute" />
                                    <% end_if %>
                                    <% if $ID == 4 %>
                                    <img src="/themes/sorted/assets/images/filters/filters-protecting.svg" class="_full-width filters-dd-image _absolute" />
                                    <% end_if %>
                                    <% if $ID == 5 %>
                                    <img src="/themes/sorted/assets/images/filters/filters-kiwisaver.svg" class="_full-width filters-dd-image _absolute" />
                                    <% end_if %>
                                    <% if $ID == 6 %>
                                    <img src="/themes/sorted/assets/images/filters/filters-investments.svg" class="_full-width filters-dd-image _absolute" />
                                    <% end_if %>
                                </span>
                                <span class="filters-dd-text _inline-block _left">$Title</span>
                            </a>
                        </li>
                        <% end_loop %>
                    </ul>
                </div>
            </div>


            <div class="layout-container hidden-xs">
                <div class="layout-content filters-content">
                    <div class="row">
                        <div class="col-md-12 layout-col">
                            <h5 class="font-grey filters-heading">Filter Articles</h5>

                            <div class="row layout-row">

                                <div class="col-lg-12 layout-col _relative visible-sm visible-md visible-lg">

                                    <% if $CurrentCategory || $CurrentTag || $ArchiveYear %>
                                    <a href="/must-reads" class="filters-link _left _align-center">
                                        <% else %>
                                        <a href="/must-reads" class="filters-link _left _align-center selected">
                                            <% end_if %>
                                            <div class="filters-icon _relative">
                                                <img src="/themes/sorted/assets/images/filters/filters-latest.svg" class="_full-width filters-image _absolute" />
                                            </div>
                                            <span class="_inline-block font-black font-sm filters-text">Latest<br />Posts</span>
                                        </a>

                                        <% loop $BlogCategories %>

                                        <% if $Top.CurrentCategory.Title == $Title %>
                                        <a href="$Link" class="filters-link _left _align-center selected">
                                            <% else %>
                                            <a href="$Link" class="filters-link _left _align-center">
                                                <% end_if %>

                                                <div class="filters-icon _relative">
                                                    <% if $ID == 1 %>
                                                    <img src="/themes/sorted/assets/images/filters/filters-budgeting.svg" class="_full-width filters-image _absolute" />
                                                    <% end_if %>
                                                    <% if $ID == 2 %>
                                                    <img src="/themes/sorted/assets/images/filters/filters-debt.svg" class="_full-width filters-image _absolute" />
                                                    <% end_if %>
                                                    <% if $ID == 3 %>
                                                    <img src="/themes/sorted/assets/images/filters/filters-home.svg" class="_full-width filters-image _absolute" />
                                                    <% end_if %>
                                                    <% if $ID == 4 %>
                                                    <img src="/themes/sorted/assets/images/filters/filters-protecting.svg" class="_full-width filters-image _absolute" />
                                                    <% end_if %>
                                                    <% if $ID == 5 %>
                                                    <img src="/themes/sorted/assets/images/filters/filters-kiwisaver.svg" class="_full-width filters-image _absolute" />
                                                    <% end_if %>
                                                    <% if $ID == 6 %>
                                                    <img src="/themes/sorted/assets/images/filters/filters-investments.svg" class="_full-width filters-image _absolute" />
                                                    <% end_if %>
                                                </div>
                                                <span class="_inline-block font-black font-sm filters-text">$Title</span>
                                            </a>

                                            <% end_loop %>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div class="layout-container">

                        <div class="layout-content">

                            <div class="row">
                                <div class="layout-row">
                                    <div class="col-md-8">
                                        <div class="row">

                                            <div class="col-xs-12 layout-col">
                                                <h2 class="blog-list-heading font-h2 font-light _align-center-xs-max">

                                                    <% if $ArchiveYear %>
                                                    <%t Blog.Archive 'Archive' %>:
                                                    <% if $ArchiveDay %>
                                                    $ArchiveDate.Nice
                                                    <% else_if $ArchiveMonth %>
                                                    $ArchiveDate.format('F, Y')
                                                    <% else %>
                                                    $ArchiveDate.format('Y')
                                                    <% end_if %>
                                                    <% else_if $CurrentTag %>
                                                    $CurrentTag.Title
                                                    <% else_if $CurrentCategory %>
                                                    $CurrentCategory.Title
                                                    <% else %>
                                                    Latest posts
                                                    <% end_if %>

                                                </h2>
                                                <div class="layout-divider-dashed-medium blog-list-divider hidden-xs"></div>
                                            </div>

                                        </div>

                                        <% if $FeaturedBlogPosts.Exists && $FeaturedBlogPosts.First %>
                                        <% with $FeaturedBlogPosts.First %>
                                        <% include FeaturedPostSummary %>
                                        <% end_with %>
                                        <% end_if %>
                                        <% if $PaginatedList.Exists %>
                                        <% loop $PaginatedList %>
                                        <% include PostSummary %>
                                        <% end_loop %>
                                        <% else %>
                                        <% if $FeaturedBlogPosts.Exists %>
                                        <p><%t Blog.NoUnfeaturedPosts 'There are no non-featured posts' %></p>
                                        <% else %>
                                        <p><%t Blog.NoPosts 'There are no posts' %></p>
                                        <% end_if %>
                                        <% end_if %>


                                        <% with $PaginatedList %>
                                        <% include Pagination %>
                                        <% end_with %>

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


