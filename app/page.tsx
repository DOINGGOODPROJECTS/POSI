"use client";

import { LanguageSwitcher } from "./components/LanguageSwitcher";
import { useLanguage } from "./i18n/LanguageProvider";

function renderLines(text: string) {
  const lines = text.split("\n");
  return (
    <>
      {lines.map((line, index) => (
        <span key={`${index}-${line}`}>
          {line}
          {index < lines.length - 1 ? <br /> : null}
        </span>
      ))}
    </>
  );
}

export default function Home() {
  const year = new Date().getFullYear();
  const litepaperHref = "/POSI_Litepaper_v1.0.pdf";
  const { messages } = useLanguage();
  const ctaParts = messages.cta.h2Line2.split("{accent}");

  return (
    <>
      {/* NAV */}
      <nav>
        <div className="nav-logo">
          PO<span>S</span>I
        </div>
        <ul className="nav-links">
          <li>
            <a href="#problem">{messages.nav.problem}</a>
          </li>
          <li>
            <a href="#protocol">{messages.nav.protocol}</a>
          </li>
          <li>
            <a href="#how">{messages.nav.how}</a>
          </li>
          <li>
            <a href="#impact">{messages.nav.impact}</a>
          </li>
          <li>
            <a href="#capital">{messages.nav.capital}</a>
          </li>
        </ul>
        <div className="nav-right">
          <a
            href={litepaperHref}
            className="nav-litepaper"
            target="_blank"
            rel="noreferrer noopener"
          >
            {messages.nav.litepaper}{" "}
            <span className="nav-litepaper-square" aria-hidden="true" />
          </a>
          <LanguageSwitcher />
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-grid-bg" />
        <div className="hero-glow" />
        <div className="hero-glow-2" />
        <div className="hero-inner">
          <div className="hero-tag">{messages.hero.tag}</div>
          <h1>
            {messages.hero.h1Line1}
            <br />
            {messages.hero.h1Line2Prefix}{" "}
            <span className="accent">{messages.hero.h1Line2Accent}</span>
            <br />
            <span className="block-green">{messages.hero.h1Line3}</span>
          </h1>
          <p className="hero-sub">{messages.hero.sub}</p>
          <div className="hero-actions">
            <a href="#protocol" className="btn-primary">
              {messages.hero.explore}
            </a>
            <a
              href={litepaperHref}
              className="btn-outline"
              target="_blank"
              rel="noreferrer noopener"
            >
              {messages.hero.download}
            </a>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-val">{messages.hero.stats.dimensionsValue}</div>
              <div className="stat-label">{messages.hero.stats.dimensionsLabel}</div>
            </div>
            <div className="stat-item">
              <div className="stat-val">{messages.hero.stats.horizonValue}</div>
              <div className="stat-label">{messages.hero.stats.horizonLabel}</div>
            </div>
            <div className="stat-item">
              <div className="stat-val">{messages.hero.stats.marketsValue}</div>
              <div className="stat-label">{messages.hero.stats.marketsLabel}</div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section id="problem">
        <div className="container">
          <div className="section-tag">{messages.problem.tag}</div>
          <h2>
            {messages.problem.h2Line1}
            <br />
            {messages.problem.h2Line2}
          </h2>
          <p className="section-lead">{messages.problem.lead}</p>
          <div className="problem-grid">
            <div className="problem-cell">
              <div className="cell-icon">⚡</div>
              <h3>{messages.problem.cells.lossesTitle}</h3>
              <p>{messages.problem.cells.lossesBody}</p>
            </div>
            <div className="problem-cell">
              <div className="cell-icon">🏛</div>
              <h3>{messages.problem.cells.governanceTitle}</h3>
              <p>{messages.problem.cells.governanceBody}</p>
            </div>
            <div className="problem-cell">
              <div className="cell-icon">📊</div>
              <h3>{messages.problem.cells.accountabilityTitle}</h3>
              <p>{messages.problem.cells.accountabilityBody}</p>
            </div>
            <div className="problem-cell">
              <div className="cell-icon">🔗</div>
              <h3>{messages.problem.cells.mismatchTitle}</h3>
              <p>{messages.problem.cells.mismatchBody}</p>
            </div>
          </div>
        </div>
      </section>

      {/* PROTOCOL */}
      <section id="protocol">
        <div className="container">
          <div className="section-tag">{messages.protocol.tag}</div>
          <h2>
            {messages.protocol.h2Line1}
            <br />
            {messages.protocol.h2Line2}
          </h2>
          <p className="section-lead">{messages.protocol.lead}</p>
          <div className="protocol-layout">
            <div className="protocol-left">
              <div className="protocol-pillars">
                <div className="pillar">
                  <div className="pillar-num">01</div>
                  <div>
                    <div className="pillar-title">{messages.protocol.pillars.p1Title}</div>
                    <div className="pillar-desc">{messages.protocol.pillars.p1Desc}</div>
                  </div>
                </div>
                <div className="pillar">
                  <div className="pillar-num">02</div>
                  <div>
                    <div className="pillar-title">{messages.protocol.pillars.p2Title}</div>
                    <div className="pillar-desc">{messages.protocol.pillars.p2Desc}</div>
                  </div>
                </div>
                <div className="pillar">
                  <div className="pillar-num">03</div>
                  <div>
                    <div className="pillar-title">{messages.protocol.pillars.p3Title}</div>
                    <div className="pillar-desc">{messages.protocol.pillars.p3Desc}</div>
                  </div>
                </div>
                <div className="pillar">
                  <div className="pillar-num">04</div>
                  <div>
                    <div className="pillar-title">{messages.protocol.pillars.p4Title}</div>
                    <div className="pillar-desc">{messages.protocol.pillars.p4Desc}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="protocol-right">
              <div className="chain-visual">
                <div className="chain-header">
                  {messages.protocol.chain.header}
                </div>
                <div className="chain-blocks">
                  <div className="chain-block">
                    <div className="chain-block-label">
                      {messages.protocol.chain.b1Label}
                    </div>
                    <div className="chain-block-hash">0x4a2f8b3c…d9e1c07a</div>
                    <div className="chain-block-data">
                      {renderLines(messages.protocol.chain.b1Data)}
                    </div>
                  </div>
                  <div className="chain-connector">│</div>
                  <div className="chain-block">
                    <div className="chain-block-label">
                      {messages.protocol.chain.b2Label}
                    </div>
                    <div className="chain-block-hash">0x7b3e1ac5…ff02c9d4</div>
                    <div className="chain-block-data">
                      {renderLines(messages.protocol.chain.b2Data)}
                    </div>
                  </div>
                  <div className="chain-connector">│</div>
                  <div className="chain-block">
                    <div className="chain-block-label">
                      {messages.protocol.chain.b3Label}
                    </div>
                    <div className="chain-block-hash">0x2d9f4e7a…8b31f06c</div>
                    <div className="chain-block-data">
                      {renderLines(messages.protocol.chain.b3Data)}
                    </div>
                  </div>
                </div>
                <div className="attestation-note">
                  <strong>{messages.protocol.chain.noteStrong}</strong>{" "}
                  {messages.protocol.chain.note}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how">
        <div className="container">
          <div className="section-tag">{messages.how.tag}</div>
          <h2>{messages.how.h2}</h2>
          <p className="section-lead">{messages.how.lead}</p>
          <div className="steps">
            <div className="step">
              <div className="step-num">01</div>
              <h3>
                {messages.how.steps.s1TitlePrefix}{" "}
                <span className="step-accent">{messages.how.steps.s1TitleAccent}</span>
              </h3>
              <p>{messages.how.steps.s1Body}</p>
            </div>
            <div className="step">
              <div className="step-num">02</div>
              <h3>
                {messages.how.steps.s2TitlePrefix}{" "}
                <span className="step-accent">{messages.how.steps.s2TitleAccent}</span>
              </h3>
              <p>{messages.how.steps.s2Body}</p>
            </div>
            <div className="step">
              <div className="step-num">03</div>
              <h3>
                {messages.how.steps.s3TitlePrefix}{" "}
                <span className="step-accent">{messages.how.steps.s3TitleAccent}</span>
              </h3>
              <p>{messages.how.steps.s3Body}</p>
            </div>
          </div>
        </div>
      </section>

      {/* AUDIENCE */}
      <section id="audience">
        <div className="container">
          <div className="section-tag">{messages.audience.tag}</div>
          <h2>
            {messages.audience.h2Line1}
            <br />
            {messages.audience.h2Line2}
          </h2>
          <p className="section-lead">{messages.audience.lead}</p>
          <div className="audience-split">
            <div className="audience-card crypto">
              <div className="audience-icon">⬡</div>
              <h3>{messages.audience.crypto.title}</h3>
              <p>{messages.audience.crypto.body}</p>
              <ul className="feature-list">
                {messages.audience.crypto.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="audience-card utility">
              <div className="audience-icon">⚡</div>
              <h3>{messages.audience.utility.title}</h3>
              <p>{messages.audience.utility.body}</p>
              <ul className="feature-list">
                {messages.audience.utility.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section id="impact">
        <div className="container">
          <div className="section-tag">{messages.impact.tag}</div>
          <h2>{messages.impact.h2}</h2>
          <p className="section-lead">{messages.impact.lead}</p>
          <div className="impact-metrics">
            <div className="metric">
              <div className="metric-val">{messages.impact.metrics.m1Val}</div>
              <div className="metric-label">{messages.impact.metrics.m1Label}</div>
            </div>
            <div className="metric">
              <div className="metric-val">{messages.impact.metrics.m2Val}</div>
              <div className="metric-label">{messages.impact.metrics.m2Label}</div>
            </div>
            <div className="metric">
              <div className="metric-val">{messages.impact.metrics.m3Val}</div>
              <div className="metric-label">{messages.impact.metrics.m3Label}</div>
            </div>
            <div className="metric">
              <div className="metric-val">{messages.impact.metrics.m4Val}</div>
              <div className="metric-label">{messages.impact.metrics.m4Label}</div>
            </div>
          </div>
          <div className="impact-text">
            <div className="impact-item">
              <h4>{messages.impact.items.i1Title}</h4>
              <p>{messages.impact.items.i1Body}</p>
            </div>
            <div className="impact-item">
              <h4>{messages.impact.items.i2Title}</h4>
              <p>{messages.impact.items.i2Body}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CAPITAL */}
      <section id="capital">
        <div className="container">
          <div className="section-tag">{messages.capital.tag}</div>
          <h2>
            {messages.capital.h2Line1}
            <br />
            {messages.capital.h2Line2}
          </h2>
          <div className="capital-grid">
            <div>
              <p className="section-lead" style={{ marginBottom: "1.5rem" }}>
                {messages.capital.lead}
              </p>
              <div className="capital-use">
                <div className="use-item">
                  <div className="use-dot" />
                  <div>
                    <h4>{messages.capital.use.u1Title}</h4>
                    <p>{messages.capital.use.u1Body}</p>
                  </div>
                </div>
                <div className="use-item">
                  <div className="use-dot" />
                  <div>
                    <h4>{messages.capital.use.u2Title}</h4>
                    <p>{messages.capital.use.u2Body}</p>
                  </div>
                </div>
                <div className="use-item">
                  <div className="use-dot" />
                  <div>
                    <h4>{messages.capital.use.u3Title}</h4>
                    <p>{messages.capital.use.u3Body}</p>
                  </div>
                </div>
                <div className="use-item">
                  <div className="use-dot" />
                  <div>
                    <h4>{messages.capital.use.u4Title}</h4>
                    <p>{messages.capital.use.u4Body}</p>
                  </div>
                </div>
                <div className="use-item">
                  <div className="use-dot" />
                  <div>
                    <h4>{messages.capital.use.u5Title}</h4>
                    <p>{messages.capital.use.u5Body}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="capital-right">
              <div className="safeguard-list">
                {messages.capital.safeguards.map((item) => (
                  <div key={item} className="safeguard">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta">
        <div className="container">
          <div className="cta-inner">
            <div
              className="section-tag"
              style={{
                textAlign: "center",
                justifyContent: "center",
                display: "flex",
              }}
            >
              {messages.cta.tag}
            </div>
            <h2>
              {messages.cta.h2Line1}
              <br />
              {ctaParts[0]}
              <span style={{ color: "var(--amber)" }}>{messages.cta.accent}</span>
              {ctaParts[1]}
            </h2>
            <p>{messages.cta.body}</p>
            <div className="cta-buttons">
              <a
                href="mailto:posi@posiworks.org?subject=POSI%20-%20Contact%20the%20Team&body=Hello%20POSI%20team%2C%0D%0A%0D%0A"
                className="btn-primary"
              >
                {messages.cta.contact}
              </a>
              <a
                href={litepaperHref}
                className="btn-outline"
                target="_blank"
                rel="noreferrer noopener"
              >
                {messages.cta.download}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-logo">
          PO<span>S</span>I
        </div>
        <div className="footer-tagline">{messages.footer.tagline}</div>
        <div className="footer-copy">
          {messages.footer.copy.replace("{year}", String(year))}
        </div>
      </footer>
    </>
  );
}
