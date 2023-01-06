//si pongo el export aca, se le dice 'nombrada',
//en este caso no puedo importarlo con el nombre
//q yo quiera, y lo tengo q poner entre llaves
//{Note}
//si puedo hacer: {Note as Pepito}
export const Note = ({ /*categories = [], content, date*/ title, body }) => {
  //lo pongo asi categories = [],
  //pq no todos los objetos q me llegan tienen ese dato. Solo un obj lo tiene, y lo pongo asi
  //para que no me tire error, o sea si categories es undefined ponelo como array vacio
  return (
    <li>
      <h2>{title}</h2>
      <p>{body}</p>
      <hr />
    </li>
  );
};

/*export default Note;*/ //exportar usando modulo
//para importar voy a un archivo y pongo
//import Note from './Note.js';
//pero en vez de Note puedo poner Pepito por ej
