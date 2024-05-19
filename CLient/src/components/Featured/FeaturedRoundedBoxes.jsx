import "./FeaturedRoundedBoxes.css";
import { useFilterContext } from "../../Context/FilterContext";
import { useNavigate } from "react-router-dom";
const FeaturedRoundedBoxes = ({ items, searchBy }) => {
    const { updateFilterValue } = useFilterContext();
    const navigate = useNavigate();
    const updateValue = (curElem) => {
        const events = [
            searchBy === "Restaurants" ? { name: "cuisine", value: curElem.name } : { name: "cuisine", value: "All" },
            { name: "searchBy", value: searchBy },
            ...(searchBy === "Dishes" ? [{ name: "text", value: curElem.name }] : [{ name: "text", value: "" }])
        ];

        events.forEach(({ name, value }) => {
            if (name && value !== undefined) {
                updateFilterValue({ target: { name, value } });
            }
        });

        navigate(`/search`);
    };

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