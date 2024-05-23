import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import Swipercode from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import ListingItem from "../components/ListingItem";

export default function Home() {
  const [bagListings, setBagListings] = useState([]);
  const [filmListings, setFilmListings] = useState([]);
  Swipercode.use([Navigation]);
  console.log(bagListings);

  useEffect(() => {
    const fetchBagListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=bag&limit=4");
        const data = await res.json();
        setBagListings(data);
        fetchFilmListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchFilmListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=film&limit=4");
        const data = await res.json();
        setFilmListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBagListings();
  }, []);
  return (
    <div>
      {/* top */}
      <div className="flex flex-col gap-6 py-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Мир Продажи и Покупки Оборудования для{" "}
          <span className="text-slate-500">Производства</span> <br />
          Пленок и Пакетов
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm">
          Добро пожаловать на нашу платформу, где вы можете найти лучшее
          оборудование для производства пластиковых пленок и пакетов. <br />
          Продавайте свое оборудование или найдите новые возможности для
          расширения вашего бизнеса с нашей обширной базой предложений от
          надежных продавцов.
        </div>
        <Link
          to={"/search"}
          className="text-xs sm:text-sm text-blue-800 font-bold hover:underline"
        >
          Поехали...
        </Link>
      </div>

      {/* swiper */}
      <Swiper navigation>
        {bagListings &&
          bagListings.length > 0 &&
          bagListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                className="h-[500px]"
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* listing results for bags and films*/}

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {bagListings && bagListings.length > 0 && (
          <div className="">
            <div
              className="my-3"
            >
              <h2 className="text-2xl font-semibold text-slate-600">
                Оборудования для произвоства Пакетов
              </h2>
              <Link
                className="hover:underline text-blue-600 text-sm"
                to={"/search?type=bag"}
              >Показать ещё</Link>
              
            </div>
            <div className="flex flex-wrap gap-4">
              {bagListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {filmListings && filmListings.length > 0 && (
          <div className="">
            <div
              className="my-3"
            >
              <h2 className="text-2xl font-semibold text-slate-600">
                Оборудования для производства пленок
              </h2>
              <Link
                className="hover:underline text-blue-600 text-sm"
                to={"/search?type=bag"}
              >Показать ещё</Link>
              
            </div>
            <div className="flex flex-wrap gap-4">
              {filmListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
