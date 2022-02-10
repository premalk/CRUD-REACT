import { useState } from "react";

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState([]);
  const [isEdit, SetIsEdit] = useState(false);
  const [editedValue, SetEditedValue] = useState();

  const onChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleClick = () => {
    if (!isEdit) {
      setData([...data, inputValue]);
    } else {
      const refinedData = [...data];
      for (let i = 0; i < refinedData.length; i++) {
        if (refinedData[i] === editedValue) {
          refinedData[i] = inputValue;
          SetIsEdit(false);
          setInputValue("");
          setData(refinedData);
          return;
        }
      }
    }
  };
  const handleEdit = (value) => {
    SetIsEdit(true);
    setInputValue(value);
    SetEditedValue(value);
  };
  const handleDelete = (value) => {
    const refinedData = data.filter((val) => {
      return value !== val;
    });
    setData(refinedData);
  };

  return (
    <div className="App">
      <input type="text" name="name" value={inputValue} onChange={onChange} />
      <br />
      <input
        type="button"
        value={isEdit ? "Edit" : "Add"}
        onClick={handleClick}
      />
      <br />
      <List data={data} handleDelete={handleDelete} handleEdit={handleEdit} />
    </div>
  );
}

function List({ data, handleEdit, handleDelete }) {
  return (
    <ul>
      {data &&
        data.map((val, index) => {
          return (
            <div key={index}>
              <li>{val}</li>
              <input
                type="button"
                value="edit"
                onClick={() => handleEdit(val)}
              />
              <input
                type="button"
                value="delete"
                onClick={() => handleDelete(val)}
              />
            </div>
          );
        })}
    </ul>
  );
}
