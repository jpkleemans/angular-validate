# Angular Validate

[![Bower](https://img.shields.io/bower/v/jpkleemans-angular-validate.svg)](https://github.com/jpkleemans/angular-validate/releases/latest)
[![GitHub license](https://img.shields.io/github/license/jpkleemans/angular-validate.svg)](https://github.com/jpkleemans/angular-validate/blob/master/LICENSE.md)

Painless form validation for [AngularJS](https://github.com/angular/angular.js). Powered by the [jQuery Validation Plugin](https://github.com/jzaefferer/jquery-validation).

## Table of contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Built-in validation rules](#built-in-validation-rules)
4. [Configuration](#configuration)

## Installation

Download Angular Validate:

- With Bower:

```sh
$ bower install jpkleemans-angular-validate
```

- With Git:

```sh
$ git clone https://github.com/jpkleemans/angular-validate.git
```

- By manually downloading the [latest release](https://github.com/jpkleemans/angular-validate/releases/latest).

> When using one of the last two methods make sure you also download the latest release of the [jQuery Validation Plugin](https://github.com/jzaefferer/jquery-validation).

Include both `jquery.validate.min.js` and `angular-validate.min.js` in your HTML page:

```html
<!-- jQuery scripts -->
<script src="path/to/jquery.min.js"></script>
<script src="path/to/jquery.validate.min.js"></script>

<!-- Angular scripts -->
<script src="path/to/angular.min.js"></script>
<script src="path/to/angular-validate.min.js"></script>
```

Inject the `ngValidate` module as a dependency into your Angular application:

```js
angular.module('myApp', ['ngValidate']);
```

## Usage

Add the ng-validate directive to your form and pass the validation options as value:

```html
<form name="registerform" ng-validate="validationOptions">
    <input type="email" name="email">
    <input type="password" name="password">
</form>
```

#### Set validation options

Then set the validation options in your controller:

```js
$scope.validationOptions = {
    rules: {
        email: {
            required: true,
            email: true
        },
        password: {
            required: true,
            minlength: 6
        }
    },
    messages: {
        email: {
            required: "We need your email address to contact you",
            email: "Your email address must be in the format of name@domain.com"
        },
        password: {
            required: "You must enter a password",
            minlength: "Your password must have a minimum length of 6 characters"
        }
    }
}
```

Or (for simple forms) insert the options directly without using a controller:

```html
<form name="simpleform" ng-validate="{rules: {name: "required"}}">
```

> For all available options, see: http://jqueryvalidation.org/validate#validate-options

#### Check form validity

Now you can validate the form by calling `validate()` on the [form instance](https://docs.angularjs.org/guide/forms):

```js
$scope.register = function () {
    if($scope.registerform.validate()) {
        // Form is valid!
    }
}
```

> You can also pass your validation options as the first parameter of `validate()`.

#### Get number of invalid fields

```js
$window.alert("There are " + $scope.registerform.numberOfInvalids() + " invalid fields.");
```

## Built-in validation rules

A set of standard validation rules is provided by the jQuery Validation Plugin:

- [required](http://jqueryvalidation.org/required-method) – Makes the element required.
- [remote](http://jqueryvalidation.org/remote-method) – Requests a resource to check the element for validity.
- [minlength](http://jqueryvalidation.org/minlength-method) – Makes the element require a given minimum length.
- [maxlength](http://jqueryvalidation.org/maxlength-method) – Makes the element require a given maxmimum length.
- [rangelength](http://jqueryvalidation.org/rangelength-method) – Makes the element require a given value range.
- [min](http://jqueryvalidation.org/min-method) – Makes the element require a given minimum.
- [max](http://jqueryvalidation.org/max-method) – Makes the element require a given maximum.
- [range](http://jqueryvalidation.org/range-method) – Makes the element require a given value range.
- [email](http://jqueryvalidation.org/email-method) – Makes the element require a valid email.
- [url](http://jqueryvalidation.org/url-method) – Makes the element require a valid url.
- [date](http://jqueryvalidation.org/date-method) – Makes the element require a date.
- [dateISO](http://jqueryvalidation.org/dateISO-method) – Makes the element require an ISO date.
- [number](http://jqueryvalidation.org/number-method) – Makes the element require a decimal number.
- [digits](http://jqueryvalidation.org/digits-method) – Makes the element require digits only.
- [creditcard](http://jqueryvalidation.org/creditcard-method) – Makes the element require a credit card number.
- [equalTo](http://jqueryvalidation.org/equalTo-method) – Requires the element to be the same as another one.

> More info: http://jqueryvalidation.org/documentation/#link-list-of-built-in-validation-methods

## Configuration

Angular Validate ships with a $validatorProvider, that you can use to configure default validation options and custom validation rules. 

#### Default validation options

```js
angular.module('myApp')
    .config(function ($validatorProvider) {
        $validatorProvider.setDefaults({
            errorElement: 'span',
            errorClass: 'help-block'
        });
    });
```

> More info: http://jqueryvalidation.org/jQuery.validator.setDefaults

#### Custom validation rules

```js
angular.module('myApp')
    .config(function ($validatorProvider) {
        $validatorProvider.addMethod("domain", function (value, element) {
            return this.optional(element) || /^http:\/\/mydomain.com/.test(value);
        }, "Please specify the correct domain for your documents");
    });
```

> More info: http://jqueryvalidation.org/jQuery.validator.addMethod
