import './Contact.css'
const Contact = () => {
  return (
    <>
      <h1 className="contactush1" style={{color:"#374259"}} >Contact Us</h1>
      <div className="contact-form">

      <form className='cfform' action="post">
        <ul className="reachout" >Reach us out
          <li className='cfname' >First Name</li>
          <li className='cflname'>Last Name</li>
          <li className='cfemail' >Email</li>
          <li className='cfcontact'>Contact Number</li>
          
        </ul>
      </form>
      </div>

      
      
    </>
  )
}

export default Contact