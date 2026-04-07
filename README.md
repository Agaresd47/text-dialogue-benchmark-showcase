# 中文文本对话评测项目

这是一个面向中文大模型产品、训练与评测岗位的公开展示项目。

## 在线展示

直接打开网页版：

https://agaresd47.github.io/text-dialogue-benchmark-showcase/

## 项目摘要

- 我负责将长周期真实对话蒸馏为可公开展示的评测原型。
- 该项目重点展示我如何从真实长对话中识别高价值窗口，并设计四类交互类别、rubric、taxonomy 与多模型基线评测流程。
- 当前成果包括 `core 8`、`full 16`、`48` 条基线评测结果，以及一个 `4-case` 的 multi-judge appendix probe。
- 适用于中文大模型产品、训练、评测与数据策略相关岗位展示。

四类交互类别分别为：

- `B1`：求建议，实则求确认
- `B2`：理性分析，实则测试理解
- `B3`：低显性表达，需主动感知
- `B4`：已有主见，需校准与挑战

## 个人贡献

- case 蒸馏：从长周期真实对话中筛选能代表隐性需求模式的样本。
- bucket 设计：把案例按真实交互姿态分成 4 类。
- 评测框架：定义 rubric 和 error taxonomy。
- baseline 组织：完成 16 条案例、3 个模型、48 条结果的分析与结论整理。
- 补充 probe：增加 Gemini judge 与 Claude judge 的敏感性检查，用于观察排序是否受 judge 偏好显著影响。
- 展示页：将 core 8 制作为可直接托管的静态页面，用于公开展示。

## 质量锚点

该项目并未将扩大样本量设为首要目标，而是采用质量优先的样本筛选策略。当前正式样本的入选标准为：

- 生活化表达明显
- 隐性需求可识别
- 好回复与差回复差异明显
- 能稳定体现某一个类别
- 不依赖大量背景才能理解

最终公开评测集保留 `16` 条正式案例，并从中进一步选出 `core 8`。这些样本具备更强的问题暴露能力与分析价值。

## 评测口径说明

- 当前 `full 16` 的公开主分数来自 `ChatGPT eval`。
- 对话质量这件事本来就没有单一真值；不同用户、不同产品经理，对理想回复风格的判断本来就可能不一样。
- 为了避免把当前排序误读成唯一正确答案，本仓库额外补了一个 `4-case` 的 multi-judge appendix probe：
- `ChatGPT eval`
- `Gemini judge`
- `Claude judge`
- 这个 probe 的结果说明，三家模型的分差并不只取决于 responder 本身，也会受到 judge 对理想回复风格的偏好影响。
- 更具体地说，在当前 probe 中，`4` 条代表 case 在新增两个 judge 下都发生了 top-model flip：
- `B1/B2/B4` 更容易被判给 `Claude`
- `B3` 更容易被判给 `Gemini`
- 因此，当前仓库里的排序更适合被理解为 `ChatGPT-eval-relative ranking`，而不是单一标准下的固定第一名。

## 岗位相关性

- 对产品：默认回复策略不该只有一种风格，而应按轮次和用户主观能动性分层。
- 对评测：不能默认单一 judge 就代表唯一正确答案，conversation eval 本身也会受 judge 偏好影响。
- 对训练：需要围绕特定类别持续补高信号案例，而不是泛泛扩大样本量。
- 对评测：单轮 prompt 不足以暴露连续交互问题，后续轮次往往才是差异真正拉开的地方。

## 当前阶段洞见

- 不同的陪伴需求、关系位置和情感状态，需要不同的回应方式。
- 当前三家模型都表现出比较稳定的默认风格，但都还不够会按场景迅速切换到符合用户输入气口的回应方式。
- 这个发现比“谁总分第一”更接近对话产品与行为评测的真实问题。

## 后续方向

- 当前 case 主要仍是低到中等情感烈度，更偏“轻悬空、轻确认、轻校准、轻陪伴”。
- 如果后续继续扩，不应该优先继续堆样本量，而更应该沿“情感烈度”做梯度扩展。
- 更具体地说，下一步更值得测试的是：同一类隐性需求，在更高烈度情境下，模型能否切换到不同的承接方式。

## 访问方式

在线展示地址：

- `https://Agaresd47.github.io/text-dialogue-benchmark-showcase/`

仓库根目录的 [index.html](./index.html) 是当前的静态展示入口，可直接浏览 core 8。

本地运行方式：

```bash
cd showcase_app
python app.py
```

然后打开 `http://127.0.0.1:8008`。

## 建议阅读顺序

1. [index.html](./index.html)
2. [项目报告.md](./项目报告.md)
3. [正式评测报告.md](./正式评测报告.md)
4. [assets/eval/eval_batch2.md](./assets/eval/eval_batch2.md)
5. [assets/eval/probe4_gemini_judge_scores.csv](./assets/eval/probe4_gemini_judge_scores.csv)
6. [assets/eval/probe4_claude_judge_scores.csv](./assets/eval/probe4_claude_judge_scores.csv)

## 仓库结构

- `index.html` / `showcase.css` / `showcase.js` / `showcase-data.js`
  - 纯静态展示页
- `assets/`
  - `core_8/`：8 条核心展示样本
  - `full_16/`：完整 16 条 benchmark 资产
  - `dataset/`：最终输入集与 JSONL
  - `eval/`：`ChatGPT eval` 主结果与多方 judge probe 附录
- `showcase_app/`
  - 兼容保留的本地预览页
- `project/internal/`
  - 过程文档、工作流记录、镜像说明

## 项目要回答的问题

如果团队已经有大量长对话数据库，更关键的问题在于：

- 哪些长对话片段值得研究
- 哪些片段可以被整理为高信号案例
- 同一套案例在不同模型上会稳定暴露什么问题
- 这些问题能不能被归入一套稳定 taxonomy，而不是靠主观印象描述

这个仓库给出的，是这条路线的一个最小可执行版本。
