import React from 'react';
import { Link } from 'react-router-dom';

const ListingGrid = () => {
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
                                    <li className="breadcrumb-item"><Link to="#">Sub category</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Items</li>
                                </ol>
                            </nav>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-md-2">Filter by</div>
                            <div className="col-md-10">
                                <ul className="list-inline">
                                    <li className="list-inline-item">
                                        <div className="dropdown">
                                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">   Supplier type </a>
                                            <div className="dropdown-menu">
                                                <a href="#" className="dropdown-item">Option 1</a>
                                                <a href="#" className="dropdown-item">Option 2</a>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="list-inline-item">
                                        <div className="dropdown">
                                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">  Country </a>
                                            <div className="dropdown-menu">
                                                <a href="#" className="dropdown-item">Option 1</a>
                                                <a href="#" className="dropdown-item">Option 2</a>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="list-inline-item">
                                        <div className="dropdown">
                                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">Feature</a>
                                            <div className="dropdown-menu">
                                                <a href="#" className="dropdown-item">Option 1</a>
                                                <a href="#" className="dropdown-item">Option 2</a>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="list-inline-item">
                                        <div className="dropdown">
                                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">Color</a>
                                            <div className="dropdown-menu">
                                                <a href="#" className="dropdown-item">Option 1</a>
                                                <a href="#" className="dropdown-item">Option 2</a>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="list-inline-item">
                                        <div className="dropdown">
                                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">Size</a>
                                            <div className="dropdown-menu">
                                                <a href="#" className="dropdown-item">Option 1</a>
                                                <a href="#" className="dropdown-item">Option 2</a>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="list-inline-item">
                                        <div className="form-inline">
                                            <label className="mr-2">Price</label>
                                            <input className="form-control form-control-sm" placeholder="Min" type="number" />
                                            <span className="px-2"> - </span>
                                            <input className="form-control form-control-sm" placeholder="Max" type="number" />
                                            <button type="submit" className="btn btn-sm btn-light ml-2">Ok</button>
                                        </div>
                                    </li>
                                    <li className="list-inline-item">
                                        <label className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" />
                                            <div className="custom-control-label">Ready to ship</div>
                                        </label>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <header className="mb-3">
                    <div className="form-inline">
                        <strong className="mr-md-auto">32 Items found </strong>
                        <select className="mr-2 form-control">
                            <option>Latest items</option>
                            <option>Trending</option>
                            <option>Most Popular</option>
                            <option>Cheapest</option>
                        </select>
                        <div className="btn-group">
                            <Link to="/listing" className="btn btn-light" data-toggle="tooltip" title="List view">
                                <i className="fa fa-bars"></i>
                            </Link>
                            <Link to="/listing-grid" className="btn btn-light active" data-toggle="tooltip" title="Grid view">
                                <i className="fa fa-th"></i>
                            </Link>
                        </div>
                    </div>
                </header>

                <div className="row">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
                        <div className="col-md-3" key={index}>
                            <figure className="card card-product-grid">
                                <div className="img-wrap">
                                    {index === 0 && <span className="badge badge-danger"> NEW </span>}
                                    <img src={require(`../assets/images/items/${index + 1}.jpg`)} alt="product" />
                                </div>
                                <figcaption className="info-wrap">
                                    <Link to="#" className="title mb-2">Hot sale unisex New Design Shirt for sport polo shirts latest design</Link>
                                    <div className="price-wrap">
                                        <span className="price">$32.00-$40.00</span>
                                        <small className="text-muted">/per item</small>
                                    </div>
                                    <p className="mb-2"> 2 Pieces <small className="text-muted">(Min Order)</small></p>
                                    <p className="text-muted ">Guangzhou Yichuang Electronic Co</p>
                                    <hr />
                                    <p className="mb-3">
                                        <span className="tag"> <i className="fa fa-check"></i> Verified</span>
                                        <span className="tag"> 4 Years </span>
                                        <span className="tag"> 60 reviews </span>
                                        <span className="tag"> China </span>
                                    </p>
                                    <label className="custom-control mb-3 custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" />
                                        <div className="custom-control-label">Add to compare</div>
                                    </label>
                                    <Link to="#" className="btn btn-outline-primary"> <i className="fa fa-envelope"></i> Contact supplier </Link>
                                </figcaption>
                            </figure>
                        </div>
                    ))}
                </div>

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

            </div>
        </section>
    );
};

export default ListingGrid;
