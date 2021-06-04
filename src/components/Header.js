import React from 'react'
import logo from '../images/spg-logo.png'
export default function Header(props){
    return(
    <section id="header">
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand">
        <img src={logo} alt="" height="35" width="35"/>
        </a>

        <center><h3 style={{color:'white',fontSize:'calc(12px + 0.6vw',padding:'20px', margin:'0px 20px'}}>HOSPITAL BEDS AVAILABILITY</h3></center>

      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav">


          <div className="input-group" style={{textAlign:'center',alignItems:'center'}}>
            <input className="form-control" id="search" placeholder="Search" onInput={props.HandleSearch} style={{outline:'none',border:'0px',background:'#f5f5f5',color:'gray',width:'calc(350px + 0.5vw)'}} />
            <button className="btn bg-transparent" style={{marginLeft: '-40px', zIndex: '100'}} onClick={props.ClearSearch}>
          
              <i className="fa fa-times"></i>
            </button>
          </div>

        </ul>
      </div>  
  </nav>
</section>)
}