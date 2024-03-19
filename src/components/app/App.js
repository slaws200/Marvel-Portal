import AppHeader from "../appHeader/AppHeader";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const Page404 = lazy(() => import('../pages/404'));
const SingleComicPage = lazy(() => import('../pages/SingleComicPage'));


const App = () => {
    
    
    
    return (
        <Suspense fallback={<h2>Loading...</h2>}>
            <Router>
                <div className="app">
                    <AppHeader/>
                    <main>
                        <Routes>
                            <Route path='/' element={<MainPage/>}/>
                            <Route path="/comics" element={<ComicsPage/>}/>                        
                            <Route path="/comics/:comicId" element={<SingleComicPage/>}/>
                            <Route path="*" element={<Page404/>}/>
                        </Routes>
                    </main>
                </div>
            </Router>
        </Suspense>
    )
    
}

export default App;