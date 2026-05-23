import React from 'react';

export const finderMenuItems = [
  { label: 'About This Mac', separator: true },
  { label: 'System Settings...' },
  { label: 'App Store...', separator: true },
  { label: 'Recent Items' },
  { label: 'Force Quit Finder', separator: true },
  { label: 'Sleep' },
  { label: 'Restart...' },
  { label: 'Shut Down...' },
];

export const fileMenuItems = [{ label: 'New Finder Window' }, { label: 'New Folder' }, { label: 'Open' }, { label: 'Close Window' }];
export const editMenuItems = [{ label: 'Undo' }, { label: 'Redo' }, { label: 'Cut' }, { label: 'Copy' }, { label: 'Paste' }];
export const viewMenuItems = [{ label: 'As Icons' }, { label: 'As List' }, { label: 'As Columns' }, { label: 'As Gallery' }];
export const windowMenuItems = [{ label: 'Minimize' }, { label: 'Zoom' }, { label: 'Cycle Through Windows' }];
export const helpMenuItems = [{ label: 'Tips for Your Mac' }, { label: 'macOS Help' }];

export const ProjectCard = ({ name, description, language, languageColor, stars, forks, isFeatured }: any) => (
  <div className={`group relative bg-white/60 hover:bg-white/80 border border-gray-200/50 rounded-2xl p-5 hover:shadow-xl transition-all duration-300 cursor-default flex flex-col h-full ${isFeatured ? 'col-span-2 row-span-1 shadow-md border-blue-200' : ''}`}>
    <div className="flex items-center space-x-4 mb-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-inner ${languageColor || 'bg-gray-100'} bg-opacity-10 text-xl`}>
        {name[0].toUpperCase()}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <h3 className="text-[17px] font-bold text-gray-900 truncate tracking-tight">{name}</h3>
          {isFeatured && <span className="bg-blue-100 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Featured</span>}
        </div>
        <p className="text-[12px] text-gray-500 font-medium truncate opacity-70 italic">{language || 'General Tool'}</p>
      </div>
    </div>
    <p className={`text-[14px] text-gray-600 mb-6 flex-grow leading-relaxed ${isFeatured ? 'line-clamp-2' : 'line-clamp-3'}`}>
      {description}
    </p>
    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100/30">
      <div className="flex items-center space-x-3 text-[12px] text-gray-400 font-semibold">
        {stars !== undefined && (
          <div className="flex items-center hover:text-blue-500 transition-colors">
            <svg className="w-4 h-4 mr-1 fill-yellow-400" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            {stars}
          </div>
        )}
        {forks !== undefined && (
          <div className="flex items-center hover:text-blue-500 transition-colors">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {forks}
          </div>
        )}
      </div>
      <button className="text-[12px] font-bold text-blue-500 hover:text-blue-600 px-4 py-1.5 bg-blue-50 hover:bg-blue-100 rounded-full transition-all active:scale-95 group-hover:shadow-sm">
        View Project
      </button>
    </div>
  </div>
);

export const ProfileWindowContent = ({ isLinkedIn }: { isLinkedIn: boolean }) => (
  <div className="p-8 bg-white/40 rounded-b-xl max-h-[600px] overflow-y-auto custom-scrollbar">
    <div className="mb-6">
      <h1 className="font-serif-italic text-6xl text-gray-900 mb-4 tracking-tight">
        {isLinkedIn ? "HEY, i'm Dheeraj C.!" : "HEY, i'm @tomlin7!"}
      </h1>
      <div className="flex flex-wrap gap-2">
        <p className="font-mono-custom text-[13px] text-gray-500 bg-gray-100/50 inline-block px-3 py-1.5 rounded-md border border-gray-200/50">
          systems & software engineer // systems • compilers • full-stack
        </p>
        {isLinkedIn && (
          <p className="font-mono-custom text-[13px] text-blue-600 bg-blue-50/50 inline-block px-3 py-1.5 rounded-md border border-blue-200/50">
            ranchi, jh • +91-8304981017
          </p>
        )}
      </div>
    </div>
    <hr className="border-t border-gray-300/60 my-6" />
    <ul className="space-y-4 text-[15px] leading-relaxed text-gray-700">
      {isLinkedIn && (
        <li className="flex items-start bg-blue-50/30 p-4 rounded-xl border border-blue-100/50">
          <div className="grid grid-cols-2 gap-6 w-full text-[13px] font-medium">
            <div>
              <span className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1">Email</span>
              <a href="mailto:dheerajcofficial@gmail.com" className="text-blue-600 hover:underline">dheerajcofficial@gmail.com</a>
            </div>
            <div>
              <span className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1">Github</span>
              <a href="https://github.com/tomlin7" className="text-blue-600 hover:underline">github.com/tomlin7</a>
            </div>
            <div>
              <span className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1">LinkedIn</span>
              <a href="https://linkedin.com/in/initdhee" className="text-blue-600 hover:underline">linkedin.com/in/initdhee</a>
            </div>
            <div>
              <span className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1">Education</span>
              <span className="text-gray-900">BIT Mesra • B.Tech CSE (2027)</span>
            </div>
          </div>
        </li>
      )}
      <li className="flex items-start"><span className="text-blue-500 font-bold mr-3 mt-0.5">»</span><span>i'm focused on building things close to the metal and shipping real products.</span></li>
      <li className="flex items-start"><span className="text-blue-500 font-bold mr-3 mt-0.5">»</span><span>i'm currently working on <a href="#" className="text-blue-600 hover:underline font-medium">ted.sh</a></span></li>
      <li className="flex items-start"><span className="text-blue-500 font-bold mr-3 mt-0.5">»</span><span>i work on sophisticated agentic code editors <span className="text-xs text-gray-400">[1]</span> <span className="text-xs text-gray-400">[2]</span> and devtools <span className="text-xs text-gray-400">[3]</span> <span className="text-xs text-gray-400">[4]</span>, game engines <span className="text-xs text-gray-400">[5]</span>, rendering <span className="text-xs text-gray-400">[6]</span>, compilers <span className="text-xs text-gray-400">[7]</span> <span className="text-xs text-gray-400">[8]</span> <span className="text-xs text-gray-400">[9]</span>, games, to scalable backend services and production web apps.</span></li>
      <li className="flex items-start"><span className="text-blue-500 font-bold mr-3 mt-0.5">»</span><span>i care about performance, clean architecture, and understanding how things actually work under the hood.</span></li>
      <li className="flex items-start"><span className="text-blue-500 font-bold mr-3 mt-0.5">»</span><span>occasionally, i log out and pick up a pencil 🎨</span></li>
    </ul>
  </div>
);

export const ExperienceWindowContent = () => {
  const experiences = [
    { title: "Full-Stack Developer Intern", company: "Morvion– ZH, Switzerland (Remote)", period: "Nov 2025– Feb 2026", description: ["Architected and deployed a full-scale CRM from scratch...", "Engineered production-ready SaaS features..."] },
    { title: "Full-Stack Developer Intern", company: "Hooman Digital– India (Remote)", period: "July 2025– Sept 2025", description: ["Architected chartor.ai...", "Standardized internal company infrastructure..."] },
    { title: "Deep Learning Research Intern", company: "NIT Calicut– Calicut, India", period: "May 2025– July 2025", description: ["Developed CNN-Transformer fusion models..."] },
    { title: "Founding Software Engineer Intern", company: "OZi– Gurugram, India (Remote)", period: "Oct 2024– Jan 2025", description: ["Architected the zero-to-one MVP...", "Engineered the foundational full-stack infrastructure..."] }
  ];
  return (
    <div className="flex h-[550px] bg-white rounded-b-xl overflow-hidden">
      <div className="w-[180px] bg-[#EBEBEB]/80 backdrop-blur-xl p-4 flex flex-col border-r border-gray-200/50">
        <div className="space-y-6 flex-1 overflow-y-auto">
          <div><h4 className="text-[11px] font-bold text-gray-500/80 mb-2 px-2 uppercase tracking-tight">Timeline</h4><div className="space-y-1"><button className="w-full text-left px-2 py-1.5 text-[13px] font-medium bg-gray-200/60 rounded-lg flex items-center">💼 Internships</button></div></div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-8 bg-[#FAFAFA]/50 custom-scrollbar">
        <div className="mb-10"><h2 className="text-4xl font-serif-italic mb-2 tracking-tight">Experience</h2></div>
        <div className="space-y-10">{experiences.map((exp, i) => (<div key={i} className="relative pl-6 border-l-2 border-blue-500/20"><div className="absolute left-[-9px] top-1 w-4 h-4 rounded-full bg-blue-500 border-4 border-white shadow-sm" /><h3 className="text-[17px] font-bold text-gray-900 tracking-tight">{exp.title}</h3><p className="text-[14px] font-bold text-blue-600 mb-3">{exp.company}</p></div>))}</div>
      </div>
    </div>
  );
};

export const ProjectsWindowContent = ({ searchQuery }: { searchQuery: string }) => {
  const projects = [
    { name: 'biscuit', description: 'biscuit is a fast, extensible, native code editor with agents...', language: 'Python', languageColor: 'bg-blue-500', stars: 254, forks: 32, isFeatured: true },
    { name: 'ted-industries/ted', description: 'a minimal code editor for agents built with accessibility...', language: 'TypeScript', languageColor: 'bg-blue-600', stars: 12 },
    { name: 'Logicarium', description: 'Logicarium is a minimalist, performant, visual logic design environment...', language: 'C++', languageColor: 'bg-pink-500', stars: 5 }
  ];
  const filtered = projects.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase()));
  return (
    <div className="flex h-[550px] bg-white rounded-b-xl overflow-hidden">
      <div className="w-[180px] bg-[#EBEBEB]/80 backdrop-blur-xl p-4 flex flex-col border-r border-gray-200/50">
        <div className="space-y-6 flex-1 overflow-y-auto">
          <div><h4 className="text-[11px] font-bold text-gray-500/80 mb-2 px-2 uppercase tracking-tight">Favorites</h4><div className="space-y-1"><button className="w-full text-left px-2 py-1.5 text-[13px] font-medium bg-gray-200/60 rounded-lg flex items-center">🏠 All Projects</button></div></div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-8 bg-[#FAFAFA]/50 custom-scrollbar">
        <div className="grid grid-cols-2 gap-6 pb-8">{filtered.map((project, i) => (<ProjectCard key={i} {...project} />))}</div>
      </div>
    </div>
  );
};
