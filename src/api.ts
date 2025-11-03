import axios, { AxiosInstance } from 'axios';
import { NounProjectOAuth } from './oauth.js';

const BASE_URL = 'https://api.thenounproject.com';

export interface SearchIconsParams {
  query: string;
  styles?: 'solid' | 'line' | 'solid,line';
  line_weight?: number | string;
  limit_to_public_domain?: 0 | 1;
  thumbnail_size?: 42 | 84 | 200;
  include_svg?: 0 | 1;
  limit?: number;
  next_page?: string;
  prev_page?: string;
}

export interface GetIconParams {
  icon_id: number;
  thumbnail_size?: 42 | 84 | 200;
}

export interface GetCollectionParams {
  collection_id: number;
  thumbnail_size?: 42 | 84 | 200;
  include_svg?: 0 | 1;
  limit?: number;
}

export interface AutocompleteParams {
  query: string;
  limit?: number;
}

export interface DownloadIconParams {
  icon_id: number;
  color?: string;
  filetype?: 'svg' | 'png';
  size?: number;
}

export class NounProjectAPI {
  private oauth: NounProjectOAuth;
  private client: AxiosInstance;

  constructor(apiKey: string, apiSecret: string) {
    this.oauth = new NounProjectOAuth({ apiKey, apiSecret });
    this.client = axios.create({
      baseURL: BASE_URL,
      timeout: 30000,
    });
  }

  /**
   * Search for icons with various filters
   */
  async searchIcons(params: SearchIconsParams) {
    const { query, ...rest } = params;
    const queryParams = new URLSearchParams({
      query,
      ...Object.fromEntries(
        Object.entries(rest)
          .filter(([_, v]) => v !== undefined)
          .map(([k, v]) => [k, String(v)])
      ),
    });

    const url = `${BASE_URL}/v2/icon?${queryParams}`;
    const headers = this.oauth.getHeaders(url);

    const response = await this.client.get('/v2/icon', {
      params: Object.fromEntries(queryParams),
      headers,
    });

    return response.data;
  }

  /**
   * Get a specific icon by ID
   */
  async getIcon(params: GetIconParams) {
    const { icon_id, thumbnail_size } = params;
    const queryParams = thumbnail_size
      ? `?thumbnail_size=${thumbnail_size}`
      : '';
    const url = `${BASE_URL}/v2/icon/${icon_id}${queryParams}`;
    const headers = this.oauth.getHeaders(url);

    const response = await this.client.get(`/v2/icon/${icon_id}`, {
      params: thumbnail_size ? { thumbnail_size } : undefined,
      headers,
    });

    return response.data;
  }

  /**
   * Get a collection by ID
   */
  async getCollection(params: GetCollectionParams) {
    const { collection_id, ...rest } = params;
    const queryParams = new URLSearchParams(
      Object.fromEntries(
        Object.entries(rest)
          .filter(([_, v]) => v !== undefined)
          .map(([k, v]) => [k, String(v)])
      )
    );

    const queryString = queryParams.toString();
    const url = `${BASE_URL}/v2/collection/${collection_id}${
      queryString ? `?${queryString}` : ''
    }`;
    const headers = this.oauth.getHeaders(url);

    const response = await this.client.get(`/v2/collection/${collection_id}`, {
      params: queryParams.toString() ? Object.fromEntries(queryParams) : undefined,
      headers,
    });

    return response.data;
  }

  /**
   * Get autocomplete suggestions for icon search
   */
  async autocomplete(params: AutocompleteParams) {
    const queryParams = new URLSearchParams({
      query: params.query,
      ...(params.limit ? { limit: String(params.limit) } : {}),
    });

    const url = `${BASE_URL}/v2/icon/autocomplete?${queryParams}`;
    const headers = this.oauth.getHeaders(url);

    const response = await this.client.get('/v2/icon/autocomplete', {
      params: Object.fromEntries(queryParams),
      headers,
    });

    return response.data;
  }

  /**
   * Check current API usage and limits
   */
  async checkUsage() {
    const url = `${BASE_URL}/v2/oauth/usage`;
    const headers = this.oauth.getHeaders(url);

    const response = await this.client.get('/v2/oauth/usage', {
      headers,
    });

    return response.data;
  }

  /**
   * Get download URL for an icon with custom color/size
   */
  async getDownloadUrl(params: DownloadIconParams) {
    const { icon_id, ...rest } = params;
    const queryParams = new URLSearchParams(
      Object.fromEntries(
        Object.entries(rest)
          .filter(([_, v]) => v !== undefined)
          .map(([k, v]) => [k, String(v)])
      )
    );

    const queryString = queryParams.toString();
    const url = `${BASE_URL}/v2/icon/${icon_id}/download${
      queryString ? `?${queryString}` : ''
    }`;
    const headers = this.oauth.getHeaders(url);

    const response = await this.client.get(`/v2/icon/${icon_id}/download`, {
      params: queryString ? Object.fromEntries(queryParams) : undefined,
      headers,
    });

    return response.data;
  }
}
