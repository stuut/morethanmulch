module.exports = {
  siteMetadata: {
    title: 'More Than Mulch',
    author: 'Daniel Stuut',
    description: 'blog template.',
    siteUrl: 'www.morethanmulch.com.au',
  },
  mapping: {
  "MarkdownRemark.frontmatter.author": `AuthorYaml`,
  },
  plugins: [
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-yaml`,
    `gatsby-plugin-netlify-cms`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/blog`,
        name: 'blog',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/img`,
        name: 'images',
      },
    },
    {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: "GatsbyJS",
      short_name: "GatsbyJS",
      start_url: "/",
      background_color: "#e3e3e3",
      theme_color: "#8fc744",
      display: "minimal-ui",
      icon: "src/images/icon.png" // This path is relative to the root of the site.
      },
    },

    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },

          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    `gatsby-plugin-offline`,


  ],
};
