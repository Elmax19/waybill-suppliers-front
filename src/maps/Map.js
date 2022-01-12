import React, {useEffect, useState} from "react";
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from "react-google-maps";
import {geocodeByAddress} from "react-google-places-autocomplete";

function GMap({address, setAddress, setError}) {
    const [marker, setMarker] = useState({lat: 38, lng: -104})
    const [hasMarker, setHasMarker] = useState(false)
    let geocoder = new window.google.maps.Geocoder()

    const renderMarker = () => {
        geocodeByAddress(address.formatted_address)
            .then(results => {
                setMarker({
                    lat: results[0].geometry.location.lat(),
                    lng: results[0].geometry.location.lng()
                })
                setHasMarker(true)
            }).catch(() => {
            setMarker({lat: 38, lng: -104})
            setHasMarker(false)
        })
    }


    useEffect(() => {
        renderMarker()
        setError('')
    }, [address])

    return (
        <GoogleMap
            defaultZoom={10}
            defaultCenter={marker}
            onClick={(e) => {
                geocoder.geocode({'latLng': e.latLng}).then(response => {
                    if(response.results[0].address_components.length>=7){
                        if(response.results[0].formatted_address.endsWith('USA')) {
                            console.log(response.results[0])
                            setAddress(response.results[0])
                            setHasMarker(true)
                        } else {
                            setError('Address should by from USA')
                            setHasMarker(false)
                        }
                        setMarker({lat: e.latLng.lat(), lng: e.latLng.lng()})
                    } else {
                        setError('Enter existing Address')
                        setHasMarker(false)
                    }
                }).catch(error => console.warn(error));
            }}>
            {
                hasMarker
                    ? <Marker
                        key={marker}
                        position={{
                            lat: marker.lat,
                            lng: marker.lng
                        }}/>
                    : ''
            }
        </GoogleMap>
    );
}

const MapWrapped = withScriptjs(withGoogleMap(GMap));

export default function Map({address, setAddress, setError}) {
    return (
        <div style={{width: "350px", height: "250px", padding: "10px 0 0", marginBottom: "20px"}}>
            <MapWrapped
                address={address}
                setAddress={setAddress}
                setError={setError}
                googleMapURL={'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDagMIi_o_CaJbAdyTaxoamW61OG7tmqvw&language=en'}
                loadingElement={<div style={{height: `100px`}}/>}
                containerElement={<div style={{height: `100px`}}/>}
                mapElement={<div style={{height: `250px`}}/>}
            />
        </div>
    );
}