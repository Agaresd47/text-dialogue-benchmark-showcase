# 中文文本对话评测项目

这是一个面向中文大模型产品、训练与评测岗位的公开 showcase。

## 在线展示

直接打开网页版：

https://agaresd47.github.io/text-dialogue-benchmark-showcase/

## 30 秒可读

- 我负责将长周期真实对话蒸馏为可公开展示的 benchmark 原型。
- 该项目重点展示我如何从真实长对话中识别高价值窗口，并设计 bucket、rubric、taxonomy 与多模型 baseline。
- 当前成果包括 `core 8`、`full 16` 与 `48` 条 baseline 结果。
- 适用于中文大模型产品、训练、评测与数据策略相关岗位展示。

## 我做了什么

- case 蒸馏：从长周期真实对话中筛选能代表隐性需求模式的样本。
- bucket 设计：把 case 按真实交互姿态分成 4 类。
- 评测框架：定义 rubric 和 error taxonomy。
- baseline 组织：完成 16 条 case、3 个模型、48 条结果的分析与结论整理。
- 展示页：将 core 8 制作为可直接托管的静态页面，用于公开展示。

## 质量锚点

该项目并未将扩大样本量设为首要目标，而是采用质量优先的样本筛选策略。当前正式样本的入选标准为：

- 生活化表达明显
- 隐性需求可识别
- 好回复与差回复差异明显
- 能稳定体现某一个 bucket
- 不依赖大量背景才能理解

最终公开 benchmark 保留 `16` 条正式 case，并从中进一步选出 `core 8`。这些样本具备更强的问题暴露能力与分析价值。

## 岗位相关性

- 对产品：默认回复策略不该只有一种风格，而应按轮次和用户主观能动性分层。
- 对训练：需要围绕特定 bucket 持续补高信号 case，而不是泛泛扩样本量。
- 对评测：单轮 prompt 不足以暴露连续交互问题，后续轮次往往才是差异真正拉开的地方。

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

## 仓库结构

- `index.html` / `showcase.css` / `showcase.js` / `showcase-data.js`
  - 纯静态展示页
- `assets/`
  - `core_8/`：8 条核心展示样本
  - `full_16/`：完整 16 条 benchmark 资产
  - `dataset/`：最终输入集与 JSONL
  - `eval/`：最终评估结果
- `showcase_app/`
  - 兼容保留的本地预览页
- `project/internal/`
  - 过程文档、工作流记录、镜像说明

## 项目要回答的问题

如果团队已经有大量长对话数据库，更关键的问题在于：

- 哪些长对话片段值得研究
- 哪些片段可以被压缩成高信号 case
- 同一套 case 在不同模型上会稳定暴露什么问题
- 这些问题能不能被归入一套稳定 taxonomy，而不是靠主观印象描述

这个仓库给出的，是这条路线的一个最小可执行版本。
