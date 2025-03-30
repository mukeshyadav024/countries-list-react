
import { useEffect, useState } from "react";
import CountryCard from "./CountryCard";
import CountriesListShimmer from "./CountriesListShimmer";

export default function CountriesList({ query , region}) {

  const [countriesData, setCountriesData] = useState ([]);


  useEffect(() => {
    let url = "https://restcountries.com/v3.1/all";

    if (region && region !== "all") {
      url = `https://restcountries.com/v3.1/region/${region}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountriesData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [region]);



  const array = countriesData
    .filter((country) => country.name.common.toLowerCase().includes(query) )
    .map((country) => {
      return (
        <CountryCard
          key={country.name.common}
          name={country.name.common}
          flag={country.flags.svg}
          population={country.population.toLocaleString("en-IN")}
          region={country.region}
          capital={country.capital?.[0]}
          data={country}
        />
      );
    });
  return(
  <>
 
 {!countriesData.length ?( <CountriesListShimmer />) :<div className="countries-container">{array}</div>};
  </>)
  
}
