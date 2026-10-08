---
title: "AgentsDock Releases"
type: source
tags: [github, source-backed]
sources: []
modified: 2026-10-04
source_file: raw/agentsdock-releases-readme.md
source_kind: markdown
source_url: https://github.com/ZhengyiLuo/AgentsDock-Releases
source_date: unknown
topics: ["topics/agent-execution"]
source_type: repository
nav_title: "AgentsDock · Releases"
---

# AgentsDock Releases：安装包与更新信息的分发入口

`ZhengyiLuo/AgentsDock-Releases` 是 AgentsDock 的公开分发仓库，不是客户端实现仓库。它的 README 说明 GitHub Releases 提供安装包、更新元数据、校验和与发行说明，供下载与应用内更新使用。[官方仓库](https://github.com/ZhengyiLuo/AgentsDock-Releases)

## 它在整个系统中的位置

| 对象 | 提供什么 | 不能从它单独推出什么 |
| --- | --- | --- |
| 客户端源码与构建过程 | 产生桌面应用及更新器实现 | 本分发仓库没有这些源码，不能据此核验更新器算法 |
| GitHub Releases 与资产 | 分发构建产物、更新说明及相关元数据 | README 描述不等于逐个安装包已验证签名和可运行性 |
| [[agentsserver|AgentsServer]] | 承担会话、工具与工作区的执行 | 下载客户端不自动安装、认证或配置所有后端 |

**文档所描述的一次分发过程。** 发布者构建应用，发布安装包及元数据；用户手动下载，或已有客户端的更新器读取分发信息，再取得对应产物。具体怎样比较版本、验证签名、处理失败和替换正在运行的程序，README 没有提供实现细节，本次也没有读取客户端更新器源码。因此这里仅说明职责和信息方向，不把推测的更新步骤画成已核验控制流。

## 发布约定及其证据层级

README 声明 macOS 发布物在发布前经过 Developer ID 签名与 Apple 公证；已发布资产不覆盖，修复另发更高版本。这是维护者的发布政策，**本轮未下载安装包验证签名，也未枚举所有历史资产检验不可变性**。SHA-256 校验和能用于核对字节是否匹配，单凭文件列表则不能证明来源可信；是否有签名校验与可信公钥，需要另查相应更新器实现。

该仓库不含应用源码不表示 AgentsDock 客户端闭源。本次 [[agentsserver|AgentsServer 固定版本 README]] 明确链接了独立的公开客户端仓库；本页没有顺带审查那个仓库的架构，也不由分发仓库名称推断移动端或全部操作系统支持。

## 固定版本核查

本次完整阅读提交 [`0637b37147fb0d9b10b995ce6876a80325197d8d`](https://github.com/ZhengyiLuo/AgentsDock-Releases/tree/0637b37147fb0d9b10b995ce6876a80325197d8d) 的 README，并检查官方递归 Git 树：该树只有 `README.md` 一个文件，返回 `truncated: false`，确实没有可供本次核查的更新器源码。Git 树不包含 GitHub Releases 的资产，所以不能用这棵树证明发布物的数量、平台或版本状态。

| 证据 | 归档与用途 |
| --- | --- |
| 原 README | `raw/agentsdock-releases-readme.md`；保留旧登记，不覆盖 |
| 固定提交 README | `raw/agentsdock-releases-readme-md-2026-10-04-acc6a7e3cc9c.md`；全文读取，本次用于核验发布仓库定位与政策 |
| 固定提交递归树 | `raw/agentsdock-releases-tree-2026-10-04-98f340934f61.json`；完整响应，核对源码范围 |

[固定 README](https://github.com/ZhengyiLuo/AgentsDock-Releases/blob/0637b37147fb0d9b10b995ce6876a80325197d8d/README.md) 与 [官方 Git 树响应](https://api.github.com/repos/ZhengyiLuo/AgentsDock-Releases/git/trees/0637b37147fb0d9b10b995ce6876a80325197d8d?recursive=1) 均按提交固定。没有下载或运行发布二进制；已移除旧页缺少资产快照支撑的“当前稳定版包含哪些平台、Android 测试版将怎样演进”判断。

关联：AgentsDock 客户端、[[sources/agentsserver|自托管执行后端]]、[[agentsserver|后端实现复核]]、[[topics/agent-execution|Agent Systems]]。

## 研究归属

[[topics/agent-execution|Agent Systems]]。
