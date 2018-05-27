import React from "react"
import Img from "gatsby-image"
import '../layouts/index.css'
import BlogPostPreviewItem from "../components/blog-post-preview-item"

class ContributorPageTemplate extends React.Component {
  render() {
    const contributor = this.props.data.authorYaml
    const allMarkdownRemark = this.props.data.allMarkdownRemark
    return (
      <div>
        <div
          css={{
            textAlign: `center`,
          }}
        >
          <div>
            <Img
              resolutions={contributor.avatar.childImageSharp.resolutions}
              css={{
                borderRadius: `100%`,
                display: `inline-block`,
                verticalAlign: `middle`,
              }}
            />
            <h1
              css={{
                marginTop: 0,
              }}
            >
              {contributor.id}
            </h1>
            <p
              css={{
                marginLeft: `auto`,
                marginRight: `auto`,
              }}
            >
              {contributor.bio}
            </p>

          </div>
        </div>
        <div
          css={{
          }}
        >
        <div className="row">
        {allMarkdownRemark.edges.map(({ node }) => {
          if (node.frontmatter.author) {
            if (node.frontmatter.author.id === contributor.id) {
              return (
                <BlogPostPreviewItem
                  post={node}
                  key={node.fields.slug}
                  css={{ marginBottom: '2em' }}
                />
              )
            }
          }
        })}
        </div>
        </div>
      </div>
    )
  }
}

export default ContributorPageTemplate

export const pageQuery = graphql`
  query TemplateContributorPage($slug: String!) {
    authorYaml(fields: { slug: { eq: $slug } }) {
      id
      bio
      twitter
      avatar {
        childImageSharp {
          resolutions(
            width: 63
            height: 63
            quality: 75
            traceSVG: { turdSize: 10, background: "#f6f2f8", color: "#e0d6eb" }
          ) {
            ...GatsbyImageSharpResolutions_tracedSVG
          }
        }
      }
      fields {
        slug
      }
    }
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          ...BlogPostPreview_item

        }
      }
    }
  }
`
