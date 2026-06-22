import { useEffect, useState } from 'react';
import { skillCategories } from '../data/portfolioData';
import useSectionReveal from '../hooks/useSectionReveal';
import { SectionHeader } from './About';
import { useLanguage } from '../contexts/LanguageContext';

function SkillBar({ name, level, color, animate }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (animate) {
      const t = setTimeout(() => setWidth(level), 150);
      return () => clearTimeout(t);
    }
  }, [animate, level]);

  return (
    <div style={{ marginBottom: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '7px' }}>
        <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)' }}>{name}</span>
        <span style={{
          fontSize: '11px', fontWeight: 700, color,
          padding: '2px 8px', borderRadius: '99px',
          background: `${color}10`, border: `1px solid ${color}25`,
          opacity: animate ? 1 : 0, transition: 'opacity 0.5s',
        }}>{level}%</span>
      </div>
      <div style={{ height: '7px', borderRadius: '99px', background: 'var(--bg-inner-panel)', overflow: 'hidden', position: 'relative' }}>
        <div style={{
          height: '100%', borderRadius: '99px',
          width: `${width}%`,
          background: `linear-gradient(90deg, ${color}70, ${color})`,
          transition: 'width 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: `0 0 8px ${color}40`,
        }} />
      </div>
    </div>
  );
}

function SkillCategoryCard({ category, icon, color, skills, animate }) {
  const { t } = useLanguage();
  return (
    <div style={{
      padding: '28px', borderRadius: '20px',
      background: 'var(--bg-primary)', border: '1px solid var(--border-primary)',
      boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
      position: 'relative', overflow: 'hidden',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${color}30`;
        e.currentTarget.style.boxShadow = `0 16px 48px rgba(0,0,0,0.1), 0 0 0 1px ${color}20`;
        e.currentTarget.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border-primary)';
        e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.05)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Top stripe */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${color}60, ${color}, ${color}60)` }} />

      {/* Background tint */}
      <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '150px', height: '150px', borderRadius: '50%', background: `radial-gradient(circle, ${color}06 0%, transparent 70%)`, pointerEvents: 'none' }} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: `${color}10`, border: `1px solid ${color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', color }}>
          {icon}
        </div>
        <div>
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', fontFamily: "'Space Grotesk', sans-serif" }}>{category}</h3>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '1px' }}>{skills.length} {t('skills.tech')}</p>
        </div>
      </div>

      {skills.map((skill) => (
        <SkillBar key={skill.name} name={skill.name} level={skill.level} color={color} animate={animate} />
      ))}
    </div>
  );
}

export default function Skills() {
  const { t } = useLanguage();
  const { ref, visible } = useSectionReveal(0.1);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => setAnimate(true), 400);
      return () => clearTimeout(t);
    }
  }, [visible]);

  return (
    <section id="skills" ref={ref} style={{ padding: '100px 0', position: 'relative', background: 'var(--bg-secondary)' }}>
      <div className="section-divider" style={{ position: 'absolute', top: 0, left: '24px', right: '24px' }} />
      <div style={{
        maxWidth: '1152px', margin: '0 auto', padding: '0 24px',
        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(40px)',
      }}>
        <SectionHeader eyebrow={t('skills.eyebrow')} title={t('skills.title')} />

        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          marginBottom: '40px', padding: '8px 16px', borderRadius: '10px',
          background: 'var(--bg-primary)', border: '1px solid var(--border-primary)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 8px rgba(16,185,129,0.6)', flexShrink: 0 }} />
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{t('skills.note')}</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
          {skillCategories.map((cat, i) => (
            <div key={cat.category} style={{
              transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: `${i * 120}ms`,
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(30px)',
            }}>
              <SkillCategoryCard {...cat} animate={animate} />
            </div>
          ))}
        </div>

        <div style={{ marginTop: '40px', display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'center' }}>
          {[
            { range: '90–100%', label: t('skills.legend.expert'), color: '#10B981' },
            { range: '75–89%', label: t('skills.legend.advanced'), color: '#0EA5E9' },
            { range: '60–74%', label: t('skills.legend.intermediate'), color: '#6366F1' },
            { range: '<60%', label: t('skills.legend.learning'), color: '#F59E0B' },
          ].map(({ range, label, color }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '24px', height: '3px', borderRadius: '2px', background: color }} />
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{label}</span> {range}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
