// Copyright (c) The Tachiyomi Open Source Project
// SPDX-License-Identifier: MPL-2.0

import type { UseQueryOptions } from '@tanstack/vue-query'
import { useQuery } from '@tanstack/vue-query'
import axios from 'axios'
import { GITHUB_EXTENSION_PB } from '../../config/constants'

export type ReleaseType = 'stable' | 'preview'

export interface Extension {
  name: string
  packageName: string
  resources: Resources
  extensionLib: string
  versionCode: number
  versionName: string
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
  mirrorUrls: string[]
  contentRating: ContentRating
  message?: string
}

export enum ContentRating {
  CONTENT_RATING_SAFE = 'CONTENT_RATING_SAFE',
  CONTENT_RATING_SUGGESTIVE = 'CONTENT_RATING_SUGGESTIVE',
  CONTENT_RATING_EROTICA = 'CONTENT_RATING_EROTICA',
  CONTENT_RATING_PORNOGRAPHIC = 'CONTENT_RATING_PORNOGRAPHIC',
}

const schema = {
  nested: {
    Index: {
      fields: {
        name: { type: 'string', id: 1 },
        badgeLabel: { type: 'string', id: 2, options: { proto3_optional: true } },
        signingKey: { type: 'string', id: 3 },
        contact: { type: 'Contact', id: 4, options: { proto3_optional: true } },
        extensions: { rule: 'repeated', type: 'Extension', id: 5 },
      },
    },
    Contact: {
      fields: {
        website: { type: 'string', id: 1, options: { proto3_optional: true } },
        discord: { type: 'string', id: 2, options: { proto3_optional: true } },
      },
    },
    Extension: {
      fields: {
        name: { type: 'string', id: 1 },
        packageName: { type: 'string', id: 2 },
        resources: { type: 'Resources', id: 3 },
        extensionLib: { type: 'string', id: 4 },
        versionCode: { type: 'int32', id: 5 },
        versionName: { type: 'string', id: 6 },
        sources: { rule: 'repeated', type: 'Source', id: 7 },
      },
    },
    Resources: {
      fields: {
        apkUrl: { type: 'string', id: 1 },
        iconUrl: { type: 'string', id: 2 },
      },
    },
    Source: {
      fields: {
        id: { type: 'int64', id: 1 },
        name: { type: 'string', id: 2 },
        language: { type: 'string', id: 3 },
        homeUrl: { type: 'string', id: 4 },
        mirrorUrls: { rule: 'repeated', type: 'string', id: 5 },
        contentRating: { type: 'ContentRating', id: 6 },
        message: { type: 'string', id: 7, options: { proto3_optional: true } },
      },
    },
    ContentRating: {
      values: {
        CONTENT_RATING_SAFE: 0,
        CONTENT_RATING_SUGGESTIVE: 1,
        CONTENT_RATING_EROTICA: 2,
        CONTENT_RATING_PORNOGRAPHIC: 3,
      },
    },
  },
}

type UseExtensionsRepositoryQueryOptions<S = Extension[]> =
  UseQueryOptions<Extension[], Error, S>

export default function useExtensionsRepositoryQuery<S = Extension[]>(options: UseExtensionsRepositoryQueryOptions<S> = {}) {
  return useQuery<Extension[], Error, S>({
    queryKey: ['extensions'],
    queryFn: async () => {
      const [response, protobuf] = await Promise.all([
        axios.get(GITHUB_EXTENSION_PB, { responseType: 'arraybuffer' }),
        import('protobufjs/light'),
      ])

      const root = protobuf.Root.fromJSON(schema)
      const IndexMessage = root.lookupType('Index')

      const message = IndexMessage.decode(new Uint8Array(response.data))
      const object = IndexMessage.toObject(message, {
        longs: String,
        enums: String,
        defaults: true,
        arrays: true,
        objects: true,
        oneofs: true,
      })

      return object.extensions || []
    },
    initialData: () => [],
    refetchOnWindowFocus: false,
    ...options,
  })
}
