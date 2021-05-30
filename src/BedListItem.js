import React from 'react'
 export default function BedItemList(props){
   var contact  = ""
   if(props.contact&&props.contact.length>=10){
     contact = (props.contact.includes('+91'))?props.contact.replace('+91','').trim():props.contact.trim();
   }
   if(props.address)
   {
    var address = "";
    address+= (!props.address.toLowerCase().includes(props.hospital.toLowerCase()))?` ${props.hospital.toLowerCase().trim()},`:'';
    address+=(props.address.toLowerCase())?props.address.toLowerCase().trim():'';
    address+= (!props.address.toLowerCase().includes(props.city.toLowerCase()))?` ${props.city.toLowerCase().trim()},`:'';
    address = address.toLocaleLowerCase();
   }
    return( 
    <div className="row"  style={{textTransform:'uppercase'}}>
    <div className="col-2">
      <center>
        <div className="text-muted hos">
        {props.hospital}
        </div>
        <span style={{color:'white',background:'gray',padding:'3px 6px',marginRight:'5px',borderRadius:'5px'}} className="below">
          {props.city}
        </span>

       {  props.category&& <span style={{color:'white',background:'gray',padding:'3px 6px',borderRadius:'5px'}} className="below"> 
            {props.category}
          </span>
        }
      </center>
      {/*<strong>{props.city}</strong>*/}
    </div>
    <div className="col-2">
    <center>
          <div className="text-muted">
                <span style={{color:(props.non_oxy_beds>=1)?'green':'black'}}>NON-OXYGEN BEDS</span>
            </div>
            <strong className="bed_count" style={{color:(props.non_oxy_beds>=1)?'green':'black'}}>
            {(props.non_oxy_beds>=0)?props.non_oxy_beds:'0'}
          </strong>
        </center>
    </div>
    <div className="col-2">
        <center>
            <div className="text-muted">
            <span style={{color:(props.oxy_beds>=1)?'green':'black'}}> OXYGEN BEDS</span>
              </div>
              <strong className="bed_count" style={{color:(props.oxy_beds>=1)?'green':'black'}}>
              {(props.oxy_beds>=0)?props.oxy_beds:'0'}
            </strong>
          </center>
    </div>

    <div className="col-2">
        <center>
            <div className="text-muted">
            <span style={{color:(props.icu_venti_beds>=1)?'green':'black'}}>ICU VENTILATOR BEDS</span>
              </div>
              <strong className="bed_count" style={{color:(props.icu_venti_beds>=1)?'green':'black'}}>
              {(props.icu_venti_beds>=0)?props.icu_venti_beds:'0'}
            </strong>
          </center>
    </div>

    <div className="col-2">
        <center>
            <div className="text-muted">
            <span style={{color:(props.icu_non_venti_beds>=1)?'green':'black'}}>ICU NON-VENTILATOR BEDS</span>
              </div>
            <strong className="bed_count" style={{color:(props.icu_non_venti_beds>=1)?'green':'black'}}>
            {(props.icu_non_venti_beds>=0)?props.icu_non_venti_beds:'0'}
            </strong>
          </center>
    </div>

    <div className="col-2">
      <center>
        <span style={{display:'flex',alignItems:'center'}}>
          <span style={{flex:'1'}}>
            {
              (props.address)? <a href={`https://www.google.com/maps/search/${address}`} target='_blank'><span style={{color:'white',background:'gray',padding:'3px 6px',borderRadius:'5px',marginRight:'calc(5px + 0.5vw)'}}><i className="fas fa-map-marker-alt"></i></span></a>:<span style= {{background:'inherit'}}> </span>
            }
          </span>
          <span style={{flex:'2'}}>
            {
              (contact)? <a href={`tel:+91${contact}`} type="button" className="btn btn-success">{contact}</a>:<span style= {{background:'inherit'}}>          </span>
            }
          </span>
        </span>
      </center>
    </div>
</div>)
 }