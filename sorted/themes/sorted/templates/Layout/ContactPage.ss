<div class="content-container unit size3of4 lastUnit">

  <% include HeaderSmallTitle %>

  <div class="layout-container">
    <div class="layout-divider-dashed sidebar-divider "></div>


    <div class="layout-content">
      <div class="row">
        <div class="col-md-8">
          <article>
            <div class="content">$FormattedContent</div>
          </article>
          <div class="contact-us-form">
            $Form
            $CommentsForm

          </div>
        </div>
        <div class="col-md-4 right-side hidden-sm">
          <% include RelatedLinks %>
        </div>
      </div>


    </div>
  </div>
</div>

<% include EmailSignup %>

