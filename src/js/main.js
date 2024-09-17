const add_button=document.getElementById('addContact');
const contact_input=document.getElementById('contactName');
const contact_list=document.getElementById('contactList');
const total_report=document.getElementById('total');
let total=0;

const update_total=function(){
  total_report.innerText=total;
}

const validate_name=function(name){
  let answer=true;
  contact_list.childNodes.forEach(element => {
    if(element.children[0].innerText.trim()===name.trim()){
      answer=false;
      return;
    }
  });
  return answer;
}

const addContact=function(){
  let contact_name=contact_input.value;
  //validar que se ha ingresado un nombre
  if(contact_name===""||contact_name === null){
    alert("Ingrese un nombre");
    return;
  }

  let name_is_valid=validate_name(contact_name);
  if(!name_is_valid){
    alert("Nombre duplicado");
    return;
  }

  //Crear el LI
  let li_element=document.createElement("li");

  //Crear span
  let span_element=document.createElement("span")
  span_element.innerText=contact_name;
  li_element.appendChild(span_element);

  //Crear Botón Editar
  let edit_button=document.createElement("button");
  edit_button.innerText="Editar";
  edit_button.addEventListener("click",()=>{
    let new_name = window.prompt("Actualice el nombre", contact_name);
    if(new_name===""||new_name === null){
      alert("Ingrese un nombre");
      return;
    }
    let new_name_is_valid=validate_name(new_name);
    if(!new_name_is_valid){
      alert("Nombre duplicado");
      return;
    }

    li_element.children[0].innerText=new_name;
  });
  li_element.appendChild(edit_button);

  //Crear Botón Eliminar
  let delete_button=document.createElement("button");
  delete_button.innerText="Borrar";
  delete_button.addEventListener('click',()=>{
    contact_list.removeChild(li_element);
    total--;
    update_total();
  });
  li_element.appendChild(delete_button);

  //Insertar Li en Lista
  contact_list.appendChild(li_element);

  //Limpiar input
  contact_input.value="";
  total++;
  update_total();
}


add_button.addEventListener('click',addContact)
