import React from 'react';
import { Link } from 'react-router-dom';

const Listing = () => {
    return (
        <section className="section-content padding-y">
            <div className="container">

                <div className="card mb-3">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-2"> Your are here: </div>
                            <nav className="col-md-8">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                    <li className="breadcrumb-item"><Link to="#">Category name</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Item details</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <aside className="col-md-3">
                        <div className="card">
                            <article className="filter-group">
                                <header className="card-header">
                                    <Link to="#" data-toggle="collapse" data-target="#collapse_1" aria-expanded="true" className="">
                                        <i className="icon-control fa fa-chevron-down"></i>
                                        <h6 className="title">Product type</h6>
                                    </Link>
                                </header>
                                <div className="filter-content collapse show" id="collapse_1">
                                    <div className="card-body">
                                        <form className="pb-3">
                                            <div className="input-group">
                                                <input type="text" className="form-control" placeholder="Search" />
                                                <div className="input-group-append">
                                                    <button className="btn btn-light" type="button"><i className="fa fa-search"></i></button>
                                                </div>
                                            </div>
                                        </form>
                                        <ul className="list-menu">
                                            <li><Link to="#">People  </Link></li>
                                            <li><Link to="#">Watches </Link></li>
                                            <li><Link to="#">Cinema  </Link></li>
                                            <li><Link to="#">Clothes  </Link></li>
                                            <li><Link to="#">Home items </Link></li>
                                            <li><Link to="#">Animals</Link></li>
                                            <li><Link to="#">People </Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </article>
                            <article className="filter-group">
                                <header className="card-header">
                                    <Link to="#" data-toggle="collapse" data-target="#collapse_2" aria-expanded="true" className="">
                                        <i className="icon-control fa fa-chevron-down"></i>
                                        <h6 className="title">Brands </h6>
                                    </Link>
                                </header>
                                <div className="filter-content collapse show" id="collapse_2">
                                    <div className="card-body">
                                        <label className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" />
                                            <div className="custom-control-label">Mercedes
                                                <b className="badge badge-pill badge-light float-right">120</b>  </div>
                                        </label>
                                        <label className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" />
                                            <div className="custom-control-label">Toyota
                                                <b className="badge badge-pill badge-light float-right">15</b>  </div>
                                        </label>
                                        <label className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" />
                                            <div className="custom-control-label">Mitsubishi
                                                <b className="badge badge-pill badge-light float-right">35</b> </div>
                                        </label>
                                        <label className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" />
                                            <div className="custom-control-label">Nissan
                                                <b className="badge badge-pill badge-light float-right">89</b> </div>
                                        </label>
                                        <label className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" />
                                            <div className="custom-control-label">Honda
                                                <b className="badge badge-pill badge-light float-right">30</b>  </div>
                                        </label>
                                    </div>
                                </div>
                            </article>
                            <article className="filter-group">
                                <header className="card-header">
                                    <Link to="#" data-toggle="collapse" data-target="#collapse_3" aria-expanded="true" className="">
                                        <i className="icon-control fa fa-chevron-down"></i>
                                        <h6 className="title">Price range </h6>
                                    </Link>
                                </header>
                                <div className="filter-content collapse show" id="collapse_3">
                                    <div className="card-body">
                                        <input type="range" className="custom-range" min="0" max="100" name="" />
                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <label>Min</label>
                                                <input className="form-control" placeholder="$0" type="number" />
                                            </div>
                                            <div className="form-group col-md-6 text-right">
                                                <label>Max</label>
                                                <input className="form-control" placeholder="$1,0000" type="number" />
                                            </div>
                                        </div>
                                        <button className="btn btn-block btn-primary">Apply</button>
                                    </div>
                                </div>
                            </article>
                            <article className="filter-group">
                                <header className="card-header">
                                    <Link to="#" data-toggle="collapse" data-target="#collapse_4" aria-expanded="true" className="">
                                        <i className="icon-control fa fa-chevron-down"></i>
                                        <h6 className="title">Sizes </h6>
                                    </Link>
                                </header>
                                <div className="filter-content collapse show" id="collapse_4">
                                    <div className="card-body">
                                        <label className="checkbox-btn">
                                            <input type="checkbox" />
                                            <span className="btn btn-light-checkbox"> XS </span>
                                        </label>
                                        <label className="checkbox-btn">
                                            <input type="checkbox" />
                                            <span className="btn btn-light-checkbox"> SM </span>
                                        </label>
                                        <label className="checkbox-btn">
                                            <input type="checkbox" />
                                            <span className="btn btn-light-checkbox"> LG </span>
                                        </label>
                                        <label className="checkbox-btn">
                                            <input type="checkbox" />
                                            <span className="btn btn-light-checkbox"> XXL </span>
                                        </label>
                                    </div>
                                </div>
                            </article>
                            <article className="filter-group">
                                <header className="card-header">
                                    <Link to="#" data-toggle="collapse" data-target="#collapse_5" aria-expanded="false" className="">
                                        <i className="icon-control fa fa-chevron-down"></i>
                                        <h6 className="title">More filter </h6>
                                    </Link>
                                </header>
                                <div className="filter-content collapse in" id="collapse_5">
                                    <div className="card-body">
                                        <label className="custom-control custom-radio">
                                            <input type="radio" name="myfilter_radio" className="custom-control-input" />
                                            <div className="custom-control-label">Any condition</div>
                                        </label>
                                        <label className="custom-control custom-radio">
                                            <input type="radio" name="myfilter_radio" className="custom-control-input" />
                                            <div className="custom-control-label">Brand new </div>
                                        </label>
                                        <label className="custom-control custom-radio">
                                            <input type="radio" name="myfilter_radio" className="custom-control-input" />
                                            <div className="custom-control-label">Used items</div>
                                        </label>
                                        <label className="custom-control custom-radio">
                                            <input type="radio" name="myfilter_radio" className="custom-control-input" />
                                            <div className="custom-control-label">Very old</div>
                                        </label>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </aside>
                    <main className="col-md-9">
                        <header className="border-bottom mb-4 pb-3">
                            <div className="form-inline">
                                <span className="mr-md-auto">32 Items found </span>
                                <select className="mr-2 form-control">
                                    <option>Latest items</option>
                                    <option>Trending</option>
                                    <option>Most Popular</option>
                                    <option>Cheapest</option>
                                </select>
                                <div className="btn-group">
                                    <Link to="#" className="btn btn-outline-secondary" data-toggle="tooltip" title="List view">
                                        <i className="fa fa-bars"></i>
                                    </Link>
                                    <Link to="#" className="btn  btn-outline-secondary active" data-toggle="tooltip" title="Grid view">
                                        <i className="fa fa-th"></i>
                                    </Link>
                                </div>
                            </div>
                        </header>

                        <article className="card card-product-list">
                            <div className="row no-gutters">
                                <aside className="col-md-3">
                                    <Link to="#" className="img-wrap">
                                        <span className="badge badge-danger"> NEW </span>
                                        <img src={require("../assets/images/items/11.jpg")} alt="" />
                                    </Link>
                                </aside>
                                <div className="col-md-6">
                                    <div className="info-main">
                                        <Link to="#" className="h5 title"> Hot sale unisex New Design Shirt  </Link>
                                        <div className="rating-wrap mb-3">
                                            <ul className="rating-stars">
                                                <li style={{ width: '80%' }} className="stars-active">
                                                    <img src={require("../assets/images/icons/stars-active.svg").default} alt="" />
                                                </li>
                                                <li>
                                                    <img src={require("../assets/images/icons/starts-disable.svg").default} alt="" />
                                                </li>
                                            </ul>
                                            <div className="label-rating">7/10</div>
                                        </div>
                                        <p> Take it as demo specs, ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Minim sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </p>
                                    </div>
                                </div>
                                <aside className="col-sm-3">
                                    <div className="info-aside">
                                        <div className="price-wrap">
                                            <span className="price h5"> $140 </span>
                                            <del className="price-old"> $198</del>
                                        </div>
                                        <p className="text-success">Free shipping</p>
                                        <br />
                                        <p>
                                            <Link to="#" className="btn btn-primary btn-block"> Details </Link>
                                            <Link to="#" className="btn btn-light btn-block">
                                                <i className="fa fa-heart"></i>
                                                <span className="text">Wishlist</span>
                                            </Link>
                                        </p>
                                    </div>
                                </aside>
                            </div>
                        </article>

                        <article className="card card-product-list">
                            <div className="row no-gutters">
                                <aside className="col-md-3">
                                    <Link to="#" className="img-wrap">
                                        <img src={require("../assets/images/items/12.jpg")} alt="" />
                                    </Link>
                                </aside>
                                <div className="col-md-6">
                                    <div className="info-main">
                                        <Link to="#" className="h5 title"> Winter Jacket for Men and Women </Link>
                                        <div className="rating-wrap mb-3">
                                            <ul className="rating-stars">
                                                <li style={{ width: '80%' }} className="stars-active">
                                                    <img src={require("../assets/images/icons/stars-active.svg").default} alt="" />
                                                </li>
                                                <li>
                                                    <img src={require("../assets/images/icons/starts-disable.svg").default} alt="" />
                                                </li>
                                            </ul>
                                            <div className="label-rating">7/10</div>
                                        </div>
                                        <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                                    </div>
                                </div>
                                <aside className="col-sm-3">
                                    <div className="info-aside">
                                        <div className="price-wrap">
                                            <span className="price h5"> $56 </span>
                                            <del className="price-old"> $85</del>
                                        </div>
                                        <p className="text-success">Free shipping</p>
                                        <br />
                                        <p>
                                            <Link to="#" className="btn btn-primary btn-block"> Details </Link>
                                            <Link to="#" className="btn btn-light btn-block">
                                                <i className="fa fa-heart"></i>
                                                <span className="text">Wishlist</span>
                                            </Link>
                                        </p>
                                    </div>
                                </aside>
                            </div>
                        </article>

                        <article className="card card-product-list">
                            <div className="row no-gutters">
                                <aside className="col-md-3">
                                    <Link to="#" className="img-wrap">
                                        <img src={require("../assets/images/items/13.jpg")} alt="" />
                                    </Link>
                                </aside>
                                <div className="col-md-6">
                                    <div className="info-main">
                                        <Link to="#" className="h5 title"> T-shirts with multiple colors </Link>
                                        <div className="rating-wrap mb-3">
                                            <ul className="rating-stars">
                                                <li style={{ width: '80%' }} className="stars-active">
                                                    <img src={require("../assets/images/icons/stars-active.svg").default} alt="" />
                                                </li>
                                                <li>
                                                    <img src={require("../assets/images/icons/starts-disable.svg").default} alt="" />
                                                </li>
                                            </ul>
                                            <div className="label-rating">7/10</div>
                                        </div>
                                        <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                                    </div>
                                </div>
                                <aside className="col-sm-3">
                                    <div className="info-aside">
                                        <div className="price-wrap">
                                            <span className="price h5"> $56 </span>
                                            <del className="price-old"> $85</del>
                                        </div>
                                        <p className="text-success">Free shipping</p>
                                        <br />
                                        <p>
                                            <Link to="#" className="btn btn-primary btn-block"> Details </Link>
                                            <Link to="#" className="btn btn-light btn-block">
                                                <i className="fa fa-heart"></i>
                                                <span className="text">Wishlist</span>
                                            </Link>
                                        </p>
                                    </div>
                                </aside>
                            </div>
                        </article>
                        <article className="card card-product-list">
                            <div className="row no-gutters">
                                <aside className="col-md-3">
                                    <Link to="#" className="img-wrap">
                                        <img src={require("../assets/images/items/7.jpg")} alt="" />
                                    </Link>
                                </aside>
                                <div className="col-md-6">
                                    <div className="info-main">
                                        <Link to="#" className="h5 title"> T-shirts with multiple colors </Link>
                                        <div className="rating-wrap mb-3">
                                            <ul className="rating-stars">
                                                <li style={{ width: '80%' }} className="stars-active">
                                                    <img src={require("../assets/images/icons/stars-active.svg").default} alt="" />
                                                </li>
                                                <li>
                                                    <img src={require("../assets/images/icons/starts-disable.svg").default} alt="" />
                                                </li>
                                            </ul>
                                            <div className="label-rating">7/10</div>
                                        </div>
                                        <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                                    </div>
                                </div>
                                <aside className="col-sm-3">
                                    <div className="info-aside">
                                        <div className="price-wrap">
                                            <span className="price h5"> $56 </span>
                                            <del className="price-old"> $85</del>
                                        </div>
                                        <p className="text-success">Free shipping</p>
                                        <br />
                                        <p>
                                            <Link to="#" className="btn btn-primary btn-block"> Details </Link>
                                            <Link to="#" className="btn btn-light btn-block">
                                                <i className="fa fa-heart"></i>
                                                <span className="text">Wishlist</span>
                                            </Link>
                                        </p>
                                    </div>
                                </aside>
                            </div>
                        </article>


                        <nav className="mb-4" aria-label="Page navigation sample">
                            <ul className="pagination">
                                <li className="page-item disabled"><Link className="page-link" to="#">Previous</Link></li>
                                <li className="page-item active"><Link className="page-link" to="#">1</Link></li>
                                <li className="page-item"><Link className="page-link" to="#">2</Link></li>
                                <li className="page-item"><Link className="page-link" to="#">3</Link></li>
                                <li className="page-item"><Link className="page-link" to="#">4</Link></li>
                                <li className="page-item"><Link className="page-link" to="#">5</Link></li>
                                <li className="page-item"><Link className="page-link" to="#">Next</Link></li>
                            </ul>
                        </nav>

                        <div className="box text-center">
                            <p>Did you find what you were looking for?</p>
                            <Link to="#" className="btn btn-light">Yes</Link>
                            <Link to="#" className="btn btn-light">No</Link>
                        </div>

                    </main>
                </div>

            </div>

            <section className="padding-y-lg bg-light border-top">
                <div className="container">

                    <p className="pb-2 text-center">Delivering the latest product trends and industry news straight to your inbox</p>

                    <div className="row justify-content-md-center">
                        <div className="col-lg-4 col-sm-6">
                            <form className="form-row">
                                <div className="col-8">
                                    <input className="form-control" placeholder="Your Email" type="email" />
                                </div>
                                <div className="col-4">
                                    <button type="submit" className="btn btn-block btn-warning"> <i className="fa fa-envelope"></i> Subscribe </button>
                                </div>
                            </form>
                            <small className="form-text">We’ll never share your email address with a third-party. </small>
                        </div>
                    </div>
                </div>
            </section>

        </section>
    );
};

export default Listing;
