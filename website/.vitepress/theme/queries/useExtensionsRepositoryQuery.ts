// Copyright (c) The Tachiyomi Open Source Project
// SPDX-License-Identifier: MPL-2.0

import type { UseQueryOptions } from '@tanstack/vue-query'
import { useQuery } from '@tanstack/vue-query'
import axios from 'axios'
import { GITHUB_EXTENSION_JSON } from '../../config/constants'

export type ReleaseType = 'stable' | 'preview'

export interface Index {
  name: string
  badgeLabel?: string
  signingKey: string
  contact?: Contact
  extensionList: ExtensionList
}

export interface Contact {
  website?: string
  discord?: string
}

export interface ExtensionList {
  extensions: Extension[]
}

export interface Extension {
  name: string
  packageName: string
  resources: Resources
  extensionLib: string
  versionCode: string
  versionName: string
  contentWarning: ContentWarning
  sources: Source[]
}

export interface Resources {
  apkUrl: string
  iconUrl: string
}

export interface Source {
  id: string
  name: string
  language: string
  homeUrl: string
  mirrorUrls?: string[]
}

export enum ContentWarning {
  SAFE = 'CONTENT_WARNING_SAFE',
  NSFW = 'CONTENT_WARNING_NSFW',
  MIXED = 'CONTENT_WARNING_MIXED',
}

type UseExtensionsRepositoryQueryOptions<S = Extension[]> =
  UseQueryOptions<Extension[], Error, S>

export default function useExtensionsRepositoryQuery<S = Extension[]>(options: UseExtensionsRepositoryQueryOptions<S> = {}) {
  return useQuery<Extension[], Error, S>({
    queryKey: ['extensions'],
    queryFn: async () => {
      const { data } = await axios.get<Index>(GITHUB_EXTENSION_JSON)

      return data.extensionList?.extensions ?? []
    },
    initialData: () => [],
    refetchOnWindowFocus: false,
    ...options,
  })
}
