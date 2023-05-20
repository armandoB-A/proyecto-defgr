import { Outlet } from "react-router-dom";

export const Principal = () => {
    return (
        <>
            <div className="row align-items-center" style={{ height: "100vh" }}>
                <div className="col-4">
                    <div
                        id="list-example"
                        className="list-group pink-background"
                        style={{ margin: "20px" }}
                    >
                        <a className="list-group-item list-group-item-action" href="/inicio" style={{ height: "60px" }}>
                            Inicio
                        </a>
                        <a className="list-group-item list-group-item-action" href="/datos" style={{ height: "60px" }}>
                            Productos
                        </a>
                        <a className="list-group-item list-group-item-action" href="/ususarios" style={{ height: "60px" }}>
                            Usuarios
                        </a>
                        <a className="list-group-item list-group-item-action" href="/informacion" style={{ height: "60px" }}>
                            Informacion
                        </a>
                    </div>
                </div>
                <div className="col-8">
                    <Outlet />
                </div>
            </div>
        </>
    );
};
