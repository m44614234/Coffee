import React from "react";

const Description = ({product}) => {
  return (
    <div className="flex w-full flex-wrap flex-col gap-3">
      <p>توضیحات :</p>
      <hr />
      <h3>نام محصول : {product?.name}</h3>
      <h6>توضیحات کوتاه : {product?.shortDescription}</h6>
      <h6>توضیحات بلند : {product?.longDescription}</h6>
      
    </div>
  );
};

export default Description;
