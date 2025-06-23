import { FaBullseye, FaChartLine, FaUsers, FaAward } from "react-icons/fa";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50">
    
      <section className="bg-indigo-600  text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Story</h1>
          <p className="text-xl max-w-3xl mx-auto">
            From a small idea to a successful enterprise - our journey of innovation
          </p>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Who We Are</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2010, we are a technology company committed to delivering innovative solutions. 
              Our team consists of 50+ talented professionals dedicated to excellence.
            </p>
            <p className="text-gray-600 mb-4">
              We focus on quality and reliability to deliver outstanding products. Customer satisfaction 
              is our top priority in everything we do.
            </p>
            <div className="flex space-x-4 mt-8">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition">
                Join Our Team
              </button>
              <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-md hover:bg-blue-50 transition">
                Our Services
              </button>
            </div>
          </div>   
        </div>
      </section>

      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Achievements</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <FaUsers className="text-blue-600 text-4xl mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-900">500+</h3>
              <p className="text-gray-600">Happy Clients</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <FaChartLine className="text-blue-600 text-4xl mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-900">120%</h3>
              <p className="text-gray-600">Annual Growth</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <FaAward className="text-blue-600 text-4xl mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-900">25+</h3>
              <p className="text-gray-600">Awards Won</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <FaBullseye className="text-blue-600 text-4xl mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-900">99%</h3>
              <p className="text-gray-600">Success Rate</p>
            </div>
          </div>
        </div>
      </section>

     
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-blue-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-blue-700 mb-4">Our Mission</h3>
            <p className="text-gray-700">
              To simplify lives through technology. We focus on innovation and creativity 
              to build products that make a real difference in people lives and businesses.
            </p>
          </div>
          <div className="bg-gray-800 text-white p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
            <p className="text-gray-300">
              To be among India s top 10 tech companies by 2025. We aim to create an 
              ecosystem where everyone can benefit from technology advancements.
            </p>
          </div>
        </div>
      </section>

    
      {/* <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <TeamMemberCard 
              name="Rahul Sharma" 
              position="Founder & CEO" 
              image="/team1.jpg"
              social={{ linkedin: "#", twitter: "#" }}
            />
            <TeamMemberCard 
              name="Priya Patel" 
              position="Marketing Head" 
              image="/team2.jpg"
              social={{ linkedin: "#", twitter: "#" }}
            />
            <TeamMemberCard 
              name="Amit Singh" 
              position="Technical Director" 
              image="/team3.jpg"
              social={{ linkedin: "#", twitter: "#" }}
            />
            <TeamMemberCard 
              name="Neeta Gupta" 
              position="Customer Service Lead" 
              image="/team4.jpg"
              social={{ linkedin: "#", twitter: "#" }}
            />
          </div>
        </div>
      </section> */}

  
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.position}</p>
                </div>
              </div>
              <p className="text-gray-700">{testimonial.quote}</p>
              <div className="flex mt-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

const testimonials = [
  {
    name: "Rajiv Mehta",
    position: "CEO, TechSolutions Inc.",
    quote: "This company transformed our business operations completely. Their solutions increased our efficiency by 40%.",
    avatar: "/client1.jpg"
  },
  {
    name: "Sanjana Kapoor",
    position: "Director, Digital Innovations",
    quote: "Exceptional service and support. They understand our needs and deliver beyond expectations.",
    avatar: "/client2.jpg"
  },
  {
    name: "Vikram Joshi",
    position: "CTO, FutureTech",
    quote: "The team's technical expertise and innovative approach helped us solve complex challenges.",
    avatar: "/client3.jpg"
  }
];