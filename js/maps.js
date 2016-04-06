MapsGogle = {
    
    conf: {
        maps: [
            {
                selector: {
                    id: "maps"
                },
                marker: [
                    {
                        title: "Klar IT Webconsulting",
                        address: {
                            street: "Cronbergergasse 1a",
                            zip: "68526",
                            town: "Ladenburg",
                            country: "Deutschland"
                        },
                        infoWindowWidth: 300,
                        coordinates: {
                            lat: 49.472416,
                            lng: 8.609388
                        }
                    },
                    {
                        title: "AgroWeb",
                        address: {
                            street: "Steinachstr. 30",
                            zip: "69189",
                            town: "Schriesheim",
                            country: "Deutschland"
                        },
                        infoWindowWidth: 300,
                        coordinates: {
                            lat: 49.476826,
                            lng: 8.659218
                        }
                    }
                ],
                center: {
                    lat: 49.475644,
                    lng: 8.638030
                },
                settings: {
                    scrollwheel: false,
                    mapTypeControl: false,
                    zoomControl: true,
                    streetViewControl: false
                },
                zoom: 13,
            }
        ] // maps
    },
    
    init: function() {
        var obj = this;

        obj.conf.maps.forEach(function(objMap){

            if (document.getElementById(objMap.selector.id)) {
                var map = obj.getMapObj(objMap);

                if (obj.setCustomStyle){
                    obj.setCustomStyle(map);
                }

                objMap.marker.forEach(function (objMarker) {
                    obj.setMarker(objMarker, map);

                    console.log(objMarker);
                });
            }
        });
    },

    getMapObj: function (objMap) {
        var map = new google.maps.Map(document.getElementById(objMap.selector.id), {
            center: {lat: objMap.center.lat, lng: objMap.center.lng},
            zoom: objMap.zoom,
            scrollwheel: objMap.settings.scrollwheel,
            mapTypeControl: objMap.settings.mapTypeControl,
            zoomControl: objMap.settings.zoomControl,
            streetViewControl: objMap.settings.streetViewControl,
        });

        return map;
    },

    getInfoWindowContent: function (objMarker) {
        var content =    '<div class="address">'
                        +'<strong>'+objMarker.title+'</strong>'
                        +'<br/>'+objMarker.address.street
                        +'<br/>'+objMarker.address.zip+' '+objMarker.address.town
                        +'<br/>'+objMarker.address.country
                        +'</div>';
        return content;
    },

    setMarker: function (objMarker, map) {
        var marker = new google.maps.Marker({
            position: {lat: objMarker.coordinates.lat, lng: objMarker.coordinates.lng},
            map: map,
            title: objMarker.title
        });

        if (objMarker.infoWindowWidth){
            var content = this.getInfoWindowContent(objMarker);
            var infoWindow = new google.maps.InfoWindow({
                content: content,
                maxWidth: objMarker.infoWindowWidth
            });
            marker.addListener('click', function() {
                infoWindow.open(map, marker);
            });
        }
    },

    setCustomStyle: function (map) {
        var customMapType = new google.maps.StyledMapType(
            [
                {
                    "featureType": "landscape",
                    "stylers": [
                        {
                            "saturation": -100
                        },
                        {
                            "lightness": 65
                        },
                        {
                            "visibility": "on"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "stylers": [
                        {
                            "saturation": -100
                        },
                        {
                            "lightness": 51
                        },
                        {
                            "visibility": "simplified"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "stylers": [
                        {
                            "saturation": -100
                        },
                        {
                            "visibility": "simplified"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "stylers": [
                        {
                            "saturation": -100
                        },
                        {
                            "lightness": 30
                        },
                        {
                            "visibility": "on"
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "stylers": [
                        {
                            "saturation": -100
                        },
                        {
                            "lightness": 40
                        },
                        {
                            "visibility": "on"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "stylers": [
                        {
                            "saturation": -100
                        },
                        {
                            "visibility": "simplified"
                        }
                    ]
                },
                {
                    "featureType": "administrative.province",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "labels",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "lightness": -25
                        },
                        {
                            "saturation": -100
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "hue": "#ffff00"
                        },
                        {
                            "lightness": -25
                        },
                        {
                            "saturation": -97
                        }
                    ]
                }
            ],{ name: 'Grey Style' }
        );
        var customMapTypeId = 'grey_style';
        map.mapTypes.set(customMapTypeId, customMapType);
        map.setMapTypeId(customMapTypeId);
    }
    
}