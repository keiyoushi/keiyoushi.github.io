// Copyright (c) The Tachiyomi Open Source Project
// SPDX-License-Identifier: MPL-2.0

// Repos may ship pseudo-languages that aren't valid BCP 47 tags ("none",
// "other", ...). `Intl.DisplayNames` throws a RangeError on those, which would
// otherwise blow up sorting/rendering of the whole extension list.
function displayName(code: string, locale: string) {
  try {
    return new Intl.DisplayNames([locale], { type: 'language' }).of(code) ?? code
  }
  catch {
    return code
  }
}

export function simpleLangName(code: string) {
  if (code === 'all')
    return 'All'

  return capitalize(displayName(code, 'en'), 'en')
}

export function langName(code: string) {
  if (code === 'all')
    return 'All'

  const inEnglish = capitalize(displayName(code, 'en'), 'en')
  const inNative = capitalize(displayName(code, code), code)

  return inEnglish === inNative ? inEnglish : `${inEnglish} - ${inNative}`
}

function capitalize(string: string, locale: string) {
  try {
    return string.charAt(0).toLocaleUpperCase(locale) + string.substring(1)
  }
  catch {
    return string.charAt(0).toUpperCase() + string.substring(1)
  }
}
