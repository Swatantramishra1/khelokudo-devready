import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { PollList } from "@/components/poll-list";
import { LeaderboardWidget } from "@/components/leaderboard-widget";

export default async function DashboardPage() {
  const { userId } = auth();

  console.log(userId, "userId");
  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div>
        <h2 className="text-2xl font-bold mb-4">Active Polls</h2>
        <PollList />
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
        <LeaderboardWidget />
      </div>
    </div>
  );
}