# Noun Project MCP Server

A Model Context Protocol (MCP) server for The Noun Project API, enabling Claude Code to search and retrieve icons programmatically.

<a href="https://glama.ai/mcp/servers/@sgup/noun-project-mcp">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/@sgup/noun-project-mcp/badge" alt="Noun Project Server MCP server" />
</a>

## Features

- **Icon Search**: Search for icons with advanced filters (style, line weight, public domain)
- **Icon Details**: Get detailed information about specific icons
- **Collections**: Retrieve icon collections
- **Autocomplete**: Get search term suggestions
- **Usage Tracking**: Monitor API quota and usage
- **Download URLs**: Get customized download links with color and size options

## Prerequisites

1. **Node.js**: Version 18 or higher
2. **Noun Project API Credentials**: Get your API key and secret from [The Noun Project](https://thenounproject.com/developers/)

## Installation

### Quick Install (Recommended)

Install directly from npm and add to Claude Code in one command:

```bash
claude mcp add --transport stdio noun-project \
  --env NOUN_PROJECT_API_KEY=your_api_key_here \
  --env NOUN_PROJECT_API_SECRET=your_api_secret_here \
  -- npx -y noun-project-mcp
```

Replace `your_api_key_here` and `your_api_secret_here` with your actual credentials from [The Noun Project](https://thenounproject.com/developers/).

### Local Development

1. Clone and navigate to the repository:
```bash
git clone https://github.com/sgup/noun-project-mcp.git
cd noun-project-mcp
```

2. Install dependencies:
```bash
npm install
```

3. Build the TypeScript code:
```bash
npm run build
```

4. Add to Claude Code using local path:
```bash
claude mcp add --transport stdio noun-project \
  --env NOUN_PROJECT_API_KEY=your_api_key_here \
  --env NOUN_PROJECT_API_SECRET=your_api_secret_here \
  -- node /absolute/path/to/noun-project-mcp/dist/index.js
```

## Available Tools

### 1. search_icons

Search for icons with various filters.

**Parameters:**
- `query` (required): Search term (e.g., "dog", "house")
- `styles` (optional): Filter by style - "solid", "line", or "solid,line"
- `line_weight` (optional): For line icons, specify weight (1-60) or range (e.g., "18-20")
- `limit_to_public_domain` (optional): Set to 1 for public domain only
- `thumbnail_size` (optional): 42, 84, or 200 pixels
- `include_svg` (optional): Set to 1 to include SVG URLs
- `limit` (optional): Maximum number of results

**Example:**
```javascript
{
  "query": "dog",
  "styles": "line",
  "limit": 10
}
```

### 2. get_icon

Get detailed information about a specific icon.

**Parameters:**
- `icon_id` (required): The icon's unique ID
- `thumbnail_size` (optional): 42, 84, or 200 pixels

**Example:**
```javascript
{
  "icon_id": 12345,
  "thumbnail_size": 200
}
```

### 3. get_collection

Retrieve a collection and its icons.

**Parameters:**
- `collection_id` (required): The collection's unique ID
- `thumbnail_size` (optional): 42, 84, or 200 pixels
- `include_svg` (optional): Set to 1 to include SVG URLs
- `limit` (optional): Maximum number of icons to return

**Example:**
```javascript
{
  "collection_id": 123
}
```

### 4. icon_autocomplete

Get autocomplete suggestions for search terms.

**Parameters:**
- `query` (required): Partial search term
- `limit` (optional): Maximum number of suggestions

**Example:**
```javascript
{
  "query": "hom",
  "limit": 5
}
```

### 5. check_usage

Check current API usage and limits.

**Parameters:** None

### 6. get_download_url

Get a download URL for an icon with customization.

**Parameters:**
- `icon_id` (required): The icon's unique ID
- `color` (optional): Hexadecimal color (e.g., "FF0000")
- `filetype` (optional): "svg" or "png"
- `size` (optional): For PNG, size in pixels (20-1200)

**Example:**
```javascript
{
  "icon_id": 12345,
  "color": "FF0000",
  "filetype": "png",
  "size": 512
}
```

## Development

Run in development mode with auto-rebuild:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Start the server:
```bash
npm start
```

## API Reference

This MCP server uses The Noun Project API v2. For more details about the API:
- [API Documentation](https://api.thenounproject.com/getting_started)
- [Migration Guide](https://api.thenounproject.com/migration_v2)

## Authentication

The Noun Project API uses OAuth 1.0 authentication. This server handles all OAuth signing automatically using your API credentials.

## Usage Limits

The Noun Project API has monthly usage limits. Use the `check_usage` tool to monitor your quota.

## Troubleshooting

### "NOUN_PROJECT_API_KEY and NOUN_PROJECT_API_SECRET must be set"

Make sure you included the `--env` flags when running `claude mcp add`. You can verify your configuration with:
```bash
claude mcp list
```

To update your credentials, remove and re-add the server:
```bash
claude mcp remove noun-project
claude mcp add --transport stdio noun-project \
  --env NOUN_PROJECT_API_KEY=your_new_key \
  --env NOUN_PROJECT_API_SECRET=your_new_secret \
  -- npx -y noun-project-mcp
```

### "Invalid signature" errors

Verify that your API key and secret are correct and haven't been regenerated in The Noun Project dashboard.

### Connection issues

Ensure you have an active internet connection and that The Noun Project API is accessible.

## License

MIT

## Support

For issues with this MCP server, please file an issue on the repository.

For issues with The Noun Project API, visit their [support page](https://thenounproject.com/support/).