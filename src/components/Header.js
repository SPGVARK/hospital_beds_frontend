import React from 'react'
import logo from '../images/spg-logo.png'
export default function Hedaer(props){
    return(
    <section id="header">
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand">
        <img src={logo} alt="" height="55" width="55"/>
        </a>

        <h3 className="nav-text">HOSPITAL BEDS AVAILABILITY</h3>

      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav">


          <div className="input-group rounded">
            <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" onInput={props.HandleSearch} />
            <span className="input-group-text border-0" id="search-addon">
              <i className="fas fa-search"></i>
            </span>
          </div>

        </ul>
      </div>  
  </nav>
</section>)
}