---
title: "Accessing My Local AI Coding Agent from Anywhere with Tailscale"
date: "2026-09-14"
category: "Engineering"
readTime: "4 min read"
description: "How I use Tailscale, tmux, and a few CLI tools to turn my home desktop into a private remote AI coding machine without port forwarding or paying for cloud VMs."
---

My home desktop has a fast CPU, decent RAM, and all my local git repos and API credentials already set up. But during the day, I’m often out with a lightweight laptop or just my phone.

I wanted a way to trigger and monitor long-running AI coding agents running on my main machine without paying for an expensive cloud VM or exposing open ports on my home router.

A few months ago I set up **Tailscale**, and it solved this completely. Here is the simple setup I use.

---

## What is Tailscale doing here?

Normally, connecting to your home PC from the outside means messing with router port forwarding, dynamic DNS, or using public tunneling tools like ngrok.

Tailscale creates a secure, private mesh network (using WireGuard) between your devices. Once installed:
- My home PC and laptop get private 100.x.y.z IP addresses.
- Traffic is encrypted peer-to-peer.
- Only devices signed into my account can see or reach each other. Zero public internet exposure.

---

## The Stack

I combine three simple tools:

1. **Tailscale**: Connects my laptop/phone to my desktop securely.
2. **tmux**: Keeps the agent process running in the background even if my connection drops.
3. **The Agent CLI / Web UI**: (e.g., Claude Code, an agentic loop, or a local MCP/dev server).

---

## The Setup (Step-by-Step)

### 1. Install Tailscale & Enable Tailscale SSH

Install Tailscale on both your home PC and your laptop from [tailscale.com](https://tailscale.com).

On your home machine (Linux/macOS/WSL), enable Tailscale SSH so you don't even need to manage SSH keys:

```bash
sudo tailscale up --ssh
```

Now you can SSH into your desktop from your laptop using its MagicDNS name:

```bash
ssh my-desktop
```

### 2. Run the agent inside `tmux`

If you close your laptop lid or lose Wi-Fi on the train, you don't want your agent to die mid-task. 

On the host machine, start a named `tmux` session:

```bash
tmux new -s agent
```

Inside `tmux`, launch your agent or dev server:

```bash
# Example: starting an agent run
claude
```

Detach from the session anytime with `Ctrl + b`, then `d`. Your agent keeps working quietly on your desktop.

To check back in later from your phone or laptop:

```bash
tmux attach -t agent
```

### 3. Exposing a local Web UI or dev server privately

Some agents come with a browser UI or spin up a local preview server on `localhost:3000`.

To access that web UI securely on your phone or laptop without opening it to the public, use `tailscale serve`:

```bash
tailscale serve http://localhost:3000
```

This makes `http://my-desktop.your-tailnet.ts.net` accessible exclusively on your private Tailscale network.

---

## Gotchas That Tripped Me Up

Here are the real mistakes I made when setting this up:

### 1. The desktop goes to sleep
If your host PC goes to sleep after 30 minutes of inactivity, your agent obviously stops and Tailscale drops.
- **Fix:** In your power settings, set "Sleep when plugged in" to Never, or configure Wake-on-LAN.

### 2. Localhost vs 0.0.0.0 binding
Some dev servers or web UIs bind strictly to `127.0.0.1`. If you want other devices on your Tailnet to connect directly to a port, ensure the service binds to `0.0.0.0` or use `tailscale serve` to forward it safely.

### 3. Lingering background tasks
AI agents can spawn background subagents, dev servers, or heavy Docker containers. When you detach and walk away, remember they are actively consuming local CPU/RAM.

---

## Cleanup & Teardown

When you're done with a remote session, keep your machine clean:

```bash
# Stop sharing the local port
tailscale serve reset

# Kill the tmux session once the task is finished
tmux kill-session -t agent
```

---

## Summary

This setup costs \$0, requires zero port forwarding, and lets me treat my home desktop like a private, high-powered remote workstation from anywhere.
