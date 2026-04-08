# Evaluation Report

> Author note: for this benchmark prototype, I was responsible for case distillation, group design, baseline organization, result analysis, and final synthesis.

## Abstract

This report presents a small behavioral evaluation project for Chinese text dialogue. Starting from a long-running pool of real Chinese conversations, the project selects high-value windows, constructs `16` formal evaluation cases, and organizes them into `4` recurring user-state categories. It then compares three mainstream models on stable differences in latent-need recognition, response stance, pacing, boundary control, and continuity of the relationship.

The goal is not to produce a context-free global ranking of chat quality. The goal is to explore a workflow that is more useful for training, evaluation, and dialogue product work: extracting high-signal windows from long conversations, compressing them into a reusable public benchmark, and analyzing strategy-level failures with a shared rubric and error classification framework.

The current version includes the `full 16` benchmark, the `core 8` showcase subset, and `16 × 3 = 48` baseline outputs. The public main results use `ChatGPT` as the primary judge and are supplemented by a multi-judge sensitivity check on `4` representative cases. The results suggest that the three models differ less in surface wording than in whether they can infer the kind of response the user needs at a given moment. They also show that ranking is meaningfully affected by judge preference. Based on these observations, the project proposes a working hypothesis: strong dialogue systems may need to adapt response strategy by turn, by user agency, and by emotional intensity, rather than maintaining one fixed style throughout.

## 1. Problem Definition

Common failures in Chinese dialogue are not limited to factual errors or hallucinations. In emotional support, clarification, companionship, and light relationship-building tasks, many of the harder and more frequent failures occur at the interaction-strategy level. The model may miss the user's latent need, choose the wrong response stance, become overly detached when challenge is not appropriate, close the interaction too early when forward movement is needed, or drift into template-like reassurance and abstract explanation in later turns.

These problems are hard to evaluate consistently because they usually depend on long conversational context. Single-turn prompts often fail to expose drift and instability in continuous interaction, while publishing full dialogues introduces privacy, noise, and reusability problems. The first question of this project is therefore methodological: can a small but high-signal benchmark be distilled from long-running real conversations to compare stable differences in Chinese dialogue behavior?

## 2. Data and Sample Construction

The upstream source is a large body of real Chinese long-form dialogue, totaling more than one million words. To avoid bringing private raw material into the public project, the sample-construction process uses a three-layer compression structure: research pool, candidate layer, and benchmark layer.

The research pool preserves the original long conversations for discovery of high-value interaction windows. The candidate layer compresses those materials into candidate sets that support later screening and replacement without repeated full-text review. The benchmark layer is the final public evaluation set. At the current stage, it ends at `full 16`, with `core 8` selected as the central showcase subset.

This truncation strategy is driven by evaluation quality rather than sample count. For a public showcase, `16` well-screened cases often demonstrate method credibility more clearly than a much larger but less controlled set.

## 3. Benchmark Design

Cases are not grouped by topic. They are grouped by latent user-state patterns in interaction. The four categories correspond to: asking for advice while mainly seeking confirmation; appearing analytical while actually checking whether one is understood; expressing signals implicitly and requiring active recognition; and already having a view while needing calibration plus acknowledgment.

This choice reflects a central product observation: dialogue systems often fail not because they miss the topic, but because they misread what kind of interaction the user actually needs.

Each case is compressed into a formal evaluation segment covering `Q11-Q13`, with baseline continuation through `q15`. This structure balances control and continuity. The earlier turns are enough to expose an initial judgment of user state, while the later turns are where stable strategic differences often appear. Premature advice, premature closure, abstract explanation, and template-like reassurance tend to become most visible there.

## 4. Evaluation Framework

To avoid relying on vague reading impressions, the project applies a shared rubric and error classification framework. The rubric evaluates six dimensions: surface-issue recognition, latent-need recognition, response-strategy fit, emotional tone, boundary and calibration quality, and forward value.

This means the project is not scoring factual correctness in a question-answering sense. It is evaluating whether the model behaves like an appropriate dialogue system: natural, strategically fitting, and capable of moving the interaction forward.

The error framework groups scattered failures into reusable categories. A reply may answer only the literal question while missing the latent need, offer advice too early, explain from an overly elevated stance, sound preachy, over-infer, or become so cautious that it no longer advances the conversation. The value of the framework is that it makes results useful for downstream product analysis and training diagnosis rather than leaving them at the level of isolated bad cases.

## 5. Experimental Setup

The current baseline uses a shared minimal system prompt, without warmup and without reproducing web-product personality settings. Each case is run in an independent thread with turns entered in order: `q11 -> q12 -> q13 -> q14 -> q15`. This keeps the comparison focused on the models' default interaction strategies under matched conditions.

The three models in the current round are `gpt-5.4-mini`, `claude-haiku-4-5-bedrock`, and `gemini-3-flash-preview`. The experiment produces `48` outputs in total. The `core 8` subset is used for high-signal presentation, while `full 16` preserves coverage across the four categories.

## 6. Result Analysis

All three models show meaningful Chinese dialogue capability, but they differ clearly in strategy stability across continuous interaction.

Under the current `ChatGPT` judging setup, `gpt-5.4-mini` is the model whose outputs most consistently resemble natural dialogue. Its characteristic pattern is acknowledgment first, judgment second, and a light forward step third. It is especially strong in `Bucket 2` and `Bucket 4`, where it balances understanding, boundary control, and forward movement relatively well. Its main weakness appears in later turns, where it can shift too early into problem-handling mode and become somewhat over-structured.

