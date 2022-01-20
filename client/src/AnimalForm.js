//Migrate to AnimalForm.css
import "./AnimalForm.css";

function AnimalForm(props) {
  const handleAddEditChange = (event) => {
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData = { ...props.editAnimalModel };
    newFormData[fieldName] = fieldValue;
    props.setEditAnimalModel(newFormData);
  };

  return (
    <div id="AnimalForm">
      Editing Animal {props.editAnimalModel.id}
      <form onSubmit={props.saveAnimal}>
        <label htmlFor="edit-name">Name</label>
        <input
          data-testid="animal-name-input"
          type="text"
          id="edit-name"
          name="name"
          placeholder="Name"
          required={true}
          value={props.editAnimalModel.name}
          onChange={handleAddEditChange}
        />

        <label htmlFor="edit-age">Age</label>
        <input
          data-testid="animal-age-input"
          type="number"
          id="edit-age"
          name="age"
          placeholder="Age"
          required={true}
          value={props.editAnimalModel.age}
          onChange={handleAddEditChange}
        />

        <label htmlFor="edit-species">Species</label>
        <input
          data-testid="animal-species-input"
          type="text"
          id="edit-species"
          name="species"
          placeholder="Species"
          required={true}
          value={props.editAnimalModel.species}
          onChange={handleAddEditChange}
        />

        <input type="submit" value="Save" data-testid="animal-save" />
        <button onClick={props.cancelEditAnimal} data-testid="animal-cancel">
          Cancel
        </button>
      </form>
    </div>
  );
}

export default AnimalForm;
