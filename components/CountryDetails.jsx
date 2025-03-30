import React, {useEffect, useState } from "react";
import "./CountryDetail.css";
import { Link, useLocation, useParams } from "react-router-dom";
import CountryDetailsShimmer from "./CountryDetailsShimmer";
import { useTheme } from "../hooks/useTheme";


const CountryDetails = () => {
  let [isDark]=useTheme()
  const params = useParams();
  const countryName = params.country;
  const {state}= useLocation()

  const [countryData, setCountryData] = useState({});
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true); // State to track loading



  useEffect(() => {
    setLoading(true); // Start loading

function updateCountryData(data){
  setCountryData({
    name: data.name.common,
    flag: data.flags.svg,
    nativeName: Object.values(data.name.nativeName || {})[0]?.common || "N/A",
    population: data.population.toLocaleString("en-IN"),
    region: data.region,
    subRegion: data.subregion || "N/A",
    capital: data.capital?.join(", ") || "N/A",
    topLevelDomain: data.tld?.join(", ") || "N/A",
    currencies: Object.values(data.currencies || {})
      .map((currency) => currency.name)
      .join(", "),
    languages: Object.values(data.languages || {}).join(", "),
    borders: [],
  });
  if (data.borders && data.borders.length > 0) {
    Promise.all(
      data.borders.map((border) =>
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((response) => response.json())
          .then(([borderData]) => borderData.name.common)
          .catch(() => "Unknown")
      )
    ).then((borderNames) => {
      setCountryData((prevData) => ({
        ...prevData,
        borders: borderNames,
      }));
    });
  }
}

    if(state){
      updateCountryData(state.data);
      setLoading(false);
      return;
    }


    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
      .then((response) => response.json())
      .then(([data]) => {
        updateCountryData(data);
        

        // Fetch border countries if they exist
        if (data.borders && data.borders.length > 0) {
          Promise.all(
            data.borders.map((border) =>
              fetch(`https://restcountries.com/v3.1/alpha/${border}`)
                .then((response) => response.json())
                .then(([borderData]) => borderData.name.common)
                .catch(() => "Unknown")
            )
          ).then((borderNames) => {
            setCountryData((prevData) => ({
              ...prevData,
              borders: borderNames,
            }));
          });
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false)); // Stop loading after fetch completes
  }, [countryName]);

  if (notFound) return <div>Country not found</div>;

  // Show shimmer while loading
  if (loading) return <CountryDetailsShimmer />;

  return (
    <main className={`${isDark ? "dark" : ""}`}>


      <div className="country-details-container">
        <span className="back-button" onClick={() => window.history.back()}>
          <i className="fa-solid fa-arrow-left"></i>&nbsp; Back
        </span>
        <div className="country-details">
          <img src={countryData.flag} alt={countryData.name} />
          <div className="details-text-container">
            <h1>Name: {countryData.name}</h1>
            <div className="details-text">
              <p><b>Native Name:</b> {countryData.nativeName}</p>
              <p><b>Population:</b> {countryData.population}</p>
              <p><b>Region:</b> {countryData.region}</p>
              <p><b>Sub Region:</b> {countryData.subRegion}</p>
              <p><b>Capital:</b> {countryData.capital}</p>
              <p><b>Top Level Domain:</b> {countryData.topLevelDomain}</p>
              <p><b>Currencies:</b> {countryData.currencies}</p>
              <p><b>Languages:</b> {countryData.languages}</p>
            </div>
            <div className="border-countries">
              <b>Border Countries:</b>&nbsp;
              {countryData.borders.length > 0 ? (
                countryData.borders.map((border) => (
                  <Link to={`/${border}`} key={border}>{border}</Link>
                ))
              ) : (
                <span>No Border Countries</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CountryDetails;
