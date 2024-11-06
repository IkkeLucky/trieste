import RegisterForm from '@/components/forms/RegisterForm';
import { getUser } from '@/lib/actions/clienti.actions';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import * as Sentry from '@sentry/nextjs'

const Register = async ({params: {userId}}: SearchParamProps) => {

  const user = await getUser(userId);

  Sentry.metrics.set("user_view_register", user.name);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
        
          <Image
            src="/assets/images/barbarablogo.jpg"
            height={1000}
            width={1000}
            alt="clienti"
            className="mb-12 h-10 w-fit"
          />
      
          <RegisterForm user={user} />

            <p className="copyright py-12">
            2024 BBGestore
            </p>
          
        </div>
      </section>

      <Image 
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="clienti"
        className="side-img max-w-[390px]"
      />
    </div>
  );
}

export default Register
