export default function ContactPage() {
  return (
    <main className="min-h-screen pt-24 px-6 max-w-3xl mx-auto">
      <h1 className="text-4xl md:text-6xl font-bold mb-8">Contact Me</h1>
      <p className="text-lg text-muted-foreground mb-8">
        My spidey-sense is tingling! Reach out for collaborations or just to say hi.
      </p>
      
      <form className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
          <input 
            type="text" 
            id="name" 
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" 
            placeholder="Peter Parker"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
          <input 
            type="email" 
            id="email" 
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" 
            placeholder="peter@dailybugle.com"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
          <textarea 
            id="message" 
            rows={5}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 resize-none" 
            placeholder="I need pictures of Spider-Man!"
          />
        </div>
        <button 
          type="button" 
          className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-md transition-colors"
        >
          Send Message
        </button>
      </form>
    </main>
  );
}
