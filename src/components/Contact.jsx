import { useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import useSectionReveal from '../hooks/useSectionReveal';
import { SectionHeader } from './About';
import { useLanguage } from '../contexts/LanguageContext';

const contactLinks = [
  {
    key: 'email', label: 'Email',
    href: (info) => `mailto:${info.email}`,
    detail: (info) => info.email,
    color: '#6366F1',
    icon: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
  },
  {
    key: 'github', label: 'GitHub',
    href: (info) => info.github,
    detail: () => 'github.com/Akbarrizam',
    color: '#24292F',
    icon: <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>,
  },
  {
    key: 'linkedin', label: 'LinkedIn',
    href: (info) => info.linkedin,
    detail: () => 'linkedin.com/in/wahyu',
    color: '#0077B5',
    icon: <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>,
  },
];

const inputStyle = {
  width: '100%', padding: '12px 16px', borderRadius: '12px',
  background: 'var(--bg-primary)', border: '1px solid var(--border-primary)',
  color: 'var(--text-primary)', fontSize: '14px', fontFamily: 'Inter, sans-serif',
  outline: 'none', transition: 'all 0.25s',
  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
};

export default function Contact() {
  const { lang, t } = useLanguage();
  const { ref, visible } = useSectionReveal();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let targetId = personalInfo.formspreeId ? personalInfo.formspreeId.trim() : '';
    
    if (targetId.startsWith('http')) {
      const parts = targetId.split('/');
      targetId = parts[parts.length - 1];
    }
    
    if (!targetId) {
      const mailtoUrl = `mailto:${personalInfo.email}?subject=Pesan Portofolio dari ${encodeURIComponent(form.name)}&body=Nama: ${encodeURIComponent(form.name)}%0AEmail Pengirim: ${encodeURIComponent(form.email)}%0A%0APesan:%0A${encodeURIComponent(form.message)}`;
      window.location.href = mailtoUrl;
      setSent(true);
      setForm({ name: '', email: '', message: '' });
      return;
    }

    setIsSending(true);
    setErrorMsg('');

    try {
      const response = await fetch(`https://formspree.io/f/${targetId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(form)
      });

      if (response.ok) {
        setSent(true);
        setForm({ name: '', email: '', message: '' });
      } else {
        const data = await response.json();
        setErrorMsg(data.error || t('contact.errorFail'));
      }
    } catch (error) {
      setErrorMsg(t('contact.errorConnection'));
    } finally {
      setIsSending(false);
    }
  };

  const getFocusStyle = (field) => focused === field
    ? { borderColor: '#6366F1', boxShadow: '0 0 0 3px rgba(99,102,241,0.1)' }
    : {};

  return (
    <section id="contact" ref={ref} style={{ padding: '100px 0', position: 'relative' }}>
      <div className="section-divider" style={{ position: 'absolute', top: 0, left: '24px', right: '24px' }} />
      <div style={{
        maxWidth: '1152px', margin: '0 auto', padding: '0 24px',
        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(40px)',
      }}>
        <SectionHeader eyebrow={t('contact.eyebrow')} title={t('contact.title')} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px', alignItems: 'start' }}>
          {/* Left info */}
          <div>
            <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '40px' }}>
              {t('contact.intro')}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {contactLinks.map((link) => (
                <a
                  key={link.key} href={link.href(personalInfo)}
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '16px',
                    padding: '16px 20px', borderRadius: '14px',
                    background: 'var(--bg-primary)', border: '1px solid var(--border-primary)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    textDecoration: 'none', color: 'inherit',
                    transition: 'all 0.3s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = `${link.color}30`;
                    e.currentTarget.style.boxShadow = `0 8px 28px rgba(0,0,0,0.08), 0 0 0 1px ${link.color}15`;
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border-primary)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '12px', flexShrink: 0,
                    background: `${link.color}10`, border: `1px solid ${link.color}20`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: link.color,
                  }}>
                    {link.icon}
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{link.label}</p>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 500, marginTop: '2px' }}>{link.detail(personalInfo)}</p>
                  </div>
                  <svg width="14" height="14" fill="none" stroke="var(--border-secondary)" strokeWidth={2} viewBox="0 0 24 24" style={{ marginLeft: 'auto' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Right form */}
          <div style={{ padding: '32px', borderRadius: '20px', background: 'var(--bg-primary)', border: '1px solid var(--border-primary)', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
                <h3 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: "'Space Grotesk', sans-serif", marginBottom: '8px' }}>
                  {t('contact.successTitle')}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: 1.6 }}>
                  {t('contact.successNote')}
                </p>
                <button onClick={() => setSent(false)} style={{
                  marginTop: '24px', padding: '10px 24px', borderRadius: '10px',
                  background: 'linear-gradient(135deg, #0EA5E9, #6366F1)',
                  color: 'white', fontWeight: 600, fontSize: '13px', cursor: 'pointer', border: 'none',
                  boxShadow: '0 4px 14px rgba(99,102,241,0.3)',
                }}>{t('contact.sendAgain')}</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', fontFamily: "'Space Grotesk', sans-serif", marginBottom: '4px' }}>
                  {lang === 'en' ? 'Send Message' : 'Kirim Pesan'}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                  {t('contact.requiredFields')}
                </p>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                    {t('contact.nameLabel')}
                  </label>
                  <input
                    type="text" required placeholder={t('contact.namePlaceholder')}
                    value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                    onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
                    style={{ ...inputStyle, ...getFocusStyle('name') }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                    {t('contact.emailLabel')}
                  </label>
                  <input
                    type="email" required placeholder={lang === 'en' ? 'email@example.com' : 'email@contoh.com'}
                    value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                    onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                    style={{ ...inputStyle, ...getFocusStyle('email') }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                    {t('contact.messageLabel')}
                  </label>
                  <textarea
                    required placeholder={t('contact.messagePlaceholder')}
                    value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
                    rows={5} style={{ ...inputStyle, resize: 'vertical', minHeight: '120px', ...getFocusStyle('message') }}
                  />
                </div>

                {errorMsg && (
                  <p style={{ color: '#EF4444', fontSize: '13px', fontWeight: 500, marginTop: '4px' }}>
                    ⚠️ {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSending}
                  style={{
                    padding: '14px 24px', borderRadius: '12px',
                    background: isSending ? '#94A3B8' : 'linear-gradient(135deg, #0EA5E9, #6366F1)',
                    color: 'white', fontWeight: 700, fontSize: '14px',
                    cursor: isSending ? 'not-allowed' : 'pointer', border: 'none',
                    boxShadow: isSending ? 'none' : '0 6px 20px rgba(99,102,241,0.35)',
                    transition: 'all 0.3s', fontFamily: "'Space Grotesk', sans-serif",
                  }}
                  onMouseEnter={e => { if (!isSending) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(99,102,241,0.5)'; } }}
                  onMouseLeave={e => { if (!isSending) { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(99,102,241,0.35)'; } }}
                >
                  {isSending ? t('contact.sending') : t('contact.send')}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
