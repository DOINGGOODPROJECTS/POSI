export default function Home() {
  const year = new Date().getFullYear();
  const litepaperHref = "/POSI_Litepaper_v1.0.pdf";

  return (
    <>
      {/* NAV */}
      <nav>
        <div className="nav-logo">
          PO<span>S</span>I
        </div>
        <ul className="nav-links">
          <li>
            <a href="#problem">Problem</a>
          </li>
          <li>
            <a href="#protocol">Protocol</a>
          </li>
          <li>
            <a href="#how">How It Works</a>
          </li>
          <li>
            <a href="#impact">Impact</a>
          </li>
          <li>
            <a href="#capital">Capital</a>
          </li>
        </ul>
        <a
          href={litepaperHref}
          className="nav-litepaper"
          target="_blank"
          rel="noreferrer noopener"
        >
          LITEPAPER <span className="nav-litepaper-square" aria-hidden="true" />
        </a>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-grid-bg" />
        <div className="hero-glow" />
        <div className="hero-glow-2" />
        <div className="hero-inner">
          <div className="hero-tag">Power Stewardship Initiative</div>
          <h1>
            Onchain Accountability
            <br />
            for <span className="accent">Real-World</span>
            <br />
            <span className="block-green">Energy Infrastructure</span>
          </h1>
          <p className="hero-sub">
            POSI is a mission-locked stewardship platform that embeds a
            standardized, blockchain-anchored performance protocol into
            privatized electricity distribution utilities across frontier
            markets — bridging institutional governance reform with verifiable
            onchain transparency.
          </p>
          <div className="hero-actions">
            <a href="#protocol" className="btn-primary">
              Explore the Protocol
            </a>
            <a
              href={litepaperHref}
              className="btn-outline"
              target="_blank"
              rel="noreferrer noopener"
            >
              DOWNLOAD LITEPAPER
            </a>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-val">4</div>
              <div className="stat-label">Protocol Dimensions</div>
            </div>
            <div className="stat-item">
              <div className="stat-val">10–20yr</div>
              <div className="stat-label">Alignment Horizon</div>
            </div>
            <div className="stat-item">
              <div className="stat-val">Africa / Asia</div>
              <div className="stat-label">Target Markets</div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section id="problem">
        <div className="container">
          <div className="section-tag">{"// The Institutional Gap"}</div>
          <h2>
            Distribution utilities aren&apos;t failing
            <br />
            for lack of technology.
          </h2>
          <p className="section-lead">
            Across Africa and Asia, privatized and concession-based utilities
            struggle with institutional dysfunction — not generation shortfalls.
            The missing layer is disciplined governance, long-term performance
            accountability, and verifiable transparency.
          </p>
          <div className="problem-grid">
            <div className="problem-cell">
              <div className="cell-icon">⚡</div>
              <h3>High Technical &amp; Commercial Losses</h3>
              <p>
                Persistent infrastructure degradation and metering failures drain
                20–40% of distributed electricity, destroying financial
                sustainability before any renewable ambition can take hold.
              </p>
            </div>
            <div className="problem-cell">
              <div className="cell-icon">🏛</div>
              <h3>Weak Governance Discipline</h3>
              <p>
                Even where privatization structures exist, board oversight is
                fragmented, long-term strategy inconsistent, and institutional
                incentives misaligned with reliability or energy transition
                targets.
              </p>
            </div>
            <div className="problem-cell">
              <div className="cell-icon">📊</div>
              <h3>No Standardized Accountability</h3>
              <p>
                There is no common language for what &quot;performing&quot; means
                across frontier market utilities. Capital providers, regulators,
                and governments operate without a shared, verifiable performance
                baseline.
              </p>
            </div>
            <div className="problem-cell">
              <div className="cell-icon">🔗</div>
              <h3>Short-Term Capital Mismatch</h3>
              <p>
                Infrastructure assets demand 10–20 year commitment horizons. Most
                available capital is structured for short cycles, creating a
                chronic mismatch that prevents durable institutional reform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROTOCOL */}
      <section id="protocol">
        <div className="container">
          <div className="section-tag">{"// The POSI Protocol"}</div>
          <h2>
            A standardized stewardship protocol,
            <br />
            anchored immutably onchain.
          </h2>
          <p className="section-lead">
            The POSI Stewardship Protocol is the first standardized,
            blockchain-anchored governance framework designed specifically for
            distribution utilities in frontier markets. It defines, measures,
            and publicly verifies institutional improvement across four core
            dimensions — creating a replicable accountability layer that travels
            with capital.
          </p>
          <div className="protocol-layout">
            <div className="protocol-left">
              <div className="protocol-pillars">
                <div className="pillar">
                  <div className="pillar-num">01</div>
                  <div>
                    <div className="pillar-title">Operational Reliability</div>
                    <div className="pillar-desc">
                      Reduction of technical and commercial losses, improved
                      maintenance execution, expanded service connections and
                      uptime discipline.
                    </div>
                  </div>
                </div>
                <div className="pillar">
                  <div className="pillar-num">02</div>
                  <div>
                    <div className="pillar-title">Financial Sustainability</div>
                    <div className="pillar-desc">
                      Revenue collection improvement, cost recovery rates,
                      disciplined capital allocation and long-term balance sheet
                      integrity.
                    </div>
                  </div>
                </div>
                <div className="pillar">
                  <div className="pillar-num">03</div>
                  <div>
                    <div className="pillar-title">Transition Readiness</div>
                    <div className="pillar-desc">
                      Gradual shift of capex toward grid strengthening and
                      renewable integration; tracked reduction in diesel
                      dependence over reporting cycles.
                    </div>
                  </div>
                </div>
                <div className="pillar">
                  <div className="pillar-num">04</div>
                  <div>
                    <div className="pillar-title">Governance Quality</div>
                    <div className="pillar-desc">
                      Board oversight practices, planning transparency,
                      consistency of long-term strategy, and documented
                      accountability to defined KPIs.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="protocol-right">
              <div className="chain-visual">
                <div className="chain-header">
                  Onchain Attestation Registry — Live
                </div>
                <div className="chain-blocks">
                  <div className="chain-block">
                    <div className="chain-block-label">
                      Attestation #0047 · Q1 2025
                    </div>
                    <div className="chain-block-hash">0x4a2f8b3c…d9e1c07a</div>
                    <div className="chain-block-data">
                      UTILITY: West Africa Dist. Co. · PROTOCOL v1.2
                      <br />
                      TECHNICAL LOSS: 21.3% → 18.4% ↓ VERIFIED
                    </div>
                  </div>
                  <div className="chain-connector">│</div>
                  <div className="chain-block">
                    <div className="chain-block-label">
                      Attestation #0031 · Q3 2024
                    </div>
                    <div className="chain-block-hash">0x7b3e1ac5…ff02c9d4</div>
                    <div className="chain-block-data">
                      UTILITY: West Africa Dist. Co. · PROTOCOL v1.1
                      <br />
                      COLLECTION RATE: 68.1% → 72.6% ↑ VERIFIED
                    </div>
                  </div>
                  <div className="chain-connector">│</div>
                  <div className="chain-block">
                    <div className="chain-block-label">
                      Attestation #0018 · Q1 2024
                    </div>
                    <div className="chain-block-hash">0x2d9f4e7a…8b31f06c</div>
                    <div className="chain-block-data">
                      UTILITY: West Africa Dist. Co. · PROTOCOL v1.0
                      <br />
                      BASELINE ESTABLISHED · GOVERNANCE SCORE: C+
                    </div>
                  </div>
                </div>
                <div className="attestation-note">
                  <strong>Architecture:</strong> Performance disclosures are
                  cryptographically hashed and timestamped onchain. Supporting
                  documentation remains off-chain. The blockchain serves as a
                  permanent integrity and comparability layer — not a financial
                  instrument.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how">
        <div className="container">
          <div className="section-tag">{"// Mechanism"}</div>
          <h2>Protocol + Equity + Chain.</h2>
          <p className="section-lead">
            Three interlocking elements create an enforceable model of
            institutional reform. Each reinforces the others — removing the
            systemic gaps that have historically kept governance reform advisory
            rather than binding.
          </p>
          <div className="steps">
            <div className="step">
              <div className="step-num">01</div>
              <h3>
                Define Stewardship <span className="step-accent">Onchain</span>
              </h3>
              <p>
                The POSI Protocol publishes a standardized, versioned set of
                performance indicators for distribution utilities. Each
                reporting cycle, attestations are anchored onchain via
                cryptographic hashes — creating an immutable, comparable
                accountability registry.
              </p>
            </div>
            <div className="step">
              <div className="step-num">02</div>
              <h3>
                Acquire <span className="step-accent">Minority Equity</span>
              </h3>
              <p>
                POSI takes strategic minority positions in privatized or
                concession-based utilities, structured to secure board
                representation or formal shareholder influence. The equity
                position creates enforcement leverage. Without it, the protocol
                risks being advisory. Without the protocol, the equity risks
                being passive.
              </p>
            </div>
            <div className="step">
              <div className="step-num">03</div>
              <h3>
                Drive <span className="step-accent">Institutional Reform</span>
              </h3>
              <p>
                Through governance engagement, POSI aligns management and board
                strategy with protocol KPIs — spanning loss reduction, financial
                discipline, renewable integration, and transparency. Performance
                evolution is documented, verified, and publicly attested each
                cycle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AUDIENCE */}
      <section id="audience">
        <div className="container">
          <div className="section-tag">{"// Who This Is For"}</div>
          <h2>
            Built for two worlds.
            <br />
            Operating in one.
          </h2>
          <p className="section-lead">
            POSI speaks fluently to blockchain and digital capital communities
            while delivering institutional credibility to regulators,
            governments, and utility operators. No tokenized securities. No
            speculative instruments. Just real-world performance, verifiably
            recorded.
          </p>
          <div className="audience-split">
            <div className="audience-card crypto">
              <div className="audience-icon">⬡</div>
              <h3>Blockchain &amp; Digital Capital Leaders</h3>
              <p>
                POSI is a real-world asset protocol with genuine institutional
                depth. The onchain attestation registry creates a permanent,
                public accountability layer — applying blockchain&apos;s core value
                proposition (immutability, transparency, verifiability) to
                critical infrastructure governance in markets where it matters
                most.
              </p>
              <ul className="feature-list">
                <li>
                  Onchain attestation architecture anchoring verifiable real-world
                  disclosures
                </li>
                <li>
                  Standardized, versioned protocol enabling cross-utility
                  comparability
                </li>
                <li>
                  Cryptographic integrity layer — not tokenized equity, no retail
                  instruments
                </li>
                <li>
                  Long-duration capital structure aligned with infrastructure
                  asset horizons
                </li>
                <li>
                  Transparent, immutable stewardship registry building
                  institutional trust
                </li>
              </ul>
            </div>
            <div className="audience-card utility">
              <div className="audience-icon">⚡</div>
              <h3>Utility &amp; Infrastructure Leaders</h3>
              <p>
                POSI engages as a conventional, long-term institutional
                shareholder. No operational intrusion. No real-time telemetry
                requirements. POSI brings aligned governance influence,
                structured capital, and a performance framework that strengthens
                regulatory credibility and transition readiness.
              </p>
              <ul className="feature-list">
                <li>
                  Minority equity partner with board-level governance engagement
                  rights
                </li>
                <li>
                  10–20 year capital alignment horizon matching infrastructure
                  asset lives
                </li>
                <li>
                  Protocol based on audited disclosures and regulatory filings —
                  not intrusive data access
                </li>
                <li>
                  Structured support for loss reduction, capital planning, and
                  renewable integration
                </li>
                <li>
                  Verifiable performance record strengthening access to future
                  institutional capital
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section id="impact">
        <div className="container">
          <div className="section-tag">{"// Measurable Outcomes"}</div>
          <h2>Stewardship that compounds.</h2>
          <p className="section-lead">
            POSI targets tangible, measurable improvement across the utilities
            it stewards — with every gain publicly attested and building a
            replicable institutional model.
          </p>
          <div className="impact-metrics">
            <div className="metric">
              <div className="metric-val">↓ Loss</div>
              <div className="metric-label">
                Technical &amp; commercial loss reduction across the distribution
                network
              </div>
            </div>
            <div className="metric">
              <div className="metric-val">↑ Revenue</div>
              <div className="metric-label">
                Improved collection rates and cost recovery discipline over
                reporting cycles
              </div>
            </div>
            <div className="metric">
              <div className="metric-val">↑ Access</div>
              <div className="metric-label">
                Expanded service connections and improved reliability for
                underserved populations
              </div>
            </div>
            <div className="metric">
              <div className="metric-val">↑ Clean</div>
              <div className="metric-label">
                Increased renewable capex share and structured reduction of diesel
                dependence
              </div>
            </div>
          </div>
          <div className="impact-text">
            <div className="impact-item">
              <h4>Replicable Institutional Model</h4>
              <p>
                By standardizing how utility improvement is defined and publicly
                verified, POSI creates a governance template that is replicable
                across frontier markets — making stewardship itself a scalable
                asset.
              </p>
            </div>
            <div className="impact-item">
              <h4>Universal, Reliable, Clean Electricity</h4>
              <p>
                Improved governance discipline and transition readiness build the
                institutional foundation for long-term clean energy delivery to
                the rapidly growing populations of Africa and Asia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CAPITAL */}
      <section id="capital">
        <div className="container">
          <div className="section-tag">{"// Capital Structure"}</div>
          <h2>
            Stable-value capital.
            <br />
            Infrastructure-grade discipline.
          </h2>
          <div className="capital-grid">
            <div>
              <p className="section-lead" style={{ marginBottom: "1.5rem" }}>
                POSI operates through a regulated, off-chain investment vehicle
                funded primarily with stable-value capital. Equity holdings are
                subject to standard audit and reporting requirements, aligned
                with 10–20 year infrastructure horizons. The blockchain component
                supplements — not replaces — regulatory oversight.
              </p>
              <div className="capital-use">
                <div className="use-item">
                  <div className="use-dot" />
                  <div>
                    <h4>Mission-Locked Holding Structure</h4>
                    <p>
                      Establishment of the regulated off-chain vehicle and
                      mission governance framework.
                    </p>
                  </div>
                </div>
                <div className="use-item">
                  <div className="use-dot" />
                  <div>
                    <h4>Protocol v1 Publication</h4>
                    <p>
                      First public release of the standardized POSI Stewardship
                      Protocol with full indicator documentation.
                    </p>
                  </div>
                </div>
                <div className="use-item">
                  <div className="use-dot" />
                  <div>
                    <h4>Onchain Attestation Registry</h4>
                    <p>
                      Deployment of the immutable performance attestation
                      architecture and public registry infrastructure.
                    </p>
                  </div>
                </div>
                <div className="use-item">
                  <div className="use-dot" />
                  <div>
                    <h4>1–3 Minority Equity Positions</h4>
                    <p>
                      Acquisition of initial minority stakes in targeted
                      privatized or concession utilities in Africa or Asia.
                    </p>
                  </div>
                </div>
                <div className="use-item">
                  <div className="use-dot" />
                  <div>
                    <h4>Technical Stewardship Engagements</h4>
                    <p>
                      Protocol-aligned loss reduction programs, capital planning
                      assessments, and governance strengthening measures.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="capital-right">
              <div className="safeguard-list">
                <div className="safeguard">Regulated off-chain investment vehicle</div>
                <div className="safeguard">
                  Standard audit &amp; reporting requirements
                </div>
                <div className="safeguard">
                  No tokenized securities or retail instruments
                </div>
                <div className="safeguard">No speculative financial instruments</div>
                <div className="safeguard">
                  Onchain layer for attestation integrity only
                </div>
                <div className="safeguard">
                  Long-duration alignment (10–20 year horizon)
                </div>
                <div className="safeguard">Conservative, governance-led deployment</div>
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
              {"// Join the Initiative"}
            </div>
            <h2>
              The institution that delivers electricity
              <br />
              must itself be <span style={{ color: "var(--amber)" }}>accountable</span>.
            </h2>
            <p>
              POSI is seeking committed capital partners, utility co-investors,
              and protocol collaborators who understand that the next frontier in
              energy transition is not generation — it is governance.
            </p>
            <div className="cta-buttons">
              <a
                href="mailto:posi@posiworks.org?subject=POSI%20-%20Contact%20the%20Team&body=Hello%20POSI%20team%2C%0D%0A%0D%0A"
                className="btn-primary"
              >
                Contact the Team
              </a>
              <a
                href={litepaperHref}
                className="btn-outline"
                target="_blank"
                rel="noreferrer noopener"
              >
                DOWNLOAD LITEPAPER
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
        <div className="footer-tagline">Universal · Reliable · Clean</div>
        <div className="footer-copy">
          © {year} Power Stewardship Initiative · Frontier Markets Energy
          Governance
        </div>
      </footer>
    </>
  );
}
