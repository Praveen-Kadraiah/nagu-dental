import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Global Settings',
  type: 'document',
  // @ts-ignore
  __experimental_actions: ['update', 'publish'], // Prevent deletion/creation in Studio
  groups: [
    {
      name: 'branding',
      title: 'Branding & Logos',
    },
    {
      name: 'contact',
      title: 'Contact Information',
    },
    {
      name: 'hours',
      title: 'Working Hours',
    },
    {
      name: 'social',
      title: 'Social Media',
    },
    {
      name: 'ctaBanner',
      title: 'Global CTA Banner',
    },
    {
      name: 'seo',
      title: 'Default SEO',
    },
  ],
  fields: [
    defineField({
      name: 'logoDark',
      title: 'Dark Logo (for light backgrounds)',
      type: 'image',
      group: 'branding',
    }),
    defineField({
      name: 'logoLight',
      title: 'Light Logo (for dark backgrounds)',
      type: 'image',
      group: 'branding',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'address',
      title: 'Clinic Address',
      type: 'text',
      group: 'contact',
    }),
    defineField({
      name: 'workingHours',
      title: 'Working Hours',
      type: 'array',
      group: 'hours',
      of: [
        {
          type: 'object',
          name: 'hoursItem',
          fields: [
            {name: 'days', type: 'string', title: 'Days (e.g. Mon - Sat)'},
            {name: 'hours', type: 'string', title: 'Hours (e.g. 8:30 AM - 8:30 PM)'},
          ],
        },
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      group: 'social',
      of: [
        {
          type: 'object',
          name: 'socialItem',
          fields: [
            {name: 'platform', type: 'string', title: 'Platform (e.g. Instagram, Facebook)'},
            {name: 'url', type: 'url', title: 'URL'},
          ],
        },
      ],
    }),
    defineField({
      name: 'ctaBanner',
      title: 'CTA Promo Banner',
      type: 'object',
      group: 'ctaBanner',
      fields: [
        defineField({name: 'heading', type: 'string', title: 'Heading Override'}),
        defineField({name: 'description', type: 'text', title: 'Text Paragraph'}),
        defineField({name: 'cta', type: 'cta', title: 'CTA Button'}),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'Default SEO Settings',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Global Settings',
      }
    },
  },
})
