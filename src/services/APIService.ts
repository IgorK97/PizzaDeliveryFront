import { Pizza } from "../models/pizza"

// Класс для работы с API
class APIService {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  // Получение списка всех пицц
  async getPizzas(): Promise<Pizza[]> {
    const response = await fetch(`${this.baseUrl}/Pizzas`)
    if (!response.ok) throw new Error("Не удалось запросить пиццы")
    return await response.json()
  }
  // async getPizzaById(id: number): Promise<Pizza> {
  //   const response = await fetch(`${this.baseUrl}/Pizzas/${id}`);
  //   if (!response.ok) throw new Error("Не удалось запросить пиццу");
  //   return await response.json();
  // }


  // Создание новой пиццы
  async createPizza(formData: FormData): Promise<Pizza> {
    // const formData = new FormData()
    // formData.append("name", pizza.name)
    // formData.append("description", pizza.description)
    // if(image) formData.append("file", image)

    const response = await fetch(`${this.baseUrl}/Pizzas`, {
      method: "POST",
      // headers: { "Content-Type": "application/json" },
      // body: JSON.stringify(pizza),
      body: formData
    })
    if (!response.ok) throw new Error("Failed to create pizza")
    return await response.json()
  }

  async getPizza(id:number):Promise<Pizza>{
    const response = await fetch(`${this.baseUrl}/Pizzas/${id}`)
    if(!response.ok) throw new Error("Не удалось запросить пиццу")
    return await response.json()
  }
  async updatePizza(id: number, formData: FormData): Promise<Pizza> {
    // Включаем id обратно в объект project
    // const pizzaWithId = { ...pizza, id };
  
    const response = await fetch(`${this.baseUrl}/Pizzas/${id}`, {
      method: "PUT",
      // headers: { "Content-Type": "application/json" },
      // body: JSON.stringify(pizzaWithId),
      body:formData
    });
  
    if (!response.ok) throw new Error("Эту пиццу обновить не удалось");
    return await response.json();
  }
  async deletePizza(id: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/Pizzas/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) throw new Error("Эту пиццу удалить не удалось")
  }
  }


const apiService = new APIService("/api");
export default apiService // Экспортируем инстанс с базовым URL
