import { Skeleton } from '@mui/material'
const ListSkeleton = () => {
    return (
        <div className='list-view'>
            {
                Array(3).fill().map((_, index) => {
                    return (
                        <div key={index} className='skeleton-card'>
                            <figure className='skeleton-card-image-container'>
                                <Skeleton animation="wave" variant="rectangular" width={"100%"} height={"100%"} />
                            </figure>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ListSkeleton