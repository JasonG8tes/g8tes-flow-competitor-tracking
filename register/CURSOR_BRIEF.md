# Cursor instruction — Register-driven builds for flow + Competitive Price Scraping add-on
**Filed:** 28 Oct 2026 Asia/Dubai  
**Updated:** 28 Oct 2026 Asia/Dubai (**v0.3.1** — titles-only MVP + Camofox + Vendor Contracts out of Flow desk)  
**Product names:** lowercase **flow**; add-on **Competitive Price Scraping** (optional client module).  
**Desk:** Grok Bot / G8tes Flow Coordinator — coordination only; does not write app code or touch Founders Dash.

**Standing (Management / Jason):**
- 27 Oct: Claude Code keeps Dash (`G8tes/G8tes`) and clones to flow later. Flow must **not** *sell* agent links as the product. This Context folder is SoT.
- 28 Oct **t3u**: Default gates = **01 Identify → … → 08 Transfer** (titles). Add-on repo = `JasonG8tes/g8tes-flow-competitor-tracking`. Jason connects Cursor for that repo himself.
- 28 Oct **t4u (AUTHORITATIVE for MVP shape):**
  - Use **only the eight stage TITLES** — **not** G8tes Idea-to-Transfer process context (commercial teams differ).
  - **ONE MAIN dashboard** summarises client projects + promo status + launch status → links into each tool.
  - **ONE PM screen** = supercharged Trello board (8 columns).
  - Flow = layer on top of promo + launch. Build to MVP (no deep detail).
  - Calendar/email + SharePoint bring-forward = research / later slice (M365-native assist — **not** a sold AI-agent SKU). OPEN for Management on “assist” vs “no agent links” wording.
- 28 Oct **t5u:** Competitor tracking straightforward; **Camofox = test path**; no further founder input needed.
- 28 Oct **t9u:** This desk = **Flow + competitive price tracking ONLY**. Vendor Contracts = other coordinator.

**Registers are DRAFT READY (v0.3.1) in this folder and are the source of truth.** Do not invent fields. Load:

1. `flow_Process_Register.xlsx` — core flow spine (+ `List_DefaultGates` titles-only purposes)  
2. `flow_AddOn_Competitive_Price_Scraping_Register.xlsx` — separate add-on

Also read: `REGISTER_BUILD_NOTES.md`, `EIGHT_STAGE_PM_RESEARCH.md`, `MVP_SHAPE.md`, `SUPERSEDE.md`, `FOUNDER_NOTES_2026-10-28_flow.md` (morning A–D + correction banner), `FOUNDER_NOTES_2026-10-28_flow-dashboard-board-mvp.md` (L/M/N). SCM companion in this folder = **REFERENCE ONLY**.

**Sheets you must load for every step UI (each register):**  
`Process_Register` + `Step_Fields` + `Fields` + `Controls` + `Artifacts` + `Artifact_IO` (+ `RACI_Matrix`). For gate/board UI also `List_DefaultGates` + `List_FrameworkModes`.

---

## Rules

1. Each register is SoT: **CAPTURE** / **CARRY** / **CALC** / exact output / gate.
2. Owner’s primary action records CAPTURE — **not** a free-text comment.
3. UI shows CAPTURE / CARRY / CALC + controls for the current step only.
4. Comment-only screens rejected. Invented data only. V8.1. No AI agents sold. Do not market agent links as the Flow product.
5. Attestations = BACKGROUND only (Pass + who + when).
6. Confidence **LOW** = stop and ask Management. Gate **titles** HIGH; **pass criteria** LOW; column purpose text = suggested guidance MED.
7. CRM out of scope. Contract / SCM = **status/entry hooks only** (F-140…F-150). **Vendor Contracts product owned by G8tes Vendor Contracts Coordinator** — do not build SCM registers or deep contract UI from this Flow brief.
8. Client board columns = **titles only** — empty labels clients fill; do not paste G8tes Blueprint/price/internal research-chain prose into UI.

---

## Repo / branch rules

### Competitive Price Scraping add-on
- Work in **`g8tes-flow-competitor-tracking`** only (Jason connecting Cursor).  
- **Camofox** = lab/test path for scrapes.  
- Do **not** create another scraper repo. Do **not** push over Founders Dash.  
- After bootstrap if Management authorises: never push `main` from Cursor — `cursor/<topic>` branches; PR for merge.

### Flow core
- **Stop and ask Management** which repo is the base — **or** wait for Claude Code’s Dash→flow clone.  
- **Do not launch flow Cursor work from this brief alone.**  
- Do **not** push over Founders Dash.

### Shared
- Drive: read Context provided. No former-employer data.
- Scraper: client-side; no LLM to client; Legal/ToS S-040 before scrape runs.

---

## First build slices

### A — flow core — **blocked until base repo named / clone exists**

**Recommended first UI slice (dashboard-first — matches Jason t4u MVP words):** Prefer **main dashboard shell + one-screen 8-column board skeleton** first, with **F-050 Project Create** as the CAPTURE path that places a card on the board — not a narrow F-050-only form ahead of the home page. See `MVP_SHAPE.md` and research §8. Do **not** implement deep Vendor Contracts UI here.

Default column titles from `List_DefaultGates`. Do **not** invent pass checklists. Do **not** show G8tes Idea-to-Transfer context as client gate law.

Acceptance (dashboard + board + F-050):
- [ ] Main page shows invented Demo Retailer summaries for projects / promo / launch + tool links  
- [ ] Board shows 8 titled columns only; card has owner, target date, blocker, next action (± promo/launch link)  
- [ ] F-050 CTA writes project record — no comment-only close  
- [ ] Register sheets are the field source  
- [ ] Invented data only; no sold-agent framing  
- [ ] Gate titles from `List_DefaultGates` when Framework Mode = Default_8  

Calendar/email/SharePoint bring-forward = **later slice** (card N) — not required for first acceptance.

### B — Competitive Price Scraping (`g8tes-flow-competitor-tracking`)

Implement **S-010** then **S-020** from the add-on register. Do not enable scrape runs until S-040 Legal/ToS = Yes per source (do not invent verdicts). Lab/test with **Camofox**.

Acceptance (S-010 + S-020):
- [ ] Explicit client acceptance of scraping mechanism  
- [ ] Competition base = competitors × hierarchy × store vs online  
- [ ] Separate from flow spine UI  
- [ ] No LLM to client; invented demo competitors only  
- [ ] Code in `g8tes-flow-competitor-tracking` only  

Parser lab (S-050/S-060) remains Confidence LOW — Camofox is the test path, not a completed proof claim.

---

## Stop and ask Management if

- Changing hard gates, DF/SF codes, or removing CARRY fields  
- Inventing per-gate **pass criteria**  
- Pasting G8tes Idea-to-Transfer context into client board UI as mandatory process  
- Creating a third scraper/flow repo  
- Touching Founders Dash live paths without Claude ownership rules  
- Starting **flow core** Cursor before base is named / clone exists  
- Shipping comment-only completion  
- Inventing legal clearance, match formulas, or at-par bands  
- Shipping a sold “email/SharePoint agent” SKU on Flow  

---

## Confirm

You will **not** accept comment-only completion. Registers first. Two builds: flow core (base TBD; dashboard+board MVP) and competitor-tracking (named repo; Camofox test). Titles only on client board; pass criteria still Management.
