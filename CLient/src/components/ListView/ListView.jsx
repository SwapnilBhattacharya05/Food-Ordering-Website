import { useFilterContext } from "../../Context/FilterContext";
import ListSkeleton from "./ListSkeleton";
import "./ListView.css";
import RenderRatings from "../../Helper/RenderRatings";
import KeywordBox from "../KeywordBox";
import FormatPrice from "../../Helper/FormatPrice";
import { Link } from "react-router-dom";
import { useAppContext } from "../../Context/AppContext";
import ListCardItem from "./ListCardItem";
const ListView = ({ data = [] }) => {
    const { filter: { searchBy }, isLoading } = useFilterContext();
    const { mode } = useAppContext();

    if (isLoading) {
        return <ListSkeleton />;
    } else {
        return (
            <div className='list-view'>
                {
                    searchBy === "Restaurants" ?
                        data.map((curElem, index) => {
                            const address = curElem.address ? curElem.address.split(',') : [];
                            const keywords = curElem.keywords ? curElem.keywords.split(',').slice(0, 3) : [];
                            const imgUrls = curElem.imgUrls ? curElem.imgUrls[0] : 'https://img.freepik.com/free-photo/textured-background-white-tone_53876-128610.jpg';
                            return (
                                <Link key={index} to={`/restaurant/${curElem._id}`} style={mode === 'light-mode' ? { textDecoration: 'none', color: 'black' } : { textDecoration: 'none', color: 'white' }}>
                                    <div className='list-card'>
                                        <div className='list-card-image-container'>
                                            <img src={imgUrls} alt="cover" />
                                        </div>
                                        <div className="list-card-content">
                                            <div className="list-card-text-container">
                                                <h3>{curElem.name}</h3>
                                                <RenderRatings className="list-card-rating" rating={curElem.rating} size="medium" />
                                            </div>
                                            <div className="list-card-keywords">
                                                {
                                                    keywords && keywords.map((keyword, index) => {
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
                                                    address && address.length === 1 ? <p style={{ marginBottom: 0 }}>
                                                        {`${address[0]}, ${curElem.city}`}
                                                    </p> : <p style={{ marginBottom: 0 }}>{`${address[1]}, ${curElem.city}`}</p>
                                                }
                                            </div>
                                            <div className="list-card-price">
                                                <p style={{ marginBottom: 0 }}>
                                                    <FormatPrice price={1000} /> <span>for two</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )
                        }) : data.map((curElem, index) => {
                            return (
                                <ListCardItem key={index} foodItem={curElem} />
                            )
                        })
                }
            </div>
        );
    }
}

export default ListView;