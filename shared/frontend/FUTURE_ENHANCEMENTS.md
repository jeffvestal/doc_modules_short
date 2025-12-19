# Future Enhancements

This document tracks planned enhancements for the Query Lab component that are not yet implemented.

## Embed Mode

Add support for a compact embed mode that minimizes the header and UI chrome for embedding directly in documentation pages.

**Implementation:**
- Add URL parameter `?embed=true` to enable embed mode
- When enabled:
  - Hide or minimize the header (logo, "Powered by Elastic" text)
  - Reduce padding and spacing
  - Optionally hide the "View official documentation" link
  - Make the component more compact overall

**Use Case:** Allows documentation pages to embed the Query Lab with minimal visual footprint.

## Deep Linking

Enable deep linking to specific examples and queries via URL parameters.

**Implementation:**
- Support URL parameters:
  - `?example=<example-id>` - Jump to a specific example
  - `?query=<encoded-json>` - Pre-fill the query editor with a specific query
  - `?example=fuzziness&query={"query":{"match":{"review_text":{"query":"test","fuzziness":"AUTO"}}}}`
- Update browser history when switching examples
- Allow sharing links to specific query experiments

**Use Case:** Documentation authors can link directly to specific query examples, and users can share their query experiments.


