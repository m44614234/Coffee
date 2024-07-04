"use client";
import React, { useState } from "react";

function CreateBlog({userID}) {


  const [form, setForm] = useState({
    user:userID,
    title: "" ,
    subTitle : "" ,
    body:"",
    tags: [],
    comments : [],
    img: null,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, img: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("subTitle", form.subTitle);
    formData.append("body", form.body);
    formData.append("img", form.img);
    formData.append("tags", form.tags);
    formData.append("comments", form.comments);
    formData.append("user", form.user);
    
    console.log("formData => " , formData)


    const res = await fetch("/api/blog", {
      method: "POST",
      body: formData,
    });

    if (res.status === 201) {

      swal({
        title: " بلاگ با موفقیت ثبت شد",
        icon: "success",
        buttons: "مشاهده همه بلاگ های من",
      }).then(() => {
        location.replace("/p-user/blogs");
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-200 p-5 gap-2 flex flex-col"
    >
      <div className="flex flex-col w-2/3 py-2">
        <label htmlFor="title">عنوان  اصلی بلاگ </label>
        <input
          className="py-2"
          name="title"
          value={form.title}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col w-2/3 py-2">
        <label htmlFor="subTitle">عنوان  دوم بلاگ </label>
        <input
          className="py-2"
          name="subTitle"
          value={form.subTitle}
          onChange={handleChange}
        />
      </div>

     

      <div className="flex flex-col w-2/3 py-2">
        <label htmlFor="body">توضیحات بلند بلاگ</label>
        <textarea
          className="py-2"
          name="body"
          value={form.body}
          onChange={handleChange}
        />
      </div>

     

      <div className="flex flex-col w-2/3 py-2">
        <label htmlFor="tags">تگ های بلاگ</label>
        <input
          className="py-2"
          name="tags"
          value={form.tags}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col w-2/3 py-2">
        <label htmlFor="img">عکس بلاگ</label>
        <input
          className="py-2"
          type="file"
          name="img"
          onChange={handleFileChange}
        />
      </div>

      <button type="submit" className="bg-red-800 px-3 py-2 text-white w-2/3">
        ثبت بلاگ جدید
      </button>
    </form>
  );
}

export default CreateBlog;
