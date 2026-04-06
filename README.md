# 中文文本对话评测项目

这是一个面向中国大模型产品、训练与评测岗位的公开 showcase。

它不是聊天记录整理，也不是 prompt 展示，而是一个小型但闭环的评测项目：从长对话原矿中抽取高价值片段，构造 benchmark case，统一跑多模型 baseline，并用 taxonomy 做错误归因与结果分析。

这个公开仓库只保留适合面试展示的内容。过程性文档、工作流草稿和镜像说明被下沉到 `project/internal/`。

## 建议阅读顺序

1. [项目报告.md](./项目报告.md)
2. [正式评测报告.md](./正式评测报告.md)
3. [assets/eval/eval_batch2.md](./assets/eval/eval_batch2.md)
4. [showcase_app/README.md](./showcase_app/README.md)

## 当前项目状态

- 已完成 `full 16`
- 已完成 `core 8`
- 已完成 `16 × 3 = 48` 条 baseline 结果
- 已完成一轮最终评估与筛选

## 仓库结构

- `showcase_app/`
  - 本地展示页
- `assets/`
  - `core_8/`：8 条核心展示样本
  - `full_16/`：完整 16 条 benchmark 资产
  - `dataset/`：最终输入集与 JSONL
  - `eval/`：最终评估结果
  - `showcase_data/`：展示页摘要数据
- `project/internal/`
  - 过程文档、工作流记录、镜像说明

## 这个项目想回答什么问题

如果团队已经有大量长对话数据库，真正难的不是“数据不够多”，而是：

- 哪些长对话片段值得研究
- 哪些片段可以被压缩成高信号 case
- 同一套 case 在不同模型上会稳定暴露什么问题
- 这些问题能不能被归入一套稳定 taxonomy，而不是靠主观印象描述

这个仓库给出的，是这条路线的一个最小可执行版本。

## 本地运行展示页

```bash
cd showcase_app
python app.py
```

然后打开 `http://127.0.0.1:8008`。
