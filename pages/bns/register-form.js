import RegisterForm from "../../components/bns/register-form/form-section";
import HeroSection from "../../components/bns/register-form/hero-section";
import QuestionsSection from "../../components/bns/register-form/questions";
import Footer from "../../components/footer";
import Header from "../../components/header";

const BnsRegisterForm = () => {
  return (
    <>
      <Header />
      <HeroSection />
      <RegisterForm />
      <QuestionsSection />
      <Footer />
    </>
  );
};

export default BnsRegisterForm;
