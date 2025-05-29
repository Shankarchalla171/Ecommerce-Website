import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Categaory from "../components/catageroy";
import ProductCard from "../components/product-card";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/SideBar";
import { MenuContext } from "../context/MenuContext";

const API_BASE = "https://api.escuelajs.co/api/v1";

const Home = () => {
    const [cat, setCat] = useState([]);
    const [sample, setsample] = useState([]);
    const { menu, setMenu } = useContext(MenuContext);
    const navigate = useNavigate();

    const getSample = async () => {
        try {
            let promise = await fetch(`${API_BASE}/products?offset=0&limit=20`);
            let response = await promise.json();
            setsample(response);
        } catch (error) {
            console.log(error);
        }
    };

    const getCategaory = async () => {
        try {
            let promise = await fetch(`${API_BASE}/categories`);
            let response = await promise.json();
            setCat(response);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCategaory();
        getSample();
    }, []);

    const goToPage = () => {
        navigate("/products");
    };

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
                    
                    <section className="p-4 sm:p-6 md:p-8 flex justify-center items-center">
                        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8 bg-blue-100 p-4 rounded-xl w-full max-w-7xl">
                            {cat.length > 0 ? (
                                cat.map((cate) =>
                                    cate.id <= "5" ? (
                                        <Categaory cate={cate} key={cate.id} />
                                    ) : null
                                )
                            ) : (
                                <h2>No categories found</h2>
                            )}
                        </div>
                    </section>

                 
                    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-12 p-4 sm:p-6 md:p-8">
                        {sample.length > 0 &&
                            sample.map((product) => (
                                <ProductCard product={product} key={product.id} />
                            ))}

                       
                        <div className="bg-amber-200 p-4 rounded flex justify-between items-center col-span-full">
                            <span className="capitalize text-base sm:text-lg">View more products</span>
                            <button
                                onClick={goToPage}
                                className="p-2 hover:bg-amber-300 rounded-full"
                            >
                                <span className="material-symbols-outlined text-amber-900">
                                    chevron_right
                                </span>
                            </button>
                        </div>
                    </section>
                </section>
            </main>
        </>
    );
};

export default Home;
