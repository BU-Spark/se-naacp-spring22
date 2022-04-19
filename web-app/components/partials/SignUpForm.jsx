import React, { useState, useContext } from 'react';
import Link from 'next/link';

import Input from '../primary/Input';
import SubmitButton from '../primary/SubmitButton';
import { notify } from '../../helpers/notificationHelper';
import authenticationservice from '../../services/authenticationservice';
import AppContext from '../../data/context/AppContext';

const initialState = {
  email: '',
  firstName: '',
  lastName: '',
  password: '',
};

export default function SingUpForm(props) {
  const { onLoginClick } = props;
  const { updateUser, signIn, setModalState } = useContext(AppContext);
  const [apiLoading, setApiLoading] = useState(false);
  const [error, setError] = useState({});
  const [userInput, setUserInput] = useState(initialState);

  const handleSignupClick = event => {
    event.preventDefault();
    onLoginClick();
  };

  async function onSubmit(event) {
    event.preventDefault();
    setApiLoading(true);
    try {
      const response = await authenticationservice.signUp(userInput);
      const { user, authToken } = response.data;
      authenticationservice.setToken(authToken);
      signIn(authToken);
      updateUser(user);
      setError({});
      setUserInput(initialState);
      setModalState(false);
      notify.success(response.message || 'sign in successful');
    } catch (err) {
      if (typeof err === 'string') {
        setError({ message: err });
      } else {
        setError(err);
      }
    }
    setApiLoading(false);
  }

  const handleChange = (id, value) => {
    setUserInput(prevValue => ({ ...prevValue, [id]: value }));
  };

  const { email, password, firstName, lastName } = userInput;

  return (
    <div className="block text-center sm:mt-0 sm:text-left">
      <form onSubmit={onSubmit}>
        {error?.message && (
          <div className="text-red-600 text-center font-medium">
            <p>{error.message}</p>
          </div>
        )}
        <div className="flex space-x-4">
          <Input
            value={firstName}
            name="firstName"
            autoComplete="name"
            onChange={(id, value) => handleChange(id, value)}
            label="First Name"
            error={error?.errors?.firstName}
          />
          <Input
            value={lastName}
            name="lastName"
            autoComplete="family-name"
            onChange={(id, value) => handleChange(id, value)}
            label="Last Name"
            error={error?.errors?.lastName}
          />
        </div>
        <Input
          value={email}
          name="email"
          onChange={(id, value) => handleChange(id, value)}
          label="Email address"
          error={error?.errors?.email}
        />
        <Input
          value={password}
          name="password"
          type="password"
          autoComplete="new-password"
          onChange={(id, value) => handleChange(id, value)}
          label="Password"
          error={error?.errors?.password}
        />

        <SubmitButton
          text="Sign up"
          disabled={!email || !password}
          loading={apiLoading}
          classNames={`bg-blue-600 text-white hover:bg-blue-500 ${error?.message ? 'ring ring-red-600' : ''}`}
        />
      </form>
      <p className="text-gray-600 mt-6 text-center">
        I have an account.
        <button className="focus:outline-none ml-2 font-medium text-primary-600" onClick={handleSignupClick}>
          Log in
        </button>
      </p>
    </div>
  );
}
