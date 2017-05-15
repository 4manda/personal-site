// ------- Create the Nav Bar -------------
// May want to use jQuery, vue or react to create entire html struct
// to append to html documents with JS

import React from 'react';
import { NavLink as Link } from 'react-router-dom'; //allows styling of active links

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

export default DropDown;
