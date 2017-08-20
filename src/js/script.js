$( document ).ready( function() {
	$( '#searchArea' ).val( CONFIG.SEARCHAREA );
	
	$( 'input[type=button]' ).click( function() {
		var searchType = $( this ).attr( 'data-searchType' ) || '';
		var searchArea = $.trim( $( '#searchArea' ).val() );
		
		var tempMin = $( '#tempMin' ).val();
		var tempMax = $( '#tempMax' ).val();
		var humidityMin = $( '#humidityMin' ).val();
		var humidityMax = $( '#humidityMax' ).val();
		
		
		if( searchType !== '' && searchArea !== '' ) {
			$.ajax( {
				url: 'http://api.openweathermap.org/data/2.5/' + searchType + '?q=' + searchArea + '&cnt=64&units=imperial&appid=' + CONFIG.APIKEY,
				cache: false,
				dataType: 'json',
				success: function( result ) {
					var i, l, j, extra, val, weatherNow, list = [], str = '';
					
					if( searchType === 'weather' ) {
						if( result.main ) {
							result.dt_txt = ( function() { var d = new Date(); return d.getFullYear() + '-' + d.getMonth() + '-' + d.getDay() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds(); }() );
							list.push( result );
						}
					} else if( searchType === 'forecast' ) {
						if( result.list ) {
							list = result.list;
						}
					}
					
					if( list.length > 0  ) {
						for( j = 0, l = list.length; j < l; j += 1 ) {
							if( list[ j ].main ) {
								weatherNow = list[ j ].weather[ 0 ];
								str += '<hr />' + list[ j ].dt_txt + ' : ' + weatherNow.main + ' - ' + weatherNow.description;
								for( i in list[ j ].main ) {
									extra = '';
									val = parseInt( list[ j ].main[ i ] );
									if( 
										( i === 'temp' && val >= tempMin && val <= tempMax )
										|| ( i === 'humidity' && val >= humidityMin && val <= humidityMax ) 
									) {
										extra = '<span class="green bold">MATCH</span>';
									}
									
									str += '<div>' + i + ' => ' + val + ' ' + extra + '</div>';
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