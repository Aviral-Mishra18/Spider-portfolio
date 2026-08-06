export default function ResumePage() {
  return (
    <main className="min-h-screen pt-24 px-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-bold">Resume</h1>
        <a 
          href="/resume.pdf" 
          download 
          className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition-colors"
        >
          Download PDF
        </a>
      </div>
      
      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-semibold border-b border-white/10 pb-2 mb-4">Experience</h2>
          <div className="space-y-6 text-muted-foreground">
            {/* Experience items mock data */}
            <div>
              <h3 className="text-xl font-medium text-white">Senior Web Developer</h3>
              <p className="text-sm">Tech Corp • 2023 - Present</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Developed high-performance web applications using Next.js.</li>
                <li>Led a team of 5 developers to rebuild the core product.</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold border-b border-white/10 pb-2 mb-4">Education</h2>
          <div className="space-y-6 text-muted-foreground">
            {/* Education mock data */}
            <div>
              <h3 className="text-xl font-medium text-white">BCA</h3>
              <p className="text-sm">PSIT-CHE, CSJMU • Graduated 2023</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
