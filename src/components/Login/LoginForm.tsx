'use client'

import React, { useState, useEffect, ChangeEvent, MouseEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Button,
  Checkbox,
  CustomFlowbiteTheme,
  Label,
  TextInput,
} from 'flowbite-react';
import { HiMail, HiLockClosed } from 'react-icons/hi';
import { useAuthStore } from '@/hooks/useAuth';
import { GoogleButton } from './GoogleButton';

interface LoginFormProps {}

interface LoginFormState {
  email: string;
  password: string;
  remember: boolean;
}

const buttonTheme: CustomFlowbiteTheme['button'] = {
  color: {
    primary: 'bg-tertiary hover:bg-primary text-white py-2',
  },
};

export const LoginForm: React.FC<LoginFormProps> = () => {
  const router = useRouter();
  const signIn = useAuthStore((state) => state.signIn)

  const [formData, setFormData] = useState<LoginFormState>({
    email: '',
    password: '',
    remember: false,
  });

  // Combine error states into a single state object for better maintainability
  const [formErrors, setFormErrors] = useState({
    emptyEmail: false,
    emptyPassword: false,
    invalidEmail: false,
    wrongCredentials: false,
  });

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Destructure form data for cleaner code
    const { email, password } = formData;

    // Reset all form errors
    setFormErrors({
      emptyEmail: false,
      emptyPassword: false,
      invalidEmail: false,
      wrongCredentials: false,
    });

    if (email && password) {
      signIn(email, password)
      router.push('/')
    } else {
      // Set specific error states based on form data
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        emptyEmail: !email,
        emptyPassword: !password,
      }));
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  const handleRememberMe = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      remember: event.target.checked,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div className='w-full px-12'>
    <GoogleButton />
    <h5 className='text-sm font-light text-gray-500 my-4 text-center'>- OR -</h5>
    <form className="flex w-full flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email" value="Email" className='text-md' />
        </div>
        <TextInput
          id="email"
          type="email"
          onChange={(e) => handleChange(e)}
          placeholder="name@mail.com"
          required
          icon={HiMail}
          sizing="md"
          color={(formErrors.invalidEmail || formErrors.wrongCredentials || formErrors.emptyEmail) ? "failure" : undefined}
          helperText={
            (formErrors.invalidEmail && !formErrors.wrongCredentials && !formErrors.emptyEmail) ? (
              <>
                <span className="font-medium">Oops!</span> Not a valid email address!
              </>
            ) : formErrors.wrongCredentials ? (
              <>
                <span className="font-medium">Oops!</span> Incorrect email or password!
              </>
            ) : formErrors.emptyEmail ? (
              <>
                <span className="font-medium">Oops!</span> Email address cannot be empty!
              </>
            ) : undefined
          }
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password" value="Password" className='text-md' />
        </div>
        <TextInput 
          id="password" 
          type="password" 
          onChange={(e) => handleChange(e)} 
          placeholder='* * * * *' 
          required 
          icon={HiLockClosed}
          sizing='md'
          color={(formErrors.emptyPassword) ? "failure" : undefined}
          helperText={
            (formErrors.emptyPassword) ? (
              <>
                <span className="font-medium">Oops!</span> Password cannot be empty!
              </>
            ) :  undefined
          }
        />
      </div>
      <div className='flex justify-between'>
        <div className="flex items-center gap-2 ">
          <Checkbox id="remember" onChange={(e) => handleRememberMe(e)} color='blue' />
          <Label htmlFor="remember" className='text-xs' >Remember me</Label>
        </div>
        <Label htmlFor="forgot" className='text-xs text-blue-700 hover:text-tertiary' >
          <Link href='/'>
            Forgot your password?
          </Link>
        </Label>
      </div>
      <Button type="submit" onClick={(e) => handleSubmit(e)} theme={buttonTheme} color='primary' size='md' >Sign In</Button>
      <Label htmlFor="register" className='text-xs text-center' >
        <Link href='/new-account'>
          Not registered?&nbsp;<span className='text-accent hover:text-accent/80'>Create account</span>
        </Link>
      </Label>
    </form>
  </div>
  )
}
