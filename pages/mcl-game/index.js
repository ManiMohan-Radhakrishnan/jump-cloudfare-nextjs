import Header from "../../components/header";
import Footer from "../../components/footer";
import AppHelmet from "../../components/helmet";
import MclGame from "../../components/mcl-game";

const Blog = () => {
  return (
    <>
      <AppHelmet
        title={"Meta Cricket League | NFT Cricket Game | MCL Game"}
        description={
          "Meta Cricket League is the world's first P2E NFT cricket game. Play & Earn real cash prizes with MCL. Download and Play MCL Game now!"
        }
      />
      <Header bgImage />
      <MclGame />
      <Footer />
    </>
  );
};

export default Blog;
