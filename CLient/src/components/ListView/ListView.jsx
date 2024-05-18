import { useFilterContext } from "../../Context/FilterContext";
import ListSkeleton from "./ListSkeleton";
import "./ListView.css";
import RenderRatings from "../../Helper/RenderRatings";
import KeywordBox from "../KeywordBox";
import FormatPrice from "../../Helper/FormatPrice";
import { Link } from "react-router-dom";
import { useAppContext } from "../../Context/AppContext";
const ListView = ({ data = [] }) => {
    const { isLoading } = useFilterContext();
    const { mode } = useAppContext();

    console.log(data);
    if (isLoading) {
        return <ListSkeleton />;
    } else {
        return (
            <div className='list-view'>
                {
                    data.map((curElem, index) => {
                        const address = curElem.address.split(',');
                        const keywords = curElem.keywords.split(',').slice(0, 3);
                        return (
                            <Link key={index} to={`/restaurant/${curElem._id}`} style={mode === 'light-mode' ? { textDecoration: 'none', color: 'black' } : { textDecoration: 'none', color: 'white' }}>
                                <div className='list-card'>
                                    <div className='list-card-image-container'>
                                        <img src={curElem.imgUrls[0]} alt="cover" />
                                    </div>
                                    <div className="list-card-content">
                                        <div className="list-card-text-container">
                                            <h3>{curElem.name}</h3>
                                            <RenderRatings className="list-card-rating" rating={curElem.rating} size="medium" />
                                        </div>
                                        <div className="list-card-keywords">
                                            {
                                                keywords.map((keyword, index) => {
                                                    return <KeywordBox key={index} keyword={keyword} />;
                                                })
                                            }
                                        </div>
                                        <div className="list-card-cuisine">
                                            <p style={{ marginBottom: 0 }}>
                                                {`Cuisine: ${curElem.cuisine}`}
                                            </p>
                                        </div>
                                        <div className="list-card-hours">
                                            <p style={{ marginBottom: 0 }}>{`Opening Hours: ${curElem.hours}`}</p>
                                        </div>
                                        <div className="list-card-address">
                                            {
                                                address.length === 1 ? <p style={{ marginBottom: 0 }}>
                                                    {`${address[0]}, ${curElem.city}`}
                                                </p> : <p style={{ marginBottom: 0 }}>{`${address[1]}, ${curElem.city}`}</p>
                                            }
                                        </div>
                                        <div className="list-card-price">
                                            <p style={{ marginBottom: 0 }}>
                                                <FormatPrice price={0} /> <span>for two</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        );
    }
}

export default ListView;