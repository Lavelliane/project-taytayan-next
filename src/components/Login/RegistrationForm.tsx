'use client'

import React, { useState, useEffect, ChangeEvent, MouseEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FieldValue, FieldValues, useForm } from 'react-hook-form'
import { Button, Label, TextInput } from 'flowbite-react';
import { HiMail, HiLockClosed } from 'react-icons/hi';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useAuthStore } from '@/hooks/useAuth';
import SignUpSchema from '@/schemas/SignUpSchema';
import { z, ZodError } from 'zod';
import { GoogleButton } from './GoogleButton';
import { zodResolver } from '@hookform/resolvers/zod';


const buttonTheme = {
  color: {
    primary: 'bg-tertiary hover:bg-primary text-white py-2',
  },
};

// TODO: USE REACT-HOOK-FORM AND ZOD TO IMPROVE FORM VALIDATION

type SignupSchema = z.infer<typeof SignUpSchema>

export const RegistrationForm = () => {
  const { 
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignupSchema>({
    resolver: zodResolver(SignUpSchema)
  })
  const router = useRouter();
  const signUp = useAuthStore((state) => state.signUp)
  const user = useAuthStore((state) => state.user)

  const onSubmit = async (data: FieldValues) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const validatedCredentials = SignUpSchema.parse(data)
      const { email: vEmail, password: vPassword, confirmPassword: vConfirmPassword, lastName: vLastName, firstName: vFirstName } = validatedCredentials
      signUp(vEmail, vPassword, vConfirmPassword, vFirstName, vLastName)
      router.push('/')
      reset()
    } catch (error) {
      if (error instanceof ZodError) {
        console.error('Validation error:', error.issues);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  }

  const buttonTest = () => {
    console.log(errors)
  }

  return (
    <div className='w-full px-12'>
    <GoogleButton />
    <h5 className='text-sm font-light text-gray-500 my-4 text-center'>- OR -</h5>
    <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className='flex gap-4'>
        <div className="block">
          <Label htmlFor="firstName" value="First Name" className='text-md mb-2 block' />
          <TextInput
            {...register('firstName', {
              required: "First name cannot be empty.",
            })}
            id="firstName"
            type="text"
            placeholder="Juan"
            sizing="md"
            color={(errors.firstName) ? "failure" : undefined}
          />
        </div>
        <div className="block">
          <Label htmlFor="lastName" value="Last Name" className='text-md mb-2 block' />
          <TextInput
            {...register('lastName', {
              required: "Last name cannot be empty.",
            })}
            id="lastName"
            type="text"
            placeholder="De La Cruz"
            sizing="md"
            color={(errors.lastName) ? "failure" : undefined}
          />
        </div>
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email" value="Email" className='text-md' />
        </div>
        <TextInput
          {...register('email', {
            required: "Email address cannot be empty."
          })}
          id="email"
          type="email"
          placeholder="name@mail.com"
          icon={HiMail}
          sizing="md"
          color={(errors.email) ? "failure" : undefined}
          helperText={
            (errors.email?.type === 'invalid_string') ? (
              <>
                <span className="font-medium">Oops!</span> {errors.email.message}
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
          {...register('password', {
            required: "Password cannot be empty.",
            minLength: {
              value: 1,
              message: "Password must be atleast 1 characters."
            }
          })}
          id="password" 
          type="password" 
          placeholder='* * * * *' 
          icon={HiLockClosed}
          sizing='md'
          color={(errors.password) ? "failure" : undefined}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="confirmPassword" value="Confirm Password" className='text-md' />
        </div>
        <TextInput 
          {...register('confirmPassword', {
            required: "Confirm your password."
          })}
          id="confirmPassword" 
          type="password" 
          placeholder='* * * * *' 
          icon={HiLockClosed}
          sizing='md'
          color={(errors.confirmPassword) ? "failure" : undefined}
          helperText={
            ((errors.confirmPassword?.type === 'too_small') && !errors.password) ? (
              <>
                {errors.confirmPassword?.message}
              </>
            ) : (errors.confirmPassword?.type === 'custom') ? (
              <>
                <span className="font-medium">Oops!</span> {errors.confirmPassword.message}
              </>
            ) : undefined
          }        
        />
      </div>
      <Button type="submit" theme={buttonTheme} color='primary' size='md' disabled={isSubmitting} onClick={() => buttonTest()} >Sign Up</Button>
      <Label htmlFor="register" className='text-xs text-center' >
        <Link href='/login'>
          Already have an account?&nbsp;<span className='text-accent hover:text-accent/80'>Sign in</span>
        </Link>
      </Label>
    </form>
  </div>
  )
}
