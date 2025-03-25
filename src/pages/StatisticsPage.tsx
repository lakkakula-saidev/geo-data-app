import React, { useMemo } from "react";

import {
  ErrorComponent,
  GradeAverageChart,
  LoadingComponent,
  StreetDistanceTable,
  TopRoadsChart
} from "../components";
import { useStoreWithQuery } from "../store/useStore";
import { calculateAverages } from "../utils";

export const StatisticsPage: React.FC = () => {
  const { geoData, isLoading, isError, error } = useStoreWithQuery();

  const averages = useMemo(
    () => (geoData?.features ? calculateAverages(geoData?.features) : {}),
    [geoData]
  );

  if (isLoading) return <LoadingComponent />;
  if (isError) return <ErrorComponent message={(error as Error).message} />;

  console.log("this is features", geoData);
  return (
    geoData && (
      <div className="flex flex-col w-screen items-center p-5">
        <div className="lex flex-col w-full md:w-[80%] h-[90%] md:flex-row md:space-x-5">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-white my-5">
            Statistics
          </h3>
        </div>
        <div className="flex flex-col w-full md:w-[80%] h-[90%] md:flex-row md:space-x-5">
          <div className="flex flex-col w-full md:w-1/2">
            <StreetDistanceTable features={geoData.features} />
          </div>
          <div className="flex flex-col w-full md:w-1/2">
            <GradeAverageChart averages={averages} />
            <TopRoadsChart roadData={geoData.features} />
          </div>
        </div>
      </div>
    )
  );
};
