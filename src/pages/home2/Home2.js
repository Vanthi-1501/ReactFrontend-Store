import React from 'react';
import Product from '../../layouts/Product';
import DealGrid from '../home/DealGridSection';
import Subscribe from '../home/SubscribeSection';

function Home2(props) {
    return (
        <>
            <div className="container">
                <section className="padding-bottom mt-5">
                    {/* Reusing Product but we need to match the fact it starts directly with it */}
                    {/* The Product component has its own section/header, so just including it is fine */}
                    <Product />
                    <DealGrid />
                    <Subscribe />
                </section>
            </div>
        </>
    );
}

export default Home2;
