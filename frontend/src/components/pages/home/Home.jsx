import React, { useState } from 'react';
import HeroHeader from '../../hero-header/HeroHeader.jsx';
import Services from '../../services/Services.jsx';
import TourList from '../../tours/TourList.js';
import Pagination from '../../pagination/Pagination.jsx';
import Sortinput from '../../sort-input/Sortinput.jsx';
import Banner from '../../banner/Banner.jsx';
import Newsletter from '../../news-letter/Newsletter.jsx';
import { toursList } from "../../data.js";
import paginate from '../../utils/Paginate.js';  // Assurez-vous que ce chemin est correct

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortItem, setSortItem] = useState("recommended");

  // Trier les circuits
  const sortedTourList = 
    sortItem === "low" 
    ? [...toursList].sort((a, b) => a.priceFrom - b.priceFrom)
    : sortItem === "high" 
      ? [...toursList].sort((a, b) => b.priceFrom - a.priceFrom)
      : [...toursList].sort((a, b) => b.rating - a.rating);

  const { pages, orderedTourList } = paginate(toursList.length, sortedTourList, currentPage);

  return (
    <div>
      <HeroHeader/>
      <Services/>
      <Sortinput setSortItem={setSortItem} sortItem={sortItem} toursLength={toursList.length} />
      <TourList toursList={orderedTourList}/>
      <Pagination pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
      <Banner/>
      <Newsletter/>
    </div>
  )
}

export default Home;
