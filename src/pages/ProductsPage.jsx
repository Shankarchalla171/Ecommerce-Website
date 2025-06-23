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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { menu, setMenu } = useContext(MenuContext);
    const [sort, setSort] = useState("default");

    useEffect(() => {
        if (menu) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        // Cleanup function to reset overflow when component unmounts
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [menu]);

    const getproducts = async () => {
        try {
            setLoading(true);
            setError(null);

            let url = `${API_BASE}/products`;
            const params = new URLSearchParams();

            // Build URL with proper parameter handling
            if (search?.trim() && activeCatId !== 0) {
                params.append('title', search.trim());
                params.append('categoryId', activeCatId.toString());
                url += `?${params.toString()}`;
            } else if (search?.trim()) {
                params.append('title', search.trim());
                url += `?${params.toString()}`;
            } else if (activeCatId !== 0) {
                url = `${API_BASE}/categories/${activeCatId}/products`;
            }

            const res = await fetch(url);

            if (!res.ok) {
                throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`);
            }

            const data = await res.json();

            // Validate response data
            if (!Array.isArray(data)) {
                throw new Error('Invalid response format: expected array');
            }

            // Filter out invalid products
            const validProducts = data.filter(product =>
                product &&
                product.id &&
                product.title &&
                product.price !== undefined
            );

            if (sort !== "default") {
                console.log(sort);
                validProducts.sort((a, b) =>
                    sort === "increase" ? a.price - b.price : b.price - a.price
                );
            }
            setProducts(validProducts);
        } catch (error) {
            setError(error.message || 'Failed to load products');
            setProducts([]);
        } finally {
            setLoading(false);
        }
    }

    const getCategaory = async () => {
        try {
            const promise = await fetch(`${API_BASE}/categories`);

            if (!promise.ok) {
                throw new Error(`Failed to fetch categories: ${promise.status}`);
            }

            const response = await promise.json();

            // Validate and filter categories
            if (Array.isArray(response)) {
                const validCategories = response.filter(cat =>
                    cat &&
                    cat.id &&
                    cat.name &&
                    typeof cat.name === 'string'
                );
                setCat(validCategories);
            } else {
                setCat([]);
            }
        } catch (error) {
            setCat([]);
            // Silently fail for categories as the app can work without them
        }
    }

    const render = (id) => {
        // Validate category ID
        if (typeof id !== 'number' || id < 0) {
            return;
        }

        window.scrollTo({ top: 0, behavior: "smooth" });
        setActiveCatID(id);
    };

    const handleSearchChange = (e) => {
        const value = e?.target?.value || '';
        setSearch(value);
    };

    const handleClick = () => {
        document.querySelector(".happy").classList.toggle('opacity-0');
        document.querySelector(".happy").classList.toggle('opacity-100');
        document.querySelector(".happy").classList.toggle('w-0');
        document.querySelector(".happy").classList.toggle('lg:w-1/5');
        document.querySelector(".happy").classList.toggle('w-full');
        document.querySelector(".happy").classList.toggle('h-0');

        //   document.querySelector(".happy").classList.toggle('translate-x-0');
        //   document.querySelector(".happy").classList.toggle('-translate-x-full');
        //   document.querySelector(".happy").classList.toggle('hidden');
    }

    useEffect(() => {
        if (sort === 'default')
            getproducts();
        else {
            const sorted = [...products].sort((a, b) =>
                sort === "increase" ? a.price - b.price : b.price - a.price
            );
            setProducts(sorted);
        }
    }, [sort])

    useEffect(() => {
        getCategaory();
    }, []);

    useEffect(() => {
        getproducts();
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [search, activeCatId]);

    const renderLoadingState = () => (
        <div className="flex items-center justify-center col-span-full py-20">
            <div className="flex flex-col items-center gap-4">
                <div className="w-8 h-8 border-4 border-zinc-300 border-t-zinc-600 rounded-full animate-spin"></div>
                <p className="text-zinc-600">Loading products...</p>
            </div>
        </div>
    );

    const renderErrorState = () => (
        <div className="flex items-center justify-center col-span-full py-20">
            <div className="text-center">
                <p className="text-red-600 text-lg mb-4">Error: {error}</p>
                <button
                    onClick={() => getproducts()}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                    Try Again
                </button>
            </div>
        </div>
    );

    const renderEmptyState = () => (
        <div className="col-span-full text-center py-20">
            <div className="flex flex-col items-center gap-4">
                <span className="material-symbols-outlined text-6xl text-zinc-300">
                    inventory_2
                </span>
                <h1 className="text-lg font-semibold text-zinc-600">
                    {search?.trim()
                        ? `No products found for "${search.trim()}"`
                        : "No products available in the store"
                    }
                </h1>
                {search?.trim() && (
                    <button
                        onClick={() => setSearch('')}
                        className="px-4 py-2 bg-zinc-500 text-white rounded hover:bg-zinc-600 transition-colors"
                    >
                        Clear Search
                    </button>
                )}
            </div>
        </div>
    );

    return (
        <>
            <Navbar />
            <main className="flex relative min-h-screen bg-white dark:bg-[rgb(20,20,20)] transition-all duration-500 ease-in-out">
                {/* Mobile Sidebar Overlay */}
                <Sidebar />

                <section className="flex-1 w-full sm:ml-0">
                    {/* Search Bar */}

                    <div className=" flex  sm:flex-row sm:items-center gap-2 mb-7 mr-2"  >
                        <div className="mt-4 border-r-2 border-t-2 border-b-2 py-2 px-1 rounded-r-xl">
                            <button onClick={handleClick} className=" flex items-center gap-1 hover:cursor-pointer ">
                                <span className="material-symbols-outlined dark:text-cyan-300">
                                    discover_tune
                                </span>
                                <span className="text-xl dark:text-cyan-300 hidden sm:inline">Filters</span>
                            </button>
                        </div>
                        <div className="flex items-center gap-3 rounded-xl shadow-md px-3 py-2  mt-4  bg-zinc-100  dark:border-2 dark:border-violet-800 dark:bg-transparent w-full ">
                            <span className="material-symbols-outlined text-zinc-600 text-2xl dark:text-violet-500">
                                search
                            </span>
                            <input
                                type="text"
                                placeholder="Search for items..."
                                value={search}
                                onChange={handleSearchChange}
                                className="p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500 bg-white text-zinc-700"
                                maxLength={100}
                            />
                            {search?.trim() && (
                                <button
                                    onClick={() => setSearch('')}
                                    className="material-symbols-outlined text-zinc-500 hover:text-zinc-700 transition-colors cursor-pointer"
                                    title="Clear search"
                                >
                                    close
                                </button>
                            )}
                        </div>

                    </div>

                    <section className=" flex flex-col lg:flex-row px-4 mt-6 pb-4 gap-6  mb-10 relative">
                        {/* Categories Sidebar */}
                        <div className=" w-0 h-0 happy opacity-0 transition-all duration-300 ">
                            <div className="flex flex-col gap-3 border-r border-t border-b py-4 px-4 rounded-r-xl sticky top-[100px] dark:border-r-3 dark:border-t-3 dark:border-b-3 dark:border-r-violet-800 dark:border-t-violet-800  dark:border-b-violet-800">
                                <div className="flex gap-2 items-center  dark:text-gray-300">
                                    <span className="material-symbols-outlined">
                                        category
                                    </span>
                                    <h2 className="text-xl font-bold">Categories</h2>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <div
                                        key="0"
                                        className={`category-item text-base px-3 py-2 cursor-pointer bg-gradient-to-r from-zinc-200 transition-transform duration-200 hover:scale-102
                                        ${activeCatId === 0 ? 'border-l-4 border-zinc-700 scale-105 ml-1 bg-zinc-300' : 'hover:bg-zinc-250'}`}
                                        onClick={() => render(0)}
                                        role="button"
                                        tabIndex={0}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                render(0);
                                            }
                                        }}
                                    >
                                        All
                                    </div>
                                    {cats && cats.length > 0 && cats
                                        .filter(cat => cat?.id && cat?.id <= 5)
                                        .map((cat) => (
                                            <div
                                                key={cat.id}
                                                className={`category-item text-base px-3 py-2 cursor-pointer bg-gradient-to-r from-zinc-200 transition-transform duration-200 hover:scale-102
                                                ${activeCatId === cat.id ? 'border-l-4 border-zinc-700 scale-105 ml-1 bg-zinc-300' : 'hover:bg-zinc-250'}`}
                                                onClick={() => render(cat.id)}
                                                role="button"
                                                tabIndex={0}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' || e.key === ' ') {
                                                        render(cat.id);
                                                    }
                                                }}
                                            >
                                                {cat.name}
                                            </div>
                                        ))
                                    }
                                    <div>
                                        <label htmlFor="sort" className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                                            SORT BY:
                                        </label>

                                        <div className="relative">
                                            <select
                                                name="filter"
                                                id="sort"
                                                className="block w-full appearance-none rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 pr-10 text-gray-900 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-500 transition-all"
                                                onChange={(e) => setSort(e.target.value)}
                                            >
                                                <option value="default">Default</option>
                                                <option value="increase">Increase</option>
                                                <option value="decrease">Decrease</option>
                                            </select>

                                            {/* Chevron icon */}
                                            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400 dark:text-gray-300">
                                                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Products Grid */}
                        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                            {loading && renderLoadingState()}
                            {error && !loading && renderErrorState()}
                            {!loading && !error && products.length === 0 && renderEmptyState()}
                            {!loading && !error && products.length > 0 &&
                                products.map(product => (
                                    product?.id ? (
                                        <ProductCard
                                            product={product}
                                            key={product.id}
                                        />
                                    ) : null
                                ))
                            }
                        </section>
                    </section>
                </section>
            </main>
        </>
    )
}

export default ProductsPage