---
language:
- zh
pretty_name: Chinese Text Chat Benchmark Showcase
license: cc-by-nc-4.0
task_categories:
- text-generation
tags:
- llm-evaluation
- chatbot
- conversation
- benchmark
- multi-agent
size_categories:
- n<1K
---

# Chinese Text Chat Benchmark Showcase

## What this is

This is a small Chinese conversation benchmark built for LLM evaluation showcase purposes.

It is not a raw chat dump. It is a curated, anonymized, interview-oriented benchmark that turns long-form conversation fragments into reusable evaluation cases.

## What is included

- `full 16`: 16 benchmark cases across 4 buckets
- `core 8`: 8 strongest showcase cases
- `48` baseline results from 3 models
- rubric and taxonomy-driven evaluation artifacts
- markdown source files for case assets, evaluation summary, and workflow notes

## Why this dataset exists

A model training or product evaluation team often has access to a large amount of conversation data, but the hard part is not volume. The hard part is deciding:

- which long conversations are worth studying
- which fragments can be turned into reproducible benchmark cases
- how to separate short tests from longer multi-turn tests
- how to map failures into a stable error taxonomy instead of vague impressions

This dataset is a small demonstration of that workflow.

## Benchmark structure

The benchmark groups user needs into 4 buckets:

1. surface advice, latent confirmation
2. surface analysis, latent test of whether the model can keep up
3. low-explicit emotional states that require active but restrained sensing
4. users with existing views who need calibration or challenge

Each case is written as a multi-turn evaluation segment and used to compare models under the same baseline setup.

## Intended use

This dataset is intended for:

- LLM evaluation demos
- chatbot product analysis
- internal benchmarking examples
- discussion of taxonomy-driven error analysis

## Not intended for

- production training without further review
- clinical or high-risk mental health use
- claims of broad representativeness

## Workflow behind the dataset

The dataset was produced through a multi-agent workflow:

- manager: planning, selection, coordination
- writer: case generation from candidate pools
- runner: baseline inference and structured outputs
- reviewer: rubric-based evaluation and taxonomy labeling

## Included source files

This public dataset does not only contain CSV overviews.

It also includes markdown source files for:

- `core_8` case folders
- `full_16` case folders
- final evaluation summary
- final curated case sheet
- interview-facing project notes

## Limitations

- small scale by design
- built as a showcase benchmark, not a comprehensive corpus
- optimized for interpretability and interview communication
- centered on Chinese conversational UX rather than open-domain QA

## Public showcase references

- GitHub repo: `https://github.com/Agaresd47/text-dialogue-benchmark-showcase`
- Repo index: `README.md`
- Core asset folder: `assets/core_8`
- Full asset folder: `assets/full_16`
