import LoginForm from '../components/forms/loginForm';

function Login(props) {
  return (
    <div>
      <LoginForm params={{redirect: props.history.push}}/>
    </div>
  );
}

export default Login;