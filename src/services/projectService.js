import http from "../http-route";

class ProjectService {
    getAll() {
        return http.get("/project/list");
    }

    get(id) {
        return http.get(`/project/view/${id}`);
    }


    add(data) {
        return http.post("/project/add", data);
    }

    //
    update(data) {
        return http.put("/project/update", data);
    }

    delete(id) {
        return http.delete(`/project/delete/${id}`);
    }
    //
    // deleteAll() {
    //     return http.delete(`/tutorials`);
    // }
    //
    // findByTitle(title) {
    //     return http.get(`/tutorials?title=${title}`);
    // }
}

export default new ProjectService();