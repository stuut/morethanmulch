import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import { kebabCase } from 'lodash'
import { Container } from 'react-responsive-grid'
import PropTypes from "prop-types"
import logoPic from '../components/logo.jpg'
import './index.css'
import { slide as Menu } from 'react-burger-menu'




class Template extends React.Component {

  constructor(props) {
      super(props)
      this.toggleClass= this.toggleClass.bind(this);
      this.state = {
        activeIndex: 0
      }
  }

  toggleClass(index, e) {
      this.setState({ activeIndex: index });
  }



  static childContextTypes = {
        setPosts: PropTypes.func,
      }

      getChildContext() {
        return {
          setPosts: posts => {
            this.posts = posts
          },
        }
      }

      showSettings (event) {
    event.preventDefault();
  }

  render() {
    const {data: { allMarkdownRemark: { group } } } = this.props;
    const { location, children } = this.props
    let header


if (typeof window !== `undefined`) {

    window.onscroll = function() {scrollFunction()};

    function scrollFunction() {
        if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
            document.getElementById("navbar").style.top = "0";
        } else {
            document.getElementById("navbar").style.top = "-55px";
        }
    }
}


      header = (
        <div>
        <div id="navbar">
          <a href="#home">Home</a>
          <a href="#news">News</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="header">
        <div className="menu-container">
          <Menu>
            {group.map(category => (
              <li style={{ listStyleType:'none', marginRight: '1rem',}} key={category.fieldValue}>
                <Link to={`/category/${kebabCase(category.fieldValue)}/`} activeStyle={{color: '#8fc744'}} style={{boxShadow:'none', textTransform:'uppercase',}}>
                  {category.fieldValue}
                </Link>
              </li>
            ))}
         </Menu>

       </div>
          <Link to={'/'}>
            <img
              src={logoPic}
              alt={'Hilltops Phoenix'}
              className="logo"
            />
          </Link>
          <div className="sub-menu">

              {group.map(category => (
                <li style={{ display:'inline', textDecoration:'none', listStyleType:'none', marginRight: '1rem',}} key={category.fieldValue}>
                  <Link to={`/category/${kebabCase(category.fieldValue)}/`} activeStyle={{color: '#8fc744'}} style={{boxShadow:'none', textTransform:'uppercase',}}>
                    {category.fieldValue}
                  </Link>
                </li>
              ))}

          </div>
        </div>
</div>
      )

    return (
        <div>
        {header}
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
          }}
        >
        {children()}
      </div>
      </div>
    )
  }
}

export default Template

export const indexPageQuery = graphql`
  query categoryLinksQuery {
    allMarkdownRemark{
      group(field: frontmatter___category) {
        fieldValue
        totalCount
      }
    }
  }
`
