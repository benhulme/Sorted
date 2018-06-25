<div class="row-full">
  <div class="header-full no-video" id="header_videoContent">
    <div class="header-placeholder" id="header_videoAction">
      <div class="sit-flex">
        <div class="header-placeholder-elements">
          <img src="/{$ThemeDir}/assets/images/moneyweek2017/moneyweek_header_moneyweek@2x.png" class="img-responsive center-block header-logo">
          <h1 class="larger text-center site-title">$HeaderTitle</h1>
          <img src="/{$ThemeDir}/assets/images/moneyweek2017/play_button@2x.png" class="img-responsive center-block header-play-button">
        </div>
      </div>
    </div>
  </div>
</div>

<% if $Message %>
  <div class="row-full">
    <div class="blade-full blade-background-grey">
      <div class="container blade-message">
          <div class="row">
            <div class="col-lg-12 text-center">
              $Message
            </div>
          </div>
      </div>
    </div>
  </div>
<% end_if %>

<div class="row-full">
  <div class="blade-full blade-background-white">
    <div class="container blade-debt">

      <div class="row">
        <div class="col-lg-12 text-center">
          <h1>$WhatDebtTitle<br><strong>Select below</strong></h1>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-12">
          <div class="accordian-wrap">

          <% loop $WhatDebts %>
            <div class="accordian-item accordian-collapse $CssStyle"
                id="<% if $Pos == 1 %>getsmeby<% else_if $Pos == 2 %>stress<% else %>possibilities<% end_if %>">
              <div class="accordian-item-head background-solid-$ColourStyle" ref="$Title"><div class="person"></div><span class="quote">$Title<button class="btn collapse-item"><span class="icon-chevron-up"></span></button></span></div>
              <div class="accordian-item-body">

                <!-- Related links LEFT -->
                <div class="column-left hidden-xs">
                  <ul class="related-links">
                    <li><a href="/tools/budgeting-tool" title="" target="_blank"><div class="icon-holder"><img src="/themes/sorted/assets/images/tools/tools-budgeting.svg" class="related-icon"></div>Budgeting tool</a></li>
                    <li><a href="/tools/debt-calculator" title="" target="_blank"><div class="icon-holder"><img src="/themes/sorted/assets/images/tools/tools-debts.svg" class="related-icon"></div>Debt calculator</a></li>
                    <li><a href="/tools/mortgage-calculator" title="" target="_blank"><div class="icon-holder"><img src="/themes/sorted/assets/images/tools/tools-mortgage.svg" class="related-icon"></div>Mortgage calculator</a></li>
                  </ul>
                </div>

                <div class="column-right background-gradient-$ColourStyle">
                  $Text
                  <div class="helpful-items-panels">
                    <div class="helpful-item">
                      <div class="helpful-item-preview">
                        <a href="$Link1" class="MW-moreinfo" target="_blank"><img src="$Image1.URL" class="helpful-item-image"></a>
                      </div>
                      <div class="helpful-item-summary">
                        <a href="$Link1" class="MW-moreinfo" target="_blank">$CTA1</a>
                      </div>
                    </div>
                    <div class="helpful-item">
                      <div class="helpful-item-preview">
                        <a href="$Link2" class="MW-moreinfo" target="_blank"><img src="$Image2.URL" class="helpful-item-image"></a>
                      </div>
                      <div class="helpful-item-summary">
                        <a href="$Link2" class="MW-moreinfo" target="_blank">$CTA2</a>
                      </div>
                    </div>
                  </div>
                  <div class="accordian-item-footer">
                    <button class="btn collapse-item"><span class="icon-chevron-up"></span></button>
                  </div>
                </div>

                <!-- Related links BOTTOM -->
                <div class="column-left visible-xs">
                  <ul class="related-links">
                    <li><a href="/tools/budgeting-tool" title="" target="_blank"><div class="icon-holder"><img src="/themes/sorted/assets/images/tools/tools-budgeting.svg" class="related-icon"></div>Budgeting tool</a></li>
                    <li><a href="/tools/debt-calculator" title="" target="_blank"><div class="icon-holder"><img src="/themes/sorted/assets/images/tools/tools-debts.svg" class="related-icon"></div>Debt calculator</a></li>
                    <li><a href="/tools/mortgage-calculator" title="" target="_blank"><div class="icon-holder"><img src="/themes/sorted/assets/images/tools/tools-mortgage.svg" class="related-icon"></div>Mortgage calculator</a></li>
                  </ul>
                  <div class="accordian-item-footer">
                    <button class="btn collapse-item"><span class="icon-chevron-up"></span></button>
                  </div>
                </div>

              </div>
            </div>
          <% end_loop %>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="row-full">
  <div class="blade-full blade-background-green-gradient">
    <div class="container blade-join">
      <div class="row">
        <div class="col-lg-6 col-sm-12 col-md-6 col-padding-right">
          <h1 class="visible-xs visible-sm">$ConversationTitle</h1>
          <img src="$ConversationImage.URL" class="img-responsive join-computer">
        </div>
        <div class="col-lg-6 col-sm-12 col-md-6 col-padding-left">
          <h1 class="hidden-xs hidden-sm">$ConversationTitle</h1>
          $ConversationText
          <p><a href="$ConversationLink" title="$ConversationCTA" target="_blank" id="communityMWBtn" class="btn-primary moneyweek">$ConversationCTA</a></p>
        </div>
      </div>
    </div>
  </div>
