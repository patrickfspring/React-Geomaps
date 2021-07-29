//import React from "react";
import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker
} from "react-simple-maps";
import markers from "./data";
//console.log(markers);

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

  
const MapChart = ({ setTooltipContent }) => {
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });

  function handleZoomIn() {
    if (position.zoom >= 4) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom * 2 }));
  }

  function handleZoomOut() {
    if (position.zoom <= 1) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom / 2 }));
  }

  function handleMoveEnd(position) {
    setPosition(position);
  }
  
  return (
    <div>
      <ComposableMap data-tip=""
                     projectionConfig={{ scale: 200 }}
                     >
        <ZoomableGroup
          zoom={position.zoom}
          center={position.coordinates}
          onMoveEnd={handleMoveEnd}
        >  
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography key={geo.rsmKey} geography={geo} />
              ))
            }
          </Geographies>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies
                .filter(
                  d =>
                  d.properties.REGION_UN === "Americas" ||
                  d.properties.REGION_UN === "Europe" ||
                  d.properties.REGION_UN === "Asia"  ||
                  d.properties.REGION_UN === "Africa" ||
                  d.properties.REGION_UN === "Oceania" ||
                  d.properties.REGION_UN === "Antartica"
                )
                .map(geo => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#EAEAEC"
                  stroke="#D6D6DA"
                />
              ))
            }
          </Geographies>
          {markers.map(({ name, coordinates, markerOffset }) => (
            <Marker key={name} coordinates={coordinates}>
              <circle r={4} fill="#09ff00" stroke="#fff" strokeWidth={2}
                onMouseEnter={() => {
                  setTooltipContent(`${name}`);
                }}
                onMouseLeave={() => {
                  setTooltipContent("");
                }}
                />
                <text
                  textAnchor="right"
                  y={markerOffset}
                  style={{fontFamily: "system-ui", fontSize: "6", fill: "#5D5A6D" }}
                >
                  {name}
                </text>
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>
      <div className="controls">
        <button onClick={handleZoomIn}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
        <button onClick={handleZoomOut}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>           

    </div>
  );
};
//});

export default MapChart;
