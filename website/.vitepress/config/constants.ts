// SPDX-License-Identifier: Apache-2.0

export const GITHUB_EXTENSION_REPO = 'keiyoushi/extensions';
export const GITHUB_EXTENSION_BASE = `https://raw.githubusercontent.com/${GITHUB_EXTENSION_REPO}/repo`;
export const GITHUB_EXTENSION_JSON = `${GITHUB_EXTENSION_BASE}/index.json`;
export const GITHUB_EXTENSION_PB = `https://github.com/${GITHUB_EXTENSION_REPO}/raw/repo/index.pb`;
export const JSDELIVR_EXTENSION_PB = `https://cdn.jsdelivr.net/gh/${GITHUB_EXTENSION_REPO}@repo/index.pb`

export const GITHUB_RUNTIME_REPO = 'keiyoushi/runtime';
export const GITHUB_RUNTIME_PB = `https://github.com/${GITHUB_RUNTIME_REPO}/raw/repo/index.pb`;
export const JSDELIVR_RUNTIME_PB = `https://cdn.jsdelivr.net/gh/${GITHUB_RUNTIME_REPO}@repo/index.pb`;
export const GITHUB_RUNTIME_RELEASES_LATEST = `https://github.com/${GITHUB_RUNTIME_REPO}/releases/latest`;
export const GITHUB_RUNTIME_APK = `${GITHUB_RUNTIME_RELEASES_LATEST}/download/keiyoushi-runtime.apk`;

export const MIHON_REPO = 'mihonapp/mihon';
export const MIHON_RELEASES_API = `https://api.github.com/repos/${MIHON_REPO}/releases/latest`;
// Fallback shown when the latest release can't be fetched (offline, API rate limit, etc.).
export const MIHON_MIN_VERSION = '0.20.1';
