import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
     
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">Find Your <span className="text-indigo-600">Dream Job</span> Today</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">Join thousands of professionals who found their perfect career match with us.</p>
        <div className="flex justify-center gap-4">
          <Link href="/jobs" className="bg-indigo-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-indigo-700">Browse Jobs</Link>
          <Link href="/signup" className="bg-white text-indigo-600 border border-indigo-600 px-6 py-3 rounded-md text-lg font-medium hover:bg-indigo-50">Get Started</Link>
        </div>
      </div>

   
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "1000+ Jobs", desc: "Updated daily with new opportunities", icon: "💼" },
              { title: "Easy Apply", desc: "One-click applications for faster results", icon: "⚡" },
              { title: "Career Growth", desc: "Find roles that match your skills", icon: "📈" },
            ].map((feature, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

     
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>© {new Date().getFullYear()} JobPortal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}