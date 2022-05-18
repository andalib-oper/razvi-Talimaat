import * as React from 'react';
import ChapterListItem from './ChapterListItem'
import { useNavigation } from '@react-navigation/native'
import ChapterService from '../service/ChapterServices'

export default function ChapterListItem() {

  const navigation = useNavigation()
  const chapters = ChapterService.getChapters()

  return (
    <>
      { chapters.map((chapter) => (
        <ChapterListItem chapter={ chapter } navigation={ navigation } key={ chapter.number }>Bilal Bentoumi</ChapterListItem>
      )) }
    </>
  )
}