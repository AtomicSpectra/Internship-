'use client';

import React from 'react';
import Footer from '@/components/Footer';
import NavBar2 from '@/components/NavBar2';

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar2 />
      <div className="flex flex-1 pt-20">
        <div className="flex-1 p-8 pb-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h1 className="text-5xl font-bold text-gray-900 mb-4 relative inline-block">
                About Us
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1.5 bg-pink-500 rounded-full"></div>
              </h1>
              <h2 className="text-3xl font-semibold text-gray-800 mt-12 mb-6">Techoctanet Services Pvt. Ltd.</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                We are a team of passionate developers working together to create innovative solutions that help students
                achieve their academic goals and prepare for competitive exams.
              </p>
            </div>

            <div className="mt-16 bg-white rounded-xl shadow-lg p-12 mb-24 transform hover:shadow-xl transition-shadow duration-300 border border-gray-100 max-w-3xl mx-auto">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 relative inline-block">
                Our Mission
                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-pink-500 rounded-full"></div>
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                At PrepMitra, we&apos;re dedicated to revolutionizing exam preparation through technology. Our platform
                combines cutting-edge tools with comprehensive study materials to help students achieve their academic
                goals efficiently and effectively.
              </p>
            </div>

            {/* Development Team Section aligned with landing page */}
            <section className="py-12 bg-gradient-to-b from-white to-blue-50/40 rounded-2xl">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative rounded-2xl bg-white/80 backdrop-blur border border-blue-100 shadow-lg p-8 md:p-12">
                  <div className="absolute -top-4 left-6 h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-pink-500 shadow-md" />
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">Development Team</h2>
                  <div className="mt-3 flex justify-center">
                    <span className="h-1 w-24 rounded-full bg-gradient-to-r from-blue-500 to-pink-500" />
                  </div>
                  <div className="mt-8">
                    <p className="text-lg md:text-xl leading-8 text-gray-700 max-w-4xl mx-auto text-center">
                      The development team at <span className="font-semibold text-gray-900">Techoctanet Services Pvt. Ltd.</span> comprised a group of
                      skilled and collaborative professionals dedicated to building efficient and scalable web solutions. The team
                      included frontend developers, backend engineers, UI/UX designers, and project coordinators who worked closely
                      to ensure seamless integration between design and functionality. Regular discussions, code reviews, and sprint
                      meetings fostered an agile workflow, enabling quick problem-solving and continuous improvement. Each member
                      contributed unique technical expertise, from optimizing database performance to refining user interfaces,
                      resulting in a cohesive and well-structured product development process focused on innovation and user
                      satisfaction.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <Footer />
      </div>
    </div>
  );
}
 