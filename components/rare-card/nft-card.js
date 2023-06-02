import Image from "next/future/image";
import Link from "next/link";

import images from "../../utils/images.json";
import { batPower, getRoleInfo } from "../../utils/common";

import style from "./style.module.scss";

const RareCollectionCard = ({
  index,
  nft,
  recentSold = false,
  callbackClick = {},
}) => {
  const roleData = getRoleInfo(
    nft?.core_statistics?.role?.value,
    nft?.core_statistics?.dominant_hand?.value
      ? nft?.core_statistics?.dominant_hand?.value
      : ""
  );
  const batData = batPower(nft?.core_statistics?.twox_power?.value);

  return (
    <article
      onClick={() => callbackClick(index)}
      className={`${style["rare-card"]}`}
    >
      {batData ? (
        <>
          {" "}
          <div className={style["bat-type-2x"]}>
            <Image
              width="600"
              height="600"
              layout="responsive"
              src={batData?.value}
              alt="Player-status"
              loading="lazy"
              className={style["bat-type-2x-img"]}
              placeholder={"blur"}
              blurDataURL={images.sample}
            />
          </div>
        </>
      ) : (
        <>
          {roleData && nft?.core_statistics?.role?.value !== "Shot" ? (
            <>
              <div className={style["player-type"]}>
                <Image
                  width="600"
                  height="600"
                  layout="responsive"
                  src={roleData?.value}
                  alt="Player-status"
                  loading="lazy"
                  className={style["player-type-img"]}
                  placeholder={"blur"}
                  blurDataURL={images.sample}
                />
              </div>
            </>
          ) : (
            <>
              {!["Fusor"].includes(nft?.core_statistics?.role?.value) && (
                <div className={style["player-type"]}>
                  <Image
                    width="600"
                    height="600"
                    layout="responsive"
                    src={images?.shot}
                    alt="Player-status"
                    loading="lazy"
                    className={style["player-type-img"]}
                    placeholder={"blur"}
                    blurDataURL={images.sample}
                  />
                </div>
              )}
            </>
          )}
        </>
      )}

      {/* <Link
        href={(() => {
          if (recentSold) {
            return `/order/details/${nft?.slug}/${nft?.order_slug}`;
          } else {
            // return `/nft-marketplace/details/${nft?.slug}`;
          }
        })()}
      > */}
      <Image
        width="600"
        height="600"
        className={style["nft-card-img"]}
        layout="responsive"
        alt="media logo"
        src={(() => {
          if (nft?.asset_type?.includes("image")) {
            return nft.asset_url ? nft.asset_url : images.sample;
          } else if (nft?.cover_url) {
            return nft.cover_url ? nft.cover_url : images.sample;
          } else {
            return nft.asset_url ? nft.asset_url : images.sample;
          }
        })()}
        role="button"
        priority={true}
        placeholder={"blur"}
        blurDataURL={images.sample}
      />
      {/* </Link> */}
      <div className={style["nft-card-info"]}>
        {nft?.core_statistics?.role?.value !== "Shot" ? (
          <>
            <h5 className={style["rare-nft-title"]}>
              {nft?.name.split("#")[0]}
            </h5>
            <h5 className={style["rare-nft-subtitle"]}>
              #{nft?.name.split("#")[1]}
            </h5>
          </>
        ) : (
          <>
            {" "}
            <h5 className={style["rare-nft-shot-title"]}>{nft?.name}</h5>
          </>
        )}
      </div>
    </article>
  );
};

export default RareCollectionCard;
