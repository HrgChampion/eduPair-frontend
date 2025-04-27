import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300 py-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* About Section */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">EduPair 🚀</h2>
            <p className="text-gray-400 leading-relaxed text-sm">
              EduPair is a peer-driven, skill-exchange learning platform.  
              Built around contribution, not cost — anyone can teach and learn freely. 🌱  
              Our community grows together through flexibility, inclusivity, and shared passion. 🌍
            </p>
          </div>

          {/* Highlights Section */}
          <div className="flex flex-col space-y-3">
            <h2 className="text-lg font-semibold text-white mb-2">Why EduPair?</h2>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>🌟 Skill Exchange Platform</li>
              <li>🤝 Community-Driven Growth</li>
              <li>💸 Zero Cost Learning</li>
              <li>🌍 Inclusive & Flexible Access</li>
              <li>🚀 Adaptive Learning Journeys</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* Bottom */}
        <div className="text-center text-xs text-gray-500">
          © 2025 EduPair. Built with 💙 by Himanshu & Contributors.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
