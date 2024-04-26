import React from 'react'

const RestaurantPageMenuComponent = ({ name, img }) => {
  const style = {
    borderRadius: "10px",
    cursor: "pointer",
    border: "2px solid green",
  }

  return (
    <div className='container mt-3'>
      <h5>{name} Menu</h5>
      <img style={style} src={img} alt="menu" height={"300px"} width={"300px"} />
    </div>
  )
}

export default RestaurantPageMenuComponent