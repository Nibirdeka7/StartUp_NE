import React from 'react';

const teamMembers = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80',
    name: 'Flualy Cual',
    role: 'Founder & CEO',
    tags: ['Strategy', 'Leadership', 'Investor Relations', 'Growth', 'Innovation'],
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    name: 'Naymur Rahman',
    role: 'CTO & Co-Founder',
    tags: ['Tech Architecture', 'Product Development', 'AI/ML', 'Cloud', 'DevOps'],
  },
  {
    id: '3',
    imageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=800&q=80',
    name: 'Adrian Paul',
    role: 'CMO & Co-Founder',
    tags: ['Marketing', 'Branding', 'GTM Strategy', 'Growth Hacking', 'Analytics'],
  },
];

function TeamGallery() {
  return (
    <div className="py-12 bg-white">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-red-800 mb-2">Our Leadership</h2>
        <p className="text-gray-600">The visionaries behind Startup Northeast</p>
      </div>

      <div className="group flex max-md:flex-col justify-center gap-2 w-[90%] mx-auto">
        {teamMembers.map((member, i) => {
          return (
            <article key={member.id} className="group/article relative w-full rounded-xl overflow-hidden md:not-[&:hover]:group-hover:w-[20%] md:[&:not(:focus-within):not(:hover)]:group-focus-within:w-[20%] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.15)] before:absolute before:inset-x-0 before:bottom-0 before:h-1/3 before:bg-gradient-to-t before:from-red-900/80 before:via-red-900/40 before:to-transparent before:transition-opacity md:before:opacity-0 md:hover:before:opacity-100 focus-within:before:opacity-100 after:opacity-0 md:not-[&:hover]:group-hover:after:opacity-100 md:[&:not(:focus-within):not(:hover)]:group-focus-within:after:opacity-100 after:absolute after:inset-0 after:bg-red-900/20 after:backdrop-blur-sm after:rounded-lg after:transition-all hover:ring-3 hover:ring-red-400/50">
              <a
                className="absolute inset-0 text-white z-10 p-4 flex flex-col justify-end"
                href="#"
              >
                <h1 className="text-xl font-medium md:whitespace-nowrap md:truncate md:opacity-0 group-hover/article:opacity-100 group-focus-within/article:opacity-100 md:translate-y-2 group-hover/article:translate-y-0 group-focus-within/article:translate-y-0 transition duration-200 ease-[cubic-bezier(.5,.85,.25,1.8)] group-hover/article:delay-300 group-focus-within/article:delay-300">
                  {member.name}
                </h1>
                <span className="text-2xl font-bold md:whitespace-nowrap md:truncate md:opacity-0 group-hover/article:opacity-100 group-focus-within/article:opacity-100 md:translate-y-2 group-hover/article:translate-y-0 group-focus-within/article:translate-y-0 transition duration-200 ease-[cubic-bezier(.5,.85,.25,1.8)] group-hover/article:delay-500 group-focus-within/article:delay-500">
                  {member.role}
                </span>
                <div className="flex flex-wrap gap-1 mt-2 md:opacity-0 group-hover/article:opacity-100 group-focus-within/article:opacity-100 md:translate-y-2 group-hover/article:translate-y-0 group-focus-within/article:translate-y-0 transition duration-200 ease-[cubic-bezier(.5,.85,.25,1.8)] group-hover/article:delay-700 group-focus-within/article:delay-700">
                  {member.tags.slice(0, 2).map((tag, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-red-800/80 backdrop-blur-sm rounded text-xs text-red-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
              <img
                className="object-cover h-72 md:h-[420px] w-full"
                src={member.imageUrl}
                alt={member.name}
                onError={(e) => {
                  e.target.style.display = 'none';
                  const fallbackDiv = document.createElement('div');
                  fallbackDiv.className = 'h-full w-full bg-gradient-to-br from-red-700 to-red-800 flex items-center justify-center';
                  fallbackDiv.innerHTML = `<div class="text-4xl font-bold text-red-200">${member.name.split(' ').map(n => n[0]).join('')}</div>`;
                  e.target.parentElement.appendChild(fallbackDiv);
                }}
              />
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default TeamGallery;