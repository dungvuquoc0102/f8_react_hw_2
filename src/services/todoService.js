import instance from "./index";

export const todoService = {
  async getAll() {
    try {
      const res = await instance.get("/todos");
      if (res.status === 200) {
        return res;
      } else {
        throw new Error("Error");
      }
    } catch (error) {
      console.log(error);
    }
  },
  async getByUserId(id) {
    try {
      const res = await instance.get(`/todos?userId=${id}`);
      if (res.status === 200) {
        return res;
      } else {
        throw new Error("Error");
      }
    } catch (error) {
      console.log(error);
    }
  },
  async getById(id) {
    try {
      const res = await instance.get(`/todos/${id}`);
      if (res.status === 200) {
        return res;
      } else {
        throw new Error("Error");
      }
    } catch (error) {
      console.log(error);
    }
  },
  async create(data) {
    try {
      const res = await instance.post("/todos", data);
      if (res.status === 201) {
        return res;
      } else {
        throw new Error("Error");
      }
    } catch (error) {
      console.log(error);
    }
  },
  async updateById(id, data) {
    try {
      const res = await instance.put(`/todos/${id}`, data);
      if (res.status === 200) {
        return res;
      } else {
        throw new Error("Error");
      }
    } catch (error) {
      console.log(error);
    }
  },
  async delete(id) {
    try {
      const res = await instance.delete(`/todos/${id}`);
      if (res.status === 200) {
        return res;
      } else {
        throw new Error("Error");
      }
    } catch (error) {
      console.log(error);
    }
  }
};
