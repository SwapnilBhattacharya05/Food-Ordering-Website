import { Rating } from '@mui/material'
import React from 'react'

const RenderRatings = ({ rating }) => {
    return (
        <div>
            <Rating name="read-only" value={rating} precision={0.5} readOnly size='large' />
        </div>
    )
}

export default RenderRatings