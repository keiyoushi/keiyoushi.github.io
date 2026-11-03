// SPDX-License-Identifier: Apache-2.0

import { EXTENSION_DOWNLOAD_HOSTS } from '../../config/constants'

/**
 * Returns `url` (normalized) when it is an https URL whose host is exactly one
 * of the extension download hosts, and "" otherwise. The extension index is
 * remote data: rendering any other URL as a link could run script in this
 * site's origin (e.g. a `javascript:` URL) or send visitors to an unexpected
 * download.
 */
export function allowedDownloadUrl(url: string | undefined) {
  try {
    const parsed = new URL(url ?? '')

    return parsed.protocol === 'https:' && EXTENSION_DOWNLOAD_HOSTS.includes(parsed.hostname)
      ? parsed.href
      : ''
  }
  catch {
    return ''
  }
}
