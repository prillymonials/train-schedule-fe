import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';
import axios from 'axios';
import { useState } from 'react';
import { connect } from 'react-redux';
import { BASE_URL_API } from '../../constants/common';
import { login, showErrorMessage } from '../../redux/actions/app';
import Input from '../common/Input';

const PasswordInput = ({ value, onChange }) => {
  const [isPasswordShown, setPasswordShown] = useState(false);

  return (
    <>
      <Input
        type={isPasswordShown ? 'text' : 'password'}
        value={value}
        onChange={onChange}
      />
      {
        isPasswordShown
          ? <EyeOffIcon
              className="w-6 h-6 absolute top-8 right-4 text-gray-500"
              onClick={() => setPasswordShown(false)}
            />
          : <EyeIcon
              className="w-6 h-6 absolute top-8 right-4 text-gray-500"
              onClick={() => setPasswordShown(true)}
            />
      }
    </>
  );
}

const UserForm = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [isLoginMode, setLoginMode] = useState(true);
  const [isLoading, setLoading] = useState(false);

  async function handleClick() {
    if (username.trim() === '' || password === '' || (!isLoginMode && confPassword === '')) {
      props.showErrorMessage('Please fill the form.');
      return;
    }
    if (!isLoginMode && password !== confPassword) {
      props.showErrorMessage('Password and Confirm Password is different.');
      return;
    }

    setLoading(true);

    try {
      const path = isLoginMode ? 'login' : 'register';
      const user = await axios.post(`${BASE_URL_API}/auth/${path}`, {
        username,
        password,
      });
      localStorage.setItem('_userId', user.data.id);
      localStorage.setItem('_username', username);
      props.login(user.data.id, username);
    } catch (e) {
      const message = e.response.data.message;
      props.showErrorMessage(
        message === 'Validation error' ? 'Username already registered.' : message
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col">
      <h2 className="text-lg font-bold text-center">
        {isLoginMode ? 'Login' : 'Sign Up'}
      </h2>
      <div className="mb-4">
        <label className="text-xs text-gray-500">Username</label>
        <Input
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-4 relative">
        <label className="text-xs text-gray-500">Password</label>
        <PasswordInput value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      {
        !isLoginMode && (
          <div className="mb-8 relative">
            <label className="text-xs text-gray-500">Confirm Password</label>
            <PasswordInput value={confPassword} onChange={e => setConfPassword(e.target.value)} />
          </div>
        )
      }
      {
        isLoading ? (
          <div className="flex justify-center mt-2">
            <img src="/loading.gif" alt="Loading" className="w-10 h-10" />
          </div>
        ) : (
          <>
            <div className="mb-6">
              <button
                className="bg-blue-400 text-white py-2 w-full rounded-sm"
                onClick={() => handleClick()}
              >
                {isLoginMode ? 'Login' : 'Sign Up'}
              </button>
            </div>
            <p
              className="text-xs text-gray-500 underline text-center cursor-pointer"
              onClick={() => {
                setUsername('');
                setPassword('');
                setConfPassword('');
                setLoginMode(!isLoginMode);
              }}
            >
              Click here to {isLoginMode ? 'Sign Up' : 'Login'}
            </p>
          </>
        )
      }
    </div>
  );
};

const mapDispatchToProps = {
  showErrorMessage,
  login,
};

export default connect(undefined, mapDispatchToProps)(UserForm);
