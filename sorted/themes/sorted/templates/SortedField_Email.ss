
    <div class="col-xs-12 col-md-6">
        <div id="$Name" class="<% if $extraClass %> $extraClass<% end_if %>">
            $Field
            <label class="labels-subline" for="$ID">$Title</label>
            <% if $Message %><span class="message $MessageType">$Message</span><% end_if %>
            <% if $Description %><span class="description">$Description</span><% end_if %>
        </div>

    </div>

</div>
