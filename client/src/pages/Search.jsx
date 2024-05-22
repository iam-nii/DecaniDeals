import React from "react";

export default function Search() {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className=" font-semibold whitespace-nowrap">Поиск: </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Поиск..."
              className=" border rounded-lg p-3 w-full"
            />
          </div>
          <div className="flex gap-2">
            <label className="font-semibold">Вид: </label>
            <div className="flex gap-2">
              <input type="checkbox" id="all" className="w-5" />
              <span>Пленки & Пакети</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="film" className="w-5" />
              <span>Пленки </span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="bag" className="w-5" />
              <span>Пакети</span>
            </div>
          </div>
          <div className="flex gap-2">
            <label className="font-semibold">Производительность: </label>
            <div className="flex gap-2">
              <input
                type="number"
                id="all"
                className="w-20 h-8 border rounded p-2"
              />
              <span>кг/ч</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Сортировка:</label>
            <label>
              <select id="sort_order" className="border rounded-lg p-3">
                <option>Дешевле</option>
                <option>Дороже</option>
                <option>Новинки</option>
                <option>Старинки</option>
              </select>
            </label>
          </div>
          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">Поиск</button>
        </form>
      </div>
      <div className="">
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">Результаты поиска: </h1>
      </div>
    </div>
  );
}
