import React from 'react'
 export default function BedItemList(props){
    return( <div className="row"  style={{textTransform:'uppercase'}}>
    <div className="col-2">
      <center>
        <strong>{props.city}</strong>
      </center>
    </div>
    <div className="col-2">
      <center>
        <strong>{props.hospital}</strong>
      </center>
    </div>
    <div className="col-2">
        <center>
          <div className="text-muted">
                <span style={{color:(props.covid_beds>=1)?'green':'black'}}>COVID BEDS</span>
            </div>
            <strong style={{color:(props.covid_beds>=1)?'green':'black'}}>
            {props.covid_beds}
          </strong>
        </center>
    </div>

    <div className="col-2">
        <center>
            <div className="text-muted">
            <span style={{color:(props.oxy_beds>=1)?'green':'black'}}> OXYGEN BEDS</span>
              </div>
              <strong style={{color:(props.oxy_beds>=1)?'green':'black'}}>
              {props.oxy_beds}
            </strong>
          </center>
    </div>

    <div className="col-2">
        <center>
            <div className="text-muted">
            <span style={{color:(props.icu_beds>=1)?'green':'black'}}>    ICU BEDS</span>
              </div>
            <strong style={{color:(props.icu_beds>=1)?'green':'black'}}>
              {props.icu_beds}
            </strong>
          </center>
    </div>

    <div className="col-2">
      <center>
          {
             (props.con)? <button type="button" className="btn btn-success">{ props.contact}</button>:<span style= {{background:'inherit'}}>          </span>
          }

        
      </center>
    </div>

</div>)
 }