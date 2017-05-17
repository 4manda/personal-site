// ------- Create the Nav Bar -------------
// May want to use jQuery, vue or react to create entire html struct
// to append to html documents with JS

import React from 'react';
import '../../styles/navbar.css';
import TopNav from './TopNav';

class NavBar extends React.Component {
  constructor() {
    super();
    this.state = {
      navList: [
        ["home"],
        ["timeline"],
        ["sand-box", [
          ["overview"],
          ["apps", [
            ["todo"],
            ["time"],
            ["tictac"]]],
          ["gallery"]]],
        ["about"]
      ]
    };
  }
  // toggle sub dropdown when clicked
  toggleDrop(id) {
    const drop = document.getElementById(id);
    drop.classList.toggle("show");
    drop.previousSibling.classList.toggle("arrowdown")
  }
  // Function to toggle TopNav dropdown when file icon is clicked
  // Will also switch hover items to be only clickable
  toggleNavBar() {
    const x = document.getElementById("topnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }
  render() {
    return (
      <div className="topnav" id="topnav">
        <TopNav navList={this.state.navList} toggleDrop={(id) => this.toggleDrop(id)} toggleNavBar={() => this.toggleNavBar()} />
      </div>
    );
  }
}
//const NavBar = (props) => {
//  return (
//    <div className="topnav" id="topnav">
//      <TopNav navList={props.navList} toggleDrop={props.toggleDrop} toggleNavBar={props.toggleNavBar()} />
//    </div>
//  );
//}
//
//const mapStateToProps = state => {
//  return {
//    navList: state.navList,
//  }
//}
//
//const mapDispatchToProps = dispatch => ({
//  togggleDrop: (id) => {
//    dispatch(toggleDrop(id))
//  },
//  toggleNavBar: () => {
//    dispatch(toggleNavBar())
//  }
//})
//
//export default connect(
//  mapStateToProps,
//  mapDispatchToProps,
//)(NavBar);
export default NavBar;
