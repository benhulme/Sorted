<?php

if (!class_exists("Widget")) {
    return;
}

/**
 * @method Blog Blog()
 *
 * @property int $NumberOfPosts
 */
class BlogRecentCommentsPostsWidget extends Widget
{
    /**
     * @var string
     */
    private static $title = 'Recently Commented Posts';

    /**
     * @var string
     */
    private static $cmsTitle = 'Recently Commented Posts';

    /**
     * @var string
     */
    private static $description = 'Displays a list of recently commented blog posts.';

    /**
     * @var array
     */
    private static $db = array(
        'NumberOfPosts' => 'Int',
    );

    /**
     * @var array
     */
    private static $has_one = array(
        'Blog' => 'Blog',
    );

    /**
     * {@inheritdoc}
     */
    public function getCMSFields()
    {
        $this->beforeUpdateCMSFields(function ($fields) {
            /**
             * @var FieldList $fields
             */
            $fields->merge(array(
                DropdownField::create('BlogID', _t('BlogRecentPostsWidget.Blog', 'Blog'), Blog::get()->map()),
                NumericField::create('NumberOfPosts', _t('BlogRecentPostsWidget.NumberOfPosts', 'Number of Posts'))
            ));
        });

        return parent::getCMSFields();
    }

    /**
     * @return array
     */
    public function getPosts()
    {
        $blogIDs = [];
        $i = 1;
        foreach (GroupedList::create(Comment::get()->sort('Created', 'DESC'))->groupBy('ParentID') as $comment) {
            if ($i > $this->NumberOfPosts)
            {
                break;
            }

            $i++;

            $blogIDs[] = $comment->first()->ParentID;

        }
        $blog = $this->Blog();
        if ($blog) {
            return BlogPost::get()->byIDs($blogIDs)->sort('Created', 'DESC')->limit($this->NumberOfPosts);
        }

        return array();
    }
}

class BlogRecentCommentsPostsWidget_Controller extends Widget_Controller
{

}
