import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {RootState}  from '../../redux/store';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './member.css';
import { UsersCombined, selectIsGoogleAuth } from '../../features/auth/authSlice';

interface GoogleUserData {
  _id: string;
  googleId: string;
  displayName: string;
  firstName: string;
  lastName?: string;
  email: string;
  photo?: string;
  created: string;
  __v: number;
}

const Member = () => {
  const user = useSelector((state: RootState) => state.auth.user as UsersCombined);
  const isGoogleAuth = useSelector(selectIsGoogleAuth);
  const currentCartTotal = useSelector((state: RootState) => state.cart.total);
  const [googleUserData, setGoogleUserData] = useState<GoogleUserData | null>(null);
  const [loading, setLoading] = useState(true);  // Initialize loading state

  const isGoogleUser = (user: UsersCombined): user is GoogleUser => {
    return 'googleId' in user;
  };

  useEffect(() => {
    if (user && isGoogleAuth && isGoogleUser(user)) {
      const fetchGoogleUserData = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/gusers/${user.googleId}`);
          setGoogleUserData(response.data);
        } catch (error) {
          console.error('Error fetching Google user data', error);
        } finally {
          setLoading(false);  // Set loading to false regardless of success or error
        }
      };
      fetchGoogleUserData();
    } else {
      setLoading(false);  // Set loading to false if no fetch operation is needed
    }
  }, [user, isGoogleAuth]);

  if (loading) {
    return <div>Loading user data...</div>;
  }

  const userName = user?.name || user?.email.split('@')[0];
  const memberSince = user?.created ? new Date(user.created).toLocaleDateString() : 'Date not available';

  return (
    <div className="member-container">
      {isGoogleAuth && googleUserData ? (
        <Card style={{ width: '18rem' }}>
          <Card.Title>
            <h1>Welcome, {googleUserData.displayName}!</h1>
          </Card.Title>
          <Card.Body>
            <Card.Text>
              <h5 className='textandemail'>Total is ( {currentCartTotal} ) <br /> Tax included</h5>
              <h6 className='textandemail'>Email: {user?.email}</h6>
              {googleUserData.photo && <img src={googleUserData.photo} alt={userName} className="user-photo" />}
            </Card.Text>
            <Button variant="primary" className='textandemail'>₹ Pay Now</Button>
            <h6 className='textandemail'>Member Since: {memberSince}</h6>
          </Card.Body>
        </Card>
      ) : (
        <Card style={{ width: '18rem' }}>
          <Card.Title>
            <h1 className='userwelcome'>Welcome, <i><b>{userName}</b></i></h1>
          </Card.Title>
          <Card.Body>
            <Card.Text>
              <h5 className='textandemail'>Total is ( {currentCartTotal} ) <br /> Tax included</h5>
              <h6 className='textandemail'>Email: {user?.email}</h6>
            </Card.Text>
            <Button variant="primary" className='textandemail'>₹ Pay Now</Button>
            <h6 className='textandemail'>Member Since: {memberSince}</h6>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default Member;


// import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../redux/store';
// import axios from 'axios';
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import './member.css';
// import {UsersCombined} from '../../features/auth/authSlice'
// interface GoogleUserData {
//   _id: string;
//   googleId: string;
//   displayName: string;
//   firstName: string;
//   lastName?: string; // lastName is optional since it's not present in all entries
//   email: string;
//   photo?: string; // photo is optional because not all users might have a photo
//   created: string; // or Date if you want to work with Date objects
//   __v: number;
// }


// const Member = () => {
//   const user = useSelector((state: RootState) => state.auth.user);
//   const currentCartTotal = useSelector((state: RootState) => state.cart.total);
//   const [googleUserData, setGoogleUserData] = useState<GoogleUserData | null>(null);
//   const isGoogleUser = (user: UsersCombined) => {
//     return 'googleUser' in user;
//   };

//   useEffect(() => {
//     const fetchGoogleUserData = async () => {
//       if (user && isGoogleUser(user)) { // This checks if user is GoogleUser
//         try {
//           const response = await axios.get(`http://localhost:3000/api/gusers/${user.googleUser.googleId}`);
//           setGoogleUserData(response.data);
//         } catch (error) {
//           console.error('Error fetching Google user data', error);
//         }
//       }
//     };

//     fetchGoogleUserData();
//   }, [user]); // This effect depends on `user`
//   console.log(user)

//   if (!user || !googleUserData) {
//     return <div>Loading user data...</div>;
//   }

//   const userName = user.name || user.email.split('@')[0];
//   const memberSince = googleUserData && googleUserData.created ? new Date(googleUserData.created).toLocaleDateString() : 'Date not available';

//   return (
//     <div className="member-container">
//       {isGoogleUser(user) ? (
//         <Card style={{ width: '18rem' }}>
//           <Card.Title>
//             <h1>Welcome, {googleUserData.displayName}!</h1>
//             <h1 className='userwelcome'>Welcome,  <i><b>{userName}</b></i>  
//             </h1>
//           </Card.Title>
//           <Card.Body>
//             <Card.Text>
//               <h5  className='textandemail'> <b> Total </b> is <b> ( {currentCartTotal} )</b> <br /> <u>  Tax included</u></h5>

//               <h6 className='textandemail' > Email: {user.email}</h6>                                        
//                 {/* Render the image only if the photo property exists */}
//                 {/* {user.photo && <img src={user.photo} alt={userName} className="user-photo" />} */}
//             </Card.Text>
//             <Button variant="primary" className='textandemail'> <b>₹</b>  Pay Now  </Button>
//             <h6 className='textandemail' > Member Since: {memberSince}</h6>
//           </Card.Body>
//         </Card>
//       )  : (
//         <div>
//           <h1>Welcome, {userName}!</h1>
//           <p>You are not a Google user.</p>
//         </div>
//       )}
//     </div>
//   );
// }
// export default Member;

// In your member component
