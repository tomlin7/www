---
title: "The Death of `git stash`: Why You Should Be Using Git Worktrees Instead"
date: "2026-07-05"
category: "Engineering"
readTime: "7 min read"
description: "You've been stashing and popping for years, paying a hidden mental tax every time production breaks mid-feature. Git Worktrees — built into Git since 2015 — eliminate context switching entirely. Here's how, and why the whole industry is finally catching on."
image: "https://git-scm.com/images/logos/downloads/Git-Logo-White.png"
---

Let's look at a scenario that happens to every developer at least once a day.

You're deep in the zone, halfway through building a complex new feature. Your working directory is a beautiful mess of uncommitted changes, half-written functions, and console logs. Suddenly, Slack chimes. A critical bug just hit production, and you need to drop everything to push a hotfix.

If you're working in a traditional, single-directory Git workflow, your immediate reaction is probably a familiar sequence of terminal commands:

```bash
git stash save "wip: broken login logic"
git checkout main
git pull origin main
git checkout -b hotfix-urgent-bug
# ...fix the bug, commit, push, wait for CI to pass...
git checkout feature-branch
git stash pop
```

Phew. You're back. But are you *really* back?

Your IDE context is completely blown. Files you were working on are closed or reloaded. Your mental model of where you left off is shattered. If the hotfix changed core files, your local dev server might be throwing a fit until you delete `node_modules` or re-run your package installer. And let's not even talk about the underlying anxiety of running into a nasty stash conflict on your own unfinished code.

It turns out we've been forcing ourselves through this context-switching nightmare for years when a better solution has been built directly into Git since 2015.

It's called **Git Worktrees**.

---

## What is a Git Worktree?

By default, when you clone a repository, Git links your history (the `.git` folder) to exactly one working directory. When you switch branches, Git swaps out the physical files in that single folder to match the target branch.

A **worktree** breaks this one-to-one relationship. It allows you to check out multiple branches of the same repository into **separate sibling directories** simultaneously, all while sharing a single, central `.git` history.

Instead of tearing down your current environment to fix a bug, you simply spin up a brand-new directory next to your project, fix the issue there, and delete it when you're done. Your original editor window remains completely untouched.

---

## Context Switching: The Worktree Way

Let's replay that exact same production emergency, but this time using worktrees. You're on your feature branch, your code is uncommitted, and the emergency call comes in.

Instead of stashing, you run a single command:

```bash
git worktree add ../hotfix-workspace -b hotfix-bug main
```

In less than a second, Git does something incredible:

1. It creates a brand-new folder called `hotfix-workspace` right next to your main project folder.
2. It bases this folder on your `main` branch.
3. It automatically creates and checks out a new branch called `hotfix-bug` inside that folder.

Now, you open that new folder in a separate IDE window (or `cd` into it via your terminal).

```bash
cd ../hotfix-workspace
# ...make your changes, run tests...
git add .
git commit -m "fix: resolve critical button crash"
git push origin hotfix-bug
```

You open the Pull Request, tag your reviewers, and switch your attention right back to your original IDE window. Your unfinished feature code is exactly where you left it. No stashing, no popping, zero friction.

Once the PR is merged, clean-up is a breeze:

```bash
cd ../main-project
git worktree remove ../hotfix-workspace
```

The temporary directory vanishes, your central Git history stays perfectly synced, and your main workspace remains undisturbed.

---

## Why are Worktrees Suddenly Gaining Massive Popularity?

If worktrees have been around for over a decade, why is the engineering community suddenly talking about them like they're the next big thing?

The answer lies in how modern software development has evolved:

1. **The Rise of Parallel AI Coding:** With AI agents and advanced coding assistants capable of generating code, running tests, and reviewing PRs autonomously, development is becoming highly asynchronous. Developers and agents are increasingly running multiple coding sessions in parallel. Worktrees provide the perfect, isolated sandbox for this kind of concurrent workflow.
2. **Tooling Integration:** Major developer tools have finally treated worktrees as first-class citizens. Modern IDEs like VS Code feature native worktree management, and agentic platforms (like the GitHub Copilot app) now use worktrees as their default execution mode to prevent interrupting human developers.
3. **"Review Culture" over "Writing Culture":** Code maintenance now involves constant jumping between testing a peer's branch locally, verifying a bug report, and working on your own features. Worktrees turn a painful context switch into a simple multi-window layout.

---

## The Catch: What to Watch Out For

While worktrees feel like magic, they aren't completely free. There are a few engineering trade-offs you need to manage:

### 1. Dependency Bloat

Because each worktree is a physically separate directory on your machine, it requires its own independent copies of your dependencies. If you are working on a massive enterprise project where `npm install` or a heavy Docker layer takes up gigabytes of disk space, spinning up 4 or 5 parallel worktrees can drain your local storage incredibly quickly.

### 2. The One-Branch Constraint

To protect your repository against data corruption, Git enforces a strict rule: **you cannot check out the exact same branch in two different worktrees at the same time.** If you try to do this, Git will block the command. If you need to look at a branch that is already active elsewhere, you'll have to jump to that specific directory or create a new tracking branch.

### 3. Folder Management & `.gitignore`

If you choose to create your worktree directories *inside* your main repository folder rather than as sibling folders outside of it, you must remember to add them to your global `.gitignore` or local `.git/info/exclude`. Otherwise, Git will track your new workspaces as untracked directories, cluttering your status outputs.

---

## The Verdict: Should You Switch?

Like any architectural pattern in software engineering, the ultimate answer is: *it depends.*

If your daily workflow consists of linear feature development where you finish one task completely before moving to the next, a traditional branching model works perfectly fine.

But if your day is defined by frequent interruptions, rapid code reviews, hotfix emergencies, or collaboration with automated AI developer tools, adopting Git worktrees is one of the highest-ROI workflow adjustments you can make. It entirely eliminates the mental tax of context switching, giving you the freedom to work truly in parallel.

---

**Are you ready to drop `git stash`? Try running your first `git worktree add` on your next task and share your experience in the comments below!**
