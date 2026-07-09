import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

// Icon components for premium looking sidebar
const SettingsIcon = () => '⚙️'
const PagesIcon = () => '📄'
const TreatmentIcon = () => '🦷'
const SeoIcon = () => '🔍'
const RobotIcon = () => '🤖'
const SitemapIcon = () => '🗺️'

export default defineConfig({
  name: 'default',
  title: 'nagu dental cms',

  projectId: 'exi81qhl',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Global Settings (singleton)
            S.listItem()
              .title('Global Settings')
              .id('siteSettings')
              .icon(SettingsIcon)
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            S.divider(),

            // Pages (Home, About, Contact)
            S.listItem()
              .title('Pages')
              .icon(PagesIcon)
              .child(
                S.list()
                  .title('Pages')
                  .items([
                    S.listItem()
                      .title('Home Page')
                      .id('homePage')
                      .icon(PagesIcon)
                      .child(
                        S.document()
                          .schemaType('homePage')
                          .documentId('homePage')
                      ),
                    S.listItem()
                      .title('About Page')
                      .id('aboutPage')
                      .icon(PagesIcon)
                      .child(
                        S.document()
                          .schemaType('aboutPage')
                          .documentId('aboutPage')
                      ),
                    S.listItem()
                      .title('Contact Page')
                      .id('contactPage')
                      .icon(PagesIcon)
                      .child(
                        S.document()
                          .schemaType('contactPage')
                          .documentId('contactPage')
                      ),
                  ])
              ),
            S.divider(),

            // Treatments (collection)
            S.documentTypeListItem('treatment')
              .title('Treatments')
              .icon(TreatmentIcon),
            S.divider(),

            // SEO section (Robots, Sitemap)
            S.listItem()
              .title('SEO')
              .icon(SeoIcon)
              .child(
                S.list()
                  .title('SEO Settings')
                  .items([
                    S.listItem()
                      .title('Robots Settings')
                      .id('robotsSettings')
                      .icon(RobotIcon)
                      .child(
                        S.document()
                          .schemaType('robotsSettings')
                          .documentId('robotsSettings')
                      ),
                    S.listItem()
                      .title('Sitemap Settings')
                      .id('sitemapSettings')
                      .icon(SitemapIcon)
                      .child(
                        S.document()
                          .schemaType('sitemapSettings')
                          .documentId('sitemapSettings')
                      ),
                  ])
              ),

            // Automatically filter out handled types to prevent duplication
            ...S.documentTypeListItems().filter(
              (item) =>
                ![
                  'siteSettings',
                  'homePage',
                  'aboutPage',
                  'contactPage',
                  'treatment',
                  'robotsSettings',
                  'sitemapSettings',
                ].includes(item.getId() || '')
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
