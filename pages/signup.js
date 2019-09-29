import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Icon, Message, Segment } from 'semantic-ui-react';
import Link from 'next/link';
import catchErrors from '../utils/catchErrors';
import baseUrl from '../utils/baseUrl';
import { handleLogin } from '../utils/auth';

const INITIAL_USER = {
  name: '',
  email: '',
  password: ''
};

function Signup() {
  const [user, setUser] = useState(INITIAL_USER);
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const isUser = Object.values(user).every(el => Boolean(el));
    isUser ? setDisable(false) : setDisable(true);
  }, [user]);

  const handleChange = e => {
    const { name, value } = e.target;
    setUser(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      const url = `${baseUrl}/api/signup`;
      const payload = { ...user };
      const response = await axios.post(url, payload);
      handleLogin(response.data);
    } catch (error) {
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Message
        attached
        icon='settings'
        header='Get Started'
        content='Create a new Acoount'
        color='teal'
      />
      <Form onSubmit={handleSubmit} loading={loading} error={Boolean(error)}>
        <Message error header='Oops!' content={error} />
        <Segment>
          <Form.Input
            fluid
            icon='user'
            iconPosition='left'
            label='Name'
            placeholder='Name'
            name='name'
            onChange={handleChange}
            value={user.name}
          />
          <Form.Input
            fluid
            icon='envelope'
            iconPosition='left'
            label='Email'
            placeholder='Email'
            name='email'
            type='email'
            onChange={handleChange}
            value={user.email}
          />
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            label='Password'
            placeholder='Password'
            name='password'
            type='password'
            onChange={handleChange}
            value={user.password}
          />
          <Button
            icon='signup'
            type='submit'
            color='orange'
            content='Signup'
            disabled={disable || loading}
          />
        </Segment>
      </Form>
      <Message attached='bottom' warning>
        <Icon name='help' />
        Existing user?{' '}
        <Link href='/login'>
          <a>Log in here</a>
        </Link>{' '}
        instead.
      </Message>
    </>
  );
}

export default Signup;
