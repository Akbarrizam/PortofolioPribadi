import { useState } from 'react';
import { blogPosts } from '../data/portfolioData';
import { useLanguage } from '../contexts/LanguageContext';
import useSectionReveal from '../hooks/useSectionReveal';
import { SectionHeader } from './About';

function formatDate(dateStr, lang) {
  return new Date(dateStr).toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function BlogModal({ post, onClose }) {
  const { lang, t } = useLanguage();
  const title = lang === 'id' ? post.titleId : post.titleEn;
  const content = lang === 'id' ? post.contentId : post.contentEn;

  return (
    <div 
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(15,23,42,0.6)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px', backdropFilter: 'blur(8px)',
      }}
    >
      <div 
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative', maxWidth: '640px', width: '100%',
          maxHeight: '90vh',
          borderRadius: '24px', overflow: 'hidden',
          background: 'var(--bg-primary)',
          border: '1px solid var(--border-primary)',
          boxShadow: '0 40px 100px rgba(15,23,42,0.15)',
          display: 'flex', flexDirection: 'column',
        }}
      >
        {/* Top bar with Close button */}
        <div style={{
          position: 'sticky', top: 0, background: 'var(--bg-primary)',
          padding: '20px 24px', borderBottom: '1px solid var(--border-primary)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          zIndex: 10,
        }}>
          <span style={{
            display: 'inline-block', padding: '3px 10px', borderRadius: '99px',
            fontSize: '10px', fontWeight: 600, color: post.categoryColor,
            background: `${post.categoryColor}10`, border: `1px solid ${post.categoryColor}20`
          }}>{post.category}</span>
          
          <button 
            onClick={onClose} 
            style={{
              background: 'none', border: 'none', color: '#64748B', cursor: 'pointer',
              fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '32px', height: '32px', borderRadius: '50%',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-secondary)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--text-muted)'; }}
          >
            ✕
          </button>
        </div>

        {/* Content area */}
        <div style={{ padding: '32px 32px 40px', overflowY: 'auto', flex: 1 }}>
          {/* Header Info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{
              width: '44px', height: '44px', borderRadius: '12px',
              background: `${post.categoryColor}10`, border: `1px solid ${post.categoryColor}20`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px',
            }}>{post.icon}</div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{formatDate(post.date, lang)}</span>
                <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'var(--border-secondary)' }} />
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{post.readMin} {t('blog.minRead')}</span>
              </div>
            </div>
          </div>

          <h2 style={{
            fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)',
            fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.02em',
            lineHeight: 1.35, marginBottom: '24px',
          }}>
            {title}
          </h2>

          <div style={{ height: '1px', background: 'var(--border-primary)', marginBottom: '24px' }} />

          {/* Article text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {content.map((paragraph, i) => (
              <p key={i} style={{ fontSize: '14.5px', color: 'var(--text-secondary)', lineHeight: 1.85, margin: 0 }}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Footer actions */}
        <div style={{
          position: 'sticky', bottom: 0, background: 'var(--bg-primary)',
          padding: '16px 24px', borderTop: '1px solid var(--border-primary)',
          display: 'flex', justifyContent: 'flex-end',
          zIndex: 10,
        }}>
          <button 
            onClick={onClose}
            style={{
              padding: '10px 20px', borderRadius: '10px',
              background: 'linear-gradient(135deg, #0EA5E9, #6366F1)',
              color: 'white', fontWeight: 600, fontSize: '13px', cursor: 'pointer', border: 'none',
              boxShadow: '0 4px 14px rgba(99,102,241,0.3)',
              transition: 'all 0.25s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(99,102,241,0.45)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(99,102,241,0.3)'; }}
          >
            {t('blog.close')}
          </button>
        </div>
      </div>
    </div>
  );
}

