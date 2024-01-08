import logo from './logo.svg';
import './App.css';
import AddDetails from './components/addDetails/addDetails';

import DisplayData from './components/displayData/displayData'



function App() {

  return (
    <div style={{display:'flex',flexDirection:'row'}}>
       <div style={{height:"100vh",width:"45vh", backgroundColor:"#FEFFEC", justifyContent:"center",display:'flex'}}>
     
        <AddDetails/>    
       </div >
       <div className = "output"> 
     
        <DisplayData/>
        </div> 

    </div>
  );
}

export default App;