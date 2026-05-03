export default function CTA({ message }: { message?: string }) {
  return (
    <section className="border border-[var(--border)] rounded-lg bg-[var(--bg-secondary)] p-7 sm:p-9 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
        <div>
          <p className="text-[15px] font-semibold text-[var(--text)] mb-1.5">
            {message || 'Stop paying monthly for cold email.'}
          </p>
          <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
            Cleanmails — self-hosted, unlimited everything, $497 one-time.
          </p>
        </div>
        <a
          href="https://cleanmails.online"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 text-[13px] font-semibold text-[#37352f] bg-[#FFD700] hover:bg-[#f0cc00] px-6 py-3 rounded-md transition-colors whitespace-nowrap no-underline"
        >
          Get Cleanmails
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </a>
      </div>
    </section>
  )
}
