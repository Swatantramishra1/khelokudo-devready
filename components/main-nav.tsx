import Link from "next/link";

export function MainNav() {
  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Link
        href="/dashboard"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Dashboard
      </Link>
      <Link
        href="/dashboard/polls"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Polls
      </Link>
      <Link
        href="/dashboard/matches"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Matches
      </Link>
      <Link
        href="/dashboard/leaderboard"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Leaderboard
      </Link>
    </nav>
  )
}