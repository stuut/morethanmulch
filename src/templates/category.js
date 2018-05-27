import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Img from 'gatsby-image'
import PropTypes from "prop-types";
import '../layouts/index.css'
import chunk from "lodash/chunk"
import { kebabCase } from 'lodash'
import TagsSection from "../components/tags-section"




if (typeof window !== `undefined`) {
window.postsToShow = 4
}

class categoryRoute extends React.Component {
  static propTypes = {
        data: PropTypes.shape({
          allMarkdownRemark: PropTypes.object,
        }),
      }
      static contextTypes = {
        setPosts: PropTypes.func,
      }

      constructor() {
        super()
        let postsToShow = 4
        if (typeof window !== `undefined`) {
          postsToShow = window.postsToShow
        }


        this.state = {
          showingMore: postsToShow > 4,
          postsToShow,
        }
      }

  render() {
    let { allMarkdownRemark } = this.props.data
    const posts = this.props.data.allMarkdownRemark.edges.map(e => e.node)
    this.context.setPosts(posts)
    //const postLinks = posts.map(post => (
    //  <li key={post.node.fields.slug}>
      //  <Link to={post.node.fields.slug}>
      //  <Img resolutions={post.node.frontmatter.mainImage.childImageSharp.resolutions} style={{ width: '100%', paddingBottom:'66.6667%',}}/>

      //    <h2 className="is-size-2">{post.node.frontmatter.title}</h2>
      //  </Link>
    //  </li>
  //  ))
    const category = this.props.pathContext.category
    const title = this.props.data.site.siteMetadata.title
    const totalCount = this.props.data.allMarkdownRemark.totalCount

    const categoryHeader = `${totalCount} post${
      totalCount === 1 ? '' : 's'
    } tagged with “${category}”`


    return (
      <div>
       <div>
          {chunk(posts.slice(0, this.state.postsToShow), 4).map((chunk, i) => (
            <div className="row" key={`chunk-${i}`} >
                {chunk.map(node => (
                  <div className="card" >
                    <div key={node.fields.slug}>
                      <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
                      <Img resolutions={node.frontmatter.mainImage.childImageSharp.resolutions} style={{ width: '100%', paddingBottom:'66.6667%',}}/>
                      </Link>
                      <TagsSection tags={node.frontmatter.tags} />
                      <div className="postText">
                        <h3
                          style={{
                            marginBottom: '1rem',
                            marginTop:'.5rem'
                          }}
                        >
                          <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
                            {node.frontmatter.title}
                          </Link>
                        </h3>
                        <small>{node.frontmatter.date}</small>
                        <p style={{ fontSize: '.8rem'}} dangerouslySetInnerHTML={{ __html: node.excerpt }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

        {!this.state.showingMore && (
          <a className="loadMore"
            data-testid="load-more"

            onClick={() => {
              this.setState({
                postsToShow: this.state.postsToShow + 4,
                showingMore: false,
              })
            }}
          >
            Load More
          </a>

        )}


      </div>
    )
  }
}

export default categoryRoute

export const categoryPageQuery = graphql`
  query categoryPage($category: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { category: { in: [$category] } } }
    ) {
      totalCount
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            tags
            mainImage {
              childImageSharp {
                resolutions(width: 300 quality: 70) {
                  src
                  srcSet
                  base64

                }
              }
            }
          }
        }
      }
    }
  }
`
