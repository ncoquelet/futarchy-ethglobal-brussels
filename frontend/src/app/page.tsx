"use client";
import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <h1>List of goals</h1>
      <h2><Link href="/goal-overview">goal 1</Link></h2>
      <h2><Link href="/goal-overview">goal 2</Link></h2>
      <h2><Link href="/goal-overview">goal 3</Link></h2>
    </main>
  );
}
