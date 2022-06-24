import { CheckCircle, Lock } from 'phosphor-react'
import { isPast, format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

interface LessonProps {
  title: string
  slug: string
  availableAt: Date
  type: 'live' | 'class'
}

export const Lesson = ({ title, slug, availableAt, type }: LessonProps) => {
  const isLessonAvailable = isPast(availableAt)
  const availableDateFormat = format(
    availableAt,
    "EEEE ' • ' d ' de 'MMMM ' • ' k'h'mm",
    {
      locale: ptBR,
    },
  )
  return (
    <a href={slug}>
      <span className={'text-gray-300'}>
        {availableDateFormat[0].toUpperCase() +
          availableDateFormat.substring(1)}
      </span>
      <div className={'rounded border border-gray-500 p-4 mt-2'}>
        <header className={'flex items-center justify-between'}>
          {isLessonAvailable ? (
            <span
              className={
                'text-sm text-blue-500 font-medium flex items-center gap-2'
              }
            >
              <CheckCircle size={20} />
              Conteúdo liberado
            </span>
          ) : (
            <span
              className={
                'text-sm text-orange-500 font-medium flex items-center gap-2'
              }
            >
              <Lock size={20} />
              Em Breve
            </span>
          )}
          <span
            className={
              'text-xs rounded px-2 py-[0.125rem] text-white border border-green-300 font-bold'
            }
          >
            {type === 'live' ? 'AO VIVO' : 'AULA PRÁTICA'}
          </span>
        </header>
        <strong className={'text-gray-200 mt-5 block'}>{title}</strong>
      </div>
    </a>
  )
}
