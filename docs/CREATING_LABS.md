# Creating a New Query Lab

This guide explains how to create a new Instruqt lab for a different query type.

## Step 1: Create Lab Directory

```bash
mkdir -p instruqt_labs/your-query-type/{track_scripts,01-intro/assets,02-challenge/assets}
```

## Step 2: Create Track Configuration

### `track.yml`

```yaml
slug: your-query-type-lab
id: your-query-type-lab-001
title: 'Your Query Type Lab'
teaser: Learn how to use the [query type] in Elasticsearch
description: |
  This lab teaches you how to use the [query type].
icon: ""
tags:
  - elasticsearch
  - query-dsl
  - full-text-queries
owner: elastic
show_timer: true
idle_timeout: 1800
timelimit: 1800
lab_config:
  extend_ttl: 1800
  sidebar_enabled: true
  feedback_recap_enabled: true
  feedback_tab_enabled: false
  loadingMessages: true
  theme:
    name: modern-dark
  override_challenge_layout: false
  hideStopButton: false
```

### `config.yml`

Copy from `match-query/config.yml` and adjust if needed.

## Step 3: Create Lab Config

Create a lab-specific config file that will be injected into the frontend:

```typescript
// shared/frontend/src/config/labs/your-query-type.ts
export const labConfig: LabConfig = {
  queryType: 'your-query-type',
  displayName: 'Your Query Type',
  docUrl: 'https://www.elastic.co/docs/reference/...',
  introQuery: {
    description: "Example description",
    template: `{
  "query": {
    "your-query-type": {
      // template here
    }
  }
}`,
    hints: ['Hint 1', 'Hint 2'],
  },
  challenge: {
    goal: "Challenge goal description",
    validation: {
      mustInclude: ['your-query-type', 'field-name'],
      expectedResultIds: ['WF-CAM-TEN-30BD9DBB'],
    },
  },
};
```

## Step 4: Create Assignment Files

### `01-intro/assignment.md`

```markdown
---
slug: 01-intro
id: your-query-type-intro-001
type: challenge
title: Understanding the [Query Type]
teaser: Learn how the [query type] works
tabs:
  - id: lab-ui
    title: Query Lab
    type: service
    hostname: kubernetes-vm
    path: /
    port: 3000
difficulty: basic
timelimit: 180
---

# Your Query Type

[Introduction content]

## Try It Out

[Instructions]

## Key Takeaway

[Summary]
```

### `02-challenge/assignment.md`

```markdown
---
slug: 02-challenge
id: your-query-type-challenge-001
type: challenge
title: [Query Type] Challenge
teaser: Write a [query type] query
tabs:
  - id: lab-ui
    title: Query Lab
    type: service
    hostname: kubernetes-vm
    path: /
    port: 3000
difficulty: basic
timelimit: 300
---

# Challenge: [Goal]

[Challenge description]

## Requirements

[Requirements list]

## Steps

[Step-by-step instructions]
```

## Step 5: Create Validation Script

### `02-challenge/check-kubernetes-vm`

```bash
#!/bin/bash

# Validation script for [query type] challenge
echo "=== Validating [Query Type] Challenge ==="

# [Validation logic]
```

## Step 6: Update Setup Script

Copy `match-query/track_scripts/setup-kubernetes-vm` and adjust:
- Lab-specific frontend build (if needed)
- Any special Elasticsearch setup

## Step 7: Build and Deploy

1. Build the frontend with your lab config:
   ```bash
   cd shared/frontend
   # Replace labConfig import with your lab's config
   npm run build
   ```

2. Deploy to Instruqt:
   ```bash
   # Use Instruqt CLI or web UI to deploy
   instruqt track deploy instruqt_labs/your-query-type
   ```

## Tips

- **Keep it simple**: Labs should be < 5 minutes
- **Use the shared dataset**: All labs use the same product catalog
- **Test locally first**: Use the local dev setup before deploying
- **Follow the pattern**: Match the structure of existing labs for consistency

## Example: Match Phrase Query

See `instruqt_labs/match-query/` as a reference implementation.

