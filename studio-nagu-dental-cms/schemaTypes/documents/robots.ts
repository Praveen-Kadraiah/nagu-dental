import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'robotsSettings',
  title: 'Robots Settings',
  type: 'document',
  // @ts-ignore
  __experimental_actions: ['update', 'publish'], // Prevent deletion/creation in Studio (singleton)
  groups: [
    {
      name: 'status',
      title: 'Indexing & Crawling',
    },
    {
      name: 'rules',
      title: 'Crawl Rules',
    },
    {
      name: 'advanced',
      title: 'Advanced Settings',
    },
  ],
  fields: [
    defineField({
      name: 'enableIndexing',
      title: 'Enable Indexing',
      type: 'boolean',
      description: 'Instruct search engines to index the pages of this website (adds index directives).',
      group: 'status',
      initialValue: true,
    }),
    defineField({
      name: 'allowCrawling',
      title: 'Allow Crawling',
      type: 'boolean',
      description: 'Permit web search crawlers to scan the website.',
      group: 'status',
      initialValue: true,
    }),
    defineField({
      name: 'allowRules',
      title: 'Allow Rules',
      type: 'array',
      description: 'Explicitly allow paths to be crawled (e.g. "/assets/", "/shared/").',
      group: 'rules',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'disallowRules',
      title: 'Disallow Rules',
      type: 'array',
      description: 'Explicitly block crawlers from these paths (e.g. "/admin/", "/drafts/").',
      group: 'rules',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'sitemapUrls',
      title: 'Additional Sitemap URLs',
      type: 'array',
      description: 'Additional sitemap XML file URLs to advertise in robots.txt.',
      group: 'advanced',
      of: [{type: 'url'}],
    }),
    defineField({
      name: 'customDirectives',
      title: 'Custom Robots Directives',
      type: 'text',
      description: 'Raw plain text directives to append at the bottom of the robots.txt output (e.g., Crawl-delay: 10).',
      group: 'advanced',
      rows: 5,
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Robots Settings',
      }
    },
  },
})
