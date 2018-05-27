import React from "react"
import Link from "gatsby-link"
import Img from "gatsby-image"
import '../layouts/index.css'

class BlogPostPreviewItem extends React.Component {
  render() {
    const post = this.props.post
    const avatar = post.frontmatter.author.avatar.childImageSharp.resolutions

    return (
      <article className="card" css={{ position: `relative` }}>
       <div>
          <img src={post.frontmatter.mainImage} style={{ width: '100%', paddingBottom:'66.6667%',}}/>
          <div className="postText">
            <Link to={`/category/${_.kebabCase(post.frontmatter.category)}`}><div className="tab">{post.frontmatter.category}</div></Link>
            <h3 style={{
              marginBottom: '1rem',
              marginTop:'.75rem'
            }}>
            <Link to={post.fields.slug}>
            {post.frontmatter.title}</Link>
            </h3>
            <p>
              {post.frontmatter.excerpt ? post.frontmatter.excerpt : post.excerpt}
            </p>
            <div style={{
              display: `flex`,
              borderTop: `1px solid #e3e3e3`,
              paddingTop: `10px`,
            }}
            >
              <Img
                alt=""
                resolutions={avatar}
                style={{
                  borderRadius: `100%`,
                  display: `inline-block`,
                  verticalAlign: `top`,
                  marginRight:`10px`,
                  }}
              />
              <div>
                <div>
                  <Link
                      to={post.frontmatter.author.fields.slug}
                      style={{
                        boxShadow: `none !important`,
                        borderBottom: `0 !important`,
                        position: `relative`,
                        fontSize:`.9rem`,
                      }}
                    >
                      {post.frontmatter.author.id}
                    </Link>
                  </div>
                  <div>
                  {` `}
                  <span style={{fontSize:`.7rem`,}}>on</span>
                  {` `}
                  <span style={{fontSize:`.7rem`,}}>{post.frontmatter.date}</span>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </article>
    )
  }
}

export default BlogPostPreviewItem

export const blogPostPreviewFragment = graphql`
  fragment BlogPostPreview_item on MarkdownRemark {
    excerpt
    fields {
      slug
    }
    frontmatter {
      title
      date(formatString: "MMMM Do YYYY")
      category
      tags
      mainImage
      author {
        id
        fields {
          slug
        }
        avatar {
          childImageSharp {
            resolutions(
              width: 40
              height: 40
              quality: 80
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
      }
    }
  }
`
