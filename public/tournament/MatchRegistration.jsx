import React from 'react';

class MatchRegistration extends React.Component {
  render() {
    return (<form>
      <div className="flex-column space-between smallspace">
        <label className="smallspace" htmlFor="white">Hvit</label><input id="white" />
        <label className="smallspace" htmlFor="black">Svart</label><input id="black" />
        <label className="smallspace" htmlFor="result">Resultat</label><input id="result" />
      </div>
      <input className="button" type="submit" value="Legg til kamp" />
    </form>);
  }
}

export default MatchRegistration;
