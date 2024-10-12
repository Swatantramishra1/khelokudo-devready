"use client"

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

interface Poll {
  id: number;
  name: string;
  game: string;
  date: string;
  time: string;
}

export function PollList() {
  const [polls, setPolls] = useState<Poll[]>([]);

  useEffect(() => {
    fetchPolls();
  }, []);

  async function fetchPolls() {
    const { data, error } = await supabase
      .from('polls')
      .select('*')
      .order('date', { ascending: true });

    if (error) {
      console.error('Error fetching polls:', error);
    } else {
      setPolls(data || []);
    }
  }

  async function handleVote(pollId: number) {
    // Implement voting logic here
    console.log('Voted for poll:', pollId);
  }

  return (
    <div className="space-y-4">
      {polls.map((poll) => (
        <Card key={poll.id}>
          <CardHeader>
            <CardTitle>{poll.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Game: {poll.game}</p>
            <p>Date: {poll.date}</p>
            <p>Time: {poll.time}</p>
            <Button onClick={() => handleVote(poll.id)} className="mt-2">Vote</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}