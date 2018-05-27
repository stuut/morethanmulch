import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Img from 'gatsby-image'
import { kebabCase } from 'lodash'
import TagsSection from "../components/tags-section"

class BlogPostTemplate extends React.Component {
  render() {
    let className = 'image';
    const post = this.props.data.markdownRemark
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const { previous, next } = this.props.pathContext

    return (
      <div>
      <div className="postCard">
        <div>
      <Img sizes={post.frontmatter.mainImage.childImageSharp.sizes} className={className} style={{ width: '100%'}}/>
      <TagsSection tags={this.props.data.markdownRemark.frontmatter.tags} />
      <Helmet title={`${post.frontmatter.title} | ${siteTitle}`} />
        <h1>{post.frontmatter.title}</h1>
        <p
          style={{

            display: 'block',
            marginBottom: '1em',
            marginTop: '1em',
          }}
        >
          {post.frontmatter.date}
        </p>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr
          style={{
            marginBottom: '1em',
          }}
        />
        <div
          css={{
            flex: `0 0 auto`,
          }}
        >
          <Img
            resolutions={
              post.frontmatter.author.avatar.childImageSharp.resolutions
            }
            css={{
              height: '5em',
              width: '5em',
              margin: 0,
              borderRadius: `100%`,
              display: `inline-block`,
              verticalAlign: `middle`,
            }}
          />
        </div>
        <div
          css={{
            flex: `1 1 auto`,
            marginLeft: '5em',
          }}
        >
        <Link to={post.frontmatter.author.fields.slug}>
            <h4
              css={{
                fontWeight: 400,
                margin: 0,
              }}
            >
              {post.frontmatter.author.id}
            </h4>
        </Link>
          <p>{post.frontmatter.author.bio}</p>

        </div>

        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            listStyle: 'none',
            padding: 0,
          }}
        >
          {previous && (
            <li>
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            </li>
          )}

          {next && (
            <li>
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            </li>
          )}
        </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }

    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        tags
        category
        date(formatString: "MMMM DD, YYYY")
        mainImage {
          childImageSharp {
            sizes(maxWidth: 1200 ) {
              ...GatsbyImageSharpSizes
            }
          }
        }
        author {
          id
          bio
          twitter
          avatar {
            childImageSharp {
              resolutions(
                width: 63
                height: 63
                quality: 75
                traceSVG: {
                  turdSize: 10
                  background: "#f6f2f8"
                  color: "#e0d6eb"
                }
              ) {
                ...GatsbyImageSharpResolutions_tracedSVG
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
