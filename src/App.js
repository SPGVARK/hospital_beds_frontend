import React from 'react'
import {useState,useEffect} from 'react'
import BedListItem from './components/BedListItem'
import Footer from './components/Footer'
import './styles.css'
import Header from './components/Header'
import useFetch from './customHooks/useFetch'

function App() 
{
  //<UseState>
    const cities =[
            "Ariyalur",
             "Chengalpattu",
             "Chennai",
             "Coimbatore",
             "Cuddalore",
             "Dharmapuri",
             "Dindigul",
             "Erode",
             "Kallakurichi",
             "Kanchipuram",
             "Kanyakumari",
             "Karur",
             "Krishnagiri",
             "Madurai",
             "Nagapattinam",
             "Namakkal",
             "Nilgiris",
             "Perambalur",
             "Pudukottai",
             "Ramanathapuram",
             "Ranipet",
             "Salem",
             "Sivagangai",
             "Tenkasi",
             "Thanjavur",
             "Theni",
             "Thoothukudi",
             "Tiruchirapalli",
             "Tirunelveli",
             "Tirupathur",
             "Tiruppur",
             "Tiruvallur",
             "Tiruvannamalai",
             "Tiruvarur",
             "Vellore",
             "Villupuram",
             "Virudhunagar"
    ] 
    const {Data:hospital,SetData:setHospital} = useFetch('https://spgvark-pandemic.herokuapp.com/api/beds');
    const [city_selected,setCity] = useState('');
    const [search,setSearch] = useState(null);
  //</UseState>
 
  //<UseEffect>
    useEffect(() => 
    {
      setSearch(hospital);
    }, [hospital])
    useEffect(() => 
    {
      if(search)
      {
        
        var hos = hospital.filter((el)=>
        {
            return  el.city.toLowerCase().includes(city_selected.toLowerCase())
        })
        setSearch(hos); 
      }
    }, [city_selected])
    useEffect(() => 
    {
     const URL = 'https://ip.nf/me.json';
     fetch(URL)
     .then(response => response.json())
     .then(data=> {if(cities.includes(data.ip.city))setCity(data.ip.city)})
    }, [])
  //</UseEffect>

  //<Event Listeners>
    function HandleSearch(e)
    {
      var val  =e.target.value.trim();
      if(val)
      {
        var hos = hospital.filter((el)=>
        {
          return  el.city.toLowerCase().includes(val.toLowerCase()) || el.hospital.toLowerCase().includes(val.toLowerCase()) 
        })
        setSearch(hos);
      }
    }
    
  //<Event Listeners>

  return (
   <>
    <Header HandleSearch={HandleSearch}/>
  
  <section id="data">

    <div className="border-all">

        {search&&<div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
              {city_selected}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a className="dropdown-item" href="#" onClick={()=>{setCity('')}} >All</a>
              {
                
                cities.map((city)=>
                {
                  return(<a key={cities.indexOf(city)} className="dropdown-item" href="#" onClick={(e)=>{setCity(e.target.innerText.trim())}} >{city}</a>)
                })
              }
            </div>
          </div>}
              
    {(!search)?<center><h5>LOADING......</h5><div className="loader"></div></center>:'' }
    {search && (search.length == 0)?<center><h5>No Results Found</h5></center>:''}
    {search && search.map((e)=>
    {
       return(
       <BedListItem
        key ={hospital.indexOf(e)}
        city={e.city}
        hospital = {e.hospital}
        covid_beds ={e.covid_beds.vaccant}
        oxy_beds = {e.oxy_beds.vaccant}
        icu_beds = {e.icu_beds.vaccant}
        contact= {e.contact}
        con = {!e.contact.includes('NULL')
      }
     />)
    })}
     
        
 
    </div>
    </section>

    <Footer/>
   
   </>
  );
}

export default App;
