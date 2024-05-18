import { Rating } from '@mui/material'
import React from 'react'

const RenderRatings = ({ rating, className, size }) => {
    return (
        <div className={className}>
            <Rating name="read-only" value={rating} precision={0.5} readOnly size={size} />
        </div>
    )
}

export default RenderRatings;