import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { PizzaProvider } from "./context/PizzaContext"
import PizzaList from "./components/PizzaList"
import PizzaForm from "./components/PizzaForm"
import PizzaDetails from "./components/PizzaDetails"

const App: React.FC = () => {
  return (
    <PizzaProvider>
      <Router>
        <h1>Pizza Management</h1>
        <Routes>
          <Route path="/" element={<PizzaList />} /> {/* Главная страница */}
          <Route path="pizzas/add" element={<PizzaForm />} /> {/* Добавление пиццы */}
          <Route path="/pizzas/:id" element={<PizzaDetails />} /> {/* Детали пиццы */}
        </Routes>
      </Router>
    </PizzaProvider>
  )
}

export default App





// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// // Импортируем компонент PizzaList из файла PizzaList.tsx, который находится в папке components
// import PizzaList from './components/PizzaList';

// // Создаем функциональный компонент App
// const App = () => {
//   // Возвращаем JSX, который будет отрисован на странице
//   return (
//     // Используем React Fragment (<>...</>) для группировки элементов без добавления лишнего DOM-элемента
//     <>
//       {/* Рендерим компонент PizzaList, который отвечает за отображение списка проектов */}
//       <PizzaList />
//     </>
//   );
// };

// // Экспортируем компонент App по умолчанию, чтобы его можно было использовать в других частях приложения
// export default App;


