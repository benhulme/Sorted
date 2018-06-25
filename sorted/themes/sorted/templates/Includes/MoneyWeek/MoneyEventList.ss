<script id="event" type="text/x-handlebars-template">
    {{#each this}}
    <div class="event">
        <div class="layout-container">
            <div class="row">
                <div class="col-md-8 col-xs-12 event-container">
                    <div class="icon-container">
                        <img src="{{iconUrl Topic}}" alt="">
                    </div>
                    <div class="event-details">
                        <h2>
                            {{EventName}}
                        </h2>
                        <p>{{EventType}}</p>
                        <p class="type">
                            {{Company}}
                        </p>
                        <p>
                            {{Description}}
                        </p>
                        <p>
                            <a target="_blank" class="btn btn-primary" href="{{FBEventUrl}}">more details</a>
                        </p>
                    </div>
                </div>
                <div class="col-md-4 col-xs-12 event-image">
                    <img src="{{ImageURL}}" alt="">
                </div>
            </div>
        </div>
    </div>

    {{/each}}
</script>

<div class="event-list"></div>
<p class="text-center">
    <br>
    <a class="btn btn-primary show-more" href="#">Show More</a>
    <br>
</p>






