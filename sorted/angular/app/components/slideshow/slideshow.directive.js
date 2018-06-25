(function() {
  'use strict';
  angular.module('sorted')
    .directive('slideshow', ['$window', '$interval', 'siteConfig', function($window, $interval, siteConfig) {
      return {
        restrict: 'A',
        scope: true,
        link: function(scope, elm, attrs) {

          scope.currentIndex = 0;
          scope.animating = false;
          elm.addClass('slideshow-outer');

          var slideshowInterval;

          var slideshowMask = elm.find('[slideshow-mask]');
          slideshowMask.addClass('slideshow-mask');

          var slideshowItems = elm.find('[slideshow-items]');
          slideshowItems.addClass('slideshow-items');

          var slideshowItem;
          var numSlides = 0;
          var maskWidth = 0;
          scope.animating = false;
          var animationTime = 1;

          scope.unlockAnimation = function() {
            scope.animating = false;
          };

          scope.dotsClick = function(event) {
            $interval.cancel(slideshowInterval);
            slideshowInterval = $interval(scope.moveSlide, attrs.slideshowDelay);
            var clickedIndex = parseInt(angular.element(event.currentTarget).attr('slideshow-index'));
            scope.animating = true;
            scope.currentIndex = clickedIndex;
            scope.$digest();

            var tweenOptions = {
              left: '-' + maskWidth * clickedIndex + 'px',
              onComplete: scope.unlockAnimation,
            };
            TweenMax.to(slideshowItems, animationTime, tweenOptions);
          };

          scope.windowResize = function() {
            scope.setWidths();
            TweenMax.killAll();
            slideshowItems.css({
              left: '-' + maskWidth * scope.currentIndex + 'px',
            });
            scope.unlockAnimation();
          };

          scope.configureDots = function(index) {
            if (index === scope.currentIndex) {
              return 'fa-circle font-orange';
            } else {
              return 'fa-circle font-grey-light';
            }
          };

          function getItemsLength() {
            return angular.element('[slideshow-item]').length;
          }

          scope.setWidths = function() {
            maskWidth = elm.find('[slideshow-mask]').width();
            elm.find('[slideshow-items]').width(maskWidth * numSlides);
            elm.find('[slideshow-item]').width(maskWidth);
            return maskWidth;
          };

          scope.setupSlideshow = function(newVal) {
            if (newVal === 0) {
              return false;
            } else {
              numSlides = newVal;
            }

            slideshowItem = elm.find('[slideshow-item]');
            slideshowItem.addClass('slideshow-item');

            scope.injectDots(elm);
            scope.setWidths();
          };

          scope.moveSlide = function() {

            scope.currentIndex++;

            if (scope.currentIndex === elm.find('[slideshow-item]').length) {
              scope.currentIndex = 0;
            }
            var animateTo = 0;

            if (!scope.animating && scope.currentIndex === 0) {
              scope.animating = true;
              TweenMax.to(slideshowItems, animationTime, {left: animateTo + 'px', onComplete: scope.unlockAnimation});
            } else if (!scope.animating) {
              animateTo = maskWidth * scope.currentIndex;
              scope.animating = true;
              TweenMax.to(slideshowItems, animationTime, {left: '-' + animateTo + 'px', onComplete: scope.unlockAnimation});
            }

            return animateTo;

          };

          slideshowInterval = $interval(scope.moveSlide, attrs.slideshowDelay);
          elm.on('click', '.slideshow-dot', scope.dotsClick);
          angular.element($window).on('resize', scope.windowResize);
          scope.$watch(getItemsLength, scope.setupSlideshow);

        },
        controller: ['$scope', '$compile', '$sce', '$templateRequest',
          function($scope, $compile, $sce, $templateRequest) {

            function requestSuccess(template) {
              var compiledTemplate = $compile(angular.element('<div>').html(template).contents())($scope);
              $scope.elm.append(compiledTemplate);
            }

            $scope.injectDots = function(elm) {
              $scope.elm = elm;
              var templateUrl = $sce.getTrustedResourceUrl(siteConfig.APP_PATH + 'app/components/slideshow/slideshow-dots.html');
              $templateRequest(templateUrl).then(requestSuccess);
            };

          },
        ],
      };
    }]);

}());
