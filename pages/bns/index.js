import BlockchainAgnostic from "../../components/bns/landing-page/blockchain-agnostic";
import BnsFaq from "../../components/bns/landing-page/bns-faq";
import DomainCompare from "../../components/bns/landing-page/domain-compare";
import DomainEvolution from "../../components/bns/landing-page/domain-evolution";
import HeroSection from "../../components/bns/landing-page/hero-section";
import MultiverseDomain from "../../components/bns/landing-page/multiverse-domain";
import OneIdentity from "../../components/bns/landing-page/one-identity";
import PrebookDomain from "../../components/bns/landing-page/prebook-domain";
import WhitelistingUsers from "../../components/bns/landing-page/whitelisting-users";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { getHideMenuStatus } from "../../redux/reducers/user_reducer";

const BNSlanding = () => {
  const hideMenu = useSelector(getHideMenuStatus);

  return (
    <>
      {!hideMenu && <Header />}
      <Header />
      <HeroSection />
      <PrebookDomain />
      <WhitelistingUsers />
      <MultiverseDomain />
      <BlockchainAgnostic />
      <DomainCompare />
      <OneIdentity />
      <DomainEvolution />
      <BnsFaq />
      {!hideMenu && <Footer />}
    </>
  );
};

export default BNSlanding;
