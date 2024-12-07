import instance from ".";

const authService = {
  async auth(path, data) {
    try {
      const res = await instance.post(path, data);
      if (res?.data?.user) {
        delete res?.data?.user.confirmPassword;
      }
      return res;
    } catch (error) {
      console.log(error);
      alert(error.response.data);
    }
  }
};

export default authService;
