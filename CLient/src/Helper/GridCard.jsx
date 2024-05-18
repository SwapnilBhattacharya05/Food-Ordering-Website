import React from 'react'
import { Link } from 'react-router-dom';
import { useAppContext } from '../Context/AppContext';
import FormatPrice from './FormatPrice';
import Star from '@mui/icons-material/Star';
const GridCard = ({ data, index }) => {
    const { mode } = useAppContext();
    const address = data.address.split(',');
    return (
        <Link to={`/restaurant/${data._id}`} key={index} style={mode === 'light-mode' ? { textDecoration: 'none', color: 'black' } : { textDecoration: 'none', color: 'white' }}>
            <div key={index} className='grid-card'>
                <figure className='card-image-container'>
                    <img src={data.imgUrls[0]} alt={data.name} />
                    <div className='figcaption-container'>
                        <figcaption className='card-figcaption'>{data.name}</figcaption>
                        <div className='card-rating-container'
                            style={data.rating === 0 ?
                                {
                                    marginBottom: 0, color: 'green',
                                    backgroundColor: 'white', border: '1px solid green'
                                }
                                : null
                            }
                        >
                            {
                                data.rating === 0 ?
                                    <p style={{ marginBottom: 0, color: 'green' }}>New</p>
                                    :
                                    <p style={{ marginBottom: 0 }}>
                                        {data.rating}
                                    </p>
                            }
                            <Star fontSize='small' className='card-star' />
                        </div>
                    </div>
                </figure>
                <div className='grid-card-footer'>
                    <p>{data.keywords.slice(0, 20)}...</p>
                    <p><FormatPrice price={1000} /> for two</p>
                </div>
                <p className='grid-card-address'>
                    {
                        address.length === 1 ? `${address[0]}, ${data.city}` : `${address[1]}, ${data.city}`
                    }
                </p>
            </div>
        </Link>
    )
}

export default GridCard