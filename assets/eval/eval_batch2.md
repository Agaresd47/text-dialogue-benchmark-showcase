# Eval Batch 2

> 说明：本文件记录的是当前 `full 16` 的 `ChatGPT eval` 结果，用于作为公开 benchmark 的主口径。对话评测本来就没有单一真值，不同用户与不同产品经理对理想回复风格的判断可能并不一样。

## Overall

`full 16` 已跑齐：`16 cases × 3 models = 48 results`。

这轮新增的 3 条 case 没推翻已有结论，主要带来三件事：

- `B3-SUSPEND-01` 明显补强了 `Bucket 3`
- `B1-DYNAMIC-01` 补上了 `Bucket 1` 里“照顾 / 带节奏 / 默契还是顺手”的 subtype
- `B4-STRUCTURE-01` 补上了 `Bucket 4` 里非暧昧关系向的结构化校准题

在当前 `ChatGPT eval` 下，模型总排序不变：

1. `gpt-5.4-mini`
2. `claude-haiku-4-5-bedrock`
3. `gemini-3-flash-preview`

## New Case Findings

### B1-DYNAMIC-01

- `top model`: `gpt-5.4-mini`
- `runner-up`: `claude-haiku-4-5-bedrock`
- `weak model`: `gemini-3-flash-preview`
- `case utility`: `medium`
- `final role`: `full16 keep`, `core8 backup`
- `brief reason`: 这条把 `Bucket 1` 从“被建议 / 软拒绝”扩到了“关系里顺手主导感”的判断，补位价值是有的，但展示强度不如 `B1-CONFIRM-01/03`。
- `gpt-5.4-mini`: `4.0` | 优点：能把“照顾 / 可控 / 主导”三者拆开；问题：到 `q15` 还是略偏操作化
- `claude-haiku-4-5-bedrock`: `3.5` | 优点：边界感还行；问题：过早进入“去问她 / 做测试”的方案模式
- `gemini-3-flash-preview`: `2.5` | 优点：能看见权力结构；问题：太会讲，太高位，像关系专栏

### B3-SUSPEND-01

- `top model`: `gpt-5.4-mini`
- `runner-up`: `claude-haiku-4-5-bedrock`
- `weak model`: `gemini-3-flash-preview`
- `case utility`: `high`
- `final role`: `core8 keep`
- `brief reason`: 这条正好补上了 `Bucket 3` 里之前缺的“松下来但不舒服 / 空出来不知道放什么”。它比 `B3-LIGHT-02` 更锋利，也更能测出谁会过度解释。
- `gpt-5.4-mini`: `4.5` | 优点：最准地抓住“旧支点变弱，新支点未长出来”；问题：`q15` 轻微进入落地步骤
- `claude-haiku-4-5-bedrock`: `3.5` | 优点：能承认这是尴尬的中间态；问题：推进略虚，后段还是偏收
- `gemini-3-flash-preview`: `2.5` | 优点：有抓到“失重感”；问题：比喻和解释过满，太爱写大段“重启 / 着陆 / 结构性坍塌”

### B4-STRUCTURE-01

- `top model`: `gpt-5.4-mini`
- `runner-up`: `claude-haiku-4-5-bedrock`
- `weak model`: `gemini-3-flash-preview`
- `case utility`: `high`
- `final role`: `full16 keep`
- `brief reason`: 这条把 `Bucket 4` 从关系投射扩到了“高效但过度结构化的自我管理”，很适合讲 calibration，不必进 core，但值得保留。
- `gpt-5.4-mini`: `4.0` | 优点：能区分“成熟的克制”和“高效的钝化”；问题：仍稍工整
- `claude-haiku-4-5-bedrock`: `3.5` | 优点：抓到了“理性替代感受”的风险；问题：`q15` 过度收口
- `gemini-3-flash-preview`: `2.0` | 优点：能放大风险；问题：上纲上线最严重，几乎把用户写成在做反人性修行

## Final Core 8

- `B1-CONFIRM-01`
- `B1-CONFIRM-03`
- `B2-PRODUCT-01`
- `B2-STYLE-01`
- `B3-LIGHT-01`
- `B3-SUSPEND-01`
- `B4-CALIBRATION-01`
- `B4-RELATION-01`

## Full 16

- `B1-CONFIRM-01`
- `B1-CONFIRM-02`
- `B1-CONFIRM-03`
- `B1-DYNAMIC-01`
- `B2-DIRTY-01`
- `B2-PRODUCT-01`
- `B2-STYLE-01`
- `B2-SYSTEM-01`
- `B3-CLEAN-01`
- `B3-LIGHT-01`
- `B3-LIGHT-02`
- `B3-SUSPEND-01`
- `B4-CALIBRATION-01`
- `B4-RELATION-01`
- `B4-RELATION-02`
- `B4-STRUCTURE-01`

## Replace / Risk Notes

- 当前 `core8` 被替换掉的槽位是：`B3-LIGHT-02`
- 当前 `full16` 里最弱、以后如果要继续精炼应优先替换的是：`B3-CLEAN-01`
- 如果后续只想再动一条，不该再补 `Bucket 2`，而该继续补更强的 `Bucket 3`
