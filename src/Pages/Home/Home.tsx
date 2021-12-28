import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();

  const goToRegister = () => {
    navigate('/account/register');
  };
  return (
    <div>
      <h1>Home</h1>
      <button onClick={goToRegister}>Register</button>
    </div>
  );
};
