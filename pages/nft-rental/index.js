import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Footer from "../../components/footer";
import Header from "../../components/header";
import RenatalList from "../../components/rental-list";
import { getHideMenuStatus } from "../../redux/reducers/user_reducer";
import { getRentalBats, getRentalNfts } from "../../utils/base-methods";

const SUPPORTED_NFT_TYPES = ["players", "bats"];

export async function getServerSideProps({ query, resolvedUrl }) {
  let { nftType = "players" } = query;
  let isPlayer = nftType === "players";
  let isBat = nftType === "bats";

  if (!SUPPORTED_NFT_TYPES.includes(nftType)) {
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
    };
  }

  let pageData = [];
  let queryString = resolvedUrl.split("?")[1];

  try {
    let response = {};
    if (isPlayer) {
      response = await getRentalNfts(queryString || "");
      pageData = response?.data?.data?.players || [];
    }
    if (isBat) {
      response = await getRentalBats(queryString || "");
      pageData = response?.data?.data?.bats || [];
    }
  } catch (err) {
    console.log("Error in Fetching NFT List");
  }

  return {
    props: {
      pageData,
    },
  };
}

const Rental = ({ pageData }) => {
  const hideMenu = useSelector(getHideMenuStatus);
  return (
    <>
      {hideMenu ? (
        <></>
      ) : (
        <>
          {" "}
          <div className="loader-container">
            <div className="top-loader"></div>
          </div>
          <Header />
        </>
      )}
      <RenatalList pageData={pageData} />
      {!hideMenu && <Footer />}
    </>
  );
};

export default Rental;
