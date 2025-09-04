import { useNavigate } from "react-router";
import { WelcomePanel } from "../components/WelcomePanel";
import { useEffect } from "react";
import {
  HIDE_WELCOME_KEY,
  HIDE_WELCOME_VALUE,
} from "../components/WelcomePanel/WelcomeGetStarted";

export default function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    if (window !== undefined) {
      const welcomeKey = window.localStorage.getItem(HIDE_WELCOME_KEY);
      if (welcomeKey === HIDE_WELCOME_VALUE) {
        navigate("/capital-projects", { replace: true });
      }
    }
  }, [navigate]);
  return <WelcomePanel />;
}
