import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page Content',
  type: 'document',
  // @ts-ignore
  __experimental_actions: ['update', 'publish'],
  groups: [
    {
      name: 'hero',
      title: 'Hero Section',
    },
    {
      name: 'about',
      title: 'About Nagu',
    },
    {
      name: 'whyChooseUs',
      title: 'Why Choose Us',
    },
    {
      name: 'tour',
      title: 'Clinic Tour',
    },
    {
      name: 'seo',
      title: 'SEO Settings',
    },
  ],
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'hero',
      group: 'hero',
    }),
    defineField({
      name: 'aboutSection',
      title: 'About Section (Discover Nagu)',
      type: 'object',
      group: 'about',
      fields: [
        defineField({name: 'tag', type: 'string', title: 'Tagline Pill (e.g., About Nagu)'}),
        defineField({name: 'title', type: 'string', title: 'Section Title'}),
        defineField({name: 'description', type: 'text', title: 'Section Description'}),
        defineField({
          name: 'features',
          title: 'Features Checklist',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {name: 'title', type: 'string', title: 'Feature Title'},
                {name: 'description', type: 'text', title: 'Feature Description'},
              ],
            },
          ],
        }),
        defineField({
          name: 'doctorCta',
          title: 'Doctor CTA Card',
          type: 'object',
          fields: [
            {name: 'doctorName', type: 'string', title: 'Doctor Name'},
            {name: 'doctorTitle', type: 'string', title: 'Doctor Title'},
            {name: 'doctorImage', type: 'image', title: 'Doctor Image'},
            {name: 'ctaLabel', type: 'string', title: 'CTA Link Label'},
          ],
        }),
        defineField({name: 'rightImage', type: 'image', title: 'Section Main Right Image'}),
      ],
    }),
    defineField({
      name: 'whyChooseUsSection',
      title: 'Why Choose Us Section',
      type: 'object',
      group: 'whyChooseUs',
      fields: [
        defineField({name: 'heading', type: 'string', title: 'Section Heading'}),
        defineField({name: 'description', type: 'text', title: 'Section Description'}),
        defineField({
          name: 'features',
          title: 'Feature Cards',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'featureCard',
              fields: [
                {name: 'title', type: 'string', title: 'Title'},
                {name: 'description', type: 'text', title: 'Description'},
                {name: 'icon', type: 'image', title: 'Icon / Image'},
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'tourSection',
      title: 'Clinic Tour Section',
      type: 'object',
      group: 'tour',
      fields: [
        defineField({name: 'title', type: 'string', title: 'Tour Title (e.g. Our Clinic)'}),
        defineField({name: 'tourImage', type: 'image', title: 'Tour Panorama Image (360)'}),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Homepage Content',
      }
    },
  },
})
