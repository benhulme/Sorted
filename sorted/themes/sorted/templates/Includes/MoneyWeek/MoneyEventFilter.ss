<script id="list" type="text/x-handlebars-template">
    <option value="any">Any</option>
    {{#each this}}
      <option value="{{this}}">{{this}}</option>
    {{/each}}
</script>


<div class="filter">
    <div class="layout-container">
        <form action="">
          <div class="row">
            <div class="col-md-3">
              <div class="field dropdown">
                  <label>Choose location</label>
                  <select name="" id="location-dropdown" class="dropdown">

                  </select>
              </div>
            </div>
            <div class="col-md-3">
                <div class="field dropdown">
                    <label>Topic</label>
                    <select name="" id="topic-dropdown" class="dropdown"></select>
                </div>
            </div>
            <div class="col-md-3">
                <div class="field dropdown">
                    <label>Date</label>
                    <select name="" id="time-dropdown" class="dropdown"></select>
                </div>
            </div>
            <div class="col-md-3">
                <div class="field dropdown">
                    <label>Event type</label>
                    <select name="" id="event-dropdown" class="dropdown"></select>
                </div>
            </div>
        </div>
        </form>
        <div class="row">
            <div class="col-md-12">
                <p class="text-center">
                    <a class="btn btn-primary" id="reset" href="#">Reset</a>
                </p>
            </div>
        </div>
    </div>
</div>



