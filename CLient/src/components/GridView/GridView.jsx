import './GridView.css';
const GridView = ({ data = [] }) => {

    return (
        <div className='container grid-view'>
            {
                data.map((curElem, index) => {
                    return (
                        <div key={index} className='card'>
                            <figure className='card-image-container'>
                                <img src={curElem.imgUrls[0]} alt={curElem.name} />
                                <figcaption>{curElem.name}</figcaption>
                            </figure>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default GridView;