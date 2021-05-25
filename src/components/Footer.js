import Reatc from 'react'
import facebook from '../images/facebook.png'
import whatsapp from '../images/whatsapp.png'
import instagram from '../images/instagram.png'
import gmail from '../images/gmail.png'
export default function Footer(){
    return(
    <>
         <footer id="footer">
            <a href=""> <img className="social-media" src={facebook} alt="facebook-img"/></a>
            <a href="https://api.whatsapp.com/send?phone+919443332188"><img className="social-media" src={whatsapp} alt="whatsapp-img"/></a>
            <a href=""><img className="social-media" src={instagram} alt="instagram-img"/></a>
            <a href="mailto:spgvarkpvtltd@gmail.com"><img className="social-media" src={gmail} alt="email-img"/></a>
            <p className="footer-txt" style={{color:' #fff'}}>© Copyright 2021 Spgvark</p>
        </footer>
    </>
    )
}