( function() {
	"use strict";

	$( document ).ready( () => {
		const githubOrgs = function() {

			const apiKey = '6c12ff46615d8fcfa5ef0048610f3179cefbd9fa';
			let avatar = '';
			let orgname = '';
			let username = '';


			function bindEvents() {
				console.clear();

				$( '#search-form' ).on( 'submit', function() {
					username = $( '#search-name' ).val();

					event.preventDefault();
					console.log( 'in' );
					getSearchResults( username );
					this.reset();
				} );
			} //end bindEvents


			function getSearchResults( username ) {
				username = encodeURIComponent( username );
				const settings = {
					"async": true,
					"crossDomain": true,
					"url": `https://api.github.com/users/
							${username}/orgs?api=${apiKey}`,
					'method': "GET"
				};

				$.ajax( settings ).then( function( response ) {
					$( '.org-wrapper' ).remove();
					console.log( response );
					if ( response.length === 0 ) {
						$( '.namedisplay' ).text( `${username} got nuttin` );
					} else {
						displayOrgs( response );
					}
				} ).catch( function( status ) {
					console.log( status );
				} );
			} //end getSearchResults


			function displayOrgs( data ) {

				$.each( data, function( i, value ) {
					avatar = value.avatar_url;
					orgname = value.login;
					console.log( avatar );
					console.log( orgname );

					$( '<div>', { class: 'org-wrapper' } )
						.append(
							$( '<img/>' )
							.attr( 'src', avatar )
						)
						.append(
							$( '<span/>' ).text( orgname )
						)
						.appendTo( '.orgs' );
				} );
				$( '.namedisplay' ).text( username );
			} //end displayOrgs


			function init() {
				bindEvents();
			}//end init

			return {
				init: init
			};//end return

		}; //end APP

		const ghOrg = githubOrgs();
		ghOrg.init();

	} ); //end docready

} )(); //end iife
