"use client";

import { useEffect } from "react";
import Image from "next/image";

export default function Loading() {
  useEffect(() => {
    const timer = setTimeout(() => {
      document.body.classList.add("fade-out");
      setTimeout(() => {
        window.location.href = "/home"; 
      }, 350);
    }, 1800);
    window.addEventListener("contextmenu", (e) => e.preventDefault());

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="wrapper">
        <Image
          src="/bunbun.png"
          alt="bunbun"
          width={170}
          height={170}
          className="logo"
          draggable={false}
        />

        <div className="loader"></div>
      </div>

      <style jsx global>{`
        body {
          background: #F8B96F;
          color: #3a2a13;
          transition: opacity 0.35s ease, transform 0.35s ease;
          user-select: none;
        }

        body.fade-out {
          opacity: 0;
          transform: scale(0.95);
        }
      `}</style>

      <style jsx>{`
        .wrapper {
          height: 100vh;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 70px;
          animation: popIn 0.45s ease forwards;
        }

        @keyframes popIn {
          from {
            opacity: 0;
            transform: scale(0.92);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .logo {
          animation: float 3s ease-in-out infinite;
          user-select: none;
        }
        
        @keyframes float {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
          100% {
            transform: translateY(0);
          }
        }

        .loader {
          width: 90px;
          height: 90px;
          border: 8px solid rgba(255, 255, 255, 0.45);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
}