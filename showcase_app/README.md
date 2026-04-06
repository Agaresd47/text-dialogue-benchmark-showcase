# 展示页

这是一个兼容保留的本地预览页。现在仓库根目录的 `index.html` 是主入口，适合直接托管和静态发布。

## 运行

如果你只想看旧的 Python 预览，可以在仓库根目录执行：

```bash
cd showcase_app
python app.py
```

然后打开：

```text
http://127.0.0.1:8008
```

## 说明

- 这个预览页仍然依赖 Python 标准库 HTTP server 和 `jinja2`
- 现在的主展示资产已经迁到仓库根目录的静态页
- 如果你要发给面试官，优先发 `index.html`
