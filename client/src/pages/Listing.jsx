import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import {
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaShare,
  FaTachometerAlt,
} from "react-icons/fa";

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const params = useParams();
  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);
  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div className="h-[550px] w-full overflow-hidden">
                  <img
                    src={url}
                    alt="Image"
                    className="h-full w-full object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
            <p className="text-2xl font-semibold">
              {listing.name} - ${listing.price}
            </p>
            <p className="flex items-center mt-6 gap-2 text-slate-600  text-sm">
              <FaMapMarkedAlt className="text-green-700" />
              {listing.address}
            </p>
            <div className="flex gap-3">
              <p>Оборудование для : </p>
              <p className="bg-red-900 w-full max-w-[100px] text-white text-center p-1 rounded-md">
                {listing.type === "bag" ? "Пакетов" : "пленок"}
              </p>
            </div>
            <p className="text-slate-400">
              <span className="font-semibold text-black">Описание - </span>
              {listing.description}
            </p>
            <div></div>
            <div className="flex gap-4 flex-wrap">
              <ul>
                <li className="text-sm bg-green-900 w-full min-w-[200px] text-white text-center p-1 rounded-md">
                    {listing.productionRate} кг/ч Произ.
                </li>
              </ul>
              {listing.rubberWidth ? (
                <ul className="flex gap-4 flex-wrap">
                  <li className="text-sm bg-orange-600 w-full min-w-[200px] max-w-[200px] text-white text-center p-1 rounded-md">Ширина - {listing.rubberWidth} мм</li>
                  <li className="text-sm bg-indigo-500 w-full min-w-[200px] max-w-[200px] text-white text-center p-1 rounded-md">Глубина - {listing.rubberDepth} мм</li>
                </ul>
              ) : (
                <ul>
                  <li className="text-sm bg-indigo-500 w-full min-w-[200px] text-white text-center p-1 rounded-md">Толшина - {listing.filmThickness} мм</li>
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
