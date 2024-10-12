"use client"

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuth } from '@clerk/nextjs';
import { supabase } from "@/lib/supabase";
import { useEffect } from 'react';

export default function Home() {
  const { isSignedIn, userId } = useAuth();
  const router = useRouter();
  console.log("pushing to dashboard", isSignedIn, userId);
  
  useEffect(() => {
    async function handleUser() {
      if (isSignedIn && userId) { // Ensure user is not undefined
        // const userName = user.fullName || "User Name"; // Use actual user data
        // await upsertUser(user.id, userName);

        console.log("pushing to dashboard", isSignedIn, userId);
        router.push('/dashboard'); 
      }
    }

    handleUser();
  }, [isSignedIn, userId, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <h1 className="text-4xl font-bold mb-8">Society Game Management</h1>
      <div className="space-x-4">
        <Button asChild>
          <Link href="/sign-up">Sign Up</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/sign-in">Sign In</Link>
        </Button>
      </div>
    </div>
  );
}

async function upsertUser(userId: string, userName: string) {
  // Check if the user already exists
  const { data: existingUser, error: fetchError } = await supabase
    .from('users')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (fetchError) {
    console.error('Error fetching user:', fetchError);
    return null;
  }

  // If the user does not exist, insert them
  if (!existingUser) {
    const { error: insertError } = await supabase
      .from('users')
      .insert([{ user_id: userId, name: userName }]);

    if (insertError) {
      console.error('Error inserting user:', insertError);
      return null;
    }
  }

  // Fetch the user again to ensure we have the latest data
  const { data: user, error: refetchError } = await supabase
    .from('users')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (refetchError) {
    console.error('Error refetching user:', refetchError);
    return null;
  }

  return user;
}
