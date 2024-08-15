const upperMarquee = [
    "/01.svg",
    "/02.svg",
    "/03.svg",
    "/04.svg",
    "/05.svg",
    "/06.svg",
    "/07.svg",
    "/08.svg",
    "/09.svg",
    "/10.svg",
    "/11.svg",
  ];

  const lowerMarquee = [
    "/12.svg",
    "/13.svg",
    "/14.svg",
    "/15.svg",
    "/16.svg",
    "/17.svg",
    "/18.svg",
    "/19.svg",
    "/20.svg",
    "/21.svg",
    "/22.svg",
  ];

  const tags = [
    "Software Engineer",
    "Data Scientist",
    "Product Manager",
    "UX Designer",
    "Marketing Specialist",
    "Financial Analyst",
    "HR Coordinator",
    "Sales Representative",
    "Graphic Designer",
    "Customer Manager",
  ];

  const carouselImages = [
    'page1-images/svg-1.svg',
    'page1-images/svg-2.svg',
    'page1-images/svg-3.svg',
    'page1-images/svg-4.svg',
  ]

  const jobTitles = [
    "Accountant",
    "Actor",
    "Actuary",
    "Advertising Manager",
    "Aerospace Engineer",
    "Agricultural Engineer",
    "Air Traffic Controller",
    "Aircraft Mechanic",
    "Architect",
    "Art Director",
    "Artist",
    "Astronomer",
    "Athletic Trainer",
    "Attorney",
    "Auditor",
    "Author",
    "Baker",
    "Bank Teller",
    "Barber",
    "Bartender",
    "Biochemist",
    "Biologist",
    "Biomedical Engineer",
    "Bookkeeper",
    "Business Analyst",
    "Butcher",
    "Carpenter",
    "Cartographer",
    "Cashier",
    "Chef",
    "Chemical Engineer",
    "Chemist",
    "Chiropractor",
    "Civil Engineer",
    "Clergy",
    "Coach",
    "Computer Programmer",
    "Computer Support Specialist",
    "Construction Manager",
    "Copywriter",
    "Correctional Officer",
    "Cost Estimator",
    "Court Reporter",
    "Customer Service Representative",
    "Data Analyst",
    "Dental Assistant",
    "Dentist",
    "Designer",
    "Dietitian",
    "Doctor",
    "Economist",
    "Editor",
    "Electrician",
    "Elementary School Teacher",
    "Engineer",
    "Environmental Scientist",
    "Event Planner",
    "Executive Assistant",
    "Farmer",
    "Fashion Designer",
    "Film Director",
    "Financial Analyst",
    "Firefighter",
    "Fitness Trainer",
    "Florist",
    "Graphic Designer",
    "Hairdresser",
    "Healthcare Administrator",
    "Human Resources Specialist",
    "Industrial Engineer",
    "Information Security Analyst",
    "Insurance Agent",
    "Interpreter",
    "IT Manager",
    "Journalist",
    "Judge",
    "Lab Technician",
    "Lawyer",
    "Librarian",
    "Logistician",
    "Machinist",
    "Marketing Manager",
    "Massage Therapist",
    "Mechanical Engineer",
    "Medical Assistant",
    "Microbiologist",
    "Nurse",
    "Nutritionist",
    "Occupational Therapist",
    "Office Manager",
    "Optometrist",
    "Painter",
    "Paralegal",
    "Pharmacist",
    "Photographer",
    "Physical Therapist",
    "Pilot",
    "Plumber",
    "Police Officer",
    "Project Manager",
    "Psychologist",
    "Public Relations Specialist",
    "Real Estate Agent",
    "Receptionist",
    "Research Scientist",
    "Sales Manager",
    "Software Developer",
    "Statistician",
    "Surgeon",
    "Teacher",
    "Therapist",
    "Translator",
    "Veterinarian",
    "Web Developer",
    "Writer",
    "Software Engineer",
    "Data Scientist",
    "Product Manager",
    "UX Designer",
    "Marketing Specialist",
    "Financial Analyst",
    "HR Coordinator",
    "Sales Representative",
    "Graphic Designer",
    "Customer Manager",
];

  const jobs = [
    {
      title : 'Software Developer',
      description : 'A software developer is a person concerned with facets of the software development process. Their work includes researching, designing, implementing, and testing software.',
      salary : '$105,000 - $150,000',
      location : 'San Francisco, CA',
      tags : ['Software Engineer', 'Developer', 'Engineer'],
      company : 'Google',
      logo : 'company-logo/google.png',
    },
    {
      title : 'Data Scientist',
      description : 'A data scientist is a professional responsible for collecting, analyzing and interpreting large amounts of data to identify ways to help a business improve operations and gain a competitive edge over rivals.',
      salary : '$95,000 - $130,000',
      location : 'New York, NY',
      tags : ['Data Scientist', 'Analyst', 'Engineer'],
      company : 'Facebook',
      logo : 'company-logo/facebook.png',
    },
    {
      title : 'Product Manager',
      description : 'A product manager is a professional role that is responsible for the development of products for an organization, known as the practice of product management.',
      salary : '$110,000 - $140,000',
      location : 'Seattle, WA',
      tags : ['Product Manager', 'Manager', 'Product'],
      company : 'Amazon',
      logo : 'company-logo/amazon.png',
    },
    {
      title : 'UX Designer',
      description : 'A UX designer is a professional who designs the overall experience of a product or service for the end user. They are concerned with how the product feels and how it is laid out.',
      salary : '$90,000 - $120,000',
      location : 'Los Angeles, CA',
      tags : ['Designer', 'UX', 'Engineer'],
      company : 'Apple',
      logo : 'company-logo/apple.png',
    },
    // {
    //   title : 'Marketing Specialist',
    //   description : 'A marketing specialist is a professional who manages marketing campaigns and promotions to increase sales and improve brand awareness. They are responsible for developing and executing marketing strategies.',
    //   salary : '$80,000 - $110,000',
    //   location : 'Austin, TX',
    //   tags : ['Marketing', 'Specialist', 'Manager'],
    //   company : 'Microsoft',
    //   logo : 'company-logo/microsoft.png',
    // },
    // {
    //   title : 'Financial Analyst',
    //   description : 'A financial analyst is a professional who analyzes financial data to help companies make business decisions. They evaluate investment opportunities, prepare reports, and develop financial models.',
    //   salary : '$70,000 - $100,000',
    //   location : 'Chicago, IL',
    //   tags : ['Financial', 'Analyst', 'Accountant'],
    //   company : 'Tesla',
    //   logo : 'company-logo/tesla.png',
    // },
  ]


  const testimonials = [
    {
      name : 'John Doe',
      title : 'Software Developer',
      company : 'Google',
      image : 'testimonials/01.jpg',
      quote : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
      name : 'Jane Doe',
      title : 'Data Scientist',
      company : 'Facebook',
      image : 'testimonials/02.jpg',
      quote : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
      name : 'Alice Doe',
      title : 'Product Manager',
      company : 'Amazon',
      image : 'testimonials/03.webp',
      quote : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  ]

  const links = [
    {
      name : 'Home',
      url : '/dashboard'
    },
    {
      name : 'Search',
      url : '/dashboard/search'
    },
    {
      name : 'My jobs',
      url : '/dashboard/me'
    },
    {
      name : 'Profile',
      url : '/dashboard/profile'
    },
  ]

  export { upperMarquee, lowerMarquee, tags, carouselImages, jobTitles, jobs, testimonials, links };