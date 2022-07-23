import React from 'react';
import "../css_modules/contact.module.css";
import { base_url } from "../utils/constants";

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      planets: ['wait...']
    };
  }

  //todo 30 dnei update // local storage

  async fillPlanets(url) {
    let planets = [];
    if (Date.now() - localStorage.getItem('planets') > 2592000000) {
      const response = await fetch(url);
      const json = await response.json();
      planets = json.map(item => item.name);
      this.setState({ planets });
      localStorage.setItem('planets', JSON.stringify(planets));
      localStorage.setItem('updateTime', Date.now());
      console.log('from server')
    } else {
      planets = JSON.parse(`${localStorage.getItem('planets')}`);
      this.setState({ planets });
      console.log('from local storage')
    }
  }

  componentDidMount() {
    this.fillPlanets(`${base_url}/v1/planets`);
  }

  componentWillUnmount() {
    console.log('Component Contact unmounted')
  }

  render() {
    return (
      <div>
        <form onSubmit={(e) => {
          e.preventDefault();
          console.log(e.currentTarget.planet.value);
          console.log(e.currentTarget.firstname.value);
        }}>
          <label>First Name
            <input type="text" name="firstname" placeholder="Your name.." />
          </label>
          <label>Planet
            <select name="planet">{
              this.state.planets.map((item, index) => <option value={item} key={index}>{item}</option>)
            }
            </select>
          </label>
          <label>Subject
            <textarea name="subject" placeholder="Write something.." />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default Contact;
