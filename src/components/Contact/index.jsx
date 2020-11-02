import React from 'react';
import './css/Contact.css';
import PropTypes from 'prop-types'; // ES6

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      message: '',
      errors: { name: [], email: [], message: [] },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    let { name, email, message } = this.state;
    const { errors } = this.state;
    name = name.trim();
    email = email.trim();
    message = message.trim();

    errors.name = [];
    errors.email = [];
    errors.message = [];

    // Name validator
    if (name.length <= 0) {
      errors.name.push('Name is required');
    }

    if (name.length <= 3 || name.length >= 80) {
      errors.name.push(
        'The Name value is not between 3 and 80 charcters long.',
      );
    }

    // Email validator
    if (email.length <= 0) {
      errors.email.push('Email is required');
    }

    if (email.split('').filter((x) => x === '@').length !== 1) {
      errors.email.push('Email should contain a @');
    }

    if (email.indexOf('.') === -1) {
      errors.email.push('Email should contain at least one dot');
    }
    // Message validator
    if (message.length <= 0) {
      errors.message.push('The message is required');
    }

    if (message.length <= 10 || name.length >= 600) {
      errors.message.push(
        'The Message value is not between 10 and 600 charcters long',
      );
    }

    // if (sendmail) {
    //   alert('envoie du message');
    // }

    this.setState({ errors });
    event.preventDefault();
  }

  render = () => {
    const { name, email, message, errors } = this.state;
    return (
      <div>
        <h2>Contact</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your name.."
            value={name}
            onChange={this.handleChange}
          />
          <Errors v={errors.name} />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your Email.."
            value={email}
            onChange={this.handleChange}
          />
          <Errors v={errors.email} />
          <textarea
            id="message"
            name="message"
            placeholder="Write something.."
            value={message}
            onChange={this.handleChange}
          />
          <Errors v={errors.message} />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  };
}

const Errors = (props) => {
  const { v } = props;
  return (
    <div className="error-contact">
      <ul>{v.length ? v.map((item) => <li key={item}>{item}</li>) : ''}</ul>
    </div>
  );
};

Errors.propTypes = {
  v: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default Contact;
