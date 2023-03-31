import React from 'react'

export default function Video({el}) {
 
  return (
    <div>
  <iframe width="560" height="315" src={el.content} title={el.chapterName} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </div>
  )
}
