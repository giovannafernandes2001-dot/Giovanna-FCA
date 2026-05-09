interface BibleTextProps {
  reference: string
  text: string
}

export default function BibleText({ reference, text }: BibleTextProps) {
  return (
    <section className="bg-brand-blue rounded-2xl p-6 text-white">
      <p className="text-xs font-semibold uppercase tracking-widest text-brand-gold mb-3">
        Texto Bíblico
      </p>
      <h3 className="font-serif text-xl font-bold mb-4">{reference}</h3>
      <div className="prose-bible text-white/90 whitespace-pre-line leading-relaxed">
        {text}
      </div>
    </section>
  )
}
