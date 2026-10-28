# Founder Notes — 2026-10-28 (promo product review dump)
**Source:** Jason Goss, captured 28 Oct 2026 ~14:37 Asia/Dubai (UTC+4)  
**Desk:** G8tes Promo Coordinator — coordination only, no code, no commit  
**Status:** Structured and filed — all cards `captured` (none deferred, none rejected for track-fit)  
**Active product track unchanged:** lowercase **promo**. These cards deepen promo and continue `FN-2026-10-27-A..E`. No track switch.

**Product standing (all cards):** product name lowercase **promo**; invented/demo data only; no former-employer or partner names in demo data; no AI agents sold as product (any "agentic" item below = internal G8tes build help or capture automation, never a client-facing sold agent); register is source of truth; do not greenfield-rebuild — carry history.

---

## Build honesty (answer to "has Cursor done the exact research?")

| Question | Honest answer today |
|----------|---------------------|
| Did Cursor research which scientific forecast methods are best for this model, and why? | **No.** Cursor step **P-080 Scientific Forecast Generate** implemented register control **C-14** (block free-text/random forecast; DF051/DF052 must be CALCULATED). It did **not** run a methods review. |
| What formula is in the software? | Demo driver formula only: `DF051 TY Forecast Volume = DF014 LY Promo Volume × (1 + DF049 Organic Growth % / 100) × DF050 Deal Velocity Factor`; `DF052 TY Forecast Value = DF051 × DF039 Promo RSP (inc VAT)`. |
| What accuracy can be claimed? | **None** beyond "arithmetic on invented demo drivers." No back-test, no error bounds, no confidence interval. Organic growth / deal velocity are a **Confidence: Low stub**. Do not state an accuracy % on any show, deck, or website until card F research + back-test is done. |
| Other metrics being formulated? | Register has DF051/DF052 + DF053 Forecast Accepted Flag + P-160 actuals vs forecast close (C-18). Nothing further is formulated yet. |
| Clearance / near-expiry markdowns? | **Not in software.** Not in register. → Card G. |
| Department hierarchy (Department → Section → Category → Sub Category)? | **Not in software.** Register has a Departments tab for *users/roles*, not a merchandise hierarchy. → Card H. |
| Advertised leaflet / omni / non-advertised in-store; all vs selected stores flags? | **Not in software.** P-100 covers Omni/E-com flag + Weekend Killer type only. → Card I. |
| TCM report + all-in TCM with supplier rebate + management line review? | **Not in software.** Rebate terms DF003/DF004 are carried from supplier master but there is no TCM roll-up or line-approval step. → Card J. |
| Competitor price scraping? | **Not in software.** Prior research note exists in OneDrive (`promo/00_Research/P-EST-003 Camofox promo competitor price capture 2026-10-17.md`) — evidence capture only, not a build. → Card K (separate ADD-ON). |

---

# Idea card F — Scientific forecast methods honesty + stronger promo metrics/methods pack
**ID:** `FN-2026-10-28-F` · status `captured` · deepens `FN-2026-10-27-B` / P-080 / C-14

### 1. What is the idea?
Replace the "scientific" label on today's demo formula with an **honest, researched methods pack**: which forecasting methods promo should use (and why), what accuracy can be claimed and how it is measured, and which further metrics and methods make promotions stronger — better **product selection**, better **deal parameters**, and **smarter ways of work**.

### 2. What is the pain point?
- The software calls P-080 "Scientific Forecast" but the drivers (organic growth %, deal velocity factor) are typed-in stubs — Confidence Low.
- Buyers over-order or under-order because uplift is a guess; no one measures forecast error after the promo.
- Selection is driven by habit / supplier push, not by which SKUs actually responded last time.
- Deal depth is negotiated without a view of where extra discount stops buying extra volume.
- Claims of accuracy without proof damage credibility in front of a commercial director.

