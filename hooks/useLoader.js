import { useRouter } from "next/router";
import { useEffect } from "react";

const useLoader = () => {
  const router = useRouter();
  useEffect(() => {
    // if (window) {
    //   window.addEventListener("load", () => {
    //     console.log("LOAD");
    //     setTimeout(handleComplete, 3000);
    //   });
    //   window.addEventListener("DOMContentLoaded", () => {
    //     console.log("LOADSTART");
    //     handleStart();
    //   });
    // }
    const handleStart = () => document.body.classList.add("loading-indicator");
    const handleComplete = () =>
      document.body.classList.remove("loading-indicator");

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });
};

export default useLoader;
