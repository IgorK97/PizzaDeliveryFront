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
const [editMode, setEditMode]=useState(false)
const [updatedPizza, setUpdatedPizza]=useState<Pizza|null>(null)
const [imageFile,setImageFile]=useState<File|null>(null)
  useEffect(() => {
    if (context) {
      const foundPizza = context.pizzas.find((piz) => piz.id === parseInt(id || "", 10));
      if(foundPizza){
        setPizza(foundPizza || null);
        setUpdatedPizza(foundPizza);
      }
    }
  }, [context, id])

  if (!pizza || !updatedPizza) {
    return <div>Пицца не найдена!</div> // Сообщение, если пицца не найден
  }
const handleChange=(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
  setUpdatedPizza({...updatedPizza, [e.target.name]:e.target.value})
}
const handleCheckboxChnage=()=>{
  setUpdatedPizza({...updatedPizza, isAvailable: !updatedPizza.isAvailable})
}
const handleFileChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
  if(e.target.files&&e.target.files.length>0){
    setImageFile(e.target.files[0]);
    // updatedPizza.image=e.target.files[0].name;
    // setEditMode(false);
  }
}


const handleCancel=()=>{
  
  setEditMode(false);
  setUpdatedPizza(pizza);
  setImageFile(null);
}
const handleSave=async ()=>{
  if(!context||!updatedPizza) return;
  const formData = new FormData();
  // formData.append("id",String(updatedPizza.id));
  formData.append("name",updatedPizza.name);
  formData.append("description", updatedPizza.description);
  formData.append("isAvailable", String(updatedPizza.isAvailable));
if(imageFile){
  formData.append("image", imageFile, imageFile.name);
}
// else
// formData.append("image",null, pizza.image);

await context.updatePizza(updatedPizza.id,formData);
setEditMode(false);
}
return (
  <div>
    <h2>Pizza Details</h2>
    {editMode?(
      <div>
        <p><input type="text" name="name" value={updatedPizza.name}onChange={handleChange}/></p>
        <textarea name="description" value={updatedPizza.description} onChange={handleChange}/>
<div>
  <label>
    <p>Пицца уже в ассортименте?</p>
    <input type="checkbox" checked={updatedPizza.isAvailable} onChange={handleCheckboxChnage}/>
    </label>
    </div>
    <p>Изображение в базе данных: </p>
    {pizza.image&&<img src={pizza.image}alt={pizza.image} width="450px"/>}
    <p><input type="file" accept="image/*" onChange={handleFileChange}/></p>

    <p><button onClick={handleSave}>Сохранить</button>
    <button onClick={handleCancel}>Отмена</button></p>
  </div>
    ):(
      <div>
        <p><strong>Название: </strong> {pizza.name}</p>
        <p><strong>Описание: </strong> {pizza.description}</p>
        <p><strong>{pizza.isAvailable? "В ассортименте": "Отсутствует"}</strong></p>
        <p>{pizza.image && <img src={pizza.image}alt={pizza.name} width="450px"/>}</p>
        <p><button onClick={() => setEditMode(true)}>Редактировать</button>
        <button onClick={()=>navigate("/")}>Назад</button></p>
    
  </div>
    )}
    </div>
)
}

export default PizzaDetails




// // Компонент для отображения и редактирования конкретной пиццы
// const PizzaDetails: React.FC = () => {
//   const { id } = useParams<{ id: string }>() // Получаем ID пиццы из параметров URL
//   const context = useContext(PizzaContext) // Доступ к контексту пицц
//   const navigate = useNavigate() // Для перехода между страницами

//   const [pizza, setPizza] = useState<Pizza | null>(null) // Храним текущую пиццу

//   useEffect(() => {
//     if (context) {
//       const foundPizza = context.pizzas.find((piz) => piz.id === parseInt(id || "", 10));
//       if(foundPizza){
//         setPizza(foundPizza || null);
        
//       }
//     }
//   }, [context, id])

//   if (!pizza) {
//     return <div>Пицца не найдена!</div> // Сообщение, если пицца не найден
//   }
//   return (
//     <div>
//       <h2>Pizza Details</h2>
//       <>
        
//         <p>
//           <strong>Название:</strong> {pizza.name}
//         </p>
//         <p>
//           <strong>Описание:</strong> {pizza.description}
//         </p>
//         <p>
//           <strong>{pizza.isAvailable? "В ассортименте":"Отсутствует"}</strong>
//         </p>
//         {pizza.image && <img src={pizza.image} alt={pizza.name} style={{width:"300px"}}/>}
       
//         <button onClick={() => navigate("/")}>Back</button> {/* Возврат на главную страницу */}
//       </>
//     </div>
//   )
// }

// export default PizzaDetails