### 3. What is the solution?
- **Methods ladder (to be researched and chosen, not claimed yet):** (1) baseline + LY-uplift ratio (today); (2) like-for-like promo history by SKU × mechanic × depth × visibility (card I) × tier; (3) baseline-plus-lift decomposition (baseline sales + promo lift + cannibalisation/halo + post-promo dip); (4) depth-response curve per category (discount % → uplift); (5) optional statistical/ML models only when client history volume supports it.
- **Accuracy framework:** measure every closed promo at P-160 — forecast vs actual volume error, bias (systematic over/under), % of lines within tolerance band; publish accuracy only as "measured on N closed promos" per client.
- **Further metrics (candidates beyond DF051/DF052):** baseline volume; incremental volume; uplift % vs baseline; cannibalisation / halo; post-promo dip; forward-buy; stock-out-adjusted sales (link OSA C-17); promo ROI = incremental margin ÷ promo investment; funded vs unfunded discount; sell-through %; forecast error / bias.
- **Selection methods:** rank candidates by past incremental margin per slot; flag repeat underperformers; slot fit (space skeleton P-040).
- **Deal-parameter methods:** depth vs uplift guidance; mechanic comparison (price-off vs multibuy vs bundle); supplier-funding share target.
- **Ways of work:** P-160 learnings auto-feed next calendar round; forecast confidence label on every line (High/Med/Low) until back-tested.

### 4. Bigger picture / add-ons / building blocks
- Feeds card J (TCM needs a forecast qty) and card G (clearance needs a sell-through forecast).
- Uses card H hierarchy for category-level depth-response curves; card I visibility flags as a forecast driver (leaflet ≠ in-store only).
- Becomes a "methods & metrics" module of promo; accuracy reporting per client is a trust building block for sales.

### 5. Agent / AI agentic workflow (internal G8tes only — not sold)
- **Methods research helper:** G8tes-side literature + practitioner scan summarised for Jason to pick from (support only).
- **Back-test harness helper:** run candidate methods over *invented* LY/TY fixture data to show error bands before any real client data.
- **Confidence labeller:** automation that tags each DF051 line Low/Med/High by driver completeness.
- **P-160 learnings capture:** auto-collect forecast vs actual deltas into the next round's driver suggestions for human acceptance (DF053 stays human).

### 6. Research to validate / taste (experience-first)
- **From Jason:** which uplift assumptions did he actually defend on a real desk? What forecast error was "acceptable" to a commercial director? Which 3 metrics did management always ask for first?
- **Build-then-show:** invented 2-year fixture; show today's formula vs baseline-plus-lift side by side with error bands — Jason judges which is credible.
- **Support research (secondary):** published retail promo forecasting methods and typical accuracy ranges — used to pick a method, never to make a claim for promo.
- **Rule:** no accuracy % stated anywhere until measured on promo's own back-test.

**Register impact:** P-080 + P-160 fields/controls (see Register next actions).

---

# Idea card G — Clearance / near-expiry markdowns + recoverable supplier margin-loss recording
**ID:** `FN-2026-10-28-G` · status `captured`

### 1. What is the idea?
promo handles **clearance items** and **near-expiry markdowns** as a distinct promo type, and records **where the margin loss sits** — especially when it is **recoverable from the supplier** (claim / credit note / markdown support).

### 2. What is the pain point?
- Near-expiry stock is marked down ad hoc in store; margin loss disappears into shrink or store P&L.
- Supplier-recoverable markdown support is agreed verbally and never claimed — lost money.
- Clearance competes with planned promos for space and attention with no visibility.
- No audit trail of who approved a markdown and at what depth.

### 3. What is the solution?
- New promo type **Clearance / Near-expiry** (List_PromoTypes) with fields: expiry date / days-to-expiry, stock on hand, markdown % / markdown price, markdown step (staged markdowns), reason code (near-expiry / discontinued / overstock / damaged).
- **Margin-loss ledger:** markdown loss value = (original RSP − markdown RSP) × units sold at markdown; split into **Supplier-recoverable** (with claim reference, claim status: Not raised / Raised / Agreed / Credited / Rejected) vs **Retailer-borne**.
- Recoverable portion posts to the supplier claim line (links to rebate/funding — card J) so all-in TCM reflects it.
- Control candidate: markdown approval attestation (who + depth + when); claim must be raised within X days for recoverable lines.

