import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserManagement from './components/UserManage/UserManagement';
import CentraManagement from './components/CentraManage/CentraManagement';
import './Admin.css';  // Import your CSS file
import StorageManagement from './components/StorageManage/StorageManagement';

function App(){
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/centra-management" element={<CentraManagement />} />
          <Route path="/storage-management" element={<StorageManagement />} />
          <Route path="/" element={<UserManagement />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
