export default function LandingPage({studentImg}) {
    return (
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Streamline Your <span className="text-green-600">Student Management</span>
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              EduManage provides a comprehensive solution for educational institutions to manage students, staff, and academic processes efficiently.
            </p>
            <div className="flex space-x-4">
              <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300">
                Get Started
              </button>
              <button className="border border-green-600 text-green-600 hover:bg-green-50 font-medium py-2 px-6 rounded-lg transition duration-300">
                Learn More
              </button>
            </div>
          </div>
          <div className="md:w-1/2">
            <img 
              src={studentImg}
              alt="Student illustration" 
              className="w-full h-auto max-w-md mx-auto"
            />
          </div>
        </div>
      </section>
    );
  }