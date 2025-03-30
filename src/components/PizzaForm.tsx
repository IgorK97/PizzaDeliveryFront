import React, { useState, useContext } from "react"
import { PizzaContext } from "../context/PizzaContext"
import { useNavigate } from "react-router-dom"

// Интерфейс для описания структуры новой пиццы
interface NewPizza {
  name: string;
  description: string;
  isAvailable:boolean;
  image: File | null;
  
}

// Компонент для добавления новой пиццы
const PizzaForm: React.FC = () => {
  const context = useContext(PizzaContext) // Доступ к контексту пиццы
  const navigate = useNavigate() // Хук для перехода между страницами

  const [newPizza, setNewPizza] = useState<NewPizza>({
 name: "new pizza",
    description: "new pizza description",
    isAvailable:true,
    image: null,
  })
  const [image,setImage]=useState<File|null>(null)

const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
  if(e.target.files && e.target.files.length>0){
    setImage(e.target.files[0])
  }
}

  // Обработчик отправки формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Проверяем заполнение всех полей
    if (!newPizza.name.trim() || !newPizza.description.trim()) {
      alert("Please fill in all required fields.")
      return // Если какое-либо поле пустое, прерываем выполнение
    }
const formData = new FormData();
formData.append("name", newPizza.name);
formData.append("description",newPizza.description);
formData.append("isAvailable",String(newPizza.isAvailable));
if(newPizza.image instanceof File){
  formData.append("image", newPizza.image, newPizza.image.name);
}
else{
  alert("Invalid image file selected!");
  return;
}
if(context){
  await context.addPizza(formData);
  setNewPizza({
    name:"",
    description:"",
    isAvailable:true,
    image:null,
  });
  navigate("/");
}
    // if (context) {
    //   // Добавляем новую пиццу в глобальное состояние
    //   context.addPizza(newPizza, image)

    //   // Сбрасываем форму
    //   setNewPizza({
    //     name: "",
    //     description: "",
    //     image:null,
    //   })

    //   // Переходим на главную страницу
    //   navigate("/")
    // }
  }
const handleCheckboxChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
  setNewPizza({
    ...newPizza, isAvailable:e.target.checked,
  });
}
  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Project</h2>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={newPizza.name}
          required // Поле обязательно для заполнения
          onChange={(e) => setNewPizza({ ...newPizza, name: e.target.value })}
        />
      </div>
      <div>
        <textarea
          placeholder="Description"
          value={newPizza.description}
          required // Поле обязательно для заполнения
          onChange={(e) => setNewPizza({ ...newPizza, description: e.target.value })}
        />
      </div>
      <div>
        <p>Пицца уже в ассортименте?</p>
        <input 
        type="checkbox"
        checked={newPizza.isAvailable}
        onChange={handleCheckboxChange}
        />
      </div>
      <div>
        <input type="file" accept="image/*" onChange={(e)=>{
          if(e.target.files && e.target.files[0]){
            setNewPizza({...newPizza, image: e.target.files[0]});
          }
        }}/>
      </div>
      
     
      <button type="submit">Add Pizza</button> {/* Кнопка для отправки формы */}
      <button type="button" onClick={() => navigate("/")}>
        Back
      </button>
      {/* Кнопка для возврата на главную страницу */}
    </form>
  )
}

export default PizzaForm
