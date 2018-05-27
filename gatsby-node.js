const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const slash = require(`slash`)
const slugify = require(`limax`)

const slugToAnchor = slug =>
  slug
    .split(`/`) // split on dir separators
    .filter(item => item !== ``) // remove empty values
    .pop() // take last item


exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js')
    const tagTemplate = path.resolve('./src/templates/tags.js')
    const categoryTemplate = path.resolve('./src/templates/category.js')
    const contributorPageTemplate = path.resolve(`./src/templates/template-contributor-page.js`)


    resolve(
      graphql(
        `
          {
            allMarkdownRemark(
              sort: { order: DESC, fields: [frontmatter___date] }
              limit: 1000
            ) {
              edges {
                node {
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                    tags
                    category
                  }
                }
              }
            }
            allAuthorYaml {
              edges {
                node {
                  fields {
                    slug
                  }
                }
              }
            }

          }
       `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }
        // Create blog posts pages.

        const posts = result.data.allMarkdownRemark.edges

        _.each(posts, (post, index) => {
          const previous = index === posts.length - 1 ? false : posts[index + 1].node;
          const next = index === 0 ? false : posts[index - 1].node;
          createPage({
            path: post.node.fields.slug,
            component: blogPost,
            context: {
              slug: post.node.fields.slug,
              previous,
              next,
            },
          })
        })

        // Create contributor pages.
        result.data.allAuthorYaml.edges.forEach(edge => {
          createPage({
            path: `${edge.node.fields.slug}`,
            component: slash(contributorPageTemplate),
            context: {
              slug: edge.node.fields.slug,
            },
          })
        })



        // Tag pages:
        let tags = []
        // Iterate through each post, putting all found tags into `tags`
        posts.forEach(edge => {
          if (_.get(edge, `node.frontmatter.tags`)) {
            tags = tags.concat(edge.node.frontmatter.tags)
          }
        })
        // Eliminate duplicate tags
        tags = _.uniq(tags)

        // Make tag pages
        tags.forEach(tag => {
          const tagPath = `/tags/${_.kebabCase(tag)}/`

          createPage({
            path: tagPath,
            component: tagTemplate,
            context: {
              tag,
            },
          })
        })
        // category pages:
        let category = []
        // Iterate through each post, putting all found tags into `tags`
        posts.forEach(edge => {
          if (_.get(edge, `node.frontmatter.category`)) {
            category = category.concat(edge.node.frontmatter.category)
          }
        })
        // Eliminate duplicate tags
        category = _.uniq(category)

        // Make tag pages
        category.forEach(category => {
          const categoryPath = `/category/${_.kebabCase(category)}/`

          createPage({
            path: categoryPath,
            component: categoryTemplate,
            context: {
              category,
            },
          })
        })
      })
    )
  })
}

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  } else if (node.internal.type === `AuthorYaml`) {
    slug = `/contributors/${slugify(node.id)}/`
    createNodeField({ node, name: `slug`, value: slug })
  }


}
