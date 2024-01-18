'use client';

import React from 'react';
import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Box,
} from '@mui/material';
import { useForm } from 'react-hook-form';

import SignInFormProps from './signInForm.props';

/**
 * A sign-in form component for user authentication.
 *
 * @returns {JSX.Element} - The Sign-In Form component.
 */
const SignInForm = (): JSX.Element => {
  const form = useForm<SignInFormProps>();
  const { register } = form;

  return (
    <Box
      sx={{
        backgroundColor: 'primary.contrastText',
        display: 'flex',
        justifyContent: 'center',
        minHeight: 'calc(70vh - 80px)',
        p: 3,
        fontSize: 'large',
      }}
      component={'div'}
    >
      <Grid>
        <Card
          style={{
            fontSize: 'large',
            maxWidth: 450,
            padding: '20px 5px',
            margin: '0 auto',
          }}
        >
          <CardContent>
            <Typography
              className='text-center'
              gutterBottom
              variant='h5'
            >
              Sign-in
            </Typography>

            <form>
              <Grid
                container
                spacing={1}
              >
                <Grid
                  item
                  xs={12}
                >
                  <TextField
                    type='email'
                    label='Email'
                    fullWidth
                    required
                    {...register('email', { required: 'Email is required' })}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                >
                  <TextField
                    type='password'
                    label='Password'
                    fullWidth
                    required
                    {...register('password', {
                      required: 'Password is required',
                    })}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                >
                  <Button
                    className='text-blue-400 hover:text-white'
                    type='submit'
                    variant='contained'
                    fullWidth
                  >
                    Connect
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Box>
  );
};

export default SignInForm;
