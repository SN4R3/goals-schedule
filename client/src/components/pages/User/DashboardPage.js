import React, { Component } from "react";
import { Link } from "react-router-dom";
import './DashboardPage.css'

import NewCategory from "../../forms/NewCategory";
import GoalsList from '../../common/GoalsList'

export class DashboardPage extends Component {
  constructor() {
    super();
    this.state = {
      creatingCategory: false,
      redirector: <React.Fragment/>
    };
    this.handleChange = this.handleChange.bind(this);
    this.categoryCreated = this.categoryCreated.bind(this)
  }

  handleChange(e) {
    this.props.categorySelected(e.target.value)
  }

  categoryCreated(cat) {
    this.setState({ creatingCategory: false })
    this.props.categoryCreated(cat)
  }

  getGoalsForViewing() {
    let allGoals = []
    this.props.categories.forEach((cat) => {
      allGoals = allGoals.concat(cat.goals)
    })
    
    return this.props.selectedCategory ?
      this.props.selectedCategory.goals : allGoals
  }  

  renderNewCategoryBtn() {
    if (this.state.creatingCategory) {
      return <React.Fragment></React.Fragment>;
    } else {
      return (
        <button 
          className="btn btn-success btn-sm" onClick={() => {
            this.setState({ creatingCategory: true });
          }}
        >
          <i className="fa fa-plus"></i> New Category
        </button>
      );
    }
  }

  render() {
    const { categories, selectedCategory } = this.props;
    const { creatingCategory } = this.state

    let catOptions = categories.map(cat => (
      <option key={`catopt${cat.id}`} value={cat.id}>
        {cat.name}
      </option>
    ));
    return (
      <div>
        <div className="d-flex justify-content-between align-items-center border title-container">
          <h1>
            <i className="fas fa-tachometer-alt"></i>
            <span className="ml-2">Dashboard</span>
          </h1>
          <div className="d-none d-sm-block">
            <button className="btn btn-dark">
              <i className="fa fa-user"></i>
              <span className="ml-1">Profile</span>
            </button>
          </div>
        </div>
        <div className="mt-4">
          <div className={!creatingCategory ? 'd-none' : ''}>
            <NewCategory
              categoryCreated={this.props.categoryCreated}
              cancelNewCategory={() =>
                this.setState({ creatingCategory: false })
              }
            />
          </div>
          
          <div className="input-group mb-3">
            <select
              name="selectedCat"
              className={`custom-select ${creatingCategory ? "d-none" : ""}`}
              value={selectedCategory ? selectedCategory.id : ''}
              onChange={this.handleChange}
            >
              <option value="">All Categories</option>;{catOptions}
            </select>
            <div className="input-group-append">
              {this.renderNewCategoryBtn()}
            </div>
          </div>
          <div className="mt-4 mb-4">
            <div className={`d-flex justify-content-end my-2 ${categories.length ? "" : "d-none"}`}>
              <div className={`${!selectedCategory ? 'd-none' : ''}`}>
                <Link to={`/user/new-goal/${selectedCategory ? selectedCategory.id : ''}`}>
                  <button className="btn btn-info">
                    <i className="fa fa-plus"></i> New Goal
                  </button>
                </Link>
              </div>
              <button
                className={`btn btn-danger ml-2 ${selectedCategory ? "" : "d-none"}`}
                onClick={() => this.props.deleteCategory()}
              >
                <i className="fa fa-minus-circle"></i> Delete Category
              </button>
            </div>
              
            <h3>
              {selectedCategory ? `${selectedCategory.name} Goals` : ""}
            </h3>
            <div className="mt-4 mb-4">
              <GoalsList 
                goals={this.getGoalsForViewing()} 
                goalDeleted={this.props.goalDeleted}
                viewGoal={this.props.viewGoal}
                editGoal={this.props.editGoal}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardPage;
