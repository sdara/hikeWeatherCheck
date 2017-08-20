$( document ).ready( function() {
	$( '#searchArea' ).val( CONFIG.SEARCHAREA );
	
	$( 'input[type=button]' ).click( function() {
		var searchType = $( this ).attr( 'data-searchType' ) || '';
		var searchArea = $.trim( $( '#searchArea' ).val() );
		if( searchType !== '' && searchArea !== '' ) {
			$.ajax( {
				url: 'http://api.openweathermap.org/data/2.5/' + searchType + '?q=' + searchArea + '&cnt=16&units=imperial&appid=' + CONFIG.APIKEY,
				cache: false,
				dataType: 'json',
				success: function( result ) {
					var i, l, j, weatherNow, str = '';
					
					if( searchType === 'weather' ) {
						if( result.main ) {
							for( i in result.main ) {
								str += '<div>' + i + ' => ' + result.main[ i ] + '</div>';
							}
						}
					} else if( searchType === 'forecast' ) {
						if( result.list ) {
							for( j = 0, l = result.list.length; j < l; j += 1 ) {
								if( result.list[ j ].main ) {
									weatherNow = result.list[ j ].weather[ 0 ];
									str += '<hr />' + result.list[ j ].dt_txt + ' : ' + weatherNow.main + ' - ' + weatherNow.description;
									for( i in result.list[ j ].main ) {
										str += '<div>' + i + ' => ' + result.list[ j ].main[ i ] + '</div>';
									}
								}
							}
						}
					}
					
					$( '#output' ).empty().html( str );
				}
			} );
		}
	} );
} );