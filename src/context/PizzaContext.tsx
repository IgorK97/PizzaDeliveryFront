import React, { createContext, useState, useEffect, ReactNode } from "react"
import APIService from "../services/APIService"
import { Pizza } from "../models/pizza"
// import {NewPizza}from "../models/NewPizza"
// // Интерфейс для контекста пиццы
// interface PizzaContextProps {
//   pizzas: Pizza[] // Массив всех пицц
//   addPizza: (formData: FormData) => Promise<void> // Добавление новой пиццы
// }
// Интерфейс для контекста пиццы
interface PizzaContextProps {
  pizzas: Pizza[] // Массив всех пицц
  editPizza:Pizza|null
  setEditPizza: (pizza: Pizza | null) => void // Функция для установки текущего редактируемого проекта
  addPizza: (formData: FormData) => Promise<void> // Добавление новой пиццы
  updatePizza: (id: number, formData:FormData) => void // Обновление проекта
  deletePizza: (id: number) => void // Удаление проекта
}

// Создание контекста
export const PizzaContext = createContext<PizzaContextProps | undefined>(undefined)




// // Провайдер контекста для предоставления данных всему приложению
// export const PizzaProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [pizzas, setPizzas] = useState<Pizza[]>([]) // Локальное состояние для всех пицц

//   useEffect(() => {
//     fetchPizzas() // Загружаем пиццы при монтировании компонента
//   }, [])

//   // Получение пицц от API
//   const fetchPizzas = async () => {
//     const data = await APIService.getPizzas()
//     setPizzas(data || [])
//   }

//   // Добавление новой пиццы
//   const addPizza = async (formData: FormData) => {
//     const newPizza = await APIService.createPizza(formData)
//     // setPizzas([...pizzas, newPizza]) // Обновляем состояние
//     setPizzas((prevPizzas)=> [...prevPizzas,newPizza]);
//   }
  

//   return (
//     <PizzaContext.Provider value={{ pizzas, addPizza}}>{children}</PizzaContext.Provider>
//   )
// }


// Провайдер контекста для предоставления данных всему приложению
export const PizzaProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [pizzas, setPizzas] = useState<Pizza[]>([]) // Локальное состояние для всех пицц
  const [editPizza, setEditPizza] = useState<Pizza|null>(null)

  useEffect(() => {
    fetchPizzas() // Загружаем пиццы при монтировании компонента
  }, [])

  // Получение пицц от API
  const fetchPizzas = async () => {
    const data = await APIService.getPizzas()
    setPizzas(data || [])
  }

  // Добавление новой пиццы
  const addPizza = async (formData: FormData) => {
    const newPizza = await APIService.createPizza(formData)
    // setPizzas([...pizzas, newPizza]) // Обновляем состояние
    setPizzas((prevPizzas)=> [...prevPizzas,newPizza]);
  }
  const updatePizza = async (id: number, updatedPizza: FormData) => {
    const updatedPiz = await APIService.updatePizza(id, updatedPizza)
    setPizzas(pizzas.map((piz) => (piz.id === id ? updatedPiz : piz))) // Обновляем проект в списке
  }

  const deletePizza=async (id:number)=>{
    await APIService.deletePizza(id)
    setPizzas(pizzas.filter((piz)=>piz.id!==id))
  }

  return (
    <PizzaContext.Provider value={{ pizzas, editPizza, setEditPizza, addPizza, updatePizza, deletePizza }}>{children}</PizzaContext.Provider>
  )
}
