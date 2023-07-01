import {
    createBrowserRouter,
    RouterProvider,
    redirect
  } from 'react-router-dom';
  import Layout from './components/Layout';
  import AboutUs from './components/AboutUs/AboutUs';
  import LandingPage from './components/LandingPage/LandingPage';
  import LeaderBoard from "./components/LeaderBoard/LeaderBoard";
  import MainPage from "./components/MainPage/MainPage";
  import PopUpRules from "./components/PopUpRules/PopUpRules";
  import Tablero from "./components/Tablero/Tablero";
  import GamePage from './components/GamePage/GamePage';
  import LogIn from './components/LogIn/LogIn';
  import TableroUsuario from './components/TableroUsuario/TableroUsuario';
  import TableroOponente from './components/TableroOponente/TableroOponente';
  import PreGamePage from './components/PreGamePage/PreGamePage';
  function Router() {
    const router = createBrowserRouter([
      {
        path: '/',
        element: <Layout />,
        children: [
          {
            path: '',
            element: <LandingPage />
          },
          {
            path: 'MainPage',
            element: <MainPage />
          },
          
          {
            path: 'AboutUs',
            element: <AboutUs />
          },
          {
            path: 'LeaderBoard',
            element: <LeaderBoard/>
          },
          {
            path: 'PopUpRules',
            element: <PopUpRules/>
          },
          {
            path: 'Tablero',
            element: <Tablero/>
          },
          {
            path: 'GamePage',
            element: <GamePage/>
          },
          {
            path: 'LogIn',
            element: <LogIn/>
          },
          {
            path: 'TableroUsuario',
            element: <TableroUsuario/>
          },
          {
            path: 'TableroOponente',
            element: <TableroOponente/>
          },
          {
            path: 'PreGamePage',
            element: <PreGamePage/>
          },
          

        ]
      },
      {
        path: '*', 
        loader: () => {
          return redirect('/')
        }
      }
    ])
  
    return (
      <RouterProvider router={router} />
    );
  }
  
  export default Router;