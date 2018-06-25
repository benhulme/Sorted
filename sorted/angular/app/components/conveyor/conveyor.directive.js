(function() {
  'use strict';
  angular.module('sorted')
    .directive('conveyor',['$window', function($window) {
      return {
        restrict: 'A',
        scope: {},
        link: function(scope, elm) {

          scope.animating = false;
          scope.startX = 0;
          scope.startLeft = 0;

          var animationTime = 1;

          elm.addClass('conveyor-outer');

          var conveyorMask = elm.find('[conveyor-mask]');
          conveyorMask.addClass('conveyor-mask');

          scope.conveyorBelt = elm.find('[conveyor-belt]');
          scope.conveyorBelt.addClass('conveyor-belt');

          var leftControl = angular.element('<button>');
          leftControl.addClass('conveyor-left disabled');
          elm.prepend(leftControl);

          var rightControl = angular.element('<button>');
          rightControl.addClass('conveyor-right');
          elm.append(rightControl);

          scope.unlockAnimation = function () {
            scope.animating = false;
          };

          scope.leftClick = function() {
            var itemWidth = elm.find('[conveyor-items]').width();
            rightControl.removeClass('disabled');

            if (scope.conveyorBelt.prop('offsetLeft') >= -itemWidth) {
              var animateAmount = 0;
              scope.animating = true;
              TweenMax.to(scope.conveyorBelt, animationTime, {
                left: animateAmount + 'px',
                onComplete: scope.unlockAnimation,
              });
              leftControl.addClass('disabled');
              return animateAmount;
            } else {
              scope.animating = true;
              TweenMax.to(scope.conveyorBelt, animationTime, {
                left: '+=' + itemWidth + 'px',
                onComplete: scope.unlockAnimation,
              });
              return itemWidth;
            }
          };

          scope.rightClick = function() {
            var itemWidth = elm.find('[conveyor-items]').width();
            var itemCount = elm.find('[conveyor-items]').length;
            var conveyorLength = itemWidth * itemCount;
            var maxScroll = conveyorLength - conveyorMask.width();
            leftControl.removeClass('disabled');

            if (scope.conveyorBelt.prop('offsetLeft') <= -(maxScroll - itemWidth)) {
              scope.animating = true;
              TweenMax.to(scope.conveyorBelt, animationTime, {
                left: '-' + maxScroll + 'px',
                onComplete: scope.unlockAnimation,
              });
              rightControl.addClass('disabled');
              return maxScroll;
            } else {
              scope.animating = true;
              TweenMax.to(scope.conveyorBelt, animationTime, {
                left: '-=' + itemWidth + 'px',
                onComplete: scope.unlockAnimation,
              });
              return itemWidth;
            }

          };

          scope.windowResize = function() {
            var itemWidth = elm.find('[conveyor-items]').width();
            var itemCount = elm.find('[conveyor-items]').length;
            var conveyorLength = itemWidth * itemCount;
            var maxScroll = conveyorLength - conveyorMask.width();
            if (scope.conveyorBelt.prop('offsetLeft') <= -maxScroll) {
              scope.conveyorBelt.css({left: '-' + maxScroll + 'px'});
            }
            if (scope.conveyorBelt.prop('offsetLeft') > -maxScroll) {
              rightControl.removeClass('disabled');
            }
            return maxScroll;
          };

          scope.touchStart = function(event) {
            scope.startX = event.originalEvent.touches[0].clientX;
            scope.startLeft = elm.find('.conveyor-belt').prop('offsetLeft');
            return scope.startX;
          };

          scope.touchMove = function(event) {

            var currentX = event.originalEvent.touches[0].clientX;
            var amount = currentX - scope.startX;
            var left = scope.startLeft + amount;

            var itemWidth = elm.find('[conveyor-items]').width();
            var itemCount = elm.find('[conveyor-items]').length;
            var conveyorLength = itemWidth * itemCount;
            var maxScroll = conveyorLength - conveyorMask.width();

            if (left <= 0 && left >= -maxScroll) {
              elm.find('.conveyor-belt').css({left: left + 'px'});
            }

            if (left >= 0) {
              leftControl.addClass('disabled');
            } else {
              leftControl.removeClass('disabled');
            }

            if (left <= -maxScroll) {
              rightControl.addClass('disabled');
            } else {
              rightControl.removeClass('disabled');
            }

            return left;

          };

          elm.on('touchstart', scope.touchStart);
          elm.on('touchmove', scope.touchMove);
          elm.on('click', '.conveyor-left', scope.leftClick);
          elm.on('click', '.conveyor-right', scope.rightClick);
          angular.element($window).on('resize', scope.windowResize);

        },
      };
    }]);

}());
