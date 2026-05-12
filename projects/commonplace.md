---
layout: default_layout.njk
title: A Commonplace Book
date: 2026-05-05T12:00:00Z
tags: ["projects"]
---

## What is this project?

One of my original ideas for this web page was some sort of personal wiki or knowledgebase.[^1] Now that I've got a basic blog set up I'd like to return to that idea a little.

This is inspired by a few things, but most recently [barnsworthburning](https://barnsworthburning.net/extracts/rechxgCFt4OkQUsKD) struck me. I'd like to build something similar for myself.

Honestly, this project is fairly ambitious and will probably be something I tinker with over a long period of time. I see this having a few moving parts that I need to validate and think through to make something useful for myself.

### Parts

- Some kind of data structure for items
- A mechanism for real-time data pulls[^2]
- A way to generate entries from multiple devices

## What's the current status?

**Doing some research and ideation**

{% project "recZFBFjymVSGnUil" %}

[^1]: See [my first blog post.](/posts/building-my-personal-website/)
[^2]: My Gunpla tracker and Letterboxd integration use a scheduled GitHub Action to rebuild this static site. A commonplace book probably needs to update more quickly when something is added.
