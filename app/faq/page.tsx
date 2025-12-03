"use client";
import '../globals.css';
import FAQItem from '../components/FAQItem'; 

export default function FAQPage() {
  const faqData = [
    {
      question: "What is BunBun?",
      answer: "BunBun is a premier all-in-one Discord bot designed to elevate your server with powerful features, intuitive commands, and seamless integration for both fun and utility."
    },
    {
      question: "Is BunBun free to use?",
      answer: "Yes! BunBun offers a robust set of free commands for fun, moderation, and utilities. For advanced features, custom commands, and priority support, check out our Premium tiers."
    },
    {
      question: "Can I use BunBun in Direct Messages (DMs)?",
      answer: "Absolutely. Many of BunBun's commands, including games, AI tools, and utilities, are fully functional in private DMs for a personalized experience."
    },
    {
      question: "How do I add BunBun to my server?",
      answer: "Click the 'Add to Discord' button on our website. You'll be redirected to Discord's authorization page, where you can select the server and permissions."
    },
    {
      question: "What makes BunBun different from other bots?",
      answer: "BunBun combines a vast command library with a focus on user experience, daily updates, a dedicated support team, and powerful, exclusive AI features not found elsewhere."
    },
    {
      question: "Do you have a support server?",
      answer: "Yes! Join our official Discord community for help, updates, suggestions, and to chat with other BunBun users and our development team."
    },
  ];

  return (
    <div className="min-h-screen pt-24 px-6" style={{ background: '#F8B96F', color: '#3a2a13' }}>
      <div className="max-w-4xl mx-auto" style={{ color: '#3a2a13' }}>
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-6" style={{ color: '#3a2a13' }}>
            Frequently Asked
            <span className="block" style={{ color: '#b86b00' }}>Questions</span>
          </h1>
          <p className="text-xl" style={{ color: '#7a4a00' }}>Find answers to common questions about BunBun bot</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {faqData.map((item, index) => (
            <div key={index} className="rounded-2xl shadow-md p-6" style={{ background: '#fffbe9', border: '1px solid #F8B96F88' }}>
              <FAQItem question={item.question} answer={item.answer} />
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 rounded-2xl text-center" style={{ background: '#fffbe9', border: '1px solid #F8B96F88', color: '#3a2a13', boxShadow: '0 2px 16px #f8b96f33' }}>
          <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
          <p className="mb-6" style={{ color: '#7a4a00' }}>Join our Discord community and get help from our team and other users.</p>
          <button className="px-8 py-3 rounded-xl font-medium" style={{ background: '#F8B96F', color: '#3a2a13', boxShadow: '0 2px 8px #f8b96f33' }}>
            Join Support Server
          </button>
        </div>
      </div>
    </div>
  );
}