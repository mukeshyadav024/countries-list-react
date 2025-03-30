
import { useTheme } from "../hooks/useTheme";


export default function Header() {
 let [isDark,setIsDark]=useTheme()
  
  // if(isDark){
  //   document.body.classList.toggle("dark");
  // }else{
  //   document.body.classList.remove("dark");
  // }



  return (
    <header className={`header-container ${isDark ? "dark" : ""}`}>
      <div className="header-content">
        <h2 className="title">
          <a href="/">Where in the world?</a>
        </h2>
        <p
          className="theme-changer"
          onClick={() => {
            setIsDark(!isDark);
            localStorage.setItem("isDarkMode", !isDark );
        
          }}
        >
          <i className={`fa-solid fa-${isDark ? "sun" : "moon"}`} />
          &nbsp;&nbsp;{isDark ? "light" : "dark"} Mode
        </p>
      </div>
    </header>
  );
}
