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

                form.validate = function (showErrors) {
                    if (typeof showErrors === 'undefined') showErrors = true;

                    if (showErrors) {
                        return validator.form();
                    } else {
                        return validator.checkForm();
                    }
                };

                form.numberOfInvalids = function () {
                    return validator.numberOfInvalids();
                };
            }
        };
    })

    .provider('$validator', function () {
        var validator = $.validator;

        validator.$get = function () {
            return {};
        };

        return validator;
    });
