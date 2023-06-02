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
import { bnsAddToCartSuccess } from "../../../redux/reducers/bns_cart_reducer";
import { toast } from "react-toastify";
import { BiCheck } from "react-icons/bi";
const DomainSuggestedCard = ({
  className,
  availability = "",
  checkedDomain = "false",
  deleteCard = "false",
  domainSuggestionsList,
}) => {
  const [cartItems, setCartItems] = useState([]);

  const data = useSelector((state) => state);
  const { bns_cart_data } = useSelector((state) => state.bns_cart);
  const bns_data = new Set(bns_cart_data.map((item) => item.domain_id));
  const dispatch = useDispatch();
  const [domainCheckBoxSuccess, setDomainCheckBoxSuccess] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleCheckboxChange = (event, tld_slug) => {
    if (event.target.checked) {
      setSelectedItems([...selectedItems, tld_slug]);
      setDomainCheckBoxSuccess(true);

      // } else {
      //   setSelectedItems(selectedItems.filter((id) => id !== tld_slug));
    }
  };

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
    toast.success("Domain Add to Cart Successfully");
  };

  return (
    <>
      {domainSuggestionsList ? (
        <>
          {domainSuggestionsList?.map((list, i) => (
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
                    {list?.domain}.{list?.tld}
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
                  {currencyFormat(list?.price, "USD")}
                  <span className={`${style["expire-year"]}`}>
                    {/* / <i>1 year</i> 3 years */}
                  </span>
                </h5>
                {/* <div
                  className={`${style["icon-box"]}`}
                  onClick={() => {
                    handleAddToCart({
                      domain_id: i + 1,
                      domain: list?.domain,
                      domain_tld: list?.tld,
                      domain_price: list?.price,
                      domain_extension_slug: list?.domain_extension_slug,

                    });
                  }}
                >
                  {!domainAddSuccess ? (
                    <BsPlusCircleFill className={`${style["add-icon"]}`} />
                  ) : (
                    <BsFillCheckCircleFill
                      className={`${style["checked-icon"]} `}
                    />
                  )}
                </div> */}
                <input
                  type="checkbox"
                  id={list?.tld_slug}
                  value={list?.tld_slug}
                  checked={bns_data.has(i + 1)}
                  onChange={(event) =>
                    handleCheckboxChange(event, list?.tld_slug)
                  }
                  onClick={() => {
                    handleAddToCart({
                      domain_id: i + 1,
                      name: list?.domain,
                      domain_tld: list?.tld,
                      domain_price: list?.price,
                      domain_extension_slug: list?.domain_extension_slug,
                    });
                  }}
                  disabled={bns_data.has(i + 1) ? true : false}
                />
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

export default DomainSuggestedCard;
