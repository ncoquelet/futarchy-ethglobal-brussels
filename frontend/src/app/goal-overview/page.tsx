"use client";
import Link from 'next/link'

export default function Goal() {
  return (
    <div style={{margin: '2rem'}}>
      <h1>Goal Overview with proposal timeline</h1>

      <h2 style={{marginBottom: '2rem'}}>Goal description</h2>
      <h2 style={{marginBottom: '2rem'}} >Proposal sequence + states:</h2>

      <div>
        <div>
          <Link href="/proposal">
            <div>
              Proposal 1 Lorem Ipsum foobar blabla (active)
            </div>
            <div>
              30% YES / 60% NO
            </div>
            <div>
              state: REJECTED
            </div>
          </Link>
        </div>
        <div style={{ height: '2rem', width: '2px', backgroundColor: 'black' }}></div>
      </div>

      <div style={{ opacity: '50%'}}>
        <div>
          <Link href="/proposal">
            <div>
              Proposal 2 Lorem Ipsum foobar blabla (active)
            </div>
            <div>
              80% YES / 20% NO
            </div>
            <div>
              state: 2 days left
            </div>
          </Link>
        </div>
        <div style={{ height: '2rem', width: '2px', backgroundColor: 'black' }}></div>
      </div>

      <div>
        <div>
          <Link href="/proposal">
            <div>
              Proposal 1 Lorem Ipsum foobar blabla (active)
            </div>
            <div>
              30% YES / 60% NO
            </div>
            <div>
              state: REJECTED
            </div>
          </Link>
        </div>
        <div style={{ height: '2rem', width: '2px', backgroundColor: 'black' }}></div>
      </div>
    </div>
  );
}
