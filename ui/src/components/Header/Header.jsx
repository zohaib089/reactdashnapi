import { faCalendarDays } from '@fortawesome/free-regular-svg-icons'
import { faBed, faCar, faPerson, faPlane, faTaxi } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { format } from 'date-fns'
import { useContext, useState } from 'react'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import { useNavigate } from 'react-router-dom'
import {SearchContext} from '../../components/context/SearchContext';
import { AuthContext } from '../context/AuthContext'

import './header.css'

const Header = ({type}) => {
    const [dates, setDates] = useState([{
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    }])
    const [destination, setDestination] = useState("");
    const [openDate, setOpenDate] = useState(false);
    const [openOption, setOption] = useState(false);
    const navigate = useNavigate();
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1

    });
    const {user} = useContext(AuthContext);
    const handleOption = (name, operation) => {
        setOptions((prev) => {
            return {
                ...prev,
                [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
            }
        })
    }
    const {dispatch} = useContext(SearchContext);

    const handleSearch =()=>{
        dispatch({
            type:"NEW_SEARCH",
            payload:{
                destination,dates,options 
            }
        })
       navigate("/hotels",{
           state:{destination,dates,options}
       })   
    }

   


    return (
        <div className="header">
            <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>
                <div className="headerList">
                    <div className="headerListItem active">
                        <FontAwesomeIcon icon={faBed} />
                        <span>Stays</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faPlane} />
                        <span>Flights</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faCar} />
                        <span>Car Rental</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faBed} />
                        <span>Attractions</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faTaxi} />
                        <span>Airport taxis</span>
                    </div>
                </div>

               { type !== "list" &&   <> <h1 className="headerTitle">
                    A lifetime of discounts? It's Genius.
                </h1>
                <p className="headerDescription">
                    Get Reward for your travel && unlock instant saving or more with a free Yunx Account
                </p>
                {!user && <button className="headerBtn">Sign in / Register</button>}
                <div className="headerSearch">
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faBed} className="headerIcon" />
                        <input type="text" placeholder='where are you going' className='headerSearchInput' onChange={e=>setDestination(e.target.value)} />
                    </div>
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                        <span onClick={() => setOpenDate(!openDate)} className="headerSearchText">{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")} `}</span>
                        {
                            openDate && <DateRange
                                editableDateInputs={true}
                                onChange={item => setDates([item.selection])}
                                moveRangeOnFirstSelection={false}
                                ranges={dates}
                                className="date"
                                minDate={new Date()}
                            />
                        }

                    </div>
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                        <span onClick={() => setOption(!openOption)} className="headerSearchText">{`${options.adult} adult .  ${options.children} children . ${options.room} room`}</span>
                        {
                            openOption && <div className="options">
                                <div className="optionItem">
                                    <span className="optionText">Adult</span>
                                    <div className="optionCounter">
                                        <button className="optionCounterButton" disabled={options.adult <= 1} onClick={() => handleOption("adult", "d")}>-</button>
                                        <span className="optionCounterNumber">{options.adult}</span>
                                        <button className="optionCounterButton" onClick={() => handleOption("adult", "i")}>+</button>
                                    </div>
                                </div>
                                <div className="optionItem">

                                    <span className="optionText">Children</span>
                                    <div className="optionCounter">
                                        <button className="optionCounterButton" disabled={options.children < 1} onClick={() => handleOption("children", "d")}>-</button>
                                        <span className="optionCounterNumber">{options.children}</span>
                                        <button className="optionCounterButton" onClick={() => handleOption("children", "i")}>+</button>
                                    </div>
                                </div>
                                <div className="optionItem">

                                    <span className="optionText">Room</span>
                                    <div className="optionCounter">
                                        <button className="optionCounterButton" disabled={options.room <= 1} onClick={() => handleOption("room", "d")}>-</button>
                                        <span className="optionCounterNumber" >{options.room}</span>
                                        <button className="optionCounterButton" onClick={() => handleOption("room", "i")}>+</button>
                                    </div>
                                </div>
                            </div>
                        }


                    </div>
                    <div className="headerSearchItem">
                        <button onClick={handleSearch} className="headerBtn">Search</button>
                    </div>
                </div> </> }
            </div>
        </div>
    )
}



export default Header 