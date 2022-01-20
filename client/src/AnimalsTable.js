import { useState, useEffect, Fragment, useRef } from "react";
//Migrate to AnimalsTable.css
import "./AnimalsTable.css";

function AnimalsTable(props) {
  const INADVISABLE_CONSTANT_FOR_RESIZE = 600;
  const ref = useRef(null);
  const [filter, setFilter] = useState("");
  const [compactTable, setCompactTable] = useState(false);

  useEffect(() => {
    const onResize = () => {
      setCompactTable(window.innerWidth < INADVISABLE_CONSTANT_FOR_RESIZE);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  function filterAnimals(item) {
    return (
      item.name.toLowerCase().includes(filter.toLowerCase()) ||
      item.age.toString() === filter ||
      item.species.toLowerCase().includes(filter.toLowerCase())
    );
  }

  function CompactHeaders() {
    return (
      <Fragment>
        <td>Name/Age</td>
        <td className="right">Species</td>
      </Fragment>
    );
  }

  function CompactColumns(props) {
    const item = props.item;
    return (
      <Fragment>
        <td>
          {item.name}
          <br />
          {item.age}
        </td>
        <td className="right">{item.species}</td>
      </Fragment>
    );
  }

  function Headers() {
    return (
      <Fragment>
        <td colSpan="2">Name/Age</td>
        <td className="right">Species</td>
      </Fragment>
    );
  }

  function Columns(props) {
    const item = props.item;
    return (
      <Fragment>
        <td>{item.name}</td>
        <td>{item.age}</td>
        <td className="right">{item.species}</td>
      </Fragment>
    );
  }

  return (
    <div id="AnimalsTable" ref={ref}>
      <label className="filter">
        Filter: &nbsp;
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </label>
      <br />
      <table>
        <thead>
          <tr>{compactTable ? <CompactHeaders /> : <Headers />}</tr>
        </thead>
        <tbody>
          {props.animals.filter(filterAnimals).map((item) => {
            return (
              <tr
                data-testid={"animal-row-" + item.id}
                key={item.id}
                onClick={props.selectRow(item)}
                className={props.selectedItem === item ? "rowSelected" : ""}
              >
                {compactTable ? (
                  <CompactColumns item={item} />
                ) : (
                  <Columns item={item} />
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AnimalsTable;
