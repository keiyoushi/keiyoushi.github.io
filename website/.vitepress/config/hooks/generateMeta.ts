// Copyright (c) The Tachiyomi Open Source Project
// SPDX-License-Identifier: MPL-2.0

import type { HeadConfig, TransformContext } from 'vitepress'

function generateMeta(context: TransformContext, hostname: string) {
  const head: HeadConfig[] = []
  const { pageData } = context

  const url = `${hostname}/${pageData.relativePath.replace(/((^|\/)index)?\.md$/, '$2')}`

  head.push(['link', { rel: 'canonical', href: url }])
  head.push(['meta', { property: 'og:url', content: url }])
  head.push(['meta', { name: 'twitter:url', content: url }])
  // head.push(['meta', { name: 'twitter:card', content: 'summary_large_image' }])

  if (pageData.frontmatter.theme)
    head.push(['meta', { name: 'theme-color', content: pageData.frontmatter.theme }])

  if (pageData.frontmatter.type)
    head.push(['meta', { property: 'og:type', content: pageData.frontmatter.type }])

  if (pageData.frontmatter.customMetaTitle) {
    head.push([
      'meta',
      {
        property: 'og:title',
        content: pageData.frontmatter.customMetaTitle,
      },
    ])
    head.push([
      'meta',
      {
        name: 'twitter:title',
        content: pageData.frontmatter.customMetaTitle,
      },
    ])
    head.push(['meta', { property: 'og:site_name', content: '' }])
  }
  else {
    head.push(['meta', { property: 'og:title', content: pageData.frontmatter.title }])
    head.push(['meta', { name: 'twitter:title', content: pageData.frontmatter.title }])
  }
  if (pageData.frontmatter.description) {
    head.push([
      'meta',
      {
        property: 'og:description',
        content: pageData.frontmatter.description,
      },
    ])
    head.push([
      'meta',
      {
        name: 'twitter:description',
        content: pageData.frontmatter.description,
      },
    ])
  }
  head.push(
    [
      'meta',
      {
        property: 'og:image',
        content: `${hostname}/android-chrome-192x192.png`,
      },
    ],
  )
  // if (pageData.frontmatter.image) {
  //   head.push([
  //     'meta',
  //     {
  //       property: 'og:image',
  //       content: `${hostname}/${pageData.frontmatter.image.replace(/^\//, '')}`,
  //     },
  //   ])
  //   head.push([
  //     'meta',
  //     {
  //       name: 'twitter:image',
  //       content: `${hostname}/${pageData.frontmatter.image.replace(/^\//, '')}`,
  //     },
  //   ])
  // }
  // else {
  //   const url = pageData.filePath.replace('index.md', '').replace('.md', '')
  //   const imageUrl = `${url}/__og_image__/og.png`.replace(/\/\//g, '/').replace(/^\//, '')

  //   head.push(['meta', { property: 'og:image', content: `${hostname}/${imageUrl}` }])
  //   head.push(['meta', { property: 'og:image:width', content: '1200' }])
  //   head.push(['meta', { property: 'og:image:height', content: '628' }])
  //   head.push(['meta', { property: 'og:image:type', content: 'image/png' }])
  //   head.push(['meta', { property: 'og:image:alt', content: pageData.frontmatter.title }])
  //   head.push(['meta', { name: 'twitter:image', content: `${hostname}/${imageUrl}` }])
  //   head.push(['meta', { name: 'twitter:image:width', content: '1200' }])
  //   head.push(['meta', { name: 'twitter:image:height', content: '628' }])
  //   head.push(['meta', { name: 'twitter:image:alt', content: pageData.frontmatter.title }])
  // }
  if (pageData.frontmatter.tag)
    head.push(['meta', { property: 'article:tag', content: pageData.frontmatter.tag }])

  if (pageData.frontmatter.date) {
    head.push([
      'meta',
      {
        property: 'article:published_time',
        content: pageData.frontmatter.date,
      },
    ])
  }
  if (pageData.lastUpdated && pageData.frontmatter.lastUpdated !== false) {
    head.push([
      'meta',
      {
        property: 'article:modified_time',
        content: new Date(pageData.lastUpdated).toISOString(),
      },
    ])
  }

  return head
}

export default generateMeta