import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import ProductCard from "../components/product-card";
import { useParams } from "react-router-dom";
import Sidebar from "../components/SideBar";
import { MenuContext } from "../context/MenuContext";
import { useContext } from "react";
const API_BASE = "https://api.escuelajs.co/api/v1"
const Categaoryporduct = () => {

    const params = useParams();
    console.log(params);
    const [products, setProducts] = useState([]);
    const { menu, setMenu } = useContext(MenuContext);

    const getProducts = async () => {
        try {

            let promise = await fetch(`${API_BASE}/categories/${params.category_id}/products`);
            console.log(promise);
            let response = await promise.json();
            console.log(response);
            setProducts(response);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProducts();
    }, [])

    return (
        <>
            <Navbar />
            <main className="flex relative min-h-screen bg-white justify-center">

                <aside
                    className={`${menu ? "fixed inset-0 z-20 bg-white w-4/5 max-w-xs p-4 shadow-lg flex items-center" : "hidden"
                        } `}
                >
                    <Sidebar />
                </aside>
                <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-12 p-4 sm:p-6 md:p-8">
                    {
                        products.length > 0 ? (products.map((product) => (<ProductCard product={product} />)))
                            : (<h1>no products related to this category </h1>)
                    }
                </section>
            </main>

        </>
    )

}

export default Categaoryporduct