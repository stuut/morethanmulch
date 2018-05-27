import React from 'react'
import Link from "gatsby-link"
const _ = require(`lodash`)

const TagsSection = ({ tags }) => {
  if (!tags) return null
  const tagLinks = tags.map((tag, i) => {

    return (
      <span className="tab" key={tag}>
        <Link to={`/tags/${_.kebabCase(tag)}`}>
          {tag}
        </Link>
        </span>
    )
  })
  return (
    <em
      style={{
        display: 'block',
        marginBottom: '.5rem',
        fontSize: '.7rem',
        paddingLeft: '2%',
      }}
    >
      Tagged with {tagLinks}
    </em>
  )
}

export default TagsSection
