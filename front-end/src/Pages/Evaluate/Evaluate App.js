import logo from './logo.svg';
import './App.css';
function App() {
  return (
    <div>
    <style dangerouslySetInnerHTML={{__html: "\n    .container {\n      display: flex;\n      align-items: center;\n    }\n    #image-container {\n      margin-right: 10px;\n    }\n    .checkbox-container {\n      display: flex;\n    }\n    .checkbox {\n      margin-right: 10px;\n    }\n    #right-image {\n      position: fixed;\n      top: 10px;\n      right: 10px;\n    }\n  " }} />
    <div className="container">
      <div id="image-container">
        <img id="my-image" src="path/to/your/large-image.jpg" alt="Large Image" />
      </div>
      <div className="checkbox-container">
        <div className="checkbox">
          <label>
            <input type="checkbox" name="checkboxGroup" defaultValue={1} /> Checkbox 1
          </label>
        </div>
        <div className="checkbox">
          <label>
            <input type="checkbox" name="checkboxGroup" defaultValue={2} /> Checkbox 2
          </label>
        </div>
        <div className="checkbox">
          <label>
            <input type="checkbox" name="checkboxGroup" defaultValue={3} /> Checkbox 3
          </label>
        </div>
        <div className="checkbox">
          <label>
            <input type="checkbox" name="checkboxGroup" defaultValue={4} /> Checkbox 4
          </label>
        </div>
      </div>
      <div id="right-image">
        <img src="path/to/your/second-image.jpg" alt="Right Image" />
      </div>
    </div>
    <button id="submit-button">Submit</button>
  </div>
);
  }
  



export default App;