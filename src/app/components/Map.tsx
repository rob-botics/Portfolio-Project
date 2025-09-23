/* eslint-disable @next/next/no-img-element */
import 'maplibre-gl/dist/maplibre-gl.css';
import React, { useEffect, useRef, useState } from 'react';
import {Map as ReactMap, Popup, type MapRef } from '@vis.gl/react-maplibre';

type MapProps = {
    restaurant: {
        id: string
        latitude: number
        longitude: number
        zoom: number
        img: string
        address: string
        website: string
    }
}
const MapWidget = ({ restaurant }: MapProps) => {
    const popupRef = useRef(null)
    const mapRef = useRef<MapRef | null>(null);
    
    const [showPopup, setShowPopup] = useState(false);

    const initialView = {
        longitude: -98.35,
        latitude: 39.50,
        zoom: 2.5
    };

    useEffect(() => {
        if (restaurant && mapRef.current) {
        mapRef.current.flyTo({
            center: [restaurant.longitude, restaurant.latitude],
            zoom: 15,
            speed: 1.2,        // optional, how fast it flies
            curve: 1            // optional, smoothness
        });
        setShowPopup(true);
        }
    }, [restaurant]);

    return (
        <div className='map'>
        <ReactMap
            ref={mapRef}
            initialViewState={initialView}
            style={{ borderRadius: '16px' }}
            mapStyle="https://tiles.openfreemap.org/styles/liberty"
        >
            {restaurant && showPopup && <Popup
            latitude={restaurant?.latitude}
            longitude={restaurant?.longitude}
            closeOnClick={false}
            focusAfterOpen={false}
            ref={popupRef}
            onClose={() => setShowPopup(false)}
            >
            <div className='popup-container'>
                <img src={restaurant.img} alt={restaurant.id}/>
                <address>{restaurant.address}</address>
                <a href={restaurant.website} rel="noreferrer" target='_blank'><span>{restaurant.id}</span></a>
            </div>
            </Popup>}
        </ReactMap>
        </div>
    );
};
export default MapWidget;
