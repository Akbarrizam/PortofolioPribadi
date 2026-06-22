import { personalInfo } from '../data/portfolioData';
import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer style={{
      position: 'relative',
      background: 'var(--bg-primary)',
      borderTop: '1px solid var(--border-primary)',
      padding: '32px 0',
    }}>
      {/* Top glow accent */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '400px', height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.3), rgba(14,165,233,0.2), transparent)',
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: '1152px', margin: '0 auto', padding: '0 24px',
        display: 'flex', flexWrap: 'wrap', alignItems: 'center',
        justifyContent: 'space-between', gap: '16px',
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '28px', height: '28px', borderRadius: '8px',
            background: 'linear-gradient(135deg, #0EA5E9, #6366F1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 800, fontSize: '12px',
            fontFamily: "'Space Grotesk', sans-serif",
            boxShadow: '0 4px 10px rgba(99,102,241,0.25)',
          }}>
            W
          </div>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            © {year} {personalInfo.name}. {t('footer.allRights')}
          </span>
        </div>

        {/* Stack info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-muted)' }}>
          <span>{t('footer.builtWith')}</span>
          <span style={{ color: '#0EA5E9', fontWeight: 600 }}>React</span>
          <span>&</span>
          <span style={{ color: '#6366F1', fontWeight: 600 }}>Tailwind CSS</span>
        </div>
      </div>
    </footer>
  );
}
