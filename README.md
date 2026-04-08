# Chinese Dialogue Benchmark Project

This repository is a public showcase project for roles related to Chinese LLM products, evaluation, training, and data strategy.

**[Chinese README](https://github.com/Agaresd47/text-dialogue-benchmark-showcase/blob/main/README_ch.md
)**

## Live Showcase

**[Web entry](https://agaresd47.github.io/text-dialogue-benchmark-showcase/)**

:

``

## Overview

This project is presented as a Chinese dialogue benchmark prototype. Its goal is not to showcase isolated examples or produce a context-free model ranking. Instead, it demonstrates how high-value windows can be identified from long-running real Chinese conversations and distilled into evaluation assets that are reusable, comparable across models, and extensible over time.

The current public release includes a `core 8` showcase subset, a `full 16` benchmark, `48` baseline results, and a multi-judge sensitivity check built on `4` representative cases. The emphasis is not on scale alone, but on the full workflow from long-form dialogue mining to sample construction, evaluation design, result analysis, and synthesis.

## What This Project Tries to Show

This project is designed to demonstrate the following capabilities:

- identifying high-value dialogue windows from real long-context conversations
- compressing long-context interaction problems into public benchmark cases
- comparing stable model differences at the strategy level with a shared rubric and error framework
- turning evaluation outputs into assets useful for product analysis, training discussions, and portfolio presentation

## Core Contributions

My work on this project mainly includes:

- **Sample distillation:** selecting high-signal cases from long-running real conversations that capture recurring latent user needs
- **State design:** organizing cases into four recurring user-state patterns
- **Evaluation design:** defining a shared rubric and error classification framework for the benchmark
- **Baseline organization:** running, structuring, and analyzing `16` cases across `3` models, for a total of `48` outputs
- **Supplementary validation:** adding Gemini and Claude as judges for a multi-judge sensitivity check on representative cases
- **Showcase build:** turning `core 8` into a static page for public presentation and interview use

## Four User-State Categories

- `B1`: asks for advice, but mainly wants confirmation
- `B2`: sounds analytical, but is really checking whether they are understood
- `B3`: signals are implicit and require active recognition
- `B4`: already has a view and needs calibration plus acknowledgment

## Sample Selection Principles

This project does not prioritize scale expansion. The current benchmark follows a quality-first selection strategy. Formal cases are included when they:

- sound close to real everyday expression
- contain identifiable latent needs
- produce stable differences between weak and strong responses
- represent a distinct interaction problem clearly
- can be understood without heavy background knowledge

Based on these principles, the public benchmark keeps `16` formal cases, with `core 8` selected as the main showcase subset.

## Evaluation Scope and Judge Sensitivity

The current public results for `full 16` use `ChatGPT` as the main judge. This should not be interpreted as a single ground truth for dialogue quality. Different users and product teams can reasonably prefer different response styles.

To avoid overstating the current ranking, the repository also includes a multi-judge sensitivity check on `4` representative cases, with three judging setups:

- `ChatGPT`
- `Gemini`
- `Claude`

This supplementary check shows that ranking depends not only on the responder, but also on the judge's preference for what an ideal reply looks like. In the current probe, `B1`, `B2`, and `B4` are more likely to be ranked in favor of `Claude`, while `B3` is more likely to favor `Gemini`.

The current ranking is therefore better read as a judge-relative result rather than a universal ordering.

## Main Takeaway

The most important finding is not a simple first-place ranking. The stronger pattern is that major model differences do not mainly lie in wording style, but in whether a model can infer what kind of response the user needs at that moment: acknowledgment, pacing, boundary control, forward movement, or continuity of the relationship.

Across the current benchmark, major LLMs already show relatively stable default styles. What they still lack is fast strategy switching across different user states and interaction contexts.

## Relevance to Product, Evaluation, and Training Work

This project is especially relevant to:

- **product work:** default dialogue strategy should not be one-size-fits-all, but should adapt by turn and by user state
- **evaluation work:** conversation eval should not assume that one judge defines the only correct answer
- **training work:** high-value data construction should strengthen specific failure categories rather than simply expand volume
- **data strategy work:** single-turn prompts often miss failure modes that only appear in later turns of continuous interaction

## Extension Directions

The current benchmark mostly covers low- to medium-intensity emotional settings, including light suspension, light confirmation, light calibration, and light companionship. If expanded further, the priority should not be to add more cases of the same type, but to extend along **emotional intensity** and test whether the same latent need requires different response strategies in higher-intensity situations.

A longer-term direction is to systematize the full pipeline: long-dialogue segmentation, candidate scoring, short- and long-form case construction, and downstream error analysis.

## Access

Live showcase:

- `https://Agaresd47.github.io/text-dialogue-benchmark-showcase/`

The root [index.html](./index.html) is the current static entry for browsing the `core 8` showcase.

Local preview:

```bash
cd showcase_app
python app.py
```

Then open `http://127.0.0.1:8008`.

## Repository Structure

- `index.html` / `showcase.css` / `showcase.js` / `showcase-data.js`
  - static showcase files
- `assets/`
  - `core_8/`: 8 showcase cases
  - `full_16/`: full 16-case benchmark assets
  - `dataset/`: final input set and JSONL
  - `eval/`: main `ChatGPT` results and the multi-judge sensitivity appendix
- `showcase_app/`
  - local preview page

## Core Question

When a team already has a large body of long-running dialogue data, the key questions are not simply about collecting more observations, but about:

- which dialogue windows are worth studying
- which windows can be turned into high-signal benchmark cases
- what stable failure patterns emerge across models on the same cases
- whether those failures can be compressed into a reusable error framework rather than left as vague impressions

This repository presents a minimal executable version of that path.
