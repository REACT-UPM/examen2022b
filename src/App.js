import { useState, useEffect } from "react";
import Todo from "./Todo";
import Formulario from "./Formulario";
import './App.css';

const DATOS = [
  {"todo":"COMPRAR PAN","completed":true},
  {"todo":"COMPRAR CEBOLLAS","completed":false},
  {"todo":"HACER LA COMIDA","completed":false},
  {"todo":"ECHAR LA SIESTA","completed":false}];

export default function App() {

  
  const [miLista, setMiLista] = useState(DATOS);

  //no se puede llamar a los métodos toggle o borrar con index (si lo implementamos como en esta solución), 
  //porque en el return tenemos dos listas resultado de un filter (ver que aparecen dos map y por lo tanto hay dos arrays), 
  //el index 0 está dos veces por ejemplo, una en la lista de cosas por hacer y otra en la de cosas hechas
  //se podría haber hecho dos estados distintos y dos métodos borrar o hay múltiples maneras de hacerlo
  function toggle(item){
    const newMyList = [...miLista];
    const index = newMyList.indexOf(item);
    newMyList[index].completed = !newMyList[index].completed;
    setMiLista(newMyList);
  }

  function borrar(item){
    const newMyList = [...miLista];
    const index = newMyList.indexOf(item);
    if (index > -1) {
      newMyList.splice(index, 1); 
    }
    setMiLista(newMyList);
  }

  function crear(text, completed){
    let newMyList;
    if(text==="REINICIAR"){
      newMyList = [...DATOS];
    } else {
      newMyList = [...miLista];
      newMyList.push({todo: text, completed: completed});
    }    
    setMiLista(newMyList);
  }

  return (<div className="App">
      <Formulario crear={crear}/>
      <div><b>LISTA COSAS POR HACER</b></div>
      <ul>
      {miLista.filter(item=>!item.completed).map((item,index)=>
        <Todo item={item} index={index} toggle={toggle} borrar={borrar}/>)}
        </ul>
        <br/>
      <div><b>LISTA COSAS HECHAS</b></div>
      <ul>
      {miLista.filter(item=>item.completed).map((item,index)=>
        <Todo item={item} index={index} toggle={toggle} borrar={borrar}/>)}
      </ul>
      
    </div>
  );
}
