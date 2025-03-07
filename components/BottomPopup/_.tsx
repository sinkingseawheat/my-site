'use client'
import style from './_.module.css'
import { useContext, useState, type ReactNode, useEffect } from 'react'
import { PopupContext } from '@components/context'

export default function BottomPopup(
  {duration,maxVisivleNumber}:{duration?:number, maxVisivleNumber?:number}
){
  const _duration = duration ?? 20000
  const _maxVisivleNumber = maxVisivleNumber ?? 1
  const [popupMessage, setPopupMessage] = useContext(PopupContext)
  const [messages, setMessages] = useState<{elm:ReactNode,timestamp:string}[]>([])

  useEffect(()=>{
    if(popupMessage === ''){
      return
    }
    const newMessages = [...messages]
    newMessages.push({elm:popupMessage,timestamp:Date.now().toString()})
    setMessages(newMessages)

    const timer = setTimeout(()=>{
      setMessages([])
    }, _duration)

    return ()=>{clearTimeout(timer)}

  },[popupMessage])

  if(popupMessage === undefined || setPopupMessage === undefined){
    return (<></>)
  }
  return (<div className={style.wrap} role='status' aria-relevant='additions removals'>
    {messages.length !== 0 &&
      <ul className={style.list}>
        {messages.map((message, index)=>{
          return (
            <li
            className={style.listitem}
              key={message.timestamp}
              role={(index >= messages.length - _maxVisivleNumber) ? undefined : 'presentation'}
              >
                <span className={style.listitem_i}>{message.elm}</span>
            </li>
          )
        })}
      </ul>
    }
  </div>)
}