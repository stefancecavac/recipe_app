import { MdOutlineBakeryDining } from "react-icons/md";
import { LuSoup } from "react-icons/lu";
import { MdOutlineBrunchDining } from "react-icons/md";
import { RiCake3Line } from "react-icons/ri";
import { LuSandwich } from "react-icons/lu";


const FilterCard = ({onFilter}) => {

    return (
        <div className="filter">

            
            <button className="snack" onClick={() => onFilter('snack')}>
                <LuSandwich className="snackIcon"></LuSandwich>
                <p>snack</p>
            </button>
            <button className="breakfast" onClick={() => onFilter('breakfast')}>
                <MdOutlineBakeryDining className="breakfastIcon"></MdOutlineBakeryDining>
                <p>breakfast</p>
            </button>
            <button className="lunch" onClick={() => onFilter('lunch')}>
                <LuSoup className="lunchIcon"></LuSoup>
                <p>lunch</p>
            </button>
            <button className="dinner" onClick={() => onFilter('dinner')}>
                <MdOutlineBrunchDining className="dinnerIcon"></MdOutlineBrunchDining>
                <p>dinner</p>
            </button>
            <button className="dessert" onClick={() => onFilter('desert')}>
                <RiCake3Line className="dessertIcon"></RiCake3Line>
                <p>dessert</p>
            </button>



        </div>
    )
}

export default FilterCard