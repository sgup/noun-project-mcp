import OAuth from 'oauth-1.0a';
import crypto from 'crypto';

export interface OAuthConfig {
  apiKey: string;
  apiSecret: string;
}

export class NounProjectOAuth {
  private oauth: OAuth;
  private token: OAuth.Token;

  constructor(config: OAuthConfig) {
    this.oauth = new OAuth({
      consumer: {
        key: config.apiKey,
        secret: config.apiSecret,
      },
      signature_method: 'HMAC-SHA1',
      hash_function(baseString, key) {
        return crypto
          .createHmac('sha1', key)
          .update(baseString)
          .digest('base64');
      },
    });

    // For Noun Project API, we don't need token credentials (just consumer credentials)
    this.token = {
      key: '',
      secret: '',
    };
  }

  /**
   * Get OAuth authorization headers for a request
   */
  getAuthHeaders(url: string, method: string = 'GET'): Record<string, string> {
    const requestData: OAuth.RequestOptions = {
      url,
      method,
    };

    const authHeaders = this.oauth.toHeader(
      this.oauth.authorize(requestData, this.token)
    );

    // Convert Header type to Record<string, string>
    return authHeaders as unknown as Record<string, string>;
  }

  /**
   * Get complete headers including OAuth authorization
   */
  getHeaders(url: string, method: string = 'GET'): Record<string, string> {
    return {
      ...this.getAuthHeaders(url, method),
      'Content-Type': 'application/json',
    };
  }
}
