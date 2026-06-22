import { useState, useEffect, useRef } from 'react';
import { testimonials } from '../data/portfolioData';
import { useLanguage } from '../contexts/LanguageContext';
import useSectionReveal from '../hooks/useSectionReveal';
import { SectionHeader } from './About';

function Stars({ count = 5 }) {
  return (
    <div style={{ display: 'flex', gap: '3px', marginBottom: '14px' }}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial, isActive }) {
  const { lang } = useLanguage();
  const text = lang === 'en' && testimonial.textEn ? testimonial.textEn : testimonial.text;
  const role = lang === 'en' && testimonial.roleEn ? testimonial.roleEn : testimonial.role;
  const company = lang === 'en' && testimonial.companyEn ? testimonial.companyEn : testimonial.company;

  return (
    <div style={{
      padding: '28px', borderRadius: '20px',
      background: isActive ? 'var(--bg-primary)' : 'var(--bg-secondary)',
      border: isActive ? `1px solid ${testimonial.avatarColor}25` : '1px solid var(--border-primary)',
      boxShadow: isActive ? `0 16px 48px rgba(0,0,0,0.1), 0 0 0 1px ${testimonial.avatarColor}15` : '0 2px 10px rgba(0,0,0,0.04)',
      transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      height: '100%', position: 'relative', overflow: 'hidden',
    }}>
      {/* Quote decoration */}
      <div style={{ position: 'absolute', top: '16px', right: '20px', fontSize: '48px', color: 'var(--border-primary)', fontFamily: 'Georgia, serif', lineHeight: 1, userSelect: 'none' }}>"</div>

      <Stars />

      <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.85, fontStyle: 'italic', marginBottom: '24px' }}>
        "{text}"
      </p>

      <div style={{ height: '1px', background: 'var(--border-primary)', marginBottom: '18px' }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '42px', height: '42px', borderRadius: '50%', flexShrink: 0,
          background: `linear-gradient(135deg, ${testimonial.avatarColor}20, ${testimonial.avatarColor}10)`,
          border: `2px solid ${testimonial.avatarColor}30`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '13px', fontWeight: 700, color: testimonial.avatarColor,
          fontFamily: "'Space Grotesk', sans-serif",
          boxShadow: isActive ? `0 0 0 3px ${testimonial.avatarColor}15` : 'none',
        }}>
          {testimonial.avatar}
        </div>
        <div>
          <p style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', fontFamily: "'Space Grotesk', sans-serif" }}>
            {testimonial.name}
          </p>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
            {role} · <span style={{ color: testimonial.avatarColor, fontWeight: 600 }}>{company}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const { ref, visible } = useSectionReveal();
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => setActiveIndex(p => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(timerRef.current);
  }, []);

  const handleDot = (i) => {
    setActiveIndex(i);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setActiveIndex(p => (p + 1) % testimonials.length), 5000);
  };

  return (
    <section id="testimonials" ref={ref} style={{ padding: '100px 0', position: 'relative' }}>
      <div className="section-divider" style={{ position: 'absolute', top: 0, left: '24px', right: '24px' }} />
      <div style={{
        maxWidth: '1152px', margin: '0 auto', padding: '0 24px',
        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(40px)',
      }}>
        <SectionHeader eyebrow={t('testimonials.eyebrow')} title={t('testimonials.title')} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginBottom: '36px' }}>
          {testimonials.map((test, i) => (
            <div key={test.id} onClick={() => handleDot(i)} style={{
              cursor: 'pointer',
              transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: `${i * 100}ms`,
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(30px)',
            }}>
              <TestimonialCard testimonial={test} isActive={activeIndex === i} />
            </div>
          ))}
        </div>

        {/* Dot nav */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '48px' }}>
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => handleDot(i)} style={{
              border: 'none', cursor: 'pointer', padding: 0,
              width: activeIndex === i ? '28px' : '8px', height: '8px', borderRadius: '99px',
              background: activeIndex === i ? 'linear-gradient(90deg, #0EA5E9, #6366F1)' : 'var(--border-primary)',
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              boxShadow: activeIndex === i ? '0 0 12px rgba(99,102,241,0.4)' : 'none',
            }} aria-label={`Testimonial ${i + 1}`} />
          ))}
        </div>

        {/* Trust signal */}
        <div style={{
          padding: '24px 32px', borderRadius: '16px',
          background: 'var(--bg-primary)', border: '1px solid var(--border-primary)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: '24px', flexWrap: 'wrap', maxWidth: '480px', margin: '0 auto',
        }}>
          {[
            { value: '5+', label: t('testimonials.clients'), color: '#0EA5E9' },
            { value: '100%', label: t('testimonials.completed'), color: '#6366F1' },
            { value: '⭐ 5.0', label: t('testimonials.rating'), color: '#10B981' },
          ].map(({ value, label, color }, i, arr) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '26px', fontWeight: 800, color, fontFamily: "'Space Grotesk', sans-serif" }}>{value}</p>
                <p style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '2px' }}>{label}</p>
              </div>
              {i < arr.length - 1 && <div style={{ width: '1px', height: '36px', background: 'var(--border-primary)' }} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
