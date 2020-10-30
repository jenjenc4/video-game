//create and update form & what's a react hook.. use state
import React from "react";
//Grabs the env variable (from presentation's env) from process for api_url
const API_URL = process.env.REACT_APP_API_URL;

class CreateLesson extends React.Component {
  constructor(props) {
    super(props);
    //below represents our empty form
    this.state = {
      name: "", //type text input
      description: "",  
      grades: [""],
      quantity: 1,
      price: "",
      isActive: true, //boxed check input
    };
  }
  addgrades = () => {
    const newGrades = this.state.grades.map((x) => x);
    newGrades.push("");
    this.setState({ grades: newGrades });
  };
  removeGrades = (index) => {
    const newGrades = this.state.grades.map((x) => x);
    newGrades.splice(index, 1);
    this.setState({ grades: newGrades });
  };
  handleGradesChange = (value, index) => {
    const newGrades = this.state.grades.map((x) => x);
    newGrades[index] = value;
    this.setState({ grades: newGrades });
  };
  handleChange = ({ target }) => {
    let value = target.type === "checkbox" ? target.checked : target.value;
    value = target.type === "number" ? parseInt(value) : value;
    this.setState({ [target.name]: value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    fetch(`${API_URL}/lessons`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    })
      .then(this.props.refresh)
      .then(() =>
        this.setState({
          name: "", //type text input
          description: "",
          grades: [""],
          quantity: "", //date input
          price: 0,
          isActive: true, //boxed check input
        })
      );
  };
  render() {
    const displayGrades = this.state.grades.map((console, index) => {
      return (
        <div key={index}>
          <select
            value={this.state.grades[index]}
            onChange={({ target }) =>
              this.handleGradesChange(target.value, index)
            }
          >

            <option value=""> Choose Grade Level</option>
            <option value="K-1">K-1</option>
            <option value="2">2</option>
            <option value="3-6">3-6</option>
          </select>
          <input
            className="del-btn"
            type="button"
            value="x"
            onClick={() => this.removeGrades(index)}
          />
        </div>
      );
    });
    return (
      <form id="create" onSubmit={this.handleSubmit}>
        <input
          name="name" //any input named 'name' <--most browsr will save, browser caching it
          type="text"
          placeholder="Lesson Name"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <input
          name="description"
          type="text"
          placeholder="Write description"
          value={this.state.description}
          onChange={this.handleChange}
        />
        <input
          name="quantity"
          type="number"
          placeholder="quantity"
          value={this.state.quantity}
          onChange={this.handleChange}
        />
        <div>
          <label htmlFor="price">On Sale Now </label>
          <input
            name="price"
            type="text"
            placeholder="Price"
            value={this.state.price}
            onChange={this.handleChange}
          />
        </div>

        {displayGrades}
        <input type="button" value="Add Grade Level" onClick={this.addgrades} />
        <div>
          <label htmlFor="isActive">Is Active?</label>
          <input
            name="isActive"
            type="checkbox"
            checked={this.state.isActive}
            onChange={this.handleChange}
          />
        </div>
 
        <button>Add Lesson</button>
      </form>
    );
  }
}

export default CreateLesson;
