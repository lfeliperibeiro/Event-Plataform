import { CheckCircle, Lock } from 'phosphor-react'
import { isPast, format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Link, useParams } from 'react-router-dom'
import classNames from 'classnames'

interface LessonProps {
  title: string
  slug: string
  availableAt: Date
  type: 'live' | 'class'
}

export const Lesson = (props: LessonProps) => {
  const { slug } = useParams<{ slug: string }>()
  const isLessonAvailable = isPast(props.availableAt)
  const availableDateFormat = format(
    props.availableAt,
    "EEEE ' • ' d ' de 'MMMM ' • ' k'h'mm",
    {
      locale: ptBR,
    },
  )

  const isActiveLesson = slug === props.slug
  return (
    <div className={`${!isLessonAvailable ? 'cursor-not-allowed' : ''} `}>
      <Link
        to={`/event/lesson/${props.slug}`}
        className={classNames('group relative ', {
          'pointer-events-none ': !isLessonAvailable,
        })}
      >
        <span className={'text-gray-300'}>
          {availableDateFormat[0].toUpperCase() +
            availableDateFormat.substring(1)}
        </span>

        {isActiveLesson ? (
          <span
            className={classNames(
              'bg-green-500 w-4 h-4 rotate-45 absolute top-20 right-72 ',
            )}
          />
        ) : null}
        <div
          className={classNames(
            'rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500 ',
            {
              'bg-green-500 ': isActiveLesson,
            },
          )}
        >
          <header className={'flex items-center justify-between '}>
            {isLessonAvailable ? (
              <span
                className={classNames(
                  'text-sm text-blue-500 font-medium flex items-center gap-2',
                  {
                    'text-gray-100': isActiveLesson,
                  },
                )}
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
              className={classNames(
                'text-xs rounded px-2 py-[0.125rem] text-white border border-green-300 font-bold',
                {
                  'border-gray-100': isActiveLesson,
                },
              )}
            >
              {props.type === 'live' ? 'AO VIVO' : 'AULA PRÁTICA'}
            </span>
          </header>
          <strong
            className={classNames('text-gray-200 mt-5 block', {
              'text-gray-100': isActiveLesson,
            })}
          >
            {props.title}
          </strong>
        </div>
      </Link>
    </div>
  )
}
