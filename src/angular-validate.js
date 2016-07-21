(function (angular, $) {
    angular.module('ngValidate', [])

        .directive('ngValidate', function () {
            return {
                require: 'form',
                restrict: 'A',
                scope: {
                    ngValidate: '='
                },
                link: function (scope, element, attrs, form) {
                    var validator = element.validate(scope.ngValidate);

                    form.validate = function (options) {
                        var oldSettings = validator.settings;

                        validator.settings = $.extend(true, {}, validator.settings, options);

                        var valid = validator.form();

                        validator.settings = oldSettings; // Reset to old settings

                        return valid;
                    };

                    form.numberOfInvalids = function () {
                        return validator.numberOfInvalids();
                    };
                }
            };
        })

        .provider('$validator', function () {
            $.validator.setDefaults({
                onsubmit: false // to prevent validating twice
            });

            return {
                setDefaults: $.validator.setDefaults,
                addMethod: $.validator.addMethod,
                setDefaultMessages: function (messages) {
                    angular.extend($.validator.messages, messages);
                },
                format: $.validator.format,
                $get: function () {
                    return {};
                }
            };
        });
}(angular, jQuery));
