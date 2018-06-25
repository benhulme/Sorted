<% if $VideoID %>
  <div class="layout-container about-video">
      <div class="row">
          <div class="col-md-10 col-md-offset-1">
            <p class="text-center">$Description</p>
          </div>

            <div class="col-md-6 col-md-offset-3">
                <div class="embed-responsive embed-responsive-16by9">

                    <iframe width="1280" height="720" class="embed-responsive-item"  src="https://www.youtube.com/embed/$VideoID?rel=0&amp;controls=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>
                </div>
            </div>

      </div>
  </div>
<% end_if %>