### 4. Bigger picture / add-ons / building blocks
- Funding Line (DF042) gains a "markdown support" value; TCM (card J) shows recoverable vs borne.
- Feeds OSA / substitution (E) and stock need (P-090).
- Future add-on: expiry-date feed from client WMS/ERP export (upload, not integration first).

### 5. Agent / AI agentic workflow (internal G8tes only — not sold)
- **Claim-chaser automation:** notification (C-05 pattern) when a recoverable claim is unraised or overdue.
- **Days-to-expiry flagger:** from uploaded stock file, flag lines entering the markdown window.
- G8tes build help: draft field list + reason codes for Jason review.

### 6. Research to validate / taste (experience-first)
- **From Jason:** how were near-expiry markdowns approved and staged on desks he ran? Which suppliers typically fund markdowns and how was it claimed (credit note vs deduction)? Where did the loss *actually* land in the P&L?
- **Build-then-show:** invented clearance list with staged markdowns and a recoverable/borne ledger — Jason checks the claim flow matches reality.

---

# Idea card H — Merchandising hierarchy: Department → Section → Category → Sub Category
**ID:** `FN-2026-10-28-H` · status `captured`

### 1. What is the idea?
Every promo line carries the client's **merchandise hierarchy** (Department → Section → Category → Sub Category, extendable e.g. Brand / Segment) so plans, forecasts, TCM and reports roll up and filter by level.

### 2. What is the pain point?
- Management reviews by department/category, but promo lines are flat SKU lists.
- Category managers cannot see their share of slots, investment, or margin.
- Each retailer names hierarchy levels differently — hard-coded levels break.

### 3. What is the solution?
- Client setup upload (extends card C / P-010): hierarchy master file with configurable level names and depth (default 4 levels).
- Item master maps each SKU to a Sub Category; higher levels CARRY read-only (C-07 pattern).
- Roll-ups: count of lines, forecast qty, forecast value, margin, deal investment, rebate, all-in TCM per level.
- Filters and subtotals in every report; hierarchy also drives competition base mapping in card K.

### 4. Bigger picture / add-ons / building blocks
- Foundation for J (TCM by hierarchy), F (category depth-response curves), I (visibility mix by category), K (competitor set per department/category).
- Reusable building block across G8tes skeletons (any retail product needs hierarchy).

### 5. Agent / AI agentic workflow (internal G8tes only — not sold)
- **Hierarchy mapping check:** flag SKUs with no Sub Category or orphan levels on upload.
- G8tes build help: generate invented 4-level demo hierarchy (no real retailer naming).

### 6. Research to validate / taste (experience-first)
- **From Jason:** the exact level names and depth he used; is Section always present or optional? Which level does management approve at?
- **Build-then-show:** invented food FMCG hierarchy with roll-up subtotals — Jason confirms the review level.

---

# Idea card I — Promo visibility flags: leaflet / omni advertised / non-advertised in-store; all vs selected stores
**ID:** `FN-2026-10-28-I` · status `captured` · extends P-100 / `FN-2026-10-27-D`

### 1. What is the idea?
Each proposed promo line carries a **visibility flag** — **Advertised (leaflet)**, **Advertised omni-channel**, **Non-advertised in-store** — and a **store scope** — **All stores** or **Selected stores** (with store list / cluster).

### 2. What is the pain point?
- Leaflet slots are scarce and expensive; no structured list of which items are proposed for the leaflet vs in-store only.
- Omni pricing and in-store pricing drift apart unnoticed.
- Store-specific promos are tracked in email; stock and forecast are planned as if chain-wide.
- Forecasts ignore that leaflet-advertised items lift more than unadvertised ones.

