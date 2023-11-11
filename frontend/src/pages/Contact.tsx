import './Contact.css';

const Contact = () => {
  return (
    <>
      <h1 className="contactush1" style={{ color: "#374259" }}>Contact Us</h1>
      <div className="contact-form">
        <form className='cfform' method="post">
          <h2 className="reachout">Reach us out</h2>
          
          
          <div className="input-container">
            <label className='cfname-label' htmlFor="firstName"  >First Name</label>
            <input className='cfname-input' type="text" id="firstName" placeholder='First Name' name="firstName" required />
          </div>

          <div className="input-container">
            <label className='cflname-label' htmlFor="lastName">Last Name</label>
            <input className='cflname-input' type="text" id="lastName" placeholder='Last Name' name="lastName" required />
          </div>

          <div className="input-container">
            <label className='cfemail-label' htmlFor="email">Email</label>
            <input className='cfemail-input' type="email" id="email" placeholder='Email' name="email" required />
          </div>

          <div className="input-container">
            <label className='cfcontact-label' htmlFor="contactNumber">Contact Number</label>
            <input className='cfcontact-input' type="tel" id="contactNumber" placeholder='Contact Number' name="contactNumber" required />
          </div>
          <div className="input-container">
            <label className='cfcontact-label' htmlFor="message">Message</label>
            <textarea className='cfcontact-input' type="text" id="contactNumber" placeholder='Please Leave a Message' name="contactNumber" required />
          </div>

          <button className="cfsubmit" type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default Contact;
