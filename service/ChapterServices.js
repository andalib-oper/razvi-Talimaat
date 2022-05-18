import * as React from 'react';
import chapters from '../data/Chapters.json'

export default class ChapterService {

    static getChapters() {
      return chapters.map((chapter) => ({
            number: chapter.data.surahs.number,
            nameAr: chapter.data.surahs.name,
            englishName: chapter.data.surahs.englishName,
            versesNumber: chapter.data.surahs.ayahs.length,
            // class: chapter.class,
            text: chapter.data.surahs.ayahs.text.trim().split(/\s*\[[0-9]+\]\s*/).filter(a => a)
        }))
    }

}