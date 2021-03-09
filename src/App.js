import './styles/main.css';
import './styles/modals.css';
import './styles/normalize.css'

import veria from './img/veria-logo.png'

const App = () => {
  return (
      <div className="page-bg">
        <div className="app-grid">
          <div className="brand-section">
            <div>
              <h1 className="app-name"><b>Easy</b>Plan<span>&trade;</span> Clickmat</h1>
              <h1 className="app-name-mirror"><b>Easy</b>Plan<span>&trade;</span> Clickmat</h1>
            </div>
            <div>
              <img src={veria} alt="veria logo"/>
            </div>
          </div>
          <div className="controler-section">
            <div id="btn-1" className="btn-start btn-text-active"><a href="#">Start here</a></div>
            <div id="btn-2" className="btn btn-text-static"><a href="#">Room Shape</a></div>
            <div id="btn-3" className="btn btn-text-static"><a href="#">Room Size</a></div>
            <div id="btn-4" className="btn btn-text-static"><a href="#">Cold Spots</a></div>
            <div id="btn-5" className="btn btn-text-static"><a href="#">Floor Type</a></div>
            <div id="btn-6" className="btn btn-text-static"><a href="#">Thermostat</a></div>
            <div id="btn-7" className="btn-result btn-text-static"><a href="#">Result</a></div>
          </div>
          <div className="info-section">
            <div>
              <h2>Plan your installation</h2>
              <p>EasyPlan makes it easy to plan your new Veria system.
                <br/>
                The application guides you through a few selections and provides a design and layout plan
                for achieving maximum heated floor area based on your input.
              </p>
            </div>
            <div className="ellipse-faq-btn">?</div>
          </div>
          <div className="content-section">
            <div className="content-section-banner">

            </div>
            <div className="btn-next-step" id="btn-step"><a href="#">Start here</a></div>
          </div>
        </div>

      </div>
  );
};

export default App;