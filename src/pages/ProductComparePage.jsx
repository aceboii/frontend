import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import { useSelector } from "react-redux";
import ProductCard from "../components/Route/ProductCard/ProductCard";

const ProductComparePage = () => {
  const { allProducts } = useSelector((state) => state.products);
  const { one, two } = useParams();
  const [oneD, setOneD] = useState(null);
  const [twoD, setTwoD] = useState(null);

  useEffect(() => {
    const one_d = allProducts && allProducts.find((i) => i._id === one);
    const two_d = allProducts && allProducts.find((i) => i._id === two);
    setOneD(one_d);
    setTwoD(two_d);
  }, [allProducts]);

  return (
    <div>
      <Header />
      <h2 className={`text-center mt-6 font-bold text-[25px] border-b mb-5`}>
        Compare Product
      </h2>
      <div className="mx-auto">
        <div className="flex flex-col md:flex-row align-center justify-center gap-[20px] mb-12">
          {oneD && <div style={{width: "350px"}}><ProductCard des={true} data={oneD} /></div>}
          {twoD && <div style={{width: "350px"}}><ProductCard des={true} data={twoD} /></div>}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductComparePage;
