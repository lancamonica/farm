import React from 'react';

import './GridTitleList.scss'

const GridTitleList = ({
  titles = [],
  children,
  items = 3
}) => {
  return (
    <>
      <div className="grid">
        <div className={items === 3 ? "titles" : "titles four"}>
          { titles.map(title => <p>{title}</p>) }
          <p>Ações</p>
        </div>
        <hr />
        { children }
      </div>
    </>
  )
}

export default GridTitleList;