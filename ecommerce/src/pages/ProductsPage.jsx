import { useContext, useEffect, useState } from "react"
import Navbar from "../components/navbar"
import ProductCard from "../components/product-card"
import React from "react"
import { MenuContext } from "../context/MenuContext"
import Sidebar from "../components/SideBar"

const API_BASE = "https://api.escuelajs.co/api/v1"

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [cats, setCat] = useState([]);
    const [activeCatId, setActiveCatID] = useState(0);
    const [search, setSearch] = useState('');
    const {menu,setMenu}=useContext(MenuContext)

    const getproducts = async () => {
        try {
            let url = `${API_BASE}/products`;

            if (search !== '' && activeCatId !== 0) {
                url += `/?title=${search}&categoryId=${activeCatId}`;
            } else if (search !== '') {
                url += `/?title=${search}`;
            } else if (activeCatId !== 0) {
                url = `${API_BASE}/categories/${activeCatId}/products`;
            }

            const res = await fetch(url);
            const data = await res.json();
            setProducts(data);
        } catch (error) {
            console.log(error);
        }
    }


    const getCategaory = async () => {
        try {
            let promise = await fetch(`${API_BASE}/categories`);
            let response = await promise.json();
            setCat(response)
        } catch (error) {
            console.log(error);
        }
    }


    const render = (id) => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setActiveCatID(id);
    };


    useEffect(() => {
        getCategaory();
    }, [])

    useEffect(() => {
        getproducts();
        window.scrollTo({top:0,behavior:"smooth"});
    }, [search, activeCatId])
  
    console.log("search", search);
    return (
        <>
            <Navbar />
            <main className="flex relative min-h-screen bg-white">
                 <aside
                    className={`${
                        menu ? "fixed inset-0 z-20 bg-white w-4/5 max-w-xs p-4 shadow-lg flex items-center" : "hidden"
                    } `}
                >
                    <Sidebar />
                </aside>
                <section className="flex-1 w-full sm:ml-0">
                    <div className="bg-zinc-100 px-4 py-3 flex items-center gap-3 rounded-xl shadow-md mx-4 mt-4 lg:mx-20 sticky top-0 z-10">
                        <span className="material-symbols-outlined text-zinc-600 text-2xl">
                            search
                        </span>
                        <input
                            type="text"
                            placeholder="Search for items..."
                            value={search}
                            onChange={(e) => (setSearch(e.target.value))}
                            className="p-3 w-full rounded-md focus:outline-none  focus:ring-zinc-500 bg-white text-zinc-700"
                        />
                    </div>

                    <section className="flex flex-col lg:flex-row p-4 gap-6 mt-10 mb-10">

                        {/* Sidebar */}
                        <div className="w-full lg:w-1/5">
                            <div className="flex flex-col gap-3 border p-4 rounded-xl sticky top-[100px]">
                                <div className="flex gap-2 items-center">
                                    <span className="material-symbols-outlined">
                                        category
                                    </span>
                                    <h2 className="text-xl font-bold">Categories</h2>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <div key={'0'}
                                        className={`category-item text-base px-3 py-2 cursor-pointer bg-gradient-to-r from-zinc-200 transition-transform duration-200
                                ${activeCatId === 0 ? 'border-l-4 border-zinc-700 scale-105 ml-1' : ''}`}
                                        onClick={() => render(0)}
                                    >
                                        All
                                    </div>
                                    {
                                        cats.length > 0 && cats.map((cat) => (
                                            cat.id <= 5 && (
                                                <div key={cat.id}
                                                    className={`category-item text-base px-3 py-2 cursor-pointer bg-gradient-to-r from-zinc-200 transition-transform duration-200
                                            ${activeCatId === cat.id ? 'border-l-4 border-zinc-700 scale-105 ml-1' : ''}`}
                                                    onClick={() => render(cat.id)}
                                                >
                                                    {cat.name}
                                                </div>
                                            )
                                        ))
                                    }
                                </div>
                            </div>
                        </div>

                        {/* Products Grid */}
                        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                            {
                                products.length > 0
                                    ? products.map(product => (
                                        <ProductCard product={product} key={product.id} />
                                    ))
                                    : <h1 className="col-span-full text-center text-lg font-semibold text-zinc-600">
                                        No products available in the store
                                    </h1>
                            }
                        </section>
                    </section>
                </section>
            </main>

        </>
    )
}

export default ProductsPage
