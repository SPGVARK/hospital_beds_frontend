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
    const cities =
    [
      "Ariyalur",
      "Chengalpattu",
      "Chengalpet",
      "Chennai",
      "Coimbatore",
      "Cuddalore",
      "Dindigul",
      "Erode",
      "Kallakurichi",
      "Kancheepuram",
      "Kanyakumari",
      "Karur",
      "Krishnagiri",
      "Madurai",
      "Mayiladuthurai",
      "Nagapattinam",
      "Namakkal",
      "Perambalur",
      "Pudukkottai",
      "Ramanathapuram",
      "Salem",
      "Sivagangai",
      "Tenkasi",
      "Thanjavur",
      "Theni",
      "TheNilgiris",
      "Thiruchirappalli",
      "Thiruvarur",
      "Thoothukudi",
      "Tirunelveli",
      "Tiruppur",
      "Tiruvallur",
      "Tiruvannamalai",
      "Vellore",
      "Virudhunagar"
    ]
    const {Data:hospital,SetData:setHospital} = useFetch('http://localhost:5000/api/beds');
    const [city_selected,setCity] = useState('');
    const [search,setSearch] = useState(null);
    const [ListConut,setListCount] = useState(20);
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
          setListCount(20)
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
    /*useEffect(() => 
    {
     if(hospital)
     {
      var item = hospital;
      if(hospital.length>=ListConut)
        item = item.slice(0,ListConut)
      else
        item = item.slice(0,hospital.length)
      setSearch(item);
     }
    }, [ListConut,hospital])*/
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
        setListCount(20);
      }
    }
    function LoadNext()
    {
        setListCount(ListConut+20);
    }
  //<Event Listeners>

  return (
   <>
    <Header HandleSearch={HandleSearch}/>
  
  <section id="data">
    <h2 style={{color:'white',background:'#ef5350',width:'100%',padding:'5px 10px',fontSize:'calc(7px + 0.5vw)',borderRadius:'20px',textAlign:'center'}}>Data may be delayed or partial. Please verify with the hospital.</h2>
    <div className="border-all">

        {search&&<div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
              {city_selected || 'Select City'}
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
    {search && search.slice(0,ListConut).map((e)=>
    {
       return(
       <BedListItem
        key ={hospital.indexOf(e)}
        city={e.city}
        hospital = {e.hospital}
        non_oxy_beds ={e.non_oxy_beds.vaccant}
        oxy_beds = {e.oxy_beds.vaccant}
        icu_venti_beds = {e.icu_ventilator_beds.vaccant}
        icu_non_venti_beds = {e.icu_non_ventilator_beds.vaccant}
        address = {e.address}
        category = {e.category}
        contact= {e.contact}
     />)
    })}
     
        
 
    </div>
    </section>
    <center>
     {search&& search.length>=ListConut&&<button style={{padding:'10px',background:'green',color:'white',outline:'none',border:'none',borderRadius:'20px',margin:'20px 0px',padding:'5px 15px'}} onClick={LoadNext}>Load More Hospitals</button>}
    </center>
    <Footer/>
   
   </>
  );
}

export default App;
