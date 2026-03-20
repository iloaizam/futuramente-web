import React from 'react';

export default function GradientText({
  children,
  className = "",
  colors = ["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"],
  animationSpeed = 8,
  showBorder = false,
}) {
  const gradient = `linear-gradient(to right, ${colors.join(", ")})`;
  const animationDuration = `${animationSpeed}s`;

  return (
    <div className={`gradient-text ${className}`}>
      {showBorder && (
        <div
          className="gradient-overlay"
          style={{
            backgroundImage: gradient,
            animationDuration,
          }}
        />
      )}
      <div
        className="text-content"
        style={{
          backgroundImage: gradient,
          animationDuration,
        }}
      >
        {children}
      </div>
      <style>{`
        .gradient-text {
          position: relative;
          display: inline-block;
        }
        .gradient-overlay {
          position: absolute;
          inset: -2px;
          border-radius: 4px;
          z-index: -1;
          background-size: 300% 100%;
          animation: gradient-animation linear infinite;
        }
        .text-content {
          background-size: 300% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: gradient-animation linear infinite;
        }
        @keyframes gradient-animation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}