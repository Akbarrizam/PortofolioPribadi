import { useEffect, useState, useRef } from 'react';
import { personalInfo } from '../data/portfolioData';
import { useLanguage } from '../contexts/LanguageContext';

// ====== TYPING TEXT ======
const roles = ['Full-Stack Developer', 'React Developer', 'Laravel Developer', 'Flutter Developer', 'UI/UX Enthusiast'];

function TypingText() {
  const [displayText, setDisplayText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timer;

    if (!isDeleting) {
      if (displayText !== current) {
        timer = setTimeout(() => {
          setDisplayText(current.slice(0, displayText.length + 1));
        }, 80);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 1800);
      }
    } else {
      if (displayText !== '') {
        timer = setTimeout(() => {
          setDisplayText(current.slice(0, displayText.length - 1));
        }, 50);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <span className="typing-cursor" style={{ color: '#6366F1', fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif" }}>
      {displayText || '\u00a0'}
    </span>
  );
}

// ====== ANIMATED COUNTER ======
function AnimatedCounter({ target, suffix = '', label }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated.current) {
        animated.current = true;
        const num = parseFloat(target);
        const duration = 1500;
        const steps = 40;
        const increment = num / steps;
        let cur = 0;
        const timer = setInterval(() => {
          cur = Math.min(cur + increment, num);
          setCount(Number.isInteger(num) ? Math.round(cur) : cur.toFixed(1));
          if (cur >= num) clearInterval(timer);
        }, duration / steps);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} style={{
      padding: '16px 20px', borderRadius: '14px',
      background: 'var(--bg-primary)',
      border: '1px solid var(--border-primary)',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      textAlign: 'center', minWidth: '90px',
      transition: 'all 0.3s',
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(99,102,241,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-primary)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)'; e.currentTarget.style.transform = 'translateY(0)'; }}
    >
      <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1 }}>
        {count}{suffix}
      </div>
      <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 500 }}>
        {label}
      </div>
    </div>
  );
}

