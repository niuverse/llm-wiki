# Niuverse LLM Wiki

这是一个面向 Obsidian、Codex 和 Quartz 的 personal LLM wiki。

- `raw/`：不可变 source material。
- `wiki/`：主要知识层，也是 Obsidian vault 和 Quartz content directory。
- `graph/`：generated graph artifacts 和 source extraction cache。
- `tools/`：本地 deterministic helper scripts。

## Source Policy

`raw/` 保存 canonical evidence，例如官方 PDF、网页 capture、repo README 或 commit metadata。不要把 LLM 摘要或临时 extraction 放进 `raw/`。

`graph/extracts/` 保存 MarkItDown 生成的可再生 Markdown reading cache，例如 PDF、HTML、Office docs、images/OCR、audio transcription 或 UTF-16 Markdown 的 normalized extraction。source page 的 `source_file` 指向 `raw/` canonical source，`extracted_text` 指向 `graph/extracts/` cache。

## Obsidian

用 Obsidian 打开 `wiki/` 目录，而不是 repo root。这样可以把 `raw/` 保持为 evidence archive，避免误编辑原始材料。

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

默认访问 `http://localhost:8080/`。

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
