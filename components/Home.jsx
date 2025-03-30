import SearchBar from "./SearchBar";
import SelectMenu from "./SelectMenu";
import CountriesList from "./CountriesList";
import { useState } from "react";

import { useTheme } from "../hooks/useTheme";


const Home = () => {
      const [query,setQuery]=useState('')
      const [region,setRegion]=useState('')

const [isDark]=useTheme()

  return (
    <main className={`${isDark ? "dark" : ""}`}>
      <div className="search-filter-container">
        <SearchBar setQuery={setQuery} />
        <SelectMenu setRegion={setRegion}/>
      </div>
     
      <CountriesList query={query} region={region} />
      </main>
  )
}

export default Home