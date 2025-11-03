import { Tool } from '@modelcontextprotocol/sdk/types.js';

export const TOOLS: Tool[] = [
  {
    name: 'search_icons',
    description:
      'Search for icons on The Noun Project. Supports filtering by style (solid/line), line weight, public domain status, and more.',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Search term for icons (e.g., "dog", "house", "bicycle")',
        },
        styles: {
          type: 'string',
          enum: ['solid', 'line', 'solid,line'],
          description:
            'Filter by icon style: solid, line, or both (solid,line)',
        },
        line_weight: {
          type: ['number', 'string'],
          description:
            'For line icons, filter by line weight (1-60) or range (e.g., "18-20")',
        },
        limit_to_public_domain: {
          type: 'number',
          enum: [0, 1],
          description: 'Set to 1 to limit results to public domain icons only',
        },
        thumbnail_size: {
          type: 'number',
          enum: [42, 84, 200],
          description: 'Thumbnail size to return (42, 84, or 200 pixels)',
        },
        include_svg: {
          type: 'number',
          enum: [0, 1],
          description: 'Set to 1 to include SVG URLs in the response',
        },
        limit: {
          type: 'number',
          description: 'Maximum number of results to return',
        },
      },
      required: ['query'],
    },
  },
  {
    name: 'get_icon',
    description:
      'Get detailed information about a specific icon by its ID. Returns icon metadata, creator info, tags, and download URLs.',
    inputSchema: {
      type: 'object',
      properties: {
        icon_id: {
          type: 'number',
          description: 'The unique ID of the icon',
        },
        thumbnail_size: {
          type: 'number',
          enum: [42, 84, 200],
          description: 'Thumbnail size to return (42, 84, or 200 pixels)',
        },
      },
      required: ['icon_id'],
    },
  },
  {
    name: 'get_collection',
    description:
      'Get a collection by ID. Returns collection metadata and the icons it contains.',
    inputSchema: {
      type: 'object',
      properties: {
        collection_id: {
          type: 'number',
          description: 'The unique ID of the collection',
        },
        thumbnail_size: {
          type: 'number',
          enum: [42, 84, 200],
          description: 'Thumbnail size to return for icons (42, 84, or 200 pixels)',
        },
        include_svg: {
          type: 'number',
          enum: [0, 1],
          description: 'Set to 1 to include SVG URLs in the response',
        },
        limit: {
          type: 'number',
          description: 'Maximum number of icons to return from the collection',
        },
      },
      required: ['collection_id'],
    },
  },
  {
    name: 'icon_autocomplete',
    description:
      'Get autocomplete suggestions for icon search terms. Useful for helping users discover related terms.',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Partial search term to get suggestions for',
        },
        limit: {
          type: 'number',
          description: 'Maximum number of suggestions to return',
        },
      },
      required: ['query'],
    },
  },
  {
    name: 'check_usage',
    description:
      'Check current API usage and limits. Returns monthly quota information including usage count and remaining requests.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'get_download_url',
    description:
      'Get a download URL for an icon with custom color and size options. Supports SVG and PNG formats.',
    inputSchema: {
      type: 'object',
      properties: {
        icon_id: {
          type: 'number',
          description: 'The unique ID of the icon to download',
        },
        color: {
          type: 'string',
          description: 'Hexadecimal color value (e.g., "FF0000" for red)',
        },
        filetype: {
          type: 'string',
          enum: ['svg', 'png'],
          description: 'File format: svg or png',
        },
        size: {
          type: 'number',
          description: 'For PNG, size in pixels (minimum 20, maximum 1200)',
        },
      },
      required: ['icon_id'],
    },
  },
];
