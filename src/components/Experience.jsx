import { experiences } from '../data/portfolioData';
import useSectionReveal from '../hooks/useSectionReveal';
import { SectionHeader } from './About';
import { useLanguage } from '../contexts/LanguageContext';

const typeConfig = {
  Development: { color: '#6366F1', bg: 'rgba(99,102,241,0.08)', border: 'rgba(99,102,241,0.2)', dot: '#6366F1' },
  Operations:  { color: '#0EA5E9', bg: 'rgba(14,165,233,0.08)',  border: 'rgba(14,165,233,0.2)',  dot: '#0EA5E9' },
};

function ExperienceCard({ exp, index, visible }) {
  const { lang } = useLanguage();
  const cfg = typeConfig[exp.type] || typeConfig.Development;

  const role = lang === 'en' && exp.roleEn ? exp.roleEn : exp.role;
  const company = lang === 'en' && exp.companyEn ? exp.companyEn : exp.company;
  const period = lang === 'en' && exp.periodEn ? exp.periodEn : exp.period;
  const points = lang === 'en' && exp.pointsEn ? exp.pointsEn : exp.points;

  return (
    <div style={{
      display: 'flex', gap: '24px',
      transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
      transitionDelay: `${index * 150}ms`,
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateX(0)' : 'translateX(-30px)',
    }}>
      {/* Timeline */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <div style={{
          width: '40px', height: '40px', borderRadius: '12px',
          background: cfg.bg, border: `1px solid ${cfg.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, boxShadow: `0 4px 12px ${cfg.color}15`,
        }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: cfg.dot }} />
        </div>
        {index < experiences.length - 1 && (
          <div style={{ width: '2px', flex: 1, marginTop: '8px', background: 'linear-gradient(to bottom, var(--border-primary), transparent)', borderRadius: '2px', minHeight: '40px' }} />
        )}
      </div>

      {/* Card */}
      <div style={{
        flex: 1, padding: '24px', borderRadius: '16px',
        background: 'var(--bg-primary)', border: '1px solid var(--border-primary)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
        marginBottom: '24px',
        transition: 'all 0.3s',
      }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = `${cfg.color}30`;
          e.currentTarget.style.boxShadow = `0 12px 40px rgba(0,0,0,0.08), 0 0 0 1px ${cfg.color}15`;
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'var(--border-primary)';
          e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.05)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        {/* Top row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '6px' }}>
          <div>
            <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-primary)', fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.01em' }}>
              {role}
            </h3>
            <p style={{ fontSize: '13px', color: cfg.color, fontWeight: 600, marginTop: '2px' }}>{company}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ padding: '4px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: 600, background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}>
              {exp.type}
            </span>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 500 }}>{period}</span>
          </div>
        </div>

        <div style={{ height: '1px', background: 'var(--border-primary)', margin: '16px 0' }} />

        {/* Points */}
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {points.map((point, i) => (
            <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: cfg.dot, flexShrink: 0, marginTop: '6px' }} />
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{point}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Experience() {
  const { t } = useLanguage();
  const { ref, visible } = useSectionReveal();

  return (
    <section id="experience" ref={ref} style={{ padding: '100px 0', position: 'relative', background: 'var(--bg-secondary)' }}>
      <div className="section-divider" style={{ position: 'absolute', top: 0, left: '24px', right: '24px' }} />
      <div style={{
        maxWidth: '1152px', margin: '0 auto', padding: '0 24px',
        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(40px)',
      }}>
        <SectionHeader eyebrow={t('experience.eyebrow')} title={t('experience.title')} />
        <div style={{ maxWidth: '740px' }}>
          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.id} exp={exp} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}
