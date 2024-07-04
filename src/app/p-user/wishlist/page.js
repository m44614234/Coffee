import UserPanelLayout from "@/components/layouts/UserPanelLayout";
import styles from "@/styles/p-user/wishlist.module.css";
import Product from "@/components/templates/p-user/wishlist/Product";
import connectToDB from "@/configs/db";
import { authUser } from "@/utils/authUser";
import WishlistModel from "@/models/WishList";

const page = async () => {
  const user = await authUser();

  connectToDB();

  const wishlist = await WishlistModel.find({ user: user._id })
  .populate("product");

  console.log("wishlist => ", wishlist);


  return (
    <UserPanelLayout>
      <main>
        <h1 className={styles.title}>
          <span>علاقه مندی ها</span>
        </h1>
        <div className={styles.container}>
          {wishlist.length ?
            wishlist.map((wish) => (
              <Product
                key={wish._id}
                name={wish.product.name}
                price={wish.product.price}
                score={wish.product.score}
                img={wish.product.img}
                wishID={String(wish._id)}
                productID={String(wish.product._id)}
              />
            )) : 
              <p className={styles.empty}>علاقه مندی وجود ندارد</p>
            }
        </div>

        
      </main>
    </UserPanelLayout>
  );
};

export default page;
