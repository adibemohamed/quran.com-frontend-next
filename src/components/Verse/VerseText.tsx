import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Word from 'types/Word';
import { selectReadingView } from 'src/redux/slices/QuranReader/readingView';
import QuranWord from '../dls/QuranWord/QuranWord';
import { selectQuranReaderStyles, QuranReaderStyles } from '../../redux/slices/QuranReader/styles';
import { ReadingView } from '../QuranReader/types';
import isCenterAlignedPage from './pageUtils';

type VerseTextProps = {
  words: Word[];
};

const VerseText = ({ words }: VerseTextProps) => {
  const quranReaderStyles = useSelector(selectQuranReaderStyles);
  const readingView = useSelector(selectReadingView);
  const isQuranPage = readingView === ReadingView.QuranPage;
  const { lineNumber, pageNumber } = words[0];
  const centerAlignPage = useMemo(() => isCenterAlignedPage(pageNumber, lineNumber), [
    pageNumber,
    lineNumber,
  ]);

  return (
    <StyledVerseTextContainer
      quranReaderStyles={quranReaderStyles}
      isQuranPage={isQuranPage}
      centerAlignPage={centerAlignPage}
    >
      <StyledVerseText
        quranReaderStyles={quranReaderStyles}
        isQuranPage={isQuranPage}
        centerAlignPage={centerAlignPage}
      >
        {words?.map((word) => (
          <QuranWord key={word.location} word={word} font={quranReaderStyles.quranFont} />
        ))}
      </StyledVerseText>
    </StyledVerseTextContainer>
  );
};

const StyledVerseTextContainer = styled.div<{
  quranReaderStyles: QuranReaderStyles;
  isQuranPage: boolean;
  centerAlignPage: boolean;
}>`
  display: block;
  direction: rtl;
  font-size: ${(props) => props.quranReaderStyles.quranTextFontSize}rem;

  ${(props) =>
    props.isQuranPage &&
    !props.centerAlignPage &&
    `
  min-width: min(95%, calc(${props.quranReaderStyles.letterSpacingMultiplier} * ${props.quranReaderStyles.quranTextFontSize}rem));
  `}
`;

const StyledVerseText = styled.div<{
  quranReaderStyles: QuranReaderStyles;
  centerAlignPage: boolean;
  isQuranPage: boolean;
}>`
  flex-wrap: wrap;
  display: flex;
  ${({ isQuranPage, centerAlignPage }) =>
    isQuranPage &&
    `
    justify-content: ${centerAlignPage ? 'center' : 'space-between'};
  `}
`;

export default React.memo(VerseText);
