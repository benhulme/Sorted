<% if $HeaderCopy %>
<div class="layout-header-medium">
<% else %>
<div class="layout-header-small">
<% end_if %>
	<div class="header-small-container">
	<% if $BackgroundImage.Width %>
		<div ng-if="data.BackgroundImage.Filename" class="header-background" cover-image="$BackgroundImage.Url"></div>
	<% else %>
		<div class="header-background" cover-image="assets/headers/yellow-background.jpg"></div>
	<% end_if %>
		<div class="header-small-opacity"></div>
		<div class="layout-container _relative">
			<div class="header-small-text _absolute">
				<div class="layout-content">
					<h1 sequence-order="1">$Title</h1>
					<% if $HeaderCopy %>
					<p class="header-subhead font-h5">$HeaderCopy</p>
					<% end_if %>
				</div>
			</div>
		</div>
	</div>
</div>
