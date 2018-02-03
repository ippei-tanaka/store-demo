import React from "react";
import AuthHeader from "@/web-client/containers/AuthHeader";
import ProductList from "@/web-client/components/prouct-list";
import Footer from "@/web-client/components/footer";

export default () => (
    <div>
        <AuthHeader/>
        <ProductList/>
        <Footer/>
    </div>
);