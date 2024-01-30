import { MdOutlineBakeryDining } from "react-icons/md";
import { LuSoup } from "react-icons/lu";
import { MdOutlineBrunchDining } from "react-icons/md";
import { RiCake3Line } from "react-icons/ri";
import { LuSandwich } from "react-icons/lu";


const FilterCard = () => {

    return (
        <div className="filter">
            <LuSandwich className="snack"></LuSandwich>
            <MdOutlineBakeryDining className="breakfast"></MdOutlineBakeryDining>
            <LuSoup className="lunch"></LuSoup>
        <MdOutlineBrunchDining className="dinner"></MdOutlineBrunchDining>
            <RiCake3Line className="dessert"></RiCake3Line>


        </div>
    )
}

export default FilterCard