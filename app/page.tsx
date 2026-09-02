'use client';

import { useEffect, useMemo, useState } from 'react';
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
  { key: 'days', label: 'jours' },
  { key: 'hours', label: 'heures' },
  { key: 'minutes', label: 'minutes' },
  { key: 'seconds', label: 'secondes' },
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
      "On compte les jours jusqu’à l’éclipse totale du 2 août 2027 à Louxor — viens voir le compte à rebours !",
    [],
  );

  async function shareSite() {
    const url = window.location.href;

    if (navigator.share) {
      await navigator.share({
        title: 'Sous l’ombre du Soleil — Louxor 2027',
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
      'PRODID:-//Louxor 2027//Eclipse totale//FR',
      'BEGIN:VEVENT',
      'UID:eclipse-louxor-2027@example.com',
      'DTSTAMP:20260902T170000Z',
      'DTSTART:20270802T100200Z',
      'DTEND:20270802T100900Z',
      'SUMMARY:Éclipse solaire totale — Louxor 2027',
      'LOCATION:Louxor\, Égypte',
      'DESCRIPTION:Totalité autour de 13:05 heure locale (EEST). Lunettes certifiées obligatoires hors totalité.',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');
    const blob = new Blob([calendar], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'eclipse-louxor-2027.ics';
    link.click();
    URL.revokeObjectURL(link.href);
  }

  return (
    <main className="site-shell">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />

      <nav className="topbar" aria-label="Navigation principale">
        <a className="brand" href="#top" aria-label="Retour en haut">
          <span className="brand-mark" aria-hidden="true">
            O
          </span>
          <span>Louxor · 2027</span>
        </a>
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={shareSite}
          className="share-button"
        >
          {copied ? <Check /> : <Share2 />}
          {copied ? 'Lien copié' : 'Partager'}
        </Button>
      </nav>

      <section id="top" className="hero" aria-labelledby="page-title">
        <div className="eyebrow">
          <Sparkles aria-hidden="true" />
          <span>Éclipse solaire totale</span>
        </div>

        <h1 id="page-title">
          Sous l’ombre
          <br />
          <em>du Soleil.</em>
        </h1>

        <p className="intro">
          Le 2 août 2027, le jour deviendra nuit au-dessus de Louxor. On se
          retrouve sous la totalité ?
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
            <MapPin aria-hidden="true" /> Louxor, Égypte
          </span>
          <span className="event-dot" aria-hidden="true" />
          <span>2 août 2027 · 13:05 EEST</span>
        </div>

        <div className="hero-actions">
          <Button
            type="button"
            size="lg"
            onClick={addToCalendar}
            className="calendar-button"
          >
            <CalendarPlus />
            Ajouter au calendrier
          </Button>
          <a className="discover-link" href="#details">
            Découvrir l’événement <ChevronDown aria-hidden="true" />
          </a>
        </div>
      </section>

      <figure className="eclipse-visual">
        <img
          src="/og.png"
          alt="Illustration de la totalité au-dessus de Louxor, avec la couronne solaire visible dans un ciel bleu nuit."
        />
        <figcaption>
          Louxor se trouve dans la bande de totalité — là où le Soleil sera
          entièrement masqué par la Lune.
        </figcaption>
      </figure>

      <section id="details" className="details" aria-labelledby="details-title">
        <div className="details-heading">
          <p className="section-number">01 — Le rendez-vous</p>
          <h2 id="details-title">
            Six minutes où
            <br />
            <em>tout s’arrête.</em>
          </h2>
        </div>

        <div className="fact-grid">
          <article className="fact-card featured-fact">
            <p className="fact-kicker">Totalité à Louxor</p>
            <p className="fact-number">6:22</p>
            <p className="fact-copy">
              Six minutes et vingt-deux secondes dans l’ombre de la Lune — un
              spectacle rarissime au cœur de l’Égypte.
            </p>
          </article>

          <article className="fact-card">
            <p className="fact-kicker">Maximum local</p>
            <p className="fact-number small">13:05</p>
            <p className="fact-copy">
              Heure locale à Louxor. L’éclipse partielle commencera vers 11:40
              et se terminera vers 14:26.
            </p>
          </article>

          <article className="fact-card safety-card">
            <p className="fact-kicker">À regarder en sécurité</p>
            <p className="safety-title">Les lunettes restent indispensables.</p>
            <p className="fact-copy">
              Ne regardez jamais le Soleil sans protection adaptée, sauf pendant
              la brève phase de totalité complète.
            </p>
          </article>
        </div>
      </section>

      <footer>
        <p>Un rendez-vous à partager avec ceux qui seront sous la même ombre.</p>
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={shareSite}
          className="share-button footer-share"
        >
          <Share2 /> Partager le compte à rebours
        </Button>
      </footer>
    </main>
  );
}
