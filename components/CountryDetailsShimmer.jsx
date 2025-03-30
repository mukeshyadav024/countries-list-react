import React from "react";
import "./CountryDetailsShimmer.css";

const CountryDetailsShimmer = () => {
  return (
    <main>
      <div className="country-details-container shimmer">
        <span className="back-button shimmer-box"></span>
        <div className="country-details">
          <div className="shimmer-flag shimmer-box"></div>
          <div className="details-text-container">
            <h1 className="shimmer-box shimmer-text"></h1>
            <div className="details-text">
              {Array(8)
                .fill("")
                .map((_, index) => (
                  <p key={index} className="shimmer-box shimmer-line"></p>
                ))}
            </div>
            <div className="border-countries shimmer-box shimmer-border"></div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CountryDetailsShimmer;
