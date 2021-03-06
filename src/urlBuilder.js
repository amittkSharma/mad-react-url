// @flow

import type { Url } from './models';

export type UrlBuilderOptions = {
  url: Url,
  pathParams?: Object
};

/**
 * Replaces all the matching keys in the path params in the url with the value.
 *
 * @example
 * urlBuilder({url: '/users/:idd', pathParams: {idd: 1}}) === '/users/1
 *
 * @param {String} options.url The url to be parsed
 * @param {Object} options.pathParams Consists of the matching key in the url to be replaced by the value.
 */
export function urlBuilder(options: UrlBuilderOptions): Url {
  const { url, pathParams } = options;

  if (pathParams) {
    return Object.keys(pathParams).reduce(
      (url, key) => replace(key, pathParams[key], url),
      url
    );
  }

  return url;
}

function replace(key, value, url) {
  const regex = new RegExp(`/:${key}/|/:${key}$`);

  return url.replace(regex, match => {
    if (match[match.length - 1] === '/') {
      return `/${value}/`;
    }

    return `/${value}`;
  });
}
