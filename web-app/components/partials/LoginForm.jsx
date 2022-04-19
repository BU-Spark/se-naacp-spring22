import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';

import authenticationservice from '../../services/authenticationservice';
import Input from '../primary/Input';
import AppContext from '../../data/context/AppContext';
import { notify } from '../../helpers/notificationHelper';
import SubmitButton from '../primary/SubmitButton';

const defaultValues = {
  email: '',
  password: '',
};

export default function LoginForm(props) {
  const { onForgotPasswordClick, onSignUpClick } = props;
  const [apiLoading, setApiLoading] = useState(false);
  const { updateUser, signIn, setModalState } = useContext(AppContext);
  const [error, setError] = useState({});
  const [userInput, setUserInput] = useState(defaultValues);

  const router = useRouter();

  async function onSubmit(event) {
    event.preventDefault();
    setApiLoading(true);
    try {
      setError({});
      const response = await authenticationservice.logIn(userInput);
      const { user, authToken } = response.data;
      authenticationservice.setToken(authToken);
      signIn(authToken);
      setError({});
      updateUser(user);
      setUserInput(defaultValues);
      setModalState(false);
      notify.success(response.message || 'sign in successful');
      router.push('/');
    } catch (err) {
      if (typeof err === 'string') {
        setError({ message: err });
      } else {
        setError(err);
      }
    }
    setApiLoading(false);
  }

  const handleForgotPasswordClick = event => {
    event.preventDefault();
    onForgotPasswordClick();
  };

  const handleSignupClick = event => {
    event.preventDefault();
    onSignUpClick();
  };

  const handleChange = (id, value) => {
    setUserInput(prevValue => ({ ...prevValue, [id]: value }));
  };

  const { email, password } = userInput;

  return (
    <div className="block text-center sm:mt-0 sm:text-left">
      <form onSubmit={onSubmit}>
        {error?.message && (
          <div className="text-red-600 text-center font-medium">
            <p>{error.message}</p>
          </div>
        )}
        <Input
          value={email}
          name="email"
          onChange={(id, value) => handleChange(id, value)}
          label="Email address"
          error={error?.errors?.email}
        />
        <Input
          name="password"
          value={password}
          onChange={(id, value) => handleChange(id, value)}
          label="Password"
          type="password"
          error={error?.errors?.password}
        />

        <button type="button" className="text-gray-600 text-sm" onClick={handleForgotPasswordClick}>
          forgot password
        </button>

        <SubmitButton
          text="Log in"
          disabled={!email || !password}
          loading={apiLoading}
          classNames={`bg-blue-600 text-white hover:bg-blue-500 ${error?.message ? 'ring ring-red-600' : ''}`}
        />
      </form>
      <p className="text-gray-700 mt-4 text-center">
        I don't have an account
        <button type="submit" className="focus:outline-none ml-2 font-medium text-gray-900" onClick={handleSignupClick}>
          Sign up
        </button>
      </p>
    </div>
  );
}
