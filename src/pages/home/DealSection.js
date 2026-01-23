import React from 'react';
import { Link } from 'react-router-dom';

const Deal = () => (
    <section className="padding-bottom">
        <div className="card card-deal">
            <div className="col-heading content-body">
                <header className="section-heading">
                    <h3 className="section-title">Deals and offers</h3>
                    <p>Hygiene equipments</p>
                </header>
                <div className="timer">
                    <div> <span className="num">04</span> <small>Days</small></div>
                    <div> <span className="num">12</span> <small>Hours</small></div>
                    <div> <span className="num">58</span> <small>Min</small></div>
                    <div> <span className="num">02</span> <small>Sec</small></div>
                </div>
            </div>
            <div className="row no-gutters items-wrap">
                <div className="col-md col-6">
                    <figure className="card-product-grid card-sm">
                        <Link to="#" className="img-wrap">
                            <img src={require("../../assets/images/items/3.jpg")} alt="" />
                        </Link>
                        <div className="text-wrap p-3">
                            <Link to="#" className="title">Summer clothes</Link>
                            <span className="badge badge-danger"> -20% </span>
                        </div>
                    </figure>
                </div>
                <div className="col-md col-6">
                    <figure className="card-product-grid card-sm">
                        <Link to="#" className="img-wrap">
                            <img src={require("../../assets/images/items/4.jpg")} alt="" />
                        </Link>
                        <div className="text-wrap p-3">
                            <Link to="#" className="title">Some category</Link>
                            <span className="badge badge-danger"> -5% </span>
                        </div>
                    </figure>
                </div>
                <div className="col-md col-6">
                    <figure className="card-product-grid card-sm">
                        <Link to="#" className="img-wrap">
                            <img src={require("../../assets/images/items/5.jpg")} alt="" />
                        </Link>
                        <div className="text-wrap p-3">
                            <Link to="#" className="title">Another category</Link>
                            <span className="badge badge-danger"> -20% </span>
                        </div>
                    </figure>
                </div>
                <div className="col-md col-6">
                    <figure className="card-product-grid card-sm">
                        <Link to="#" className="img-wrap">
                            <img src={require("../../assets/images/items/6.jpg")} alt="" />
                        </Link>
                        <div className="text-wrap p-3">
                            <Link to="#" className="title">Home apparel</Link>
                            <span className="badge badge-danger"> -15% </span>
                        </div>
                    </figure>
                </div>
                <div className="col-md col-6">
                    <figure className="card-product-grid card-sm">
                        <Link to="#" className="img-wrap">
                            <img src={require("../../assets/images/items/7.jpg")} alt="" />
                        </Link>
                        <div className="text-wrap p-3">
                            <Link to="#" className="title">Smart watches</Link>
                            <span className="badge badge-danger"> -10% </span>
                        </div>
                    </figure>
                </div>
            </div>
        </div>
    </section>
);

export default Deal;
