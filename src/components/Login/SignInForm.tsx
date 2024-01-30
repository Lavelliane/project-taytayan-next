'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FieldValues, useForm } from 'react-hook-form'
import { z, ZodError } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import SignInSchema from '@/schemas/SignInSchema';
import {
  Button,
  Checkbox,
  CustomFlowbiteTheme,
  Label,
  TextInput,
} from 'flowbite-react';
import { HiMail, HiLockClosed, HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import { useAuthStore } from '@/hooks/useAuth';
import { GoogleButton } from './GoogleButton';

const signInBtnTheme: CustomFlowbiteTheme['button'] = {
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

type SignInSchemaType = z.infer<typeof SignInSchema>

export const SignInForm = () => {
  const { 
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      rememberMe: false
    }
  })
  const router = useRouter();
  const signIn = useAuthStore((state) => state.signIn)
  const [showPassword, setShowPassword] = useState(false)


  // TODO: HANDLER FOR FIREBASE AUTH INVALID CREDENTIALS AND REMEMBER ME
  const onSubmit = async (data: FieldValues) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const validatedCredentials = SignInSchema.parse(data)
      const { email: vEmail, password: vPassword, rememberMe: vRememberMe} = validatedCredentials
      signIn(vEmail, vPassword)
      router.push('/dashboard')
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

  const buttonTest = () => {
    console.log(errors)
  }

  return (
    <div className='w-full px-12'>
    <GoogleButton />
    <h5 className='text-sm font-light text-gray-500 my-4 text-center'>- OR -</h5>
    <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
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
                <HiOutlineEyeOff className='h-5 w-5 p-0 bg-gray-100'/> 
                :
                <HiOutlineEye className='h-5 w-5 p-0 bg-gray-100'/>
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
      <div className='flex justify-between'>
        <div className="flex items-center gap-2 ">
          <Checkbox 
            {...register('rememberMe')}
            id="remember" 
            color='blue' />
          <Label htmlFor="remember" className='text-xs' >Remember me</Label>
        </div>
        <Label htmlFor="forgot" className='text-xs text-blue-700 hover:text-tertiary' >
          <Link href='/'>
            Forgot your password?
          </Link>
        </Label>
      </div>
      <Button type="submit" theme={signInBtnTheme} color='primary' size='md' disabled={isSubmitting} onClick={() => buttonTest()} >Sign In</Button>
      <Label htmlFor="register" className='text-xs text-center' >
        <Link href='/new-account'>
          Not registered?&nbsp;<span className='text-accent hover:text-accent/80'>Create account</span>
        </Link>
      </Label>
    </form>
  </div>
  )
}
