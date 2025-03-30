import React, { createContext, useState, useEffect, ReactNode } from "react"
import APIService from "../services/APIService"
import { Pizza } from "../models/pizza"

// Интерфейс для контекста пиццы
interface PizzaContextProps {
  pizzas: Pizza[] // Массив всех пицц
  addPizza: (formData: FormData) => Promise<void> // Добавление новой пиццы
}

// Создание контекста
export const PizzaContext = createContext<PizzaContextProps | undefined>(undefined)

// Провайдер контекста для предоставления данных всему приложению
export const PizzaProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [pizzas, setPizzas] = useState<Pizza[]>([]) // Локальное состояние для всех пицц

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

  return (
    <PizzaContext.Provider value={{ pizzas, addPizza }}>{children}</PizzaContext.Provider>
  )
}
