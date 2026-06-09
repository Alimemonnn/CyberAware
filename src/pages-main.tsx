import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import { Header } from "@/components/cyber/Header";
import { Hero } from "@/components/cyber/Hero";
import { Stats } from "@/components/cyber/Stats";
import { Awareness } from "@/components/cyber/Awareness";
import { Detector } from "@/components/cyber/Detector";
import { Chatbot } from "@/components/cyber/Chatbot";
import { Videos } from "@/components/cyber/Videos";
import { Contact } from "@/components/cyber/Contact";
import { Footer } from "@/components/cyber/Footer";
import { ScrollProgress } from "@/components/cyber/ScrollProgress";

function App() {
  return (
    <div className="min-h-screen">
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <Stats />
        <Awareness />
        <Detector />
        <Chatbot />
        <Videos />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
