import {useState,useEffect} from 'react'
const useFetch = (url)=>
{
    const[Data,setData] = useState(null);
    useEffect(()=>
    {
        const Abort = new AbortController();

        fetch(url,{signal:Abort.signal})
        .then((res=>
          {
              //console.log(res)
            if(!res.ok)
              throw Error('New Error')
            return  res.json()
            }
          ))
        .then(data=>
        {
          setData(data)
          //console.log(data)
        })
        .catch((err)=>{
          console.log(err)
        })
        return ()=> Abort.abort();
      },[url])
      const SetData = (data_)=>{
        setData(data_)
      }
    return {Data,SetData}
}
export default useFetch;