
<div class="nav-sticky">

  <div class="nav-tools">
    <div class="nav-logo _absolute">
      <a href="/" analytics-on="click" analytics-event="sortedlogo" analytics-category="navigation" analytics-interaction-type="1">
        <img class="_full-height" src="/themes/sorted/assets/images/logo.svg" />
      </a>
    </div>

    <button class="nav-search _absolute _no-border" analytics-on="click" analytics-event="search" analytics-category="navigation" analytics-interaction-type="1" analytics-label="toggle">
      <img class="_full-height" src="/themes/sorted/assets/images/search-icon.svg" />
    </button>

    <div class="nav-account _absolute" logged-in>
      <div id="unsigned-view" style="display: none;">
        <a class="nav-log-in _left" data-toggle="modal" data-target="#login-modal" >
          <img class="_full-height _left" src="/themes/sorted/assets/images/user-icon.svg" />
          <span class="nav-log-in-text font-sm _left _clear hidden-md hidden-xs hidden-sm">LOG IN</span>
        </a>
        <a class="btn btn-primary btn-small nav-sign-up hidden-md hidden-xs hidden-sm _left"  data-toggle="modal" data-target="#signup-modal">Sign up</a>
      </div>
      <div id="signed-view" style="display:none;">

        <div class="dropdown pull-right">
          <button class="member-dropdown" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" analytics-on="click" analytics-event="menu" analytics-category="navigation" analytics-interaction-type="1" analytics-label="open">
            <span class="member-greet">Hi <span class="member-name"></span></span>
            <span class="member-circle" ></span>
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
            <li><a href="/dashboard" analytics-on="click" analytics-event="menu" analytics-category="navigation" analytics-interaction-type="1" analytics-label="selectdashboard">My Dashboard</a></li>
            <li role="separator" class="divider"></li>
            <li><a href="/profile" analytics-on="click" analytics-event="menu" analytics-category="navigation" analytics-interaction-type="1" analytics-label="selectmyprofile">My Profile</a></li>
            <li role="separator" class="divider"></li>
            <li><a class="logout-button" href="#" analytics-on="click" analytics-event="menu" analytics-category="navigation" analytics-interaction-type="1" analytics-label="selectlogout">Log Out</a></li>
          </ul>
        </div>
      </div>

    </div>
  </div>

  <nav role="navigation" class="nav-main _align-center _full-width">

    <ul class="_inline-list">
      <li><a href="/guides" class="nav-link" analytics-on="click" analytics-event="guides" analytics-category="navigation" analytics-interaction-type="0"><span class="nav-link-span">GUIDES</span></a></li>
      <li><a href="/tools" class="nav-link" analytics-on="click" analytics-event="tools" analytics-category="navigation" analytics-interaction-type="0"><span class="nav-link-span">TOOLS</span></a></li>
      <li><a href="/must-reads" class="nav-link" target="_self" analytics-on="click" analytics-event="blog" analytics-category="navigation" analytics-interaction-type="0"><span class="nav-link-span">BLOG</span></a></li>
      <li><a href=" https://community.sorted.org.nz/" class="nav-link" analytics-on="click" analytics-event="community" analytics-category="community" analytics-interaction-type="0" target="_blank"><span class="nav-link-span">COMMUNITY</span></a></li>
    </ul>

  </nav>


</div>

<div class="nav-search-bar _hidden">
  <% if $SearchForm %>
    $SearchForm
  <% end_if %>
  <button type="button" class="_no-border nav-search-close"><span class="fa fa-close"></span></button>
</div>
