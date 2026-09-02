'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import {
  CalendarPlus,
  Check,
  ChevronDown,
  MapPin,
  Share2,
  Sparkles,
} from 'lucide-react';

import { Button } from '@/components/ui/button';

const TOTALITY_TARGET = Date.UTC(2027, 7, 2, 10, 5, 0);
const ASSET_PREFIX = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getCountdown(): Countdown {
  const distance = Math.max(0, TOTALITY_TARGET - Date.now());

  return {
    days: Math.floor(distance / 86_400_000),
    hours: Math.floor((distance / 3_600_000) % 24),
    minutes: Math.floor((distance / 60_000) % 60),
    seconds: Math.floor((distance / 1_000) % 60),
  };
}

const units: Array<{ key: keyof Countdown; label: string }> = [
  { key: 'days', label: 'days' },
  { key: 'hours', label: 'hours' },
  { key: 'minutes', label: 'minutes' },
  { key: 'seconds', label: 'seconds' },
];

export default function Home() {
  const [countdown, setCountdown] = useState<Countdown | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const update = () => setCountdown(getCountdown());
    update();
    const timer = window.setInterval(update, 1_000);
    return () => window.clearInterval(timer);
  }, []);

  const shareText = useMemo(
    () =>
      'We’re counting down to the total solar eclipse in Luxor on August 2, 2027 — come watch the clock with us!',
    [],
  );

  async function shareSite() {
    const url = window.location.href;

    if (navigator.share) {
      await navigator.share({
        title: 'In the Shadow of the Sun — Luxor 2027',
        text: shareText,
        url,
      });
      return;
    }

    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2_000);
  }

  function addToCalendar() {
    const calendar = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Luxor 2027//Total solar eclipse//EN',
      'BEGIN:VEVENT',
      'UID:eclipse-louxor-2027@example.com',
      'DTSTAMP:20260902T170000Z',
      'DTSTART:20270802T100200Z',
      'DTEND:20270802T100900Z',
      'SUMMARY:Total Solar Eclipse — Luxor 2027',
      'LOCATION:Luxor, Egypt',
      'DESCRIPTION:Totality around 1:05 PM local time (EEST). Certified eclipse glasses are required outside totality.',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');
    const blob = new Blob([calendar], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'luxor-eclipse-2027.ics';
    link.click();
    URL.revokeObjectURL(link.href);
  }

  return (
    <main className="site-shell">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />

      <nav className="topbar" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="Back to top">
          <span className="brand-mark" aria-hidden="true">
            O
          </span>
          <span>Luxor · 2027</span>
        </a>
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={shareSite}
          className="share-button"
        >
          {copied ? <Check /> : <Share2 />}
          {copied ? 'Link copied' : 'Share'}
        </Button>
      </nav>

      <section id="top" className="hero" aria-labelledby="page-title">
        <div className="eyebrow">
          <Sparkles aria-hidden="true" />
          <span>Total solar eclipse</span>
        </div>

        <h1 id="page-title">
          In the shadow
          <br />
          <em>of the Sun.</em>
        </h1>

        <p className="intro">
          On August 2, 2027, daylight will turn to darkness over Luxor. Shall we
          meet beneath the Moon’s shadow?
        </p>

        <div className="countdown" role="timer" aria-live="off">
          {units.map(({ key, label }) => (
            <div className="time-unit" key={key}>
              <span className="time-value">
                {countdown ? String(countdown[key]).padStart(2, '0') : '—'}
              </span>
              <span className="time-label">{label}</span>
            </div>
          ))}
        </div>

        <div className="event-line">
          <span>
            <MapPin aria-hidden="true" /> Luxor, Egypt
          </span>
          <span className="event-dot" aria-hidden="true" />
          <span>August 2, 2027 · 1:05 PM EEST</span>
        </div>

        <div className="hero-actions">
          <Button
            type="button"
            size="lg"
            onClick={addToCalendar}
            className="calendar-button"
          >
            <CalendarPlus />
            Add to calendar
          </Button>
          <a className="discover-link" href="#details">
            Explore the event <ChevronDown aria-hidden="true" />
          </a>
        </div>
      </section>

      <figure className="eclipse-visual">
        <Image
          src={`${ASSET_PREFIX}/og.png`}
          alt="Illustration of totality above Luxor, with the solar corona visible in a deep blue sky."
          width={1731}
          height={906}
          sizes="(max-width: 760px) calc(100vw - 2.3rem), 1120px"
          unoptimized
        />
        <figcaption>
          Luxor lies inside the path of totality — where the Moon will completely
          cover the Sun.
        </figcaption>
      </figure>

      <section id="details" className="details" aria-labelledby="details-title">
        <div className="details-heading">
          <p className="section-number">01 — The moment</p>
          <h2 id="details-title">
            Six minutes when
            <br />
            <em>everything stops.</em>
          </h2>
        </div>

        <div className="fact-grid">
          <article className="fact-card featured-fact">
            <p className="fact-kicker">Totality in Luxor</p>
            <p className="fact-number">6:22</p>
            <p className="fact-copy">
              Six minutes and twenty-two seconds in the Moon’s shadow — a rare
              celestial spectacle in the heart of Egypt.
            </p>
          </article>

          <article className="fact-card">
            <p className="fact-kicker">Local maximum</p>
            <p className="fact-number small">13:05</p>
            <p className="fact-copy">
              Local time in Luxor. The partial eclipse begins around 11:40 AM and
              ends around 2:26 PM.
            </p>
          </article>

          <article className="fact-card safety-card">
            <p className="fact-kicker">Watch safely</p>
            <p className="safety-title">Eclipse glasses are essential.</p>
            <p className="fact-copy">
              Never look directly at the Sun without proper eye protection,
              except during the brief phase of complete totality.
            </p>
          </article>
        </div>
      </section>

      <footer>
        <p>A moment to share with everyone standing beneath the same shadow.</p>
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={shareSite}
          className="share-button footer-share"
        >
          <Share2 /> Share the countdown
        </Button>
      </footer>
    </main>
  );
}
