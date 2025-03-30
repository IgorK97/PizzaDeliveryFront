import React, { useEffect, useState, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { PizzaContext } from "../context/PizzaContext"
import { Pizza } from "../models/pizza"

// Компонент для отображения и редактирования конкретной пиццы
const PizzaDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>() // Получаем ID пиццы из параметров URL
  const context = useContext(PizzaContext) // Доступ к контексту пицц
  const navigate = useNavigate() // Для перехода между страницами

  const [pizza, setPizza] = useState<Pizza | null>(null) // Храним текущую пиццу

  useEffect(() => {
    if (context) {
      const foundPizza = context.pizzas.find((piz) => piz.id === parseInt(id || "", 10))
      setPizza(foundPizza || null)
    }
  }, [context, id])

  if (!pizza) {
    return <div>Pizza not found!</div> // Сообщение, если пицца не найден
  }

  return (
    <div>
      <h2>Pizza Details</h2>
      <>
        {/* Режим просмотра */}
        <p>
          <strong>Название:</strong> {pizza.name}
        </p>
        <p>
          <strong>Описание:</strong> {pizza.description}
        </p>
        <p>
          <strong>{pizza.isAvailable? "В ассортименте":"Отсутствует"}</strong>
        </p>
        {pizza.image && <img src={pizza.image} alt={pizza.name} style={{width:"300px"}}/>}
        {/* <p>
          <strong>Due Date:</strong> {project.dueDate}
        </p> */}
        <button onClick={() => navigate("/")}>Back</button> {/* Возврат на главную страницу */}
      </>
    </div>
  )
}

export default PizzaDetails
