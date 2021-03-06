/**
 * Created by JAIR on 4/4/2017.
 */

(function () {
    'use strict';

    angular.module('sys.utils.widgets')
        .directive('charLimit', CharLimit);

    function CharLimit() {
        return {
            restrict: 'A',
            link: function ($scope, $element, $attributes) {
                var limit = $attributes.charLimit;

                $element.bind('keyup', function (event) {
                    var element = $element.parent().parent();

                    element.toggleClass('warning', limit - $element.val().length <= 10);
                    element.toggleClass('error', $element.val().length > limit);
                });

                $element.bind('keypress', function (event) {
                    // Once the limit has been met or exceeded, prevent all keypresses from working
                    if ($element.val().length >= limit) {
                        // Except backspace
                        if (event.keyCode != 8) {
                            event.preventDefault();
                        }
                    }
                });
            }
        };
    }
})();
