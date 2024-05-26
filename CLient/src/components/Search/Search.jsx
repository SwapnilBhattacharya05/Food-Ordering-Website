import "./Search.css";
import Navbar from '../Navbar/Navbar';
import Footer from "../Footer/Footer";
import FilterSection from "./FilterSection";
import SearchResults from "./SearchResults";
import SortingSection from "./SortingSection";
import { useEffect } from "react";
import BackToTop from "../../Helper/BackToTop";

const Search = () => {

  useEffect(() => {
    BackToTop();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container search-container">
        <div className="first-container">
          <FilterSection />
        </div>

        <div className="second-container">
          <SortingSection />
          <SearchResults />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Search;