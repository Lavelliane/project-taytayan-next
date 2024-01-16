'use client'

import React, { useState, useEffect, ChangeEvent, MouseEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Label, TextInput } from 'flowbite-react';
import { HiMail, HiLockClosed } from 'react-icons/hi';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useAuthStore } from '@/hooks/useAuth';
import SignUpSchema from '@/schemas/SignUpSchema';
import { ZodError } from 'zod';
import { GoogleButton } from './GoogleButton';

interface RegistrationFormState {
  firstName: string;
  lastName: String
  email: string;
  password: string;
  confirmPassword: string;
}

const buttonTheme = {
  color: {
    primary: 'bg-tertiary hover:bg-primary text-white py-2',
  },
};

export const RegistrationForm = () => {
  const router = useRouter();
  const signUp = useAuthStore((state) => state.signUp)
  const user = useAuthStore((state) => state.user)

  const [formData, setFormData] = useState<RegistrationFormState>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [formErrors, setFormErrors] = useState({
    emptyFirstName: false,
    emptyLastName: false,
    emptyEmail: false,
    emptyPassword: false,
    emptyConfirmPassword: false,
    invalidEmail: false,
    confirmPasswordMismatch: false,
  });

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const { firstName, lastName, email, password, confirmPassword } = formData;

    setFormErrors({
      emptyFirstName: false,
      emptyLastName: false,
      emptyEmail: false,
      emptyPassword: false,
      emptyConfirmPassword: false,
      invalidEmail: false,
      confirmPasswordMismatch: false,
    });

    if (firstName && lastName && email && password && confirmPassword) {
      setTimeout(() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
          setFormErrors((prevErrors) => ({ ...prevErrors, invalidEmail: true }));
          return;
        }

        if (password === confirmPassword) {

          // TODO: INSERT FIREBASE SIGN UP CONNECTION HERE
          try {
            const validatedCredentials = SignUpSchema.parse({ email, password, confirmPassword, firstName, lastName })
            const { email: vEmail, password: vPassword, confirmPassword: vConfirmPassword, lastName: vLastName, firstName: vFirstName } = validatedCredentials
            signUp(vEmail, vPassword, vConfirmPassword, vFirstName, vLastName)
            router.push('/')

          } catch (error) {
            if (error instanceof ZodError) {
              console.error('Validation error:', error.errors);
            } else {
              console.error('Unexpected error:', error);
            }
          }

          router.push('/');
        } else {
          setFormErrors((prevErrors) => ({ ...prevErrors, confirmPasswordMismatch: true }));
        }
      }, 1000);
    } else {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        emptyFirstName: !firstName,
        emptyLastName: !lastName,
        emptyEmail: !email,
        emptyPassword: !password,
        emptyConfirmPassword: !confirmPassword,
      }));
    }    
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
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
      <div className='flex gap-4'>
        <div className="block">
          <Label htmlFor="firstName" value="First Name" className='text-md mb-2 block' />
          <TextInput
          id="firstName"
          type="text"
          onChange={(e) => handleChange(e)}
          placeholder="Juan"
          required
          sizing="md"
          color={(formErrors.emptyFirstName) ? "failure" : undefined}
          />
        </div>
        <div className="block">
          <Label htmlFor="lastName" value="Last Name" className='text-md mb-2 block' />
          <TextInput
          id="lastName"
          type="text"
          onChange={(e) => handleChange(e)}
          placeholder="De La Cruz"
          required
          sizing="md"
          color={(formErrors.emptyLastName) ? "failure" : undefined}
          />
        </div>
      </div>
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
          color={(formErrors.invalidEmail || formErrors.emptyEmail) ? "failure" : undefined}
          helperText={
            (formErrors.invalidEmail && !formErrors.emptyEmail) ? (
              <>
                <span className="font-medium">Oops!</span> Not a valid email address!
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
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="confirmPassword" value="Confirm Password" className='text-md' />
        </div>
        <TextInput 
          id="confirmPassword" 
          type="password" 
          onChange={(e) => handleChange(e)} 
          placeholder='* * * * *' 
          required 
          icon={HiLockClosed}
          sizing='md'
          color={(formErrors.confirmPasswordMismatch || formErrors.emptyConfirmPassword) ? "failure" : undefined}
          helperText={
            (formErrors.confirmPasswordMismatch && !formErrors.emptyConfirmPassword) ? (
              <>
                <span className="font-medium">Oops!</span> Password confirmation does not match!
              </>
            ) : (formErrors.emptyConfirmPassword && !formErrors.emptyPassword ) ? (
              <>
                Enter password again to confirm.
              </>
            ) : undefined
          }
        />
      </div>
      <Button type="submit" onClick={(e) => handleSubmit(e)} theme={buttonTheme} color='primary' size='md' >Sign Up</Button>
      <Label htmlFor="register" className='text-xs text-center' >
        <Link href='/login'>
          Already have an account?&nbsp;<span className='text-accent hover:text-accent/80'>Sign in</span>
        </Link>
      </Label>
    </form>
  </div>
  )
}
