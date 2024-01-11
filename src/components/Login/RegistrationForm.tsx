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

interface RegistrationFormProps {}

interface RegistrationFormState {
  email: string;
  password: string;
  confirmPassword: string;
}

const buttonTheme = {
  color: {
    primary: 'bg-tertiary hover:bg-primary text-white py-2',
  },
};

export const RegistrationForm: React.FC<RegistrationFormProps> = () => {
  const router = useRouter();
  const signUp = useAuthStore((state) => state.signUp)
  const user = useAuthStore((state) => state.user)
  const authStateChangeListener = useAuthStore((state) => state.authStateChangeListener)

  const [formData, setFormData] = useState<RegistrationFormState>({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [formErrors, setFormErrors] = useState({
    emptyEmail: false,
    emptyPassword: false,
    emptyConfirmPassword: false,
    invalidEmail: false,
    confirmPasswordMismatch: false,
  });

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const { email, password, confirmPassword } = formData;

    setFormErrors({
      emptyEmail: false,
      emptyPassword: false,
      emptyConfirmPassword: false,
      invalidEmail: false,
      confirmPasswordMismatch: false,
    });

    try {
      const validatedCredentials = SignUpSchema.parse({ email, password, confirmPassword })
      const { email: vEmail, password: vPassword, confirmPassword: vConfirmPassword } = validatedCredentials
      signUp(vEmail, vPassword, vConfirmPassword)
      authStateChangeListener()
      router.push('/')

    } catch (error) {
      if (error instanceof ZodError) {
        console.error('Validation error:', error.errors);
      } else {
        console.error('Unexpected error:', error);
      }
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
    <h5 className='text-sm font-light text-gray-500 mb-4 text-center'>- OR -</h5>
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
          color={(formErrors.invalidEmail || formErrors.emptyEmail) ? "failure" : undefined}
          helperText={
            (formErrors.invalidEmail && !formErrors.emptyEmail) ? (
              <>
                <span className="font-medium">Oops!</span> Not a valid email address!
              </>
            ) : formErrors.emptyEmail ? (
              <>
                Email address cannot be empty.
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
                Password cannot be empty.
              </>
            ) :  undefined
          }
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
            ) : formErrors.emptyConfirmPassword ? (
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
