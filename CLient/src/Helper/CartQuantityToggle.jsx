import React from 'react'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useAppContext } from '../Context/AppContext';
const CartQuantityToggle = ({ quantity, onIncrement, onDecrement }) => {
  const { mode } = useAppContext();

  const style = {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
    justifyContent: "center",
  }

  return (
    <div style={style}>
      <button className='cart-quantity-toggle-button'
        onClick={onDecrement}
        style={{ color: "gray" }}
      >
        <RemoveIcon />
      </button>
      <span style={{ color: mode === "light-mode" ? "black" : "white", fontSize: "20px", fontWeight: "bolder" }}>{quantity}</span>
      <button className='cart-quantity-toggle-button'
        onClick={onIncrement}
        style={{ color: "gray" }}
      >
        <AddIcon />
      </button>
    </div>
  )
}

export default CartQuantityToggle