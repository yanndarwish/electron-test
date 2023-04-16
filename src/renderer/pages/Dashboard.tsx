import { useSelector } from 'react-redux';
import { useLoginMutation } from 'renderer/redux/services/auth';

const Dashboard = () => {
  const [login, error] = useLoginMutation();
  const isLoggedIn = useSelector((state: any) => state.authSlice.loggedIn);
  const token = useSelector((state: any) => state.authSlice.token);

  console.log(error);
  console.log(token);
  console.log(isLoggedIn);
  const handleClick = async () => {
    console.log('fetch');
    const response = await fetch('https://jobs-search.herokuapp.com/');
    // const data = await response.json();
    console.log(response);

    login({ email: 'dummy@gmail.com', password: 'seret' });
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button type="button" className="btn" onClick={() => handleClick()}>
        Fetch
      </button>
    </div>
  );
};

export default Dashboard;
