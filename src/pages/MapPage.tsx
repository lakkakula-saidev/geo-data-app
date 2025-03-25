import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { useState } from "react";

import { useRoadsQuery } from "../hooks";
import { geoJSONStyle } from "../utils";
import { RoadFeature } from "../types/common";
import {
  ErrorComponent,
  Legend,
  LoadingComponent,
  TodoModal
} from "../components";

const onEachStreet = (
  feature: RoadFeature,
  layer: L.Layer,
  setSelectedRoadFid: (fid: number) => void,
  setIsModalOpen: (open: boolean) => void
) => {
  const streetName = feature.properties.name;
  const eemi_grade = feature.properties.eemi_grade;

  if (streetName) {
    layer.on("click", () => {
      if (feature.properties.fid) {
        setSelectedRoadFid(feature.properties.fid);
        setIsModalOpen(true);
      }
    });

    layer.on("mouseover", (event) => {
      event.target.setStyle({
        weight: 8,
        opacity: 1
      });
      if (eemi_grade) {
        event.target
          .bindTooltip(
            `<strong>Street:</strong> ${streetName}<br>
             <strong>Grade:</strong><br>
            gw: ${eemi_grade.gw}<br>
             <strong>Sub-type Grades:</strong><br>
             ABP: ${
               feature.properties.eemi_grade?.sub_type_grades["ABP"] ?? "N/A"
             }<br>
             ONA: ${
               feature.properties.eemi_grade?.sub_type_grades["ONA"] ?? "N/A"
             }`,
            {
              direction: "top",
              permanent: false,
              opacity: 0.8
            }
          )
          .openTooltip();
      }
    });

    layer.on("mouseout", (event) => {
      event.target.setStyle(geoJSONStyle(feature));
      event.target.closeTooltip();
    });
  }
};

export const MapPage: React.FC = () => {
  const { data: geoData, isLoading, isError, error } = useRoadsQuery();

  const [selectedRoadFid, setSelectedRoadFid] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedRoadFid(null);
  };

  if (isLoading) return <LoadingComponent />;
  if (isError) return <ErrorComponent message={(error as Error).message} />;

  return (
    <div className="flex h-screen w-screen justify-center overflow-hidden">
      <div className="relative flex flex-col w-[80%] h-[90%] justify-center p-5">
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white my-5">
          GeoData with Leaflet
        </h3>

        <p className="p-5 bg-gray-100 rounded-xl mb-5 shadow-lg font-medium text-gray-900 dark:text-white">
          GeoJSON data can be visualized on interactive maps using React-Leaflet
          and Leaflet. This allows for displaying geographic features like
          points, lines, and polygons with custom styling and interactivity. In
          the below map all the geo-data is presented as streets
        </p>

        <MapContainer
          center={
            geoData
              ? [
                  geoData.features[350].geometry.coordinates[0][1],
                  geoData.features[350].geometry.coordinates[0][0]
                ]
              : [51.505, -0.09]
          }
          zoom={14}
          style={{
            height: "100%",
            width: "100%",
            borderRadius: "16px"
          }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <GeoJSON
            data={geoData}
            style={geoJSONStyle}
            onEachFeature={(feature, layer) =>
              onEachStreet(feature, layer, setSelectedRoadFid, setIsModalOpen)
            }
          />
        </MapContainer>
        <div className="absolute bottom-8 right-8 bg-white p-4 z-[1000] shadow-lg rounded-lg">
          <Legend />
        </div>
        <TodoModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          roadFid={selectedRoadFid}
        />
      </div>
    </div>
  );
};
