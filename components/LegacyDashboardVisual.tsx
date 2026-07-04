export function LegacyDashboardVisual() {
  return (
    <div className="legacy-system-visual" aria-hidden="true">
      <div className="legacy-browser-bar">
        <span />
        <span />
        <span />
        <strong>operations-hub.brandd</strong>
        <em>Postgres-backed web app</em>
      </div>
      <div className="legacy-workspace legacy-order-workspace">
        <aside className="legacy-sidebar">
          <strong>Operations Hub</strong>
          <span>Production</span>
          {["Dashboard", "Database", "Orders", "Reports"].map((item) => (
            <em className={item === "Database" ? "is-active" : ""} key={item}>
              {item}
            </em>
          ))}
        </aside>
        <div className="legacy-access-panel legacy-order-panel">
          <div className="legacy-order-header">
            <span className="legacy-back-button">Back</span>
            <div className="legacy-job-fields">
              <div>
                <em>Job:</em>
                <strong>Sample Workwear Order</strong>
              </div>
              <div>
                <em>Order No:</em>
                <strong>51128</strong>
                <span>Invoice</span>
                <span>Stock</span>
              </div>
            </div>
          </div>
          <div className="legacy-order-tabs">
            <span>Order details</span>
            <span>Order items</span>
            <span>Design</span>
          </div>
          <div className="legacy-order-detail">
            <div className="legacy-form-panel legacy-client-panel">
              {[
                { label: "Customer:", value: "Sample Client" },
                { label: "Contact:", value: "Holly", mobileSecondary: true },
                { label: "Order type:", value: "Printing", mobileSecondary: true },
                { label: "Delivery:", value: "09/07/26" },
              ].map(({ label, value, mobileSecondary }) => (
                <div
                  className={`legacy-field-row${mobileSecondary ? " is-mobile-secondary" : ""}`}
                  key={`${label}-${value}`}
                >
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
            <div className="legacy-form-panel legacy-address-panel">
              <div className="legacy-field-row legacy-wide-row">
                <span>Invoice to:</span>
                <strong>Example Estate</strong>
              </div>
              <div className="legacy-field-row legacy-wide-row is-mobile-secondary">
                <span>Deliver to:</span>
                <strong>Main Warehouse</strong>
              </div>
              <div className="legacy-field-row legacy-wide-row">
                <span>Payment:</span>
                <strong>Account</strong>
              </div>
              <div className="legacy-field-row legacy-wide-row is-mobile-secondary">
                <span>Client ref:</span>
                <strong>Holly</strong>
              </div>
              <div className="legacy-comments-box">
                <span>Comments:</span>
                <strong>Artwork approved. Stock check pending.</strong>
              </div>
              <span className="legacy-close-button">Close Order</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
