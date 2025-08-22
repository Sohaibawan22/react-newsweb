import React, {useState} from 'react'
import Navbar from './component/Navbar'
import News from './component/News'
import {
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App = () => {
const [progress, setprogress] = useState(0);

 const setProgress = (progress) => {
    setprogress(progress);
   }
 
    return (
      <div>
        <Navbar />
        <LoadingBar
        height={3}
        color="#f11946"
      progress={progress} 
        
      />
        <Routes>
          <Route exact path="/" element={<News setProgress={setProgress}key="general" pageSize={9} country="us" category="general" />} />
          <Route exact path="/business" element={<News setProgress={setProgress}key="business"  pageSize={9} country="us" category="business" />} />
          <Route exact path="/entertainment" element={<News setProgress={setProgress}key="entertainment" pageSize={9} country="us" category="entertainment" />} />
          <Route exact path="/health" element={<News setProgress={setProgress}key="health" pageSize={9} country="us" category="health" />} />
          <Route exact path="/science" element={<News setProgress={setProgress}key="science" pageSize={9} country="us" category="science" />} />
          <Route exact path="/sports" element={<News setProgress={setProgress}key="sports" pageSize={9} country="us" category="sports" />} />
          <Route exact path="/technology" element={<News setProgress={setProgress}key="technology" pageSize={9} country="us" category="technology" />} />
        </Routes>

      </div>
    )
  }
export default App;
