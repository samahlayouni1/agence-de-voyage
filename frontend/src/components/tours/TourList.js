import "./tour-list.css";
import TourItem from "./TourItem.jsx";

const TourList = ({ toursList }) => {
  return (
    <div className="tour-list">
      {toursList.map((item, index) => (
        <TourItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default TourList;
