// ------- Create the Nav Bar -------------
// May want to use jQuery, vue or react to create entire html struct
// to append to html documents with JS

import React from 'react';
import { NavLink as Link } from 'react-router-dom'; //allows styling of active links
import '../styles/navbar.css';

class DropDown extends React.Component {
  render() {
    const dropList = this.props.droplist;
    const listItems = dropList.map((item, i) => {
      const name = item[0];
      if (item.length === 1) {
      return <Link key={i} to={"/" + name} onClick={() => this.props.toggleNavBar()}>{name}</Link>
      } else {
        return (
          <div key={i} className="dropdown">
            <a href="javascript:void(0);" className="dropbtn" onClick={() => this.props.toggleDrop(name)}>
              {name}
            </a>
            <DropDown droplist={item[1]} name={name} toggleNavBar={() => this.props.toggleNavBar()} toggleDrop={(id) => this.props.toggleDrop(id)} subcontent={true} />
          </div>
        );
      }
    });
    if (this.props.subcontent) {
      return <div className="dropdown-content subcontent" id={this.props.name}>{listItems}</div>
    } else {
      return <div className="dropdown-content" id={this.props.name}>{listItems}</div>
    }
  }
}

class TopNav extends React.Component {
  render() {
    const listItems = this.props.navList.map((item, i) => {
      const name = item[0];
      if ( item.length === 1 ) {
        return <li key={i}><Link to={"/" + name} onClick={() => this.props.toggleNavBar()}>{name}</Link></li>
      } else {
        return (
          <li key={i} className="dropdown">
            <a href="javascript:void(0);" className="dropbtn" onClick={() => this.props.toggleDrop(name)}>
              {name}
            </a>
            <DropDown droplist={item[1]} name={name} toggleNavBar={() => this.props.toggleNavBar()} toggleDrop={(id) => this.props.toggleDrop(id)} />
          </li>
        );
      }
    });
    return (
      <ul>
        { listItems }
        <li className="icon"><a href="javascript:void(0);" onClick={() => this.props.toggleNavBar()}>&#9776;</a></li>
      </ul>
    );
  }
}

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

export default NavBar;
