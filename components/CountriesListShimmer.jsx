import React from "react";
import "./CountriesListShimmer.css";

const CountriesListShimmer = () => {
    
  //   const mappedShimmer= Array.from({length:10}).map((el,index)=>{
  //         return <div key={index} className="country-card shimmer-card"></div>
  //     })

  return (
    <div className="countries-container">
      {
        /* {mappedShimmer} */
        Array.from({ length: 10 }).map((el, index) => {
          return <div key={index} className="country-card shimmer-card"></div>;
        })
      }
    </div>
  );
};

export default CountriesListShimmer;
