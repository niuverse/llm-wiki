# Niuverse LLM Wiki

这是一个面向 Obsidian、Codex 和 Quartz 的个人研究知识库。以机器人与具身智能为主干，用交叉主题地图连接论文、概念、项目与学习笔记；正文统一保存在 `wiki/`。

- `raw/`：不可变原始资料。
- `wiki/`：知识层，也是 Obsidian 笔记库和 Quartz 内容目录。
- `graph/`：可生成的关系图与资料阅读缓存。
- `tools/`：本地确定性辅助脚本。

## 持续积累与日志

新内容优先更新已有页面，没有合适页面时才新建；同步直接相关的知识，证据充分时修正判断，不确定或有冲突时明确保留。更广泛的补充研究使用 `research` / `refresh`。

[知识库日志](wiki/log.md) 记录每次新增、修改及原因，首页和完整目录均有入口。新记录注明北京时间并链接相关页面；旧记录不改写，也不补造缺失的时间。

## 资料与证据

`raw/` 保存官方 PDF、完整网页、代码仓库快照等原始证据。不要把 LLM 摘要或临时提取文本放进去，也不要覆盖已有资料；新版本另存快照。

`graph/extracts/` 保存 MarkItDown 生成的可重建阅读缓存。来源页的 `source_file` 指向原始证据，`extracted_text` 指向缓存；公式或表格提取损坏时回看原文。

## Obsidian

用 Obsidian 打开 `wiki/` 目录，原始证据单独留在 `raw/`。

## 自动研究与刷新

在本仓库的 Codex 对话中输入：

```text
research 机器人世界模型
refresh 机器人仿真
```

这两个入口由 Codex 执行 [.agents/skills/wiki-research/SKILL.md](.agents/skills/wiki-research/SKILL.md)，不是终端命令。一次请求会按主题搜索可靠资料、保存原始证据、完整阅读、更新相关概念与专题、补充双向链接，并运行检查；不需要逐篇选资料。

`research` 优先补齐主题机制，`refresh` 比较已有来源与新版本，复用相同内容并保留旧快照。每轮更新覆盖记录、目录与日志；未知问题维护在各研究专题，研究问题索引自动汇总入口，不把候选资料当成已验证知识。首次世界模型与仿真研究的覆盖记录见 [研究地图](wiki/syntheses/world-models-and-simulation-research.md)。

研究按需运行，公开发布由你触发。没有额外后台服务、定时调度或 API 密钥要求；联网搜索和知识整合使用当前 Codex 会话能力。

## 本地预览

首次使用先安装依赖：

```bash
npm ci
uv sync
```

本地预览 Quartz 站点：

```bash
npm run wiki:preview
```

默认访问 `http://localhost:8080/`。同一内网查看并实时刷新可指定两个可用端口：

```bash
npm run wiki:preview -- --port 8081 --wsPort 8082
```

浏览器访问 `http://<本机内网 IP>:8081/`，HTTP 页面与自动刷新分别使用 8081、8082。预览命令会持续监听 Markdown 修改；关闭命令后预览停止。更改 TypeScript 布局或组件后，若增量构建仍显示旧布局，重新启动预览。

## 研究结构

侧栏只有 Topics、Concepts、Sources、Notes 四类内容。Topics 围绕问题积累，Concepts 解释原理，Sources 保留具体证据，Notes 记录独立讨论。惯用术语直接使用英文；来源的短导航名与完整官方标题分开。

- `wiki/topics/`：交叉主题地图与具体研究专题，没有强制的单一父领域。
- `wiki/sources/`：论文、项目、官方文档与教材。论文用 `source_type: paper` 标记，其他资料保留各自证据性质。
- `wiki/concepts/`：跨论文复用的基础机制；论文引用这些解释，并在本页讲清自己的应用方式、假设和改进。
- `wiki/syntheses/`：Notes，有独立价值的讨论与研究记录。学习路径已融入相关主题，不再单独维护。
- `wiki/entities/`：仅保留旧地址跳转；项目的论文、文档和代码统一进入 Sources。
- `wiki/domains/`：旧领域地址的迁移入口，仅用于兼容历史链接。

首页以世界模型与表征、机器人策略学习、规划与控制、物理仿真、三维资产与场景生成、评测与现实迁移六个地图为入口；工具笔记单列。它们互相交叉，具体专题不必选唯一归属。主题的 `entry: research | tools` 和 `nav_order` 只决定首页导航位置；知识页的 `topics` 表示多个研究关联，正文 WikiLinks 同时服务 Obsidian 和 Quartz。

论文解析侧重研究问题、特有设计、信息流、必要推导与证据；共享原理只维护一处。项目解析沿实际执行过程解释模块和接口，分别标注文档说明、固定版本静态代码核查及运行验证。维护规范见 [.agents/skills/wiki-research/references/deep-reading.md](.agents/skills/wiki-research/references/deep-reading.md)。

网站使用 Quartz 目录、搜索、图谱和反向链接组件；首页直接渲染自动生成的 Markdown，以主题卡片与最近五条日志作为入口，不另存一份首页摘要。文章右侧目录优先，关系图按需展开；配图支持点击放大和打开原图。知识页正文下提供“本页引用／反向链接”两列，图谱和关系表排除纯目录及旧地址入口，避免把目录收录当成研究关联。论文库保留专题、年份和关键词筛选；已读与收藏沿用当前浏览器的记录，不跨设备同步。

以下命令生成简洁首页、完整目录、论文库、其他资料和研究问题索引；不要手改生成页：

```bash
uv run python tools/build_catalog.py
uv run python tools/build_catalog.py --check
```

生成器只组织显式元数据，不生成研究结论。`index.md` 提供简洁入口，`catalog.md` 收录所有页面；健康检查同时验证两者覆盖。

## 构建

生成静态站点：

```bash
npm run wiki:build
```

输出目录是 `public/`，已加入 `.gitignore`。

## 维护工具

结构检查：

```bash
npm run wiki:health
```

从原始资料生成阅读缓存：

```bash
npm run wiki:extract -- raw/pi07.pdf
```

需要启用 MarkItDown 插件、文字识别或图像描述时：

```bash
npm run wiki:extract -- --use-plugins raw/example.png
npm run wiki:extract -- --llm-model gpt-4o raw/example.png
```

生成显式 WikiLink 关系图与报告：

```bash
npm run wiki:graph
```

这些工具只负责确定性检查、资料提取和关系图生成，不自动撰写知识综合。

## 发布

GitHub Pages 使用 `.github/workflows/deploy.yml`。推送到 `main` 后，发布流程会运行：

```bash
npm run wiki:build
```

然后把 `public/` 发布到 GitHub Pages。仓库设置里需要把 Pages 的发布来源设为 `GitHub Actions`。
