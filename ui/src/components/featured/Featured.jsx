import useFetch from '../../hooks/useFetch'
import './featured.css'
const Featured = () => {
    const {data,loading,error} = useFetch('/hotels/countByCity?cities=Turin,Genoa,Roma')

   
  return (

    <div className='featured'>
        {loading ? "Loading Please Wait....." : <> <div className="featuredItem">
            <img src="https://t-cf.bstatic.com/xdata/images/city/square250/613105.webp?k=1e85cf4dec7b0d5a6327be91c38cf9c1711f9da1a31c4cba736f9cb751443ff1&o=" alt="" className='featuredImg'/>
            <div className="featuredTitles">
                <h1>Roma</h1>
                <h2>{data[2]} properties</h2>
            </div>
        </div>
      
        <div className="featuredItem">
            <img src="https://t-cf.bstatic.com/xdata/images/city/square250/619644.webp?k=5b21ac6d3d913a54274d6546e60adb2c3c138d661dd1a2bd7b3aed53e9df0b65&o=" alt="" className='featuredImg'/>
            <div className="featuredTitles">
                <h1>Genoa</h1>
                <h2>{data[1]} properties</h2>
            </div>
        </div>
        <div className="featuredItem">
            <img src="https://t-cf.bstatic.com/xdata/images/hotel/square600/90210945.webp?k=8f558f895ee10ef24d92296b191fa9dda12f57a9b9bd3c6a234fe6e01215f60d&o=&s=1" alt="" className='featuredImg'/>
            <div className="featuredTitles">
                <h1>Turin</h1>
                <h2>{data[0]} properties</h2>
            </div>
        </div> </>}
    </div>
  )
}

export default Featured