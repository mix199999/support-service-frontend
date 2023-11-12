import '../styles/App.scss'
import Header from './Header'
import logo from '../logo.svg'
import AppContent from './AppContent';
 function App(){
    return(
        <div>
            <Header pageTitle="Support Service" logoSrc={logo}></Header>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col'>
                        <AppContent/>
                    </div>
                </div>
            </div>
        </div>
    );
 }

 export default App;