# 中文文本对话评测项目

这是一个面向中文大模型产品、训练与评测岗位的公开 showcase。

## 在线展示

直接打开网页版：

https://agaresd47.github.io/text-dialogue-benchmark-showcase/

## 30 秒可读

- 我负责把长对话原矿压成可公开展示的 benchmark 原型。
- 这个项目证明的不是“我整理了多少聊天记录”，而是我能从真实长对话里抽出高价值窗口，设计 bucket / rubric / taxonomy，并跑通多模型 baseline。
- 当前收口结果是 `core 8`、`full 16`、`48` 条 baseline。
- 适合展示给中文大模型产品、训练、评测、数据策略相关岗位。

## 我做了什么

- case 蒸馏：从原矿里筛出能代表隐性需求模式的样本。
- bucket 设计：把 case 按真实交互姿态分成 4 类。
- 评测框架：定义 rubric 和 error taxonomy。
- baseline 组织：完成 16 条 case、3 个模型、48 条结果的分析收口。
- 展示页：把 core 8 做成可直接托管的静态页面，方便面试展示。

## 质量锚点

这个项目没有追求把 benchmark 机械扩到 `100` 条，而是做了高质量截断。当前正式样本的入选标准固定为：

- 生活化表达明显
- 隐性需求可识别
- 好回复与差回复差异明显
- 能稳定体现某一个 bucket
- 不依赖大量背景才能理解

因此，最终公开 benchmark 只保留 `16` 条正式 case，并从中进一步压出 `core 8`。这个仓库想证明的不是“我能堆很多 case”，而是“我能把 case 选得有解释力”。

## 这对岗位分别意味着什么

- 对产品：默认回复策略不该只有一种风格，而应按轮次和用户主观能动性分层。
- 对训练：需要围绕特定 bucket 持续补高信号 case，而不是泛泛扩样本量。
- 对评测：单轮 prompt 不足以暴露连续交互问题，后续轮次往往才是差异真正拉开的地方。

## 静态入口

在线展示地址：

- `https://Agaresd47.github.io/text-dialogue-benchmark-showcase/`

仓库根目录的 [index.html](./index.html) 是现在的静态主入口，打开即可浏览 core 8。

如果你想看更传统的本地预览，也可以继续用：

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

## 这个项目想回答什么问题

如果团队已经有大量长对话数据库，真正难的不是“数据不够多”，而是：

- 哪些长对话片段值得研究
- 哪些片段可以被压缩成高信号 case
- 同一套 case 在不同模型上会稳定暴露什么问题
- 这些问题能不能被归入一套稳定 taxonomy，而不是靠主观印象描述

这个仓库给出的，是这条路线的一个最小可执行版本。
