import React, { useState } from 'react'
import { useFortune } from '../../../hooks/useFortune';
import { Spinner } from 'vtex.styleguide'
import styles from './index.css'

type FortuneType = {
  fortuneCookie: string,
  fortuneNumber: string
}

const CookieFortune: StorefrontFunctionComponent = () => {
  const { fetchFortuneData, getFortuneNumber, getRandomCookie } = useFortune()
  const [fortune, setFortune] = useState<FortuneType | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = () => {
    const getFortuneData = async () => {
      setLoading(true)
      const fortuneWords = await fetchFortuneData()
      if (!fortuneWords) {
        setLoading(false);
        return
      }

      const fortuneCookie = getRandomCookie(fortuneWords)
      const fortuneNumber = getFortuneNumber()

      setFortune({ fortuneCookie, fortuneNumber })
      setLoading(false)
    };

    getFortuneData();
  }

  return (
    <article className={styles.cookieFortune_layout}>
      <h1 className={styles.cookieFortune_title}>
        ✨ Galletas de la Fortuna: ¡Revela Tu Suerte! ✨
      </h1>
      <div className={styles.cookieFortune_container}>
        {loading
          ? <Spinner />
          : (
            !fortune
              ? (
                <>
                  <picture className={styles.cookieFortune_image}>
                    <img
                      width={407}
                      height={300}
                      src="https://th.bing.com/th/id/R.410532775fa92f25c830cb37fdbf046e?rik=5yU3VdnScQMNjw&riu=http%3a%2f%2fwww.clipartbest.com%2fcliparts%2fKTn%2fXRK%2fKTnXRK98c.png&ehk=oRe04zjBePekEOKK1R0iGniX55NajoBVvAhET%2bKapRI%3d&risl=&pid=ImgRaw&r=0"
                      alt="Imágen de una galleta de la fortuna" />
                  </picture>
                  <div className={styles.cookieFortune_subtitle}>
                    <p>El universo tiene un mensaje especial para ti.</p>
                    <p>✨¡Presiona el botón y revela tu fortuna!✨</p>
                  </div>
                  <button className={styles.cookieFortune_button} onClick={() => handleClick()}>
                    Ver mi mensaje
                  </button>
                </>
              )
              : (
                <section className={styles.cookieFortune_card}>
                  <picture className={styles.cookieFortune_image}>
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/8175/8175391.png"
                      alt="Imagen de una persona entregando tu fortuna"
                      width={300}
                      height={300} />
                  </picture>
                  <div className={styles.cookieFortune_message}>
                    <h3>"{fortune.fortuneCookie}"</h3>
                    <p>Tu número de la fortuna es:</p>
                    <h5>{fortune.fortuneNumber}</h5>
                  </div>
                </section>
              )
          )}
      </div>
    </article>
  )
}

export default CookieFortune
