'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { Button, Checkbox, CustomFlowbiteTheme, Label, TextInput } from 'flowbite-react';
import { HiMail, HiLockClosed } from 'react-icons/hi';

interface RegistrationFormProps {}

interface RegistrationFormState {
    email: string;
    password: string;
    confirmPassword: string;
}

const googleButton: CustomFlowbiteTheme['button'] = {
    color: {
      google: 'bg-white hover:bg-gray-100/30 border border-gray-200/50 text-gray-500 shadow-md w-full',
    },
};
  
const buttonTheme: CustomFlowbiteTheme['button'] = {
    color: {
      primary: 'bg-tertiary hover:bg-primary text-white py-2',
    },
};
  

export const RegistrationForm: React.FC<RegistrationFormProps> = () => {
  const router = useRouter()
  const [formData, setFormData] = useState<RegistrationFormState>({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [emptyEmailError, setEmptyEmailError] = useState(false);
  const [emptyPasswordError, setEmptyPasswordError] = useState(false);
  const [emptyConfirmPasswordError, setEmptyConfirmPasswordError] = useState(false)
  const [emailError, setEmailError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setEmptyEmailError(false)
    setEmptyPasswordError(false)
    setEmptyConfirmPasswordError(false)
    setConfirmPasswordError(false)
    setEmailError(false)
    if (formData.email && formData.password && formData.confirmPassword) {   
      setTimeout(() => { // Simulate a server response
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation regex
        if (!emailRegex.test(formData.email)) {
          setEmailError(true);
          return;
        }
        alert(JSON.stringify(formData, null, 2));
        if (formData.password === formData.confirmPassword) {
          router.push('/'); // Replace with the desired route path
        } else {
          setConfirmPasswordError(true); // Set credentials error if Registration fails
        }
      }, 1000);
    }
    else {
      if (!formData.email) {
        setEmptyEmailError(true)
        return
      }
      if (!formData.password) {
        setEmptyPasswordError(true)
        return
      }
      if (!formData.confirmPassword) {
        setEmptyConfirmPasswordError(true)
        return
      }
    }
  };


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
        ...formData,
        [event.target.id]: event.target.value,
    });
  };

  const handleGoogleAuth = () => {
    alert('GOOGLE AUTH')
  }

  useEffect(() => {
    console.log(formData)
  }, [formData])

  return (
    <div className='w-full lg:max-w-lg px-12'>
    <Button 
      theme={googleButton} 
      color='google' 
      size='md' 
      className='mb-8'
      onClick={() => handleGoogleAuth()}
    >
      <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="32px" height="32px"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>
      <span className='pl-4 text-md sm:text-lg'>Continue with Google</span>
    </Button>
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
          color={(emailError || emptyEmailError) ? "failure" : undefined}
          helperText={
            (emailError && !emptyEmailError) ? (
              <>
                <span className="font-medium">Oops!</span> Not a valid email address!
              </>
            ) : emptyEmailError ? (
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
          color={(emptyPasswordError) ? "failure" : undefined}
          helperText={
            (emptyPasswordError) ? (
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
          color={(confirmPasswordError || emptyConfirmPasswordError) ? "failure" : undefined}
          helperText={
            (confirmPasswordError && !emptyConfirmPasswordError) ? (
              <>
                <span className="font-medium">Oops!</span> Password confirmation does not match!
              </>
            ) : emptyConfirmPasswordError ? (
              <>
                Enter password again to confirm.
              </>
            ) : undefined
          }
        />
      </div>
      <Button type="submit" onClick={(e) => handleSubmit(e)} theme={buttonTheme} color='primary' size='md' >Sign In</Button>
      <Label htmlFor="register" className='text-xs text-center' >
        <Link href='/login'>
          Already have an account?&nbsp;<span className='text-accent hover:text-accent/80'>Sign in</span>
        </Link>
      </Label>
    </form>
  </div>
  )
}
