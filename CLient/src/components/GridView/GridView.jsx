import { useFilterContext } from '../../Context/FilterContext';
import './GridView.css';
import GridSkeleton from './GridSkeleton';
import GridCard from '../../Helper/GridCard';
const GridView = ({ data = [], searchBy }) => {
    const { isLoading } = useFilterContext();

    if (isLoading) {
        return <GridSkeleton />
    } else {
        return (
            <div className='container grid-view'>
                {
                    data.map((curElem, index) => {
                        return <GridCard searchBy={searchBy} data={curElem} key={index} />
                    })
                }
            </div>
        )
    }
}

export default GridView;