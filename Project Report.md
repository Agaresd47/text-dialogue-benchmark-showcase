# Project Report

## Project Goal

This project is presented publicly as a Chinese dialogue benchmark prototype, but its core value does not lie in simply collecting cases and scores. Its main contribution is to turn experience from real long-running conversations into a reusable pipeline for sample distillation, evaluation design, and result analysis.

My work in this project covers four main parts. First, I identify research-worthy windows from a million-word-scale pool of real long conversations and compress them into candidate sets and formal cases. Second, I organize user behavior into four recurring user-state categories based on latent interaction needs, and define what each category is meant to test and where models commonly fail. Third, I provide the benchmark with a shared rubric and error classification framework so that model outputs can be compared in a more structured way. Fourth, I organize baseline runs, select the final sample set, analyze model differences, and package the results into materials suitable for public presentation and interview discussion.

What this project aims to demonstrate is not how many cases can be written, but whether real dialogue experience can be turned into a coherent workflow for data distillation, evaluation design, and result interpretation.

## Background

The project did not begin as an attempt to archive chat logs or present a personal usage story. It began with a question closer to training and evaluation practice: when a team already has a large body of long-horizon real conversations, how can it identify the windows that are actually worth studying, and compress them into evaluation assets that are reusable, comparable across models, and extensible over time?

The key issue is therefore not data scale in itself, but how high-value samples are found, defined, and evaluated. What the project aims to present is not just a case collection, but a small closed-loop benchmark prototype that shows how major Chinese dialogue problems can be abstracted into sample design, rubric design, error analysis, and product-facing hypotheses.

## Data Source and Truncation Strategy

The upstream source for the project is a large set of real Chinese long-form conversations, totaling more than one million words. This pool is large enough to support many more cases, but simply turning scale into a larger public benchmark would not automatically improve research value. As sample count grows quickly, case quality, selection standards, evaluation consistency, and explanatory clarity often deteriorate together.

For that reason, the project uses a staged truncation strategy. The first layer is the research pool, which preserves the large body of real conversations while keeping private material out of the public showcase. The second layer is the candidate layer, which compresses the raw dialogues into candidate sets so that later case generation does not require repeated full-document review. The third layer is the formal benchmark layer, which currently ends at `full 16`, with `core 8` selected as the subset most suitable for public presentation and model comparison.

This design keeps the project expandable to `50+` or `100+` cases in the future while avoiding low-quality scale for its own sake.

## Benchmark Design

The cases are not organized by topic. They are organized by latent user-state patterns in dialogue. The four resulting categories correspond to the following situations: the user appears to ask for advice but actually wants confirmation; the user appears to be analyzing but is really checking whether they are understood; the user expresses signals implicitly and requires active recognition; the user already has a position and needs calibration plus acknowledgment.

The point of this design is that Chinese dialogue systems often fail not because they miss the topic, but because they misread what kind of interaction the user actually needs.

Each case is compressed into a formal evaluation segment spanning `Q11-Q13`, with baseline continuation through `q15`. This structure is important because many models look acceptable in the first few turns, while stable differences often emerge only later. Some models start prescribing too early, some close the conversation too quickly, and some drift into abstract explanation or template-like reassurance. The benchmark therefore focuses not only on first-turn quality, but on strategy stability across a short stretch of continuous interaction.

To make comparison more consistent, each case is paired with a shared rubric and error classification framework. The rubric focuses not on factual correctness, but on dimensions closer to product quality: whether the model identifies the surface issue, captures the latent need, selects an appropriate response strategy, maintains natural tone, keeps stable boundaries, and moves the conversation forward. The error framework turns vague impressions into reusable categories such as premature advice, preachy explanation, over-inference, overly elevated framing, or excessive caution.

## Current Results and Main Findings

At the current stage, the project has a complete `full 16` benchmark and `16 × 3 = 48` baseline outputs across three models. The public main results use `ChatGPT` as the judge. This should not be read as a claim that dialogue quality has a single objective ground truth. Different users and product teams may legitimately prefer different kinds of ideal replies.

