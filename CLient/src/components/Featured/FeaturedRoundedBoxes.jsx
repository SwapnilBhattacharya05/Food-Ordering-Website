import "./FeaturedRoundedBoxes.css";
import { useFilterContext } from "../../Context/FilterContext";
import { useNavigate } from "react-router-dom";
const FeaturedRoundedBoxes = ({ items, searchBy }) => {
    const { updateFilterValue } = useFilterContext();
    const navigate = useNavigate();
    const updateValue = (curElem) => {
        let event = {
            target: {
                name: "cuisine",
                value: curElem.name
            }
        }
        updateFilterValue(event);
        event = {
            target: {
                name: "searchBy",
                value: searchBy
            }
        }
        updateFilterValue(event);
        navigate(`/search`);
    }
    return (
        <div className="row mt-4">
            {
                items.map((curElem, index) => {
                    return (
                        <div
                            onClick={() => updateValue(curElem)}
                            className="col-md-4 col-sm-6 col-lg-2"
                            key={index}
                        >
                            <figure className="category-figure-container">
                                <img className="category-img" src={curElem.link} alt={curElem.name} />
                                <figcaption className="category-figcaption mt-2">{curElem.name}</figcaption>
                            </figure>
                        </div>
                    );
                })
            }
        </div>
    )
}

export default FeaturedRoundedBoxes