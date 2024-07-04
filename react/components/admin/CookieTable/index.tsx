import React, { useEffect, useReducer } from 'react'
import { Table, Button, Modal, InputButton } from 'vtex.styleguide'
import { CookieType, useFortune } from '../../../hooks/useFortune'
import { Spinner, ToastConsumer } from 'vtex.styleguide'
import { ListElement } from './typings'
import { defaultSchema, initialState, reducer } from './defaults'


export const CookieTable = () => {
  const { fetchFortuneData } = useFortune()
  const [state, dispatch] = useReducer(reducer, initialState);


  useEffect(() => {
    const getData = async () => {
      const data = await fetchFortuneData()
      if (!data) return

      const cookieList = data.map((data: CookieType, idx: number) => {
        return {
          id: idx + 1,
          text: data.CookieFortune
        }
      })

      dispatch({ type: 'SET_TABLE_LIST', payload: cookieList })
    }

    getData()
  }, [])

  const handleShowModal = () => {
    dispatch({ type: 'SET_SHOW', payload: true });
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_INPUT', payload: e.target.value });
  }

  const updateCookieList = (currentList: ListElement[], newElement: string) => {
    const listLength = currentList.length;

    const formattedElement: ListElement = {
      id: listLength + 1,
      text: newElement
    }

    const updatedList = [...currentList, formattedElement]

    return updatedList
  }

  return (
    <>
      {state.tableList
        ? <div>
          <Button onClick={() => handleShowModal()}>Añadir</Button>
          <Table
            stickyHeader
            fullWidth
            schema={defaultSchema}
            items={state.tableList}
            density="high"
          />
        </div>
        : <Spinner />}
      <ToastConsumer>
        {({ showToast }: { showToast: (text: string) => void }) => (
          <Modal
            centered
            isOpen={state.show}
            onClose={() => {
              dispatch({ type: 'SET_SHOW', payload: !state.show });
            }}>
            <aside className="dark-gray">
              <p className="t-heading-3">
                Agrega una nueva frase de la fortuna.
              </p>
              <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault()
                const updatedList = updateCookieList(state.tableList || [], state.input)
                dispatch({ type: 'SET_TABLE_LIST', payload: updatedList });
                dispatch({ type: 'SET_SHOW', payload: false });
                dispatch({ type: 'SET_INPUT', payload: '' });
                showToast('Galleta creada!')
              }}>
                <InputButton
                  placeholder="Ejemplo: Tu fotuna te espera"
                  size="large"
                  label=""
                  onChange={handleInputChange}
                  value={state.input}
                  button="Agregar" />
              </form>
            </aside>
          </Modal>
        )}
      </ToastConsumer>

    </>
  )
}