</div>

<% if $InitiativeTitle %>
<div class="row-full">
  <div class="blade-full blade-background-grey">
    <div class="container blade-resources">
      <div class="row">
        <div class="col-lg-12 text-center">
          <h1>$InitiativeTitle</h1>
          $InitiativeText
        </div>
      </div>
      <div class="row resource-items masked-resources is-masked" id="initiative_items">
        <% loop $Initiatives %>
          <div class="col-lg-3 col-md-4 col-sm-6 col-xs-6">
          <div class="resource-item">
            <div class="preview-picture">
              <a href="$Url" target="_blank"><img src="$Thumb.URL" alt=""></a>
            </div>
            <div class="preview-summary preview-initiative">
              <a href="$Url" target="_blank">$Title</a>
            </div>
          </div>
         </div>
        <% end_loop %>
      </div>

      <!--
      <div class="row">
        <div class="col-lg-12">
          <div class="load-more-container">
            <button class="btn load-more" data-panel="initiative_items"><span class="btn-label more"><span class="icon icon-chevron-down"></span>Show More&nbsp;</span><span class="btn-label hidden less"><span class="icon icon-chevron-up"></span>Show Less&nbsp;</span></button>
          </div>
        </div>
      </div>
      -->
    </div>
  </div>
</div>
<% end_if %>

<div class="row-full">
  <div class="blade-full blade-background-white">
    <div class="container blade-involved">
      <div class="row">
        <div class="col-lg-12 text-center">
          <h1>$WhoTitle</h1>
          $WhoText
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <ul class="involved-companies masked-resources is-masked" id="involved_companies">
          <% loop $Supporters %>
          <li><a href="$Url" target="_blank"><img src="$Logo.URL" alt="ANZ" class="company-logo"></a></li>
          <% end_loop %>

          </ul>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <div class="load-more-container">
            <button class="btn load-more" data-panel="involved_companies"><span class="btn-label more"><span class="icon icon-chevron-down"></span>Show More&nbsp;</span><span class="btn-label hidden less"><span class="icon icon-chevron-up"></span>Show Less&nbsp;</span></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="row-full">
  <div class="blade-full blade-background-grey">
    <div class="container blade-resources">
      <div class="row">
        <div class="col-lg-12 text-center">
          <h1>$ResourcesTitle</h1>
          $ResourcesText
        </div>
      </div>

      <div class="row resource-items masked-resources is-masked" id="resource_items">

        <% loop $ResourceLinks %>
          <div class="col-lg-3 col-md-4 col-sm-6 col-xs-6">
          <div class="resource-item">
            <div class="preview-picture">
              <a href="$Url" title="$CTA" target="_blank"><img src="$Thumb.URL" alt=""></a>
            </div>
            <div class="preview-summary">
              <p>$Title</p>
              <p class="download"><a class="download-link" href="$Url" title="$CTA" target="_blank">$CTA</a></p>
            </div>
          </div>
         </div>
        <% end_loop %>
      </div>

      <div class="row">
        <div class="col-lg-12">
          <div class="load-more-container">
            <button class="btn load-more" data-panel="resource_items"><span class="btn-label more"><span class="icon icon-chevron-down"></span>Show More&nbsp;</span><span class="btn-label hidden less"><span class="icon icon-chevron-up"></span>Show Less&nbsp;</span></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="row-full">
  <div class="blade-full reduce-bottom-padding blade-background-grey-slashes bg-grey-texture">
    <div class="container blade-footer">
      <div class="top text-center">
        <p><strong><span class="font-white lighter">Proudly brought to you by</span></strong><br>
        <br>
        <a href="https://www.cffc.org.nz/" target="_blank" title="Commission for Financial Capability"><img src="/{$ThemeDir}/assets/images/moneyweek2017/moneyweek_logo_commission_of_financial_capability@2x.png" class="img-responsive center-block moneyweek-logo-cofc"></a><br>
        <br>
        <img src="/{$ThemeDir}/assets/images/moneyweek2017/moneyweek_logo_moneyweek@2x.png" class="img-responsive center-block moneyweek-logo-moneyweek"></p>
      </div>
      <div class="bottom">
        <p class="pull-left"><a href="/{$ThemeDir}/assets/pdf/Money-Week-2017-terms-and-conditions.pdf" class="font-white lighter" target="_blank" title="Terms and conditions">Terms and conditions</a></p>
        <p class="pull-right"><a href="#" class="back-to-top font-white lighter" title="Back to top"><strong><span class="icon-chevron-up"></span>&nbsp;&nbsp;Back to top</strong></a></p>
      </div>
    </div>
  </div>
