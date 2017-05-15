// ------- Create the Nav Bar -------------
// May want to use jQuery, vue or react to create entire html struct
// to append to html documents with JS

import React from 'react';
import DropDown from './DropDown';

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

export default TopNav;
