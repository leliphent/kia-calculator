
$( document ).ready(function() {
     console.log( "ready!" ); // making sure jquery is connected

	// model, color, package of user's Kia
		// define car options to be used for template
		var vehicleOptions = [
		  {choice:'cadenza', price: 35000},
		  {choice:'forte', price: 20000},
		  {choice:'optima', price: 29050},
		  {choice:'sedona', price: 38650},
		  {choice:'soul', price: 42200}
		];

		// define color options to be used for template
		var colorOptions = [
		  {choice:'black', price: 50},
		  {choice:'white', price: 100},
		  {choice:'silver', price: 250}
		];

		// define car package option
		var packageOptions = [
		  {choice:'Rear Camera', price: 150},
		  {choice:'LED Positioning Light', price: 150},
		  {choice:'Rear Camera and LED Positioning Light', price: 200},
		];

		var carSelection = {
		  vehicle: {choice: 'Not Selected', price: 0},
		  color: {choice: 'Not Selected', price: 0},
		  package: {choice: 'Not Selected', price: 0}
		};
	// end kia options

	// make menu item clicked on status active
   $( '.nav li' ).on( 'click', function(){

		$( 'li' ).removeClass( 'active' );
		$( this ).addClass( 'active' );

		// Empty the ‘#options-display’ element.
		$('#options-display').empty()

		//find data attribute of the tab user is on
		var userChoice = $(this).data('tab');
		//console.log(userChoice);

		// call contentDisplayOnTab function
		  contentDisplayOnTab(userChoice);

	});


	//begin function to display content
   function contentDisplayOnTab (tabChoice) {

   		//Generate handlebars template
		var source = $('#' + tabChoice + '-options-template').html();
		var template = Handlebars.compile(source);

   		//Switch statement based on userChoice to generate handlebars template
		switch (tabChoice) {
			case 'vehicle':
			var tabChoice = 'vehicle';
			var options = vehicleOptions;
			template = template;
			break;

			case 'color':
			var tabChoice = 'color';
			var options = colorOptions;
			template = template;
			break;

			case 'package':
			var tabChoice = 'package';
			var options = packageOptions;
			template = template;
			break;

			case 'summary':
			var tabChoice = 'summary';
			var options = carSelection;
			template = template;
			break;

			default:
			console.log('your default has been initiated');
		}
		// end switch statement


		// conditional for summary vs remainder of tabs
		if (tabChoice === 'summary'){
			var newTabItem = template(options);
			$('#options-display').append(newTabItem);
		} else {
			//loop through each instance to add to handlebars template.
			for (var i = 0; i < options.length; i ++) {
				var newTabItem = template(options[i]);
					// console.log('this is the template' + newTabItem);
				$('#options-display').append(newTabItem);
					// console.log(newTabItem);
			}

		}
		// end conditional for summary vs remainder of tabs

		// When the user clicks on an option (a vehicle, a color, or a package), update the ‘carSelection’ object to reflect the choice the user made.
		$('.options-container').on('click', 'div[class*="option"]', function () {

			var panel = $(this).data('panel');
			carSelection[panel].choice = $(this).data('option');
  		carSelection[panel].price = $(this).data('price');

  			// If vehichle option and color option have been selected
  			if (carSelection.color.choice !== 'Not Selected' && carSelection.vehicle.choice !== 'Not Selected') {
		    	$('.vehicle-display').attr('src', 'assets/' + carSelection.vehicle.choice + '-' + carSelection.color.choice + '.jpg');
		 	} else if (carSelection.vehicle.choice !== 'Not Selected') {
		 		//display default image of vehicle chosen if no color option chosen
		    	$('.vehicle-display').attr('src', 'assets/' + carSelection.vehicle.choice + '.jpg');
		  	}

		  	// show amount in Cost section converted to currency:
		  	var cost = (carSelection.color.price + carSelection.vehicle.price + carSelection.package.price).toLocaleString('en-US')
		  	$('.cost-display').html('$' + cost);

		});

    // display package image
    $('.panel-heading').on('click', function(){
      // if ('data-option' === 'Rear Camera'){
      //   $('.package-option').addClass('.rear-camera');
      // }
      var option = $(this).data('option');
      console.log(option);
      if (option === 'Rear Camera') {
        $('.panel-heading, .package-option, .rear-camera').removeClass('led-position');
        $(this).addClass('rear-camera');
      } else if (option === 'LED Positioning Light') {
        $('.panel-heading, .package-option, .rear-camera').removeClass('rear-camera');
        $(this).addClass('led-position');
      } else  {
        $('.panel-heading, .package-option, .rear-camera').removeClass('rear-camera');
          $('.panel-heading, .package-option, .rear-camera').removeClass('led-position');
      }
      // $(this).addClass('rear-camera');
    });

   }
	// end function to display content

// show vehicle tab on load
contentDisplayOnTab('vehicle');






});
