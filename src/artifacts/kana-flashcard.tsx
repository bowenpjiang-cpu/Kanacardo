import React, { useState, useEffect } from 'react';

// Mock data - in a real app, you'd import these from separate files
const kanaCards = [
  { romaji: 'a', hiragana: 'あ', katakana: 'ア', memorized: false },
  { romaji: 'i', hiragana: 'い', katakana: 'イ', memorized: false },
  { romaji: 'u', hiragana: 'う', katakana: 'ウ', memorized: false },
  { romaji: 'e', hiragana: 'え', katakana: 'エ', memorized: false },
  { romaji: 'o', hiragana: 'お', katakana: 'オ', memorized: false },
  { romaji: 'ka', hiragana: 'か', katakana: 'カ', memorized: false },
  { romaji: 'ki', hiragana: 'き', katakana: 'キ', memorized: false },
  { romaji: 'ku', hiragana: 'く', katakana: 'ク', memorized: false },
  { romaji: 'ke', hiragana: 'け', katakana: 'ケ', memorized: false },
  { romaji: 'ko', hiragana: 'こ', katakana: 'コ', memorized: false },
  { romaji: 'sa', hiragana: 'さ', katakana: 'サ', memorized: false },
  { romaji: 'shi', hiragana: 'し', katakana: 'シ', memorized: false },
  { romaji: 'su', hiragana: 'す', katakana: 'ス', memorized: false },
  { romaji: 'se', hiragana: 'せ', katakana: 'セ', memorized: false },
  { romaji: 'so', hiragana: 'そ', katakana: 'ソ', memorized: false }
];

// Mock stroke order data - in a real app, you'd have actual SVG stroke order diagrams
const strokeMap = {
  'hiragana_a': 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHRleHQgeD0iNjAiIHk9IjY1IiBmb250LXNpemU9IjcwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMzMzIj7jgYI8L3RleHQ+PC9zdmc+',
  'katakana_a': 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHRleHQgeD0iNjAiIHk9IjY1IiBmb250LXNpemU9IjcwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMzMzIj7jgqI8L3RleHQ+PC9zdmc+'
};

export default function KanaFlashcardScreen() {
  const [cards, setCards] = useState(kanaCards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showKana, setShowKana] = useState(false);
  const [showStrokeOrder, setShowStrokeOrder] = useState(false);
  const [reviewOnly, setReviewOnly] = useState(false);

  const visibleCards = reviewOnly ? cards.filter(card => card.memorized) : cards;
  const currentCard = visibleCards[currentIndex] || visibleCards[0];

  // Reset index if we switch modes and current index is out of bounds
  useEffect(() => {
    if (currentIndex >= visibleCards.length && visibleCards.length > 0) {
      setCurrentIndex(0);
    }
  }, [reviewOnly, currentIndex, visibleCards.length]);

  const toggleMemorized = () => {
    setCards(prevCards => 
      prevCards.map(card => 
        card.romaji === currentCard.romaji 
          ? { ...card, memorized: !card.memorized }
          : card
      )
    );
  };

  const nextCard = () => {
    setShowKana(false);
    setShowStrokeOrder(false);
    setCurrentIndex((prev) => (prev + 1) % visibleCards.length);
  };

  const prevCard = () => {
    setShowKana(false);
    setShowStrokeOrder(false);
    setCurrentIndex((prev) => (prev - 1 + visibleCards.length) % visibleCards.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event) => {
      switch(event.key) {
        case ' ':
        case 'Enter':
          event.preventDefault();
          setShowKana(!showKana);
          break;
        case 'ArrowRight':
        case 'n':
          event.preventDefault();
          nextCard();
          break;
        case 'ArrowLeft':
        case 'p':
          event.preventDefault();
          prevCard();
          break;
        case 's':
          if (showKana) {
            event.preventDefault();
            setShowStrokeOrder(!showStrokeOrder);
          }
          break;
        case 'm':
          event.preventDefault();
          toggleMemorized();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showKana, showStrokeOrder]);

  if (visibleCards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-5">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Kana Flashcards</h1>
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <p className="text-xl text-gray-600 mb-4">No cards available for review!</p>
          <button 
            onClick={() => setReviewOnly(false)}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Show All Cards
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-5">
      <h1 className="text-3xl font-bold mb-2 text-gray-800">Kana Flashcards</h1>
      <p className="text-sm text-gray-600 mb-8">
        Card {currentIndex + 1} of {visibleCards.length} 
        {reviewOnly && ' (Review Mode)'}
      </p>

      {/* Main Card */}
      <div className="bg-white p-12 rounded-xl shadow-lg w-full max-w-md min-h-[300px] flex flex-col items-center justify-center">
        {!showKana ? (
          <div className="text-center">
            <p className="text-6xl font-bold text-gray-800 mb-4">{currentCard.romaji}</p>
            <p className="text-gray-500 italic">Press space to reveal</p>
          </div>
        ) : (
          <div className="text-center w-full">
            <div className="mb-6">
              <p className="text-5xl mb-2">{currentCard.hiragana}</p>
              <p className="text-5xl text-blue-600">{currentCard.katakana}</p>
            </div>
            
            {showStrokeOrder ? (
              <div className="space-y-4">
                <div>
                  <p className="font-bold text-gray-700 mb-2">Hiragana Stroke Order:</p>
                  <div className="flex justify-center">
                    <img 
                      src={strokeMap[`hiragana_${currentCard.romaji}`] || strokeMap['hiragana_a']} 
                      alt={`Hiragana ${currentCard.romaji} stroke order`}
                      className="w-24 h-24"
                    />
                  </div>
                </div>
                <div>
                  <p className="font-bold text-gray-700 mb-2">Katakana Stroke Order:</p>
                  <div className="flex justify-center">
                    <img 
                      src={strokeMap[`katakana_${currentCard.romaji}`] || strokeMap['katakana_a']} 
                      alt={`Katakana ${currentCard.romaji} stroke order`}
                      className="w-24 h-24"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 italic mt-4">Practice writing by hand!</p>
            )}
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="mt-8 space-y-4">
        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => setShowKana(!showKana)}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            {showKana ? "Hide Kana" : "Show Kana"}
          </button>
          
          {showKana && (
            <button
              onClick={() => setShowStrokeOrder(!showStrokeOrder)}
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
            >
              {showStrokeOrder ? "Hide Strokes" : "Show Strokes"}
            </button>
          )}
          
          <button
            onClick={toggleMemorized}
            className={`px-6 py-3 rounded-lg transition-colors font-medium ${
              currentCard.memorized 
                ? "bg-yellow-500 hover:bg-yellow-600 text-white" 
                : "bg-gray-200 hover:bg-gray-300 text-gray-800"
            }`}
          >
            {currentCard.memorized ? "✓ Memorized" : "Mark as Memorized"}
          </button>
        </div>

        <div className="flex gap-3 justify-center">
          <button
            onClick={prevCard}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
          >
            ← Previous
          </button>
          
          <button
            onClick={nextCard}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
          >
            Next →
          </button>
          
          <button
            onClick={() => setReviewOnly(!reviewOnly)}
            className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-medium"
          >
            {reviewOnly ? "Show All Cards" : "Review Mode"}
          </button>
        </div>
      </div>

      {/* Keyboard shortcuts */}
      <div className="mt-8 text-sm text-gray-600 text-center">
        <p className="font-medium mb-1">Keyboard Shortcuts:</p>
        <p>Space/Enter: Toggle kana • ←/→: Navigate • S: Toggle strokes • M: Mark memorized</p>
      </div>
    </div>
  );
}