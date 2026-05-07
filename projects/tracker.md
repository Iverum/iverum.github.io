---
layout: default_layout.njk
title: A Project Tracker
date: 2026-05-05T12:00:00Z
tags: ["projects"]
---

## What is this project?

There are plenty of tools floating around in the world like Trello, Jira, Linear, and whatever else that help you organize your projects into tasks. That's great, but I don't want to use any of those. I don't need all that.

What I want is a simple way to communicate on my personal website the status of a project with high-level tasks that I'm working on.

The motiviation for this project is mostly to test out some ideas that I'd like to use for other projects.

Of course, while I'm working on this project I have no structure for what this page should look like.

## What's the current status?

Experimentation.

I've created an Airtable Base and I'm tinkering with the API now.

## What I've learned?

* Airtable's AI chatbot is pushy. It takes a minute to get by it when you sign up for an account.
  * It also isn't very clever. I asked it to make a field to show the percentage of tasks complete and it tried to prompt an agent with some "you're an expert statistician" junk when all I needed was a formula in a column.
* Unsurprisingly, there isn't a good way to read from an Airtable Base without using some kind of secret key, so that throws a wrench in some part of [A Commonplace Book](/projects/a-commonplace-book/). I think I just need to approach it as a bigger task and maybe create a little more infrastructure. I'm not sure if that means that Airtable is out of the running in this case.
