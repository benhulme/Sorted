<style type="text/css">
  
  @media (max-width: 1199px){
    .modal-open #login-modal.modal{
      position:fixed!important;
    }
  }

</style>

<div class="content-container unit size3of4 lastUnit">
  <span id="articles-top"></span>
  <% include HeaderSmallTitle %>

  <div class="layout-container">

     <div id="blog-post-content" class="layout-content">

        <div class="layout-divider-dashed sidebar-divider"></div>

        <div class="row">   
             <% include Fonts %>
        </div>

        <br>
        <br>

        <div class="row">
          $Content
        </div>

        <br>
        <div class="layout-divider-dashed sidebar-divider"></div>
        <br>

        <div class="row">
          $SecondContent

          <% if $userAlreadyEntered %>
          
            <div id="draw-form-container" class="col-md-8 col-md-offset-2 nudge-container already-entered">
          
          <% else %>

            <div id="draw-form-container" class="col-md-8 col-md-offset-2 nudge-container">

          <% end_if %>

                  <h2 class="font-light text-center">Enter the draw.</h2>
                
                  <div id="draw-form-container__unsigned-view" style="display:none;">
                      <p class="text-center font-bold">To do this you just need to login or sign up.</p>
                         <div class="text-center">
                            <button class="btn btn-primary text-center" data-toggle="modal" data-target="#login-modal" >Log in</button>
                             <p class="_inline">&nbsp;&nbsp;or&nbsp;&nbsp;</p>
                            <button class="btn btn-primary text-center" data-toggle="modal" data-target="#signup-modal">Sign up</button>
                         </div>
                  </div>

                  <div id="draw-form-container__form" style="display:none;">
                    $DrawForm
                  </div>
          </div>
        </div>

        <br>
        <div class="layout-divider-dashed sidebar-divider"></div>
        <br>

        <div class="row">
          $ThirdContent
        </div>

        <br>
        <br>
      </div>

      <% include Top %>

  </div>
</div>







