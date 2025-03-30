import React, { useContext } from "react"
import { PizzaContext } from "../context/PizzaContext"
import { Link, useNavigate } from "react-router-dom"

// Компонент для отображения списка пицц
const PizzaList: React.FC = () => {
  const context = useContext(PizzaContext) // Получаем доступ к глобальному состоянию из контекста
  const navigate = useNavigate() // Хук для программной навигации между страницами

  if (!context) return <div>No context available!</div>

  const { pizzas } = context

  return (
    <div>
      <h2>Pizzas</h2>
      {/* Кнопка для добавления новой пиццы */}
      <button onClick={() => navigate("pizzas/add")}>Add New Pizza</button>

      {/* Отображение списка пицц */}
      {pizzas.map((piz) => (
        <div key={piz.id}>
          {/* <h3>{piz.id}</h3> */}
          <h3>{piz.name}</h3>
          <p>{piz.description}</p>
          <p>{piz.isAvailable? "В ассортименте": "Отсутствует"}</p>
          <p>{piz.image && <img src={piz.image} alt={piz.name} style={{width: "150px"}}/>}</p>
          {/* <p>Due Date: {piz.dueDate}</p> */}
          <Link to={`/pizzas/${piz.id}`}>View Details</Link> {/* Переход к деталям пиццы */}
        </div>
      ))}
    </div>
  )
}

export default PizzaList


// import { useState, useEffect } from 'react';

// // Определяем интерфейс для типа Pizza, который описывает структуру данных пиццы
// interface Pizza {
//     id: number;
//     name: string;
//     description: string;
// }

// // Создаем функциональный компонент PizzaList
// const PizzaList = () => {
//     // Используем хук useState для хранения списка пицц
//     const [projects, setPizzas] = useState<Pizza[]>([]);
//     // Используем хук useState для отслеживания состояния загрузки
//     const [loading, setLoading] = useState<boolean>(true);
//     // Используем хук useState для хранения ошибки, если она возникнет
//     const [error, setError] = useState<string | null>(null);

//     // Используем хук useEffect для выполнения side-эффектов (загрузка данных при монтировании компонента)
//     useEffect(() => {
//         getData(); // Вызываем функцию getData для загрузки данных
//     }, []); // Пустой массив зависимостей означает, что эффект выполнится только один раз при монтировании

//     // Функция для загрузки данных с API
//     const getData = () => {
//         // Выполняем запрос к API
//         fetch('/api/Pizzas')
//             // Преобразуем ответ в JSON
//             .then((response) => response.json())
//             // Обрабатываем успешный ответ
//             .then((data: Pizza[]) => {
//                 console.log(data)
//                 setPizzas(data); // Сохраняем полученные данные в состояние pizzas
//                 setLoading(false); // Устанавливаем состояние загрузки в false
//             })
//             // Обрабатываем ошибку, если она возникла
//             .catch((error) => {
//                 setError(error.message); // Сохраняем сообщение об ошибке в состояние error
//                 setLoading(false); // Устанавливаем состояние загрузки в false
//             });
//     }

//     // Если данные загружаются, отображаем сообщение о загрузке
//     if (loading) {
//         return <div>Загрузка...</div>;
//     }

//     // Если произошла ошибка, отображаем сообщение об ошибке
//     if (error) {
//         return <div>Ошибка: {error}</div>;
//     }

//     // Если данные успешно загружены, отображаем список пицц
//     return (
//         <div>
//             <h1>Список пицц</h1>
//             <ul>
//                 {/* Проходим по массиву pizzas и отображаем каждую пиццу */}
//                 {projects.map((project) => (
//                     <li key={project.id}> {/* Указываем ключ для каждого элемента списка */}
//                         <h2>{project.name}</h2> {/* Отображаем название пиццы */}
//                         <p>{project.description}</p> {/* Отображаем описание пиццы */}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// // Экспортируем компонент PizzaList по умолчанию
// export default PizzaList;