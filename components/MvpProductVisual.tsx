type MvpProductVisualProps = {
  slug: string;
};

function SonaCrateVisual() {
  return (
    <div className="mvp-product-visual mvp-product-visual-real mvp-product-visual-sonacrate" aria-hidden="true">
      <div className="mvp-browser-bar">
        <span />
        <span />
        <span />
        <strong>SonaCrate listener shell</strong>
      </div>
      <div className="sonacrate-visual-shell">
        <aside className="sonacrate-visual-rail">
          <div className="sonacrate-brand-dot">
            <span />
            <span />
            <span />
          </div>
          {["Home", "New Releases", "My Tracks", "Playlists", "Genres", "Tracks"].map((item, index) => (
            <span className={index === 0 ? "is-active" : ""} key={item}>
              {item}
            </span>
          ))}
        </aside>

        <div className="sonacrate-visual-main">
          <div className="sonacrate-search">What do you want to play?</div>
          <div className="sonacrate-quick-grid">
            {["New Releases", "My Tracks", "Artists", "Tracks"].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <div className="sonacrate-release-card">
            <div className="sonacrate-cover">
              <span>SC</span>
            </div>
            <div>
              <span>Newest release</span>
              <strong>Midnight Signal</strong>
              <p>Release ready, 4 tracks processed.</p>
            </div>
          </div>
          <div className="sonacrate-track-list">
            {[
              ["01", "City Lights", "READY"],
              ["02", "After Hours", "STREAM"],
              ["03", "Wide Awake", "320 KBPS"],
            ].map(([index, title, status]) => (
              <div className="sonacrate-track-row" key={title}>
                <span>{index}</span>
                <strong>{title}</strong>
                <em>{status}</em>
              </div>
            ))}
          </div>
        </div>

        <div className="sonacrate-player">
          <div className="sonacrate-eq">
            <span />
            <span />
            <span />
          </div>
          <strong>City Lights</strong>
          <div className="sonacrate-timeline" />
          <span>128 kbps stream</span>
        </div>
      </div>
    </div>
  );
}

function DtfVisual() {
  return (
    <div className="mvp-product-visual mvp-product-visual-real mvp-product-visual-dtf mvp-product-visual-light" aria-hidden="true">
      <div className="mvp-browser-bar">
        <span />
        <span />
        <span />
        <strong>DTF layout workspace</strong>
      </div>
      <div className="dtf-visual-shell">
        <div className="dtf-control-panel">
          <div className="dtf-control-head">
            <span>Layout</span>
            <strong>Add artwork</strong>
          </div>
          <div className="dtf-background-row">
            {["Light", "Grey", "Dark"].map((item, index) => (
              <span className={index === 1 ? "is-active" : ""} key={item}>
                {item}
              </span>
            ))}
          </div>
          <div className="dtf-artwork-card">
            <div className="dtf-artwork-thumb" />
            <div>
              <strong>Logo-print.png</strong>
              <span>3 copies</span>
            </div>
          </div>
          <div className="dtf-stepper-grid">
            {["W 120mm", "H 68mm", "Copies 3"].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <div className="dtf-price-card">
            <span>Price</span>
            <strong>£42 + VAT</strong>
          </div>
        </div>

        <div className="dtf-canvas-panel">
          <div className="dtf-canvas-head">
            <span>Template preview</span>
            <strong>560mm x 1000mm</strong>
          </div>
          <div className="dtf-canvas">
            {[
              "piece-one",
              "piece-two",
              "piece-three",
              "piece-four",
              "piece-five",
            ].map((item) => (
              <span className={item} key={item} />
            ))}
          </div>
          <div className="dtf-upload-summary">
            <span>Template 09 May.pdf</span>
            <strong>Send gang sheets</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MvpProductVisual({ slug }: MvpProductVisualProps) {
  if (slug === "dtf-gang-designer") {
    return <DtfVisual />;
  }

  return <SonaCrateVisual />;
}
