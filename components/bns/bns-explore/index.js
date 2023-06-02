import { HiCheckCircle, HiOutlineSearch } from "react-icons/hi";
import style from "./style.module.scss";
import { RiCheckboxMultipleBlankFill } from "react-icons/ri";
import { BsFillCartPlusFill, BsPlusCircleFill } from "react-icons/bs";
import DomainCard from "../domain-card";
import { useEffect, useState } from "react";
import useWindowUtils from "../../../hooks/useWindowUtils";
import InputText from "../../input-text";
import { currencyFormat, validateName } from "../../../utils/common";
import {
  lootDomainFilterApi,
  lootDomainSlugApi,
  lootDomainSearchApi,
} from "../../../utils/methods";
import { toast } from "react-toastify";
import DomainSuggestedCard from "../domain-suggested-card";

import { useRouter } from "next/router";
import { bns_add_to_cart_thunk } from "../../../redux/thunk/bns_cart_thunk";
import { useDispatch, useSelector } from "react-redux";
import { Nav } from "react-bootstrap";
import { isUserLoggedIn } from "../../../redux/reducers/user_reducer";
import { MODAL_TYPES } from "../common";
import LoginWithPassword from "../../loot-box-section/login-with-password";
import LoginWithOtp from "../../loot-box-section/login-with-otp";
import LoginWithGoogleOtp from "../../loot-box-section/google-otp";
import VerifyOtp from "../../loot-box-section/verify-otp";
import ForgotPassword from "../../loot-box-section/forgot-password";
import Register from "../../loot-box-section/register";
import DomainBuy from "../../loot-box-section/domain-buy";

