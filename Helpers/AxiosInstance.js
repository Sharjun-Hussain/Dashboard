import axios from "axios";

import React from "react";

const AxiosInstance = async ({ url, method, data }) => {
  if (method == "GET") {
    try {
      const res = await axios.get(`${url}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withXSRFToken: true,
        withCredentials: true,
      });

      if (res.status == 200) {
        return res.data;
      }

      return res.data;
    } catch (err) {
      return err;
    }
  }

  if (method == "POST") {
    axios.post(
      `${url}`,
      { data },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withXSRFToken: true,
        withCredentials: true,
      }
    );
  }
};

export default AxiosInstance;
