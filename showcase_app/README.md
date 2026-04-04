# 展示页

这是一个轻量的本地展示页，用来把项目的核心信息以更适合面试演示的方式展示出来。

## 运行

在仓库根目录执行：

```bash
cd showcase_app
python app.py
```

然后打开：

```text
http://127.0.0.1:8008
```

## 技术选择

这个页面刻意不用 Streamlit、Gradio 或 Flask，因为当前环境没有这些依赖。

它使用的是：

- Python 标准库 HTTP server
- `jinja2` 模板
- 静态 HTML / CSS
- `summary.json` 作为展示数据源

## 页面里能看什么

- 项目一句话介绍
- `core 8` 和 `full 16` 的结构
- 三个模型的主要结论
- bucket 分布
- 关键发现
- 初步模型范式假设
- 原始资产入口路径

## 数据来源

页面只读这份文件：

- `../assets/showcase_data/summary.json`

这份摘要是从现有 `core_8 / full_16 / eval_batch2` 提炼出来的，不是人工编造的数据。
