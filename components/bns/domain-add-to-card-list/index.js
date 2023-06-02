import {
  BsFillCheckCircleFill,
  BsPlusCircleFill,
  BsTrash,
  BsTrash2,
} from "react-icons/bs";
import Image from "next/future/image";
import web3Decent from "../../../images/bns/web3-decent.svg";
import style from "./style.module.scss";
import { useState } from "react";
import { currencyFormat } from "../../../utils/common";
import { HiOutlineSearch } from "react-icons/hi";
import { bns_add_to_cart_thunk } from "../../../redux/thunk/bns_cart_thunk";
import { useDispatch, useSelector } from "react-redux";
import {
  bnsAddToCartSuccess,
  bnsRemoveFromCartSuccess,
} from "../../../redux/reducers/bns_cart_reducer";
import { toast } from "react-toastify";
const DomainAddToCardList = ({
  className,
  availability = "",
  checkedDomain = "false",
  deleteCard = "false",
}) => {
  const [cartItems, setCartItems] = useState([]);

  const data = useSelector((state) => state);
  const { bns_cart_data } = useSelector((state) => state.bns_cart);
  const dispatch = useDispatch();

  const handleAddToCartRemoved = (item) => {
    let newBnsObj = [
      ...cartItems,
      {
        domain_id: item?.domain_id,
      },
    ];

    const bns_data = new Set(bns_cart_data.map((item) => item.domain_id));
    let new_bns_data = bns_cart_data;

    if (bns_data.has(item.domain_id)) {
      new_bns_data = new_bns_data.filter(
        (items) => items.domain_id !== item.domain_id
      );
      toast.success("Domain Removed to Add to Cart Successfully");
    }

    setCartItems(newBnsObj);
    dispatch(bnsRemoveFromCartSuccess(new_bns_data));
  };

  {
    console.log(bns_cart_data, "bns_cart_dataffsdfsfsfsdfsfsdf");
  }

  return (
    <>
      {bns_cart_data?.length > 0 ? (
        <>
          {bns_cart_data?.map((list, i) => (
            <article
              className={`${style["domain-card-box"]} ${style[className]} ${
                i + 1
              }i`}
              key={`list-${i}`}
            >
              <div className={`${style["left-box"]}`}>
                <Image
                  src={web3Decent.src}
                  className={`${style["domain-img"]}`}
                  height={50}
                  width={50}
                />
                <h4 className={`${style["domain-name"]}`}>
                  <span className={`${style["name"]}`}>
                    {list?.domain}.{list?.domain_tld}
                  </span>
                  {availability && (
                    <span className={`${style["pill"]} ${style[availability]}`}>
                      {availability}
                    </span>
                  )}
                </h4>
              </div>
              <div className={`${style["right-box"]}`}>
                <h5 className={`${style["price"]}`}>
                  {currencyFormat(list?.domain_price, "USD")}
                  <span className={`${style["expire-year"]}`}>
                    {/* / <i>1 year</i> 3 years */}
                  </span>
                </h5>
                <div
                  className={`${style["icon-box"]}`}
                  onClick={() => {
                    handleAddToCartRemoved({
                      domain_id: list?.domain_id,
                    });
                  }}
                >
                  {deleteCard === "true" ? (
                    <BsTrash className={`${style["delete-icon"]}`} />
                  ) : checkedDomain === "false" ? (
                    <BsPlusCircleFill className={`${style["add-icon"]}`} />
                  ) : (
                    <BsFillCheckCircleFill
                      className={`${style["checked-icon"]} `}
                    />
                  )}
                </div>
              </div>
            </article>
          ))}
        </>
      ) : (
        "Find your perfect domain by typing into the search field above."
      )}
    </>
  );
};

export default DomainAddToCardList;
