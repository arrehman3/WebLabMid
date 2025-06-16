export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to Secure Nest</h1>
        <p className="text-gray-600 text-lg">
          Manage your residents and visitor logs securely.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="text-blue-600 text-2xl mb-4">🏠</div>
          <h2 className="text-xl font-semibold mb-2">Resident Management</h2>
          <p className="text-gray-600">
            Efficiently manage resident information, units, and documentation.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="text-green-600 text-2xl mb-4">👥</div>
          <h2 className="text-xl font-semibold mb-2">Visitor Tracking</h2>
          <p className="text-gray-600">
            Keep track of visitors and maintain secure access logs.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="text-purple-600 text-2xl mb-4">🔒</div>
          <h2 className="text-xl font-semibold mb-2">Security First</h2>
          <p className="text-gray-600">
            Enhanced security features to protect resident information.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-blue-50 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
        <p className="text-gray-600 mb-6">
          Join us in making residential management more efficient and secure.
        </p>
        <button className="cta-button bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
          Get Started
        </button>
      </div>
    </div>
  );
}
