export default function FeaturesSection() {
    const features = [
      {
        icon: '📊',
        title: 'Attendance Tracking',
        description: 'Easily track and manage student attendance with our intuitive system.'
      },
      {
        icon: '📝',
        title: 'Grade Management',
        description: 'Record and analyze student grades with comprehensive reporting tools.'
      },
      {
        icon: '📅',
        title: 'Timetable Scheduling',
        description: 'Create and manage class schedules with drag-and-drop functionality.'
      },
      {
        icon: '💬',
        title: 'Communication',
        description: 'Seamless communication between teachers, students, and parents.'
      }
    ];
  
    return (
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition duration-300">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }