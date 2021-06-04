 // eslint-disable-next-line
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
    const {Data:hospital,SetData:setHospital} = useFetch('https://spgvark-pandemic.herokuapp.com/api/beds');
    const [city_selected,setCity] = useState('');
    const [search,setSearch] = useState(null);
    const [query,setQuery] = useState('')
    const [ListConut,setListCount] = useState(20);
    const [sort,setSort] = useState(null);
  //</UseState>
 
  //<UseEffect>
    useEffect(() => 
    {
      setSearch(hospital);
      setSort(0);
    }, [hospital])
    useEffect(() => 
    {
      if(search)
      {
        var hos = hospital;
        if(query)
        {
          hos = hos.filter((el)=> el.city.toLowerCase().includes(query.toLowerCase()) || el.hospital.toLowerCase().includes(query.toLowerCase()) );
        }
          hos = hos.filter((el)=>el.city.toLowerCase().includes(city_selected.toLowerCase()))
          setSearch(hos); 
          setListCount(20)
      }
    }, [city_selected])
    useEffect(() => {
      var hos = hospital;
      var val  = query;
      if(search)
      {
        if(city_selected)
        {
          hos = hos.filter((el)=>el.city.toLowerCase().includes(city_selected.toLowerCase()))
        } 
        hos = hos.filter((el)=>el.city.toLowerCase().includes(val.toLowerCase()) || el.hospital.toLowerCase().includes(val.toLowerCase()))
        setSearch(hos);
        setListCount(20);
      }
    }, [query])
    useEffect(() => 
    {
     const URL = 'https://ip.nf/me.json';
     fetch(URL)
     .then(response => response.json())
     .then(data=> {if(cities.includes(data.ip.city))setCity(data.ip.city)})
    }, [])
    
  function Sort(sort)
  {
      setSort(sort)
      var list = search;
      
        switch(sort){
          case 1:
            list.sort((a,b)=>b.oxy_beds.vaccant - a.oxy_beds.vaccant);
            break;
          case 2:
              list.sort((a,b)=>b.non_oxy_beds.vaccant - a.non_oxy_beds.vaccant);
              break;
          case 3:
              
              list.sort((a,b)=>{
                var c = (b.icu_ventilator_beds.vaccant>=0)?b.icu_ventilator_beds.vaccant:0;
                var d = (a.icu_ventilator_beds.vaccant>=0)?a.icu_ventilator_beds.vaccant:0;
                return c - d
              });
              break;
          case 4:
              list.sort((a,b)=>
              {
                var c = (b.icu_non_ventilator_beds.vaccant>=0)?b.icu_non_ventilator_beds.vaccant:0;
                var d = (a.icu_non_ventilator_beds.vaccant>=0)?a.icu_non_ventilator_beds.vaccant:0;
                return c - d
              });
              break;
        }
        //console.log(list[0])
        setSearch(list);

  }
  //</UseEffect>

  //<Event Listeners>
    function HandleSearch(e){
      setQuery(e.target.value)
    }
    function ClearSearch(){
      document.getElementById('search').value = ''
      setQuery( '');
    }
    function LoadNext()
    {
        setListCount(ListConut+20);
    }
  //<Event Listeners>

  return (
   <>
    <Header HandleSearch={HandleSearch} ClearSearch={ClearSearch}/>
  
  <section id="data">
    <h2 style={{color:'white',background:'#ef5350',width:'100%',padding:'5px 10px',fontSize:'calc(7px + 0.5vw)',borderRadius:'20px',textAlign:'center'}}>Data in the website may be delayed or partial. Please verify with the hospital before any decision.</h2>
    <div className="border-all">
    <div className="row" style={{background:"#f3f4ed"}}>
        {search&&<div className="dropdown p-2 col-2" style={{background:'none'}}>
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
         <div className="p-2 col">
         <button type="button"  className={`rounded-pill m-1 btn btn-secondary  ${(sort===2)?'selected':''}`}   onClick={()=>Sort(2)}>Non-Oxygn</button>
         <button type="button"  className={`rounded-pill m-1 btn btn-secondary  ${(sort===1)?'selected':''}`}   onClick={()=>Sort(1)}>Oxygen</button>
         <button type="button"  className={`rounded-pill m-1 btn btn-secondary  ${(sort===3)?'selected':''}`}   onClick={()=>Sort(3)}>ICU Ventilator Beds</button>
         <button type="button"  className={`rounded-pill m-1 btn btn-secondary  ${(sort===4)?'selected':''}`}   onClick={()=>Sort(4)}>ICU Non-Ventilator Beds</button>
        </div>  
    </div> 
    {(!search)?<center><h5 className="loading">LOADING......</h5><div className="loader"></div></center>:'' }
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
