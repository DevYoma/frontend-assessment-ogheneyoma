export default function PokemonDetailLoading() {
  return (
    <main className="detail-page">
      <div className="skeleton skeleton-back-btn" />

      <article>
        <div className="detail-header">
          <div className="skeleton skeleton-title" />
          <div className="skeleton skeleton-id" />
        </div>

        <div className="detail-grid">
          <div className="detail-image-wrapper skeleton" />

          <div className="detail-stats">
            <div>
              <div className="skeleton skeleton-section-title" />
              <div className="skeleton skeleton-line" />
              <div className="skeleton skeleton-line" />
              <div className="skeleton skeleton-line" />
            </div>
            <div>
              <div className="skeleton skeleton-section-title" />
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <div className="skeleton skeleton-badge" />
                <div className="skeleton skeleton-badge" />
              </div>
            </div>
            <div>
              <div className="skeleton skeleton-section-title" />
              <div className="skeleton skeleton-line" />
              <div className="skeleton skeleton-line" />
              <div className="skeleton skeleton-line skeleton-line--short" />
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
