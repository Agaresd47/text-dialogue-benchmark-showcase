# Text Dialogue Benchmark Showcase

This repo is a compact showcase for a Chinese text-dialogue benchmark and the multi-agent workflow used to build it.

It is designed for interview and portfolio use, but the underlying idea is practical: if a model training or product evaluation team already has a large store of long conversations, this workflow can help turn them into reusable benchmark cases, baseline runs, and taxonomy-driven evaluation assets.

## Repo Structure

- `showcase_app/`
  - lightweight Python app for local demo
- `assets/`
  - `core_8/`: strongest showcase cases
  - `full_16/`: full benchmark assets
  - `dataset/`: final case sheet and baseline input
  - `eval/`: final evaluation summary
  - `showcase_data/`: summary data used by the app

## Recommended Entry Points

- [PROJECT_BRIEF.md](./PROJECT_BRIEF.md)
- [RESULTS_ANALYSIS.md](./RESULTS_ANALYSIS.md)
- [MULTI_AGENT_WORKFLOW.md](./MULTI_AGENT_WORKFLOW.md)
- [assets/eval/eval_batch2.md](./assets/eval/eval_batch2.md)

## Run The Demo App

```bash
cd showcase_app
python app.py
```

Then open `http://127.0.0.1:8008`.

## What This Showcase Demonstrates

- extracting high-value fragments from long dialogue data
- rewriting noisy source material into reusable benchmark cases
- running the same `16 cases × 3 models = 48 results`
- analyzing failures with a stable rubric and taxonomy
- coordinating the workflow through manager / writer / runner / reviewer roles

## Public Dataset Card

The mirrored Hugging Face dataset card is here:

- `https://huggingface.co/datasets/agaresd/text-dialogue-benchmark-showcase`
