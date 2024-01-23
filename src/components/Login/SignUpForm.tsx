'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FieldValues, useForm } from 'react-hook-form'
import { Button, Label, TextInput } from 'flowbite-react';
import { HiMail, HiLockClosed, HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import { useAuthStore } from '@/hooks/useAuth';
import SignUpSchema from '@/schemas/SignUpSchema';
import { z, ZodError } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { GoogleButton } from './GoogleButton';


const signUpBtnTheme = {
  color: {
    primary: 'bg-tertiary hover:bg-primary text-white py-2',
  },
};

const showPasswordBtnTheme = {
  size: {
    xs: 'p-0'
  }
}

const passwordInputTheme = {
  field: {
    input: {
      withAddon: {
        off: 'rounded-l-lg'
      }
    }
  }
}

type SignupSchemaType = z.infer<typeof SignUpSchema>

export const SignUpForm = () => {
  const { 
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignupSchemaType>({
    resolver: zodResolver(SignUpSchema),
    mode: 'onChange'
  })
  const router = useRouter();
  const signUp = useAuthStore((state) => state.signUp)
  const user = useAuthStore((state) => state.user)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

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

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword)
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
            {...register('firstName')}
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
            {...register('lastName')}
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
          {...register('email')}
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
        <div className='flex-col'>
          <div className='flex'>
            <TextInput 
              {...register('password')}
              id="password" 
              type={(!showPassword) ? 'password' : 'text'}
              placeholder='* * * * *' 
              className='w-full'
              theme={passwordInputTheme}
              icon={HiLockClosed}
              sizing='md'
              color={(errors.password) ? "failure" : undefined}
            />
            <Button
              className='border-gray-300 bg-gray-100 rounded-l-none border-l-0 focus:ring-0 p-2 z-10'
              onClick={() => handleShowPassword()}
              outline
              color='gray'
              size='xs'
              theme={showPasswordBtnTheme}
            >
              {(!showPassword) ? 
                <HiOutlineEye className='h-5 w-5 p-0 bg-gray-100'/> 
                :
                <HiOutlineEyeOff className='h-5 w-5 p-0 bg-gray-100'/>
                }
            </Button>
          </div>
          {
            (errors.password?.type === 'too_small' && !errors.email?.type) ? (
              <p className='mt-2 text-sm text-red-600 dark:text-red-500'>
                {errors.password.message}
              </p>
            ) : undefined
          }
        </div>
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="confirmPassword" value="Confirm Password" className='text-md' />
        </div>
        <div className='flex-col'>
          <div className='flex'>
            <TextInput 
              {...register('confirmPassword')}
              id="confirmPassword" 
              type={(!showConfirmPassword) ? 'password' : 'text'}
              placeholder='* * * * *' 
              className='w-full'
              theme={passwordInputTheme}
              icon={HiLockClosed}
              sizing='md'
              color={(errors.confirmPassword) ? "failure" : undefined}
            />
            <Button
              className='border-gray-300 bg-gray-100 rounded-l-none border-l-0 focus:ring-0 p-2 z-10'
              onClick={() => handleShowConfirmPassword()}
              outline
              color='gray'
              size='xs'
              theme={showPasswordBtnTheme}
            >
              {(!showConfirmPassword) ? 
                <HiOutlineEye className='h-5 w-5 p-0 bg-gray-100'/> 
                :
                <HiOutlineEyeOff className='h-5 w-5 p-0 bg-gray-100'/>
                }
            </Button>
          </div>
          {
            ((errors.confirmPassword?.type === 'too_small') && !errors.password) ? (
              <>
                {errors.confirmPassword?.message}
              </>
            ) : (errors.confirmPassword?.type === 'custom' && !errors.email && !errors.password) ? (
              <>
                <span className="font-medium">Oops!</span> {errors.confirmPassword.message}
              </> 
            ) : undefined
          } 
        </div>
      </div>
      <Button type="submit" theme={signUpBtnTheme} color='primary' size='md' disabled={isSubmitting} onClick={() => buttonTest()} >Sign Up</Button>
      <Label htmlFor="register" className='text-xs text-center' >
        <Link href='/login'>
          Already have an account?&nbsp;<span className='text-accent hover:text-accent/80'>Sign in</span>
        </Link>
      </Label>
    </form>
  </div>
  )
}
