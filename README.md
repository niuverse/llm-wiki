# Niuverse LLM Wiki

这是一个面向 Obsidian、Codex 和 Quartz 的 personal LLM wiki。

- `raw/`：不可变 source material。
- `wiki/`：主要知识层，也是 Obsidian vault 和 Quartz content directory。
- `graph/`：可选的 generated graph artifacts。

## Obsidian

用 Obsidian 打开 `wiki/` 目录，而不是 repo root。这样可以把 `raw/` 保持为 evidence archive，避免误编辑原始材料。

## Local Preview

首次使用先安装依赖：

```bash
npm ci
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

## Deploy

GitHub Pages 使用 `.github/workflows/deploy.yml`。推送到 `main` 后，workflow 会运行：

```bash
npm run wiki:build
```

然后把 `public/` 发布到 GitHub Pages。仓库设置里需要把 Pages source 设为 `GitHub Actions`。
