import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'sitemapSettings',
  title: 'Sitemap Settings',
  type: 'document',
  // @ts-ignore
  __experimental_actions: ['update', 'publish'], // Prevent deletion/creation in Studio (singleton)
  groups: [
    {
      name: 'general',
      title: 'General Settings',
    },
    {
      name: 'pages',
      title: 'Included Pages',
    },
    {
      name: 'custom',
      title: 'Custom & Excluded URLs',
    },
  ],
  fields: [
    // General Settings
    defineField({
      name: 'baseUrl',
      title: 'Website Base URL',
      type: 'url',
      description: 'The production root URL of the website (e.g. https://nagu-dental-nu.vercel.app).',
      group: 'general',
      validation: (Rule) => Rule.required(),
      initialValue: 'https://nagu-dental-nu.vercel.app',
    }),
    defineField({
      name: 'defaultChangefreq',
      title: 'Default Change Frequency',
      type: 'string',
      description: 'How frequently the pages are generally updated.',
      group: 'general',
      options: {
        list: [
          {title: 'Always', value: 'always'},
          {title: 'Hourly', value: 'hourly'},
          {title: 'Daily', value: 'daily'},
          {title: 'Weekly', value: 'weekly'},
          {title: 'Monthly', value: 'monthly'},
          {title: 'Yearly', value: 'yearly'},
          {title: 'Never', value: 'never'},
        ],
      },
      initialValue: 'weekly',
    }),
    defineField({
      name: 'defaultPriority',
      title: 'Default Priority',
      type: 'number',
      description: 'The default priority of website pages (value between 0.0 and 1.0).',
      group: 'general',
      validation: (Rule) => Rule.min(0.0).max(1.0),
      initialValue: 0.5,
    }),

    // Included Core Pages Group (designed to be easily extensible)
    defineField({
      name: 'includeHomepage',
      title: 'Include Homepage',
      type: 'boolean',
      description: 'Include the website index page (/).',
      group: 'pages',
      initialValue: true,
    }),
    defineField({
      name: 'includeAboutPage',
      title: 'Include About Page',
      type: 'boolean',
      description: 'Include the static /about.html or /about page.',
      group: 'pages',
      initialValue: true,
    }),
    defineField({
      name: 'includeTreatments',
      title: 'Include Treatments',
      type: 'boolean',
      description: 'Include the treatments index and dynamic treatment sub-pages.',
      group: 'pages',
      initialValue: true,
    }),
    defineField({
      name: 'includeContactPage',
      title: 'Include Contact Page',
      type: 'boolean',
      description: 'Include the static /contact.html or /contact page.',
      group: 'pages',
      initialValue: true,
    }),

    // Custom & Excluded URLs Group
    defineField({
      name: 'customUrls',
      title: 'Include Additional Custom URLs',
      type: 'array',
      description: 'Manually add paths not automatically parsed or managed by Sanity.',
      group: 'custom',
      of: [
        {
          type: 'object',
          name: 'customUrlItem',
          title: 'Custom URL Item',
          fields: [
            defineField({
              name: 'path',
              title: 'Path',
              type: 'string',
              description: 'Relative path starting with a slash (e.g. "/services/special-offer").',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'changefreq',
              title: 'Change Frequency Override',
              type: 'string',
              options: {
                list: [
                  {title: 'Always', value: 'always'},
                  {title: 'Hourly', value: 'hourly'},
                  {title: 'Daily', value: 'daily'},
                  {title: 'Weekly', value: 'weekly'},
                  {title: 'Monthly', value: 'monthly'},
                  {title: 'Yearly', value: 'yearly'},
                  {title: 'Never', value: 'never'},
                ],
              },
            }),
            defineField({
              name: 'priority',
              title: 'Priority Override',
              type: 'number',
              validation: (Rule) => Rule.min(0.0).max(1.0),
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'excludedUrls',
      title: 'Excluded URLs',
      type: 'array',
      description: 'Paths to explicitly exclude from the sitemap generation (e.g. "/privacy.html", "/admin/").',
      group: 'custom',
      of: [{type: 'string'}],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Sitemap Settings',
      }
    },
  },
})
