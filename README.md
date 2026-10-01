# Niuverse LLM Wiki

这是一个面向 Obsidian、Codex 和 Quartz 的个人知识库。网站按仿真与资产、机器人学习与评测、世界模型、智能体工具四个主题组织阅读；学习路径、正文和证据都保存在 `wiki/`。

- `raw/`：不可变原始资料。
- `wiki/`：知识层，也是 Obsidian 笔记库和 Quartz 内容目录。
- `graph/`：可生成的关系图与资料阅读缓存。
- `tools/`：本地确定性辅助脚本。

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

这两个入口由 Codex 执行 [.agents/skills/wiki-research/SKILL.md](.agents/skills/wiki-research/SKILL.md)，不是终端命令。一次请求会按主题搜索可靠资料、保存原始证据、完整阅读、更新概念与学习路径、补充双向链接，并运行检查；不需要逐篇选资料。

`research` 优先补齐主题机制，`refresh` 比较已有来源与新版本，复用相同内容并保留旧快照。每轮更新覆盖记录、目录与日志；未知问题集中在研究问题页，不把候选资料当成已验证知识。首次世界模型与仿真研究的覆盖记录见 [研究地图](wiki/syntheses/world-models-and-simulation-research.md)。

研究按需运行，公开发布由你触发。没有额外后台服务、定时调度或 API 密钥要求；联网搜索和知识整合使用当前 Codex 会话能力。

## Local Preview

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

主题入口由学习路径页的 `study_order`、`nav_title` 和 `description` 生成；页面的 `study_topic` 关联所属路径。新增知识页时同步登记目录与日志，正文使用中文显示别名保持链接可读，文件名无需改动。

## 学习交互

首页可按主题、页面类型、关键词和阅读记录筛选，在页面列表与关系图之间切换。关系图的箭头指向被引用页；文章下方可展开局部图及入链／出链表，沿原有双向链接继续阅读。

“已读”由你主动标记，收藏和阅读记录保存在当前浏览器；不会因滚动到底自动认定学会，也不会同步到其他设备。课程视频与方法演示放在相关知识页，正文保留来源和观看目的。

## Build

生成静态站点：

```bash
npm run wiki:build
```

输出目录是 `public/`，已加入 `.gitignore`。

## Maintenance Tools

结构检查：

```bash
npm run wiki:health
```

从 source 生成 reading cache：

```bash
npm run wiki:extract -- raw/pi07.pdf
```

需要启用 MarkItDown plugins/OCR 或 image descriptions 时：

```bash
npm run wiki:extract -- --use-plugins raw/example.png
npm run wiki:extract -- --llm-model gpt-4o raw/example.png
```

生成显式 WikiLink graph 和 report：

```bash
npm run wiki:graph
```

这些 tools 不做 wiki synthesis；它们只负责确定性检查、MarkItDown source conversion 和 graph artifacts。

## Deploy

GitHub Pages 使用 `.github/workflows/deploy.yml`。推送到 `main` 后，workflow 会运行：

```bash
npm run wiki:build
```

然后把 `public/` 发布到 GitHub Pages。仓库设置里需要把 Pages source 设为 `GitHub Actions`。
