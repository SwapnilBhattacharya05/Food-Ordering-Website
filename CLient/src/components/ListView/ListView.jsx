import "./ListView.css";

const ListView = ({ data = [] }) => {
    return (
        <div className='list-view'>
            {
                data.map((curElem,index) => {
                    return (
                        <div key={index} className='card'>
                            <figure className='card-image-container'>
                                <img src={curElem.imgUrls[0]} alt="cover" />
                            </figure>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default ListView;