# Invariants (the Elder Runes)

Bedrock rules for The Whimsy Machine and its documentation. Architecture and handoff notes adapt to circumstances; these do not. An agent may not edit, relax, or renumber them without explicit maintainer decree (D-109).

Identifiers are `INV-NNN`, permanent. Every invariant here must be cited somewhere outside this file, and every citation must exist here; `tools/check_docs.py` checks both directions.

## INV-001 Zero external dependencies (travelling light)
- **Axiom:** The browser runtime uses only authored HTML, CSS, ES modules, and the spell files; the documentation and asset tools use only the Python or Node standard library.
- **Rationale:** Portability, privacy, and the product's character depend on nothing that can vanish or phone home (D-001).
- **Enforcement:** `tests/static.test.mjs` (D-001); `tools/check_docs.py` imports only `re`, `sys`, `pathlib`. New dependencies need an accepted decision.

## INV-002 One fact, one home (the One Ring rule)
- **Axiom:** Every fact, state, decision, or boundary has exactly one authoritative file. Other files link to it.
- **Rationale:** Two copies drift, and a session cannot tell which one lies.
- **Enforcement:** The ownership table in `docs/README.md`; `tools/check_docs.py` rejects a sentence of 10 or more words, or a table row, that appears in two living documents (history sections exempt). Paraphrased duplicates still need review at consolidation.

## INV-003 Proof badges on current claims (ranger marks)
- **Axiom:** Every claim under "What works" in `docs/HANDOFF.md` carries one badge: `[OBSERVED]` (run this session), `[DEDUCED]` (follows from types, schemas, or invariants), `[CONTRACT]` (maintainer decree or specification), `[HYPOTHESIS]` (conjecture awaiting proof), or `[UNTESTED]` (not run this session).
- **Rationale:** Blurring proven and assumed is the commonest way a handoff misleads.
- **Enforcement:** `tools/check_docs.py` rejects an unbadged "What works" line.

## INV-004 Reciprocal integrity (the palantír)
- **Axiom:** Every `INV-`, `D-`, `Q-`, `T-`, and `P` reference resolves; every invariant is cited outside this file; every HANDOFF next step names an open roadmap item.
- **Rationale:** Dead references and abandoned intentions hide in one-way links.
- **Enforcement:** `tools/check_docs.py`.

## INV-005 The 80-line watchfire
- **Axiom:** "Current state" in `docs/HANDOFF.md` stays within 80 lines; the session log keeps at most 10 entries, older ones move to `docs/archive/`.
- **Rationale:** A handoff that does not fit on a screen buries what the next session needs first.
- **Enforcement:** `tools/check_docs.py` warns past either limit.

## INV-006 No Black Speech (the lexical firewall)
- **Axiom:** No em dashes in documentation prose, code comments, or commit messages. Use commas, semicolons, colons, or parentheses.
- **Exceptions:** User-visible UI typography, text inside code spans or blocks, archived history, and the fingerprinted score programs (`src/pad.piet`, `src/chimes.frac`, `src/conductor.i`), whose bytes are part of the determinism contract (INV-011, D-109).
- **Rationale:** Em-dash ruts and stock openers mark ungrounded generated prose; plain punctuation keeps attention on the claim.
- **Enforcement:** `tools/check_docs.py` scans the documentation and `src/*.mjs` comment lines.

## INV-007 Negative proof first (Sting's blue glow)
- **Axiom:** A new test is trusted only after it has been seen to fail on the unfixed code.
- **Rationale:** A test that passes either way proves nothing.
- **Enforcement:** The five-step trial in `docs/TESTING.md`; the session entry records the failing run.

## INV-008 Consolidation in dense prose (Elven sleep)
- **Axiom:** Lessons distilled at consolidation become single declarative rules under 25 words, in `AGENTS.md`, `docs/DECISIONS.md`, or here.
- **Rationale:** Diaries exhaust context; dense rules survive it.
- **Enforcement:** Finishing-a-change step 6 in `AGENTS.md`.

## INV-009 Ask, never guess (the Council of Elrond)
- **Axiom:** When intent, scope, or the part-whole fit admits several readings, stop and ask, or record a `Q-NNN`, before building. Never compile a silent assumption.
- **Rationale:** A five-second question beats hours on the wrong road.
- **Enforcement:** Start here step 5 and the While working rules in `AGENTS.md`.

## INV-010 No prior projection (ban Saruman's voice)
- **Axiom:** No build step, package manager, framework idiom, or directory role is assumed unless a file shows it.
- **Rationale:** A fresh session clears the chat, not the model's defaults; this repository has no bundler, no npm, and no framework.
- **Enforcement:** Start here step 4 in `AGENTS.md`.

## INV-011 Phrase determinism
- **Axiom:** The same phrase summons the same creature, score, and engine output across supported runs; a change to score-program bytes or golden fixtures bumps `ENGINE_VERSION`.
- **Rationale:** Shared omens, `.fun` files, and `#omen=` links mean nothing if a phrase drifts (D-003, D-077).
- **Enforcement:** Golden fixtures and `tests/engine-version.test.mjs`.
