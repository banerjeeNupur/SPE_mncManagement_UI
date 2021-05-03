import http from "../http-route"

class EmployeeService{

    login(data){
        return http.post("/login", data)
    }

    add(data) {
        return http.post("/signup", data);
    }

    getAll() {
        return http.get("/listEmployees");
    }
}

export default new EmployeeService();