function BlogCard({ post, index, visible, onOpen }) {
  const { lang, t } = useLanguage();
  const title = lang === 'id' ? post.titleId : post.titleEn;
  const excerpt = lang === 'id' ? post.excerptId : post.excerptEn;

  return (
    <div style={{
      borderRadius: '20px', background: 'var(--bg-primary)',
      border: '1px solid var(--border-primary)',
      boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
      overflow: 'hidden', display: 'flex', flexDirection: 'column',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      transitionDelay: `${index * 100}ms`,
      opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)',
      cursor: 'pointer',
    }}
      onClick={() => onOpen(post)}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.borderColor = `${post.categoryColor}25`;
        e.currentTarget.style.boxShadow = `0 20px 60px rgba(0,0,0,0.08), 0 0 0 1px ${post.categoryColor}15`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'var(--border-primary)';
        e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.05)';
      }}
    >
      {/* Color stripe */}
      <div style={{ height: '3px', background: `linear-gradient(90deg, ${post.categoryColor}50, ${post.categoryColor}, ${post.categoryColor}50)` }} />

      {/* Header */}
      <div style={{
        padding: '24px 24px 18px',
        background: `linear-gradient(135deg, ${post.categoryColor}05 0%, transparent 100%)`,
        borderBottom: '1px solid var(--border-primary)',
        display: 'flex', alignItems: 'center', gap: '14px',
      }}>
        <div style={{
          width: '50px', height: '50px', borderRadius: '14px', flexShrink: 0,
          background: `${post.categoryColor}10`, border: `1px solid ${post.categoryColor}20`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px',
        }}>{post.icon}</div>
        <div>
          <span style={{
            display: 'inline-block', padding: '3px 10px', borderRadius: '99px',
            fontSize: '10px', fontWeight: 600, color: post.categoryColor,
            background: `${post.categoryColor}10`, border: `1px solid ${post.categoryColor}20`,
            marginBottom: '5px',
          }}>{post.category}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{formatDate(post.date, lang)}</span>
            <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'var(--border-secondary)', display: 'inline-block' }} />
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{post.readMin} {t('blog.minRead')}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '20px 24px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1.4, marginBottom: '10px' }}>
          {title}
        </h3>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: '16px', flex: 1 }}>
          {excerpt}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '18px' }}>
          {post.tags.map(tag => (
            <span key={tag} style={{
              padding: '3px 9px', borderRadius: '6px', fontSize: '10px', fontWeight: 500,
              color: 'var(--text-muted)', background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)',
            }}>#{tag}</span>
          ))}
        </div>

        <button style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          padding: '8px 16px', borderRadius: '10px', width: 'fit-content',
          fontSize: '12px', fontWeight: 600,
          color: post.categoryColor, background: `${post.categoryColor}08`,
          border: `1px solid ${post.categoryColor}20`,
          cursor: 'pointer', transition: 'all 0.25s',
        }}
          onMouseEnter={e => { e.currentTarget.style.background = `${post.categoryColor}18`; e.currentTarget.style.gap = '10px'; }}
          onMouseLeave={e => { e.currentTarget.style.background = `${post.categoryColor}08`; e.currentTarget.style.gap = '6px'; }}
        >
          {t('blog.readMore')}
          <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function Blog() {
  const { t } = useLanguage();
  const { ref, visible } = useSectionReveal();
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <section id="blog" ref={ref} style={{ padding: '100px 0', position: 'relative', background: 'var(--bg-secondary)' }}>
      {selectedPost && <BlogModal post={selectedPost} onClose={() => setSelectedPost(null)} />}
      <div className="section-divider" style={{ position: 'absolute', top: 0, left: '24px', right: '24px' }} />
      <div style={{
        maxWidth: '1152px', margin: '0 auto', padding: '0 24px',
        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(40px)',
      }}>
        <SectionHeader eyebrow={t('blog.eyebrow')} title={t('blog.title')} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
          {blogPosts.map((post, i) => (
            <BlogCard 
              key={post.id} 
              post={post} 
              index={i} 
              visible={visible} 
              onOpen={setSelectedPost}
            />
          ))}
        </div>
        <div style={{ marginTop: '36px', textAlign: 'center' }}>
          <button style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '10px 24px', borderRadius: '10px', fontSize: '13px',
            color: 'var(--text-muted)', cursor: 'pointer', border: '1px solid var(--border-primary)',
            background: 'var(--bg-primary)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            transition: 'all 0.3s',
          }}
            onMouseEnter={e => { e.currentTarget.style.color = '#6366F1'; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(99,102,241,0.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border-primary)'; e.currentTarget.style.background = 'var(--bg-primary)'; }}
          >
            {t('blog.viewAll')}
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
