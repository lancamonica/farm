import React from 'react';

import './GridTitleList.scss'

const GridTitleList = ({
  titles = [],
  children
}) => {
  return (
    <>
      <div className="grid">
        <div className={"titles"}>
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