### 3. What is the solution?
- Fields: Visibility (multi-select: Leaflet / Omni / In-store non-advertised), Store scope (All / Selected), Store list or cluster (from store master upload).
- Validation: leaflet lines must fit leaflet slot count (space skeleton P-040); selected-store lines require at least one store.
- Forecast (F) and stock need (P-090) scale by store scope; visibility is a forecast driver.
- Omni flag links to omni competitor check (card K add-on).

### 4. Bigger picture / add-ons / building blocks
- Extends P-100 Omni/E-com flag + Weekend Killer.
- Feeds leaflet production critical path (E), TCM by visibility (J), scraping scope (K).

### 5. Agent / AI agentic workflow (internal G8tes only — not sold)
- **Slot-count checker:** flag over-subscribed leaflet pages.
- **Price-parity flag:** omni vs in-store promo price mismatch alert (rule-based).

### 6. Research to validate / taste (experience-first)
- **From Jason:** is "omni advertised" separate from leaflet in practice, or usually both? How were selected-store promos chosen (cluster, region, format)?
- **Build-then-show:** invented leaflet plan with 3 visibility types and a selected-store cluster.

---

# Idea card J — TCM lever: hierarchy report + all-in TCM + management line review
**ID:** `FN-2026-10-28-J` · status `captured`

### 1. What is the idea?
promo ultimately produces a **TCM (Total Commercial Margin) lever report** listing all products by department hierarchy with **forecast quantity**, **total margin**, **supplier deal % or value** → **TCM**; then a **separate rebate field pulled from the supplier file** → **all-in TCM**. The review goes to **management**, who **comment on each line** and **approve** or **suggest a price change**.

### 2. What is the pain point?
- Front margin, deal funding and back-margin rebates live in different files; nobody sees the true all-in margin of a promo plan.
- Management approves in meetings/email with no line-level record.
- Price-change suggestions get lost between management and buyers.
- Recoverable markdowns (G) and rebates are not reflected in the promo decision.

### 3. What is the solution?
- **Report columns (per line, rolled up by hierarchy H):** SKU, hierarchy levels, visibility/scope (I), forecast qty (DF051), promo RSP (DF039), promo cost (DF040), front margin value & %, deal % / deal value (DF036 + value), **TCM** = front margin + supplier deal funding; **rebate** (DF003/DF004 carried from supplier file, separate field); **all-in TCM** = TCM + rebate (+ recoverable markdown support from G where relevant).
- **Management review step (new):** per line — Comment (structured, required on reject), Decision (Approve / Reject / Suggest price change), Suggested RSP, Reviewer, Timestamp. Price-change suggestion recalculates margin/TCM and routes back to buyer (CM) for accept/counter.
- Controls candidates: separation of duties (C-02) — buyer cannot approve own lines; plan cannot lock (P-110) until all lines decided; immutable trail (C-01).
- VAT/margin basis per Finance confirmation (open item already logged on DF039).

### 4. Bigger picture / add-ons / building blocks
- Becomes the management "front page" of promo — the commercial director's view.
- Competitor price index from K shows next to suggested price change.
- Export to Excel / Teams for M365-native review.

### 5. Agent / AI agentic workflow (internal G8tes only — not sold)
- **Rebate pull reconciler:** flag lines where supplier file has no rebate or rebate differs from master.
- **Review queue notifications** (C-05): management lines pending, buyer counter-proposals pending.
- **Margin-floor flag:** rule-based warning when all-in TCM % below client threshold.

### 6. Research to validate / taste (experience-first)
- **From Jason:** exact TCM definition he used (is rebate inside or outside TCM; is markdown support included?) and the management review format he wants replicated.
- **Build-then-show:** invented 30-line plan with hierarchy roll-up and a mock management review pass — Jason checks numbers reconcile.

---

# Idea card K — Competitive price scraping ADD-ON (+ separate add-on register)
**ID:** `FN-2026-10-28-K` · status `captured` · **separate build linked to promo** · prior evidence: `P-EST-003` (00_Research)

