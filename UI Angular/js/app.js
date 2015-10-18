var translations = {
	"en" : {
		"Name" : "Full Name",
		"E-mail address" : "E-mail address",
		"Date of birth" : "Date of birth",
		"Gender" : "Gender",
		"Country" : "Country",
		"URL" : "Profile URL",
		"Description" : "Description",
		"Submit" : "Submit ",
		"Male" : "Male",
		"Female" : "Female",
		"Error1" : "Can not be left blank !!",
		"Error2" : "Invalid email !",
		"Error3" : "Invalid URL format !",
		"Error4" : "Please enter date in dd-MMMM-yyyy format !",
		"Error5" : "Passwords do not match. Please type the correct password !",
		"Error6" : "Password must contain one uppercase and one special character and should be of min 6 characters",
		"Error7" : "Name must be of minimum 3 characters.",
		"heading" : "Registration Form",
		"Danish" : "Danish",
		"English" : "English",
		"Russia" : "Russia",
		"Password" : "Password",
		"Confirm Password" : "Confirm Password",
		"Read TnC" : "Read TnC",
		"Terms and conditions !" : "Terms and conditions  !" ,
		"Cancel" : "Cancel"
	},
	"dk" : {
		"Name" : "Fulde navn",
		"E-mail address" : "Email adresse",
		"Date of birth" : "Fødselsdato",
		"Gender" : "køn",
		"Country" : "Land",
		"URL" : "Profil URL",
		"Description" : "Beskrivelse",
		"Submit" : "Indsend ",
		"Male" : "Mand",
		"Female" : "kvinde",
		"Error1" : "Kan ikke være tomt !!",
		"Error2" : "Ugyldig email !",
		"Error3" : "Ugyldig webadresse format !",
		"Error4" : "Indtast dato i dd-MMMM-yyyy format !",
		"Error5" : "Adgangskode matcher ikke. Venligst skrive den korrekte adgangskode !",
		"Error6" : "Adgangskode skal indeholde en store og en særlig karakter og bør være af min 6 tegn !",
		"Error7" : "Navn skal være på mindst 3 karakterer.",
		"heading" : "Tilmeldingsblanket",
		"Danish" : "Danske",
		"English" : "Føroyskt",
		"Password" : "Adgangskode",
		"Confirm Password" : "Bekræft Password",
		"Read TnC" : "Læs TnC",
		"Terms and conditions !" : "Vilkår og betingelser !" ,
		"Cancel" : "Annuller"

	}
}

// Main module ---
var app = angular.module('myApp', [ 'pascalprecht.translate', 'ui.bootstrap','ngAnimate']);

// Function for the translations
app.config(function($translateProvider) {
	for (lang in translations) {
		$translateProvider.translations(lang, translations[lang]);
	}
	$translateProvider.preferredLanguage('en');
})

// Main controller
app.controller('help', function($http, $log, $timeout, $translate, $location, $window, $scope, $uibModal) {
      // setting variables for modal 
	  $scope.animationsEnabled = true;
	  $scope.open = function () {
	    var modalInstance = $uibModal.open({
	      animation: $scope.animationsEnabled,
	      templateUrl: 'myModalContent.html',
	      controller: 'ModalInstanceCtrl'
	    });
	  };
	  
	 //date picker
	  
	  $scope.myDate = new Date();
	  $scope.data = {};
	  $scope.toggleMax = function() {
		    $scope.maxDate = $scope.maxDate ? null : new Date();
		  };
	 $scope.toggleMax();
	  
	$scope.subjectListOptions = {
		'Afghanistan' : 'Afghanistan',
		'Australia' : 'Australia',
		'Austria' : 'Austria',
		'Belgium' : 'Belgium',
		'Canada' : 'Canada',
		'Denmark' : 'Denmark',
		'Egypt' : 'Egypt',
		'Germany' : 'Germany',
		'Greece' : 'Greece',
		'Hungary' : 'Hungary',
		'India' : 'India',
		'Italy' : 'Italy',
		'Japan' : 'Japan',
		'Kenya' : 'Kenya',
		'Malaysia' : 'Malaysia',
		'Netherlands' : 'Netherlands',
		'Poland' : 'Poland',
		'Russia' : 'Russia',
		'Switzerland' : 'Switzerland',
		'Turkey' : 'Turkey',
		'United Kingdom' : 'United Kingdom',
		'United States' : 'United States',
		'Vatican City' : 'Vatican City',
		'Zimbabwe' : 'Zimbabwe'
	};

	$scope.ChangeLanguage = function(lang) {
		$translate.use(lang);
	};
	
	
	
	// pattern for checking the password
	$scope.myRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,}$/;
	

	// Form submit handler.
	$scope.submit = function(form) {
		// Trigger validation flag.
		$scope.submitted = true;
		// adding the API for email service
		     $http.post("http://localhost:8080/SignUpForm/EmailNotification",$scope.user)
		     .success(function(data, status, headers, config) {
				//reset form on submit		
				//$scope.user = null;
				//$scope.helpForm.$setPristine();
				$window.location.href= 'Welcome.html';
				alert("Test fo redirection ");
			}).error(function(data, status, headers, config) {
				$window.location.href= 'Error.html';
	        });
	};// end of submit function
	

}); // end of controller

// directive for the password and confirm password match
(function() {
	var directiveId = 'ngMatch';
	app.directive(directiveId, [ '$parse', function($parse) {

		var directive = {
			link : link,
			restrict : 'A',
			require : '?ngModel',
		};
		return directive;
		function link(scope, elem, attrs, ctrl) {
			// if ngModel is not defined, we don't need to do anything
			if (!ctrl)
				return;
			if (!attrs[directiveId])
				return;

			var firstPassword = $parse(attrs[directiveId]);
			var validator = function(value) {
				var temp = firstPassword(scope), v = value === temp;
				ctrl.$setValidity('match', v);
				return value;
			}
			ctrl.$parsers.unshift(validator);
			ctrl.$formatters.push(validator);
			attrs.$observe(directiveId, function() {
				validator(ctrl.$viewValue);
			});

		}
	} ]);
})();

 // controller for modal
	app.controller('ModalInstanceCtrl', function ($scope, $modalInstance) {
	  $scope.ok = function () {
	    $modalInstance.close();
	  };
	});

	

	
	
