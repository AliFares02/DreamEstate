import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import ListingItem from '../components/ListingItem';

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation])

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    }

    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchListings();
  }, [])
  return (
    <div>
      {/* top */}
      <div className='flex flex-col gap-6 py-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
          Find your <span className='text-slate-500'>dream home</span> 
          <br/>
          <span className='text-slate-500'>today</span> 
        </h1>
        <div className='text-gray-400 text-xs sm:text-sm'>
          Ali Estate is the only tool you'll ever need to find your dream home, offering a wide range of selections right at your fingertips.
        </div>
        <div className='w-50px'>
          <Link to={'/search'} className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'>
          Click here to get started!
          </Link>
        </div>
        
      </div>


      {/* swiper */}
      
       {offerListings && offerListings.length > 0 && (
        <div>
        <Swiper navigation style={{userSelect: 'none'}}>
         {offerListings.map((listing) => (
          <SwiperSlide>
            <img src={listing.imageUrls[0]} alt={`listings`} style={{ width: '100%', height: '500px', objectFit: 'cover'}}/>
          </SwiperSlide>
          ))} 
        </Swiper>
        </div>
       )}
       
      
    {/* listing results for offer, sale and rent */}
        <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
          {offerListings && offerListings.length > 0 && (
              <div>
                <div className='my-3'>
                  <h2 className='text-2xl font-semibold text-slate-600'>Recent Offers</h2>
                  <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>
                    Show more offers
                  </Link>
                </div>
                
                <div className='flex flex-wrap gap-4'>
                  {offerListings.map((listing) => (
                      <ListingItem listing={listing} key={listing._id}/>
                    ))}
                </div>
              </div>
            )}

          {rentListings && rentListings.length > 0 && (
              <div>
                <div className='my-3'>
                  <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
                  <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>
                    Show more places for rent
                  </Link>
                </div>
                
                <div className='flex flex-wrap gap-4'>
                  {rentListings.map((listing) => (
                      <ListingItem listing={listing} key={listing._id}/>
                    ))}
                </div>
              </div>
            )}

          {saleListings && saleListings.length > 0 && (
              <div>
                <div className='my-3'>
                  <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sale</h2>
                  <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>
                    Show more places for sale
                  </Link>
                </div>
                
                <div className='flex flex-wrap gap-4'>
                  {saleListings.map((listing) => (
                      <ListingItem listing={listing} key={listing._id}/>
                    ))}
                </div>
              </div>
            )}
            


        </div>
    </div>
  )
}
