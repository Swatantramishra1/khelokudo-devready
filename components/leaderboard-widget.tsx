"use client"

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";

interface LeaderboardEntry {
  user_id: string;
  name: string;
  points: number;
}

export function LeaderboardWidget() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  async function fetchLeaderboard() {
    const { data, error } = await supabase
      .from('leaderboard')
      .select('*')
      .order('points', { ascending: false })
      .limit(5);

    if (error) {
      console.error('Error fetching leaderboard:', error);
    } else {
      setLeaderboard(data || []);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Players</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="space-y-2">
          {leaderboard.map((entry, index) => (
            <li key={entry.user_id} className="flex justify-between items-center">
              <span>{index + 1}. {entry.name}</span>
              <span>{entry.points} points</span>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}