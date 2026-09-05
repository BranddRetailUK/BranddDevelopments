export function SonaCrateCreatorVisual() {
  return (
    <div className="sonacrate-creator-ui" aria-hidden="true">
      <div className="sonacrate-creator-top">
        <strong>Creator Studio</strong>
        <span>Upload</span>
        <span>Profile</span>
      </div>
      <div className="sonacrate-creator-body">
        <div className="sonacrate-creator-nav">
          {["Overview", "Releases", "Analytics", "My Profile"].map(
            (item, index) => (
              <span className={index === 1 ? "is-active" : ""} key={item}>
                {item}
              </span>
            ),
          )}
        </div>
        <div className="sonacrate-release-workspace">
          <div className="sonacrate-upload-card">
            <span>Release upload</span>
            <strong>Midnight Signal EP</strong>
            <div className="sonacrate-upload-grid">
              <em>Cover art</em>
              <em>Audio files</em>
              <em>Primary genre</em>
              <em>ZIP import</em>
            </div>
          </div>
          <div className="sonacrate-rights-card">
            <strong>Ready to publish</strong>
            {[
              "Verify identity",
              "Confirm rights",
              "Copyright scan",
              "Process media",
            ].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
        <div className="sonacrate-analytics-row">
          {[
            ["Sales", "28"],
            ["Streams", "1,284"],
            ["Revenue", "£27.72"],
          ].map(([label, value]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
