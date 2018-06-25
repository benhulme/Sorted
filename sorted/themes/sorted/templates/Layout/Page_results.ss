<div class="content-container unit size3of4 search-result lastUnit">
   <span id="articles-top"></span>
   <div class="layout-header-small">
      <div class="header-small-container">
         <div class="header-background" cover-image="assets/Uploads/article-header-background.jpg"></div>
         <div class="header-small-opacity"></div>
         <div class="layout-container _relative">
            <div class="header-small-text _absolute">
               <div class="layout-content">
                   <% if $Query %>
                        <h1 sequence-order="1">You searched for &quot;{$Query}&quot;</h1>
                    <% end_if %>
                    <% if $Results.MoreThanOnePage %>
                    <div id="PageNumbers">
                        <p>Currently showing page $Results.CurrentPage of $Results.TotalPages</p>
                    </div>
                    <% else %>
                        <p>There are $Count $ResultsLabel.</p>
                    <% end_if %>
               </div>
            </div>
         </div>
      </div>
   </div>
   <div class="layout-container">
      <div class="layout-divider-dashed sidebar-divider "></div>
      <div class="row">
         <div class="col-md-8">
            <div class="visible-xs">
               <div class="dropdown filters-select _full-width">
                  <button class="dropdown-toggle form-control" dropdown type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">Filter Articles</button>
                  <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
                     <li>
                        <a class="dropdown-link _clear selected article-link-all">
                        <span class="filters-dd-icon _relative _inline-block _left">
                        <img src="/themes/sorted/assets/images/filters/search.svg" class="_full-width filters-image _absolute">
                        </span>
                        <span class="filters-dd-text _inline-block _left">All Results ($Count)</span>
                        </a>
                     </li>
                     <li>
                        <a id="SortedBlogPost" class="dropdown-link _clear article-link-search">
                        <span class="filters-dd-icon _relative _inline-block _left">
                        <img src="/themes/sorted/assets/images/filters/filters-latest.svg" class="_full-width filters-image _absolute">
                        </span>
                        <span class="filters-dd-text _inline-block _left">Articles ($ArticlesCount)</span>
                        </a>
                     </li>
                     <li>
                        <a id="GuidePage" class="dropdown-link _clear article-link-search">
                        <span class="filters-dd-icon _relative _inline-block _left">
                        <img src="/themes/sorted/assets/images/filters/filters-guides.svg" class="_full-width filters-image _absolute">
                        </span>
                        <span class="filters-dd-text _inline-block _left">Guides ($GuidesCount)</span>
                        </a>
                     </li>
                     <li>
                        <a id="ToolPage" class="dropdown-link _clear article-link-search">
                        <span class="filters-dd-icon _relative _inline-block _left">
                        <img src="/themes/sorted/assets/images/filters/all-tools.svg" class="_full-width filters-image _absolute">
                        </span>
                        <span class="filters-dd-text _inline-block _left">Tools ($ToolsCount)</span>
                        </a>
                     </li>
                  </ul>
               </div>
            </div>
            <div class="layout-container hidden-xs">
               <div class=" filters-content">
                  <div class="row">
                     <div class="col-md-12 layout-col">
                        <div class="row layout-row">
                           <div class="col-lg-12 layout-col _relative visible-sm visible-md visible-lg">
                              <a  class="filt-link _left _align-center article-link-all selected">
                                 <div class="filters-icon _relative">
                                    <img src="/themes/sorted/assets/images/filters/search.svg" class="_full-width filters-image _absolute">
                                 </div>
                                 <span class="_inline-block font-black font-sm filters-text">All Results ($Count)</span>
                              </a>
                              <a id="SortedBlogPost" class="filt-link _left article-link-search _align-center">
                                 <div class="filters-icon _relative">
                                    <img src="/themes/sorted/assets/images/filters/filters-latest.svg" class="_full-width filters-image _absolute">
                                 </div>
                                 <span class="_inline-block font-black font-sm filters-text">Articles ($ArticlesCount)</span>
                              </a>
                              <a id="GuidePage" class="filt-link _left _align-center article-link-search">
                                 <div class="filters-icon _relative">
                                    <img src="/themes/sorted/assets/images/filters/filters-guides.svg" class="_full-width filters-image _absolute">
                                 </div>
                                 <span class="_inline-block font-black font-sm filters-text">Guides ($GuidesCount)</span>
                              </a>
                              <a id="ToolPage" class="filt-link _left _align-center article-link-search">
                                 <div class="filters-icon _relative">
                                    <img src="/themes/sorted/assets/images/filters/all-tools.svg" class="_full-width filters-image _absolute">
                                 </div>
                                 <span class="_inline-block font-black font-sm filters-text">Tools ($ToolsCount)</span>
                              </a>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div class="row">
               <article>
                   <% if $Results %>
                        <ul id="SearchResults">
                            <% loop $Results %>


                            <div class="row blog-list-row" >

                                <div class="col-xs-12 layout-col article-line <% if $ClassName=="ToolBudgetCalculatorPage" %>ToolPage<% else %>$ClassName<% end_if %>">

                                    <div class="articles-info _clear">
                                        <div class="search-icon-container">
                                            <% if $ClassName=="SortedBlogPost" %>
                                                <img src="/themes/sorted/assets/images/filters/filters-latest.svg">
                                            <% else_if $ClassName=="GuidePage" %>
                                                <img src="/themes/sorted/assets/images/filters/filters-guides.svg">
                                            <% else_if $ClassName=="ToolPage" %>
                                                <img src="/themes/sorted/assets/images/filters/all-tools.svg">
                                            <% else_if $ClassName=="ToolBudgetCalculatorPage" %>
                                                <img src="/themes/sorted/assets/images/filters/all-tools.svg">
                                            <% else %>
                                                <img src="themes/sorted/assets/images/filters/filters-latest.svg">
                                            <% end_if %>

                                        </div>
                                        <div class="_left articles-info-text blog-list-info-text">
                                            <div class="font-h4 articles-text-container">
                                                <a class="font-black article-title-link font-medium" href="$Link" title="$Title">
                                                    <% if $MenuTitle %>
                                                    $MenuTitle
                                                    <% else %>
                                                    $Title
                                                    <% end_if %>
                                                </a>
                                            </div>
                                            <div class="font-xs articles-meta">
                                                <% if $SmartLink %>
                                                <a href="$SmartLink">$SmartLink</a>
                                                <% else %>
                                                <a href="$Link">$Link</a>
                                                <% end_if %>
                                            </div>
                                        </div>
                                    </div>


                                    <div class="articles-content blog-list-content">


                                        <div class="_elipsis articles-copy">
                                                <span class="edit-date">$LastEdited.format(j) $LastEdited.format(M) $LastEdited.format(Y)</span> - $Content.LimitWordCountXML
                                        </div>

                                        <div class="layout-divider-dashed-medium blog-list-divider"></div>

                                    </div>
                                </div>
                            <% end_loop %>
                        </ul>
                    <% else %>
                    <p>Sorry, your search query did not return any results.</p>
                    <% end_if %>
               </article>
               <% if $Results.MoreThanOnePage %>
                <div id="PageNumbers">
                    <div class="pagination">
                        <% if $Results.NotFirstPage %>
                            <a class="prev" href="$Results.PrevLink" title="View the previous page">&larr;</a>
                        <% end_if %>
                        <span>
                            <% loop $Results.Pages %>
                                <% if $CurrentBool %>
                                $PageNum
                                <% else %>
                                <a href="$Link" title="View page number $PageNum" class="go-to-page">$PageNum</a>
                                <% end_if %>
                            <% end_loop %>
                        </span>
                        <% if $Results.NotLastPage %>
                        <a class="next" href="$Results.NextLink" title="View the next page">&rarr;</a>
                        <% end_if %>
                    </div>
                    <p>Page $Results.CurrentPage of $Results.TotalPages</p>
                </div>
                <% end_if %>
            </div>
         </div>
         <div class="col-md-4 hidden-sm">
            <p>&nbsp;</p>
            <div class="bg-grey-lightest sidebar-container"><% include BlogRecentPostsWidget %>
            </div>
         </div>
      </div>
      <% include Top %>
   </div>
</div>
</div>