### 1. What is the idea?
A **separate add-on build** that links to promo and checks whether the **promotional selling price is competitive** against the **client-defined competition base**:
- **Store competitor scraper:** market players the client defines as direct competitors.
- **Omni / online scraper (separate tool):** online players (e.g. Noon, Amazon and similar) defined by the client **per department / category**.
- Runs **without an LLM supplied to the client** — using **only the client's own internet connection**.
- Becomes an **ADD-ON** to promo once the scraping method is understood.

### 2. What is the pain point?
- Promo prices are set blind to competitors; a "deal" can be dearer than a competitor's everyday price.
- Manual competitor checks are slow, partial and out of date by leaflet print.
- Online players move price daily; omni promo price needs its own comparison.
- Third-party price-intelligence services are expensive and generic (not the client's own competition base).

### 3. What is the solution?
- **Competition base setup (client-defined):** competitor list × hierarchy level (H) × channel (store vs online); product matching table (client SKU ↔ competitor product / URL / barcode).
- **Scraper runs client-side** (client internet connection; deterministic parsers / browser automation, no LLM to client); results stored with timestamp, source, price, promo flag.
- **Price index in promo:** promo RSP vs competitor min / avg; flags: Competitive / At par / Not competitive; shown on TCM review (J) to justify price-change suggestions.
- **Separate add-on register** (own process steps, fields, controls) under promo Context — see Register next actions.
- Legal/terms-of-use and robots constraints assessed per source before build.

### 4. Bigger picture / add-ons / building blocks
- Priced and sold as a promo ADD-ON (module), not bundled by default.
- Reusable for everyday pricing / KVI monitoring later (separate future add-on).
- Links to I (omni flag selects which lines need online scrape) and H (competitor set per category).

### 5. Agent / AI agentic workflow (internal G8tes only — not sold)
- G8tes build help: prototype parsers and matching rules on invented/public test products in the lab; nothing LLM-based is deployed to the client.
- **Match-quality checker:** flag low-confidence SKU ↔ competitor matches for human confirmation.
- **Scrape health monitor:** alert when a source layout changes and parser fails.

### 6. Research to validate / taste (experience-first)
- **From Jason:** how competition bases were defined on desks he ran (how many competitors per category; store vs online); how often prices were checked and who acted on them.
- **Feasibility taste (build-then-show):** small lab proof scraping 2 public online sources for ~20 invented-basket products, run from a normal internet connection without an LLM — show Jason the price index.
- **Support research:** source terms of use / legal position in UAE; prior `P-EST-003` evidence note.

---

## Register next actions
1. **Next promo register round** — fold F–J into `promo_Process_Register.xlsx` (OneDrive `promo/00_NEW_Cursor_Context/`, item `01AK3JE57C63YVRA4FORAI2RNY4ELFMM2I`): new fields continuing after DF091 (forecast confidence/metrics F; clearance + margin-loss ledger G; hierarchy H; visibility + store scope I; TCM, rebate, all-in TCM, management decision/comment/suggested RSP J); new controls continuing after C-19; new step(s) for clearance and management TCM review; Change_Log entry; List_PromoTypes add Clearance/Near-expiry. **Carry history — do not greenfield-rebuild.** Assess the register for another research round as part of this.
2. **New add-on register file** for K — e.g. `promo_AddOn_Competitive_Price_Scraping_Register.xlsx` under promo Context, same tab pattern (Process_Register, RACI, Fields, Controls, Change_Log), linked to promo fields (DF039 Promo RSP, hierarchy, visibility flag).
3. Cursor P-080 stays as-is (demo formula, C-14) until F research picks a method; no accuracy claim.

## Experience-first next ask for Jason
Which card do you want to taste first — **J (TCM management review)** as the commercial front page, or **F (forecast methods)** so the numbers behind J are defensible? And: is supplier rebate **outside** TCM (only in all-in TCM) as you described — confirm that definition.
