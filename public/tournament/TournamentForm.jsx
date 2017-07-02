import React from 'react';

class TournamentForm extends React.Component {
  render() {
    return (<form>
      <label htmlFor="name">Navn</label><input id="name" type="" />
      <label htmlFor="host">Host</label><input id="host" type="" />
      <input type="submit" value="Legg til" />
    </form>);
  }
}

export default TournamentForm;
