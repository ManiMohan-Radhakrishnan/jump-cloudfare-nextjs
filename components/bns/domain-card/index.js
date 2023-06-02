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
import { useDispatch, useSelector } from "react-redux";
import { bns_add_to_cart_thunk } from "../../../redux/thunk/bns_cart_thunk";
import { bnsAddToCartSuccess } from "../../../redux/reducers/bns_cart_reducer";
import { toast } from "react-toastify";
const DomainCard = ({
  className,
  availability = "",
  checkedDomain = "false",
  deleteCard = "false",
  domainChangeList,
}) => {
  const [cartItems, setCartItems] = useState([]);

  const data = useSelector((state) => state);
  const { bns_cart_data } = useSelector((state) => state.bns_cart);
  const dispatch = useDispatch();

  const [domainAddSuccess, setDomainAddSuccess] = useState(false);

  const handleAddToCart = (item) => {
    let newBnsObj = [
      ...cartItems,
      {
        domain_id: item?.domain_id,
        name: item?.name,
        domain_tld: item?.domain_tld,
        domain_price: item?.domain_price,
        domain_extension_slug: item?.domain_extension_slug,
      },
    ];

    setCartItems(newBnsObj);
    dispatch(
      bnsAddToCartSuccess({
        domain_id: item?.domain_id,
        name: item?.name,
        domain_tld: item?.domain_tld,
        domain_price: item?.domain_price,
        domain_extension_slug: item?.domain_extension_slug,
      })
    );
    setDomainAddSuccess(true);
    toast.success("Domain Add to Cart Successfully");
  };

  return (
    <>
      {domainChangeList ? (
        <article className={`${style["domain-card-box"]} ${style[className]}`}>
          <div className={`${style["left-box"]}`}>
            <Image
              src={web3Decent.src}
              className={`${style["domain-img"]}`}
              height={50}
              width={50}
            />
            <h4 className={`${style["domain-name"]}`}>
              <span className={`${style["name"]}`}>
                {domainChangeList?.domain}.{domainChangeList?.tld}
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
              {currencyFormat(domainChangeList?.price, "USD")}
              <span className={`${style["expire-year"]}`}>
                {/* / <i>1 year</i> 3 years */}
              </span>
            </h5>
            <div className={`${style["icon-box"]}`}>
              {domainAddSuccess ? (
                <BsFillCheckCircleFill
                  className={`${style["add-icon"]}`}
                  disabled={true}
                />
              ) : (
                <BsFillCheckCircleFill
                  className={`${style["checked-icon"]} `}
                  onClick={() => {
                    handleAddToCart({
                      domain_id: 0,
                      name: domainChangeList?.domain,
                      domain_tld: domainChangeList?.tld,
                      domain_price: domainChangeList?.price,
                      domain_extension_slug:
                        domainChangeList?.domain_extension_slug,
                    });
                  }}
                />
              )}
            </div>
          </div>
        </article>
      ) : (
        // <span>
        //   <HiOutlineSearch />

        // </span>
        "Find your perfect domain by typing into the search field above."
      )}
    </>
  );
};

export default DomainCard;
