import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'
import { kebabCase } from 'lodash'


const CategoryPage = ({data: { allMarkdownRemark: { group }, site: { siteMetadata: { title } } },}) => (
  <section className="section">
    <Helmet title={`categorys | ${title}`} />
    <div className="container content">
      <div className="columns">
        <div
          className="column is-10 is-offset-1"
          style={{ marginBottom: '6rem' }}
        >
          <h1 className="title is-size-2 is-bold-light">Categorys</h1>
          <ul className="categorylist">
            {group.map(category => (
              <li key={category.fieldValue}>
                <Link to={`/category/${kebabCase(category.fieldValue)}/`}>
                  {category.fieldValue} ({category.totalCount})
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
)

export default CategoryPage

export const categoryPageQuery = graphql`
  query categoryQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 1000) {
      group(field: frontmatter___category) {
        fieldValue
        totalCount
      }
    }
  }
`
