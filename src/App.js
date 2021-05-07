import './App.css';
import React from 'react';

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=445001&date=07-05-2021")
      .then(response => {
        if (!response.ok) {
            throw Error('Network request failed.')
        }
        return response;
      })
      .then(
        res => res.json(),
      )
      .then(
        (result) => {

          result = result.centers

          result = result.filter( res => res.sessions.some(session => session.min_age_limit === 18))

          this.setState({
            isLoaded: true,
            items: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {items.map(item => (
            <li key={item.center_id}>
              {item.name} 
              <ul>
                {item.sessions.map(s => 
                <li key={s.session_id}>
                    <ul> 
                      <li> Capacity : {s.available_capacity}  </li>
                      <li> Date : {s.date}  </li>
                    </ul>
                </li>)}
              </ul>
            </li>
          ))}
        </ul>
      );
    }
  }
}

export default MyComponent;
