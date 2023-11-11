import React from "react";

const Footer = () => {
  return (
    <footer class="bg-gray-900 text-white px-12 py-10">
      <div class="container mx-auto">
        <div class="flex flex-col md:flex-row md:justify-between">
          <div class="mb-4 md:mb-0">
            <h2 class="text-2xl font-semibold">kaban Projects</h2>
            <p class="text-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae, fuga.</p></div>

          <div class="mb-4 md:mb-0">
            <h3 class="text-lg font-semibold">Quick Links</h3>
            <ul class="mt-2">
              <li><a href="#" class="text-gray-400 hover:text-white transition">Home</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition">About</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition">Services</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 class="text-lg font-semibold">Contact Us</h3>
            <address class="mt-2">
              <p class="text-gray-400">123 Main Street</p>
              <p class="text-gray-400">City, Country</p>
              <p class="text-gray-400">Email: info@example.com</p>
              <p class="text-gray-400">Phone: +1 (123) 456-7890</p>
            </address>
          </div>
        </div>

        <div class="mt-8 text-center text-sm">
          &copy; 2023 Company Name. All rights reserved.
        </div>
      </div>
    </footer>

  );
};

export default Footer;


