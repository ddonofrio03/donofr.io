import Link from "next/link";
import { getSortedPostsMetadata } from "@/lib/posts";

const team = [
  { name: "David D'Onofrio", role: "Lead Talker", image: "/images/david.jpg", bio: "Dave has spent decades in high-pressure conversations with millions of dollars on the line. He helps clients shape the message and move tough discussions in the right direction." },
  { name: "Bill D'Onofrio", role: "Lead Listener", image: "/images/bill.jpg", bio: "Bill brings decades of experience leading teams and finding the path that fits a client's needs, budget, and goals." },
  { name: "Ryan D'Onofrio", role: "Lead Creative", image: "/images/ryan.jpg", bio: "Ryan combines AI engineering, creative thinking, and technical problem-solving to help clients find smart solutions and move ideas forward." },
  { name: "Melissa Chelius", role: "Lead Marketer", image: "/images/missy.jpg", bio: "Melissa knows how to get the right message in front of the right people. She helps clients build awareness and turn attention into action." },
  { name: "Alex Chelius", role: "Lead Strategist", image: "/images/alex.jpg", bio: "Alex works across teams to keep projects moving and ideas sharp. He helps turn plans into clear, steady progress." },
  { name: "Allison Triefler", role: "Lead Analyst", image: "/images/alli.jpg", bio: "Allison turns data into clear direction. She helps clients understand what's working, what's not, and what to do next." },
  { name: "Nick Triefler", role: "Lead Sales", image: "/images/nick.jpg", bio: "Nick builds relationships and gets deals across the finish line. He helps clients connect, close, and grow." },
  { name: "TJ D'Onofrio", role: "Lead Coordinator", image: "/images/tj.jpg", bio: "TJ keeps everything organized and on track. He makes sure the details are handled so nothing slips through." },
  { name: "Ducky D'Onofrio", role: "Lead Connector", image: "/images/ducky.png", bio: "Ducky brings out the best in people. She asks the right questions, listens deeply, and helps others open up in a real and meaningful way." },
];

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default function Home() {
  const posts = getSortedPostsMetadata().slice(0, 2);

  return (
    <main>
      {/* HERO */}
      <section className="hero">
        <div className="hero-media" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="hero-fallback" src="/images/meeting.jpg" alt="" />
          <video className="hero-video-native" autoPlay muted loop playsInline preload="auto">
            <source src="/DataFlow.mp4" type="video/mp4" />
          </video>
          <div className="hero-overlay"></div>
        </div>

        <div className="container hero-inner">
          <div className="hero-content">
            <div className="hero-eyebrow">Create. Amaze. Inspire.</div>
            <div className="hero-rule"></div>
            <p className="hero-subtext">
              We&apos;re the D&apos;Onofrio&apos;s — a family of builders, problem-solvers, and straight shooters.
            </p>
            <a className="hero-button" href="#about">Learn More About Who We Are</a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about">
        <div className="container split">
          <div>
            <div className="eyebrow">What makes us unique?</div>
            <h2>Communication should make sense to real people.</h2>
            <p className="lead">
              Some families argue about holidays. We argue about strategy, messaging, analytics,
              and how to improve customer experience. And honestly, it works.
            </p>
            <div className="panel">
              <ul className="list">
                <li><span className="dot"></span><span>AI and technical thinking grounded in real-world use.</span></li>
                <li><span className="dot"></span><span>Sales experience rooted in actual customer conversations.</span></li>
                <li><span className="dot"></span><span>Marketing that respects your audience instead of talking over them.</span></li>
                <li><span className="dot"></span><span>Public affairs and communications experience built in high-pressure situations.</span></li>
              </ul>
            </div>
          </div>
          <div className="card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/conversation.jpg" alt="conversation" />
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow">Let&apos;s work together</div>
              <h2>A little bit about what we bring to the table</h2>
            </div>
            <p>
              Your customers are more sophisticated than ever. They expect personalized experiences,
              authentic communication, and solutions that actually work. We help businesses talk and
              function like humans again.
            </p>
          </div>

          <div className="grid grid-3">
            <article className="card">
              <div className="service-media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/AI-Infrastructure.jpg" alt="AI solutions" />
              </div>
              <div className="card-body">
                <div className="kicker">Code &amp; AI-driven solutions</div>
                <h3>Technical thinking that solves real problems</h3>
                <p>We bring engineering-minded thinking into business problems that usually get stuck between the technical team and the real world.</p>
              </div>
            </article>

            <article className="card">
              <div className="service-media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/meeting.jpg" alt="Message and community" />
              </div>
              <div className="card-body">
                <div className="kicker">Connecting your message</div>
                <h3>Clear communication for people on the other side of the table</h3>
                <p>Customers, voters, community members, and decision-makers all hear things differently. We help you say it clearly and credibly.</p>
              </div>
            </article>

            <article className="card">
              <div className="service-media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/service-marketing.jpg" alt="Media and marketing leadership" />
              </div>
              <div className="card-body">
                <div className="kicker">Media &amp; marketing leadership</div>
                <h3>Smart strategy without the fluff</h3>
                <p>We combine media, marketing, outreach, and positioning so your business is easier to understand and easier to trust.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* DIFFERENTIATORS */}
      <section>
        <div className="container split">
          <div className="panel">
            <div className="eyebrow">Disconnection = inefficiency</div>
            <h2>We solve the disconnect between businesses and the people they need to reach.</h2>
            <p>
              With expertise spanning AI, sales, marketing, and public affairs, we help you understand
              what your customers truly need and deliver it in ways that build loyalty and drive growth.
            </p>
          </div>
          <div className="panel">
            <div className="eyebrow">Always be different</div>
            <h2>A lot of companies offer one skill. We offer many.</h2>
            <ul className="list">
              <li><span className="dot"></span><span>Sales expertise grounded in real conversations</span></li>
              <li><span className="dot"></span><span>Marketing that respects your audience</span></li>
              <li><span className="dot"></span><span>Technology that enhances human connection</span></li>
              <li><span className="dot"></span><span>Public affairs that builds relationships instead of battles</span></li>
            </ul>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="team-section" id="team">
        <div className="team-wrap">
          <h2 className="team-title">Our Team</h2>
          <div className="team-grid">
            {team.map((member) => (
              <article className="team-card" key={member.name}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={member.image} alt={member.name} className="team-photo" />
                <h3>{member.name}</h3>
                <p className="team-role">{member.role}</p>
                <p>{member.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG PREVIEW */}
      <section id="thoughts">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow">From the blog</div>
              <h2>Latest news</h2>
            </div>
            <p>Perspectives on AI, marketing, sales, and public affairs from the D&apos;Onofrio family.</p>
          </div>

          {posts.length > 0 && (
            <div className="grid grid-2">
              {posts.map((post) => (
                <Link href={`/thoughts/${post.slug}`} key={post.slug} className="card" style={{ display: "block", padding: "22px" }}>
                  <div className="kicker">{formatDate(post.date)}</div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                </Link>
              ))}
            </div>
          )}

          <div className="actions center-actions" style={{ marginTop: "24px" }}>
            <Link className="btn secondary" href="/thoughts">View all posts</Link>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="container">
          <div className="cta">
            <div className="section-head">
              <div>
                <div className="eyebrow">Let&apos;s connect</div>
                <h2>Ready to start?</h2>
              </div>
              <p>
                Four decades of combined expertise in AI, sales, marketing, and public affairs.
                We bridge the gap between your business and the customers who matter most.
              </p>
            </div>

            <div className="grid grid-2">
              <div className="panel">
                <h3>Locations</h3>
                <p>
                  North Jersey/New York City<br />
                  Northern Virginia/Washington DC<br />
                  Sacramento/San Francisco, CA<br />
                  Grand Strand, SC
                </p>
              </div>
              <div className="panel">
                <h3>Contact</h3>
                <p>
                  <a href="tel:7039816034">703-981-6034</a><br />
                  <a href="mailto:dave@donofr.io">dave@donofr.io</a>
                </p>
                <div className="actions">
                  <a className="btn" href="mailto:dave@donofr.io">Email Dave</a>
                  <a className="btn secondary" href="tel:7039816034">Call</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
