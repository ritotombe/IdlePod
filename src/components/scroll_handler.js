import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Scroller extends Component {

  constructor(props) {
    super(props)
    this.handleScroll = this.handleScroll.bind(this)

    this.state = {
      scrollPos: 0,
      landingDownArrow: []
    }
  }

  componentDidMount(){
    document.addEventListener('scroll', this.handleScroll, true)
    this.setState({
      logoSvg: document.querySelector(".landing-logo-svg"),
      landingDownArrow: document
                          .querySelector(".landing-logo-svg")
                          .querySelector("#landing-arrow")
                          .querySelector(".cls-22")
                          .getAttribute("points")
                          .split(" ")
    })

    document.getElementById("finish-landing").style.bottom = -document.getElementById("container").getBoundingClientRect().height+"px"

  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.handleScroll, true)
  }

  handleScroll(e){
    let scrollPos = (
      (document.getElementById("container").getBoundingClientRect().height+
      this.myDiv.getBoundingClientRect().top)/
      document.getElementById("container").getBoundingClientRect().height
    )

    this.setState({scrollPos})

    document.getElementById("finish-landing").style.bottom = -(document.getElementById("container").getBoundingClientRect().height+
    this.myDiv.getBoundingClientRect().top)+ 20 + "px"

    if (!this.state.logoSvg.querySelector("#landing-arrow").classList.contains("translate-down-landing-arrow")){
      this.state.logoSvg.querySelector("#landing-arrow").classList.add("translate-down-landing-arrow")
    }

    if (this.state.scrollPos < 0.9){
      this.state.logoSvg.querySelector(".this-is-you").style.opacity = 1
    } else {
      this.state.logoSvg.querySelector(".this-is-you").style.opacity = 0
    }

    if (this.state.scrollPos < 0.7 && this.state.scrollPos > 0.2){
      this.state.logoSvg.querySelector(".this-is-your-pod").style.opacity = 1
      this.state.logoSvg.querySelector(".cls-13").style.opacity = 1
      this.state.logoSvg.querySelector(".cls-21").style.opacity = 1
      this.state.logoSvg.querySelector(".cls-21").classList.add("line-animation")
    } else {
      this.state.logoSvg.querySelector(".this-is-your-pod").style.opacity = 0
      this.state.logoSvg.querySelector(".cls-13").style.opacity = 0
      this.state.logoSvg.querySelector(".cls-21").style.opacity = 0
      this.state.logoSvg.querySelector(".cls-13").classList.remove("translate-left-100")
    }

    if (this.state.scrollPos < 0.2){
      this.state.logoSvg.querySelector(".cls-13").style.opacity = 1
      this.state.logoSvg.querySelector(".cls-13").classList.add("translate-left-100")

      let factor = ((0.2-this.state.scrollPos)/0.2)*(733.2-689.59)
      let landingDownArrow = this.state.landingDownArrow
      landingDownArrow[1] = (parseFloat(689.59) + factor).toString()
      landingDownArrow[5] = (parseFloat(689.59) + factor).toString()

      this.state.logoSvg
        .querySelector("#landing-arrow")
        .querySelector(".cls-22")
        .setAttribute("points", landingDownArrow.join(" "))

    } else {
      this.state.logoSvg.querySelector(".cls-13").classList.remove("translate-left-100")
    }

    this.state.logoSvg.querySelector(".definition").style.opacity = -(this.state.scrollPos-0.05)/0.05

    if (this.state.scrollPos < 0.01){
      this.state.logoSvg.querySelector("#landing-arrow").classList.remove("translate-down-landing-arrow")
    }
  }

  render(){
    return(
      <div ref={
        div => {this.myDiv = div;}
       }
       id="scroller">
         <Link to='/q1' id="finish-landing" className="btn btn-default">
            Move to Questionnaire
         </Link>
       </div>
    )
  }
}

export default Scroller