// ====== NAMECARD ======
function Namecard({ visible }) {
  const [hovered, setHovered] = useState(false);
  const { lang, t } = useLanguage();

  return (
    <div
      className={`relative transition-all duration-1000 delay-300 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'}`}
      style={{ perspective: '1200px' }}
    >
      <div
        className="animate-float"
        style={{ animationDuration: '7s' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Decorative rings */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 0 }}>
          <div className="rounded-full photo-ring-outer" style={{
            width: '390px', height: '390px', position: 'absolute',
            border: '1px dashed rgba(99,102,241,0.25)',
          }} />
          <div className="rounded-full photo-ring-inner" style={{
            width: '440px', height: '440px', position: 'absolute',
            border: '1px solid rgba(14,165,233,0.15)',
          }} />
        </div>

        {/* Main Namecard */}
        <div
          className="relative namecard-light scanline-effect"
          style={{
            width: '340px', borderRadius: '28px',
            background: 'linear-gradient(145deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)',
            border: '1px solid var(--border-primary)',
            transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            transform: hovered ? 'rotateY(-4deg) rotateX(2deg) scale(1.02)' : 'rotateY(0) rotateX(0) scale(1)',
            overflow: 'hidden',
          }}
        >
          {/* Top gradient stripe */}
          <div style={{ height: '3px', background: 'linear-gradient(90deg, #0EA5E9, #6366F1, #8B5CF6)' }} />

          {/* Grid pattern */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
            pointerEvents: 'none',
          }} />

          {/* Top glow */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '180px',
            background: 'radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          {/* Card content */}
          <div style={{ padding: '36px 36px 28px', position: 'relative' }}>
            {/* Status badge */}
            <div className="inline-flex items-center gap-2 mb-6" style={{
              padding: '6px 14px', borderRadius: '99px',
              background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)',
            }}>
              <span style={{
                width: '6px', height: '6px', borderRadius: '50%',
                background: '#10B981', boxShadow: '0 0 8px rgba(16,185,129,0.6)',
                animation: 'glowPulse 2s ease-in-out infinite', display: 'inline-block',
              }} />
              <span style={{ fontSize: '11px', color: '#059669', letterSpacing: '0.04em', textTransform: 'uppercase', fontWeight: 600 }}>
                {t('hero.available')}
              </span>
            </div>

            {/* Photo */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div style={{
                  position: 'absolute', inset: '-5px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #0EA5E9, #6366F1, #8B5CF6)',
                  padding: '2px',
                }}>
                  <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'var(--bg-primary)' }} />
                </div>
                <img
                  src="/avatar.png"
                  alt={personalInfo.name}
                  style={{
                    width: '108px', height: '108px', borderRadius: '50%',
                    objectFit: 'cover', position: 'relative', zIndex: 1,
                    border: '4px solid var(--bg-primary)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                  }}
                  onError={e => {
                    e.target.style.display = 'none';
                    e.target.parentElement.style.width = '108px';
                    e.target.parentElement.style.height = '108px';
                    e.target.parentElement.style.background = 'linear-gradient(135deg, #0EA5E9, #6366F1)';
                    e.target.parentElement.borderRadius = '50%';
                    e.target.parentElement.style.display = 'flex';
                    e.target.parentElement.style.alignItems = 'center';
                    e.target.parentElement.style.justifyContent = 'center';
                    e.target.parentElement.innerHTML = '<span style="font-size:38px;font-weight:800;color:white;font-family:Space Grotesk,sans-serif">W</span>';
                  }}
                />
              </div>
            </div>

            {/* Name */}
            <div className="text-center mb-6">
              <h3 style={{ fontSize: '21px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                {personalInfo.name}
              </h3>
              <p style={{ fontSize: '13px', color: '#6366F1', fontWeight: 600, marginTop: '4px', letterSpacing: '0.03em' }}>
                Full-Stack Developer
              </p>
            </div>

            {/* Divider */}
            <div style={{ height: '1px', background: 'var(--border-primary)', marginBottom: '20px' }} />

            {/* Info rows */}
            {[
              { icon: '🎓', label: personalInfo.university.split(' (')[0], sub: lang === 'en' ? 'Informatics Engineering' : personalInfo.major },
              { icon: '📍', label: 'Surabaya, Indonesia', sub: null },
              { icon: '💻', label: 'React · Laravel · Flutter', sub: lang === 'en' ? 'Full-Stack & Mobile' : 'Full-Stack & Mobile' },
            ].map(({ icon, label, sub }) => (
              <div key={label} className="flex items-start gap-3 mb-4">
                <span style={{ fontSize: '14px', marginTop: '1px', flexShrink: 0 }}>{icon}</span>
                <div>
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 500, lineHeight: 1.3 }}>{label}</p>
                  {sub && <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '1px' }}>{sub}</p>}
                </div>
              </div>
            ))}

            {/* Divider */}
            <div style={{ height: '1px', background: 'var(--border-primary)', margin: '20px 0' }} />

            {/* Social links */}
            <div className="flex justify-center gap-3">
              {[
                { href: personalInfo.linkedin, label: 'LinkedIn', icon: 'in', color: '#0077B5' },
                { href: personalInfo.github, label: 'GitHub', icon: '⌥', color: '#24292F' },
                { href: `mailto:${personalInfo.email}`, label: 'Email', icon: '@', color: '#6366F1' },
              ].map(({ href, label, icon, color }) => (
                <a
                  key={label} href={href} target="_blank" rel="noopener noreferrer"
                  title={label}
                  style={{
                    width: '42px', height: '42px', borderRadius: '12px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: `${color}10`, border: `1px solid ${color}20`,
                    fontSize: '13px', fontWeight: 700, color,
                    textDecoration: 'none', transition: 'all 0.25s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${color}20`; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 4px 12px ${color}25`; }}
                  onMouseLeave={e => { e.currentTarget.style.background = `${color}10`; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ====== HERO SECTION ======
export default function Hero() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="hero" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      padding: '80px 0 60px', position: 'relative', overflow: 'hidden',
    }}>
      {/* Dot grid background */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(rgba(99,102,241,0.12) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,0.5) 0%, transparent 75%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,0.5) 0%, transparent 75%)',
      }} />

      <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 24px', width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '64px', alignItems: 'center' }}>

          {/* === LEFT: Text Content === */}
          <div>
            {/* Available badge */}
            <div
              className={`inline-flex items-center gap-2 mb-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{
                padding: '8px 16px', borderRadius: '99px',
                background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)',
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', animation: 'glowPulse 2s ease-in-out infinite', boxShadow: '0 0 8px rgba(16,185,129,0.6)', display: 'inline-block' }} />
              <span style={{ fontSize: '12px', color: '#059669', fontWeight: 600, letterSpacing: '0.06em' }}>
                {t('hero.available')}
              </span>
            </div>

            {/* Greeting + Name */}
            <div className={`transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <p style={{ fontSize: '18px', color: 'var(--text-muted)', fontWeight: 500, marginBottom: '8px' }}>
                {t('hero.greeting')}
              </p>
              <h1 style={{
                fontSize: 'clamp(40px, 6vw, 68px)', fontWeight: 900,
                color: 'var(--text-primary)', letterSpacing: '-0.04em', lineHeight: 1.1,
                fontFamily: "'Space Grotesk', sans-serif", marginBottom: '12px',
              }}>
                {personalInfo.name}
              </h1>
            </div>

            {/* Role typing */}
            <div className={`transition-all duration-700 delay-150 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ fontSize: 'clamp(18px, 3vw, 26px)', marginBottom: '24px', color: 'var(--text-secondary)' }}>
              {t('hero.rolePrefix')}<TypingText />
            </div>

            {/* Description */}
            <p className={`transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: '480px', marginBottom: '32px' }}>
              {t('hero.description')}
            </p>

            {/* Stats Row */}
            <div className={`flex flex-wrap gap-3 mb-10 transition-all duration-700 delay-[350ms] ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <AnimatedCounter target="2" suffix="+" label={t('hero.stats.exp')} />
              <AnimatedCounter target="10" suffix="+" label={t('hero.stats.projects')} />
              <AnimatedCounter target="5" suffix="+" label={t('hero.stats.clients')} />
            </div>

            {/* CTA Buttons */}
            <div className={`flex flex-wrap gap-3 transition-all duration-700 delay-[400ms] ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <a
                href={personalInfo.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '14px 28px', borderRadius: '14px',
                  background: 'linear-gradient(135deg, #0EA5E9, #6366F1)',
                  color: 'white', fontWeight: 700, fontSize: '14px', textDecoration: 'none',
                  boxShadow: '0 6px 20px rgba(99,102,241,0.35)',
                  transition: 'all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(99,102,241,0.5)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(99,102,241,0.35)'; }}
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                {t('hero.downloadCV')}
              </a>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '14px 28px', borderRadius: '14px',
                  background: 'var(--bg-primary)', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '14px',
                  border: '1px solid var(--border-primary)', cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  transition: 'all 0.3s',
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.35)'; e.currentTarget.style.color = '#6366F1'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(99,102,241,0.15)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-primary)'; e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                {t('hero.contact')}
              </button>
            </div>

            {/* Scroll hint */}
            <div className={`flex items-center gap-2 mt-12 transition-all duration-700 delay-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>
              <div style={{ width: '24px', height: '36px', borderRadius: '12px', border: '2px solid var(--border-secondary)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '4px' }}>
                <div style={{ width: '3px', height: '8px', borderRadius: '2px', background: '#6366F1', animation: 'float 1.5s ease-in-out infinite' }} />
              </div>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500 }}>{t('hero.scroll')}</span>
            </div>
          </div>

          {/* === RIGHT: Namecard === */}
          <div className="hidden lg:block">
            <Namecard visible={visible} />
          </div>
        </div>
      </div>
    </section>
  );
}
