import React from 'react';

import './GridItemList.scss'

const GridItemList = ({
  actions = [],
  fields = [],
}) => {
  return (
    <>
      <div className={"fields"}>
        { fields.map(field => <p>{field}</p>) }
        <div className={"actions-list"}>
          {
            actions.map((action, index) => (
              <>
                <p onClick={action.action}>{action.label}</p>
                {actions.length - 1 > index && <span>|</span> }
              </>
            ))
          }
        </div>
      </div>
      <hr />  
    </>
  )
}

export default GridItemList;