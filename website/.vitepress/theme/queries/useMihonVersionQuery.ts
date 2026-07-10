// Copyright (c) The Tachiyomi Open Source Project
// SPDX-License-Identifier: MPL-2.0

import { useQuery } from '@tanstack/vue-query'
import axios from 'axios'
import { MIHON_MIN_VERSION, MIHON_RELEASES_API } from '../../config/constants'

interface Release {
  tag_name: string
}

/**
 * Fetches the latest Mihon release version (e.g. "0.20.1") from GitHub, falling
 * back to a bundled constant when the request fails (offline / API rate limit).
 */
export default function useMihonVersionQuery() {
  return useQuery<string, Error>({
    queryKey: ['mihon-version'],
    queryFn: async () => {
      const { data } = await axios.get<Release>(MIHON_RELEASES_API)

      return data.tag_name?.replace(/^v/, '') || MIHON_MIN_VERSION
    },
    initialData: () => MIHON_MIN_VERSION,
    // Treat the seeded fallback as already stale so the real version is fetched
    // on mount; without this, `staleTime` would keep the fallback "fresh" and no
    // request would ever be made.
    initialDataUpdatedAt: 0,
    staleTime: 1000 * 60 * 60, // 1 hour once a real response is cached
    retry: false,
    refetchOnWindowFocus: false,
  })
}