</div>




<!--MODALS-->

  <!--SIGN UP MODAL-->
  <div class="modal fade" id="signup-modal" tabindex="-1" role="dialog">
    <div class="modal-dialog  modal-lg">
      <div class="modal-content">
        <div class="login-modal-content">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <div class="sign-up-header row">
            <div class="col-md-12">
              <h2>Sign up</h2>
              <p class="font-xs sign-in-text pull-left">Already registered? <a analytics-on="click" analytics-event="registermodal" analytics-category="link" analytics-label="login" analytics-interaction-type="0"  data-dismiss="modal" data-toggle="modal" data-target="#login-modal">Log in</a> here.</p>
              <p class="pull-right required-information font-xs hidden-xs hidden-sm">Required information</p>

            </div>

          </div>

          <div class="row">
            <div class="col-md-12 sign-up-content">

              <div class="col-md-6 visible-xs visible-sm">
                <div class="row">
                  <div >
                    <h5>
                      About Sorted
                    </h5>
                    <p>
                      Think of Sorted as your financial personal trainer. We've got the tools you need to get financially fit. You can work through all the sections or go straight to the calculators.
                    </p>
                    <a ng-href="/about-us" analytics-on="click" analytics-event="registermodal" analytics-category="link" analytics-label="aboutsorted" analytics-interaction-type="0"  target="_blank" class="ui-link font-sm">FIND OUT MORE <span class="fa fa-chevron-right font-xs"></span></a>
                  </div>
                </div>
                <div class="row">
                  <p class="required-information font-xs">
                    Required information
                  </p>
                </div>
              </div>
              <div class="col-md-6">
                <form action="" class="sign-up-form" id="signup" method="POST">
                  <div class="field text required">
                    <label for="">Email address</label>
                    <div><input  name="Email" type="email"></div>
                  </div>
                  <div class="field text required">
                    <label for="">Enter a password</label>
                    <div>
                      <input id="Password" name="Password" type="password">
                      <div class="password-meter">
                        <div class="password-meter-message ">
                          <div class="password-bullet"></div><div class="password-bullet"></div><div class="password-bullet"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="field text required">
                    <label for="">Retype password</label>
                    <div>
                      <input name="Confirm_password" type="password">

                    </div>
                  </div>

                  <div class="layout-divider-dashed sidebar-divider "></div>

                  <div class="field text required">
                    <label for="">First Name</label>
                    <div><input name="FirstName" type="text"></div>
                  </div>

                  <div class="field text required">
                    <label for="">Last Name</label>
                    <div><input name="Surname" type="text"></div>
                  </div>
                  <div class="row birth-date">
                    <div class="col-md-6 date-month">
                      <div class="field dropdown required">
                        <label for="">Date of birth</label>
                        <div><select  name="month" id="">
                          <option value="" disabled selected hidden>Month</option>
                          <option value="01">January</option>
                          <option value="02">February</option>
                          <option value="03">March</option>
                          <option value="04">April</option>
                          <option value="05">May</option>
                          <option value="06">June</option>
                          <option value="07">July</option>
                          <option value="08">August</option>
                          <option value="09">September</option>
                          <option value="10">October</option>
                          <option value="11">November</option>
                          <option value="12">December</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6 date-year">
                      <div class="field text">
                        <label for="">&nbsp;</label>
                        <div><input name="year" placeholder="Year" type="text"></div>
                      </div>
                    </div>
                  </div>

                  <div class="field text">
                    <label for="">Mobile phone</label>
                    <div><input name="MobilPhone" type="tel"></div>
                  </div>


                  <div class=" field checkbox">
                    <input class="checkbox" type="checkbox" name="Subscription">
                    <label for="">Sign up to receive Sorted newsletter.</label>
                    <p class="font-xs sign-up-policy">We will not pass on your detail to anyone. <br>
                      View our <a href="/privacy-policy" analytics-on="click" analytics-event="registermodal" analytics-category="link" analytics-label="privacypolicy" analytics-interaction-type="0" target="_blank">Privacy Policy.</a>  </p>
                  </div>
                  <div class=" field checkbox">
                    <input class="checkbox" name="conditions" type="checkbox">
                    <label for="">I have read and agree to Sorted’s <a href="/terms-and-conditions" analytics-on="click" analytics-event="registermodal" analytics-category="link" analytics-label="termsandconditions" analytics-interaction-type="0" target="_blank">terms & conditions.</a></label>
                  </div>
                  <div class="Actions">
                    <div class="row">
                      <div class="col-md-6">
                        <input  name="submit"  type="submit" value="SIGN UP" analytics-on="click" analytics-event="registermodal" analytics-category="submit" analytics-interaction-type="0">
                      </div>
                      <div class="col-md-6">
                        <a data-dismiss="modal" class="ui-link cancel">cancel</a>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div class="col-md-6 hidden-sm hidden-xs">
                <div class="orange-box">
                  <h5>Registering for a free My Sorted account is easy.</h5>
                  <ul class="light-bulb-list">
                    <li>Save your tools for a quick and easy review at any time.</li>
                    <li>Save different versions of the tools to track your options</li>
                    <li>Access your tools and saved items from any computer or device just by logging in.</li>
                  </ul>
                </div>
                <div class="row">
                  <div class="col-md-10 col-md-offset-1">
                    <h5>
                      About Sorted
                    </h5>
                    <p>
                   Sorted lets you see your money situation in a new light, whether it's through tools, guides or helpful insights. You'll find everything you need to get ahead.
                    </p>
                    <a href="/about-us" analytics-on="click" analytics-event="registermodal" analytics-category="link" analytics-label="aboutsorted" analytics-interaction-type="0"  target="_blank" class="ui-link font-sm">FIND OUT MORE <span class="fa fa-chevron-right font-xs"></span></a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>

  <!--SIGN UP MODAL ENDS-->


  <!--LOG IN MODAL-->
  <div class="modal fade" id="login-modal" tabindex="-1" role="dialog">
    <div class="modal-dialog ">
      <div class="modal-content">
        <div class="login-modal-content">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h2>Log in</h2>
          <p class="font-xs sign-in-text">Don’t have an account? <a analytics-on="click" analytics-event="loginmodal" analytics-category="link" analytics-label="signup" analytics-interaction-type="0"  data-dismiss="modal" data-toggle="modal" data-target="#signup-modal">Sign up</a> for free here.</p>
          <form id="login-form" class="login-form"  method="POST">

            <div class="field text">
              <label for="">Email address</label>
              <div><input  name="Email" type="email"></div>
            </div>
            <div class="field text">
              <label for="">Password</label>
              <div><input  name="Password" type="password"></div>
            </div>


            <div class="field checkbox">
              <input class="checkbox" type="checkbox" name="Remember">
              <label for="">Remember me</label>

            </div>


            <div class="Actions">
              <div class="row">
                <div class="col-md-6">
                  <input  name="submit"  type="submit" value="LOg IN" analytics-on="click" analytics-event="loginmodal" analytics-category="submit" analytics-interaction-type="0">
                </div>
              </div>


            </div>

              <p id="ForgotPassword"><a href="Security/lostpassword"  target="_blank">Forgotten your password?</a></p>



          </form>

        </div>

      </div>
    </div>
  </div>
<!--LOG IN MODAL ENDS-->

  <!-- SAVE AS MODAL -->
  <div class="modal fade" id="save-as-modal" tabindex="-1" role="dialog">
    <div class="modal-dialog ">
      <div class="modal-content">
        <div class="login-modal-content">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h2>Save this tool</h2>
          <p class="font-xs sign-in-text">Tools are saved to your dashboard.</p>
          <form id="save-as-form" class="login-form">


            <div class="field text">
              <label for="">Name of your tool</label>
              <div><input id="save-as-title"  name="Title" type="title"></div>
              <p class="font-xx">You can edit this name to personalise it</p>
            </div>



            <div class="Actions">
              <div class="row">
                <div class="col-md-6">
                  <input  name="submit"  type="submit" value="SAVE">
                </div>
                <div class="col-md-6">
                  <a data-dismiss="modal" class="ui-link cancel">cancel</a>
                </div>
              </div>
            </div>


          </form>

        </div>

      </div>
    </div>
  </div>
  <!-- SAVE AS MODAL -->

  <!--ALERT MESSAGE-->
  <div class="alert alert-danger private-alert fade in" style="display: none">
    <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
    Your browser is currently in Private/Incognito mode. You'll need to exit this mode to log in to Sorted.
  </div>
