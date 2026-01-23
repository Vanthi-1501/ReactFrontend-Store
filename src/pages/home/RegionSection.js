import React from 'react';
import { Link } from 'react-router-dom';

const Region = () => (
    <section className="padding-bottom">
        <header className="section-heading heading-line">
            <h4 className="title-section text-uppercase">Choose region</h4>
        </header>

        <ul className="row mt-4">
            <li className="col-md col-6"><Link to="#" className="icontext"> <img className="icon-flag-sm" src={require("../../assets/images/icons/flags/CN.png")} alt="" /> <span>China</span> </Link></li>
            <li className="col-md col-6"><Link to="#" className="icontext"> <img className="icon-flag-sm" src={require("../../assets/images/icons/flags/DE.png")} alt="" /> <span>Germany</span> </Link></li>
            <li className="col-md col-6"><Link to="#" className="icontext"> <img className="icon-flag-sm" src={require("../../assets/images/icons/flags/AU.png")} alt="" /> <span>Australia</span> </Link></li>
            <li className="col-md col-6"><Link to="#" className="icontext"> <img className="icon-flag-sm" src={require("../../assets/images/icons/flags/RU.png")} alt="" /> <span>Russia</span> </Link></li>
            <li className="col-md col-6"><Link to="#" className="icontext"> <img className="icon-flag-sm" src={require("../../assets/images/icons/flags/IN.png")} alt="" /> <span>India</span> </Link></li>
            <li className="col-md col-6"><Link to="#" className="icontext"> <img className="icon-flag-sm" src={require("../../assets/images/icons/flags/GB.png")} alt="" /> <span>England</span> </Link></li>
            <li className="col-md col-6"><Link to="#" className="icontext"> <img className="icon-flag-sm" src={require("../../assets/images/icons/flags/TR.png")} alt="" /> <span>Turkey</span> </Link></li>
            <li className="col-md col-6"><Link to="#" className="icontext"> <img className="icon-flag-sm" src={require("../../assets/images/icons/flags/UZ.png")} alt="" /> <span>Uzbekistan</span> </Link></li>
            <li className="col-md col-6"><Link to="#" className="icontext"> <i className="mr-3 fa fa-ellipsis-h"></i> <span>More regions</span> </Link></li>
        </ul>
    </section>
);

export default Region;
