import './list.css'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/Header/Header'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import { format } from 'date-fns'
import { DateRange } from 'react-date-range'
import SearchItems from '../../components/SearchItems/SearchItems'
import useFetch from '../../hooks/useFetch'

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination)
  const [dates, setDates] = useState(location.state.dates)
  const [openDate, setOpenDate] = useState(false)
  const [options, setoptions] = useState(location.state.options)
  const [min, setMin] = useState(undefined)
  const [max, setMax] = useState(undefined)
  const { data, loading, error ,refetch} = useFetch(`/hotels?city=${destination}&min=${min || 0 }&max=${max || 999}`)
  const handleClick = () =>{
    refetch();
  }
 
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className='listTitle'>
              Search
            </h1>
            <div className="lsItem">
              <label>Destination</label>
              <input type="text" placeholder={destination} />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}
              </span>
              {
                openDate && <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              }

            </div>
            <div className="lsItem">
              <label >Options</label>
              <div className="isOptions">
                <div className="lsOptionItem">
                  <span className="isOptionText">
                    Min price  <small>per night</small>
                  </span>
                  <input onChange={e=>setMin(e.target.value)} type="number" className="isOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="isOptionText">
                    Max price  <small>per night</small>
                  </span>
                  <input onChange={e=>setMax(e.target.value)} type="number" className="isOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="isOptionText">
                    Adult
                  </span>
                  <input min={1} type="number" className="isOptionInput" placeholder={options.adult} />
                </div>
                <div className="lsOptionItem">
                  <span className="isOptionText">
                    Children
                  </span>
                  <input min={0} type="number" className="isOptionInput" placeholder={options.children} />
                </div>
                <div className="lsOptionItem">
                  <span className="isOptionText">
                    Room
                  </span>
                  <input min={1} type="number" className="isOptionInput" placeholder={options.room} />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="listResult">
            {
              loading ? 'loading please wait...' : <>
                {
                  data.map(item => (
                    <SearchItems key={item._id} item={item} />
                  ))
                }
              </>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default List