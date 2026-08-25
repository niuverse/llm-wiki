---
title: "AgentsDock Releases"
type: source
tags: [github, release, agent-client, desktop, mobile]
sources: []
last_updated: 2026-08-25
source_file: raw/agentsdock-releases-readme.md
source_kind: markdown
source_url: https://github.com/ZhengyiLuo/AgentsDock-Releases
source_date: unknown
---

## 摘要

`ZhengyiLuo/AgentsDock-Releases` 是 AgentsDock 桌面构建的公开只读分发仓库，不是应用源码仓库。GitHub Releases 中包含签名安装包、更新元数据、校验和与发布说明，供应用内更新器消费。

官方 README 说明：macOS 构建使用 Developer ID 证书签名并经过 Apple notarization；已发布资产不可变，修复版本通过更高版本号发布而不是替换旧产物；仓库不包含应用源码、凭据或用户数据。

来源网址: https://github.com/ZhengyiLuo/AgentsDock-Releases

## 核心主张

- 该仓库只承担发行/分发功能，不承载 AgentsDock 客户端源码。
- 安装方式是从 latest release 下载最新安装器。
- macOS 发布物经过 Apple 签名与公证。
- 发布资产不可变，错误修复以更高版本发布。
- AgentsDock 应用源码与 AgentsServer 源码维护在独立仓库中。

## 关键引文

- "This repository is the public, read-only distribution feed for AgentsDock desktop builds."
- "This repository does not contain application source, credentials, or user data."

## 关联

- [[AgentsDock]] - 该发布仓库对应的桌面/移动客户端实体。
- [[AgentsServer]] - AgentsDock 配套的自托管执行后端。
- [[agentsserver]] - AgentsServer 官方 README 来源页。

## 开放问题

- 该发布仓库的 release assets 显示当前稳定版包含 macOS、Linux、Windows，并另有 Android beta APK；需要后续跟踪 Android 是否会进入主版本发布线。
