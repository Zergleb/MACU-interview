import { useState, useEffect } from "react";
import "./AnimalsView.css";
import AnimalForm from "./AnimalForm";
import AnimalsTable from "./AnimalsTable";

function AnimalsView() {
  const [animals, setAnimals] = useState([]);

  const [selectedItem, setSelectedItem] = useState(null);

  const [editAnimalModel, setEditAnimalModel] = useState(null);

  const refreshAnimals = () => {
    fetch("//localhost:3030/animals").then(async (response) => {
      const data = await response.json();
      setAnimals(data);
    });
  };

  useEffect(refreshAnimals, []);

  function saveAnimal(event) {
    event.preventDefault();
    if (editAnimalModel.adding) {
      createNewAnimal();
    } else {
      updateAnimal();
    }
  }

  function createNewAnimal() {
    const newAnimal = { ...editAnimalModel };
    const newAnimalArray = [...animals, newAnimal];
    setAnimals(newAnimalArray);
    setEditAnimalModel(null);
  }

  function updateAnimal() {
    const newAnimalArray = [...animals];
    const editAnimal = newAnimalArray.find(
      (item) => item.id === editAnimalModel.id
    );
    editAnimal.id = editAnimalModel.id;
    editAnimal.name = editAnimalModel.name;
    editAnimal.age = editAnimalModel.age;
    editAnimal.species = editAnimalModel.species;
    setAnimals(newAnimalArray);
    setEditAnimalModel(null);
    setSelectedItem(null);
  }

  function selectRow(item) {
    return () => {
      if (editAnimalModel === null) {
        setSelectedItem(item);
      }
    };
  }

  function addAnimal(event) {
    setSelectedItem(null);
    const maxId = animals.reduce(function (prev, current) {
      return prev > current.id ? prev : current.id;
    });
    setEditAnimalModel({
      id: maxId + 1,
      name: "",
      age: 0,
      species: "",
      adding: true,
    });
  }

  function editAnimal(event) {
    setEditAnimalModel({
      id: selectedItem.id,
      name: selectedItem.name,
      age: selectedItem.age,
      species: selectedItem.species,
      adding: false,
    });
  }
  function cancelEditAnimal(event) {
    setEditAnimalModel(null);
  }

  return (
    <div id="AnimalsView">
      <AnimalsTable
        animals={animals}
        selectRow={selectRow}
        selectedItem={selectedItem}
      />
      {editAnimalModel ? (
        <AnimalForm
          editAnimalModel={editAnimalModel}
          setEditAnimalModel={setEditAnimalModel}
          cancelEditAnimal={cancelEditAnimal}
          saveAnimal={saveAnimal}
        />
      ) : (
        <div>
          <button onClick={addAnimal} data-testid="animal-add">
            Add Animal
          </button>
          <button onClick={editAnimal} data-testid="animal-edit">
            Edit Animal
          </button>
        </div>
      )}
    </div>
  );
}

export default AnimalsView;
