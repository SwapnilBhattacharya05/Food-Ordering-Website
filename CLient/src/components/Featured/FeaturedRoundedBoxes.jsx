import "./FeaturedRoundedBoxes.css";

const FeaturedRoundedBoxes = ({ items }) => {
    return (
        <div className="row mt-4">
            {
                items.map((curElem, index) => {
                    return (
                        <div className="col-md-4 col-sm-6 col-lg-2" key={index}>
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