// style
import './GridItemList.scss'

const GridItemList = ({
  actions = [],
  fields = [],
  items = 3
}) => {
  return (
    <>
      <div className={items === 3 ? "fields" : "fields four"}>
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