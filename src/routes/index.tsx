import { createFileRoute } from "@tanstack/react-router";
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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CyberAware — Stay Safe Online" },
      { name: "description", content: "Detect phishing in seconds, learn cybersecurity essentials, and chat with an AI security assistant." },
      { property: "og:title", content: "CyberAware — Stay Safe Online" },
      { property: "og:description", content: "Modern cybersecurity awareness with a working phishing detector and AI guidance." },
    ],
  }),
  component: Index,
});

function Index() {
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
