---
title: "How I Merged 3 Separate Repos into a Monorepo with git subtree (Without Losing History)"
date: "2026-09-27"
category: "Engineering"
readTime: "5 min read"
description: "A year ago, I built a microfinance ledger with separate repos for the backend, web, and Android app. Here is how I merged them into a clean monorepo using git subtree so AI agents and cross-stack fixes became effortless."
image: "/blog/git-subtree-hero.jpg"
---

About a year ago, I built a small app to help my dad and his friends manage their microfinance ledger. It was a simple system, but as it grew, I ended up splitting it across three separate GitHub repositories:

1. `ledger-backend` (API & database logic)
2. `ledger-web` (React dashboard)
3. `ledger-android` (Android mobile client)

Since it was a side project for family, I only touched it occasionally when a bug popped up or someone asked for a tweak.

Recently, I ran into a headache: making a small change to a database column required opening three different editor windows, jumping across repositories, and keeping schemas in sync. On top of that, when I wanted to use AI coding agents to refactor code or write tests, the agent was completely blind to the other parts of the stack.

I wanted everything in a single **monorepo**:

```text
ledger/
├── backend/
├── web/
└── android/
```

The challenge was: **I didn't want to lose a full year of commit history and `git blame` context.**

Here is why simple copy-pasting wasn't an option, why I skipped submodules, and how `git subtree` solved it in 5 minutes.

---

## Why Not Just Copy and Paste the Files?

The easiest way to make a monorepo is to create a new folder, copy `ledger-backend/`, `ledger-web/`, and `ledger-android/` into it, and run `git commit -m "initial monorepo"`.

The problem? **You wipe out your entire git history.**

All my commits from last year—explaining why a calculation was rounded a certain way, or why an edge case in interest rates was patched—would vanish. `git blame` would just show my name on every line from today.

---

## Why Not `git submodule`?

Git submodules don't actually store code in the repository; they just point to a specific commit hash of an external repo.

In practice, submodules can be frustrating:
- When someone (or an AI agent) clones the repo without `--recursive`, the folders are completely empty.
- You end up in "detached HEAD" states whenever you try to edit files inside a submodule.
- CI/CD pipelines require extra token permissions to clone each private submodule.

I didn't want complex pointers. I just wanted normal folders with normal files that anyone could clone with a standard `git clone`.

---

## The Solution: `git subtree`

**Git Subtree** has been built directly into Git for years. 

Unlike submodules, a subtree actually commits the external files directly into your repository while **importing and stitching its entire commit history** into a specific subfolder.

Anyone who clones the monorepo doesn't even need to know what a subtree is—to them, it's just regular code in regular directories.

---

## Step-by-Step: How to Merge the Repos

Here is the exact sequence of commands I used:

### Step 1: Create the new parent repository

Create a clean folder for the monorepo and initialize it:

```bash
mkdir ledger-monorepo
cd ledger-monorepo
git init
git commit --allow-empty -m "chore: initial monorepo commit"
```

*(Making an initial empty commit gives Git a base `main` branch to graft the histories onto).*

### Step 2: Add the old repos as remotes

Next, add your existing repositories as temporary git remotes:

```bash
git remote add backend-remote https://github.com/your-username/ledger-backend.git
git remote add web-remote https://github.com/your-username/ledger-web.git
git remote add android-remote https://github.com/your-username/ledger-android.git
```

Fetch the commits from all of them:

```bash
git fetch --all
```

### Step 3: Add each repo as a subtree

Now comes the magic command. We use `git subtree add` with `--prefix` pointing to the destination folder:

```bash
# 1. Import backend into /backend
git subtree add --prefix=backend backend-remote main

# 2. Import web dashboard into /web
git subtree add --prefix=web web-remote main

# 3. Import Android app into /android
git subtree add --prefix=android android-remote main
```

Git immediately downloads the files, places them inside `/backend`, `/web`, and `/android`, and merges their entire commit trees into your new repo.

### Step 4: Verify your commit history!

Check the log of any subfolder:

```bash
git log backend/
```

Every single commit from a year ago—with its original author, date, and commit message—is sitting right there.

---

## Things I Learned (Gotchas)

### 1. What to do with the old remotes?
If you're fully moving to the monorepo and don't plan to maintain the separate standalone repos anymore, you can safely remove the remotes:

```bash
git remote remove backend-remote
git remote remove web-remote
git remote remove android-remote
```

Now your monorepo is completely standalone and self-contained.

### 2. Can you still push changes back to the old repos?
Yes! If you ever need to push a fix back upstream to the standalone repo, `git subtree` supports it:

```bash
git subtree push --prefix=backend backend-remote main
```

Git will automatically filter out commits touching the `backend/` prefix and push them to the external repo.

### 3. Repository size
Because you are pulling in all commit histories, your new repo's `.git` folder will be the sum of all three. For small-to-medium apps, this is negligible (mine was only a few megabytes), but watch out if an old repo had accidental huge binaries or video files committed to history.

---

## Why This Made Life Easier for AI Coding Agents

Once everything was in one root directory, using AI tools (like Claude Code, Cursor, or local agents) became a night-and-day difference:

- **Shared Context:** The agent can read backend endpoints in `/backend/src/routes` and instantly update the API client in `/web/src/api` or `/android/app/...`.
- **Single Window:** No more switching between three VS Code instances or copying types by hand.
- **Unified Diff:** A single git commit can update the database migration, the web table, and the Android view simultaneously.

---

## Summary

If you have a set of related apps that you built separately and now want under one roof, don't copy-paste and lose your history, and don't torture yourself with submodules. `git subtree` took 5 minutes and preserved every commit I made for my dad's project.
