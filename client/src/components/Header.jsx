import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) =>{
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm',searchTerm);
    const seachQuery = urlParams.toString();
    navigate(`/search?${seachQuery}`); 

  }
  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl){
        setSearchTerm(searchTermFromUrl);
    }
  },[location.search])

  return (
    <header className="bg-blue-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-md sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Decani</span>
            <span className="text-slate-700">Deals</span>
          </h1>
        </Link>

        <form onSubmit={handleSubmit} className="bg-blue-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            value={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}
          />
          <button><FaSearch className="text-slate-500" /></button>
          
        </form>
        <ul className="flex items-center justify-evenly gap-7 sm:gap-4">
          <Link to={"/"}>
            <li className="hidden sm:inline hover:underline">Home</li>
          </Link>
          <Link to={"/about"}>
            <li className="hidden sm:inline hover:underline">About</li>
          </Link>
          {currentUser ? (
            <Link to={"/profile"}>
              <img
                className="h-10 w-10 rounded-full object-cover"
                src={currentUser.avatar}
                alt="profile"
              />
            </Link>
          ) : (
            <Link to={"/sign-in"}>
              <li className="hidden sm:inline hover:underline">Sign in</li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
}
