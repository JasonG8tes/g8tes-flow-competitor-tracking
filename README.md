# Competitive Price Scraping

Optional **flow** add-on. Separate from the flow spine (no 8-column board, no Identify→Transfer client gates).

Repo: `JasonG8tes/g8tes-flow-competitor-tracking`  
Register SoT: `register/flow_AddOn_Competitive_Price_Scraping_Register.xlsx` (v0.3.1 DRAFT)

## Hard rules (this build)

- Invented demo competitors only (`Demo Competitor Store A`, `Demo Omni B`, …)
- Client-side module — **no LLM to the client**
- Live scrape runs stay **off** until S-040 Legal/ToS = Yes *per source* **and** a later slice enables the runner
- This app **does not invent legal verdicts** — S-040 Allowed starts blank
- **Camofox** is the lab/test path for parsers (S-050 / S-060 remain Confidence LOW — scaffold, not proof)
- Registers are source of truth: CAPTURE / CARRY / CALC; no comment-only completion
- Attestations are background-only (Pass + who + when on CTA)

## First slice

| Step | What it records |
|------|-----------------|
| **S-010** | Leadership accepts (or declines) the scraping mechanism + scope (`store` / `online` / `both`) |
| **S-020** | Competition base = **competitors × hierarchy × store vs online** |

Also in the UI (not claimed complete):

- **S-040** Legal/ToS gate per source (explicit, unevaluated)
- **S-050 / S-060** Camofox lab scaffold — start buttons stay disabled
- Later steps shown as register stubs (match table, price index, health, disable)

## How to run

```bash
npm install
npm test
npm run typecheck
npm run dev
```

Open http://localhost:5173

### Demo walkthrough

1. Signed in as **Sam Okada (LD)**. Read the mechanism summary. Set SF001 = Yes, SF002 = both. **Record acceptance**. Notes alone will not close the step.
2. Switch to **Nora Blake (CM)**. Open **S-020**. **Load invented demo base** or add rows (code `COMP-…`, name starting with `Demo `, channel, hierarchy node). **Mark competition base complete**.
3. Open **S-040**. Sources appear with Legal Allowed **blank**. Switch to **Uma Frost (LG)** if you want to record a human verdict — the software will not pre-fill Yes.
4. Open **S-050** / **S-060**. Every start is blocked (legal gate + live scrape off + Camofox not proven).

`Reset demo` clears localStorage (`g8tes-flow-competitor-tracking.v1`).

## What is not claimed

Confidence LOW and left open (do not invent):

1. Legal/ToS per source (S-040)
2. Parser method + lab proof (S-050/S-060) — Camofox is the test path, not a completed proof
3. Match confidence scoring
4. At-par band thresholds
5. Reference RSP when promo is not enabled
6. Historical scrape retention
7. Commercial packaging (MED)

No sold AI agents. No flow-core UI. No former-employer or real marketplace names in demo data.
