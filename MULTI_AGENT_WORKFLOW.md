# Multi-Agent Workflow

## 为什么用多 agent

这个项目的难点不只在内容本身，而在于任务类型非常不同：

- 有的是筛原矿
- 有的是写 case
- 有的是跑模型
- 有的是做评估

如果让一个 agent 把这些全包，最容易出现的问题就是：

- 一边写 case，一边改标准
- 一边跑结果，一边忍不住做评估
- 上下文越来越脏，最后谁都不专注

所以这里刻意拆成四个角色。

## 角色分工

### 总管

负责：

- 理解项目整体状态
- 和用户对话
- 决定先做哪一层
- 给子 agent 分配最小明确任务

不负责：

- 手写大量 case
- 跑 inference
- 做逐条 eval

### WriterAgent

负责：

- 只从给定 candidate / pack 里补写缺位 case
- 只写 `Q11-Q13`
- 保持风格真实、匿名化、可测

不负责：

- 判断最终是否保留
- 跑模型
- 写评估

### RunnerAgent

负责：

- 只跑 baseline
- 保证输入输出结构统一
- 把结果落成可复用目录
- 组织展示资产

不负责：

- 改 case 文本
- 改 rubric
- 下结论

### ReviewerAgent

负责：

- 按 rubric 和 taxonomy 评估结果
- 给 keep / backup / drop
- 找 strongest case、weakest case、常见 error tags

不负责：

- 写新 case
- 跑新结果

## 为什么这套编排适合训练端 / 评测端

因为真实工作里，这几个环节本来就应该分开：

- 数据抽取和筛选
- case 生产
- 批量运行
- 质量评估

把它们拆开之后，才能做到：

- case 生产不被结果反向污染
- runner 保持机械稳定
- reviewer 只看结果，不替生成过程找借口
- 总管能持续和人对齐目标，而不是被执行细节拖死

## 这套 workflow 在本项目里是怎么落地的

实际执行顺序是：

1. 总管判断当前项目已过“能不能测”的线
2. Reviewer 先给出 `core 8` 的 provisional 判断
3. Writer 只补 `full 16` 还缺的 `3` 条
4. Runner 跑 `v2 baseline`
5. Reviewer 做最终筛选，把 `B3-SUSPEND-01` 收进 core

最后形成：

- `core 8`
- `full 16`
- `48` 条结果
- 对外可讲的 case 资产目录

## 如果继续扩，这套 workflow 可以怎么升级

- 在总管前面再加一个自动原矿抽取层
- 在 Writer 前面加候选排序器
- 在 Runner 后面接自动 judge
- 在 Reviewer 后面接 case 生命周期管理

也就是说，这个 showcase 不是终点，而是一个已经能继续长的底座。
