import React from "react";

const MoreInfoes = ({product}) => {
  return (
    <div className="flex w-full flex-wrap flex-col">
      <p>اطلاعات بیشتر :</p>
      <hr />
      <main>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p>میزان:</p>
          <p> گرم {product?.weight}</p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p>مناسب برای :</p>
          <p>{product?.suitableFor}</p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p> بو :</p>
          <p>{product?.smell}</p>
        </div>
      </main>
    </div>
  );
};

export default MoreInfoes;
