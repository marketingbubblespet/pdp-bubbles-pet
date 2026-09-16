// Componentes de override pro corpo MDX de cada relatório. Estilo "encaixotado": cada
// seção (##) abre com um traço divisório e título de âncora, pra bater com o sumário do
// topo da página (gerado a partir dos mesmos títulos, ver lib/planos/slugify.ts).
import { slugificar } from '@/lib/planos/slugify'

function textoDeChildren(children: React.ReactNode): string {
  if (typeof children === 'string') return children
  if (Array.isArray(children)) return children.map(textoDeChildren).join('')
  return ''
}

export const mdxComponents = {
  table: (props: React.ComponentPropsWithoutRef<'table'>) => (
    <div className="overflow-x-auto rounded-[12px] border border-gray-200 my-4">
      <table className="w-full text-sm border-collapse" {...props} />
    </div>
  ),
  thead: (props: React.ComponentPropsWithoutRef<'thead'>) => (
    <thead className="bg-gray-50" {...props} />
  ),
  th: (props: React.ComponentPropsWithoutRef<'th'>) => (
    <th className="text-left font-semibold text-gray-700 px-3 py-2 whitespace-nowrap" {...props} />
  ),
  td: (props: React.ComponentPropsWithoutRef<'td'>) => (
    <td className="px-3 py-2 text-gray-700 border-t border-gray-100" {...props} />
  ),
  p: (props: React.ComponentPropsWithoutRef<'p'>) => (
    <p className="text-sm text-gray-700 leading-relaxed" {...props} />
  ),
  strong: (props: React.ComponentPropsWithoutRef<'strong'>) => (
    <strong className="font-semibold text-gray-900" {...props} />
  ),
  ul: (props: React.ComponentPropsWithoutRef<'ul'>) => (
    <ul className="list-disc list-inside text-sm text-gray-700 flex flex-col gap-1" {...props} />
  ),
  h2: ({ children, ...props }: React.ComponentPropsWithoutRef<'h2'>) => {
    const id = slugificar(textoDeChildren(children))
    return (
      <h2
        id={id}
        className="text-xl font-semibold text-gray-900 border-t border-gray-200 pt-6 mt-6 first:border-t-0 first:pt-0 first:mt-0 scroll-mt-24"
        {...props}
      >
        {children}
      </h2>
    )
  },
  h3: (props: React.ComponentPropsWithoutRef<'h3'>) => (
    <h3
      className="text-xs font-semibold uppercase tracking-wide text-[#E8649A] mt-4"
      {...props}
    />
  ),
  ol: (props: React.ComponentPropsWithoutRef<'ol'>) => (
    <ol className="list-decimal list-inside text-sm text-gray-700 flex flex-col gap-1" {...props} />
  ),
  li: (props: React.ComponentPropsWithoutRef<'li'>) => <li className="leading-relaxed" {...props} />,
  blockquote: (props: React.ComponentPropsWithoutRef<'blockquote'>) => (
    <blockquote
      className="border-l-4 border-[#E8649A]/40 bg-[#FDF2F4] rounded-r-[8px] px-4 py-2.5 text-sm text-gray-700 my-3"
      {...props}
    />
  ),
  hr: () => <hr className="border-gray-200 my-6" />,
  details: (props: React.ComponentPropsWithoutRef<'details'>) => (
    <details className="rounded-[12px] border border-gray-200 px-4 py-3 my-3" {...props} />
  ),
  summary: (props: React.ComponentPropsWithoutRef<'summary'>) => (
    <summary className="cursor-pointer text-sm font-medium text-gray-700" {...props} />
  ),
  a: (props: React.ComponentPropsWithoutRef<'a'>) => (
    <a className="text-[#E8649A] hover:underline" {...props} />
  ),
  code: (props: React.ComponentPropsWithoutRef<'code'>) => (
    <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-mono text-gray-800" {...props} />
  ),
}