const BnsExplore = () => {
  const loginStatus = useSelector(isUserLoggedIn);

  const [cartSidebarBtn, setCartSidebarBtn] = useState(false);
  const window = useWindowUtils();
  const { width: innerWidth } = window;
  const [loading, setLoading] = useState(false);
  const [domainList, setDomainList] = useState();
  const [domainSlug, setDomainSlug] = useState();
  const [domainSuggestionsList, setDomainSuggestionsList] = useState();
  const [domainChangeList, setDomainChangeList] = useState();
  const [selectedOption, setSelectedOption] = useState();
  const { bns_cart_data } = useSelector((state) => state.bns_cart);
  const [modalType, setModalType] = useState("");
  const [modalState, setModalState] = useState({});
  const [domainValue, setDomainValue] = useState(1);

  const router = useRouter();

  const ENABLE_REWARD_BUY = true;

  const { searchTerm } = router.query;
  const [domain, setDomain] = useState({
    keyword: "",
  });

  const [error, setError] = useState(false);

  const [validation, setValidation] = useState({
    keyword: false,
    valid_keyword: false,
  });

  useEffect(() => {
    searchTerm && handleSearch(searchTerm);
    handleDomainSlug();
  }, [searchTerm]);

  const handleDomainSlug = async () => {
    try {
      const result = await lootDomainSlugApi();
      setDomainSlug(result?.data.data.domain_extensions);
    } catch (error) {
      console.log(error, "error");
      if (error?.data?.status === 422) {
        console.log(error);
      }
    }
  };

  const handleOptionChange = async (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    let DomainSlugData = domainSlug.find((e) => e.tld == value);
    if (value === "All") {
      handleSearch(domain?.keyword);
    } else {
      try {
        setLoading(true);
        let apiInput = { ...domain };

        apiInput = apiInput?.keyword;

        const result = await lootDomainFilterApi({
          domain_name: apiInput,
          domain_extension_slug: DomainSlugData?.slug,
        });

        setDomainList(result.data.data.domains);
        setDomainSuggestionsList(result.data.data.suggestions);
        setDomainChangeList(result.data.data.domains[0]);
      } catch (error) {
        setLoading(false);
        if (error?.data?.status === 422) {
          toast.error(error?.data?.message);
        }
        console.log(
          "🚀 ~ file: index.js ~ line 42 ~ handleSearchDomain ~ error",
          error
        );
      }
    }
  };

  const handleSearch = async (searchTerm) => {
    try {
      const result = await lootDomainSearchApi({
        domain_name: searchTerm,
      });
      setDomain({ ...domain, keyword: searchTerm });
      setDomainList(result.data.data.domains);
      setDomainSuggestionsList(result.data.data.suggestions);
      setDomainChangeList(result.data.data.domains[0]);
      if (result.data.success) {
        toast.success("Domain Listed");
      }
    } catch (error) {
      console.log(error, "error");
      if (error?.data?.status === 422) {
        console.log(error);
      }
    }
  };

  const checkValidation = () => {
    let c_validation = { ...validation };

    if (!domain.keyword) {
      c_validation = { ...c_validation, keyword: true };
    } else {
      if (validateName(domain.keyword)) {
        c_validation = { ...c_validation, valid_keyword: false };
      } else {
        c_validation = { ...c_validation, valid_keyword: true };
      }
    }

    setValidation(c_validation);
    if (!c_validation.keyword && !c_validation.valid_keyword) {
      return true;
    } else {
      return false;
    }
  };

  // const handleDomain = async (domain_name) => {
  //   if (domain_name > 3) {
  //     try {
  //       const result = await lootDomainSearchApi({
  //         slug: bnsDomainSlug,
  //         domain_name: domain_name,
  //       });
  //       console.log(result, "resulteeeee");
  //       // setPaymentApproxUsd(result?.data?.data);
  //     } catch (error) {
  //       console.log("resultwww");

  //       setLoading(false);
  //       console.log(
  //         "🚀 ~ file: index.js ~ line 45 ~ lootDomainSearchApi ~ error",
  //         error
  //       );
  //     }
  //   }
  // };

  const handleSearchDomain = async (e) => {
    if (domain?.keyword?.length >= 3) {
      if (checkValidation()) {
        try {
          setLoading(true);
          let apiInput = { ...domain };

          apiInput = apiInput?.keyword;

          // console.log(searchTerm, "searchTermsubmit");

          const result = await lootDomainSearchApi({
            domain_name: apiInput,
          });

          setDomainList(result.data.data.domains);
          setDomainSuggestionsList(result.data.data.suggestions);
          setDomainChangeList(result.data.data.domains[0]);
          if (result.status === 200) {
            toast.success("Domain Listed");
          }
        } catch (error) {
          setLoading(false);
          if (error?.data?.status === 422) {
            toast.error(error?.data?.message);
          }
          console.log(
            "🚀 ~ file: index.js ~ line 42 ~ handleSearchDomain ~ error",
            error
          );
        }
      }
    } else {
      setError(true);
    }
  };

  const handleDomainChange = (list) => {
    setDomainChangeList(list);
  };

  const handleDomainDrop = (bns_cart_data) => {
    if (loginStatus) {
      setDomainValue(bns_cart_data);
      toggleModal(MODAL_TYPES.PREBOOK, {
        loot: { ...bns_cart_data },
      });
    } else toggleModal(MODAL_TYPES.LOGIN_WITH_OTP);
  };

  const toggleModal = (modalType = "", modalState = {}) => {
    setModalType(modalType);
    setModalState(modalState);
  };

  return (
    <>
      <section className={style["bns-explorer-section"]}>
        <div className={"container-fluid"}>
          <div className={"row"}>
            <div className={"col-12"}>
              <div className={`${style["search-block"]}`}>
                <div className={`${style["input-group"]} input-group`}>
                  {/* <input
                    type="text"
                    className={`${style["form-control"]} form-control`}
                    placeholder="Enter your web3 domain name to prebook"
                  /> */}
                  <input
                    type="text"
                    title={"Search Web3 Domain Name"}
                    value={domain?.keyword}
                    required={validation.keyword}
                    grpClassName={`mb-0`}
                    className={`${style["form-control"]} form-control`}
                    placeholder=" Search Web3 Domain Name "
                    maxLength="11"
                    // onKeyPress={(e) => {
                    //   console.log(e.keyCode, "eveng");
                    //   if (e.keyCode) {
                    //     return null;
                    //   }
                    // }}

                    onChange={(e) => {
                      if (e?.target?.value) {
                        if (validateName(e.target.value)) {
                          setDomain({
                            ...domain,
                            keyword: e?.target?.value.trim(),
                          });

                          if (e?.target?.value) {
                            setValidation({
                              ...validation,
                              keyword: false,
                            });
                          } else {
                            setValidation({
                              ...validation,
                              keyword: true,
                            });
                          }
                        }
                      } else {
                        setDomain({
                          ...domain,
                          keyword: "",
                        });
                        // handleDomain("");
                      }
                    }}
                  />

                  <button
                    className={`${style["input-group-text"]}  input-group-text `}
                    // onClick={handleSearchDomain}
                    onClick={(e) => handleSearchDomain("", "text_search")}
                  >
                    <HiOutlineSearch />
                  </button>
                </div>

                {error && (
                  <div
                    className={`${style["input-group"]} ${style["error-msg"]} input-group `}
                  >
                    <h6 className="text-danger">
                      (Required Minimum 3 letters)
                    </h6>
                  </div>
                )}
                {domainList?.length > 0 && (
                  <div className={`${style["domainlist-block"]}`}>
                    <h4 className={`${style["domain-search-list-title"]}`}>
                      {` Findings for “your domain name" `}
                    </h4>
                    <ul className={`${style["domainlist"]}`}>
                      {domainList?.map((list, i) => (
                        <li className={`${style["active"]}`} key={`list-${i}`}>
                          <div className={`${style["domain-info"]}`}>
                            <h6 className={`${style["title"]}`}>{list?.tld}</h6>
                            <h6 className={`${style["domain-price"]}`}>
                              <span
                                className={`${style["value"]}`}
                                onClick={() => handleDomainChange(list)}
                              >
                                {" "}
                                <HiCheckCircle
                                  className={`${style["checked"]}`}
                                />{" "}
                                {currencyFormat(list?.price, "USD")}
                              </span>
                            </h6>
                          </div>
                        </li>
                      ))}
                    </ul>

                    {/* <div className={`${style["addallblock"]}`}>
                    <div className={`${style["left-block"]}`}>
                      <div className={`${style["icon-block"]}`}>
                        <RiCheckboxMultipleBlankFill />
                      </div>
                      <div className={`${style["content-block"]}`}>
                        <h5>More domains, more control. Own them all today.</h5>
                        <h6>( .gpt + .ind + .usa + .identites + .zk )</h6>
                      </div>
                    </div>
                    <div className={`${style["right-block"]}`}>
                      <div className={`${style["price-block"]}`}>
                        <h5>$200.00</h5>
                        <h6>$240.00</h6>
                      </div>
                      <div className={`${style["button-block"]}`}>
                        <button className={`btn ${style["secondary-btn"]}`}>
                          <BsPlusCircleFill /> Add all
                        </button>
                      </div>
                    </div>
                  </div> */}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={"container-fluid"}>
          <div className={"row"}>
            <div className={"col-12"}>
              {innerWidth < 992 && (
                <span
                  className={`${style["backdrop-cartcard"]} ${
                    style[cartSidebarBtn && "open"]
                  }`}
                  onClick={() => {
                    setCartSidebarBtn(!cartSidebarBtn);
                  }}
                ></span>
              )}
              <div className={`${style["domain-list-section"]}`}>
                <div className={`${style["domain-list-block"]}`}>
                  {domainList?.length > 0 ? (
                    <>
                      <DomainCard
                        className={"current-domain-box"}
                        availability="available"
                        checkedDomain={"true"}
                        domainChangeList={domainChangeList}
                      />
                      <div className={`${style["sub-domain-block"]}`}>
                        <div className={`${style["sub-domain-header"]}`}>
                          <div className={`${style["title-box"]}`}>
                            <h4>Suggested names</h4>
                            <p>
                              Add all the suggested domain names to purchase
                            </p>
                          </div>
                          <div className={`${style["select-box"]}`}>
                            <select
                              value={selectedOption}
                              onChange={handleOptionChange}
                              className={`${style["theme-select"]}`}
                            >
                              <option>All</option>
                              {domainSlug?.map((option) => (
                                <option key={option.id} value={option.tld}>
                                  {option.tld}
                                </option>
                              ))}
                            </select>
                            {innerWidth < 992 && (
                              <span
                                className={`${style["open-cart-btn"]}`}
                                onClick={() => {
                                  setCartSidebarBtn(!cartSidebarBtn);
                                }}
                              >
                                <BsFillCartPlusFill /> &nbsp;{" "}
                                {bns_cart_data?.length}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className={`${style["sub-domain-list"]}`}>
                          <ul>
                            <li>
                              {" "}
                              <DomainSuggestedCard
                                className={"sub-domain-box"}
                                domainSuggestionsList={domainSuggestionsList}
                              />{" "}
                            </li>
                            {/* <li>
                          {" "}
                          <DomainSuggestedCard
                            className={"sub-domain-box"}
                            checkedDomain={"true"}
                          />{" "}
                        </li> */}
                          </ul>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className={`${style["search-empty-block"]}`}>
                        <HiOutlineSearch />
                        <h5>
                          Find your perfect domain by typing into the search
                          field above.
                        </h5>
                      </div>
                    </>
                  )}
                </div>
                <div
                  className={`${style["domain-cart-block"]} ${
                    style[cartSidebarBtn && "open"]
                  }`}
                >
                  <div className={`${style["domain-cart-box"]}`}>
                    <h3>{bns_cart_data?.length} items added in your cart</h3>
                    {/* <a
                      className={`${style["cart-btn"]} btn`}
                      href={`bns/cart-summary`}
                    >
                      Continue to Buy
                    </a> */}

                    <button
                      className={`${style["cart-btn"]} btn`}
                      onClick={() => handleDomainDrop(bns_cart_data)}
                      disabled={bns_cart_data?.length < 1}
                    >
                      {loginStatus ? "Continue to Buy" : "Singin/up"}
                    </button>
                    <p className={`${style["hint"]}`}>
                      The final price will be calculated in the cart, to account
                      for possible discounts and credits.
                    </p>
                  </div>
                  <div className={`${style["domain-cart-info-list"]}`}>
                    <ul>
                      <li>
                        <div className={`${style["info-box"]}`}>
                          <div className={`${style["img-box"]}`}>&nbsp;</div>
                          <div className={`${style["content-box"]}`}>
                            <p>
                              All domain purchases are a one-time payment. BNS
                              have no renewal fees.
                            </p>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className={`${style["info-box"]}`}>
                          <div className={`${style["img-box"]}`}>
                            <BsFillCartPlusFill />
                          </div>
                          <div className={`${style["content-box"]}`}>
                            <p>
                              Adding a domain to cart does not prevent others
                              from buying that domain.
                            </p>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {modalType === MODAL_TYPES.LOGIN_WITH_PASSWORD && (
          <LoginWithPassword
            show={modalType === MODAL_TYPES.LOGIN_WITH_PASSWORD}
            toggleModal={toggleModal}
            modalState={modalState}
          />
        )}
        {modalType === MODAL_TYPES.LOGIN_WITH_OTP && (
          <LoginWithOtp
            show={modalType === MODAL_TYPES.LOGIN_WITH_OTP}
            toggleModal={toggleModal}
            modalState={modalState}
          />
        )}
        {modalType === MODAL_TYPES.VERIFY_GOOGLE_OTP && (
          <LoginWithGoogleOtp
            show={modalType === MODAL_TYPES.VERIFY_GOOGLE_OTP}
            toggleModal={toggleModal}
            modalState={modalState}
          />
        )}
        {modalType === MODAL_TYPES.VERIFY_OTP && (
          <VerifyOtp
            show={modalType === MODAL_TYPES.VERIFY_OTP}
            toggleModal={toggleModal}
            modalState={modalState}
          />
        )}
        {modalType === MODAL_TYPES.FORGOT_PASSWORD && (
          <ForgotPassword
            show={modalType === MODAL_TYPES.FORGOT_PASSWORD}
            toggleModal={toggleModal}
            modalState={modalState}
          />
        )}
        {modalType === MODAL_TYPES.REGISTER && (
          <Register
            show={modalType === MODAL_TYPES.REGISTER}
            toggleModal={toggleModal}
            modalState={modalState}
          />
        )}
        {modalType === MODAL_TYPES.PREBOOK && (
          <>
            {ENABLE_REWARD_BUY && (
              <DomainBuy
                show={modalType === MODAL_TYPES.PREBOOK}
                toggleModal={toggleModal}
                modalState={modalState}
                // onReload={buySuccess}
                // slug={process.env.NEXT_PUBLIC_BNS_DOMAIN_SLUG}
                quantityPerOrder={domainValue}
              />
            )}
          </>
        )}
      </section>
    </>
  );
};

export default BnsExplore;
