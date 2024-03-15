import './Home.css';
import { useAppSelector } from '../../hooks';
import { selectIsAuthenticated, selectUser } from '../../features/auth/authSlice';

function Home() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectUser);
  console.log(isAuthenticated)
  console.log(user)

  return (
    <> 
      <div>
        {isAuthenticated && user ? (
          <div>
            <h2>Welcome back {user.name}!</h2>
            <ul>
              <li>Email: {user.email}</li>
              {/* Display more user details as needed */}
            </ul>
          </div>
        ) : (
          <>
            <h2>Please log in.</h2>
            {/* Additional content */}
          </>
        )}
      </div>
    </>
  );
}

export default Home;
