import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import './Footer.css';

export default function Footer() {
  return (
    <div className="footer">
    <div className='footerSubOne' component="section" >
      2026 RouteWise | All rights reserved
    </div>
    <div className="icons">
    <div className="iconOne">
      <InstagramIcon/>
    </div>
    <div className="iconTwo">
      <FacebookIcon/>
    </div>
    <div className="iconThree">
      <XIcon/>
    </div>
    </div>
    </div>
  )
}