`claude-haiku-4-5-bedrock` is comparatively stable in boundary control, less likely to drift, and generally restrained in tone. Its main issue is weak continuation in later turns: it often closes down too early in order to avoid error, which reduces conversational extension.

`gemini-3-flash-preview` has the strongest tendency toward explanation. It often captures abstract structure quickly, but for the same reason it is also more likely to move into conceptualization, elevated explanation, and over-inference. In cases involving implicit emotion or calibration needs, this often shifts the reply away from dialogue and toward commentary.

At the case level, `B2-PRODUCT-01`, `B4-CALIBRATION-01`, `B1-CONFIRM-01`, `B1-CONFIRM-03`, and `B4-RELATION-01` all show strong showcase value. `B3-SUSPEND-01` is the most important reinforcement case in the current round. It broadens `Bucket 3` from a relatively narrow low-energy companionship state into a more suspended intermediate state, making the overall `core 8` structure more complete.

### 6.1 Supplement: Multi-Judge Sensitivity Check

To estimate how much of the current ranking comes from responder differences and how much comes from judge preference, the project adds a supplementary check on four representative cases: `B1-CONFIRM-01`, `B2-PRODUCT-01`, `B3-LIGHT-01`, and `B4-CALIBRATION-01`. `Gemini` and `Claude` are introduced as additional judges alongside `ChatGPT`.

The purpose is not to redo AI-judge research in full. It is to test, in a minimal way, whether the current ordering is highly sensitive to judge choice.

The result is direct. The top responder under `ChatGPT` changes under the additional judges in all four representative cases. `B1`, `B2`, and `B4` tend to favor `Claude`, while `B3` tends to favor `Gemini`. This suggests that conversation-eval rankings are better understood as relative orderings under a particular judging preference, not as a single objective truth.

This supplementary check also sharpens a more product-relevant observation: all three models show relatively stable default styles, but none is yet especially strong at switching quickly to the response mode that fits the current user state. `ChatGPT` judging tends to reward stable, accurate, lightly progressive replies; `Claude` judging tends to reward restraint, lower intervention, and less elevated explanation; `Gemini` judging tends to reward more relaxed companionship in lighter-support settings. The more robust conclusion is therefore not "which model is objectively best," but that different interaction needs activate different ideals of a good reply, and current models still struggle to switch styles fast enough.

## 7. Working Strategy Hypothesis

Based on the current results, the project proposes a working hypothesis: in Chinese emotional-support and clarification settings, a strong dialogue model may need a response strategy that varies by turn, by user agency, and by emotional intensity, rather than one fixed style throughout.

In the opening phase, the system first needs to create a space in which the user is willing to continue. That phase requires acknowledgment and emotional reading, but should avoid rising too quickly into abstract explanation. In the middle phase, strategy should branch according to user agency: users with a clear stance need more calibration and alignment, while users who are passive or confused need lighter structure and gentler forward movement. At the same time, strategies that work at low to medium emotional intensity may fail in higher-intensity states of pain, confusion, or rupture. As for later turns, the current evidence already suggests that this is where stable differences most often emerge, but not enough evidence exists yet to claim a settled ideal pattern.

The importance of this hypothesis is that it shifts the question from "which model sounds most natural" to "what combination of strategies makes a more mature dialogue product." The project's value therefore lies not only in comparing three models horizontally, but also in proposing a product-facing hypothesis that can be tested and expanded further.

## 8. Limitations and Extensions

This project remains a small benchmark prototype. Its main limitations are not that its conclusions collapse, but that sample scale, judge coverage, and automation depth are still limited. Sample construction is already semi-automated, but not yet at the stage of full long-dialogue segmentation with automated research-value scoring. The public main results rely on `ChatGPT` judging, while the supplementary check already shows that ranking is meaningfully sensitive to judge choice. The working strategy hypothesis has emerged, but has not yet been validated repeatedly across larger sample sets and more model versions. The error-classification framework has taken shape, but is not yet deeply integrated into a real training loop.

For that reason, the most reasonable next step is not simply to increase the case count from `16` to `100`. A more valuable direction is to continue systematizing the upstream research pool and downstream evaluation loop: segmenting long conversations, scoring candidate windows for research value, rewriting high-value windows into short- and long-form evaluation cases, and using a shared error framework to route failures back into prompts, policy, SFT data, preference data, or reward design.

If the benchmark grows, the most important extension axis should not be quantity alone, but emotional-intensity coverage: testing whether the same latent need requires different forms of acknowledgment under more intense conditions. What this expands is system capability, not surface scale.

## 9. Conclusion

This project demonstrates a workable path for evaluating Chinese text dialogue: starting from a large pool of real long-form conversations, compressing them into candidates and benchmark cases, comparing matched baselines, and analyzing outputs with a shared rubric and error classification framework. The current version has already produced `full 16`, `core 8`, and `48` outputs, which are sufficient both for stable model comparison and for proposing a product-relevant working hypothesis.

For a public showcase, the central value of the project is not simply that more cases could be added. It is that long-running real dialogue experience has already been distilled into structured evaluation assets that can support presentation today and grow into a larger internal evaluation system or research-style report later.
