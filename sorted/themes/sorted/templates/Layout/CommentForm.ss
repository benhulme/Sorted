<div id="form-comment">

    <form>

        <%-- <div class="form-label-group row">
            <div class="col-xs-12">
                <label class="sr-only" for="form-message">Message</label>
                <textarea class="form-control" id="form-message" rows="5" placeholder="Post your comment"></textarea>
            </div>
        </div> --%>

        <div class="form-label-group row hidden">

            <div class="col-xs-12 col-md-6">
                <input type="password" class="form-control" id="form-name" placeholder="Name">
                <label for="form-name" class="labels-subline">If left bank, 'anonymous' will be used</label>
            </div>

            <div class="col-xs-12 col-md-6">
                <input type="email" class="form-control" id="form-email" placeholder="Email address" required>
                <label for="form-email" class="labels-subline">Your email address will not be published</label>
            </div>

        </div>

        <div class="form-label-group row hidden">
            <div class="col-xs-12">
                <button type="submit" class="btn btn-primary">Post Comment</button>
            </div>
        </div>

    </form>

</div>
