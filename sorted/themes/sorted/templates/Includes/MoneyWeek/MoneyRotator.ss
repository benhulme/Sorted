<div class="money-rotator">
    <div class="layout-container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <h3 class="text-center">
                    See who’s involved
                </h3>
                <p class="text-center">
                    Check out some of the organisations and community groups involved in Money Week.                </p>
            </div>
        </div>
        <div class="row slider-container">
            <div class="controlls">
                <button id="left"> < </button>
                <button id="right"> > </button>
            </div>

            <div class="slider-list">
                <% if $Partners %>
                  <% loop $Partners %>
                      <div class="col-md-3 col-xs-6 slide"><img src="$Logo.Link" alt=""></div>
                  <% end_loop %>
                <% end_if%>
            </div>

        </div>
        <div class="row ">
            <div class="col-md-12 text-center">
                <p >
                    Want to get involved?
                </p>
                <br>
                <a href="/moneyweek/run-an-event" class="btn btn-primary">run an event</a>
            </div>
        </div>


    </div>
</div>

