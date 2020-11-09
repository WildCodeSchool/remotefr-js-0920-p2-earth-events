import React from 'react';
import EventPreview from '../EventPreview';
import eonet from '../../lib/eonet';
import './style.css';

class EventsByCategorie extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      categories: [],
      currentView: [],
      error: false,
      currentCategorie: '',
    };
    this.loadCategorie.bind(this);
  }

  componentDidMount() {
    eonet({ field: 'categories' })
      .catch((error) => this.setState({ loading: false, error }))
      .then((data) => {
        if (data) {
          this.setState({
            categories: data.categories,
          });
        }
      })
      .catch((error) => this.setState({ loading: false, error }));
  }

  loadCategorie = (ev) => {
    const nextCategorie = ev.target.value;
    const { categories } = this.state;
    let currentView = [];
    let loading = true;
    const findView = categories.findIndex((cat) => cat.id === nextCategorie);
    if (findView > -1 && categories[findView].events) {
      currentView = categories[findView].events;
      loading = false;
    }
    this.setState({
      loading,
      error: false,
      currentCategorie: nextCategorie,
      currentView,
    });
    Promise.all([
      eonet({
        field: 'categories',
        categorie: nextCategorie,
      }),
      eonet({
        field: 'categories',
        categorie: nextCategorie,
        params: {
          open: 'closed',
        },
      }),
    ])
      .then((results) => {
        currentView = [];
        results.forEach((data) => {
          if (data.events)
            data.events.forEach((event) => {
              const eventExists = currentView.findIndex(
                (evt) => evt.id === event.id,
              );
              if (eventExists > -1) currentView[eventExists] = event;
              else currentView.push(event);
            });
        });
        categories[findView].events = currentView;
        this.setState({
          currentCategorie: nextCategorie,
          categories,
          currentView,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({ loading: false, error });
      });
  };

  render() {
    const {
      currentCategorie,
      categories,
      currentView,
      loading,
      error,
    } = this.state;
    return (
      <section className="EventsByCategorie">
        <h2>Categories</h2>
        <select onChange={this.loadCategorie} value={currentCategorie}>
          <option value="">Select a categorie…</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.title}
            </option>
          ))}
        </select>
        {error && <p className="error">Erreur: {error.message}</p>}
        {!error && currentCategorie && loading && (
          <p className="loading">Loading…</p>
        )}
        {!error && currentCategorie && !loading && !currentView.length && (
          <p className="empty">No Event</p>
        )}
        {!error && currentCategorie && !loading && Boolean(currentView.length) && (
          <ol>
            {currentView.map((event) => (
              <li key={event.id}>
                <EventPreview event={event} />
              </li>
            ))}
          </ol>
        )}
      </section>
    );
  }
}

export default EventsByCategorie;
