(function(){
  'use strict';

  describe('Filter: Title Slug', function(){
    beforeEach(module('sorted'));

    it('should replace non-word characters with a single dash', 
      inject(function (titleSlugFilter) {
        expect(titleSlugFilter('Planning &!//#---:;   Saving')).toBe('planning-saving');
      }));

    it('should be lowercase', 
      inject(function (titleSlugFilter) {
        var upper = 'IAMSHOUTING';
        expect(titleSlugFilter(upper)).toBe(upper.toLowerCase());
      }));
  });

}());

