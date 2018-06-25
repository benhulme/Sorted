<?php
class Page extends SiteTree {


}
class Page_Controller extends ContentController {

	private static $allowed_actions = array (
		'SearchForm'
	);

	public function init() {
		parent::init();
		// You can include any CSS or JS required by your project here.
		// Injecting CSRF token into HTML
		Requirements::customScript( 'var $_gah2Anoh = "'. Csrf::generate() . '";' );
		// See: http://doc.silverstripe.org/framework/en/reference/requirements
	}

	public function SearchForm() {
			if($this->owner->request && $this->owner->request->getVar('Search')) {
				$searchText = $this->owner->request->getVar('Search');
			}

			$searchField = new TextField('Search', false, $searchText);
			$searchField->setAttribute('placeholder','Enter your search...');
			$searchField->addExtraClass('_no-border _full-width _full-height nav-search-input');

			$fields = new FieldList(
				$searchField
			);

			$go = new FormAction('results', _t('SearchForm.GO', 'Go'));
			$go->addExtraClass('hidden');

			$actions = new FieldList(
				$go
			);
			$form = new SearchForm($this->owner, 'SearchForm', $fields, $actions);
			$form->classesToSearch(FulltextSearchable::get_searchable_classes());
			$form->setPageLength(1000);

			return $form;
	}
	

		/**
	 * Process and render search results.
	 *
	 * @param array $data The raw request data submitted by user
	 * @param SearchForm $form The form instance that was submitted
	 * @param SS_HTTPRequest $request Request generated for this action
	 */
	public function results($data, $form, $request) {

		//if($form->getSearchQuery() != 'test'){

		$form->getResults()->setPageLength(0);
		$ArticlesCount = 0;
		$GuidesCount = 0;
		$ToolsCount = 0;
		$count = $form->getResults()->Totalitems();

		$results = $form->getResults()->sort('ClassName Desc');

		//var_dump($results);
		//getRequest()
		//exit();


		foreach($results as $item){
				switch($item->ClassName){
						case "ToolPage":
						case "ToolBudgetCalculatorPage":
								$ToolsCount++;
						break;
						case "GuidePage":
								$GuidesCount++;
						break;
						case "SortedBlogPost":
								$ArticlesCount++;
						break;
				}
		}

	/*}else{
		$ToolsCount = 0;
		$GuidesCount = 0;
		$ArticlesCount = 0;
		$count = 0;
		$resultsLabel = 'results';

		$list = Page::get();
		$results = new PaginatedList($list, $request);
	}*/

		$resultsLabel = 'results';
		if($count < 2){
			$resultsLabel = 'result';
		}

		$data = array(
			'ToolsCount' => $ToolsCount,
			'GuidesCount' => $GuidesCount,
			'ArticlesCount' => $ArticlesCount,
			'Count' => $count,
			'ResultsLabel' => $resultsLabel,
			'Results' => $results,
			'Query' => DBField::create_field('Text', $form->getSearchQuery()),
			'Title' => _t('SearchForm.SearchResults', 'Search Results')
		);
		return $this->owner->customise($data)->renderWith(array('Page_results', 'Page'));
	}

	protected function getPosts() {
		$blog = Blog::get()[0];

		if($blog) {
				return $blog->getBlogPosts()
						->sort('"PublishDate" DESC')
						->limit(6);
		}

		return array();
}

}
