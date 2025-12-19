# Elastic Documentation Page Structure

This document describes how Elastic.co documentation pages are structured, to help with parsing examples and generating lab configs automatically.

## Page Structure

### Frontmatter (YAML)

```yaml
---
title: Query string query
description: Returns documents based on a provided query string...
url: https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-query-string-query
---
```

**Key fields**:
- `title`: Query type name (e.g., "Query string query")
- `description`: First paragraph describing the query
- `url`: Full URL to the doc page

### Main Content Sections

#### 1. Introduction
Usually the first paragraph after frontmatter. Contains:
- What the query does
- When to use it
- Key characteristics

**Example**:
> Returns documents based on a provided query string, using a parser with a strict syntax. This query uses a syntax to parse and split the provided query string based on operators...

#### 2. Example Request
First code block showing a basic example:

```json
{
  "query": {
    "query_string": {
      "query": "(new york city) OR (big apple)",
      "default_field": "content"
    }
  }
}
```

**Location**: Usually right after the introduction paragraph.

#### 3. Top-level Parameters
Documentation of all parameters, often in a `<definitions>` block.

**Key parameters to extract**:
- Required parameters (marked as "Required")
- Common optional parameters
- Field-related parameters (`default_field`, `fields`, etc.)

#### 4. Additional Examples
Throughout the page, there are more code examples demonstrating:
- Different parameter combinations
- Advanced use cases
- Edge cases

**Pattern**: Code blocks are usually in JSON format, wrapped in triple backticks with `json` language tag.

## Extracting Examples

### Step 1: Parse Markdown
- Find all code blocks with `json` language tag
- Extract the JSON content
- Validate it's a valid Elasticsearch query

### Step 2: Identify Example Types
Common example patterns:
1. **Basic example**: Simplest form of the query
2. **Parameter examples**: Demonstrating specific parameters
3. **Multi-field examples**: Using `fields` array or similar
4. **Advanced examples**: Complex combinations

### Step 3: Map to Lab Config

For each example, extract:
- **Title**: From surrounding heading or generate from context
- **Description**: From paragraph before/after the code block
- **Template**: The JSON query itself
- **Index**: Infer from field names (e.g., `review_text` → `product_reviews`)
- **Try This**: From surrounding text or generate suggestions

## Query Type-Specific Patterns

### Match Query
- Field location: `query.match.{FIELD}`
- Simple structure: `{ "match": { "field": "value" } }`

### Query String Query
- Field location: `query.query_string.default_field` or `.fields[]`
- Can have complex query syntax in the `query` string

### Bool Query
- Field location: Nested inside `must`/`should`/`must_not`/`filter` clauses
- Wraps other queries
- Structure: `{ "bool": { "must": [...], "should": [...] } }`

## Mapping to Lab Config

| Doc Element | Lab Config Field |
|-------------|------------------|
| `title` (frontmatter) | `displayName` |
| `description` (first paragraph) | `description` |
| `url` (frontmatter) | `docUrl` |
| Code block JSON | `examples[].template` |
| Heading before code block | `examples[].title` |
| Paragraph before code block | `examples[].description` |
| Field name in query | `examples[].index` (inferred) |

## Example Extraction Workflow

1. **Fetch doc page** (markdown source from GitHub or API)
2. **Parse frontmatter** → Extract `title`, `description`, `url`
3. **Find first code block** → Basic example
4. **Find all code blocks** → All examples
5. **Extract context** → Titles, descriptions from surrounding text
6. **Infer index** → From field names in queries
7. **Generate lab config** → Combine into `LabConfig` structure

## Future: Automated Extraction

A script could:
1. Take a doc page URL
2. Fetch and parse the markdown
3. Extract examples automatically
4. Generate initial `labConfig.ts` file
5. Require manual review/curation before deployment

