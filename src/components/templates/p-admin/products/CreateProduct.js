"use client";
import React, { useState } from "react";

function CreateProduct() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    quantity : " ",
    shortDescription: "",
    longDescription: "",
    weight: "",
    suitableFor: "",
    smell: "",
    tags: [],
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
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("shortDescription", form.shortDescription);
    formData.append("longDescription", form.longDescription);
    formData.append("weight", form.weight);
    formData.append("suitableFor", form.suitableFor);
    formData.append("smell", form.smell);
    formData.append("img", form.img);
    formData.append("tags", form.tags);
    formData.append("quantity", form.quantity);

    const res = await fetch("/api/products", {
      method: "POST",
      body: formData,
    });

    if (res.status === 201) {
      swal({
        title: " محصول با موفقیت ثبت شد",
        icon: "success",
        buttons: "مشاهده همه محصولات",
      }).then(() => {
        location.replace("/p-admin/products");
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-200 p-5 gap-2 flex flex-col"
    >
      <div className="flex flex-col w-2/3 py-2">
        <label htmlFor="name">نام محصول</label>
        <input
          className="py-2"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col w-2/3 py-2">
        <label htmlFor="price">قیمت محصول</label>
        <input
          className="py-2"
          name="price"
          value={form.price}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col w-2/3 py-2">
        <label htmlFor="price">تعداد محصول</label>
        <input
          className="py-2"
          name="quantity"
          type="number"
          value={form.quantity}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col w-2/3 py-2">
        <label htmlFor="shortDescription">توضیحات کوتاه محصول</label>
        <input
          className="py-2"
          name="shortDescription"
          value={form.shortDescription}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col w-2/3 py-2">
        <label htmlFor="longDescription">توضیحات بلند محصول</label>
        <textarea
          className="py-2"
          name="longDescription"
          value={form.longDescription}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col w-2/3 py-2">
        <label htmlFor="suitableFor">این محصول مناسب است برای </label>
        <input
          className="py-2"
          name="suitableFor"
          value={form.suitableFor}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col w-2/3 py-2">
        <label htmlFor="weight">وزن محصول</label>
        <input
          className="py-2"
          name="weight"
          value={form.weight}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col w-2/3 py-2">
        <label htmlFor="smell">میزان بو محصول</label>
        <input
          className="py-2"
          name="smell"
          value={form.smell}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col w-2/3 py-2">
        <label htmlFor="tags">تگ های محصول</label>
        <input
          className="py-2"
          name="tags"
          value={form.tags}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col w-2/3 py-2">
        <label htmlFor="img">عکس محصول</label>
        <input
          className="py-2"
          type="file"
          name="img"
          onChange={handleFileChange}
        />
      </div>

      <button type="submit" className="bg-red-800 px-3 py-2 text-white w-2/3">
        ثبت محصول جدید
      </button>
    </form>
  );
}

export default CreateProduct;
