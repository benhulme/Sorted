<% if $CommentsEnabled %>
    <div id="$CommentHolderID" class="comments-holder-container">

        <div class="row">
            <div class="col-xs-12">
                <h2 class="font-light">Comment<% if $PagedComments.Count != 1 %>s<% end_if%> ($PagedComments.Count)</h2>
            </div>
        </div>

        <% if $AddCommentForm %>

        <% if $canPostComment %>

        <% if $ModeratedSubmitted %>
        <p id="{$CommentHolderID}_PostCommentForm_error" class="message good"><% _t('CommentsInterface_ss.AWAITINGMODERATION', 'Your comment has been submitted and is now awaiting moderation.') %></p>
        <% end_if %>
        $AddCommentForm
        <% else %>
        <p>
            <% _t('CommentsInterface_ss.COMMENTLOGINERROR', 'You cannot post comments until you have logged in') %>
            <a href="Security/login?BackURL={$Parent.Link}" title="<% _t('CommentsInterface_ss.LOGINTOPOSTCOMMENT', 'Login to post a comment') %>">
                <% _t('CommentsInterface_ss.COMMENTPOSTLOGIN', 'Login Here') %>
            </a>.
        </p>
        <% end_if %>

        <% else %>
        <p><% _t('CommentsInterface_ss.COMMENTSDISABLED', 'Posting comments has been disabled') %>.</p>

        <% end_if %>

        <div class="comments-holder">
            <% if $PagedComments %>
            <ul class="comments-list root-level">
                <% loop $PagedComments %>
                <li class="comment $EvenOdd<% if FirstLast %> $FirstLast <% end_if %> $SpamClass">
                    <% include CommentsInterface_singlecomment %>
                </li>
                <% end_loop %>
            </ul>
            <% with $PagedComments %>
            <% include CommentPagination %>
            <% end_with %>
            <% end_if %>

            <p class="no-comments-yet"<% if $PagedComments.Count %> style='display: none' <% end_if %> ><% _t('CommentsInterface_ss.NOCOMMENTSYET','No one has commented on this page yet.') %></p>

        </div>

        <% if $DeleteAllLink %>
        <p class="delete-comments">
            <a href="$DeleteAllLink">
                <% _t('CommentsInterface_ss.DELETEALLCOMMENTS','Delete all comments on this page') %>
            </a>
        </p>
        <% end_if %>

    </div>
<% end_if %>
