/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

type UserRedirectProps = {
  user: any; // Replace 'any' with the appropriate user type if available
};

const UserRedirect = ({ user }: UserRedirectProps) => {
  const router = useRouter();

  useEffect(() => {
    if (user) {
      // Clear cache on login
      localStorage.clear(); // or sessionStorage.clear();
      router.push('/'); // Redirect to homepage
    }
  }, [user, router]);

  return null; // This component does not render anything
};

export default UserRedirect; 