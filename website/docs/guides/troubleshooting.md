---
# Copyright (c) The Tachiyomi Open Source Project
# SPDX-License-Identifier: MPL-2.0
title: Troubleshooting
titleTemplate: Guides
description: Facing issues with extensions? Here's how to troubleshoot.
---

# Troubleshooting
Facing issues with extensions? Here's how to troubleshoot.

Reminder that we do not provide support with apps; you will need to visit
the apps' websites for that.

## Extension installation issues
Encountering problems while trying to install or update extensions? Follow these steps:

1. Try restarting the app. There is a known bug where the app doesn't recognize newly-updated
extensions.
2. If the first step doesn't work, install [Split APK Installer](https://play.google.com/store/apps/details?id=com.aefyr.sai) from the Google Play Store and install your `.apk` from there.

**Split APK Installer** helps show better error messages or may even successfully install your `.apk` without issue. Common errors include:

::: details `INSTALL_FAILED_UPDATE_INCOMPATIBLE: Package eu.kanade.tachiyomi signatures do not match the previously installed version; ignoring!`
This error indicates that you have the same extension installed from another source, causing
a signature mismatch.

Uninstall the old extension entirely and install the new one. No library entries and extension
settings will be lost.
:::

::: details `DISPLAY_NAME column is null`
This error points to a corrupted `.apk`. Try redownloading the `.apk`.
:::


## WebView

### Accessing websites via WebView

::: tabs
== From Browse
1. Open **Browse** from the bottom navbar.
1. Tap the desired source.
1. Tap the **WebView** icon in the top toolbar.
1. Complete a **CAPTCHA** if one is shown.
1. Close by tapping `X` at the top-left.
== From a Series
1. Open a series.
1. Tap the **WebView** icon button.
1. Complete a **CAPTCHA** if one is shown.
1. Close by tapping `X` at the top-left.
:::

Repeat if needed.
Alternatively, try opening the website in your browser using the **Overflow** icon in the WebView screen and solve any **CAPTCHA** there.

![Open WebView](/docs/guides/troubleshooting/open-webview.dark.webp =1079x520)

### Clearing cookies and WebView data
This resets your WebView to a clean state, including any login states.

1. Navigate to <nav to="advanced">.
1. Tap **Clear cookies**.
1. Tap **Clear WebView data**.

### WebView update
To update WebView, you need to find what WebView implementation is used on your device.

Typical default implementation depends on the Android version as follows:

::: tabs
== Android 10 and above
[Android System WebView](https://play.google.com/store/apps/details?id=com.google.android.webview)
== Android 7 - 9
[Google Chrome](https://play.google.com/store/apps/details?id=com.android.chrome)
== Android 6 and below
[Android System WebView](https://play.google.com/store/apps/details?id=com.google.android.webview)
:::

::: tip **Android 7** and above
Newer Android users can check/change WebView in [Developer Options](https://developer.android.com/studio/debug/dev-options).
:::

::: warning Caution with Non-Standard WebView
Using non-standard WebView might cause **Tachiyomi** to malfunction or crash.

It's best to use the standard [Android System WebView](https://play.google.com/store/apps/details?id=com.google.android.webview) or [Google Chrome](https://play.google.com/store/apps/details?id=com.android.chrome).
:::

## Cloudflare

**Cloudflare**, an anti-bot mechanism, is used by some sources.
Some sources intentionally have higher **Cloudflare** protection to deter apps like **Tachiyomi**.

### Dealing with Cloudflare looping
Certain sources may employ more advanced **Cloudflare** protection, leading to WebView continuously reloading when bypassing using the above solution.
If this occurs, try [accessing the website via WebView](#accessing-websites-via-webview).

### Changing your user agent
A user agent string shares requester information with websites, potentially affecting **Cloudflare**'s bot detection.
While some sources have specific user agent strings, most rely on the app's default.

::: info Changing your user agent
1. Navigate to <nav to="advanced">
2. Modify **Default user agent string** to another value. You may need to experiment to find one that works.
  > [Here's a reference](https://www.whatismybrowser.com/guides/the-latest-user-agent/).
3. Restart the app and retry source access.
:::

::: tip Did these methods not work?
Wait for the source to lower its protection or switch to different sources.
:::
