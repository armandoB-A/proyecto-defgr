import {useState} from "react";
import {Button, Form, FormGroup, Input, Label, Row, Table} from "reactstrap";

export const Usuarios = () => {
    //hook para la visualizacion del formulario
    const [isVisible, setIsVisible] = useState(false);
    //hooks para los datos del Usuario
    const [Clave, setClave] = useState("");
    const [nombre, setNombre] = useState("");
    const [Rol, setRol] = useState("Ingenieria Civil");
    const [imagen, setImagen] = useState("");
    //hook Arreglo para el listado de Usuarios
    const [Usuarios, setUsuarios] = useState([])  //lista vacia


    //variable del estado inicial de formulario(indicador de guardar)
    const estadoInicial = {botonF:'GUARDAR', Usuario:{},indice:-1,titulo:''}
    //hook para estado del formulario
    const [estado,setEstado] = useState(estadoInicial)


    const guardar = (event) => {
        event.preventDefault();
        if (estado.botonF==="GUARDAR"){
            setUsuarios([...Usuarios, {Clave,nombre,Rol,imagen}])
            setClave('')
            setNombre('')
        }else if (estado.botonF==="Editar"){
            const aux =[...Usuarios]
            aux[estado.indice]={Clave,nombre,Rol,imagen}
            setUsuarios(aux)
            setEstado(estadoInicial)
            setClave('')
            setNombre('')
        }

    };



    const vistaFormu = () => {
        setIsVisible(!isVisible); //hook con funcionamiendo de bandera
    }


    //evento que cuando ingrese Clave se va a mandar lo que se halla secrito
    const eventoClave = (event) => {
        setClave(event.target.value)
    }
    const eventoNombre = (event) => {
        setNombre(event.target.value)
    }
    const eventoRol = (event) => {
        setRol(event.target.value)
    }

    //evento que recibe la imagen y despues la convierte en un onjeto temporal
    //accesible desde una URL
    const eventoImagen = (event) => {
        const file = event.target.files[0]; //e.t file arreglo de archivos
        const url = URL.createObjectURL(file)
        setImagen(url)
    }

    const onEdit = (alum,index) => {
        setEstado({botonF:'Editar', Usuario:{},indice:index,titulo: 'Editar Usuario'})
        setClave(alum.Clave)
        setNombre(alum.nombre)
        setRol(alum.Rol)

    }

    const onBorrar = (i) => {
        setUsuarios(Usuarios.filter((_,id)=>id!==i))

    }

    return <>

        <Row>
            <h2 className="titulo">REGISTRO UsuarioS </h2>
            <Button color="primary" onClick={vistaFormu}>Agregar Usuario</Button>
            {isVisible && (
                <Form onSubmit={guardar}>
                    <h2>{estado.titulo}</h2>
                    <FormGroup>
                        <Label>
                            Clave:
                            <Input //Input T mayuscula pertenece a la libreria de Reac strap
                                //
                                type="text" //tipo input = texto
                                value={Clave} //valor va a ser en cado de la edicion del Usuario
                                onChange={eventoClave} //metodo en caso de ingrrse un valor
                                required={true} //
                            />
                        </Label>
                    </FormGroup>
                    <FormGroup>
                        <Label>
                            Usuario:
                            <Input
                                type="text"
                                value={nombre}
                                onChange={eventoNombre}
                                required={true}
                            />
                        </Label>
                    </FormGroup>

                    <FormGroup>
                        <Label>
                            Rol:
                            <Input
                                type="select"
                                required={true}
                                value={Rol}
                                onChange={eventoRol}
                            >
                                <option value="norma">Admin</option>
                                <option value="STABILO">Usuario</option>
                            </Input>
                        </Label>
                    </FormGroup>
                    <FormGroup>
                        <Label for="foto">FOTO:</Label>
                        <Input
                            type="file"
                            name="foto"
                            id="foto"
                            onChange={eventoImagen}
                            required={true}
                        />
                    </FormGroup>
                    <Button type="submit" color="primary" className="botong">{estado.botonF}</Button>
                </Form>
            )}

            <Table class="table table-striped" >
                <thead className="table-primary">
                <tr>
                    <th>Clave</th>
                    <th>NOMBRE</th>
                    <th>Rol</th>
                    <th>FOTO</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {Usuarios.map((Usuario,i)=>(
                    <tr key={i}>
                        <td>{Usuario.Clave}</td>
                        <td>{Usuario.nombre}</td>
                        <td>{Usuario.Rol}</td>
                        <td>
                            <img src={Usuario.imagen} className="imagen" alt={"foto"}/>

                        </td>
                        <td>
                            <Button color="primary" className="boton1" onClick={() => onEdit(Usuario,i)}>Editar</Button>
                            <Button color="primary" onClick={() => onBorrar(i)}>Eliminar</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Row>
    </>;
}