function PageLayout({ children, showOrbs = true, className = '' }) {
  return (
    <div
      className={`min-h-screen bg-[#F8FAFC] font-sans text-gray-900 relative overflow-hidden ${className}`}
    >
      {showOrbs && (
        <>
          <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-indigo-400/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-[20%] right-[-5%] w-[30rem] h-[30rem] bg-fuchsia-400/20 rounded-full blur-[100px] pointer-events-none" />
        </>
      )}
      {children}
    </div>
  )
}

export default PageLayout
