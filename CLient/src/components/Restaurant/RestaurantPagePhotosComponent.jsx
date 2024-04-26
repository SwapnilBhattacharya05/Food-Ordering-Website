import { Skeleton } from '@mui/material'
import React from 'react'

const RestaurantPagePhotosComponent = ({ name, img = [] }) => {
  const style = {
    borderRadius: "10px",
    border: "2px solid green",
    cursor: "pointer",
    margin: "0 auto 10px auto",
    display: "block",
    objectFit: "cover",
  }

  return (
    <div className='container mt-3'>
      <h5>{name} Photos</h5>
      <div className='row'>
        {
          img ? img.map((currElem, index) => {
            return (
              <div key={index} className='col-lg-4 col-md-6 col-sm-12'>
                <img key={index} style={style} src={currElem} alt="menu" height={"300px"} width={"300px"} />
              </div>
            )
          }) :
            <Skeleton animation="wave" variant="rectangular" width={"300px"} height={"300px"} />
        }
      </div>
    </div>
  )
}

export default RestaurantPagePhotosComponent