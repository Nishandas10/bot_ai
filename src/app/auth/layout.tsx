import { currentUser } from '@clerk/nextjs';
import UserRedirect from './UserRedirect';
import Image from 'next/image'
import React from 'react'

type Props = {
  children: React.ReactNode
}

const Layout = async ({ children }: Props) => {
  const user = await currentUser();

  return (
    <div className="h-screen flex w-full justify-center">
      <UserRedirect user={user} />
      <div className="w-[600px] ld:w-full flex flex-col items-start p-6">
        <div className="text-2xl font-bold">
          <a href="/" className="text-inherit">
            Nalla AI
          </a>
        </div>
        {children}
      </div>
      <div className="hidden lg:flex flex-1 w-full max-h-full max-w-4000px overflow-hidden relative bg-cream flex-col pt-10 pl-24 gap-3">
        <h2 className="text-gravel md:text-4xl font-bold">
          Hi, I’m your AI powered sales assistant,
          Nalla AI
        </h2>
        <p className="text-iridium md:text-sm mb-10">
          Nalla AI is capable of capturing lead information without a form...{' '}
          <br />
          something never done before 😉
        </p>
        <Image
          src="/images/animal.png"
          alt="app image"
          loading="lazy"
          sizes="100vw"
          className="absolute shrink-0 w-full h-auto top-48"
          width={360}
          height={700}
          style={{
            maxWidth: '360px',
            maxHeight: '700px',
          }}
        />
      </div>
    </div>
  )
}

export default Layout