import logo from './logo.svg';
import './App.css';
import AddDetails from './components/addDetails/addDetails';

import DisplayData from './components/displayData/displayData'



function App() {

  return (
    <div>
       <div className = "container">
     
        <AddDetails/>    
       </div >
       <div className = "output"> 
     
        <DisplayData/>
        </div> 

    </div>
    
  );
}

export default App;