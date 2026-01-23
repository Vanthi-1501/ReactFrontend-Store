import React from 'react';

const Category = () => (
    <section className="section-specials padding-y border-bottom">
        <div className="col-md-4">
            <figure className="itemside">
                <div className="aside">
                    <span className="icon-sm rounded-circle bg-primary">
                        <i className="fa fa-money-bill-alt white"></i>
                    </span>
                </div>
                <figcaption className="info">
                    <h6 className="title">Reasonable prices</h6>
                    <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labor </p>
                </figcaption>
            </figure>
        </div>
        <div className="col-md-4">
            <figure className="itemside">
                <div className="aside">
                    <span className="icon-sm rounded-circle bg-danger">
                        <i className="fa fa-comment-dots white"></i>
                    </span>
                </div>
                <figcaption className="info">
                    <h6 className="title">Customer support 24/7 </h6>
                    <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labor </p>
                </figcaption>
            </figure>
        </div>
        <div className="col-md-4">
            <figure className="itemside">
                <div className="aside">
                    <span className="icon-sm rounded-circle bg-success">
                        <i className="fa fa-truck white"></i>
                    </span>
                </div>
                <figcaption className="info">
                    <h6 className="title">Quick delivery</h6>
                    <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labor </p>
                </figcaption>
            </figure>
        </div>
    </section>
);

export default Category;
