import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'

export default ({ data }) => {
  console.log(data);

  return (
    <div>
    <Helmet title={data.site.siteMetadata.title} />
      <div>
        <h2>HARDEN</h2>
        <div style = {{display:'flex'}}>
          {data.harden.edges.map(({ node }) => (
            <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
              <div key={node.id}>
              <Img sizes={node.frontmatter.mainImage.childImageSharp.sizes}/>
                <h3>
                  {node.frontmatter.title}{" "}
                  <p>{node.frontmatter.date}</p>
                </h3>
                <p>{node.excerpt}</p>
              </div>
             </Link>
           ))}
        </div>
      </div>
      <div>
        <h2>YOUNG</h2>
        {data.young.edges.map(({ node }) => (
          <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
            <div key={node.id}>
            <Img sizes={node.frontmatter.mainImage.childImageSharp.sizes}/>
              <h3>
                {node.frontmatter.title}{" "}
                <p>{node.frontmatter.date}</p>
              </h3>
              <p>{node.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
      <div>
        <h2>BOOROWA</h2>
        {data.boorowa.edges.map(({ node }) => (
          <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
            <div key={node.id}>
            <Img sizes={node.frontmatter.mainImage.childImageSharp.sizes}/>
              <h3>
                {node.frontmatter.title}{" "}
                <p>{node.frontmatter.date}</p>
              </h3>
              <p>{node.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>


    </div>
  );
};

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata{
        title
      }
    }

        harden: allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          filter:{ frontmatter: {category: {eq: "harden"}}}
          ) {
          edges {
            node {
              excerpt
              fields {
                slug
              }
              frontmatter {

                date(formatString: "DD MMMM, YYYY")
                title
                category
                mainImage {
                  childImageSharp {
                    sizes(maxWidth: 768,) {
                      ...GatsbyImageSharpSizes
                    }
                  }
                }
              }

            }
          }
    		}
        boorowa: allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC }
            filter:{ frontmatter: {category: {eq: "boorowa"}}}
            ) {
            edges {
              node {
                excerpt
                fields {
                  slug
                }
                frontmatter {

                  date(formatString: "DD MMMM, YYYY")
                  title
                  category
                  mainImage {
                    childImageSharp {
                      sizes(maxWidth: 768, ) {
                        ...GatsbyImageSharpSizes
                      }
                    }
                  }
                 }

              }
            }
          }
          young: allMarkdownRemark(
                sort: { fields: [frontmatter___date], order: DESC }
                filter:{ frontmatter: {category: {eq: "young"}}}
                ) {
                edges {
                  node {
                    excerpt
                    fields {
                      slug
                    }
                    frontmatter {

                      date(formatString: "DD MMMM, YYYY")
                      title
                      category
                      mainImage {
                        childImageSharp {
                          sizes(maxWidth: 768,) {
                            ...GatsbyImageSharpSizes
                          }
                        }
                      }
                     }

                  }
                }
              }

  }
`
