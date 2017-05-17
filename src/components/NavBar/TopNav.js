// ------- Create the Nav Bar -------------
// May want to use jQuery, vue or react to create entire html struct
// to append to html documents with JS

import React from 'react';
import { NavLink as Link } from 'react-router-dom'; //allows styling of active links
import DropDown from './DropDown';

// 'eval is evil' - TODO: figure out alternative to href="javascript:void(0);"  - maybe function join(e) { e.preventDefault(); //... }
// for now, i just deleted the hrefs, but now they dont have a pointer when hovering - could use CSS
class TopNav extends React.Component {
  render() {
    const listItems = this.props.navList.map((item, i) => {
      const name = item[0];
      if ( item.length === 1 ) {
        return <li key={i}><Link to={"/" + name} onClick={() => this.props.toggleNavBar()}>{name}</Link></li>
      } else {
        return (
          <li key={i} className="dropdown">
            <a className="dropbtn" onClick={() => this.props.toggleDrop(name)}>
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
        <li><Link to='/login'>login</Link></li>
        <li className="icon"><a onClick={() => this.props.toggleNavBar()}>&#9776;</a></li>
      </ul>
    );
  }
}

export default TopNav;
