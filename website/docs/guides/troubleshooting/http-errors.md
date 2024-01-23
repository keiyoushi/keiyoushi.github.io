---
# Copyright (c) The Tachiyomi Open Source Project
# SPDX-License-Identifier: MPL-2.0
title: HTTP errors
titleTemplate: Troubleshooting - Guides
description: Encountering HTTP errors? Here's what they mean and how to address them.
---

# HTTP errors
Encountering HTTP errors? Here's what they mean and how to address them.

## 403: Forbidden
Possible reasons for this error:
- The selected source has Cloudflare protection. Check the [Cloudflare guide](/docs/guides/troubleshooting#cloudflare) for solutions.
- The source might be down, removed the series, or banned your IP.
  > Open [WebView](/docs/guides/troubleshooting#accessing-websites-via-webview) to confirm.

## 404: Not Found
This error likely indicates that the source is down or the series has been removed. 
Use [**WebView**](/docs/guides/troubleshooting#accessing-websites-via-webview) to verify.
  > Consider switching to a different source for the series.

## 429: Too Many Requests
This error suggests the source temporarily banned your IP due to fast downloads/reads.

[Report the issue](https://github.com/keiyoushi/extensions-source/issues/new/choose) to add rate limits and prevent future IP bans.

## 5xx: Server Errors
Errors like 500, 502, etc., indicate server-side issues on the source's end.

[Check the source in WebView](/docs/guides/troubleshooting#accessing-websites-via-webview) to check if it's down.

## 1006, 1007, 1008, 1106: Access Denied
This error means a temporary IP ban by the source.

## 1020: Access Denied
This error points to violating a firewall rule set by the site owner.
The owner might have raised Cloudflare protection or blocked IPs from outside their country.
