//create and update form & what's a react hook.. use state
import React from "react";
//Grabs the env variable (from presentation's env) from process for api_url
const API_URL = process.env.REACT_APP_API_URL;

class UpdateLesson extends React.Component {
  constructor(props) {
    super(props);
    const {lesson} = props;
    //equivalent to const lesson = props.lessons; 
    //below represents our empty form
    this.state = {
      name: lesson.name, 
      description: lesson.description,
      grades: lesson.grades,
      quantity: lesson.quantity,
      price: lesson.price,
      isActive: lesson.isActive 
    };
  }
  addGrades = () => {
    const newGrades = this.state.grades.map((x) => x);
    newGrades.push("");
    this.setState({ grades: newGrades });
  };
  removeGrade = (index) => {
    const newGrades = this.state.grades.map((x) => x);
    newGrades.splice(index, 1);
    this.setState({ grades: newGrades });
  };
  handleGradeChange = (value, index) => {
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
    fetch(`${API_URL}/lessons/${this.props.lesson.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    })
      .then(this.props.refresh)
        .then(this.props.close)
}

  render() {
    const displayGrades = this.state.grades.map((console, index) => {
      return (
        <div key={index}>
          <select
            value={this.state.grades[index]}
            onChange={({ target }) =>
              this.handleGradeChange(target.value, index)
            }
          >
            <option value=""> Choose a Grade</option>
            <option value="K-1">K-1</option>
            <option value="2">2</option>
            <option value="3-6">3-6</option>
          </select>
          <input
            className="del-btn"
            type="button"
            value="x"
            onClick={() => this.removeGrade(index)}
          />
        </div>
      );
    });
    return (
      <form className="update" onSubmit={this.handleSubmit}>
        <input
          name="name"
          type="text"
          placeholder="Lesson Name"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <input
          name="description"
          type="text"
          placeholder="Write Description"
          value={this.state.type}
          onChange={this.handleChange}
        />
        <input
          name="quantity"
          type="number"
          placeholder="Quantity"
          value={this.state.quantity}
          onChange={this.handleChange}
        />
        <div>
          <label htmlFor="price">On Sale </label>
          <input
            name="price"
            type=""
            placeholder="Price"
            value={this.state.release}
            onChange={this.handleChange}
          />
        </div>

        <div>
          <label htmlFor="players">Number of Players</label>
          <input
            name="players"
            type="number"
            placeholder="Players"
            value={this.state.players}
            onChange={this.handleChange}
          />
        </div>
        {displayGrades}
        <input type="button" value="Add Grade" onClick={this.addGrades} />
        <div>
          <label htmlFor="isActive">Is Active?</label>
          <input
            name="isActive"
            type="checkbox"
            checked={this.state.isActive}
            onChange={this.handleChange}
          />
        </div>
        <button>Update Lesson</button>
      </form>
    );
  }
}

export default UpdateLesson;
