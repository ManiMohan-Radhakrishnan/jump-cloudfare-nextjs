import Image from "next/future/image";
import Link from "next/link";
import { Navbar } from "react-bootstrap";

import AppHelmet from "../components/helmet/index";
import images from "../utils/images.json";

const NotFound = () => {
  return (
    <>
      <AppHelmet title="" description="" image="" hideCanonical />
      <section className="notfound-section">
        <div className="container">
          <div
            className="row align-items-center justify-content-center"
            style={{
              minHeight: "calc(100vh - 10rem)",
            }}
          >
            <center>
              <Navbar.Brand
                onClick={() =>
                  window.open(process.env.NEXT_PUBLIC_WEBSITE_URL, "_blank")
                }
                role="button"
                className="not-found "
              >
                <Image
                  src={images.jumpTradeLogoSVG}
                  className="logo-img"
                  alt="JumpTradelogo"
                  layout="responsive"
                  width={200}
                  height={200}
                />
              </Navbar.Brand>
              <div className="notfound-text-block">
                <h1>500</h1>
                <h4>Something went wrong. Please try again after sometime.</h4>
                <h5>
                  Go to Marketplace{" "}
                  <Link href={"/"} target="_self" rel="noreferrer">
                    <a>Home</a>
                  </Link>{" "}
                  Page
                </h5>
              </div>
            </center>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
