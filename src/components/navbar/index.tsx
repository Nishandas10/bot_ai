import Image from 'next/image'
import * as React from 'react'
import Link from 'next/link'

function NavBar() {
  return (
    <div className="flex gap-5 justify-between items-center px-7 py-1 font-bold border-b border-solid border-zinc-100 leading-[154.5%] max-md:flex-wrap max-md:px-5">
      <div className="flex gap-1.5 justify-center self-stretch my-auto text-2xl tracking-tighter text-neutral-700">
        {/* <Image
          src="/images/logo.png"
          alt="LOGO"
          sizes="100vw"
          style={{
            width: '100px',
            height: 'auto',
          }}
          width={0}
          height={0}
        /> */}
         <div className="text-2xl font-bold">
          Nalla AI
        </div>
      </div>
      <ul className="gap-5 justify-between self-stretch my-auto text-sm leading-5 text-neutral-700 max-md:flex-wrap max-md:max-w-full font-normal hidden md:flex">
        <li>
          <Link href="https://docs.google.com/forms/d/e/1FAIpQLSdXfnsSdK4NgDRwJQSOMALYgW07AVXqS0vho-UNGuwRYI9sQg/viewform?usp=sf_link">
            Bugs Feedback Form
          </Link>
        </li>
      </ul>
      <Link
        href="/dashboard"
        className="bg-orange px-4 py-2 rounded-sm text-white"
      >
        Use Krna Hota Hai
      </Link>
    </div>
  )
}

export default NavBar