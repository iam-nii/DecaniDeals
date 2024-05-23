import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const [sidebardata, setSidebardata] = useState({
    searchTerm: " ",
    type: "all",
    productionRate: 0,
    sort: "created_at",
    order: "desc",
  });
  const [loading, setLoading] = useState(false)
  const [listings, setListings] = useState([]);
  console.log(listings)
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type');
    const productionRate = urlParams.get('productionRate');

    console.log("Location search: ", location.search);
    console.log("URL Params: ", urlParams.toString());

    if (searchTermFromUrl || typeFromUrl || productionRate) {
        setSidebardata({
            searchTerm: searchTermFromUrl || '',
            type: typeFromUrl || 'all',
            productionRate: productionRate || 0,
            sort: 'created_at',
            order: 'desc',            
        });
    }

    const fetchListings = async () => {
        setLoading(true);
        const searchQuery = urlParams.toString();
        console.log("Search Query: ", searchQuery);
        const res = await fetch(`/api/listing/get?${searchQuery}`);
        const data = await res.json();
        console.log("Data received: ", data);
        setListings(data);
        setLoading(false);
    };
    fetchListings();
}, [location.search]);

  
  const navigate = useNavigate();
  const handleChange = (e) => {
    if(e.target.id === 'all' || e.target.id === 'bag' || e.target.id === 'film'){
        setSidebardata({...sidebardata, type: e.target.id})
    }
    if(e.target.id === 'searchTerm'){
        const search_term = e.target.value.replace("")
        setSidebardata({...sidebardata, searchTerm: e.target.value})
    }
    if (e.target.id === 'productionRate'){
        setSidebardata({...sidebardata, productionRate: e.target.value})
    }
    if(e.target.id === 'sort_order'){
        const sort = e.target.value.split('_')[0] || 'created_at';
        const order = e.target.value.split('_')[1] || 'desc';
        setSidebardata({...sidebardata, sort, order})

    }

  };
  const handleSubmit = (e) =>{
    e.preventDefault();

    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sidebardata.searchTerm);
    urlParams.set('type', sidebardata.type);
    urlParams.set('productionRate', sidebardata.productionRate);
    urlParams.set('sort', sidebardata.sort);
    urlParams.set('order', sidebardata.order);

    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  }

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="flex items-center gap-2">
            <label className=" font-semibold whitespace-nowrap">Поиск: </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Поиск..."
              className=" border rounded-lg p-3 w-full"
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-2">
            <label className="font-semibold">Вид: </label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="all"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.type === "all"}
              />
              <span>Пленки & Пакети</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="film"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.type === "film"}
              />
              <span>Пленки </span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="bag"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.type === "bag"}
              />
              <span>Пакети</span>
            </div>
          </div>
          <div className="flex gap-2">
            <label className="font-semibold">Производительность: </label>
            <div className="flex gap-2">
              <input
                type="number"
                id="productionRate"
                className="w-20 h-8 border rounded p-2"
                onChange={handleChange}
              />
              <span>кг/ч</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Сортировка:</label>
            <label>
              <select id="sort_order" className="border rounded-lg p-3" onChange={handleChange} defaultValue={'created_at_desc'}>
                <option value='price_asc'>Дешевле</option>
                <option value='price_desc'>Дороже</option>
                <option value='createdAt_desc'>Новинки</option>
                <option value='createdAt_asc'>Старинки</option>
              </select>
            </label>
          </div>
          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
            Поиск
          </button>
        </form>
      </div>
      <div className="">
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
          Результаты поиска:{" "}
        </h1>
      </div>
    </div>
  );
}
