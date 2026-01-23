import React from 'react';
import { Link } from 'react-router-dom';

const Apparel = () => (
    <section className="padding-bottom">
        <header className="section-heading heading-line">
            <h4 className="title-section text-uppercase">Apparel</h4>
        </header>

        <div className="card card-home-category">
            <div className="row no-gutters">
                <div className="col-md-3">
                    <div className="home-category-banner bg-light-orange">
                        <h5 className="title">Best trending clothes only for summer</h5>
                        <p>Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                        <Link to="#" className="btn btn-outline-primary rounded-pill">Source now</Link>
                        <img src={require("../../assets/images/items/2.jpg")} className="img-bg" alt="" />
                    </div>
                </div>
                <div className="col-md-9">
                    <ul className="row no-gutters bordered-cols">
                        <li className="col-6 col-lg-3 col-md-4">
                            <Link to="#" className="item">
                                <div className="card-body">
                                    <h6 className="title">Well made women clothes with trending collection</h6>
                                    <img className="img-sm float-right" src={require("../../assets/images/items/1.jpg")} alt="" />
                                    <p className="text-muted"><i className="fa fa-map-marker-alt"></i> Guanjou, China</p>
                                </div>
                            </Link>
                        </li>
                        <li className="col-6 col-lg-3 col-md-4">
                            <Link to="#" className="item">
                                <div className="card-body">
                                    <h6 className="title">Great clothes with trending collection</h6>
                                    <img className="img-sm float-right" src={require("../../assets/images/items/2.jpg")} alt="" />
                                    <p className="text-muted"><i className="fa fa-map-marker-alt"></i> Beijing, China</p>
                                </div>
                            </Link>
                        </li>
                        <li className="col-6 col-lg-3 col-md-4">
                            <Link to="#" className="item">
                                <div className="card-body">
                                    <h6 className="title">Demo clothes with sample collection</h6>
                                    <img className="img-sm float-right" src={require("../../assets/images/items/3.jpg")} alt="" />
                                    <p className="text-muted"><i className="fa fa-map-marker-alt"></i> Tokyo, Japan</p>
                                </div>
                            </Link>
                        </li>
                        <li className="col-6 col-lg-3 col-md-4">
                            <Link to="#" className="item">
                                <div className="card-body">
                                    <h6 className="title">Home and kitchen electronic stuff collection</h6>
                                    <img className="img-sm float-right" src={require("../../assets/images/items/4.jpg")} alt="" />
                                    <p className="text-muted"><i className="fa fa-map-marker-alt"></i> Tashkent, Uzb</p>
                                </div>
                            </Link>
                        </li>
                        <li className="col-6 col-lg-3 col-md-4">
                            <Link to="#" className="item">
                                <div className="card-body">
                                    <h6 className="title">Home and kitchen electronic stuff collection</h6>
                                    <img className="img-sm float-right" src={require("../../assets/images/items/5.jpg")} alt="" />
                                    <p className="text-muted"><i className="fa fa-map-marker-alt"></i> London, Britain</p>
                                </div>
                            </Link>
                        </li>
                        <li className="col-6 col-lg-3 col-md-4">
                            <Link to="#" className="item">
                                <div className="card-body">
                                    <h6 className="title">Home and kitchen electronic stuff collection</h6>
                                    <img className="img-sm float-right" src={require("../../assets/images/items/6.jpg")} alt="" />
                                    <p className="text-muted"><i className="fa fa-map-marker-alt"></i> Guanjou, China</p>
                                </div>
                            </Link>
                        </li>
                        <li className="col-6 col-lg-3 col-md-4">
                            <Link to="#" className="item">
                                <div className="card-body">
                                    <h6 className="title">Well made clothes with trending collection</h6>
                                    <img className="img-sm float-right" src={require("../../assets/images/items/7.jpg")} alt="" />
                                    <p className="text-muted"><i className="fa fa-map-marker-alt"></i> Hong Kong, China</p>
                                </div>
                            </Link>
                        </li>
                        <li className="col-6 col-lg-3 col-md-4">
                            <Link to="#" className="item">
                                <div className="card-body">
                                    <h6 className="title">Home and kitchen interior stuff collection</h6>
                                    <img className="img-sm float-right" src={require("../../assets/images/items/6.jpg")} alt="" />
                                    <p className="text-muted"><i className="fa fa-map-marker-alt"></i> Guanjou, China</p>
                                </div>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
);

export default Apparel;