Even so, the current round supports several useful conclusions. Under the present `ChatGPT` judging setup, `gpt-5.4-mini` performs most consistently like natural dialogue in Chinese emotional support and clarification scenarios. Its strongest pattern is a steady sequence of acknowledgment, judgment, and a light forward step. Its main weakness is not misunderstanding, but a tendency in later turns to shift too early into problem-solving mode, which can make the response feel slightly over-structured.

`claude-haiku-4-5-bedrock` is comparatively stable in boundaries and restraint, and is less likely to drift off course. Its main issue is weaker continuation in later turns: it often closes down too early in order to avoid mistakes.

`gemini-3-flash-preview` is strong at fast abstraction and pattern summarization, but also the most likely to move into an explanatory stance. That leads more easily to conceptualization, over-inference, and over-explanation, making the answer drift from dialogue toward commentary.

At the case level, `B2-PRODUCT-01`, `B4-CALIBRATION-01`, `B1-CONFIRM-01`, `B1-CONFIRM-03`, and `B4-RELATION-01` show strong showcase value, while `B3-SUSPEND-01` is the most important reinforcement sample in the current round. It broadens `Bucket 3` beyond a narrow low-energy companionship state into a more suspended intermediate state, making the `core 8` set more complete.

The project also includes a supplementary multi-judge sensitivity check over `4` representative cases, using `Gemini` and `Claude` as additional judges for `B1-CONFIRM-01`, `B2-PRODUCT-01`, `B3-LIGHT-01`, and `B4-CALIBRATION-01`. The value of this probe is not to identify a final champion, but to show that conversation evaluation is materially affected by judge preference. The top responder under `ChatGPT` changes under the additional judges: `B1`, `B2`, and `B4` more often favor `Claude`, while `B3` more often favors `Gemini`.

This makes a broader point clearer: different relational needs, emotional states, and user positions call for different response strategies, yet current models still rely too heavily on their default style instead of adapting quickly to the interaction at hand.

## A Working Product Hypothesis

Beyond ranking and strong cases, one of the more important outputs of this project is a working strategy hypothesis. Based on the current cases and results, I suspect that strong dialogue models should not maintain one fixed style throughout the conversation. Instead, they likely need a response strategy that varies by turn, by user agency, and by emotional intensity.

In the opening phase, the system first needs to create a space in which the user is willing to continue. At this stage, acknowledgment speed and emotional reading matter, but the response should not rise too quickly into abstract explanation. In the middle phase, strategy should split by user agency: users with a clear position need more calibration and alignment, while users who are confused or passive need lighter structure and gentler forward movement. Effective replies at low or medium emotional intensity may also fail in higher-intensity states such as acute pain, confusion, or rupture. As for later turns, the current results already suggest that this is often where stable differences emerge, but not enough evidence exists yet to claim a settled ideal pattern.

## Extension Direction and Current Conclusion

If the project continues to expand, the most reasonable path is not simply to scale from `16` cases to `100`. A more valuable direction is to systematize the full pipeline from upstream dialogue processing to downstream error analysis. That would include segmenting long conversations, scoring candidate windows for research value, rewriting high-value windows into short- and long-form test cases, and using a shared error framework to track stable failure sources that can be fed back into prompts, policy, SFT data, preference data, or reward design.

If more samples are added, the most important dimension to extend is not just quantity, but emotional intensity. The more useful question is whether the same latent need requires different forms of acknowledgment and guidance in higher-intensity situations.

At its current stage, the project already sits at a reasonable truncation point. Its sample size is large enough to support a persuasive benchmark, its evaluation workflow is strong enough to show extensibility, and its analysis is already rich enough to support a research-oriented narrative. The key public value is not that more cases could still be added, but that a large pool of real long-form dialogue has already been compressed into an interpretable, reusable, and extensible Chinese dialogue evaluation prototype.
